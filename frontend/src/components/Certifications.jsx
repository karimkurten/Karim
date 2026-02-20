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
      className="relative py-24 md:py-32 bg-[#0B1120]"
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
          <span className="text-[#C8A94E] text-sm font-semibold uppercase tracking-[0.2em]">
            Credentials
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#F1F5F9]">
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
                className={`group relative p-6 rounded-2xl border border-[#1E293B] bg-[#111827]/50 hover:border-[#C8A94E]/30 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C8A94E]/5 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#C8A94E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C8A94E]/20 group-hover:scale-110 transition-all duration-300">
                  <Icon size={28} className="text-[#C8A94E]" />
                </div>
                <div className="text-2xl font-bold text-[#C8A94E] font-serif mb-1">
                  {cert.name}
                </div>
                <h3 className="text-sm font-semibold text-[#F1F5F9] mb-1">
                  {cert.fullName}
                </h3>
                <p className="text-xs text-[#64748B]">{cert.org}</p>
                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-[#C8A94E]/10 text-xs text-[#C8A94E] font-medium border border-[#C8A94E]/20">
                  {cert.year}
                </div>
              </div>
            );
          })}
        </div>

        {/* Education */}
        <div className="mt-16">
          <h3
            className={`text-xl font-serif font-bold text-[#F1F5F9] mb-6 flex items-center gap-3 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <GraduationCap size={24} className="text-[#C8A94E]" />
            Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {education.map((edu, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border border-[#1E293B] bg-[#111827]/30 hover:border-[#C8A94E]/20 hover:bg-[#C8A94E]/5 transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + i * 100}ms` }}
              >
                <h4 className="text-[#F1F5F9] font-semibold">{edu.degree}</h4>
                <p className="text-sm text-[#C8A94E]/80 mt-1">{edu.school}</p>
                <p className="text-xs text-[#64748B] mt-1">
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
