import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navLinks, personalInfo } from '../data/mockData';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // setScrolled is a stable React setter; no other external deps.
  }, []);

  const onHome = location.pathname === '/';

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    if (onHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate home then scroll (naive hash approach — works for all our anchors).
      navigate('/' + href);
    }
  };

  const renderNavItem = (link, extraClass = '') => {
    const baseClass = `px-4 py-2 text-sm text-[#64748B] hover:text-[#2B6CB0] transition-colors duration-300 relative group ${extraClass}`;
    const underline = (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/3 h-[2px] bg-[#2B6CB0] transition-all duration-300" />
    );

    if (link.route) {
      return (
        <Link
          key={link.href}
          to={link.href}
          onClick={() => setMobileOpen(false)}
          className={baseClass}
          data-testid={`nav-link-${link.label.toLowerCase()}`}
        >
          {link.label}
          {underline}
        </Link>
      );
    }

    return (
      <a
        key={link.href}
        href={link.href}
        onClick={(e) => handleAnchorClick(e, link.href)}
        className={baseClass}
        data-testid={`nav-link-${link.label.toLowerCase()}`}
      >
        {link.label}
        {underline}
      </a>
    );
  };

  const renderMobileItem = (link) => {
    const baseClass =
      'block px-4 py-3 text-[#64748B] hover:text-[#2B6CB0] hover:bg-[#2B6CB0]/5 rounded-lg transition-all duration-300';

    if (link.route) {
      return (
        <Link
          key={link.href}
          to={link.href}
          onClick={() => setMobileOpen(false)}
          className={baseClass}
          data-testid={`nav-mobile-${link.label.toLowerCase()}`}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <a
        key={link.href}
        href={link.href}
        onClick={(e) => handleAnchorClick(e, link.href)}
        className={baseClass}
        data-testid={`nav-mobile-${link.label.toLowerCase()}`}
      >
        {link.label}
      </a>
    );
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
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
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
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => renderNavItem(link))}
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
            aria-label="Toggle menu"
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
          {navLinks.map((link) => renderMobileItem(link))}
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
