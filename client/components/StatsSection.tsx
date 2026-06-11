
import React from 'react';

const stats = [
  { number: '145', label: 'Travel Tales' },
  { number: '74', label: 'Journey Bound' },
  { number: '134', label: 'Miles Away' },
  { number: '85', label: 'Escape Route' },
];

const StatsSection: React.FC = () => {
  return (
    <section className="bg-brand-bg global-page-container ">
      <div className="max-w-screen-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative flex items-center justify-center h-40">
              {/* Background Large Number */}
              <span className="absolute inset-0 flex items-center justify-center text-[100px] md:text-[140px] font-serif font-bold text-[#EDE2D5]/70 pointer-events-none select-none">
                {stat.number}
              </span>
              
              {/* Foreground Label */}
              <h3 className="relative z-10 text-xl md:text-2xl font-bold text-brand-dark text-center">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
