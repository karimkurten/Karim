# How to add a new blog post

The blog is powered by a single file: **`frontend/src/data/blogPosts.json`**.
To publish a new article, edit this file, commit, and push to GitHub. Vercel
auto-deploys within ~60 seconds.

---

## Step-by-step

### 1. Open `frontend/src/data/blogPosts.json`

You'll see an array of post objects. Add a **new object at the top** of the
array (so it shows first, though the blog also sorts by `publishedAt`).

### 2. Fill in the fields

```json
{
  "slug": "url-friendly-slug-here",
  "title": "Full Article Title",
  "excerpt": "A 1-2 sentence summary shown on the blog index page.",
  "publishedAt": "2026-05-01",
  "readingTime": "6 min read",
  "cover": "/images/karim-chaouki.jpg",
  "tags": ["AML", "Compliance", "Canada"],
  "linkedinUrl": "https://www.linkedin.com/pulse/your-article-url",
  "content": [
    { "type": "p", "text": "First paragraph..." },
    { "type": "h2", "text": "A section heading" },
    { "type": "p", "text": "Another paragraph..." },
    { "type": "ul", "items": ["Bullet one", "Bullet two"] },
    { "type": "quote", "text": "A pull quote", "cite": "Attribution" },
    { "type": "img", "src": "/images/post-image.jpg", "alt": "Alt text", "caption": "Optional caption" }
  ]
}
```

### 3. Field reference

| Field | Required | Notes |
|---|---|---|
| `slug` | ✅ | URL path: `/blog/{slug}`. Use lowercase, hyphens, no spaces, no accents. |
| `title` | ✅ | Shows as `<h1>` and in `<title>` tag. |
| `excerpt` | ✅ | Shown on blog index + used for meta description. |
| `publishedAt` | ✅ | ISO date `YYYY-MM-DD`. Used for sorting. |
| `readingTime` | optional | Free text, e.g. `"6 min read"`. |
| `cover` | ✅ | Path to cover image under `frontend/public`. |
| `tags` | optional | Array of short strings; first 3 shown on card. |
| `linkedinUrl` | optional | If set, shows "Read on LinkedIn" link. |
| `content` | ✅ | Array of content blocks — see below. |

### 4. Content block types

- **`{ "type": "p", "text": "..." }`** — paragraph
- **`{ "type": "h2", "text": "..." }`** — section heading (H2)
- **`{ "type": "h3", "text": "..." }`** — sub-heading (H3)
- **`{ "type": "ul", "items": ["...", "..."] }`** — bullet list
- **`{ "type": "quote", "text": "...", "cite": "..." }`** — pull quote
- **`{ "type": "img", "src": "...", "alt": "...", "caption": "..." }`** — figure

### 5. Update the sitemap

Open **`frontend/public/sitemap.xml`** and add a new `<url>` entry:

```xml
<url>
  <loc>https://karimchaouki.com/blog/your-new-slug</loc>
  <priority>0.8</priority>
  <changefreq>monthly</changefreq>
</url>
```

### 6. Commit & push

```bash
git add frontend/src/data/blogPosts.json frontend/public/sitemap.xml
git commit -m "blog: publish 'Your Article Title'"
git push origin main
```

Vercel will auto-deploy. Your article goes live at
`https://karimchaouki.com/blog/your-new-slug`.

---

## Copy-paste workflow from LinkedIn

1. On LinkedIn, open your article in edit mode (or read-view).
2. Copy the title → paste into `title` field.
3. Copy the first 1-2 sentences → paste into `excerpt` field.
4. Copy the article body paragraph-by-paragraph → each becomes a
   `{ "type": "p", "text": "..." }` block.
5. Convert section headings (bold lines or LinkedIn H2s) to
   `{ "type": "h2", "text": "..." }` blocks.
6. Grab the LinkedIn article URL (click the 3-dot menu → "Copy link") and
   paste into `linkedinUrl`.

Takes about 3-4 minutes per article.

---

## SEO tips for maximum reach

- **Slug**: include your primary keyword. `aml-compliance-canada` ranks better
  than `my-thoughts-on-aml`.
- **Title**: 55-65 characters; lead with the keyword for the intent you want
  to rank for.
- **Excerpt**: 140-160 characters; this is what Google shows in search
  results.
- **Tags**: 3-5 specific tags work best. Avoid generic ones like "Business"
  or "Leadership".
- **Publish cadence**: 1 article every 2-4 weeks is ideal for Google to see
  the site as active.
- **Cross-link**: in each article body, include 1-2 links to your service
  pages (e.g. `/services/adp-workforce-now-implementation`) to pass link
  equity and help readers convert.

---

## Why not auto-sync from LinkedIn?

LinkedIn blocks automated scraping (they return HTTP 403 to all non-browser
requests) and has no public article API. Every reliable "LinkedIn → site"
solution I've evaluated (rss.app, Zapier, Make.com) is either a paid
workaround that breaks periodically, or violates LinkedIn's terms of service.

The most SEO-valuable approach is actually to **publish on your site FIRST**,
then cross-post to LinkedIn. That way Google indexes `karimchaouki.com` as
the canonical source — dramatically better for your organic search rankings.

---

## Interactive content blocks (added 2026-09-24)

The blog renderer (`frontend/src/pages/BlogPost.jsx`) supports interactive widgets via `frontend/src/components/InteractiveWidgets.jsx`. Use 1–3 per article so readers enjoy the read. All text is plain (no markdown). Styling is site-aligned automatically (slate-900/blue-900 hero accents, #1A202C serif headings, #2B6CB0 accent blue, #F0F4F8 panels).

- **tabs** — tabbed panels, e.g. current-state vs future-state:
  `{"type":"tabs","label":"...","items":[{"tab":"Current state","heading":"...","paragraphs":["..."]}]}`
- **accordion** — expandable FAQ / mistake cards (one open at a time):
  `{"type":"accordion","label":"...","items":[{"q":"...","a":"..."}]}`
- **steps** — click-through walkthrough with progress bar and dots:
  `{"type":"steps","label":"...","intro":"...","items":[{"title":"...","text":"..."}]}`
- **flip** — 3D flip cards, e.g. before/after or term/definition:
  `{"type":"flip","label":"...","items":[{"front":"...","back":"..."}]}`
- **quiz** — self-check questions with instant feedback, score, and retry:
  `{"type":"quiz","label":"Check your understanding","questions":[{"q":"...","options":[{"text":"...","correct":true,"why":"..."}]}]}`
- **compare** — before/after drag slider:
  `{"type":"compare","label":"...","beforeTitle":"Before","afterTitle":"After","before":"...","after":"...","beforeItems":["..."],"afterItems":["..."]}`

Rules: never invent numbers or survey data to fill a widget; quiz explanations must be grounded in the article; keep each widget focused (3–5 tabs/steps/questions max).

<!-- CI nudge: retrigger Vercel build after article-09 publish (2026-09-24) -->
