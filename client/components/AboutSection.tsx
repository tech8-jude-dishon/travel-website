
import React from 'react';
import { ArrowUpRightIcon } from './Icons';

interface AboutSectionProps {
  onExplore?: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onExplore }) => {
  return (
    <section className="max-w-screen-2xl mx-auto global-page-container pt-[200px]">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE - UAE IMAGE */}
        <div className="relative group">
          <img loading="lazy"
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop"
            alt="Dubai Burj Khalifa"
            className="rounded-[3rem] shadow-2xl w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg">
            <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">Our Dubai Presence</span>
          </div>
        </div>

        {/* RIGHT SIDE - INDIA IMAGE */}
        <div className="relative group">
          <img loading="lazy"
            src="public/images/majestic-mausoleum-ancient-god-spiritual-journey-generated-by-ai (1).jpg"
            alt="India Taj Mahal"
            className="rounded-[3rem] shadow-2xl w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg">
            <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">Incredible India</span>
          </div>
        </div>
      </div>
    </section>



  );
};

export default AboutSection;
