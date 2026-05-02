import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO, { buildServiceSchema, buildBreadcrumb, buildFAQSchema } from '../components/SEO';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    buildServiceSchema(
      'ADP Workforce Now Implementation Specialist — Canada',
      'Senior ADP Workforce Now implementation consultant for HCM, Payroll, Benefits, Time & Attendance, and Talent deployments across Canadian and US organizations.',
      '/services/adp-workforce-now-implementation'
    ),
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'ADP Workforce Now Implementation', path: '/services/adp-workforce-now-implementation' },
    ]),
    buildFAQSchema([
      {
        q: 'What ADP Workforce Now modules do you implement?',
        a: 'I implement the full ADP Workforce Now suite: Payroll (Canadian and US), HR Management, Benefits Administration, Time & Attendance, Talent (Recruitment, Performance, Compensation), Onboarding, Reporting, and ADP Marketplace integrations. I have led 50+ enterprise rollouts from ADP\'s Center of Excellence.',
      },
      {
        q: 'Are you familiar with Canadian payroll requirements in ADP Workforce Now?',
        a: 'Yes. I specialize in Canadian payroll configuration in ADP Workforce Now: CPP, EI, federal and provincial tax tables, ROEs, T4/T4A year-end reporting, Quebec QPIP and CSST requirements, and multi-province deployments.',
      },
      {
        q: 'Can you handle cross-border US/Canada ADP Workforce Now deployments?',
        a: 'Yes. Cross-border US/Canada implementations are my deepest specialty. I have managed 50+ such projects with 100% on-time delivery, including US payroll tax (federal/state/local), I-9 compliance, multi-state reciprocity, and integration between US and Canadian Workforce Now tenants.',
      },
      {
        q: 'How long does an ADP Workforce Now implementation take?',
        a: 'A typical ADP Workforce Now implementation takes 12–16 weeks from kickoff to go-live for HCM + Payroll. Adding Time & Attendance, Benefits, and Talent extends the timeline to 4–6 months. Cross-border deployments add 4–8 weeks for parallel US/Canada configuration.',
      },
    ]),
  ],
};

const modules = [
  { name: 'ADP Workforce Now Payroll', icon: '💰', desc: 'Canadian & US payroll, CPP/EI, ROEs, T4/T4A, provincial tax compliance' },
  { name: 'HR Management (HRMS)', icon: '👥', desc: 'Employee records, org structure, position management, lifecycle events' },
  { name: 'Benefits Administration', icon: '🏥', desc: 'Plan setup, open enrollment, life events, carrier connections' },
  { name: 'Time & Attendance', icon: '⏱️', desc: 'Time tracking, scheduling, overtime rules, absence management' },
  { name: 'Talent Management', icon: '🎯', desc: 'Recruitment, performance, compensation, succession planning' },
  { name: 'Onboarding', icon: '📝', desc: 'New hire workflows, document e-sign, task assignments, compliance forms' },
  { name: 'Reporting & Analytics', icon: '📊', desc: 'Custom reports, dashboards, ADP DataCloud, workforce insights' },
  { name: 'ADP Marketplace Integrations', icon: '🔌', desc: 'Third-party connectors, custom APIs, single sign-on, data feeds' },
];

const phases = [
  { num: '01', title: 'Discovery & Scoping', desc: 'Requirements gathering, current-state documentation, gap analysis, and project charter sign-off.' },
  { num: '02', title: 'Design & Configuration', desc: 'Tenant build, business process design workshops, payroll/benefits configuration, and pay rule mapping.' },
  { num: '03', title: 'Testing & Validation', desc: 'Unit testing, parallel payrolls, UAT facilitation, and defect tracking through resolution.' },
  { num: '04', title: 'Data Migration', desc: 'Data cleansing, ADP conversion templates, mock loads, and validation against legacy system reports.' },
  { num: '05', title: 'Training & Change Management', desc: 'End-user training (EN/FR), manager self-service rollout, communication plans, and readiness checks.' },
  { num: '06', title: 'Go-Live & Hypercare', desc: 'Cutover execution, first live payroll support, issue triage, and knowledge transfer to internal teams.' },
];

const faqs = [
  {
    q: 'What ADP Workforce Now modules do you specialize in?',
    a: 'The full Workforce Now suite — Payroll (Canadian & US), HR Management, Benefits, Time & Attendance, Talent (Recruitment, Performance, Compensation), Onboarding, and ADP Marketplace integrations. I currently lead Center of Excellence implementations at ADP Canada.',
  },
  {
    q: 'Do you handle Canadian payroll configuration in ADP Workforce Now?',
    a: 'Yes — Canadian Workforce Now Payroll is my home turf. CPP contributions, EI premiums, Record of Employment (ROE) generation, T4/T4A year-end, federal and provincial tax tables, Quebec QPIP and CSST, and multi-province configurations are all part of my standard delivery.',
  },
  {
    q: 'What about cross-border US/Canada implementations?',
    a: 'Cross-border US/Canada deployments are my deepest specialty. I have led 50+ such projects from ADP\'s Center of Excellence with 100% on-time delivery. This includes US federal/state/local payroll tax, I-9 compliance, multi-state reciprocity, and dual-country tenant configurations.',
  },
  {
    q: 'Can you rescue a troubled ADP Workforce Now implementation?',
    a: 'Yes. I can step into any phase of an in-flight implementation to assess status, identify root causes of delays or quality issues, and develop a recovery plan. This is one of the highest-value engagements I take on.',
  },
];

export default function ServiceADPWorkforceNow() {
  return (
    <>
      <SEO
        title="ADP Workforce Now Implementation Specialist Canada — HCM & Payroll Expert | Karim Chaouki"
        description="Senior ADP Workforce Now implementation consultant for Canadian and US organizations. Specializing in Workforce Now Payroll, HCM, Benefits, Time & Attendance, and Talent. PMP Certified. Bilingual EN/FR. Toronto, Canada."
        canonical="/services/adp-workforce-now-implementation"
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
                <li className="text-white font-medium">ADP Workforce Now Implementation</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Senior ADP Workforce Now Implementation Specialist — Canada
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl leading-relaxed mb-8">
              Full-cycle ADP Workforce Now HCM, Payroll, Benefits, and Time deployments for Canadian and
              cross-border US organizations. Delivered on time, compliant with Canadian and US regulations,
              and configured for your business — by an ADP Center of Excellence consultant.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/#contact"
                data-testid="hero-cta-discuss-project"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Discuss Your Workforce Now Project →
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                ADP Workforce Now Implementation for Canadian &amp; Cross-Border Organizations
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                An ADP Workforce Now implementation is one of the most consequential HR-technology investments
                your organization will make. The decisions made in the first eight weeks — pay rule design,
                benefit plan configuration, data strategy, change management — determine whether your first
                live payroll is a success or a crisis.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                As a <strong className="text-slate-800">senior ADP Workforce Now implementation specialist</strong>{' '}
                currently leading projects in ADP Canada&apos;s Center of Excellence, I bring project management
                discipline and deep functional knowledge to every phase of your Workforce Now journey. I&apos;ve
                delivered 50+ enterprise deployments across Canadian financial institutions, healthcare networks,
                manufacturing, and cross-border US/Canada organizations — with a 100% on-time go-live record.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Canadian payroll in Workforce Now is meaningfully more complex than US-only deployments.
                CPP and EI contributions, T4/T4A year-end, Record of Employment (ROE) generation, federal
                and provincial tax tables, Quebec&apos;s QPIP and CSST, and multi-province pay rule design
                demand a practitioner who has built and tested these configurations many times — not someone
                learning them on your project&apos;s dime.
              </p>

              <blockquote className="border-l-4 border-blue-600 pl-6 py-2 bg-slate-50 rounded-r-lg my-8">
                <p className="text-slate-700 italic text-lg leading-relaxed">
                  &ldquo;Karim led our Workforce Now payroll implementation across four provinces.
                  He knew the configuration details, anticipated compliance edge cases, and kept the
                  project on track when scope changes threatened the timeline.&rdquo;
                </p>
                <cite className="text-slate-500 text-sm font-semibold not-italic mt-2 block">
                  — VP Human Resources · Canadian Financial Institution
                </cite>
              </blockquote>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4">Engagement Models</h3>
                {[
                  { type: 'Project Manager', desc: 'End-to-end PM for your full Workforce Now implementation' },
                  { type: 'Functional Lead', desc: 'Drive specific module workstreams (Payroll, HCM, Benefits)' },
                  { type: 'Staff Augmentation', desc: 'Supplement your team during peak phases' },
                  { type: 'Implementation Rescue', desc: 'Assess and stabilize a troubled implementation' },
                ].map((e) => (
                  <div key={e.type} className="py-3 border-b border-slate-100 last:border-0">
                    <div className="font-semibold text-sm text-slate-800">{e.type}</div>
                    <div className="text-xs text-slate-500 mt-1">{e.desc}</div>
                  </div>
                ))}
                <Link
                  to="/#contact"
                  data-testid="sidebar-cta-get-in-touch"
                  className="mt-6 block text-center bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Get in Touch →
                </Link>
                <a
                  href="/resume/KC_PM_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center border border-blue-200 text-blue-700 font-semibold px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                >
                  Download Resume (PDF)
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* Modules */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Workforce Now Modules
              </span>
              <h2 className="text-3xl font-bold text-slate-900">Modules I Implement</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {modules.map((m) => (
                <div key={m.name} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">{m.icon}</div>
                  <div className="font-bold text-slate-900 text-sm mb-1">{m.name}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Phases */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                My Approach
              </span>
              <h2 className="text-3xl font-bold text-slate-900">Implementation Methodology</h2>
            </div>
            <div className="space-y-0 divide-y divide-slate-100">
              {phases.map((p) => (
                <div key={p.num} className="flex gap-5 py-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {p.num}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-1">{p.title}</div>
                    <div className="text-sm text-slate-600 leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Common Questions About ADP Workforce Now Implementations
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

        {/* Related Services */}
        <section className="py-10 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Related Services</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/services/aml-consultant-canada" className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">AML Compliance Consulting →</Link>
              <Link to="/services/project-manager-payroll-systems" className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">Payroll Systems PM →</Link>
              <Link to="/services/bilingual-implementation-manager" className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">Bilingual PM (EN/FR) →</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-700 py-16 px-6 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Planning an ADP Workforce Now Implementation?</h2>
            <p className="text-blue-200 text-lg mb-8">
              Let&apos;s discuss your timeline, scope, and how I can support your team from day one.
            </p>
            <Link
              to="/#contact"
              data-testid="footer-cta-book-call"
              className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg"
            >
              Book a Free Discovery Call →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
