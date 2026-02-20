import React from 'react';
import { personalInfo, stats } from '../data/mockData';
import { useScrollReveal, useCounter } from '../hooks/useScrollReveal';
import { ArrowDown, ExternalLink, Download } from 'lucide-react';

const StatCounter = ({ value, suffix, label }) => {
  const [ref, isVisible] = useScrollReveal(0.5);
  const count = useCounter(value, 2200, isVisible);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#C8A94E] font-serif tracking-tight">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-[#94A3B8] uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
};

const ProfilePhoto = () => (
  <div className="relative">
    <div className="w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-2 border-[#C8A94E]/30 overflow-hidden shadow-2xl shadow-[#C8A94E]/10 ring-4 ring-[#0B1120] ring-offset-2 ring-offset-[#C8A94E]/20">
      <img
        src="/images/karim-chaouki.jpg"
        alt="Karim Chaouki"
        className="w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />
    </div>
    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#C8A94E] border-4 border-[#0B1120]" />
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
      <div className="absolute inset-0 bg-[#0B1120]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(200,169,78,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(200,169,78,0.05)_0%,_transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,169,78,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,78,0.3) 1px, transparent 1px)',
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C8A94E]/20 bg-[#C8A94E]/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#C8A94E] animate-pulse" />
              <span className="text-sm text-[#C8A94E] font-medium">
                Available for New Engagements
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#F1F5F9] leading-[1.1] max-w-5xl">
              Enterprise HCM Implementations.{' '}
              <span className="text-[#C8A94E]">Zero Delays.</span>
              <br className="hidden md:block" />
              100% Client Retention.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg md:text-xl text-[#94A3B8] max-w-2xl leading-relaxed">
              {personalInfo.subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#C8A94E] text-[#0B1120] font-semibold rounded-lg hover:bg-[#E2C878] transition-all duration-300 hover:shadow-xl hover:shadow-[#C8A94E]/20 hover:-translate-y-0.5"
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
                className="group inline-flex items-center gap-2 px-8 py-4 border border-[#C8A94E]/30 text-[#C8A94E] font-semibold rounded-lg hover:bg-[#C8A94E]/10 hover:border-[#C8A94E]/50 transition-all duration-300 hover:-translate-y-0.5"
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
                className="group inline-flex items-center gap-2 px-8 py-4 border border-[#1E293B] text-[#94A3B8] font-semibold rounded-lg hover:bg-[#1E293B]/50 hover:text-[#F1F5F9] hover:border-[#334155] transition-all duration-300 hover:-translate-y-0.5"
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
            <ProfileAvatar />
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
          <span className="text-xs text-[#64748B] uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ArrowDown size={16} className="text-[#64748B]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
