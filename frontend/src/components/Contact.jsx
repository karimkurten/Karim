import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, Linkedin, Globe } from 'lucide-react';

const Contact = () => {
  const [ref, isVisible] = useScrollReveal();

  const contactCards = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'karimchaouki',
      href: personalInfo.linkedin,
    },
  ];

  return (
    <>
      <section id="contact" className="relative py-24 md:py-32 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(43,108,176,0.04)_0%,_transparent_60%)]" />

        <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-[#2B6CB0] text-sm font-semibold uppercase tracking-[0.2em]">
              Get In Touch
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A202C]">
              Let's Talk
            </h2>
            <p className="mt-4 text-[#94A3B8] max-w-xl mx-auto">
              Reach out by email or LinkedIn — typical reply time is under
              24 hours on business days.
            </p>
          </div>

          <div
            className={`mt-12 max-w-2xl mx-auto space-y-4 transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {contactCards.map((card) => {
              const Icon = card.icon;
              const isExternal = card.href.startsWith('http');
              return (
                <a
                  key={card.label}
                  href={card.href}
                  data-testid={`contact-card-${card.label.toLowerCase()}`}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="flex items-center gap-4 p-5 rounded-xl border border-[#E2E8F0] bg-white/50 hover:border-[#2B6CB0]/30 hover:bg-[#2B6CB0]/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2B6CB0]/10 flex items-center justify-center group-hover:bg-[#2B6CB0]/20 transition-colors duration-300">
                    <Icon size={20} className="text-[#2B6CB0]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wider">
                      {card.label}
                    </p>
                    <p className="text-[#1A202C] font-medium">{card.value}</p>
                  </div>
                </a>
              );
            })}

            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-white/50">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={20} className="text-[#2B6CB0]" />
                <h3 className="text-[#1A202C] font-semibold">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {personalInfo.languages.map((l) => (
                  <span
                    key={l.lang}
                    className="px-4 py-2 rounded-lg bg-[#2B6CB0]/10 text-sm text-[#2B6CB0] font-medium border border-[#2B6CB0]/20"
                  >
                    {l.lang} — {l.level}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 text-center">
              <a
                href={`mailto:${personalInfo.email}`}
                data-testid="primary-contact-cta"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#2B6CB0] text-white font-semibold rounded-xl hover:bg-[#2563EB] transition-all duration-300 hover:shadow-xl hover:shadow-[#2B6CB0]/20 hover:-translate-y-0.5"
              >
                <Mail size={18} />
                Send an Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#F0F4F8] border-t border-[#E2E8F0] py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Karim Chaouki Logo"
                className="w-8 h-8 rounded-lg object-contain"
              />
              <span className="text-[#64748B] text-sm">
                &copy; {new Date().getFullYear()} Karim Chaouki. All Rights
                Reserved.
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/privacy-policy"
                className="text-[#94A3B8] hover:text-[#2B6CB0] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <span className="text-[#E2E8F0]">|</span>
              <Link
                to="/terms-and-conditions"
                className="text-[#94A3B8] hover:text-[#2B6CB0] transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-[#94A3B8] hover:text-[#2B6CB0] transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#2B6CB0] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
