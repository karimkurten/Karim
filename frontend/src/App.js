import React, { lazy, Suspense } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import Expertise from './components/Expertise';
import Timeline from './components/Timeline';
import Certifications from './components/Certifications';
import ImpactMetrics from './components/ImpactMetrics';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import CookieConsent from './components/CookieConsent';
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./components/TermsConditions'));
const ServiceAML = lazy(() => import('./pages/ServiceAML'));
const ServiceADPWorkforceNow = lazy(() => import('./pages/ServiceADPWorkforceNow'));
const ServicePayroll = lazy(() => import('./pages/ServicePayroll'));
const ServiceBilingual = lazy(() => import('./pages/ServiceBilingual'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ResumeRequest = lazy(() => import('./pages/ResumeRequest'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Portfolio = () => (
  <>
    <Header />
    <main id="main-content">
      <Hero />
      <ValueProposition />
      <Expertise />
      <Timeline />
      <Certifications />
      <ImpactMetrics />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  </>
);

// Site-wide call to action. Blog articles render their own in-article CTA
// card and the homepage closes with the full Contact section, so the band
// is shown on every other page.
const SiteCta = () => {
  const { pathname } = useLocation();
  if (pathname === '/' || /^\/blog\/.+/.test(pathname)) {
    return null;
  }
  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-slate-900 to-blue-900 px-8 py-10 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 mb-3">
          Work With Karim
        </p>
        <p className="text-lg leading-relaxed text-slate-100">
          Planning an implementation — or steadying one that is already in flight?{' '}
          <strong className="font-semibold text-white">Contact Karim</strong> to discuss your
          project, your risks, or your timeline.
        </p>
        <a
          href="/#contact"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-blue-100"
        >
          Contact Karim
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/resume" element={<ResumeRequest />} />
          <Route path="/services/aml-consultant-canada" element={<ServiceAML />} />
          <Route path="/services/adp-workforce-now-implementation" element={<ServiceADPWorkforceNow />} />
          <Route path="/services/project-manager-payroll-systems" element={<ServicePayroll />} />
          <Route path="/services/bilingual-implementation-manager" element={<ServiceBilingual />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <SiteCta />
        <CookieConsent />
      </BrowserRouter>
    </div>
  );
}

export default App;

