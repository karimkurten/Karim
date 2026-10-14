/**
 * GET /api/asset-download?token=<downloadToken>
 *
 * Streams a lead-magnet file only for a valid, unexpired, single-use token
 * issued by /api/beehiiv-subscribe (source "lead-magnet"). Files live outside
 * the public web root (private/lead-magnets/, bundled via vercel.json
 * `includeFiles`), so the direct URL cannot be guessed or bypassed.
 *
 * Token scheme (must match the issuer): base64url(`${email}|${expiry}|${asset}|${sig}`)
 * where sig = HMAC-SHA256(`${email}|${expiry}|${asset}`, RESUME_TOKEN_SECRET).
 * The asset is bound into the token: a token issued for one lead magnet
 * cannot download another.
 *
 * Honest limitations (same as /api/resume-download):
 * - Single-use tracking is in-memory per serverless instance; a token could be
 *   replayed against a different warm instance within its 15-minute window.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const usedTokens = new Set(); // sha256(token) already served (per instance)

const ASSETS = {
  "go-live-checklist": {
    file: "go-live-readiness-checklist.pdf",
    downloadName: "KarimChaouki-Go-Live-Readiness-Checklist.pdf",
    contentType: "application/pdf",
  },
  "data-migration-checklist": {
    file: "hcm-data-migration-checklist.pdf",
    downloadName: "KarimChaouki-HCM-Data-Migration-Checklist.pdf",
    contentType: "application/pdf",
  },
  "risk-register": {
    file: "implementation-risk-register.xlsx",
    downloadName: "KarimChaouki-Implementation-Risk-Register.xlsx",
    contentType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
};

function tokenSecret() {
  if (process.env.RESUME_TOKEN_SECRET) return process.env.RESUME_TOKEN_SECRET;
  if (!tokenSecret.ephemeral) {
    console.warn("[asset-download] RESUME_TOKEN_SECRET not set; using ephemeral secret.");
    tokenSecret.ephemeral = crypto.randomBytes(32).toString("hex");
  }
  return tokenSecret.ephemeral;
}

function verifyToken(token) {
  let decoded;
  try {
    decoded = Buffer.from(token, "base64url").toString("utf8");
  } catch {
    return null;
  }
  const parts = decoded.split("|");
  if (parts.length !== 4) return null; // lead-magnet tokens are 4-part
  const [email, expiryStr, asset, sig] = parts;
  const expiry = Number(expiryStr);
  if (!email || !Number.isFinite(expiry)) return null;
  if (!ASSETS[asset]) return null;
  const expected = crypto
    .createHmac("sha256", tokenSecret())
    .update(`${email}|${expiry}|${asset}`)
    .digest("hex");
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (Date.now() > expiry) return null;
  return { email, asset };
}

function findAssetFile(file) {
  const candidates = [
    path.join(process.cwd(), "private", "lead-magnets", file),
    path.join(__dirname, "..", "private", "lead-magnets", file),
    path.join(__dirname, "private", "lead-magnets", file),
  ];
  for (const p of candidates) {
    try {
      if (fs.statSync(p).isFile()) return p;
    } catch {
      /* try next */
    }
  }
  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const token = typeof req.query.token === "string" ? req.query.token : "";
  if (!token) return res.status(400).json({ error: "missing_token" });

  const fingerprint = crypto.createHash("sha256").update(token).digest("hex");
  if (usedTokens.has(fingerprint)) {
    return res.status(410).json({
      error: "token_used",
      message: "This download link has already been used. Please request the file again.",
    });
  }

  const verified = verifyToken(token);
  if (!verified) {
    return res.status(403).json({
      error: "invalid_token",
      message: "This download link is invalid or has expired. Please request the file again.",
    });
  }

  const meta = ASSETS[verified.asset];
  const filePath = findAssetFile(meta.file);
  if (!filePath) {
    console.error("[asset-download] file not found in bundle:", meta.file);
    return res.status(500).json({
      error: "asset_unavailable",
      message: "The file is temporarily unavailable. Please try again later.",
    });
  }

  usedTokens.add(fingerprint);
  if (usedTokens.size > 10000) usedTokens.clear();

  const stat = fs.statSync(filePath);
  res.setHeader("Content-Type", meta.contentType);
  res.setHeader("Content-Length", String(stat.size));
  res.setHeader("Content-Disposition", `attachment; filename="${meta.downloadName}"`);
  res.setHeader("Cache-Control", "no-store");
  fs.createReadStream(filePath).pipe(res);
};
