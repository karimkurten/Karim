import React, { useState, useEffect } from 'react';
import { navLinks, personalInfo } from '../data/mockData';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B1120]/90 backdrop-blur-xl border-b border-[#C8A94E]/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A94E] to-[#A08030] flex items-center justify-center text-[#0B1120] font-bold text-lg font-serif">
              KC
            </div>
            <span className="hidden sm:block text-[#F1F5F9] font-semibold tracking-wide group-hover:text-[#C8A94E] transition-colors duration-300">
              {personalInfo.name}
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2 text-sm text-[#94A3B8] hover:text-[#C8A94E] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/3 h-[2px] bg-[#C8A94E] transition-all duration-300" />
              </a>
            ))}
            <a
              href={`mailto:${personalInfo.email}`}
              className="ml-4 px-6 py-2.5 text-sm font-semibold text-[#0B1120] bg-[#C8A94E] rounded-lg hover:bg-[#E2C878] transition-all duration-300 hover:shadow-lg hover:shadow-[#C8A94E]/20"
            >
              Hire Me
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#94A3B8] hover:text-[#C8A94E] transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0B1120]/95 backdrop-blur-xl border-t border-[#C8A94E]/10 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 text-[#94A3B8] hover:text-[#C8A94E] hover:bg-[#C8A94E]/5 rounded-lg transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${personalInfo.email}`}
            className="block text-center mt-4 px-6 py-3 text-sm font-semibold text-[#0B1120] bg-[#C8A94E] rounded-lg hover:bg-[#E2C878] transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
