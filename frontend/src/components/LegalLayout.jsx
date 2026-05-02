import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Linkedin } from 'lucide-react';

const LegalLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#1A202C] font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#F0F4F8]/90 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="max-w-[860px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#2B6CB0] transition-colors duration-300"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <img 
              src="/logo.png" 
              alt="Karim Chaouki Logo" 
              className="w-8 h-8 rounded-lg object-contain"
            />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[860px] mx-auto px-6 py-16 md:py-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-[#F0F4F8]">
        <div className="max-w-[860px] mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/privacy-policy"
                className={`hover:text-[#2B6CB0] transition-colors ${
                  location.pathname === '/privacy-policy'
                    ? 'text-[#2B6CB0]'
                    : 'text-[#94A3B8]'
                }`}
              >
                Privacy Policy
              </Link>
              <span className="text-[#1E293B]">|</span>
              <Link
                to="/terms-and-conditions"
                className={`hover:text-[#2B6CB0] transition-colors ${
                  location.pathname === '/terms-and-conditions'
                    ? 'text-[#2B6CB0]'
                    : 'text-[#94A3B8]'
                }`}
              >
                Terms & Conditions
              </Link>
            </div>
            <p className="text-xs text-[#475569]">
              &copy; {new Date().getFullYear()} Karim Chaouki. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:karim.chaouki@gmail.com"
                className="text-[#94A3B8] hover:text-[#2B6CB0] transition-colors"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/karimchaouki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#2B6CB0] transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalLayout;
