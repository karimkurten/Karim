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
