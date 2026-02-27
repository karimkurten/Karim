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
          ? 'bg-white/90 backdrop-blur-xl border-b border-[#E2E8F0] shadow-sm'
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
            <img 
              src="/logo.png" 
              alt="Karim Chaouki Logo" 
              className="w-10 h-10 rounded-lg object-contain"
            />
            <span className="hidden sm:block text-[#1A202C] font-semibold tracking-wide group-hover:text-[#2B6CB0] transition-colors duration-300">
              {personalInfo.name}
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2 text-sm text-[#64748B] hover:text-[#2B6CB0] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/3 h-[2px] bg-[#2B6CB0] transition-all duration-300" />
              </a>
            ))}
            <a
              href={`mailto:${personalInfo.email}`}
              className="ml-4 px-6 py-2.5 text-sm font-semibold text-white bg-[#2B6CB0] rounded-lg hover:bg-[#2563EB] transition-all duration-300 hover:shadow-lg hover:shadow-[#2B6CB0]/20"
            >
              Hire Me
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#64748B] hover:text-[#2B6CB0] transition-colors"
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
        <div className="bg-white/95 backdrop-blur-xl border-t border-[#E2E8F0] px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 text-[#64748B] hover:text-[#2B6CB0] hover:bg-[#2B6CB0]/5 rounded-lg transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${personalInfo.email}`}
            className="block text-center mt-4 px-6 py-3 text-sm font-semibold text-white bg-[#2B6CB0] rounded-lg hover:bg-[#2563EB] transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
