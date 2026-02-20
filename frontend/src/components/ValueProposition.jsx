import React from 'react';
import { personalInfo, differentiators } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Globe, Shield, Building2, TrendingUp } from 'lucide-react';

const iconMap = {
  globe: Globe,
  shield: Shield,
  building: Building2,
  trendingUp: TrendingUp,
};

const ValueProposition = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#0F172A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,169,78,0.04)_0%,_transparent_70%)]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`max-w-3xl transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[#C8A94E] text-sm font-semibold uppercase tracking-[0.2em]">
            Why Karim
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#F1F5F9] leading-tight">
            Uniquely Positioned to Deliver
          </h2>
          <p className="mt-6 text-lg text-[#94A3B8] leading-relaxed">
            {personalInfo.summary} Certified PMP, RMP, and Scrum Master —
            bringing structured methodology, risk-aware planning, and agile
            execution to every engagement. Bilingual in English and French with
            deep cross-cultural competency.
          </p>
        </div>

        {/* Differentiator Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={i}
                className={`group p-8 rounded-2xl border border-[#1E293B] bg-[#111827]/50 hover:border-[#C8A94E]/30 hover:bg-[#C8A94E]/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C8A94E]/5 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#C8A94E]/10 flex items-center justify-center mb-5 group-hover:bg-[#C8A94E]/20 transition-colors duration-300">
                  <Icon size={24} className="text-[#C8A94E]" />
                </div>
                <h3 className="text-xl font-semibold text-[#F1F5F9] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#94A3B8] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
