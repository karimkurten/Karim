# SEO Optimization — Cycle 1 — Deliverables

**Site:** https://www.karimchaouki.com  
**Repo:** https://github.com/karimkurten/Karim  
**Cycle:** 1  
**Date:** 2026-04-25

---

## 1. SUMMARY OF IMPROVEMENTS

### A. Technical SEO foundation
- **`frontend/public/index.html`** — Rewritten with: SEO-tuned title, description, robots directive (`max-snippet`, `max-image-preview:large`), canonical, full Open Graph + Twitter Cards, geo meta (`CA-ON`), `lang="en-CA"`, theme color, manifest link, **preload hint for hero image**, **JSON-LD `@graph`** combining `Person` + `WebSite`, and a meaningful **`<noscript>` fallback** (huge for crawlers + accessibility) that links every service page.
- **`frontend/public/robots.txt`** — New. Allow-all with `Sitemap` directive.
- **`frontend/public/sitemap.xml`** — New. 6 URLs (home, /about, 4 service pages) with priority + changefreq.
- **`vercel.json`** — New. SPA rewrites for client routes, security headers (HSTS, X-Frame-Options, Referrer-Policy, X-Content-Type-Options), 1-year `Cache-Control` for `/images/*`, sitemap caching.

### B. SEO infrastructure inside the React app
- **`frontend/src/components/SEO.jsx`** — New reusable component. Per-route `<title>`, `<meta>`, canonical and JSON-LD injected via `useEffect` (React 19 compatible). Exposes 4 schema builders: `personSchema`, `buildServiceSchema`, `buildBreadcrumb`, `buildFAQSchema`.
- **`frontend/src/App.js`** — Wraps routing with `HelmetProvider`. **Removed the right-click / copy / DevTools blocker** (was hostile to recruiters & screen readers, hurt UX signals, and blocked legitimate sharing).
- **`frontend/package.json`** — Added `react-helmet-async ^2.0.5`.

### C. Five new high-intent landing pages (NEW URLs)
Each page has: SEO-tuned title + description, breadcrumb, JSON-LD (`ProfessionalService` + `BreadcrumbList` + `FAQPage`), proper H1/H2 hierarchy, internal links back to home and to sibling services, multiple targeted CTAs (`mailto:` + LinkedIn).

| URL | H1 | Primary keywords |
|---|---|---|
| `/services/aml-consultant-canada` | AML Compliance Consultant — Canada | AML consultant, FINTRAC compliance, KYC/CDD, transaction monitoring |
| `/services/workday-implementation-specialist` | Senior Workday Implementation Specialist — Canada | Workday HCM, Workday implementation, payroll, benefits |
| `/services/project-manager-payroll-systems` | Project Manager — Payroll & HR Systems Implementation | Payroll PM, HRIS implementation, ADP, multi-jurisdiction payroll |
| `/services/bilingual-implementation-manager` | Bilingual Implementation Manager — English & French | Bilingual PM, French project manager, Quebec, Canada |
| `/about` | About Karim Chaouki | Long-form EEAT page (expertise, experience, certifications) |

### D. Content & conversion
- New service pages each include a "Quick Facts" sidebar with credentials (PMP, FINTRAC, Toronto, bilingual) — hits **EEAT signals**.
- All pages include a clear primary CTA ("Book a Free Consultation", "Discuss Your Workday Project", "Discutons / Let's Talk").
- Crosslinking between sibling services (internal link equity passing).
- Schema FAQ sections per service unlock **Google rich-results** ("People also ask" placement).

### E. Performance
- **Removed** `Inter` font preconnect from `index.html` head if unused; preserved actual font loaders elsewhere.
- **Preload hint** on `karim-chaouki.jpg` for fastest LCP.
- 1-year immutable cache headers on `/images/*` and `/static/*` via `vercel.json`.
- `loading="lazy"` retained where present.

### F. Critical fix shipped this cycle
- **REMOVED** the global right-click + copy + DevTools-blocker `useEffect` from `App.js`. This was not only an accessibility regression but actively harmed SEO (impeded snippet selection, prevented social sharing of copied URLs/text, and may flag bot signals).

---

## 2. FILE CHANGES (full code)
The full content of every modified or new file is committed in the repo working tree at:
- `frontend/src/App.js`
- `frontend/src/components/SEO.jsx`
- `frontend/public/index.html`
- `frontend/public/robots.txt`
- `frontend/public/sitemap.xml`
- `frontend/package.json`
- `vercel.json`

## 3. NEW FILES (full code)
- `frontend/src/pages/ServiceAML.jsx`
- `frontend/src/pages/ServiceWorkday.jsx`
- `frontend/src/pages/ServicePayroll.jsx`
- `frontend/src/pages/ServiceBilingual.jsx`
- `frontend/src/pages/AboutPage.jsx`
- `frontend/src/components/SEO.jsx`
- `frontend/public/robots.txt`
- `frontend/public/sitemap.xml`
- `vercel.json`

## 4. GIT DIFF
See **`cycle1.diff`** in this folder (1,892 lines, machine-readable unified diff against the previous CRA-based `frontend/` HEAD).

## 5. COMMIT MESSAGE

```
feat(seo): cycle 1 — service landing pages, schema graph, sitemap, performance

- Add 4 high-intent service landing pages (AML, Workday, Payroll, Bilingual)
  + /about hub page, each with ProfessionalService + Breadcrumb + FAQ JSON-LD
- Reusable SEO component (per-route title, meta, canonical, JSON-LD) with
  React 19 compatible useEffect-based document.head management
- Rewrite public/index.html: SEO-tuned title/description, robots directive,
  geo meta, OG/Twitter, hero image preload, Person+WebSite @graph JSON-LD,
  <noscript> fallback that exposes every internal link to crawlers
- Add public/sitemap.xml + public/robots.txt
- Add vercel.json: SPA rewrites + security headers (HSTS, X-Frame-Options,
  Referrer-Policy) + immutable cache for /images/* and /static/*
- Wrap App in HelmetProvider, register service routes
- REMOVE global right-click / copy / DevTools-blocker effect — hurts a11y,
  recruiter UX, and SEO snippet selection
- Add react-helmet-async ^2.0.5 dependency
```

## 6. DEPLOYMENT INSTRUCTIONS

> ⚠️ **Important context**: Your GitHub `main` branch has been migrated to a **Vite + `client/`** structure (latest commits like `d155e80` "Add an image file to the assets"). The changes in this cycle target the **CRA + `frontend/`** structure that was on the repo before that migration and that the spec assumes. Pick ONE of the deployment paths below.

### Path A — You want to keep the CRA `frontend/` structure (this cycle's target)
1. Create a new branch from the last CRA-based commit:
   ```bash
   git checkout 3c0b02d  # or whichever was the last frontend/ commit
   git checkout -b seo/cycle-1
   ```
2. Apply the patch:
   ```bash
   git apply cycle1.diff
   ```
3. Install + build locally to validate:
   ```bash
   cd frontend && yarn install && yarn build
   cd .. && yarn --cwd frontend start    # smoke test
   ```
4. Commit + push:
   ```bash
   git add -A
   git commit -m "feat(seo): cycle 1 — service landing pages, schema graph, sitemap, performance"
   git push origin seo/cycle-1
   ```
5. Open PR to `main` → merge → Vercel auto-deploys.

### Path B — You're staying on the new Vite `client/` structure
The 5 page files (`ServiceAML.jsx`, `ServiceWorkday.jsx`, `ServicePayroll.jsx`, `ServiceBilingual.jsx`, `AboutPage.jsx`), the `SEO.jsx` helper, `robots.txt`, `sitemap.xml`, and `vercel.json` are all framework-agnostic. To apply:

1. Move to Vite paths:
   - `frontend/src/pages/*` → `client/src/pages/*`
   - `frontend/src/components/SEO.jsx` → `client/src/components/SEO.jsx`
   - `frontend/public/{robots.txt,sitemap.xml}` → `client/public/{robots.txt,sitemap.xml}`
   - `frontend/public/index.html` → adapt the `<head>` block into `client/index.html` (same content, but Vite uses `/` instead of `%PUBLIC_URL%`)
   - `vercel.json` stays at repo root; update `buildCommand` to `cd client && yarn build` and `outputDirectory` to `client/dist`
2. Add `react-router-dom`, `react-helmet-async` if not already in `client/package.json`.
3. Register the 5 routes in your router config.

### Post-deploy checks
- ✅ Open `https://karimchaouki.com/services/aml-consultant-canada` — title + canonical should match
- ✅ Open `https://karimchaouki.com/sitemap.xml` and `/robots.txt` — both 200 OK
- ✅ Run [Google Rich Results Test](https://search.google.com/test/rich-results) on each new page → expect ProfessionalService, BreadcrumbList, FAQPage detected
- ✅ Submit `https://karimchaouki.com/sitemap.xml` in **Google Search Console** → request indexing for the 4 service URLs
- ✅ Run **PageSpeed Insights** → confirm LCP < 2.5s on mobile (preload should help)
- ✅ Test bilingual hreflang signals after Cycle 2 (FR landing pages are next)

---

## NEXT CYCLES (planned)

**Cycle 2 — French market**
- Translate 4 service pages → `/fr/services/...` with `hreflang="fr-CA"`
- Translate `/about` → `/fr/a-propos`
- Add language switcher in `Header`
- Update `sitemap.xml` with FR URLs + xhtml:link alternates

**Cycle 3 — Topical authority via blog**
- Add `/insights/` blog with 6 launch posts targeting:
  - "FINTRAC compliance checklist 2026"
  - "Workday vs ADP Workforce Now comparison Canada"
  - "Cross-border payroll Canada-USA mistakes"
  - "AML KYC for fintech startups"
  - "How to prepare for a Workday HCM go-live"
  - "PMP vs RMP for HCM project managers"
- BlogPosting + Article JSON-LD per post

**Cycle 4 — Conversion / EEAT**
- Add testimonials carousel with `Review` schema on each service page
- Add case studies (`/case-studies/...`) with quantified outcomes
- Add booking widget (Calendly / Cal.com) → primary CTA conversion
- Add `Offer` schema with `priceRange` per service

---

## AUTOMATION HOOKS
- `cycle1.diff` is unified-diff format → can be `git apply`-ed in CI.
- A starter GitHub Action to run weekly Lighthouse + sitemap-ping is at `karim-seo/.github/workflows/seo-health-check.yml` in the original zip; merge that file at `.github/workflows/seo-health-check.yml` to enable scheduled SEO regression checks.

---

## Code Quality Fixes Applied (post-review patch)

### Files updated
- 13 array-index keys swapped to data-stable keys across:
  `Certifications.jsx`, `ImpactMetrics.jsx`, `Testimonials.jsx`, `Hero.jsx`, `FAQ.jsx`, `ValueProposition.jsx`, `Expertise.jsx` (×2), `Timeline.jsx` (×2), `Contact.jsx` (×2)
- `SEO.jsx` — useEffect deps reduced from 6 → 1 via `useMemo` config object; `applyHead` extracted as pure helper outside the component.
- `use-toast.js` — removed `[state]` over-dependency; now `[]` with documented eslint-disable (false-positive: `setState` is a stable React setter, `listeners` is module-scoped).
- `Header.jsx`, `CookieConsent.jsx` — added explicit return paths and inline comments documenting the genuinely-empty-deps intent (false positives flagged by code-review tool: `setScrolled`/`setVisible` are stable React setters, `localStorage` is a global, `handleScroll` is locally scoped).

### Files intentionally NOT changed (with rationale)
- **`Contact.jsx`** (309 lines, complexity 14) — Working production form with email submission, validation, error states, and success animation. Splitting would create 3 files for marginal benefit and risks regressions to a working contact-conversion flow. Kept as-is.
- **`server.py:88` `send_email_notification()`** (69 lines) — Out of scope for this SEO cycle; backend is functional. Will revisit in a future cycle if email logic expands.
- **Service-page render functions (`ServiceAML`, `ServiceBilingual`, etc.)** — The "204 / 181 / 218 lines" reports measure JSX render output, not logic. Data arrays are already hoisted to module scope. Splitting JSX into sub-components for cosmetic line-count is anti-pattern in single-purpose page components.

### `useScrollReveal.js` & `use3DTilt.js` hook-deps reports
All flagged "missing deps" are **false positives** by the linter:
- `IntersectionObserver`, `requestAnimationFrame`, `cancelAnimationFrame` — globals
- `setIsVisible`, `setCount`, `setStyle` — stable React setters (guaranteed identity)
- `entry`, `node`, `animate`, `animationFrame`, `el`, `midX`, `midY` — locally-scoped vars inside the effect/callback body
- `intensity` is already in `[intensity]` dep array of `handleMouseMove`

These hooks are correct as written. Adding any of these to dep arrays would either cause infinite re-render loops or has no semantic meaning.

### Verification
- `yarn build` — exits 0, **zero errors, zero warnings**
- ESLint on modified files — `✅ No issues found`
- Live preview smoke test — all 6 routes (/, /about, 4 services) load with correct title/canonical/JSON-LD, no runtime errors

### Updated diff files
- **`cycle1.diff`** — incremental diff (code-quality fixes only, 338 lines)
- **`cycle1-full.diff`** — cumulative diff for the full Cycle 1 (SEO + code-quality, 7,920 lines), `git apply`-ready

