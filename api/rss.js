/**
 * GET /api/rss
 *
 * RSS 2.0 feed of the blog, generated from the bundled blogPosts.json.
 * Purpose: feed Beehiiv's dashboard RSS ingestion so new articles can trigger
 * subscriber notifications (configured manually in the Beehiiv dashboard —
 * see BEEHIIV_SETUP.md). This endpoint itself only serves the feed; it does
 * not send any email.
 *
 * The JSON is bundled via vercel.json `includeFiles`, so the feed reflects the
 * latest deploy (every content push rebuilds the site).
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://www.karimchaouki.com";

function findPostsJson() {
  const candidates = [
    path.join(process.cwd(), "frontend", "src", "data", "blogPosts.json"),
    path.join(__dirname, "..", "frontend", "src", "data", "blogPosts.json"),
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

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const jsonPath = findPostsJson();
  if (!jsonPath) {
    return res.status(500).json({ error: "feed_unavailable" });
  }

  let posts;
  try {
    posts = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    if (!Array.isArray(posts)) throw new Error("not an array");
  } catch (e) {
    console.error("[rss] failed to read blogPosts.json:", e.message);
    return res.status(500).json({ error: "feed_unavailable" });
  }

  const items = posts
    .filter((p) => p && p.slug && p.title)
    .slice(0, 50)
    .map((p) => {
      const link = `${SITE_URL}/blog/${p.slug}`;
      let pubDate = "";
      if (p.publishedAt) {
        const d = new Date(p.publishedAt);
        if (!Number.isNaN(d.getTime())) pubDate = d.toUTCString();
      }
      return [
        "    <item>",
        `      <title>${esc(p.title)}</title>`,
        `      <link>${esc(link)}</link>`,
        `      <guid isPermaLink="true">${esc(link)}</guid>`,
        pubDate ? `      <pubDate>${esc(pubDate)}</pubDate>` : "",
        p.excerpt ? `      <description>${esc(p.excerpt)}</description>` : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>Karim Chaouki — Blog</title>",
    `    <link>${SITE_URL}/blog</link>`,
    "    <description>Insights on project management, HCM and ERP transformation, implementation strategy, risk management, and business transformation.</description>",
    "    <language>en-ca</language>",
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(xml);
};
