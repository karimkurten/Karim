import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO, { buildBreadcrumb } from '../components/SEO';
import posts from '../data/blogPosts.json';
import { Calendar, Clock, ExternalLink, Tag } from 'lucide-react';

const SITE_URL = 'https://karimchaouki.com';

const blogListSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      name: 'Karim Chaouki — Blog',
      url: `${SITE_URL}/blog`,
      description:
        'Insights on AML compliance, ADP Workforce Now implementation, cross-border payroll, and HCM project management from a senior consultant at ADP\u2019s Center of Excellence.',
      author: { '@type': 'Person', name: 'Karim Chaouki', url: SITE_URL },
      inLanguage: 'en-CA',
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.publishedAt,
        image: `${SITE_URL}${p.cover}`,
        author: { '@type': 'Person', name: 'Karim Chaouki', url: SITE_URL },
        keywords: (p.tags || []).join(', '),
      })),
    },
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
  ],
};

const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
);

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const BlogCard = ({ post }) => (
  <article
    data-testid={`blog-card-${post.slug}`}
    className="group flex flex-col border border-[#E2E8F0] rounded-2xl overflow-hidden bg-white hover:border-[#2B6CB0]/30 hover:shadow-lg hover:shadow-[#2B6CB0]/5 transition-all duration-500 hover:-translate-y-1"
  >
    <Link to={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden bg-[#F0F4F8]">
      <img
        src={post.cover}
        alt={post.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
    </Link>
    <div className="flex flex-col flex-1 p-6">
      <div className="flex flex-wrap gap-2 mb-3">
        {(post.tags || []).slice(0, 3).map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2B6CB0]/10 text-[#2B6CB0] text-xs font-medium border border-[#2B6CB0]/20"
          >
            <Tag size={10} />
            {t}
          </span>
        ))}
      </div>
      <h2 className="text-xl font-serif font-bold text-[#1A202C] leading-snug mb-3 group-hover:text-[#2B6CB0] transition-colors">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-sm text-[#64748B] leading-relaxed mb-5 flex-1">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E2E8F0] text-xs text-[#94A3B8]">
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={12} />
          {formatDate(post.publishedAt)}
        </span>
        {post.readingTime && (
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} />
            {post.readingTime}
          </span>
        )}
      </div>
    </div>
  </article>
);

export default function BlogIndex() {
  return (
    <>
      <SEO
        title="Blog — AML, ADP Workforce Now & HCM Implementation Insights"
        description="Articles on AML compliance, ADP Workforce Now implementation, cross-border US/Canada payroll, and HCM project management — by Karim Chaouki, senior implementation consultant at ADP\u2019s Center of Excellence."
        canonical="/blog"
        schema={blogListSchema}
      />
      <Header />

      <main id="main-content">
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-blue-300">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-blue-500">›</li>
                <li className="text-white font-medium">Blog</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Insights &amp; Articles
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl leading-relaxed">
              Field notes on AML compliance, ADP Workforce Now implementations,
              cross-border US/Canada payroll, and running HCM projects that
              actually hit go-live dates.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 bg-[#F0F4F8]">
          <div className="max-w-6xl mx-auto">
            {sortedPosts.length === 0 ? (
              <p className="text-center text-[#64748B]">No posts yet. Check back soon.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}

            <div className="mt-16 text-center">
              <a
                href="https://www.linkedin.com/in/karimchaouki/recent-activity/articles/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="linkedin-articles-link"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#2B6CB0]/30 text-[#2B6CB0] font-semibold rounded-lg hover:bg-[#2B6CB0]/5 transition-all"
              >
                View all articles on LinkedIn
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
