# Beehiiv Integration — Setup Guide

This document covers the Beehiiv newsletter integration for karimchaouki.com:
resume lead capture, the blog newsletter signup, and new-article notifications.

## 1. Required environment variables (Vercel)

Set these in the Vercel dashboard: **Project → Settings → Environment Variables**
(scope: Production, and Preview if you want to test there).

| Variable | Required | Purpose |
|---|---|---|
| `BEEHIIV_API_KEY` | Yes (for any Beehiiv call) | Server-side Beehiiv API key. **Never** put this in client-side code or a `NEXT_PUBLIC_`/`REACT_APP_` variable. **Karim: add this in the Vercel dashboard** (Project → Settings → Environment Variables → Production). The key is never hardcoded anywhere. |
| `BEEHIIV_PUBLICATION_ID` | Optional | Defaults in code to Karim's Newsletter (`pub_7f333e13-09fc-493d-8ca2-6eab456a3044`, verified live 2026-10-13). Set only to override. |
| `RESUME_TOKEN_SECRET` | Recommended | Long random string used to sign resume download tokens. If unset, the server generates an ephemeral secret per instance (tokens break on redeploy) and logs a warning. Generate with `openssl rand -hex 32`. |

After setting variables, redeploy (or they apply on the next deploy).

### Behavior when the API key is not configured

- **Resume form still works.** The request is validated, a download token is
  issued, and the PDF downloads. The lead is *not* stored anywhere — the server
  logs a warning. Add the API key promptly so leads are captured.
- **Newsletter signup returns 503** `newsletter_unavailable` with a friendly
  "temporarily unavailable" message and a retry option. No silent failures.

## 2. Credentials (verified live 2026-10-13)

- **Publication:** "Karim's Newsletter" — `pub_7f333e13-09fc-493d-8ca2-6eab456a3044`
  (baked into the code as the default; no action needed).
- **API key:** Beehiiv dashboard → Settings → API. Create a key with permission
  to manage subscribers, then add it as `BEEHIIV_API_KEY` in the Vercel
  dashboard (Production env). **This is the one manual step you must do.**
- **Custom fields** already exist on the publication (exact display names used
  by the code): `First Name` (string), `Last Name` (string), `Lead Source`
  (string), `Newsletter Consent` (boolean). No manual field setup needed.

> The subscribe payload was verified end-to-end against the real API
> (201, no warnings): `{email, reactivate_existing:false,
> send_welcome_email:false, double_opt_override:"off", custom_fields:[...],
> utm_source:"website"}`, plus tags via the tags endpoint (`resume-request` /
> `blog-newsletter`, 201). After adding your API key, test both forms with
> your own email first.

## 3. How subscriber data is stored

The visitor's full name is split into the `First Name` / `Last Name` custom
fields (first token → First Name, remainder → Last Name). `Lead Source` is
`"resume-download"` or `"blog-newsletter"`; `Newsletter Consent` is `true` /
`false`. Every subscriber also gets a tag (`resume-request` or
`blog-newsletter`) via the tags endpoint.

Existing subscribers are looked up by email first; if found, their custom
fields are updated via PUT (idempotent — no duplicates, no 422s).

## 4. Keeping resume leads separate from the newsletter (important)

Beehiiv's subscription API has no separate "leads" table — every record created
is a publication subscriber. The separation is enforced as follows:

- Resume requests are created with `send_welcome_email: false` and
  `Newsletter Consent: false` (unless the visitor ticked the optional
  newsletter checkbox, which is **unchecked by default**).
- **You must configure your newsletter automations/broadcasts to target only
  subscribers where `Newsletter Consent` is true** (Beehiiv → Automations →
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
   on your chosen schedule, filtered to the `Newsletter Consent` = true
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
   your own email → appears in Beehiiv with `Lead Source`=blog-newsletter,
   `Newsletter Consent`=true; subscribing again → idempotent success.
6. Resume form **without** the newsletter checkbox → subscriber created with
   `Newsletter Consent`=false, no welcome email.
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
