import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto p-5 md:p-6 rounded-2xl bg-[#111827]/95 backdrop-blur-xl border border-[#1E293B] shadow-2xl shadow-black/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Cookie size={24} className="text-[#C8A94E] flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm text-[#94A3B8] leading-relaxed flex-1">
            This site uses cookies to enhance your browsing experience. By
            continuing to use this site, you accept our use of cookies.{' '}
            <Link
              to="/privacy-policy"
              className="text-[#C8A94E] hover:text-[#E2C878] underline underline-offset-2 transition-colors"
            >
              Learn more
            </Link>
          </p>
          <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <Link
              to="/privacy-policy"
              className="flex-1 sm:flex-none text-center px-5 py-2.5 text-sm border border-[#1E293B] text-[#94A3B8] rounded-lg hover:bg-[#1E293B]/50 hover:text-[#F1F5F9] transition-all duration-300"
            >
              Privacy Policy
            </Link>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none text-center px-6 py-2.5 text-sm font-semibold bg-[#C8A94E] text-[#0B1120] rounded-lg hover:bg-[#E2C878] transition-all duration-300"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
