
import React from 'react';
import { ArrowUpRightIcon } from './Icons';

interface CaptureBeautySectionProps {
  onBookingClick?: () => void;
}

const CaptureBeautySection: React.FC<CaptureBeautySectionProps> = ({ onBookingClick }) => {
  return (
    <section className="relative w-full h-[700px] md:h-[650px] overflow-hidden group">

  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      loading="lazy"
      src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop"
      alt="Travel Background"
      className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-[4000ms] ease-out"
    />

    {/* Premium Dark Gradient Overlay */}
    <div className="absolute  bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
  </div>

  {/* Content */}
  <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">

    {/* Small Luxury Tag */}
    <div className="mb-6 backdrop-blur-md bg-white/10 border border-white/20 px-6 py-2 rounded-full text-white text-xs tracking-[3px] uppercase font-semibold">
      Luxury Travel Experiences
    </div>

    {/* Main Heading */}
    <h1 className="text-white font-serif font-bold text-5xl md:text-7xl lg:text-[80px] leading-tight tracking-tight max-w-4xl">
      Discover the World <br />
      <span className="text-brand-gold">Beyond Limits</span>
    </h1>

    {/* Sub Text */}
    <p className="mt-6 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed font-medium">
      Exclusive international and domestic travel packages crafted for unforgettable journeys, seamless planning, and premium comfort.
    </p>

    {/* CTA Buttons */}
    <div className="mt-10 flex flex-col md:flex-row gap-5">

      {/* Primary Button */}
      <button
        onClick={onBookingClick}
        className="relative overflow-hidden bg-brand-gold text-white px-10 py-5 rounded-full font-bold uppercase tracking-wider shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-gold/40"
      >
        <span className="relative z-10 flex items-center gap-2">
          Book Your Trip
          <ArrowUpRightIcon className="w-4 h-4" />
        </span>

        {/* Shine Effect */}
        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-0 transition-transform duration-700"></span>
      </button>

      {/* Secondary Button */}
      {/* <button className="border border-white/40 text-white px-10 py-5 rounded-full font-semibold uppercase tracking-wider backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300">
        View Packages
      </button> */}

    </div>

  </div>

  {/* Elegant Bottom Fade */}
  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent"></div>

</section>
  );
};

export default CaptureBeautySection;
