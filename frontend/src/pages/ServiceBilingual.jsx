import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO, { buildServiceSchema, buildBreadcrumb, buildFAQSchema } from '../components/SEO';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    buildServiceSchema(
      'Bilingual Implementation Manager — English & French Canada',
      'Bilingual project manager delivering AML, Workday, and payroll implementations in both English and French. Serving Quebec organizations and federal entities across Canada.',
      '/services/bilingual-implementation-manager'
    ),
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Bilingual Implementation Manager', path: '/services/bilingual-implementation-manager' },
    ]),
    buildFAQSchema([
      {
        q: 'Do you deliver project documentation in both English and French?',
        a: 'Yes. I provide all project deliverables — charters, plans, status reports, training materials, and user guides — in both English and French. I also facilitate stakeholder meetings, workshops, and training sessions in either language.',
      },
      {
        q: 'Are you familiar with Quebec-specific regulations?',
        a: 'Yes. I have experience with Quebec payroll requirements (QPIP, RL-1 slips, CNESST), Quebec language laws (Bill 96 / Loi 101), and Quebec-specific AML and compliance requirements for financial institutions operating in the province.',
      },
    ]),
  ],
};

const bilingualAdvantages = [
  {
    title: 'Full French-Language Delivery',
    desc: 'All project documentation, reports, training, and communications produced in both English and French — at no quality compromise in either language.',
    icon: '🇨🇦',
  },
  {
    title: 'Quebec Regulatory Expertise',
    desc: 'Hands-on knowledge of Quebec-specific requirements: QPIP, RL-1, CNESST, and Bill 96 compliance for workplace and system documentation.',
    icon: '📋',
  },
  {
    title: 'Bilingual Stakeholder Facilitation',
    desc: 'Workshops, steering committee presentations, and training sessions conducted in the language of your stakeholders — no interpreters needed.',
    icon: '🎤',
  },
  {
    title: 'Federal Government Experience',
    desc: 'Familiar with the Official Languages Act obligations for federal entities and contractors. Bilingual project governance from day one.',
    icon: '🏛️',
  },
  {
    title: 'Cross-Cultural Team Management',
    desc: 'Experience managing mixed English and French teams across provinces, navigating cultural nuances that make or break stakeholder relationships.',
    icon: '🤝',
  },
  {
    title: 'Bilingual System Configuration',
    desc: 'Workday, payroll systems, and AML platforms configured with French-language interfaces, French field labels, and bilingual reporting outputs.',
    icon: '⚙️',
  },
];

const faqs = [
  {
    q: 'Why does bilingual delivery matter for implementation projects in Canada?',
    a: 'In Quebec and for federal entities, project failures are often caused by language barriers — not technical issues. When your Montreal-based HR team receives English-only training materials, adoption suffers. When steering committee reports don\'t match how French executives think about risk, approvals stall. Bilingual delivery is a project risk management strategy, not just a nice-to-have.',
  },
  {
    q: 'What regions do you serve in Canada?',
    a: 'I serve clients across Canada including Toronto, Montreal, Quebec City, Ottawa, Vancouver, Calgary, and remote/hybrid organizations. For Quebec-based and federal clients, bilingual delivery is available as standard on all engagements.',
  },
  {
    q: 'Can you lead an implementation in a predominantly French-speaking workplace?',
    a: 'Yes. I am fully fluent in French and have led implementations where French was the primary working language — including full project governance, vendor communications, and go-live operations in French.',
  },
];

export default function ServiceBilingual() {
  return (
    <>
      <SEO
        title="Bilingual Implementation Manager Canada — English & French PM | Karim Chaouki"
        description="Bilingual (English/French) implementation manager for Canadian organizations. AML compliance, Workday HCM, and payroll implementations delivered in both official languages. Serving Quebec, federal entities, and national organizations."
        canonical="/services/bilingual-implementation-manager"
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
                <li className="text-white font-medium">Bilingual Implementation Manager</li>
              </ol>
            </nav>
            <div className="flex gap-3 mb-6">
              <span className="bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full">🇨🇦 English</span>
              <span className="bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full">🇫🇷 Français</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Bilingual Implementation Manager — English &amp; French
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl leading-relaxed mb-4">
              AML compliance, Workday HCM, and payroll implementations delivered in both official
              Canadian languages. Serving Quebec organizations, federal entities, and national companies
              with cross-provincial teams.
            </p>
            <p className="text-lg text-blue-300 italic mb-8">
              Chef de projet d'implémentation bilingue — disponible partout au Canada.
            </p>
            <Link to="/#contact" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block">
              Discutons / Let's Talk →
            </Link>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Why Bilingual Project Delivery Changes Everything in Canada
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Most implementation projects in Canada fail not because of technical problems — they fail
                because of communication gaps. When English-only project teams deploy systems for French-speaking
                users in Quebec or for federal organizations with Official Languages Act obligations, the result
                is poor adoption, rework, and costly post-go-live remediation.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                As a <strong className="text-slate-800">bilingual implementation manager (English/French)</strong>,
                I eliminate this risk entirely. I run your project governance, stakeholder communications,
                training delivery, and system configuration in both languages — from day one through hypercare.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                This isn't translation-as-an-afterthought. Bilingual delivery is built into the project plan,
                the documentation templates, and the go-live readiness criteria. Your Montreal team gets the
                same quality of training, the same quality of user guides, and the same access to the project
                manager as your Toronto team.
              </p>

              <blockquote className="border-l-4 border-blue-600 pl-6 py-2 bg-slate-50 rounded-r-lg my-8">
                <p className="text-slate-700 italic leading-relaxed">
                  "Having Karim run our Quebec rollout in French — not translated, but genuinely in French —
                  was the difference between adoption and resistance. Our Montreal office embraced the system
                  because they were never made to feel like an afterthought."
                </p>
                <cite className="text-slate-500 text-sm font-semibold not-italic mt-2 block">
                  — VP Operations · National Financial Services Firm
                </cite>
              </blockquote>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-slate-900 mb-1">Bilingual Delivery Covers</h3>
                <p className="text-xs text-slate-500 mb-4">All deliverables available in English and French</p>
                <ul className="space-y-2.5 mb-6">
                  {[
                    'Project charters & governance docs',
                    'Status reports & steering decks',
                    'Training materials & user guides',
                    'System configuration labels',
                    'Workshop facilitation',
                    'Vendor communications',
                    'Go-live runbooks',
                    'Post-go-live support docs',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
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

        {/* Advantages Grid */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                What This Means for Your Project
              </span>
              <h2 className="text-3xl font-bold text-slate-900">The Bilingual Advantage</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bilingualAdvantages.map((a) => (
                <div key={a.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{a.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{a.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Questions About Bilingual Project Delivery
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
            <h2 className="text-xl font-bold text-slate-900 mb-4">Services Available Bilingually</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/services/aml-consultant-canada" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">AML Compliance Consulting →</Link>
              <Link to="/services/workday-implementation-specialist" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">Workday HCM Implementation →</Link>
              <Link to="/services/project-manager-payroll-systems" className="bg-white border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">Payroll Systems PM →</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-700 py-16 px-6 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Need a Bilingual Implementation Manager?</h2>
            <p className="text-blue-300 italic mb-2">Besoin d'un chef de projet bilingue?</p>
            <p className="text-blue-200 text-lg mb-8">
              Let's discuss your project in whichever language you prefer.
              Initial consultations are complimentary.
            </p>
            <Link to="/#contact" className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg">
              Discutons / Let's Talk →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
