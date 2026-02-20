import React from 'react';
import { personalInfo, stats } from '../data/mockData';
import { useScrollReveal, useCounter } from '../hooks/useScrollReveal';
import { ArrowDown, ExternalLink, Download } from 'lucide-react';

const StatCounter = ({ value, suffix, label }) => {
  const [ref, isVisible] = useScrollReveal(0.5);
  const count = useCounter(value, 2200, isVisible);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#2B6CB0] font-serif tracking-tight">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-[#64748B] uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
};

const ProfilePhoto = () => (
  <div className="relative">
    <div className="w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-white overflow-hidden shadow-2xl shadow-[#2B6CB0]/10 ring-4 ring-white ring-offset-2 ring-offset-[#2B6CB0]/20">
      <img
        src="/images/karim-chaouki.jpg"
        alt="Karim Chaouki"
        className="w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />
    </div>
    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#2B6CB0] border-4 border-[#F0F4F8]" />
  </div>
);

const Hero = () => {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#F0F4F8]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/373965/pexels-photo-373965.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            opacity: 0.06,
            filter: 'grayscale(100%) brightness(1.2)',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(43,108,176,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(43,108,176,0.04)_0%,_transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(43,108,176,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(43,108,176,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          <div
            className={`flex-1 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2B6CB0]/20 bg-[#2B6CB0]/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-[#2B6CB0] font-medium">
                Available for New Engagements
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1A202C] leading-[1.1] max-w-5xl">
              Enterprise HCM Implementations.{' '}
              <span className="text-[#2B6CB0]">Zero Delays.</span>
              <br className="hidden md:block" />
              100% Client Retention.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg md:text-xl text-[#64748B] max-w-2xl leading-relaxed">
              {personalInfo.subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#2B6CB0] text-white font-semibold rounded-lg hover:bg-[#2563EB] transition-all duration-300 hover:shadow-xl hover:shadow-[#2B6CB0]/20 hover:-translate-y-0.5"
              >
                Hire Me
                <ExternalLink
                  size={18}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#experience')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-[#2B6CB0]/30 text-[#2B6CB0] font-semibold rounded-lg hover:bg-[#2B6CB0]/5 hover:border-[#2B6CB0]/50 bg-white transition-all duration-300 hover:-translate-y-0.5"
              >
                View My Work
                <ArrowDown
                  size={18}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href={personalInfo.resumeUrl}
                download="Karim_Chaouki_Resume.pdf"
                className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-[#CBD5E1] text-[#64748B] font-semibold rounded-lg hover:bg-white hover:text-[#1A202C] hover:border-[#94A3B8] transition-all duration-300 hover:-translate-y-0.5"
              >
                Download Resume
                <Download
                  size={18}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* Profile Picture */}
          <div
            className={`flex-shrink-0 flex justify-center lg:justify-end transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <ProfilePhoto />
          </div>
        </div>

        {/* Stats */}
        <div
          className={`mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 transition-all duration-1000 delay-300 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {stats.map((stat, i) => (
            <StatCounter key={i} {...stat} />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-[#94A3B8] uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ArrowDown size={16} className="text-[#94A3B8]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
