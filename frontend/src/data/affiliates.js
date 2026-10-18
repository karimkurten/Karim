/**
 * Affiliate programs for the end-of-article "Recommended Tools" box
 * (see frontend/src/components/AffiliateTools.jsx).
 *
 * Each entry:
 *   id         — stable identifier
 *   name       — display name shown in the box heading
 *   blurb      — one-line description shown under the name
 *   url        — Karim's referral link. Leave as "" until the referral
 *                link is available: entries with an empty url are never
 *                rendered, so the box stays invisible sitewide.
 *   categories — topic keys matched (case/spacing-insensitively) against
 *                the post's category and tags, e.g. a tag of
 *                "Project Management" matches "project-management".
 *
 * Array order is the priority order: when several programs match a post,
 * the first matching entry with a non-empty url is the one shown, and at
 * most one box is ever rendered per article.
 */
const affiliates = [
  {
    id: 'deel',
    name: 'Deel',
    blurb:
      'Global payroll and employer-of-record services for hiring, paying, and managing distributed teams across borders — without setting up local entities.',
    url: '',
    categories: ['payroll', 'hcm', 'hr-tech', 'workforce-management'],
  },
  {
    id: 'gusto',
    name: 'Gusto',
    blurb:
      'Payroll, benefits, and HR in one platform, built for US small businesses that want compliant pay runs without the paperwork.',
    url: '',
    categories: ['payroll', 'hr-tech'],
  },
  {
    id: 'monday',
    name: 'monday.com',
    blurb:
      'A flexible work and project management platform for planning, tracking, and delivering projects with your team.',
    url: '',
    categories: ['project-management'],
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    blurb:
      'Project management and productivity in one app — tasks, docs, goals, and timelines for teams that deliver implementations.',
    url: '',
    categories: ['project-management', 'productivity'],
  },
  {
    id: 'beehiiv',
    name: 'Beehiiv',
    blurb:
      'The newsletter platform behind this site\u2019s newsletter — publish, grow, and monetize an email audience with built-in analytics.',
    url: '',
    categories: ['career', 'communication', 'newsletter'],
  },
];

export default affiliates;
