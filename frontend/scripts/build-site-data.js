/**
 * build-site-data.js
 *
 * Track B — build-time site-data generation (SEO program, 2026-10-13).
 *
 * Runs as the `prebuild` npm/yarn lifecycle step (see package.json), i.e.
 * automatically on every `yarn build`, including on Vercel. Pure Node, zero
 * dependencies.
 *
 * 1. Reads frontend/src/data/blogPosts.json (the single source of truth for
 *    articles — the daily content engine maintains only this file).
 * 2. Writes frontend/public/sitemap.xml — this script is the SOLE sitemap
 *    writer; nothing else in the repo touches sitemap.xml.
 *      - every post WITHOUT `"noindex": true` becomes
 *        <url><loc>https://www.karimchaouki.com/blog/<slug></loc>
 *        <lastmod>YYYY-MM-DD</lastmod></url>, lastmod from publishedAt.
 *      - static pages mirror the historical frontend/public/sitemap.xml
 *        entries (loc/priority/changefreq preserved as-is; static pages keep
 *        their no-lastmod behaviour — no build-time dates).
 * 3. Writes frontend/public/article-data/<slug>.json — one file per post with
 *    the post's full JSON object as-is (feeds Track C code-splitting). ALL
 *    posts get a file, even noindexed ones — the pages still exist.
 *
 * Failure policy: a failing prebuild must NEVER break the deploy. Everything
 * runs inside a single try/catch; on any error we write a minimal valid
 * sitemap (static pages only), warn on stdout/stderr, and exit 0.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const SITE = 'https://www.karimchaouki.com';

// Static-page entries mirrored from the historical frontend/public/sitemap.xml
// (loc, priority and changefreq preserved exactly as before; static pages
// intentionally carry no <lastmod> — fixed values, never build-time dates).
const STATIC_PAGES = [
  { loc: '/', priority: '1.0', changefreq: 'monthly' },
  { loc: '/about', priority: '0.9', changefreq: 'monthly' },
  { loc: '/blog', priority: '0.9', changefreq: 'weekly' },
  { loc: '/services/aml-consultant-canada', priority: '0.9', changefreq: 'monthly' },
  { loc: '/services/adp-workforce-now-implementation', priority: '0.9', changefreq: 'monthly' },
  { loc: '/services/project-manager-payroll-systems', priority: '0.9', changefreq: 'monthly' },
  { loc: '/services/bilingual-implementation-manager', priority: '0.8', changefreq: 'monthly' },
];

function escXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Normalise a publish-date value to YYYY-MM-DD; returns null when unusable.
function toLastMod(value) {
  if (value == null) return null;
  const m = String(value).trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  const iso = m[1] + '-' + m[2] + '-' + m[3];
  const d = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return null;
  // Guard against overflow dates such as 2026-13-40 (Date would roll over).
  const back = d.toISOString().slice(0, 10);
  return back === iso ? iso : null;
}

// Slug used as a file name — strip anything that is not filename-safe so a
// rogue value can never escape the article-data directory.
function safeSlugFile(slug) {
  return String(slug)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200) || 'post';
}

function buildStaticOnlySitemap() {
  const urls = STATIC_PAGES.map(
    (p) =>
      '  <url><loc>' + escXml(SITE + p.loc) + '</loc>' +
      '<priority>' + escXml(p.priority) + '</priority>' +
      '<changefreq>' + escXml(p.changefreq) + '</changefreq></url>'
  ).join('\n');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls + '\n</urlset>\n'
  );
}

function writeFallbackSitemap(frontendDir, reason) {
  try {
    fs.mkdirSync(path.join(frontendDir, 'public'), { recursive: true });
    fs.writeFileSync(
      path.join(frontendDir, 'public', 'sitemap.xml'),
      buildStaticOnlySitemap(),
      'utf8'
    );
    console.warn('[build-site-data] WARNING: ' + reason + ' — wrote minimal static-only sitemap.xml');
  } catch (writeErr) {
    console.warn('[build-site-data] WARNING: failed to write fallback sitemap.xml: ' + (writeErr && writeErr.message));
  }
  process.exit(0);
}

// Deterministic related-post scoring shared with the client "More Articles"
// strip: shared tags, tie-break by most recent publishedAt, then slug.
// Noindexed posts are excluded from candidates (deprecated content).
function relatedFor(post, allPosts, count) {
  count = count || 3;
  const tags = new Set(post.tags || []);
  return allPosts
    .filter((p) => p && p.slug && p.slug !== post.slug && p.noindex !== true)
    .map((p) => ({
      post: p,
      shared: (p.tags || []).filter((t) => tags.has(t)).length,
    }))
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        String(b.post.publishedAt || '').localeCompare(String(a.post.publishedAt || '')) ||
        String(a.post.slug).localeCompare(String(b.post.slug))
    )
    .slice(0, count)
    .map((s) => s.post);
}

function main() {
  const scriptDir = __dirname;                     // frontend/scripts
  const frontendDir = path.resolve(scriptDir, '..'); // frontend
  const postsPath = path.join(frontendDir, 'src', 'data', 'blogPosts.json');
  const publicDir = path.join(frontendDir, 'public');
  const articleDataDir = path.join(publicDir, 'article-data');

  let posts;
  try {
    const raw = fs.readFileSync(postsPath, 'utf8');
    posts = JSON.parse(raw);
  } catch (err) {
    writeFallbackSitemap(frontendDir, 'could not read/parse ' + postsPath + ' (' + (err && err.message) + ')');
    return;
  }
  if (!Array.isArray(posts)) {
    writeFallbackSitemap(frontendDir, 'blogPosts.json is not an array');
    return;
  }

  try {
    // ---- sitemap.xml ----
    const urlLines = STATIC_PAGES.map(
      (p) =>
        '  <url><loc>' + escXml(SITE + p.loc) + '</loc>' +
        '<priority>' + escXml(p.priority) + '</priority>' +
        '<changefreq>' + escXml(p.changefreq) + '</changefreq></url>'
    );

    let included = 0;
    let skippedNoindex = 0;
    let skippedNoSlug = 0;
    let missingLastmod = 0;
    const seenSlugs = new Set();

    for (const post of posts) {
      if (!post || typeof post !== 'object') { skippedNoSlug++; continue; }
      const slug = post.slug ? String(post.slug).trim() : '';
      if (!slug) { skippedNoSlug++; continue; }
      if (seenSlugs.has(slug)) { skippedNoSlug++; continue; }
      seenSlugs.add(slug);
      if (post.noindex === true) { skippedNoindex++; continue; }

      const lastmod = toLastMod(post.publishedAt);
      if (!lastmod) missingLastmod++;
      let entry = '  <url><loc>' + escXml(SITE + '/blog/' + slug) + '</loc>';
      if (lastmod) entry += '<lastmod>' + escXml(lastmod) + '</lastmod>';
      entry += '<priority>0.8</priority><changefreq>monthly</changefreq></url>';
      urlLines.push(entry);
      included++;
    }

    const sitemap =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urlLines.join('\n') + '\n</urlset>\n';

    fs.mkdirSync(publicDir, { recursive: true });
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');

    // ---- article-data/<slug>.json (ALL posts, even noindexed ones) ----
    // Each file also carries a `related` array (3 entries, same deterministic
    // algorithm as prerender-blog.js: shared tags, tie-break by recency then
    // slug; noindexed posts excluded from candidates) for the client-side
    // "More Articles" strip in BlogPost.jsx.
    fs.mkdirSync(articleDataDir, { recursive: true });
    let articleFiles = 0;
    for (const post of posts) {
      if (!post || typeof post !== 'object') continue;
      const slug = post.slug ? String(post.slug).trim() : '';
      if (!slug) continue;
      const fileName = safeSlugFile(slug) + '.json';
      const related = relatedFor(post, posts).map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        cover: p.cover,
        publishedAt: p.publishedAt,
      }));
      const withRelated = Object.assign({}, post, { related });
      fs.writeFileSync(
        path.join(articleDataDir, fileName),
        JSON.stringify(withRelated),
        'utf8'
      );
      articleFiles++;
    }

    // ---- one-line summary ----
    console.log(
      '[build-site-data] sitemap.xml: ' + included + ' posts included, ' +
      skippedNoindex + ' skipped (noindex), ' + skippedNoSlug + ' skipped (no/invalid slug), ' +
      missingLastmod + ' without lastmod | article-data: ' + articleFiles + ' files written | static pages: ' + STATIC_PAGES.length
    );
    process.exit(0);
  } catch (err) {
    writeFallbackSitemap(frontendDir, 'unexpected error: ' + (err && err.stack ? err.stack.split('\n')[0] : err));
  }
}

main();
