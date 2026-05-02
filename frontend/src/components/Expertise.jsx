import React from 'react';
import { expertise } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { use3DTilt } from '../hooks/use3DTilt';
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

const SkillCard = ({ skill, index, isVisible }) => {
  const { ref, style, handleMouseMove, handleMouseLeave } = use3DTilt(6);
  const Icon = iconMap[skill.icon];
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`group card-3d relative p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#2B6CB0]/30 hover:shadow-lg hover:shadow-[#2B6CB0]/5 transition-shadow duration-500 overflow-hidden ${
        isVisible ? 'animate-reveal-3d-up' : 'opacity-0'
      }`}
    >
      <div className="card-3d-shine absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-[#2B6CB0]/[0.03] to-transparent" />
      <div className="relative z-10">
        <div className="w-11 h-11 rounded-lg bg-[#2B6CB0]/10 flex items-center justify-center mb-4 group-hover:bg-[#2B6CB0]/20 transition-colors duration-300">
          <Icon size={20} className="text-[#2B6CB0]" />
        </div>
        <h3 className="text-lg font-semibold text-[#1A202C] mb-3">
          {skill.name}
        </h3>
        <ul className="space-y-1.5">
          {skill.items.map((item, j) => (
            <li key={j} className="text-sm text-[#64748B] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#2B6CB0]/50 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Expertise = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="expertise" className="relative py-24 md:py-32 bg-[#F0F4F8]">
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
            Core Expertise
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A202C]">
            Skills & Capabilities
          </h2>
          <p className="mt-4 text-[#94A3B8]">
            A comprehensive skill set spanning HCM technology, project
            management, and organizational leadership.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 perspective-container">
          {expertise.map((skill, i) => (
            <SkillCard key={i} skill={skill} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
