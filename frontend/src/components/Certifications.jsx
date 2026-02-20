import React from 'react';
import { certifications, education } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Award,
  ShieldCheck,
  RefreshCw,
  BookOpen,
  GraduationCap,
} from 'lucide-react';

const iconMap = {
  award: Award,
  shieldCheck: ShieldCheck,
  refreshCw: RefreshCw,
  bookOpen: BookOpen,
};

const Certifications = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      id="certifications"
      className="relative py-24 md:py-32 bg-[#F0F4F8]"
    >
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[#2B6CB0] text-sm font-semibold uppercase tracking-[0.2em]">
            Credentials
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A202C]">
            Certifications & Education
          </h2>
        </div>

        {/* Certification Badges */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, i) => {
            const Icon = iconMap[cert.icon];
            return (
              <div
                key={i}
                className={`group relative p-6 rounded-2xl border border-[#E2E8F0] bg-white/50 hover:border-[#2B6CB0]/30 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2B6CB0]/5 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2B6CB0]/10 flex items-center justify-center mb-4 group-hover:bg-[#2B6CB0]/20 group-hover:scale-110 transition-all duration-300">
                  <Icon size={28} className="text-[#2B6CB0]" />
                </div>
                <div className="text-2xl font-bold text-[#2B6CB0] font-serif mb-1">
                  {cert.name}
                </div>
                <h3 className="text-sm font-semibold text-[#1A202C] mb-1">
                  {cert.fullName}
                </h3>
                <p className="text-xs text-[#94A3B8]">{cert.org}</p>
                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-[#2B6CB0]/10 text-xs text-[#2B6CB0] font-medium border border-[#2B6CB0]/20">
                  {cert.year}
                </div>
              </div>
            );
          })}
        </div>

        {/* Education */}
        <div className="mt-16">
          <h3
            className={`text-xl font-serif font-bold text-[#1A202C] mb-6 flex items-center gap-3 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <GraduationCap size={24} className="text-[#2B6CB0]" />
            Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {education.map((edu, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border border-[#E2E8F0] bg-white/30 hover:border-[#2B6CB0]/20 hover:bg-[#2B6CB0]/5 transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + i * 100}ms` }}
              >
                <h4 className="text-[#1A202C] font-semibold">{edu.degree}</h4>
                <p className="text-sm text-[#2B6CB0]/80 mt-1">{edu.school}</p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {edu.location} &middot; {edu.period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
