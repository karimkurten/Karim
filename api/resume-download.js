/**
 * GET /api/resume-download?token=<downloadToken>
 *
 * Streams the resume PDF only for a valid, unexpired, single-use token issued
 * by /api/beehiiv-subscribe. The PDF lives outside the public web root
 * (private/resume/KC_PM_Resume.pdf, bundled via vercel.json `includeFiles`),
 * so the direct URL cannot be guessed or bypassed.
 *
 * Token scheme (must match the issuer): base64url(`${email}|${expiry}|${sig}`)
 * where sig = HMAC-SHA256(`${email}|${expiry}`, RESUME_TOKEN_SECRET).
 *
 * Honest limitations (see BEEHIIV_SETUP.md):
 * - Single-use tracking is in-memory per serverless instance; a token could be
 *   replayed against a different warm instance within its 15-minute window.
 * - The previously public PDF URL may persist in search-engine caches.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const usedTokens = new Set(); // sha256(token) already served (per instance)

function tokenSecret() {
  if (process.env.RESUME_TOKEN_SECRET) return process.env.RESUME_TOKEN_SECRET;
  if (!tokenSecret.ephemeral) {
    console.warn("[resume-download] RESUME_TOKEN_SECRET not set; using ephemeral secret.");
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
  if (parts.length !== 3) return null;
  const [email, expiryStr, sig] = parts;
  const expiry = Number(expiryStr);
  if (!email || !Number.isFinite(expiry)) return null;
  const expected = crypto.createHmac("sha256", tokenSecret()).update(`${email}|${expiry}`).digest("hex");
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (Date.now() > expiry) return null;
  return email;
}

function findPdf() {
  const candidates = [
    path.join(process.cwd(), "private", "resume", "KC_PM_Resume.pdf"),
    path.join(__dirname, "..", "private", "resume", "KC_PM_Resume.pdf"),
    path.join(__dirname, "private", "resume", "KC_PM_Resume.pdf"),
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
    return res.status(410).json({ error: "token_used", message: "This download link has already been used. Please request the resume again." });
  }

  const email = verifyToken(token);
  if (!email) {
    return res.status(403).json({ error: "invalid_token", message: "This download link is invalid or has expired. Please request the resume again." });
  }

  const pdfPath = findPdf();
  if (!pdfPath) {
    console.error("[resume-download] PDF not found in bundle; checked candidates.");
    return res.status(500).json({ error: "resume_unavailable", message: "The resume file is temporarily unavailable. Please try again later." });
  }

  usedTokens.add(fingerprint);
  if (usedTokens.size > 10000) usedTokens.clear();

  const stat = fs.statSync(pdfPath);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Length", String(stat.size));
  res.setHeader("Content-Disposition", 'attachment; filename="Karim_Chaouki_Resume.pdf"');
  res.setHeader("Cache-Control", "no-store");
  fs.createReadStream(pdfPath).pipe(res);
};
