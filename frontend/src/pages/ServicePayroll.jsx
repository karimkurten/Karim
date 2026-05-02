import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO, { buildServiceSchema, buildBreadcrumb, buildFAQSchema } from '../components/SEO';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    buildServiceSchema(
      'Project Manager — Payroll & HR Systems Implementation Canada',
      'Experienced payroll systems project manager for Canadian organizations. Multi-province payroll migrations, CPP/EI compliance, and HR system go-lives delivered on time.',
      '/services/project-manager-payroll-systems'
    ),
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Payroll Systems Project Manager', path: '/services/project-manager-payroll-systems' },
    ]),
    buildFAQSchema([
      {
        q: 'What payroll systems have you implemented in Canada?',
        a: 'I have managed implementations of Workday Payroll, Ceridian Dayforce, ADP, and custom payroll integrations across Canadian organizations. I have experience with single-province and multi-province rollouts including Quebec-specific requirements.',
      },
      {
        q: 'Do you understand Canadian payroll compliance?',
        a: 'Yes — deeply. I have hands-on experience with CPP contributions, EI premiums, Record of Employment (ROE) generation, T4/RL-1 slips, provincial tax tables, and statutory holiday rules across all Canadian provinces and territories.',
      },
    ]),
  ],
};

const platforms = [
  { name: 'Workday Payroll', logo: '⚙️' },
  { name: 'Ceridian Dayforce', logo: '📅' },
  { name: 'ADP Canada', logo: '💼' },
  { name: 'SAP SuccessFactors', logo: '🔷' },
  { name: 'UKG (Kronos)', logo: '🕐' },
  { name: 'Custom Integrations', logo: '🔌' },
];

const deliverables = [
  'Project charter and governance framework',
  'Detailed implementation project plan',
  'Payroll compliance requirements documentation',
  'Data migration and conversion workbooks',
  'Test scripts and UAT facilitation guides',
  'Go-live cutover checklist and runbook',
  'Post-go-live hypercare support plan',
  'Staff training materials (EN/FR)',
  'Stakeholder communication plans',
  'Risk register and mitigation strategies',
];

const faqs = [
  {
    q: 'What makes Canadian payroll implementations uniquely complex?',
    a: 'Canadian payroll involves CPP/EI calculations, province-specific tax rules, Quebec QPIP, statutory holiday differences across provinces, ROE requirements, and bilingual compliance for federal entities. Multi-province organizations must handle all of these simultaneously — plus the data migration from legacy systems.',
  },
  {
    q: 'How do you manage payroll go-live risk?',
    a: 'I run parallel payroll cycles before cutover — typically 2–3 pay periods — comparing results to the legacy system. I build detailed cutover checklists, pre-approve all data migrations, and maintain a rollback plan. On go-live day, I run a war room with HR, payroll, IT, and finance to resolve issues in real time.',
  },
  {
    q: 'Can you manage a payroll implementation remotely?',
    a: 'Yes. Most of my recent implementations have been hybrid — remote for configuration and testing phases, on-site for go-live and hypercare when critical. I work across all Canadian time zones and adjust my schedule to match your team.',
  },
];

export default function ServicePayroll() {
  return (
    <>
      <SEO
        title="Project Manager Payroll Systems Canada — HR Implementation Expert | Karim Chaouki"
        description="Experienced payroll systems project manager for Canadian organizations. Specializing in multi-province payroll migrations, CPP/EI compliance, Workday Payroll, and Ceridian Dayforce implementations. PMP Certified."
        canonical="/services/project-manager-payroll-systems"
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
                <li className="text-white font-medium">Payroll Systems PM</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Project Manager — Payroll &amp; HR Systems Implementation
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl leading-relaxed mb-8">
              Complex payroll system migrations and HR platform implementations across Canada.
              CPP, EI, multi-province compliance, and zero-error go-lives. PMP Certified. Bilingual EN/FR.
            </p>
            <Link to="/#contact" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block">
              Discuss Your Payroll Project →
            </Link>
          </div>
        </section>

        {/* Intro + Sidebar */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Payroll System Implementation Project Manager — Canada
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A payroll system migration is the highest-stakes technology project most HR teams will ever
                run. Every employee depends on getting paid accurately and on time — and there's no margin
                for error. A go-live failure doesn't just create technical debt; it creates legal liability,
                employee relations crises, and CRA compliance exposure.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                As a <strong className="text-slate-800">payroll systems project manager</strong> with deep
                experience in Canadian payroll compliance, I bring the methodology, the regulatory knowledge,
                and the stakeholder management skills to move your organization from legacy system to
                modern platform without payroll errors or missed deadlines.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                My experience spans multi-province rollouts covering CPP/EI contributions, provincial tax
                tables, ROE generation, Quebec QPIP, statutory holiday rules, and T4/RL-1 year-end processes.
                I've managed these implementations for financial institutions, healthcare networks, and
                government contractors across Canada.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mb-3">Payroll Platforms I've Implemented</h3>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {platforms.map((p) => (
                  <div key={p.name} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">{p.logo}</div>
                    <div className="text-xs font-semibold text-slate-700">{p.name}</div>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-4 border-blue-600 pl-6 py-2 bg-slate-50 rounded-r-lg">
                <p className="text-slate-700 italic leading-relaxed">
                  "Karim ran the tightest payroll go-live I've seen in 15 years. Three provinces, two
                  collective agreements, and a tight deadline — zero payroll errors in the first three
                  pay runs."
                </p>
                <cite className="text-slate-500 text-sm font-semibold not-italic mt-2 block">
                  — Director of HR Operations · Canadian Healthcare Network
                </cite>
              </blockquote>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4">Canadian Payroll Expertise</h3>
                <ul className="space-y-3 mb-6">
                  {[
                    'CPP/EI calculations & remittances',
                    'ROE generation & CRA compliance',
                    'T4 / RL-1 year-end processing',
                    'Multi-province tax tables',
                    'Quebec QPIP requirements',
                    'Statutory holiday rules (all provinces)',
                    'Collective agreement compliance',
                    'Payroll parallel testing methodology',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-blue-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/#contact" className="block text-center bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors">
                  Start a Conversation →
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">What You Receive</span>
              <h2 className="text-3xl font-bold text-slate-900">Typical Engagement Deliverables</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((d) => (
                <div key={d} className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3">
                  <span className="text-blue-600 font-bold">→</span>
                  <span className="text-sm text-slate-700">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Common Questions About Payroll Implementations in Canada
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
              <Link to="/services/aml-consultant-canada" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">AML Compliance Consulting →</Link>
              <Link to="/services/adp-workforce-now-implementation" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">ADP Workforce Now Implementation →</Link>
              <Link to="/services/bilingual-implementation-manager" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">Bilingual PM (EN/FR) →</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-700 py-16 px-6 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Planning a Payroll System Migration?</h2>
            <p className="text-blue-200 text-lg mb-8">Let's discuss your timeline, compliance requirements, and how I keep payroll go-lives error-free.</p>
            <Link to="/#contact" className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg">
              Book a Free Discovery Call →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
