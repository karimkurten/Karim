import React from 'react';
import { expertise } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Users,
  Calculator,
  Zap,
  ShieldAlert,
  MessageSquare,
  Landmark,
  Database,
  GraduationCap,
} from 'lucide-react';

const iconMap = {
  users: Users,
  calculator: Calculator,
  zap: Zap,
  shieldAlert: ShieldAlert,
  messageSquare: MessageSquare,
  landmark: Landmark,
  database: Database,
  graduationCap: GraduationCap,
};

const Expertise = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="expertise" className="relative py-24 md:py-32 bg-[#0B1120]">
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
            Core Expertise
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#F1F5F9]">
            Skills & Capabilities
          </h2>
          <p className="mt-4 text-[#94A3B8]">
            A comprehensive skill set spanning HCM technology, project
            management, and organizational leadership.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {expertise.map((skill, i) => {
            const Icon = iconMap[skill.icon];
            return (
              <div
                key={i}
                className={`group relative p-6 rounded-2xl border border-[#1E293B] bg-[#111827]/40 hover:border-[#C8A94E]/30 hover:bg-[#C8A94E]/5 transition-all duration-500 hover:-translate-y-1 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-lg bg-[#C8A94E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C8A94E]/20 transition-colors duration-300">
                  <Icon size={20} className="text-[#C8A94E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#F1F5F9] mb-3">
                  {skill.name}
                </h3>
                <ul className="space-y-1.5">
                  {skill.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-sm text-[#94A3B8] flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C8A94E]/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
