import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "What is Karim Chaouki's expertise?",
    answer: "Karim Chaouki specializes in HCM and ERP software implementation, with deep expertise in ADP Workforce Now, cross-border US/Canada payroll systems, and enterprise transformation projects. He holds PMP, RMP, and Scrum Master certifications and has successfully delivered 50+ enterprise implementations with 100% on-time delivery."
  },
  {
    question: "What certifications does Karim hold?",
    answer: "Karim holds four key professional certifications: Project Management Professional (PMP) from the Project Management Institute, Risk Management Professional (RMP) from PMI, Certified Scrum Master (CSM) from the Scrum Alliance, and Financial Intelligence Specialist (FIS) from the ManchesterCF Institute."
  },
  {
    question: "What industries has Karim worked in?",
    answer: "Karim has extensive experience across multiple industries including HCM/HRIS software implementation at ADP's Center of Excellence, financial services and banking compliance at Laurentian Bank, and international banking operations at Société Générale. He has led cross-border implementations for enterprise clients across Canada and the United States."
  },
  {
    question: "What are Karim's key achievements?",
    answer: "Karim has achieved remarkable results throughout his career: 100% on-time project delivery rate, 95% client retention, 20% improvement in client satisfaction scores, 30% reduction in setup errors, and has mentored 15+ implementation consultants. He was recognized as Employee of the Year at Société Générale for achieving 300% of acquisition targets."
  },
  {
    question: "What languages does Karim speak?",
    answer: "Karim is trilingual, fluent in English and French, with Arabic as his native language. This multilingual capability enables him to work effectively with diverse international teams, clients, and stakeholders across different regions and cultures."
  },
  {
    question: "How can I contact Karim for consulting or collaboration?",
    answer: "You can reach Karim via email at karim.chaouki@gmail.com or connect with him on LinkedIn at linkedin.com/in/karimchaouki. He is open to consulting partnerships, cross-functional collaborations, and knowledge-sharing opportunities with fellow HCM and project management professionals."
  }
];

const FAQItem = ({ item, index, isOpen, toggle, isVisible }) => (
  <div
    className={`border border-[#E2E8F0] rounded-xl overflow-hidden transition-all duration-500 hover:border-[#2B6CB0]/30 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
    style={{ transitionDelay: `${150 + index * 80}ms` }}
  >
    <button
      onClick={toggle}
      className="w-full px-6 py-5 flex items-center justify-between gap-4 bg-white/50 hover:bg-[#2B6CB0]/5 transition-colors duration-300 text-left"
      aria-expanded={isOpen}
    >
      <span className="text-[#1A202C] font-semibold pr-4">{item.question}</span>
      <ChevronDown
        size={20}
        className={`text-[#2B6CB0] flex-shrink-0 transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96' : 'max-h-0'
      }`}
    >
      <div className="px-6 py-5 bg-[#2B6CB0]/5 border-t border-[#E2E8F0]">
        <p className="text-[#64748B] leading-relaxed">{item.answer}</p>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [ref, isVisible] = useScrollReveal();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-[#F0F4F8]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(43,108,176,0.03)_0%,_transparent_60%)]" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#2B6CB0]/10 flex items-center justify-center mb-6">
            <HelpCircle size={28} className="text-[#2B6CB0]" />
          </div>
          <span className="text-[#2B6CB0] text-sm font-semibold uppercase tracking-[0.2em]">
            Common Questions
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A202C]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[#94A3B8]">
            Learn more about my expertise, background, and how I can help with your HCM and ERP transformation projects.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="mt-12 space-y-4">
          {faqData.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
