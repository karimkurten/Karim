# Beehiiv Integration — Setup Guide

This document covers the Beehiiv newsletter integration for karimchaouki.com:
resume lead capture, the blog newsletter signup, and new-article notifications.

## 1. Required environment variables (Vercel)

Set these in the Vercel dashboard: **Project → Settings → Environment Variables**
(scope: Production, and Preview if you want to test there).

| Variable | Required | Purpose |
|---|---|---|
| `BEEHIIV_API_KEY` | Yes (for any Beehiiv call) | Server-side Beehiiv API key. **Never** put this in client-side code or a `NEXT_PUBLIC_`/`REACT_APP_` variable. |
| `BEEHIIV_PUBLICATION_ID` | Yes (for any Beehiiv call) | Your Beehiiv publication ID (the `{publicationId}` in `POST /v2/publications/{publicationId}/subscriptions`). |
| `RESUME_TOKEN_SECRET` | Recommended | Long random string used to sign resume download tokens. If unset, the server generates an ephemeral secret per instance (tokens break on redeploy) and logs a warning. Generate with `openssl rand -hex 32`. |

After setting variables, redeploy (or they apply on the next deploy).

### Behavior when Beehiiv is not configured

- **Resume form still works.** The request is validated, a download token is
  issued, and the PDF downloads. The lead is *not* stored anywhere — the server
  logs a warning. Configure Beehiiv promptly so leads are captured.
- **Newsletter signup returns 503** `newsletter_unavailable` with a friendly
  "temporarily unavailable" message and a retry option. No silent failures.

## 2. Where to find the credentials in Beehiiv

1. **API key:** Beehiiv dashboard → Settings → API (or Integrations → API).
   Create a key with permission to manage subscribers. Keep it secret.
2. **Publication ID:** Beehiiv dashboard → Settings → Publication. It appears in
   API URLs and in the publication settings screen.

> No live Beehiiv connection has been tested — credentials were not available
> during implementation. After configuring, test with your own email first.

## 3. Custom fields (auto-created, best effort)

On first use, `/api/beehiiv-subscribe` attempts to create two custom fields via
`POST /v2/publications/{id}/custom_fields`:

- `lead_source` (string) — `"resume-download"` or `"blog-newsletter"`
- `newsletter_consent` (boolean) — `true` / `false`

If auto-creation fails (e.g. insufficient plan permissions), create them
manually in **Beehiiv → Audience → Custom fields** with exactly these names;
unknown field names are silently dropped by Beehiiv otherwise.

Every subscriber created by the site also gets a tag (`resume-request` or
`blog-newsletter`) via the tags endpoint.

## 4. Keeping resume leads separate from the newsletter (important)

Beehiiv's subscription API has no separate "leads" table — every record created
is a publication subscriber. The separation is enforced as follows:

- Resume requests are created with `send_welcome_email: false` and
  `newsletter_consent: false` (unless the visitor ticked the optional
  newsletter checkbox, which is **unchecked by default**).
- **You must configure your newsletter automations/broadcasts to target only
  subscribers where `newsletter_consent = true`** (Beehiiv → Automations →
  audience filter/segment). Without this filter, resume leads could receive
  marketing emails they did not consent to.

This is the best supported alternative the Beehiiv API offers; it is documented
here rather than silently assumed.

## 5. New-article notifications (manual dashboard setup)

The site publishes an RSS feed at:

```
https://www.karimchaouki.com/api/rss
```

generated from the live `blogPosts.json` (title, link, date, excerpt; latest
50 posts). To notify subscribers of new articles:

1. In Beehiiv: **Settings → your publication → RSS → New External RSS Feed**,
   and add the URL above.
2. Create an automation/broadcast that pulls the feed ("Refresh feed on send")
   on your chosen schedule, filtered to the `newsletter_consent = true`
   segment.

Notes and honest limitations:

- RSS ingestion is a **dashboard-only** feature; there is no API to configure
  it, so this step cannot be automated from the site.
- Do **not** claim new-article emails are sent until the feed is connected and
  a test send has completed.
- The send-via-API route (`POST /v2/publications/{id}/posts` with
  `status: "confirmed"`) was deliberately **not** implemented: Beehiiv's docs
  gate it behind higher-tier plans and the plan names are currently in flux,
  so it is unverified for this account.

## 6. Security properties

- The Beehiiv API key lives only in server-side env vars; it never appears in
  client JavaScript, URLs, or logs.
- The resume PDF was moved from `frontend/public/resume/` (public URL) to
  `private/resume/` and is served **only** by `/api/resume-download` after a
  valid single-use token check. The old `/resume/KC_PM_Resume.pdf` URL now 404s.
- Download tokens: HMAC-SHA256, bound to the requester's email, 15-minute
  expiry, single-use (tracked in-memory per serverless instance — a token
  could theoretically be replayed against a *different* warm instance inside
  its 15-minute window; acceptable for a resume PDF, documented here).
- Input is validated on client (zod) and server; rate limiting is 10
  req/min/IP per instance; idempotency keys prevent double-submits from
  creating duplicates.
- Previously public PDF: a form cannot retroactively prevent access via
  search-engine caches or copies already downloaded. The direct URL is now
  dead, which is the meaningful control going forward.

## 7. Experience counter

`frontend/src/data/employmentHistory.json` holds the verified employment
records (from the resume: Société Générale Oct 2001–Feb 2015; Akalee Sep
2017–Nov 2018; Laurentian Bank Dec 2018–Mar 2022; Laurentian Bank FIU Mar
2022–Jun 2023; ADP Canada Jun 2023–present). `frontend/src/lib/experience.js`
computes completed years (currently **22+**); the homepage stat reads it on
every page load, so it advances automatically.

To update: edit `employmentHistory.json` (set `endDate` + `isCurrent: false`
when a role ends; append a record for a new role). Tests:
`frontend/src/lib/experience.test.js` (16 cases: overlaps, gaps, ongoing,
ended, leap years, invalid dates).

## 8. Testing checklist (preview deployment)

1. Deploy to a Vercel preview; set the three env vars there first.
2. `/resume`: submit with empty/invalid fields → inline errors; valid submit →
   token issued, PDF downloads as `Karim_Chaouki_Resume.pdf`; double-clicking
   the button submits once.
3. Reusing a download URL twice → second attempt rejected (410).
4. Old URL `/resume/KC_PM_Resume.pdf` → 404.
5. Newsletter form at the end of any `/blog/<slug>` article: subscribe with
   your own email → appears in Beehiiv with `lead_source=blog-newsletter`,
   `newsletter_consent=true`; subscribing again → idempotent success.
6. Resume form **without** the newsletter checkbox → subscriber created with
   `newsletter_consent=false`, no welcome email.
7. `/api/rss` returns valid RSS XML with the latest posts.
8. Confirm `/resume` carries `<meta name="robots" content="noindex, nofollow">`.

## 9. Files changed

- `api/beehiiv-subscribe.js` (new) — subscribe endpoint
- `api/resume-download.js` (new) — token-gated PDF download
- `api/rss.js` (new) — RSS feed for Beehiiv ingestion
- `private/resume/KC_PM_Resume.pdf` (moved from `frontend/public/resume/`)
- `vercel.json` — `functions.includeFiles` for the PDF and blogPosts.json
- `frontend/src/pages/ResumeRequest.jsx` (new) — `/resume` lead-capture page
- `frontend/src/components/NewsletterSignup.jsx` (new) — end-of-article signup
- `frontend/src/pages/BlogPost.jsx` — renders `<NewsletterSignup />` once
- `frontend/src/components/Hero.jsx` — Download Resume now links to `/resume`
- `frontend/src/pages/AboutPage.jsx` — resume link now links to `/resume`
- `frontend/src/components/SEO.jsx` — `noindex` prop support
- `frontend/src/lib/experience.js` (new), `frontend/src/data/employmentHistory.json` (new),
  `frontend/src/lib/experience.test.js` (new) — dynamic experience counter
- `frontend/src/data/mockData.js` — "Years Experience" stat now computed (22+)
