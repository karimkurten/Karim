const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.karimchaouki.com';
const DEFAULT_TITLE = 'Karim Chaouki — AML and Workforce Now Implementation Consultant | Canada';
const DEFAULT_DESCRIPTION = 'Senior Implementation Consultant specializing in AML compliance, ADP Workforce Now HCM, and payroll systems for Canadian financial institutions.';

const buildDir = path.resolve(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');
const postsPath = path.join(__dirname, '..', 'src', 'data', 'blogPosts.json');
const appJsPath = path.join(__dirname, '..', 'src', 'App.js');

if (!fs.existsSync(indexPath)) {
  console.error('build/index.html not found. Run the build first.');
  process.exit(1);
}

if (!fs.existsSync(postsPath)) {
  console.error('src/data/blogPosts.json not found.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf8');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// ---------------------------------------------------------------------------
// Static pages. Every non-dynamic App.js route that should be indexed needs an
// entry here (M7 assertion below enforces this). `h1` is the real page H1 that
// goes into the raw HTML (M1). `noindex: true` emits a raw-HTML noindex robots
// meta (H1). `articleList: true` renders the full article index into /blog (H5).
// ---------------------------------------------------------------------------
const staticPages = [
  { path: '/about', h1: 'About Karim Chaouki', title: 'About Karim Chaouki | AML & HCM Implementation Consultant', description: 'Learn about Karim Chaouki — Senior Implementation Consultant specializing in AML compliance, ADP Workforce Now HCM, and payroll system implementations for Canadian financial institutions. PMP Certified. Bilingual EN/FR.' },
  { path: '/blog', h1: 'Blog — Implementation Insights', title: 'Blog — AML, Enterprise HCM & Implementation Insights | Karim Chaouki', description: 'Articles on AML compliance, enterprise HCM implementations, cross-border US/Canada payroll, and HCM project management — by Karim Chaouki, senior implementation consultant.', articleList: true },
  { path: '/services/aml-consultant-canada', h1: 'AML Compliance Consultant Canada', title: 'AML Compliance Consultant Canada | FINTRAC & KYC | Karim Chaouki', description: 'AML compliance consultant serving Canadian financial institutions. FINTRAC compliance, KYC/CDD implementation, transaction monitoring, and AML program design. Bilingual EN/FR. Based in Toronto.' },
  { path: '/services/adp-workforce-now-implementation', h1: 'HCM & Payroll Implementation Consultant', title: 'ADP Workforce Now Implementation Consultant | Karim Chaouki', description: 'Senior ADP Workforce Now implementation consultant for US and Canadian organizations. Payroll, HCM, Benefits, Time & Attendance, and Talent. PMP Certified. Bilingual EN/FR.' },
  { path: '/services/project-manager-payroll-systems', h1: 'Payroll Systems Project Manager, Canada', title: 'Payroll Systems Project Manager, Canada | Karim Chaouki', description: 'Payroll systems project manager for Canadian organizations. Multi-province payroll migrations and CPP/EI compliance. PMP Certified.' },
  { path: '/services/bilingual-implementation-manager', h1: 'Bilingual (EN/FR) Implementation Manager', title: 'Bilingual (EN/FR) Implementation Manager | Karim Chaouki', description: 'Bilingual (English/French) implementation manager for Canadian organizations. AML compliance, ADP Workforce Now HCM, and payroll implementations in both official languages.' },
  // H1: the gated resume page serves its own title + self-canonical with a
  // raw-HTML noindex (the client-side noindex only applied after hydration).
  { path: '/resume', h1: 'Request My Resume', title: 'Download Resume — Karim Chaouki', description: "Enter your name and email to access Karim Chaouki's professional resume.", noindex: true },
];

// ---------------------------------------------------------------------------
// M7 — build-time route coverage assertion.
// Every <Route path="..."> in src/App.js must either have a prerender entry
// (a staticPages path, the homepage base HTML, or a /blog/:slug article page)
// or be listed in OPT_OUT_ROUTES. Fails loudly by design: a new route that
// ships with homepage title/meta/canonical is an SEO incident, not a warning.
// ---------------------------------------------------------------------------
const OPT_OUT_ROUTES = [
  '/privacy-policy',       // Legal pages: intentionally not prerendered (robots.txt Disallow).
  '/terms-and-conditions', // Legal pages: intentionally not prerendered (robots.txt Disallow).
  '*',                     // Catch-all 404 route: must never get a static prerendered file.
];

const extractAppRoutes = () => {
  let src;
  try {
    src = fs.readFileSync(appJsPath, 'utf8');
  } catch (err) {
    console.error(`prerender coverage check: could not read src/App.js (${err.message})`);
    process.exit(1);
  }
  return [...src.matchAll(/<Route\s+[^>]*path="([^"]+)"[^>]*>/g)].map((m) => m[1]);
};

const assertPrerenderCoverage = () => {
  const covered = new Set(['/', '/blog/:slug', ...staticPages.map((p) => p.path)]);
  const missing = extractAppRoutes().filter(
    (route) => !covered.has(route) && !OPT_OUT_ROUTES.includes(route)
  );
  if (missing.length > 0) {
    console.error('ERROR: prerender coverage check failed.');
    console.error('The following src/App.js routes have no prerender entry and are not in OPT_OUT_ROUTES:');
    for (const route of missing) console.error(`  - ${route}`);
    console.error('Fix: add a staticPages entry in frontend/scripts/prerender-blog.js,');
    console.error('or add the route to OPT_OUT_ROUTES if it must not be prerendered.');
    process.exit(1);
  }
};

// ---------------------------------------------------------------------------
// Shared HTML transforms.
// ---------------------------------------------------------------------------

// L3: drop the hardcoded og:image width/height (1200x630) — actual cover
// images vary in size, so the declared dimensions mislead scrapers.
const stripOgImageDims = (html) =>
  html
    .replace(/<meta property="og:image:width" content=".*?"\s*\/?>\s*/g, '')
    .replace(/<meta property="og:image:height" content=".*?"\s*\/?>\s*/g, '');

const setRobotsNoindex = (html) =>
  html.replace(
    /<meta name="robots" content=".*?"\s*\/?>/,
    '<meta name="robots" content="noindex, nofollow" />'
  );

// Pull the site-nav link list out of the base <noscript> so prerendered
// pages keep the same fallback navigation without hardcoding it twice.
const extractNavList = (html) => {
  try {
    const noscript = html.match(/<noscript>[\s\S]*?<\/noscript>/);
    if (!noscript) return '';
    const ul = noscript[0].match(/<ul>([\s\S]*?)<\/ul>/);
    return ul ? ul[1] : '';
  } catch (err) {
    console.error(`warning: could not extract noscript nav list (${err.message})`);
    return '';
  }
};

const NAV_LIST = extractNavList(baseHtml);

// M1: rebuild the <noscript> block per route with the page's real H1.
// (The JS app replaces this entire block on hydration, so it is invisible
// to sighted users; it is what no-JS crawlers and scrapers see.)
const buildNoscript = ({ h1, intro, extra }) => `
    <noscript>
      <div style="font-family:sans-serif;max-width:800px;margin:40px auto;padding:20px">
        <h1>${escapeHtml(h1)}</h1>
        ${intro ? `<p>${escapeHtml(intro)}</p>` : ''}
        ${extra || ''}
        <h2>Site navigation</h2>
        <ul>${NAV_LIST}</ul>
      </div>
    </noscript>`;

const replaceNoscript = (html, noscript) =>
  html.replace(/<noscript>[\s\S]*?<\/noscript>/, noscript.trim());

const absolutizeCover = (cover) =>
  cover
    ? (cover.startsWith('http') ? cover : `${SITE_URL}${cover}`)
    : `${SITE_URL}/images/karim-chaouki.jpg`;

// M4: cover <img> with descriptive alt for the raw HTML. (No srcset: the repo
// ships a single full-size cover per article and no resized variants exist,
// so emitting srcset URLs would point at files that don't exist.)
const buildCoverImg = (post, image) => {
  const alt = post.imageAlt || post.coverAlt || post.title;
  return `<img src="${escapeHtml(image)}" alt="${escapeHtml(alt)}" loading="lazy" style="max-width:100%;height:auto;border-radius:8px" />`;
};

// ---------------------------------------------------------------------------
// H5 — related-article links (deterministic).
// "Same cluster" = shared tags from blogPosts.json. Score = number of shared
// tags; ties break by most recent publishedAt, then slug. Articles with no
// shared tags fall back to the most recent ones (the scoring naturally does
// this: every candidate has >= 0 shared tags, so the newest surface first).
// ---------------------------------------------------------------------------
const relatedPosts = (post, allPosts, count = 4) => {
  const tags = new Set(post.tags || []);
  return allPosts
    .filter((p) => p.slug !== post.slug && p.noindex !== true)
    .map((p) => ({
      post: p,
      shared: (p.tags || []).filter((t) => tags.has(t)).length,
    }))
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        String(b.post.publishedAt || '').localeCompare(String(a.post.publishedAt || '')) ||
        a.post.slug.localeCompare(b.post.slug)
    )
    .slice(0, count)
    .map((s) => s.post);
};

const buildRelatedList = (post, allPosts) => {
  const related = relatedPosts(post, allPosts);
  if (related.length === 0) return '';
  const items = related
    .map((p) => `          <li><a href="/blog/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a></li>`)
    .join('\n');
  return `        <h2>Related articles</h2>\n        <ul>\n${items}\n        </ul>`;
};

const buildArticleList = (allPosts) => {
  const sorted = [...allPosts].sort((a, b) =>
    String(b.publishedAt || '').localeCompare(String(a.publishedAt || ''))
  );
  const items = sorted
    .map((p) => `          <li><a href="/blog/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a></li>`)
    .join('\n');
  return `        <h2>All articles</h2>\n        <ul>\n${items}\n        </ul>`;
};

// ---------------------------------------------------------------------------
// H3 + L9 — per-article JSON-LD: BlogPosting + BreadcrumbList in one @graph.
// ---------------------------------------------------------------------------
const toIsoDate = (value) => {
  if (!value || typeof value !== 'string') return undefined;
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return undefined;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return Number.isNaN(d.getTime()) ? undefined : `${m[1]}-${m[2]}-${m[3]}`;
};

const buildArticleSchema = (post, postUrl, image) => {
  const datePublished = toIsoDate(post.publishedAt);
  const dateModified = toIsoDate(post.dateModified || post.updatedAt) || datePublished;
  const blogPosting = {
    '@type': 'BlogPosting',
    headline: post.title,
    image,
    author: { '@type': 'Person', name: 'Karim Chaouki', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Karim Chaouki',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  };
  if (post.excerpt) blogPosting.description = post.excerpt;
  if (datePublished) blogPosting.datePublished = datePublished;
  if (dateModified) blogPosting.dateModified = dateModified;
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };
  return { '@context': 'https://schema.org', '@graph': [blogPosting, breadcrumb] };
};

const injectJsonLd = (html, schemaObj) => {
  try {
    const json = JSON.stringify(schemaObj).replace(/<\//g, '<\\/');
    return html.replace(
      '</head>',
      `<script type="application/ld+json" data-prerender="1">${json}</script>\n</head>`
    );
  } catch (err) {
    console.error(`warning: JSON-LD injection failed (${err.message}); continuing without it.`);
    return html;
  }
};

// ---------------------------------------------------------------------------
// Per-article HTML builder.
// ---------------------------------------------------------------------------
const buildPostHtml = (post, allPosts) => {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | Karim Chaouki`;
  const description = post.excerpt || DEFAULT_DESCRIPTION;
  const image = absolutizeCover(post.cover);

  let html = baseHtml;

  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);

  html = html.replace(
    /<meta name="description" content=".*?"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  html = html.replace(
    /<link rel="canonical" href=".*?"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(postUrl)}" />`
  );

  html = html.replace(
    /<meta property="og:type" content=".*?"\s*\/?>/,
    `<meta property="og:type" content="article" />`
  );

  html = html.replace(
    /<meta property="og:url" content=".*?"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(postUrl)}" />`
  );

  html = html.replace(
    /<meta property="og:title" content=".*?"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );

  html = html.replace(
    /<meta property="og:description" content=".*?"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );

  html = html.replace(
    /<meta property="og:image" content=".*?"\s*\/?>/,
    `<meta property="og:image" content="${escapeHtml(image)}" />`
  );

  html = html.replace(
    /<meta name="twitter:title" content=".*?"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );

  html = html.replace(
    /<meta name="twitter:description" content=".*?"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );

  html = html.replace(
    /<meta name="twitter:image" content=".*?"\s*\/?>/,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`
  );

  // noindex contract: a blogPosts.json entry flagged "noindex": true gets a
  // raw-HTML noindex robots meta.
  if (post.noindex === true) {
    html = setRobotsNoindex(html);
  }

  html = stripOgImageDims(html);

  // M1 + M4 + H5: real H1, cover image with alt, related-article links.
  try {
    const noscript = buildNoscript({
      h1: post.title,
      intro: post.excerpt,
      extra: `${buildCoverImg(post, image)}\n${buildRelatedList(post, allPosts)}`,
    });
    html = replaceNoscript(html, noscript);
  } catch (err) {
    console.error(`warning: noscript build failed for /blog/${post.slug} (${err.message})`);
  }

  // H3 + L9: BlogPosting + BreadcrumbList JSON-LD.
  html = injectJsonLd(html, buildArticleSchema(post, postUrl, image));

  return html;
};

// ---------------------------------------------------------------------------
// Static page HTML builder.
// ---------------------------------------------------------------------------
const buildStaticPageHtml = (page) => {
  const url = `${SITE_URL}${page.path}`;
  let html = baseHtml;
  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = html.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${escapeHtml(page.description)}" />`);
  html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${escapeHtml(url)}" />`);
  html = html.replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${escapeHtml(url)}" />`);
  html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`);
  html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`);

  if (page.noindex === true) {
    html = setRobotsNoindex(html);
  }

  html = stripOgImageDims(html);

  // M1 (+ H5 for /blog): real H1 and, for /blog, the full article index.
  try {
    const noscript = buildNoscript({
      h1: page.h1,
      intro: page.description,
      extra: page.articleList ? buildArticleList(posts) : '',
    });
    html = replaceNoscript(html, noscript);
  } catch (err) {
    console.error(`warning: noscript build failed for ${page.path} (${err.message})`);
  }

  return html;
};

// ---------------------------------------------------------------------------
// Run.
// ---------------------------------------------------------------------------
assertPrerenderCoverage();

for (const page of staticPages) {
  const html = buildStaticPageHtml(page);
  const dir = path.join(buildDir, page.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`Prerendered: ${page.path}/index.html`);
}

let generated = 0;

for (const post of posts) {
  const postDir = path.join(buildDir, 'blog', post.slug);
  fs.mkdirSync(postDir, { recursive: true });
  let postHtml;
  try {
    postHtml = buildPostHtml(post, posts);
  } catch (err) {
    // Bulletproofing: one malformed post must never break the whole build.
    console.error(`warning: failed to build HTML for /blog/${post.slug} (${err.message}); writing fallback.`);
    postHtml = stripOgImageDims(baseHtml);
  }
  fs.writeFileSync(path.join(postDir, 'index.html'), postHtml);
  generated += 1;
  console.log(`Prerendered: /blog/${post.slug}/index.html`);
}

console.log(`Prerendered ${generated} blog article(s).`);
