/**
 * POST /api/beehiiv-subscribe
 *
 * Centralized Beehiiv integration for the site (Vercel serverless, Node runtime).
 * Used by the resume lead-capture form (source: "resume") and the blog
 * newsletter signup (source: "newsletter").
 *
 * Request body:
 *   { name, email, newsletterConsent, source: "resume" | "newsletter",
 *     idempotencyKey? }
 *
 * Behavior:
 * - Validates input server-side (never trusts the client).
 * - Rate-limits: 10 requests/minute per IP (in-memory; per serverless instance).
 * - Creates or updates the Beehiiv subscriber with custom fields:
 *     lead_source ("resume-download" | "blog-newsletter"),
 *     newsletter_consent (boolean).
 *   Newsletter consent is NEVER implied: a resume request without the checkbox
 *   is stored with newsletter_consent=false and send_welcome_email=false, and
 *   marketing automations must segment on newsletter_consent=true (see
 *   BEEHIIV_SETUP.md).
 * - If Beehiiv is not configured (missing env vars):
 *     source=resume     -> still returns a download token (lead capture must
 *                          never block the resume CTA); Beehiiv is skipped.
 *     source=newsletter -> 503 { error: "newsletter_unavailable" }.
 * - source=resume returns { ok: true, downloadToken } on success; the client
 *   then calls /api/resume-download?token=... (single-use, 15-minute expiry).
 *
 * Env vars (server-side only, never exposed to the browser):
 *   BEEHIIV_API_KEY, BEEHIIV_PUBLICATION_ID, RESUME_TOKEN_SECRET (optional)
 */

const crypto = require("crypto");

const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_NAME = 120;
const TOKEN_TTL_MS = 15 * 60 * 1000;

// --- in-memory guards (per serverless instance) ------------------------------
const rateHits = new Map(); // ip -> [timestamps]
const idempotencyCache = new Map(); // key -> { status, body }
let customFieldsEnsured = false;

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (rateHits.get(ip) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  rateHits.set(ip, recent);
  if (rateHits.size > 5000) rateHits.clear();
  return recent.length > 10;
}

function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return (req.socket && req.socket.remoteAddress) || "unknown";
}

// --- validation ----------------------------------------------------------------
function validate(body) {
  const errors = {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = body.source;
  let consent = body.newsletterConsent;
  if (typeof consent === "string") consent = consent === "true" || consent === "1";
  consent = consent === true;

  if (!name) errors.name = "Full name is required.";
  else if (name.length > MAX_NAME) errors.name = "Name is too long.";
  if (!email) errors.email = "Email address is required.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (source !== "resume" && source !== "newsletter") errors.source = "Invalid request source.";

  return { errors, clean: { name, email, consent, source } };
}

// --- download token (HMAC-SHA256, single-use, 15-minute expiry) -----------------
function tokenSecret() {
  if (process.env.RESUME_TOKEN_SECRET) return process.env.RESUME_TOKEN_SECRET;
  if (!tokenSecret.warned) {
    tokenSecret.warned = true;
    console.warn("[beehiiv-subscribe] RESUME_TOKEN_SECRET not set; using ephemeral secret (tokens invalid after redeploy).");
  }
  if (!tokenSecret.ephemeral) tokenSecret.ephemeral = crypto.randomBytes(32).toString("hex");
  return tokenSecret.ephemeral;
}

function issueDownloadToken(email) {
  const expiry = Date.now() + TOKEN_TTL_MS;
  const payload = `${email}|${expiry}`;
  const sig = crypto.createHmac("sha256", tokenSecret()).update(payload).digest("hex");
  return Buffer.from(`${payload}|${sig}`).toString("base64url");
}

// --- Beehiiv API -----------------------------------------------------------------
async function beehiiv(apiKey, path, { method = "GET", body } = {}) {
  const doFetch = async () => {
    const res = await fetch(`${BEEHIIV_API_BASE}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    let data = null;
    try {
      data = await res.json();
    } catch {
      /* non-JSON body */
    }
    return { status: res.status, data };
  };

  // Exponential backoff on 429 (Beehiiv rate limits)
  let last = await doFetch();
  for (let attempt = 1; last.status === 429 && attempt <= 3; attempt++) {
    await new Promise((r) => setTimeout(r, 600 * 2 ** (attempt - 1)));
    last = await doFetch();
  }
  return last;
}

async function ensureCustomFields(apiKey, publicationId) {
  if (customFieldsEnsured) return;
  for (const field of [
    { kind: "string", display: "lead_source" },
    { kind: "boolean", display: "newsletter_consent" },
  ]) {
    try {
      // 400 (already exists) is fine — best effort.
      await beehiiv(apiKey, `/publications/${publicationId}/custom_fields`, {
        method: "POST",
        body: field,
      });
    } catch (e) {
      console.warn("[beehiiv-subscribe] custom field ensure failed:", field.display, e.message);
    }
  }
  customFieldsEnsured = true;
}

function customFieldPayload(source, consent) {
  return [
    { name: "lead_source", value: source === "resume" ? "resume-download" : "blog-newsletter" },
    { name: "newsletter_consent", value: consent },
  ];
}

/**
 * Check-then-create/update: the docs are ambiguous about duplicate creates
 * (possible 422), so look the subscriber up by email first.
 */
async function upsertSubscriber(apiKey, publicationId, { email, consent, source }) {
  const fields = customFieldPayload(source, consent);
  const lookup = await beehiiv(apiKey, `/publications/${publicationId}/subscriptions/by_email/${encodeURIComponent(email)}`);

  if (lookup.status === 200 && lookup.data && lookup.data.data && lookup.data.data.id) {
    const subId = lookup.data.data.id;
    const upd = await beehiiv(apiKey, `/publications/${publicationId}/subscriptions/${subId}`, {
      method: "PUT",
      body: { custom_fields: fields },
    });
    return { ok: upd.status >= 200 && upd.status < 300, subscriptionId: subId, created: false };
  }

  const create = await beehiiv(apiKey, `/publications/${publicationId}/subscriptions`, {
    method: "POST",
    body: {
      email,
      reactivate_existing: source === "newsletter" && consent,
      send_welcome_email: false, // never auto-enroll in marketing email; consent is explicit
      custom_fields: fields,
      referring_site: "https://www.karimchaouki.com",
    },
  });
  if (create.status === 200 || create.status === 201) {
    const subId = create.data && create.data.data && create.data.data.id;
    return { ok: true, subscriptionId: subId || null, created: true };
  }
  return { ok: false, status: create.status, detail: create.data };
}

async function addTag(apiKey, publicationId, subscriptionId, tag) {
  if (!subscriptionId) return;
  try {
    await beehiiv(apiKey, `/publications/${publicationId}/subscriptions/${subscriptionId}/tags`, {
      method: "POST",
      body: { tags: [tag] },
    });
  } catch (e) {
    console.warn("[beehiiv-subscribe] tag add failed:", tag, e.message);
  }
}

// --- handler ---------------------------------------------------------------------
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "rate_limited", message: "Too many requests. Please try again shortly." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "invalid_json" });
    }
  }
  body = body && typeof body === "object" ? body : {};

  if (typeof body.idempotencyKey === "string" && body.idempotencyKey.length >= 8) {
    const cached = idempotencyCache.get(body.idempotencyKey);
    if (cached) return res.status(cached.status).json(cached.body);
  }

  const { errors, clean } = validate(body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "validation_failed", fields: errors });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const beehiivConfigured = Boolean(apiKey && publicationId);

  const respond = (status, payload) => {
    if (typeof body.idempotencyKey === "string" && body.idempotencyKey.length >= 8 && status < 500) {
      idempotencyCache.set(body.idempotencyKey, { status, body: payload });
      if (idempotencyCache.size > 2000) idempotencyCache.clear();
    }
    return res.status(status).json(payload);
  };

  // Resume flow must never be blocked by a missing/unreachable Beehiiv config.
  if (!beehiivConfigured) {
    console.warn(`[beehiiv-subscribe] Beehiiv not configured; source=${clean.source}`);
    if (clean.source === "resume") {
      const downloadToken = issueDownloadToken(clean.email);
      return respond(200, { ok: true, downloadToken, beehiiv: "not_configured" });
    }
    return respond(503, { error: "newsletter_unavailable", message: "Newsletter signup is temporarily unavailable. Please try again later." });
  }

  try {
    await ensureCustomFields(apiKey, publicationId);
    const result = await upsertSubscriber(apiKey, publicationId, {
      email: clean.email,
      consent: clean.consent,
      source: clean.source,
    });

    if (!result.ok) {
      console.error("[beehiiv-subscribe] Beehiiv upsert failed:", result.status);
      if (clean.source === "resume") {
        // Degrade gracefully: the resume CTA still works.
        const downloadToken = issueDownloadToken(clean.email);
        return respond(200, { ok: true, downloadToken, beehiiv: "degraded" });
      }
      return respond(502, { error: "subscription_failed", message: "Could not complete the subscription. Please try again." });
    }

    await addTag(apiKey, publicationId, result.subscriptionId, clean.source === "resume" ? "resume-request" : "blog-newsletter");

    if (clean.source === "resume") {
      const downloadToken = issueDownloadToken(clean.email);
      return respond(200, { ok: true, downloadToken });
    }
    return respond(200, { ok: true, created: result.created });
  } catch (e) {
    console.error("[beehiiv-subscribe] unexpected error:", e.message);
    if (clean.source === "resume") {
      const downloadToken = issueDownloadToken(clean.email);
      return respond(200, { ok: true, downloadToken, beehiiv: "degraded" });
    }
    return respond(502, { error: "subscription_failed", message: "Could not complete the subscription. Please try again." });
  }
};
