import React, { useState } from 'react';
import { testimonials } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Quote, ChevronDown, ChevronUp, Linkedin } from 'lucide-react';

const TestimonialCard = ({ item, index, isVisible }) => (
  <div
    className={`group p-6 md:p-8 rounded-2xl border border-[#1E293B] bg-[#111827]/50 hover:border-[#C8A94E]/20 hover:bg-[#C8A94E]/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C8A94E]/5 flex flex-col ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
    style={{ transitionDelay: `${150 + (index % 4) * 100}ms` }}
  >
    <Quote size={28} className="text-[#C8A94E]/30 mb-4 flex-shrink-0" />
    <p className="text-[#CBD5E1] leading-relaxed text-sm md:text-[0.938rem] italic flex-1">
      &ldquo;{item.text}&rdquo;
    </p>
    <div className="mt-6 pt-5 border-t border-[#1E293B]/80">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[#F1F5F9] font-semibold">{item.name}</p>
          <p className="text-sm text-[#C8A94E]/80 mt-0.5">{item.role}</p>
          <p className="text-xs text-[#64748B] mt-0.5">{item.company}</p>
        </div>
        <Linkedin size={16} className="text-[#64748B] mt-1 flex-shrink-0 opacity-50" />
      </div>
      <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#C8A94E]/10 text-xs text-[#C8A94E] font-medium border border-[#C8A94E]/20">
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
      className="relative py-24 md:py-32 bg-[#0F172A]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(200,169,78,0.04)_0%,_transparent_60%)]" />

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
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#F1F5F9]">
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
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#C8A94E]/30 text-[#C8A94E] font-medium rounded-lg hover:bg-[#C8A94E]/10 hover:border-[#C8A94E]/50 transition-all duration-300"
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
