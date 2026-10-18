import React from 'react';
import { ExternalLink, Wrench } from 'lucide-react';
import affiliates from '../data/affiliates';

/**
 * "Recommended Tools" — a single tasteful affiliate placement rendered at
 * the end of a blog article, before the newsletter signup.
 *
 * Behaviour contract:
 * - Picks at most ONE program from src/data/affiliates.js whose
 *   `categories` match the post's category/tags AND whose `url` is
 *   non-empty (first match in config order wins).
 * - Renders NOTHING (returns null) when no program matches or every
 *   matching program still has an empty url — so the feature stays
 *   invisible until Karim adds his referral links.
 *
 * Styling follows the site convention (Tailwind utilities, site palette:
 * panel #F0F4F8 / border #E2E8F0 / heading #1A202C / body #475569 /
 * accent #2B6CB0). The outbound link is marked rel="sponsored" as
 * required for paid placements.
 */

const normalizeTopic = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const pickAffiliate = (post) => {
  if (!post) return null;

  const topics = new Set(
    [post.category, ...(post.tags || [])].map(normalizeTopic).filter(Boolean)
  );
  if (topics.size === 0) return null;

  return (
    affiliates.find(
      (entry) =>
        typeof entry.url === 'string' &&
        entry.url.trim() !== '' &&
        (entry.categories || []).some((c) => topics.has(normalizeTopic(c)))
    ) || null
  );
};

const AFFILIATE_DISCLOSURE =
  'Affiliate disclosure: I recommend tools I believe fit this topic. If you sign up through this link, I may earn a commission at no extra cost to you.';

export default function AffiliateTools({ post }) {
  const affiliate = pickAffiliate(post);

  // No matching program with a live referral link — render nothing.
  if (!affiliate) return null;

  return (
    <section aria-labelledby="affiliate-tools-heading" className="py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <aside className="rounded-2xl border border-[#E2E8F0] bg-[#F0F4F8] p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#2B6CB0]/10 flex items-center justify-center">
              <Wrench size={24} className="text-[#2B6CB0]" aria-hidden="true" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[#2B6CB0] mb-2">
                Recommended Tool
              </span>
              <h2
                id="affiliate-tools-heading"
                className="text-xl md:text-2xl font-serif font-bold text-[#1A202C] mb-2"
              >
                {affiliate.name}
              </h2>
              <p className="text-[#475569] leading-relaxed">{affiliate.blurb}</p>

              <a
                href={affiliate.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2B6CB0] text-white text-sm font-semibold hover:bg-[#2563EB] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B6CB0]"
              >
                Visit {affiliate.name}
                <ExternalLink size={16} aria-hidden="true" />
              </a>

              <p className="mt-5 text-xs text-[#94A3B8] leading-relaxed">
                {AFFILIATE_DISCLOSURE}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
