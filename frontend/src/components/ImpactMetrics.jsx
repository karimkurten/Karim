import React from 'react';
import { metrics, personalInfo } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Handshake } from 'lucide-react';

const MetricCard = ({ item, index, isVisible }) => {
  return (
    <div
      className={`group p-6 rounded-2xl border border-[#1E293B] bg-[#111827]/50 text-center hover:border-[#C8A94E]/30 hover:bg-[#C8A94E]/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C8A94E]/5 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${150 + index * 80}ms` }}
    >
      <div className="text-3xl md:text-4xl font-bold text-[#C8A94E] font-serif">
        {item.value}
      </div>
      <div className="mt-2 text-sm text-[#94A3B8] uppercase tracking-wider">
        {item.label}
      </div>
    </div>
  );
};

const ImpactMetrics = () => {
  const [ref, isVisible] = useScrollReveal();
  const [collabRef, collabVisible] = useScrollReveal();

  return (
    <>
      {/* Impact Metrics Section */}
      <section id="impact" className="relative py-24 md:py-32 bg-[#0F172A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(200,169,78,0.05)_0%,_transparent_60%)]" />

        <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-[#C8A94E] text-sm font-semibold uppercase tracking-[0.2em]">
              Results That Matter
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#F1F5F9]">
              Impact Wall
            </h2>
            <p className="mt-4 text-[#94A3B8]">
              Measurable outcomes from enterprise implementations and team
              leadership.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5">
            {metrics.map((item, i) => (
              <MetricCard
                key={i}
                item={item}
                index={i}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="relative py-24 md:py-32 bg-[#0B1120]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,169,78,0.03)_0%,_transparent_50%)]" />
        <div
          ref={collabRef}
          className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <div
            className={`transition-all duration-700 ${
              collabVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#C8A94E]/10 flex items-center justify-center mb-6">
              <Handshake size={32} className="text-[#C8A94E]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#F1F5F9]">
              Let's Collaborate
            </h2>
            <p className="mt-6 text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
              Open to consulting partnerships, cross-functional collaborations,
              and knowledge-sharing with fellow HCM and project management
              professionals.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C8A94E] text-[#0B1120] font-semibold rounded-lg hover:bg-[#E2C878] transition-all duration-300 hover:shadow-xl hover:shadow-[#C8A94E]/20 hover:-translate-y-0.5"
              >
                Start a Conversation
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#C8A94E]/30 text-[#C8A94E] font-semibold rounded-lg hover:bg-[#C8A94E]/10 hover:border-[#C8A94E]/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImpactMetrics;
