import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO, { buildBreadcrumb } from '../components/SEO';
import posts from '../data/blogPosts.json';
import { Calendar, Clock, ExternalLink, Tag, Share2, Link2, Check } from 'lucide-react';

const SITE_URL = 'https://karimchaouki.com';

const blogListSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      name: 'Karim Chaouki — Blog',
      url: `${SITE_URL}/blog`,
      description:
        'Insights on AML compliance, ADP Workforce Now implementation, cross-border payroll, and HCM project management from a senior consultant at ADP’s Center of Excellence.',
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

const TwitterIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const BlogCard = ({ post }) => {
  const [copied, setCopied] = React.useState(false);
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Copy failed', err);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: postUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          // eslint-disable-next-line no-console
          console.error('Share failed', err);
        }
      }
    }
  };

  const shareLink = (href, label) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Share ${post.title} on ${label}`}
      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F0F4F8] text-[#475569] hover:bg-[#2B6CB0] hover:text-white transition-colors"
    >
      {label === 'X' && <TwitterIcon />}
      {label === 'LinkedIn' && <LinkedInIcon />}
      {label === 'Facebook' && <FacebookIcon />}
    </a>
  );

  return (
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

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-[#64748B]">Share:</span>
          <div className="flex items-center gap-2">
            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                type="button"
                onClick={shareNative}
                aria-label={`Share ${post.title}`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F0F4F8] text-[#475569] hover:bg-[#2B6CB0] hover:text-white transition-colors"
              >
                <Share2 size={14} />
              </button>
            )}
            {shareLink(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, 'X')}
            {shareLink(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, 'LinkedIn')}
            {shareLink(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, 'Facebook')}
            <button
              type="button"
              onClick={copyLink}
              aria-label={copied ? 'Link copied' : `Copy link to ${post.title}`}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F0F4F8] text-[#475569] hover:bg-[#2B6CB0] hover:text-white transition-colors"
            >
              {copied ? <Check size={14} /> : <Link2 size={14} />}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default function BlogIndex() {
  return (
    <>
      <SEO
        title="Blog — AML, ADP Workforce Now & HCM Implementation Insights"
        description="Articles on AML compliance, ADP Workforce Now implementation, cross-border US/Canada payroll, and HCM project management — by Karim Chaouki, senior implementation consultant at ADP’s Center of Excellence."
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
