const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.karimchaouki.com';
const DEFAULT_TITLE = 'Karim Chaouki — AML and Workforce Now Implementation Consultant | Canada';
const DEFAULT_DESCRIPTION = 'Senior Implementation Consultant specializing in AML compliance, ADP Workforce Now HCM, and payroll systems for Canadian financial institutions.';

const buildDir = path.resolve(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');
const postsPath = path.join(__dirname, '..', 'src', 'data', 'blogPosts.json');

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

const buildPostHtml = (post) => {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | Karim Chaouki`;
  const description = post.excerpt || DEFAULT_DESCRIPTION;
  const image = post.cover ? (post.cover.startsWith('http') ? post.cover : `${SITE_URL}${post.cover}`) : `${SITE_URL}/images/karim-chaouki.jpg`;

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

  return html;
};

const staticPages = [
  { path: '/about', title: 'About Karim Chaouki | AML & HCM Implementation Consultant', description: 'Learn about Karim Chaouki — Senior Implementation Consultant specializing in AML compliance, ADP Workforce Now HCM, and payroll system implementations for Canadian financial institutions. PMP Certified. Bilingual EN/FR.' },
  { path: '/blog', title: 'Blog — AML, ADP Workforce Now & HCM Implementation Insights | Karim Chaouki', description: 'Articles on AML compliance, ADP Workforce Now implementation, cross-border US/Canada payroll, and HCM project management by Karim Chaouki.' },
  { path: '/services/aml-consultant-canada', title: 'AML Compliance Consultant Canada | FINTRAC & KYC | Karim Chaouki', description: 'AML compliance consultant serving Canadian financial institutions. FINTRAC compliance, KYC/CDD implementation, transaction monitoring, and AML program design. Bilingual EN/FR. Based in Toronto.' },
  { path: '/services/adp-workforce-now-implementation', title: 'ADP Workforce Now Implementation Consultant | Karim Chaouki', description: 'Senior ADP Workforce Now implementation consultant for US and Canadian organizations. Payroll, HCM, Benefits, Time & Attendance, and Talent. PMP Certified. Bilingual EN/FR.' },
  { path: '/services/project-manager-payroll-systems', title: 'Payroll Systems Project Manager, Canada | Karim Chaouki', description: 'Payroll systems project manager for Canadian organizations. Multi-province payroll migrations and CPP/EI compliance. PMP Certified.' },
  { path: '/services/bilingual-implementation-manager', title: 'Bilingual (EN/FR) Implementation Manager | Karim Chaouki', description: 'Bilingual (English/French) implementation manager for Canadian organizations. AML compliance, ADP Workforce Now HCM, and payroll implementations in both official languages.' },
];

for (const page of staticPages) {
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
  const dir = path.join(buildDir, page.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`Prerendered: ${page.path}/index.html`);
}

let generated = 0;

for (const post of posts) {
  const postDir = path.join(buildDir, 'blog', post.slug);
  fs.mkdirSync(postDir, { recursive: true });
  const postHtml = buildPostHtml(post);
  fs.writeFileSync(path.join(postDir, 'index.html'), postHtml);
  generated += 1;
  console.log(`Prerendered: /blog/${post.slug}/index.html`);
}

console.log(`Prerendered ${generated} blog article(s).`);
