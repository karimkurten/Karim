import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Mail,
  Linkedin,
  Globe,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [ref, isVisible] = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);

    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    } catch (err) {
      const msg =
        err.response?.data?.detail?.[0]?.msg ||
        err.response?.data?.detail ||
        'Something went wrong. Please try again or email directly.';
      setError(typeof msg === 'string' ? msg : 'Failed to send message.');
    } finally {
      setSending(false);
    }
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
      <section id="contact" className="relative py-24 md:py-32 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(43,108,176,0.04)_0%,_transparent_60%)]" />

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
            <span className="text-[#2B6CB0] text-sm font-semibold uppercase tracking-[0.2em]">
              Get In Touch
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A202C]">
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
                      className="flex items-center gap-4 p-5 rounded-xl border border-[#E2E8F0] bg-white/50 hover:border-[#2B6CB0]/20 hover:bg-[#2B6CB0]/5 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#2B6CB0]/10 flex items-center justify-center group-hover:bg-[#2B6CB0]/20 transition-colors duration-300">
                        <Icon size={20} className="text-[#2B6CB0]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#94A3B8] uppercase tracking-wider">
                          {card.label}
                        </p>
                        <p className="text-[#1A202C] font-medium">
                          {card.value}
                        </p>
                      </div>
                    </Tag>
                  );
                })}
              </div>

              {/* Languages */}
              <div className="mt-8 p-5 rounded-xl border border-[#E2E8F0] bg-white/50">
                <div className="flex items-center gap-3 mb-4">
                  <Globe size={20} className="text-[#2B6CB0]" />
                  <h3 className="text-[#1A202C] font-semibold">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {personalInfo.languages.map((l, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-lg bg-[#2B6CB0]/10 text-sm text-[#2B6CB0] font-medium border border-[#2B6CB0]/20"
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
                <div className="h-full flex items-center justify-center p-8 rounded-2xl border border-[#2B6CB0]/30 bg-[#2B6CB0]/5">
                  <div className="text-center">
                    <CheckCircle
                      size={48}
                      className="text-[#2B6CB0] mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-[#1A202C]">
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
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-[#1A202C] placeholder-[#475569] focus:outline-none focus:border-[#2B6CB0]/50 focus:ring-1 focus:ring-[#2B6CB0]/30 transition-all duration-300"
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
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-[#1A202C] placeholder-[#475569] focus:outline-none focus:border-[#2B6CB0]/50 focus:ring-1 focus:ring-[#2B6CB0]/30 transition-all duration-300"
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
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-[#1A202C] placeholder-[#475569] focus:outline-none focus:border-[#2B6CB0]/50 focus:ring-1 focus:ring-[#2B6CB0]/30 transition-all duration-300"
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
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-[#1A202C] placeholder-[#475569] focus:outline-none focus:border-[#2B6CB0]/50 focus:ring-1 focus:ring-[#2B6CB0]/30 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertCircle size={16} className="flex-shrink-0" />
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#2B6CB0] text-[#0B1120] font-semibold rounded-xl hover:bg-[#2563EB] transition-all duration-300 hover:shadow-xl hover:shadow-[#2B6CB0]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F0F4F8] border-t border-[#E2E8F0] py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2B6CB0] to-[#1E5090] flex items-center justify-center text-[#0B1120] font-bold text-sm font-serif">
                KC
              </div>
              <span className="text-[#94A3B8] text-sm">
                &copy; 2025 Karim Chaouki. All Rights Reserved.
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/privacy-policy"
                className="text-[#94A3B8] hover:text-[#2B6CB0] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <span className="text-[#1E293B]">|</span>
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
              >
                <Mail size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#2B6CB0] transition-colors duration-300"
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
