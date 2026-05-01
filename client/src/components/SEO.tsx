import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://karimchaouki.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/karim-chaouki.jpg`;

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema = null,
}) {
  const fullTitle = title.includes('Karim Chaouki')
    ? title
    : `${title} | Karim Chaouki`;

  const canonicalUrl = canonical
    ? `${SITE_URL}${canonical}`
    : SITE_URL;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Karim Chaouki" />
      <meta property="og:locale" content="en_CA" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

/* ─── Shared Schema Objects ─────────────────────────────────────────── */

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
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'PMP — Project Management Professional',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Project Management Institute',
      },
    },
  ],
};

export const buildServiceSchema = (name, description, path) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name,
  description,
  url: `${SITE_URL}${path}`,
  provider: {
    '@type': 'Person',
    name: 'Karim Chaouki',
    url: SITE_URL,
  },
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
