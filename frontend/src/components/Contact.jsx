import React, { useState } from 'react';
import { personalInfo } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Mail,
  Linkedin,
  Globe,
  Send,
  CheckCircle,
} from 'lucide-react';

const Contact = () => {
  const [ref, isVisible] = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const messages = JSON.parse(
      localStorage.getItem('contactMessages') || '[]'
    );
    messages.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

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
      <section id="contact" className="relative py-24 md:py-32 bg-[#0F172A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,169,78,0.04)_0%,_transparent_60%)]" />

        <div
          ref={ref}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
        >
          <div
            className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-[#C8A94E] text-sm font-semibold uppercase tracking-[0.2em]">
              Get In Touch
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#F1F5F9]">
              Contact
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="space-y-4">
                {contactCards.map((card, i) => {
                  const Icon = card.icon;
                  const isLink = !!card.href;
                  const Tag = isLink ? 'a' : 'div';
                  const linkProps = isLink
                    ? {
                        href: card.href,
                        ...(card.href.startsWith('http')
                          ? {
                              target: '_blank',
                              rel: 'noopener noreferrer',
                            }
                          : {}),
                      }
                    : {};

                  return (
                    <Tag
                      key={i}
                      {...linkProps}
                      className="flex items-center gap-4 p-5 rounded-xl border border-[#1E293B] bg-[#111827]/50 hover:border-[#C8A94E]/20 hover:bg-[#C8A94E]/5 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#C8A94E]/10 flex items-center justify-center group-hover:bg-[#C8A94E]/20 transition-colors duration-300">
                        <Icon size={20} className="text-[#C8A94E]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#64748B] uppercase tracking-wider">
                          {card.label}
                        </p>
                        <p className="text-[#F1F5F9] font-medium">
                          {card.value}
                        </p>
                      </div>
                    </Tag>
                  );
                })}
              </div>

              {/* Languages */}
              <div className="mt-8 p-5 rounded-xl border border-[#1E293B] bg-[#111827]/50">
                <div className="flex items-center gap-3 mb-4">
                  <Globe size={20} className="text-[#C8A94E]" />
                  <h3 className="text-[#F1F5F9] font-semibold">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {personalInfo.languages.map((l, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-lg bg-[#C8A94E]/10 text-sm text-[#C8A94E] font-medium border border-[#C8A94E]/20"
                    >
                      {l.lang} — {l.level}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            >
              {submitted ? (
                <div className="h-full flex items-center justify-center p-8 rounded-2xl border border-[#C8A94E]/30 bg-[#C8A94E]/5">
                  <div className="text-center">
                    <CheckCircle
                      size={48}
                      className="text-[#C8A94E] mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-[#F1F5F9]">
                      Message Sent!
                    </h3>
                    <p className="mt-2 text-[#94A3B8]">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-[#94A3B8] mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#1E293B] text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#C8A94E]/50 focus:ring-1 focus:ring-[#C8A94E]/30 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#94A3B8] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#1E293B] text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#C8A94E]/50 focus:ring-1 focus:ring-[#C8A94E]/30 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#94A3B8] mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#1E293B] text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#C8A94E]/50 focus:ring-1 focus:ring-[#C8A94E]/30 transition-all duration-300"
                      placeholder="Project inquiry, collaboration, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#94A3B8] mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#1E293B] text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#C8A94E]/50 focus:ring-1 focus:ring-[#C8A94E]/30 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#C8A94E] text-[#0B1120] font-semibold rounded-xl hover:bg-[#E2C878] transition-all duration-300 hover:shadow-xl hover:shadow-[#C8A94E]/20"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1120] border-t border-[#1E293B] py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8A94E] to-[#A08030] flex items-center justify-center text-[#0B1120] font-bold text-sm font-serif">
                KC
              </div>
              <span className="text-[#94A3B8] text-sm">
                &copy; {new Date().getFullYear()} Karim Chaouki. All rights
                reserved.
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-[#64748B] hover:text-[#C8A94E] transition-colors duration-300"
              >
                <Mail size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64748B] hover:text-[#C8A94E] transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="text-[#64748B] hover:text-[#C8A94E] transition-colors duration-300"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
