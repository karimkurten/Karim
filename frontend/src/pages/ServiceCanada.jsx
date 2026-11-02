import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO, { buildServiceSchema, buildBreadcrumb, buildFAQSchema } from '../components/SEO';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    buildServiceSchema(
      'HCM Implementation Consultant in Canada',
      'Toronto-based HCM implementation consultant serving organizations across Canada: platform delivery, payroll systems, testing leadership, and go-live readiness. Bilingual EN/FR. PMP Certified.',
      '/services/hcm-implementation-consultant-canada'
    ),
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'HCM Implementation Consultant Canada', path: '/services/hcm-implementation-consultant-canada' },
    ]),
    buildFAQSchema([
      {
        q: 'Where in Canada do you take on HCM implementation engagements?',
        a: 'I am based in Toronto and work with organizations across Canada, including Quebec and federal entities, as well as cross-border US/Canada programs. Engagements run on-site, remotely, or hybrid depending on the phase of the project.',
      },
      {
        q: 'Can you deliver our implementation in French?',
        a: 'Yes. Project governance, documentation, training, and go-live support are available in both English and French, which matters for Quebec-based teams and for federal organizations with official-languages obligations.',
      },
      {
        q: 'How do we start?',
        a: 'With a conversation about your platform, your timeline, and where the project stands today. From there we agree on scope — a readiness assessment, delivery leadership for a phase, or the full implementation — before any commitment.',
      },
    ]),
  ],
};

const scopeItems = [
  {
    title: 'Platform Implementation Leadership',
    desc: 'End-to-end delivery management for HCM platform implementations — governance, workstream coordination, vendor management, and phase gates from discovery to go-live.',
  },
  {
    title: 'Payroll & Multi-Province Complexity',
    desc: 'Canadian payroll is not one payroll: CPP/EI, provincial rules, and Quebec requirements (QPIP, RL-1, CNESST) each need deliberate design, testing, and parallel-run proof.',
  },
  {
    title: 'Testing & UAT Leadership',
    desc: 'Test strategy, UAT readiness and sign-off discipline, defect triage, and parallel testing that proves the new system against the old one before anyone depends on it.',
  },
  {
    title: 'Data Migration Oversight',
    desc: 'Conversion strategy, cleansing, mapping, mock loads, and reconciliation — the workstream where implementations are quietly won or lost.',
  },
  {
    title: 'Readiness & Go-Live',
    desc: 'Pre-implementation readiness assessment, go-live checklists and cutover planning, and a structured handover so your team owns the system after the project closes.',
  },
  {
    title: 'Bilingual Delivery (EN/FR)',
    desc: 'Every deliverable above is available in English and French — governance, documentation, training, and go-live communications in the language of your stakeholders.',
  },
];

const faqs = [
  {
    q: 'What makes Canadian HCM implementations different?',
    a: 'Three things: payroll jurisdiction complexity (federal plus ten provinces and three territories, with Quebec running its own programs), bilingual obligations for Quebec and federal workforces, and privacy law — PIPEDA federally and Quebec Law 25 — that shapes how employee data can be migrated and tested. A plan that ignores any of the three discovers it during testing, at ten times the cost.',
  },
  {
    q: 'Where in Canada do you take on engagements?',
    a: 'I am based in Toronto and work with organizations across Canada, including Quebec and federal entities, as well as cross-border US/Canada programs. Engagements run on-site, remotely, or hybrid depending on the phase of the project.',
  },
  {
    q: 'How do we start?',
    a: 'With a conversation about your platform, your timeline, and where the project stands today. From there we agree on scope — a readiness assessment, delivery leadership for a phase, or the full implementation — before any commitment.',
  },
];

export default function ServiceCanada() {
  return (
    <>
      <SEO
        title="Hire an HCM Implementation Consultant in Canada | Karim Chaouki"
        description="Toronto-based HCM implementation consultant serving organizations across Canada: platform delivery, payroll, testing, and go-live — bilingual EN/FR, PMP certified."
        canonical="/services/hcm-implementation-consultant-canada"
        schema={schema}
      />
      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-blue-300">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-blue-500">›</li>
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li aria-hidden="true" className="text-blue-500">›</li>
                <li className="text-white font-medium">HCM Implementation Consultant — Canada</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              HCM Implementation Consultant in Canada
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl leading-relaxed mb-8">
              Senior implementation leadership for Canadian organizations putting in a new HCM
              platform — Toronto-based, bilingual in English and French, and experienced in the
              payroll, privacy, and language requirements that make Canadian projects different.
            </p>
            <Link to="/#contact" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block">
              Discuss Your Implementation →
            </Link>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Canadian Implementations Need a Canadian Lens
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4 max-w-3xl">
              An HCM implementation succeeds or fails on delivery discipline — and in Canada, three
              local realities punish generic playbooks. Payroll runs under federal rules plus every
              province and territory you employ in, with Quebec operating its own programs. Quebec
              and federal workforces carry bilingual obligations that shape training, documentation,
              and adoption. And employee data moves under PIPEDA and Quebec Law 25, which govern how
              it can be migrated, masked, and tested.
            </p>
            <p className="text-slate-600 leading-relaxed max-w-3xl">
              I lead implementations with those constraints designed in from day one — not discovered
              in UAT. If you are planning a platform change, steadying a project already in flight, or
              assessing whether your organization is ready to start, start with the{' '}
              <Link to="/blog/complete-guide-hcm-implementation" className="text-blue-700 font-semibold hover:text-blue-900">
                complete guide to HCM implementation
              </Link>{' '}
              or a conversation.
            </p>
          </div>
        </section>

        {/* Scope Grid */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Engagement Scope
              </span>
              <h2 className="text-3xl font-bold text-slate-900">What I Take On</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scopeItems.map((item) => (
                <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Questions About Hiring an HCM Consultant in Canada
            </h2>
            <div className="space-y-2">
              {faqs.map((faq) => (
                <details key={faq.q} className="group border-b border-slate-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-slate-800 font-semibold list-none">
                    {faq.q}
                    <span className="ml-4 text-blue-600 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                  </summary>
                  <p className="pb-5 text-slate-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-10 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Related Services</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/services" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">All Services →</Link>
              <Link to="/services/adp-workforce-now-implementation" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">ADP Workforce Now Implementation →</Link>
              <Link to="/services/project-manager-payroll-systems" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">Payroll Systems PM →</Link>
              <Link to="/services/bilingual-implementation-manager" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">Bilingual Implementation Manager →</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-700 py-16 px-6 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Planning an HCM Implementation in Canada?</h2>
            <p className="text-blue-200 text-lg mb-8">
              Tell me about your platform, your timeline, and where the project stands.
              Initial consultations are complimentary.
            </p>
            <Link to="/#contact" className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg">
              Contact Karim →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
