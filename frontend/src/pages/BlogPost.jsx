import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import SEO, { buildBreadcrumb } from '../components/SEO';
import { InteractiveBlock, INTERACTIVE_TYPES } from '../components/InteractiveWidgets';
import posts from '../data/blogPosts.json';
import { Calendar, Clock, ArrowLeft, ExternalLink, Tag, Share2, Link2, Check } from 'lucide-react';

const SITE_URL = 'https://karimchaouki.com';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const ShareButton = ({ label, href, onClick, icon, bg, hover }) => {
  const baseClasses =
    'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B6CB0]';

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${bg} ${hover}`}
        aria-label={`Share on ${label}`}
      >
        {icon}
        <span>{label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${bg} ${hover}`}
      aria-label={label}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const TwitterIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const SocialShare = ({ title, slug, excerpt }) => {
  const [copied, setCopied] = React.useState(false);
  const postUrl = `${SITE_URL}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(excerpt || title);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Copy failed', err);
    }
  };

  const shareLinks = [
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <TwitterIcon />,
      bg: 'bg-slate-900',
      hover: 'hover:bg-slate-800',
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon />,
      bg: 'bg-[#0A66C2]',
      hover: 'hover:bg-[#084298]',
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedSummary}`,
      icon: <FacebookIcon />,
      bg: 'bg-[#1877F2]',
      hover: 'hover:bg-[#0d65d9]',
    },
  ];

  return (
    <aside
      className="mt-10 p-6 rounded-2xl border border-[#E2E8F0] bg-white"
      aria-labelledby="share-heading"
    >
      <h2
        id="share-heading"
        className="text-lg font-serif font-bold text-[#1A202C] mb-4 flex items-center gap-2"
      >
        <Share2 size={18} aria-hidden="true" />
        Share this article
      </h2>

      <div className="flex flex-wrap gap-3">
        {typeof navigator !== 'undefined' && navigator.share && (
          <ShareButton
            label="Share"
            onClick={handleNativeShare}
            icon={<Share2 size={16} aria-hidden="true" />}
            bg="bg-[#2B6CB0]"
            hover="hover:bg-[#2563EB]"
          />
        )}

        {shareLinks.map((link) => (
          <ShareButton key={link.label} {...link} />
        ))}

        <ShareButton
          label={copied ? 'Copied!' : 'Copy link'}
          onClick={copyToClipboard}
          icon={copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
          bg="bg-[#475569]"
          hover="hover:bg-[#334155]"
        />
      </div>
    </aside>
  );
};

const ContentBlock = ({ block }) => {
  if (block.type === 'p') {
    return <p className="text-[#475569] leading-relaxed mb-5">{block.text}</p>;
  }
  if (block.type === 'h2') {
    return (
      <h2 className="text-2xl font-serif font-bold text-[#1A202C] mt-10 mb-4">
        {block.text}
      </h2>
    );
  }
  if (block.type === 'h3') {
    return (
      <h3 className="text-xl font-serif font-bold text-[#1A202C] mt-8 mb-3">
        {block.text}
      </h3>
    );
  }
  if (block.type === 'ul') {
    return (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-[#475569] leading-relaxed">
        {(block.items || []).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === 'quote') {
    return (
      <blockquote className="border-l-4 border-[#2B6CB0] pl-6 py-2 bg-[#F0F4F8] rounded-r-lg my-8">
        <p className="text-[#334155] italic text-lg leading-relaxed">{block.text}</p>
        {block.cite && (
          <cite className="text-[#64748B] text-sm font-semibold not-italic mt-2 block">
            — {block.cite}
          </cite>
        )}
      </blockquote>
    );
  }
  if (block.type === 'img') {
    return (
      <figure className="my-8">
        <img
          src={block.src}
          alt={block.alt || ''}
          loading="lazy"
          className="w-full rounded-xl border border-[#E2E8F0]"
        />
        {block.caption && (
          <figcaption className="text-sm text-[#94A3B8] text-center mt-3">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  if (INTERACTIVE_TYPES.includes(block.type)) {
    return <InteractiveBlock block={block} />;
  }
  return null;
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  const postSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: `${SITE_URL}${post.cover}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: {
          '@type': 'Person',
          name: 'Karim Chaouki',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Person',
          name: 'Karim Chaouki',
          url: SITE_URL,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/blog/${post.slug}`,
        },
        keywords: (post.tags || []).join(', '),
        inLanguage: 'en-CA',
      },
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ],
  };

  return (
    <>
      <SEO
        title={`${post.title} | Karim Chaouki`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogImage={`${SITE_URL}${post.cover}`}
        ogType="article"
        schema={postSchema}
      />
      <Header />

      <main id="main-content">
        <article>
          {/* Hero */}
          <header className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-20 px-6">
            <div className="max-w-3xl mx-auto">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-sm text-blue-300 flex-wrap">
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li aria-hidden="true" className="text-blue-500">›</li>
                  <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li aria-hidden="true" className="text-blue-500">›</li>
                  <li className="text-white font-medium truncate max-w-xs">{post.title}</li>
                </ol>
              </nav>

              <div className="flex flex-wrap gap-2 mb-5">
                {(post.tags || []).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-medium border border-white/20"
                  >
                    <Tag size={10} />
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-5 text-sm text-blue-200">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(post.publishedAt)}
                </span>
                {post.readingTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readingTime}
                  </span>
                )}
                <span>By Karim Chaouki</span>
              </div>
            </div>
          </header>

          {/* Body */}
          <section className="py-16 px-6">
            <div className="max-w-3xl mx-auto">
              {post.cover && (
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full rounded-2xl border border-[#E2E8F0] mb-10"
                />
              )}

              <div className="prose max-w-none">
                {(post.content || []).map((block, idx) => (
                  <ContentBlock key={`${post.slug}-block-${idx}`} block={block} />
                ))}
              </div>

              {post.linkedinUrl && (
                <div className="mt-10 p-5 rounded-xl border border-[#E2E8F0] bg-[#F0F4F8] flex items-center justify-between gap-4 flex-wrap">
                  <span className="text-sm text-[#64748B]">
                    Originally published on LinkedIn
                  </span>
                  <a
                    href={post.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="original-linkedin-link"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B6CB0] hover:text-[#2563EB] transition-colors"
                  >
                    Read on LinkedIn <ExternalLink size={14} />
                  </a>
                </div>
              )}

              <SocialShare title={post.title} slug={post.slug} excerpt={post.excerpt} />

              <div className="mt-10">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B6CB0] hover:text-[#2563EB] transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to all articles
                </Link>
              </div>
            </div>
          </section>

          {/* Related */}
          {related.length > 0 && (
            <section className="py-16 px-6 bg-[#F0F4F8] border-t border-[#E2E8F0]">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-serif font-bold text-[#1A202C] mb-8">
                  More Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/blog/${p.slug}`}
                      className="p-5 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#2B6CB0]/30 hover:shadow-md transition-all"
                    >
                      <div className="text-xs text-[#94A3B8] mb-2">
                        {formatDate(p.publishedAt)}
                      </div>
                      <h3 className="font-serif font-bold text-[#1A202C] leading-snug group-hover:text-[#2B6CB0] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-[#64748B] mt-2 leading-relaxed line-clamp-3">
                        {p.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  );
}
