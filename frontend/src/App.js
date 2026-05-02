import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import ServiceAML from './pages/ServiceAML';
import ServiceADPWorkforceNow from './pages/ServiceADPWorkforceNow';
import ServicePayroll from './pages/ServicePayroll';
import ServiceBilingual from './pages/ServiceBilingual';
import AboutPage from './pages/AboutPage';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';

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

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/services/aml-consultant-canada" element={<ServiceAML />} />
            <Route path="/services/adp-workforce-now-implementation" element={<ServiceADPWorkforceNow />} />
            <Route path="/services/project-manager-payroll-systems" element={<ServicePayroll />} />
            <Route path="/services/bilingual-implementation-manager" element={<ServiceBilingual />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
