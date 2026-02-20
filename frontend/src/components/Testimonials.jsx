import React, { useState } from 'react';
import { testimonials } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Quote, ChevronDown, ChevronUp, Linkedin } from 'lucide-react';

const TestimonialCard = ({ item, index, isVisible }) => (
  <div
    className={`group p-6 md:p-8 rounded-2xl border border-[#E2E8F0] bg-white/50 hover:border-[#2B6CB0]/20 hover:bg-[#2B6CB0]/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2B6CB0]/5 flex flex-col ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
    style={{ transitionDelay: `${150 + (index % 4) * 100}ms` }}
  >
    <Quote size={28} className="text-[#2B6CB0]/30 mb-4 flex-shrink-0" />
    <p className="text-[#475569] leading-relaxed text-sm md:text-[0.938rem] italic flex-1">
      &ldquo;{item.text}&rdquo;
    </p>
    <div className="mt-6 pt-5 border-t border-[#E2E8F0]/80">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[#1A202C] font-semibold">{item.name}</p>
          <p className="text-sm text-[#2B6CB0]/80 mt-0.5">{item.role}</p>
          <p className="text-xs text-[#94A3B8] mt-0.5">{item.company}</p>
        </div>
        <Linkedin size={16} className="text-[#94A3B8] mt-1 flex-shrink-0 opacity-50" />
      </div>
      <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#2B6CB0]/10 text-xs text-[#2B6CB0] font-medium border border-[#2B6CB0]/20">
        {item.relationship}
      </span>
    </div>
  </div>
);

const Testimonials = () => {
  const [ref, isVisible] = useScrollReveal();
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? testimonials : testimonials.slice(0, 4);

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 bg-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(43,108,176,0.04)_0%,_transparent_60%)]" />

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
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A202C]">
            What Colleagues Say
          </h2>
          <p className="mt-4 text-[#94A3B8]">
            Trusted by professionals across enterprise organizations — from ADP
            and Laurentian Bank to international consulting.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayed.map((item, i) => (
            <TestimonialCard
              key={i}
              item={item}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Show More / Less Toggle */}
        {testimonials.length > 4 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#2B6CB0]/30 text-[#2B6CB0] font-medium rounded-lg hover:bg-[#2B6CB0]/10 hover:border-[#2B6CB0]/50 transition-all duration-300"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  View All {testimonials.length} Testimonials{' '}
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
