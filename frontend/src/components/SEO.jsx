// SEO component — React 19 compatible.
// Uses useEffect to imperatively manage <title>, meta tags, canonical link,
// and JSON-LD scripts in document.head. Cleans up on route change.

import { useEffect } from 'react';

const SITE_URL = 'https://karimchaouki.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/karim-chaouki.jpg`;

const setMeta = (selector, attrName, attrValue, content) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema = null,
}) {
  const fullTitle = title.includes('Karim Chaouki') ? title : `${title} | Karim Chaouki`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  useEffect(() => {
    document.title = fullTitle;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setLink('canonical', canonicalUrl);

    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Karim Chaouki');
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_CA');

    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // Remove any previous route-scoped JSON-LD blocks, then add the new ones.
    document.head
      .querySelectorAll('script[data-seo-jsonld="1"]')
      .forEach((n) => n.remove());

    const created = [];
    if (schema) {
      const blocks = Array.isArray(schema) ? schema : [schema];
      blocks.forEach((obj) => {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-seo-jsonld', '1');
        s.text = JSON.stringify(obj);
        document.head.appendChild(s);
        created.push(s);
      });
    }

    return () => {
      created.forEach((n) => n.parentNode && n.parentNode.removeChild(n));
    };
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, schema]);

  return null;
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Karim Chaouki',
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  jobTitle: 'Senior Implementation Manager — AML, Workday & Payroll Systems',
  description:
    'Bilingual Senior Implementation Manager specializing in AML compliance, Workday HCM, and payroll system implementations for Canadian financial institutions.',
  knowsLanguage: ['en', 'fr', 'ar'],
  areaServed: { '@type': 'Country', name: 'Canada' },
  sameAs: ['https://www.linkedin.com/in/karimchaouki'],
};

export const buildServiceSchema = (name, description, path) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name,
  description,
  url: `${SITE_URL}${path}`,
  provider: { '@type': 'Person', name: 'Karim Chaouki', url: SITE_URL },
  areaServed: { '@type': 'Country', name: 'Canada' },
  availableLanguage: ['English', 'French'],
});

export const buildBreadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const buildFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});
