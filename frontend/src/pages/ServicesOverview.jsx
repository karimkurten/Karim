import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO, { buildBreadcrumb, buildFAQSchema } from '../components/SEO';

const SITE_URL = 'https://www.karimchaouki.com';

const services = [
  {
    title: 'HCM Implementation Consulting',
    path: '/services/adp-workforce-now-implementation',
    icon: '⚙️',
    desc: 'Senior ADP Workforce Now implementation consulting for US and Canadian organizations — Payroll, HCM, Benefits, Time & Attendance, and Talent. Cross-border US/Canada expertise. PMP Certified. Bilingual EN/FR.',
    cta: 'ADP Workforce Now Implementation →',
  },
  {
    title: 'Payroll Systems Project Management',
    path: '/services/project-manager-payroll-systems',
    icon: '💼',
    desc: 'Payroll systems project management for Canadian organizations: multi-province payroll migrations, CPP/EI compliance, Workday Payroll, and Ceridian Dayforce implementations. PMP Certified.',
    cta: 'Payroll Systems PM →',
  },
  {
    title: 'AML Compliance Consulting',
    path: '/services/aml-consultant-canada',
    icon: '🛡️',
    desc: 'AML compliance consulting for Canadian financial institutions: FINTRAC compliance, KYC/CDD implementation, transaction monitoring, and AML program design. Bilingual EN/FR. Based in Toronto.',
    cta: 'AML Compliance Consulting →',
  },
  {
    title: 'Bilingual Implementation Management',
    path: '/services/bilingual-implementation-manager',
    icon: '🇨🇦',
    desc: 'Implementation management delivered in both English and French — governance, documentation, training, and go-live in the language of your stakeholders. Serving Quebec organizations, federal entities, and national companies.',
    cta: 'Bilingual Implementation Manager →',
  },
];

const faqs = [
  {
    q: 'Which service do I need?',
    a: 'It depends on where your project stands. If you are implementing or rescuing an HCM platform, start with HCM implementation consulting. If the project centres on payroll — a migration, a new system, multi-province complexity — the payroll systems service fits. FINTRAC, KYC, or transaction-monitoring work maps to AML compliance consulting. And if your stakeholders work in French, bilingual delivery can be added to any engagement. If you are unsure, describe the project and I will point you to the right starting point.',
  },
  {
    q: 'Where are you based, and where do you take on engagements?',
    a: 'I am based in Toronto and serve organizations across Canada, including Quebec and federal entities, as well as cross-border US/Canada programs.',
  },
  {
    q: 'Can you deliver our project in French?',
    a: 'Yes. I deliver full project governance, documentation, training, and go-live support in both English and French — not as translation after the fact, but as bilingual delivery built into the project plan from day one.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      name: 'Implementation Consulting Services',
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.title,
        url: `${SITE_URL}${s.path}`,
      })),
    },
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
    buildFAQSchema(faqs),
  ],
};

const steps = [
  {
    title: 'Readiness & Planning',
    desc: 'Scope, risks, data, and timeline get settled before configuration starts — the phase where implementations are quietly won or lost.',
  },
  {
    title: 'Delivery Leadership',
    desc: 'Governance, vendor coordination, testing, and data migration oversight through build and validation, with bilingual stakeholder communication throughout.',
  },
  {
    title: 'Go-Live & Handover',
    desc: 'Cutover readiness, go-live command, hypercare, and a structured knowledge transfer so your team owns the system after the project closes.',
  },
];

export default function ServicesOverview() {
  return (
    <>
      <SEO
        title="HCM Implementation Consulting Services | Karim Chaouki"
        description="HCM implementation consulting for Canadian organizations: platform delivery, payroll systems, and go-live leadership from a Toronto-based, bilingual consultant."
        canonical="/services"
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
                <li className="text-white font-medium">Services</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              HCM Implementation Consulting Services
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl leading-relaxed mb-8">
              Implementation leadership for Canadian organizations: HCM platform delivery, payroll
              systems, AML compliance, and bilingual project management — based in Toronto,
              delivered in English and French.
            </p>
            <Link to="/#contact" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block">
              Discuss Your Project →
            </Link>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              One Consultant, Four Specialized Practices
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4 max-w-3xl">
              Most implementation failures are not technology failures — they are delivery failures:
              unclear scope, unready data, untested integrations, and stakeholders who were never
              brought along. Each service below exists to remove one class of that risk, led by a
              PMP-certified senior consultant rather than handed off to a junior team.
            </p>
            <p className="text-slate-600 leading-relaxed max-w-3xl">
              Engagements run across Canada — including Quebec and federal organizations — and on
              cross-border US/Canada programs, in English and French.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Services
              </span>
              <h2 className="text-3xl font-bold text-slate-900">Choose Your Starting Point</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((s) => (
                <div key={s.path} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{s.desc}</p>
                  <Link to={s.path} className="text-blue-700 font-semibold text-sm hover:text-blue-900 transition-colors">
                    {s.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Engagements Run */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">How Engagements Typically Run</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <div key={step.title} className="border border-slate-200 rounded-xl p-6">
                  <div className="text-blue-700 font-bold text-sm mb-2">STEP {i + 1}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Questions About Working Together
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

        {/* CTA */}
        <section className="bg-blue-700 py-16 px-6 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Planning an Implementation?</h2>
            <p className="text-blue-200 text-lg mb-8">
              Tell me about your project, your risks, or your timeline.
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
