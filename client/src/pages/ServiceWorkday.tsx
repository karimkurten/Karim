import React from 'react';
import { Link } from 'wouter';
import SEO, { buildServiceSchema, buildBreadcrumb, buildFAQSchema } from '../components/SEO';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    buildServiceSchema(
      'Workday HCM & Payroll Implementation Specialist — Canada',
      'Senior Workday implementation manager for HCM, Payroll, Recruiting, Benefits, and Time Tracking deployments across Canadian organizations.',
      '/services/workday-implementation-specialist'
    ),
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Workday Implementation Specialist Canada', path: '/services/workday-implementation-specialist' },
    ]),
    buildFAQSchema([
      {
        q: 'What Workday modules do you specialize in?',
        a: 'I specialize in Workday HCM (Core HR), Payroll (Canada and US), Recruiting, Benefits, Time Tracking, Absence Management, and Integrations. I have led full-cycle deployments from requirements through go-live and post-go-live support.',
      },
      {
        q: 'Can you manage a Workday implementation for a Canadian organization?',
        a: 'Yes. I specialize in Canadian Workday deployments including Canadian payroll compliance (CPP, EI, ROEs, provincial tax), bilingual configurations (English/French), and multi-province rollouts.',
      },
      {
        q: 'How long does a Workday implementation take?',
        a: 'A typical Workday HCM implementation takes 6–9 months from kickoff to go-live, depending on scope and number of modules. Payroll adds complexity and typically extends timelines by 2–3 months. I help organizations right-size their scope to hit their target dates.',
      },
    ]),
  ],
};

const modules = [
  { name: 'Core HCM', icon: '👥', desc: 'Employee records, org structure, compensation, position management' },
  { name: 'Workday Payroll', icon: '💰', desc: 'Canadian & US payroll, CPP/EI, ROEs, provincial tax compliance' },
  { name: 'Recruiting', icon: '🎯', desc: 'Job requisitions, candidate workflow, offer management, onboarding' },
  { name: 'Benefits Administration', icon: '🏥', desc: 'Benefit plans, open enrollment, provincial compliance' },
  { name: 'Time Tracking', icon: '⏱️', desc: 'Time entry, overtime rules, absence management, scheduling' },
  { name: 'Integrations', icon: '🔌', desc: 'EIBs, Core Connectors, REST/SOAP APIs, third-party connections' },
  { name: 'Reporting & Analytics', icon: '📊', desc: 'Custom reports, dashboards, Prism Analytics, workforce insights' },
  { name: 'Security & Compliance', icon: '🔒', desc: 'Role-based access, SoD controls, audit trails, data privacy' },
];

const phases = [
  { num: '01', title: 'Discovery & Scoping', desc: 'Requirements gathering, current-state documentation, gap analysis, and project charter sign-off.' },
  { num: '02', title: 'Design & Configuration', desc: 'Prototype builds, tenant configuration, business process design workshops, and data mapping.' },
  { num: '03', title: 'Testing & Validation', desc: 'Unit testing, integration testing, UAT facilitation, and defect tracking through resolution.' },
  { num: '04', title: 'Data Migration', desc: 'Data cleansing, conversion workbooks, mock loads, and validation against source systems.' },
  { num: '05', title: 'Training & Change Management', desc: 'End-user training (EN/FR), change impact assessments, communication plans, and readiness checks.' },
  { num: '06', title: 'Go-Live & Hypercare', desc: 'Cutover execution, day-one support, issue triage, and knowledge transfer to internal teams.' },
];

const faqs = [
  {
    q: 'What Workday modules do you specialize in?',
    a: 'Core HCM, Payroll (Canadian & US), Recruiting, Benefits, Time Tracking, Absence Management, and Integrations. I have led full-cycle deployments from requirements through post-go-live support.',
  },
  {
    q: 'Do you handle Canadian payroll configuration in Workday?',
    a: 'Yes — Canadian Workday Payroll is a specialized discipline. I have hands-on experience with CPP contributions, EI premiums, Record of Employment (ROE) generation, provincial tax tables, and Quebec QPIP requirements.',
  },
  {
    q: 'Can you rescue a troubled Workday implementation?',
    a: 'Yes. I can step into any phase of an in-flight implementation to assess status, identify root causes of delays or quality issues, and develop a recovery plan. This is one of the highest-value engagements I take on.',
  },
];

export default function ServiceWorkday() {
  return (
    <>
      <SEO
        title="Workday Implementation Specialist Canada — HCM & Payroll Expert | Karim Chaouki"
        description="Senior Workday implementation manager for Canadian organizations. Specializing in Workday HCM, Canadian Payroll, Recruiting, Benefits, and Time Tracking. PMP Certified. Bilingual EN/FR. Available across Canada."
        canonical="/services/workday-implementation-specialist"
        schema={schema}
      />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-blue-300">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-blue-500">›</li>
                <li className="text-white font-medium">Workday Implementation</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Senior Workday Implementation Specialist — Canada
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl leading-relaxed mb-8">
              Full-cycle Workday HCM, Payroll, and Benefits deployments for Canadian organizations.
              From requirements through go-live — delivered on time, compliant with Canadian regulations,
              and configured for your business.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/#contact"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Discuss Your Workday Project →
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Workday Implementation Management for Canadian Organizations
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A Workday implementation is one of the most significant technology investments your
                organization will make. The decisions made in the first eight weeks — scope, design,
                data strategy, change management — determine whether your go-live is a success or a crisis.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                As a <strong className="text-slate-800">senior Workday implementation specialist</strong>,
                I bring project management discipline and deep functional knowledge to every phase of your
                Workday journey. I've led complex multi-module deployments for Canadian financial institutions,
                healthcare organizations, and public sector entities.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Canadian payroll configuration in Workday is significantly more complex than US payroll.
                CPP contributions, EI premiums, Record of Employment (ROE) generation, provincial tax tables,
                and Quebec's QPIP requirements demand a practitioner who has actually built and tested these
                configurations — not someone learning them on your project's dime.
              </p>

              <blockquote className="border-l-4 border-blue-600 pl-6 py-2 bg-slate-50 rounded-r-lg my-8">
                <p className="text-slate-700 italic text-lg leading-relaxed">
                  "Karim led our Workday payroll implementation across four provinces. He knew the
                  configuration details, anticipated compliance edge cases, and kept the project on
                  track when scope changes threatened the timeline."
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
                  { type: 'Project Manager', desc: 'End-to-end PM for your full Workday implementation' },
                  { type: 'Functional Lead', desc: 'Drive specific module workstreams (Payroll, HCM, Benefits)' },
                  { type: 'Staff Augmentation', desc: 'Supplement your team during peak phases' },
                  { type: 'Implementation Rescue', desc: 'Assess and stabilize a troubled implementation' },
                ].map((e) => (
                  <div key={e.type} className="py-3 border-b border-slate-100 last:border-0">
                    <div className="font-semibold text-sm text-slate-800">{e.type}</div>
                    <div className="text-xs text-slate-500 mt-1">{e.desc}</div>
                  </div>
                ))}
                <Link href="/#contact"
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
                Workday Modules
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
              Common Questions About Workday Implementations in Canada
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
              <Link href="/services/aml-consultant-canada" className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">AML Compliance Consulting →</Link>
              <Link href="/services/project-manager-payroll-systems" className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">Payroll Systems PM →</Link>
              <Link href="/services/bilingual-implementation-manager" className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">Bilingual PM (EN/FR) →</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-700 py-16 px-6 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Planning a Workday Implementation in Canada?</h2>
            <p className="text-blue-200 text-lg mb-8">
              Let's discuss your timeline, scope, and how I can support your team from day one.
            </p>
            <Link href="/#contact"
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
