import React from 'react';
import { personalInfo, stats } from '../data/mockData';
import { useScrollReveal, useCounter } from '../hooks/useScrollReveal';
import {
  ArrowRight,
  Download,
  ArrowDown,
  Linkedin,
  Mail,
  CheckCircle2,
} from 'lucide-react';

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

const Hero = () => {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Light background */}
      <div className="absolute inset-0 bg-[#F0F4F8]">
        {/* Corporate skyline background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/373965/pexels-photo-373965.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            opacity: 0.06,
            filter: 'grayscale(100%) brightness(1.2)',
          }}
        />
        {/* Subtle grid pattern for PM feel */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#2B6CB0 1px, transparent 1px), linear-gradient(90deg, #2B6CB0 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4F8] via-transparent to-[#E8EDF2]" />
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          {/* Left Content */}
          <div
            className={`flex-1 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2B6CB0]/10 border border-[#2B6CB0]/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-[#2B6CB0] font-semibold">
                Available for New Opportunities
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-[#1A202C] leading-[1.05]">
              Karim Chaouki,
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2B6CB0] mt-2">
              MBA, PMP, RMP, CSM
            </h2>

            {/* Role */}
            <p className="mt-5 text-lg md:text-xl text-[#64748B] leading-relaxed">
              Senior HCM Implementation Manager | ADP Workforce Now Expert
            </p>

            {/* Quote with left border */}
            <div className="mt-6 pl-5 border-l-4 border-[#2B6CB0]">
              <p className="text-[#475569] text-base md:text-lg leading-relaxed italic">
                Delivering enterprise HCM transformations with a{' '}
                <strong className="text-[#1A202C] not-italic">
                  100% on-time delivery record.
                </strong>
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#experience')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#2B6CB0] text-white font-semibold rounded-lg hover:bg-[#2563EB] transition-all duration-300 hover:shadow-lg hover:shadow-[#2B6CB0]/20 hover:-translate-y-0.5"
              >
                View My Work
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
              <a
                href={personalInfo.resumeUrl}
                download="Karim_Chaouki_Resume.pdf"
                className="group inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#CBD5E1] text-[#1A202C] font-semibold rounded-lg hover:border-[#2B6CB0] hover:text-[#2B6CB0] bg-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Download Resume
                <Download
                  size={18}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#2B6CB0] hover:border-[#2B6CB0]/30 transition-all duration-300 shadow-sm"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#2B6CB0] hover:border-[#2B6CB0]/30 transition-all duration-300 shadow-sm"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right - Photo with badge */}
          <div
            className={`flex-shrink-0 flex flex-col items-center transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative">
              {/* Oval photo */}
              <div className="w-56 h-64 md:w-64 md:h-72 lg:w-72 lg:h-80 rounded-[50%] border-4 border-white overflow-hidden shadow-2xl shadow-[#2B6CB0]/10">
                <img
                  src="/images/karim-chaouki.jpg"
                  alt="Karim Chaouki"
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
              </div>

              {/* Success Rate Badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-5 py-3 bg-white rounded-xl shadow-lg shadow-black/10 border border-[#E2E8F0] flex items-center gap-3 whitespace-nowrap">
                <CheckCircle2 size={22} className="text-emerald-500" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-semibold">
                    Success Rate
                  </p>
                  <p className="text-sm font-bold text-[#1A202C]">
                    100% On-Time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`mt-24 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 transition-all duration-1000 delay-300 ${
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-[#94A3B8] uppercase tracking-[0.2em]">
            Scroll
          </span>
          <div className="w-[2px] h-8 bg-gradient-to-b from-[#2B6CB0]/40 to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
