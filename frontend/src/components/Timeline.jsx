import React from 'react';
import { experience } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { MapPin, ChevronRight } from 'lucide-react';

const TimelineEntry = ({ item, index, isLast }) => {
  const [ref, isVisible] = useScrollReveal(0.15);
  const isLeft = index % 2 === 0;

  const cardContent = (
    <div className="p-7 rounded-2xl border border-[#E2E8F0] bg-white/50 hover:border-[#2B6CB0]/20 transition-all duration-500 hover:shadow-xl hover:shadow-[#2B6CB0]/5">
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={14} className="text-[#94A3B8]" />
        <span className="text-sm text-[#94A3B8]">{item.location}</span>
      </div>
      <span className="inline-block px-3 py-1 rounded-full bg-[#2B6CB0]/10 text-[#2B6CB0] text-xs font-semibold mb-3">
        {item.period}
      </span>
      <h3 className="text-xl font-bold text-[#1A202C]">{item.role}</h3>
      <p className="text-[#2B6CB0]/80 font-medium mt-1">
        {item.company} &middot; {item.subtitle}
      </p>
      <ul className="mt-4 space-y-2">
        {item.achievements.map((a, j) => (
          <li key={j} className="flex items-start gap-2 text-sm text-[#94A3B8]">
            <ChevronRight
              size={14}
              className="text-[#2B6CB0]/50 mt-0.5 flex-shrink-0"
            />
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div ref={ref} className="relative">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_80px_1fr] items-start">
        {/* Left Content */}
        <div className={isLeft ? 'pr-4' : ''}>
          {isLeft ? (
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {cardContent}
            </div>
          ) : (
            <div />
          )}
        </div>

        {/* Center Line + Dot */}
        <div className="flex flex-col items-center">
          <div
            className={`w-4 h-4 rounded-full border-2 border-[#2B6CB0] bg-[#F0F4F8] z-10 transition-all duration-500 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          />
          {!isLast && (
            <div
              className={`w-[2px] flex-1 min-h-[40px] bg-gradient-to-b from-[#2B6CB0]/30 to-[#1E293B] transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>

        {/* Right Content */}
        <div className={!isLeft ? 'pl-4' : ''}>
          {!isLeft ? (
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {cardContent}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex gap-4">
        <div className="flex flex-col items-center">
          <div
            className={`w-3 h-3 rounded-full border-2 border-[#2B6CB0] bg-[#F0F4F8] z-10 mt-2 transition-all duration-500 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          />
          {!isLast && (
            <div className="w-[2px] flex-1 bg-gradient-to-b from-[#2B6CB0]/30 to-[#1E293B]" />
          )}
        </div>
        <div
          className={`flex-1 pb-8 transition-all duration-500 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          {cardContent}
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="experience" className="relative py-24 md:py-32 bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(43,108,176,0.04)_0%,_transparent_60%)]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[#2B6CB0] text-sm font-semibold uppercase tracking-[0.2em]">
            Career Journey
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A202C]">
            Professional Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {experience.map((item, i) => (
            <TimelineEntry
              key={i}
              item={item}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
