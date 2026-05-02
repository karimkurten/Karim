import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO, { personSchema, buildBreadcrumb } from '../components/SEO';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    personSchema,
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'About Karim Chaouki', path: '/about' },
    ]),
  ],
};

const expertise = [
  { area: 'AML / Anti-Money Laundering', years: '10+ yrs', level: 95 },
  { area: 'ADP Workforce Now HCM & Payroll', years: '8+ yrs', level: 90 },
  { area: 'Project Management (PMP)', years: '12+ yrs', level: 95 },
  { area: 'FINTRAC Regulatory Compliance', years: '8+ yrs', level: 88 },
  { area: 'Payroll Systems Implementation', years: '10+ yrs', level: 92 },
  { area: 'ERP / HCM Platforms', years: '8+ yrs', level: 85 },
  { area: 'Risk Management', years: '10+ yrs', level: 90 },
  { area: 'Change Management', years: '12+ yrs', level: 88 },
];

const industries = [
  'Banking & Financial Services',
  'Credit Unions',
  'Insurance',
  'Fintech',
  'Federal Government',
  'Provincial Government',
  'Healthcare',
  'Telecommunications',
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Karim Chaouki — AML, ADP Workforce Now & Payroll Implementation Consultant | Canada"
        description="Learn about Karim Chaouki — Senior Implementation Consultant with 12+ years in AML compliance, ADP Workforce Now HCM, and payroll system implementations for Canadian financial institutions. PMP Certified. Bilingual EN/FR."
        canonical="/about"
        ogImage="https://karimchaouki.com/images/karim-chaouki.jpg"
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
                <li className="text-white font-medium">About</li>
              </ol>
            </nav>
            <div className="grid md:grid-cols-3 gap-10 items-center">
              <div className="md:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  About Karim Chaouki
                </h1>
                <p className="text-xl text-blue-200 leading-relaxed mb-6">
                  Senior Implementation Consultant specializing in AML compliance, ADP Workforce Now HCM, and
                  payroll systems for Canadian financial institutions. 12+ years delivering complex
                  projects that other teams couldn't finish.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/10 border border-white/20 text-sm font-medium px-3 py-1.5 rounded-full">PMP Certified</span>
                  <span className="bg-white/10 border border-white/20 text-sm font-medium px-3 py-1.5 rounded-full">Bilingual EN/FR/AR</span>
                  <span className="bg-white/10 border border-white/20 text-sm font-medium px-3 py-1.5 rounded-full">Toronto, Ontario</span>
                  <span className="bg-white/10 border border-white/20 text-sm font-medium px-3 py-1.5 rounded-full">Available Across Canada</span>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <img
                  src="/images/karim-chaouki.jpg"
                  alt="Karim Chaouki — Senior Implementation Consultant, AML and ADP Workforce Now Specialist, Toronto Canada"
                  className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
                  width="224"
                  height="224"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">My Background</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                For over 12 years, I've worked at the intersection of technology implementation and
                regulatory compliance in Canada's financial services sector. My career has been defined
                by one consistent challenge: taking complex, high-stakes projects that span multiple
                systems, multiple provinces, and multiple regulatory frameworks — and delivering them
                on time.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                I started in project management and quickly specialized in two areas where the stakes
                are highest: <strong className="text-slate-800">AML compliance programs</strong> and
                <strong className="text-slate-800"> HCM/payroll system implementations</strong>. These
                aren't glamorous disciplines — but they're mission-critical. A payroll error affects every
                employee. An AML gap can result in regulatory sanctions. There's no room for "good enough."
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                My bilingual (English/French) capability has made me a particularly valuable partner for
                Canadian organizations operating across provincial boundaries — especially those with
                Quebec operations, federal mandates, or Official Languages Act obligations. I've run
                full project governance in French for Quebec-based clients and seamlessly managed
                bilingual steering committees for national organizations.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mb-3">My Approach</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                I treat every implementation as a risk management exercise. The technical configuration
                is rarely the hard part — the hard part is getting the right decisions made at the right
                time, managing scope creep without losing stakeholder trust, and ensuring the people who
                will use the system are genuinely ready for go-live.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                I'm direct with clients about risks, honest about timelines, and relentless about
                follow-through. If something is going to slip, you'll hear it from me first — along
                with a recovery plan.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href="/resume/KC_PM_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-colors text-sm"
                >
                  Download Full Resume (PDF) →
                </a>
                <a
                  href="https://www.linkedin.com/in/karimchaouki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-blue-200 text-blue-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                >
                  View LinkedIn Profile →
                </a>
              </div>
            </div>

            {/* Stats sidebar */}
            <aside>
              <div className="space-y-4">
                {[
                  { number: '12+', label: 'Years of experience' },
                  { number: '20+', label: 'Implementations delivered' },
                  { number: '3', label: 'Languages: EN, FR, AR' },
                  { number: '100%', label: 'On-time delivery rate' },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-blue-700 mb-1">{s.number}</div>
                    <div className="text-sm text-slate-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Core Expertise</span>
              <h2 className="text-3xl font-bold text-slate-900">Areas of Deep Specialization</h2>
            </div>
            <div className="space-y-4 max-w-2xl mx-auto">
              {expertise.map((e) => (
                <div key={e.area}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-semibold text-slate-800">{e.area}</span>
                    <span className="text-xs text-slate-500">{e.years}</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${e.level}%` }}
                      role="progressbar"
                      aria-valuenow={e.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${e.area} proficiency: ${e.level}%`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Industries Served</span>
              <h2 className="text-3xl font-bold text-slate-900">Sectors I've Worked In</h2>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {industries.map((ind) => (
                <span key={ind} className="bg-slate-100 border border-slate-200 text-slate-700 font-medium px-4 py-2 rounded-full text-sm">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services CTA section */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">How I Can Help Your Organization</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'AML Compliance', href: '/services/aml-consultant-canada', icon: '🛡️' },
                { title: 'ADP Workforce Now Implementation', href: '/services/adp-workforce-now-implementation', icon: '⚙️' },
                { title: 'Payroll Systems PM', href: '/services/project-manager-payroll-systems', icon: '💰' },
                { title: 'Bilingual Delivery', href: '/services/bilingual-implementation-manager', icon: '🌐' },
              ].map((s) => (
                <Link key={s.href} to={s.href} className="bg-white border border-slate-200 rounded-xl p-5 text-center hover:shadow-md hover:border-blue-200 transition-all group">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="font-semibold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">{s.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-700 py-16 px-6 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Ready to Work Together?</h2>
            <p className="text-blue-200 text-lg mb-8">
              Whether you have an upcoming implementation, a compliance gap, or a project in trouble —
              let's talk. Initial consultations are always complimentary.
            </p>
            <Link to="/#contact" className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg">
              Book a Free Discovery Call →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
