# Product Requirements Document — Karim Chaouki SEO Optimization Agent

## Original problem statement
Continuously improve SEO, performance, and conversion rate of https://www.karimchaouki.com/. Operate in iterative ANALYZE → PLAN → EXECUTE → DEPLOY cycles. Output: production-ready code (modified files, new files, git diff, commit message, deployment instructions). Target high-intent keywords (Project Manager, AML Consultant, Workday Implementation, Payroll Systems). Repo: https://github.com/karimkurten/Karim.

## User personas
1. **Recruiters** — looking for a senior PM with HCM/AML credentials → high-intent search "Workday implementation specialist Canada", "AML consultant Toronto", "bilingual project manager".
2. **Direct clients** (banks, fintech, mid-market) — searching for an external implementation partner.

## Core requirements (static)
- Target high-intent keywords only
- Recruiter + client search-intent optimization
- Mobile-first
- Schema.org JSON-LD (Person, ProfessionalService, Breadcrumb, FAQ)
- Internal linking
- Performance (lazy load, image preload, image compression)
- Bilingual EN/FR
- Geo-target Canada + USA
- Clear CTAs (contact, hire, consult)
- Output must be machine-readable & ready for automation pipelines

## What's been implemented
### Cycle 1 — 2026-04-25
- Removed hostile UX blocker (right-click / copy / DevTools effect) from App.js
- Added 4 service landing pages: AML, Workday, Payroll, Bilingual
- Added /about long-form EEAT page
- Created reusable `SEO.jsx` component (React 19 compatible, useEffect-based) with 4 schema builders
- Added HelmetProvider wrapping
- Rewrote `index.html` with full SEO head: OG, Twitter, robots directives, geo meta, JSON-LD @graph (Person + WebSite), preload, noscript fallback with internal links
- New `robots.txt` + `sitemap.xml` (6 URLs)
- New `vercel.json` (SPA rewrites, security headers, cache control)
- Validated: production build clean, all 6 routes load with correct title/canonical/JSON-LD, no runtime errors
- Deliverables in `/app/seo-deliverables/cycle1/`: `README.md` + `cycle1.diff`

## Prioritized backlog
### P0
- Submit new sitemap to Google Search Console (post-deploy, manual)
- Validate Rich Results for all 4 service pages

### P1 — Cycle 2 (next)
- French translations for 4 service pages + /about → `/fr/...`
- `hreflang` alternates in sitemap.xml + per-page
- Language switcher in Header

### P2 — Cycle 3
- `/insights/` blog system with 6 launch posts (BlogPosting schema)
- Internal-link strategy from posts to service pages

### P3 — Cycle 4
- Testimonials with Review schema on each service page
- Case studies pages (`/case-studies/...`)
- Booking widget (Calendly/Cal.com) → conversion uplift
- Offer schema with priceRange

## Architecture / tasks done
- Frontend: React 19 + CRA + craco + Tailwind. SPA on Vercel.
- Backend: FastAPI (touched only the contact endpoint indirectly).
- SEO infra: client-side document.head mutation via `SEO.jsx` (works without SSR; pairs well with React 19's hydration).
- IMPORTANT: User's GitHub `main` branch has migrated to a Vite + `client/` layout. Cycle 1 code targets the prior CRA + `frontend/` layout per the user's spec. Deployment instructions cover both paths.

## Next tasks
1. User to push Cycle 1 to GitHub (Path A or Path B from deliverables README)
2. Run Cycle 2 (French translations + hreflang)
