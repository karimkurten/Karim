import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO, { buildServiceSchema, buildBreadcrumb, buildFAQSchema } from '../components/SEO';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    buildServiceSchema(
      'AML Compliance Consulting — Canada',
      'End-to-end AML program design, FINTRAC compliance, KYC/CDD implementation, and transaction monitoring project management for Canadian financial institutions.',
      '/services/aml-consultant-canada'
    ),
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'AML Compliance Consulting Canada', path: '/services/aml-consultant-canada' },
    ]),
    buildFAQSchema([
      {
        q: 'What AML compliance services do you provide in Canada?',
        a: 'I provide end-to-end AML compliance consulting including FINTRAC compliance program design, KYC/CDD implementation, transaction monitoring setup, AML project management, and risk assessments for Canadian banks, credit unions, and fintechs.',
      },
      {
        q: 'Are you familiar with FINTRAC regulations?',
        a: 'Yes. I specialize in FINTRAC regulatory requirements for Reporting Entities in Canada, including Large Cash Transaction Reports (LCTR), Suspicious Transaction Reports (STR), EFT reports, and the five pillars of an AML compliance program.',
      },
      {
        q: 'Do you offer bilingual AML consulting in French and English?',
        a: 'Yes. I deliver all project documentation, stakeholder communications, and training materials in both English and French, making me an ideal partner for Quebec-based institutions and federal entities.',
      },
      {
        q: 'How long does an AML compliance program implementation take?',
        a: 'Scope varies. A gap assessment and remediation plan for a mid-sized credit union may take 6–8 weeks. A full AML program build for a growing fintech typically runs 4–6 months. Transaction monitoring implementations generally take 6–12 months.',
      },
    ]),
  ],
};

const services = [
  {
    title: 'AML Program Design & Implementation',
    desc: 'Build a compliant AML program from scratch or remediate an existing one. Covers policies, procedures, internal controls, risk appetite, and staff training aligned to FINTRAC and OSFI requirements.',
    icon: '🛡️',
  },
  {
    title: 'FINTRAC Compliance Management',
    desc: 'Ensure your organization meets all FINTRAC Reporting Entity obligations: LCTRs, STRs, EFT reporting, and record-keeping requirements.',
    icon: '📋',
  },
  {
    title: 'KYC / CDD Program Implementation',
    desc: 'Design and implement Know Your Customer (KYC) and Customer Due Diligence (CDD) frameworks including risk rating, EDD processes, and beneficial ownership procedures.',
    icon: '🔍',
  },
  {
    title: 'Transaction Monitoring System Deployment',
    desc: 'Project manage the selection, implementation, and tuning of transaction monitoring systems. Includes use-case development, scenario testing, and alert optimization.',
    icon: '📊',
  },
  {
    title: 'AML Technology Project Management',
    desc: 'Lead AML technology transformation programs from requirements gathering through go-live. Coordinate compliance, IT, operations, and legal teams to deliver on time.',
    icon: '⚙️',
  },
  {
    title: 'AML Risk Assessments',
    desc: 'Conduct enterprise-wide AML/CTF risk assessments aligned to FATF recommendations and OSFI guidance. Identify high-risk products, clients, channels, and geographies.',
    icon: '⚠️',
  },
];

const faqs = [
  {
    q: 'What is a FINTRAC Reporting Entity?',
    a: "A FINTRAC Reporting Entity (RE) is any organization subject to Canada's Proceeds of Crime (Money Laundering) and Terrorist Financing Act — including banks, credit unions, insurance companies, securities dealers, MSBs, and real estate brokers. I can assess your obligations and build the compliance program around them.",
  },
  {
    q: 'How long does an AML program implementation take?',
    a: 'A gap assessment for a mid-sized credit union might take 6–8 weeks. A full AML program build for a fintech typically runs 4–6 months. Transaction monitoring implementations generally take 6–12 months from requirements to go-live.',
  },
  {
    q: 'Do you work with organizations outside Toronto?',
    a: 'Yes. I serve clients across Canada including Montreal, Vancouver, Calgary, Ottawa, and Quebec City — remotely and on-site. My bilingual (EN/FR) capability makes me especially effective for Quebec-based and federal organizations.',
  },
];

export default function ServiceAML() {
  return (
    <>
      <SEO
        title="AML Compliance Consultant Canada — FINTRAC & KYC Specialist | Karim Chaouki"
        description="Experienced AML compliance consultant serving Canadian financial institutions. Specializing in FINTRAC compliance, KYC/CDD implementation, transaction monitoring, and AML program design. Bilingual EN/FR. Based in Toronto."
        canonical="/services/aml-consultant-canada"
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
                <li className="text-white font-medium">AML Compliance Consulting</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              AML Compliance Consultant — Canada
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl leading-relaxed mb-8">
              End-to-end AML program design, FINTRAC compliance, KYC/CDD implementation, and
              transaction monitoring project management for Canadian financial institutions.
              Bilingual (EN/FR) · PMP Certified · Based in Toronto.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/#contact"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Book a Free Consultation →
              </Link>
              <a
                href="#services"
                className="border border-blue-400 text-blue-200 font-semibold px-6 py-3 rounded-lg hover:border-white hover:text-white transition-colors"
              >
                View Services
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                AML Compliance Consulting for Canadian Financial Institutions
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Canada's anti-money laundering regulatory environment is one of the most demanding in the
                world. FINTRAC oversight, OSFI guidance, and evolving FATF recommendations require financial
                institutions to maintain rigorous, continuously updated AML compliance programs — and the
                cost of non-compliance has never been higher.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                As an experienced <strong className="text-slate-800">AML compliance consultant in Canada</strong>,
                I help banks, credit unions, insurance companies, and fintechs design, implement, and
                operationalize AML programs that satisfy regulatory requirements and scale with your business.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                My bilingual (English/French) capability means I can serve organizations operating across
                Canada — including Quebec-based institutions and federal Reporting Entities — with full
                documentation and stakeholder communication in both official languages.
              </p>

              {/* Testimonial */}
              <blockquote className="border-l-4 border-blue-600 pl-6 py-2 bg-slate-50 rounded-r-lg my-8">
                <p className="text-slate-700 italic text-lg leading-relaxed">
                  "Karim's knowledge of FINTRAC requirements and his ability to translate regulatory
                  obligations into practical operational procedures was invaluable during our compliance
                  program overhaul."
                </p>
                <cite className="text-slate-500 text-sm font-semibold not-italic mt-2 block">
                  — Chief Compliance Officer · Canadian Credit Union
                </cite>
              </blockquote>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4">Quick Facts</h3>
                <ul className="space-y-3">
                  {[
                    '12+ years in compliance & PM',
                    'FINTRAC Reporting Entity expertise',
                    'PMP Certified',
                    'Bilingual: English / French',
                    'Based in Toronto, ON',
                    'Available across Canada',
                    'Remote & on-site engagements',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="text-blue-600 font-bold mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/#contact"
                  className="mt-6 block text-center bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Start a Conversation →
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

        {/* Services Grid */}
        <section id="services" className="py-16 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                What I Deliver
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                AML Consulting Services in Canada
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Common Questions About AML Consulting in Canada
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
        <section className="py-10 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Related Services</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/services/adp-workforce-now-implementation" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                ADP Workforce Now Implementation US/CAN →
              </Link>
              <Link to="/services/project-manager-payroll-systems" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                Payroll Systems PM →
              </Link>
              <Link to="/services/bilingual-implementation-manager" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                Bilingual PM (EN/FR) →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="bg-blue-700 py-16 px-6 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Need an AML Compliance Consultant in Canada?</h2>
            <p className="text-blue-200 text-lg mb-8">
              Let's discuss your FINTRAC obligations, AML program gaps, or upcoming compliance project.
              Initial consultations are complimentary.
            </p>
            <Link
              to="/#contact"
              className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg"
            >
              Book Your Free Discovery Call →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
