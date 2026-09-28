import React from 'react';
import { ExternalLink, Briefcase, FileText, MessageSquare, Linkedin, TrendingUp, Users, Sparkles } from 'lucide-react';

export const PAYHIP_STORE_URL = 'https://payhip.com/HiredOS';

const DEFAULT_CONFIG = {
  eyebrow: 'Career Resources',
  headline: 'Ready to Take Your Career to the Next Level?',
  description:
    'Get practical career tools, templates, guides, and resources designed to help you land better opportunities, prepare for interviews, and negotiate a higher salary.',
  cta: 'Explore HiredOS',
  theme: 'blue',
  discount: null,
};

const TOPIC_CONFIGS = [
  {
    keywords: ['resume', 'cv', 'cover letter', 'ats'],
    icon: FileText,
    eyebrow: 'Resume Resources',
    headline: 'Build a Resume That Gets Noticed',
    description:
      'ATS-friendly resume templates, cover-letter frameworks, and checklists to help you land more interviews faster.',
    cta: 'Get Resume Resources →',
  },
  {
    keywords: ['interview', 'interviews', 'interviewing'],
    icon: MessageSquare,
    eyebrow: 'Interview Prep',
    headline: 'Prepare With Confidence for Your Next Interview',
    description:
      'Interview question banks, answer frameworks, and preparation guides to help you perform when it matters.',
    cta: 'Explore Interview Resources →',
  },
  {
    keywords: ['salary', 'negotiation', 'compensation', 'offer'],
    icon: TrendingUp,
    eyebrow: 'Salary Negotiation',
    headline: 'Stop Leaving Money on the Table',
    description:
      'Scripts, email templates, and negotiation frameworks to help you confidently ask for what you are worth.',
    cta: 'Explore Salary Tools →',
  },
  {
    keywords: ['linkedin', 'profile', 'networking', 'personal brand'],
    icon: Linkedin,
    eyebrow: 'LinkedIn Optimization',
    headline: 'Turn Your LinkedIn Profile Into a Career Asset',
    description:
      'LinkedIn headline formulas, About-section templates, and connection strategies to attract recruiters.',
    cta: 'Explore LinkedIn Resources →',
  },
  {
    keywords: ['job search', 'job hunting', 'application', 'recruiter', 'hiring'],
    icon: Briefcase,
    eyebrow: 'Job-Search Strategy',
    headline: 'Land the Right Role Faster',
    description:
      'Job-search planners, application trackers, and outreach templates to keep your search organized and effective.',
    cta: 'Explore Job-Search Tools →',
  },
  {
    keywords: ['career', 'development', 'advancement', 'promotion', 'growth'],
    icon: Users,
    eyebrow: 'Career Development',
    headline: 'Build the Career You Want',
    description:
      'Career roadmaps, skill-development guides, and professional-development resources to keep you moving forward.',
    cta: 'Explore Career Resources →',
  },
  {
    keywords: ['personal development', 'self improvement', 'mindset', 'productivity'],
    icon: Sparkles,
    eyebrow: 'Personal Development',
    headline: 'Become a Stronger Professional',
    description:
      'Mindset, productivity, and personal-development resources to support your career and life goals.',
    cta: 'Explore Personal Development →',
  },
];

const detectTopic = (post) => {
  const haystack = [
    post.title || '',
    post.excerpt || '',
    ...(post.tags || []),
  ]
    .join(' ')
    .toLowerCase();

  for (const config of TOPIC_CONFIGS) {
    if (config.keywords.some((kw) => haystack.includes(kw))) {
      return config;
    }
  }
  return null;
};

const trackEvent = (eventName, payload) => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }
  } catch {
    // analytics optional
  }
};

const PayhipPromoBanner = ({
  post,
  placement = 'inline',
  config: userConfig = {},
}) => {
  const topicConfig = detectTopic(post) || {};
  const config = { ...DEFAULT_CONFIG, ...topicConfig, ...userConfig };

  const Icon = config.icon || Briefcase;
  const url = config.url || PAYHIP_STORE_URL;

  const handleClick = () => {
    trackEvent('payhip_banner_click', {
      event_category: 'engagement',
      event_label: config.cta,
      placement,
      article_slug: post?.slug,
      article_title: post?.title,
    });
    trackEvent('payhip_store_visit', {
      event_category: 'outbound',
      event_label: url,
      placement,
      article_slug: post?.slug,
    });
  };

  const bannerRef = React.useRef(null);

  React.useEffect(() => {
    const node = bannerRef.current;
    if (!node) return;

    let viewed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !viewed) {
            viewed = true;
            trackEvent('payhip_banner_view', {
              event_category: 'engagement',
              event_label: placement,
              article_slug: post?.slug,
              article_title: post?.title,
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [post?.slug, post?.title, placement]);

  const isEnd = placement === 'end';

  return (
    <aside
      ref={bannerRef}
      aria-label="Career resource recommendation"
      className={`my-10 rounded-2xl border border-[#2B6CB0]/15 bg-gradient-to-br from-[#F0F4F8] to-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow ${
        isEnd ? 'bg-gradient-to-br from-slate-900 to-blue-900 text-white border-transparent' : ''
      }`}
    >
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
            isEnd ? 'bg-white/10' : 'bg-[#2B6CB0]/10'
          }`}
        >
          <Icon
            size={28}
            className={isEnd ? 'text-blue-200' : 'text-[#2B6CB0]'}
            aria-hidden="true"
          />
        </div>

        <div className="flex-1 min-w-0">
          <span
            className={`inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-2 ${
              isEnd ? 'text-blue-300' : 'text-[#2B6CB0]'
            }`}
          >
            {config.eyebrow}
          </span>

          <h3
            className={`text-xl md:text-2xl font-serif font-bold mb-2 ${
              isEnd ? 'text-white' : 'text-[#1A202C]'
            }`}
          >
            {config.headline}
          </h3>

          <p
            className={`text-sm md:text-base leading-relaxed ${
              isEnd ? 'text-blue-100' : 'text-[#475569]'
            }`}
          >
            {config.description}
          </p>

          {config.discount && (
            <p
              className={`mt-3 text-sm font-semibold inline-flex items-center gap-2 ${
                isEnd ? 'text-yellow-300' : 'text-[#D97706]'
              }`}
            >
              <Sparkles size={16} aria-hidden="true" />
              {config.discount}
            </p>
          )}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={`flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B6CB0] ${
            isEnd
              ? 'bg-white text-[#2B6CB0] hover:bg-blue-50'
              : 'bg-[#2B6CB0] text-white hover:bg-[#2563EB]'
          }`}
        >
          {config.cta}
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
};

export default PayhipPromoBanner;
