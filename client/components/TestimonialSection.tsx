
import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Rudra Ghosh",
    role: "Founder & CEO Dulalix",
    rating: "4.9",
    content: "We get absolutely raving reviews from our sales and customer support teams using close. Even our co- founders are very happy. We get absolutely raving reviews from ourEven our co- founders are veryhappy for services"
  },
  {
    id: 2,
    name: "Elena Richardson",
    role: "Marketing Director",
    rating: "5.0",
    content: "The level of professionalism and attention to detail from this team is unmatched. Our recent trip to the UAE was executed perfectly. We get absolutely raving reviews from our entire executive team."
  },
  {
    id: 3,
    name: "Siddharth Verma",
    role: "Travel Blogger",
    rating: "4.8",
    content: "I've worked with many agencies, but Dream Destinas stands out. Their knowledge of local UAE hidden gems made our content creation trip truly special. Highly recommended for premium travel."
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Corporate Client",
    rating: "4.9",
    content: "Managing a group of 50 for a corporate retreat is no easy task. They handled the logistics with such grace and precision that we didn't have to worry about a single detail. Exceptional service."
  },
  {
    id: 5,
    name: "Marcus Thorne",
    role: "Luxury Traveler",
    rating: "5.0",
    content: "The Burj Khalifa private dining experience they arranged was the highlight of our year. It's rare to find a service that consistently exceeds expectations like they do. Truly a world-class team."
  }
];

// Double the testimonials for seamless infinite looping
const extendedTestimonials = [...testimonials, ...testimonials];

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0], className?: string }> = ({ testimonial, className }) => {
  return (
    <div className={`bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-brand-dark/5 flex flex-col gap-6 relative group h-[420px] shrink-0 w-[300px] sm:w-[340px] md:w-[380px] ${className}`}>
      {/* Brand Logo - Matching Reference */}
      <div className="flex items-center gap-1.5">
        <span className="text-3xl font-black text-[#0F2454] tracking-tight leading-none">gidimo</span>
        <div className="w-2 h-2 bg-brand-gold rounded-full mt-2.5"></div>
      </div>

      {/* Quote Content */}
      <p className="text-[#64718C] text-base md:text-lg leading-relaxed font-medium">
        "{testimonial.content}"
      </p>

      {/* Divider & Footer */}
      <div className="flex flex-col gap-6 mt-auto">
        <div className="w-full h-px bg-gray-100"></div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[#0F2454] font-bold text-lg leading-tight">{testimonial.name}</h4>
            <p className="text-[#8E95A5] text-[9px] font-bold uppercase tracking-[0.2em] mt-1">{testimonial.role}</p>
          </div>
          
          {/* Rating Pill - Matching Reference */}
          <div className="bg-[#FFF8ED] text-[#0F2454] flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-brand-gold/20 shrink-0 shadow-sm">
             <span className="font-bold text-xs">{testimonial.rating}</span>
             <svg className="w-3.5 h-3.5 text-brand-gold fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalOriginal = testimonials.length;

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // Logic to handle infinite loop jump
  useEffect(() => {
    if (currentIndex === totalOriginal) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); // Wait for transition to complete
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, totalOriginal]);

  return (
    <section className="relative w-full global-page-container bg-brand-dark overflow-hidden">
      {/* Background Image Overlay - Matching Reference (Sydney Opera House) */}
      <div className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none">
        <img
          loading="lazy"
          src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop"
          alt="Sydney City Skyline"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="max-w-screen-2xl mx-auto global-page-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-8">
          
          {/* Left Content - Fixed */}
          <div className="w-full lg:w-[35%] text-left shrink-0 animate-fade-in-down">
            <p className="font-cursive text-brand-gold text-3xl md:text-[30px] mb-6">
              client’s testimonial
            </p>
            <h2 className="text-white text-5xl md:text-7xl lg:text-[84px] font-serif font-bold mb-8 leading-[1.1] tracking-tight">
              Client’s <br className="hidden lg:block"/> testimonial
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md font-medium">
              communication and utilizes cutting edge logistic planning to get your shipment completed on time. itself founded of backgrounds, which simply.
            </p>
          </div>

          {/* Right Cards - Carousel Area */}
          <div className="w-full lg:w-[65%] relative overflow-hidden group">
            <div 
              className={`flex gap-6 sm:gap-8 transition-transform duration-500 ease-in-out ${!isTransitioning ? 'transition-none' : ''}`}
              style={{ 
                transform: `translateX(-${currentIndex * (window.innerWidth < 640 ? 324 : window.innerWidth < 768 ? 372 : 412)}px)` 
              }}
            >
              {extendedTestimonials.map((testimonial, idx) => (
                <TestimonialCard 
                  key={`${testimonial.id}-${idx}`} 
                  testimonial={testimonial}
                />
              ))}
            </div>

            {/* Gradient Edge Masks for depth */}
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none z-20 hidden lg:block"></div>
          </div>

        </div>
      </div>

      {/* Decorative Plane Icon */}
      <div className="absolute left-[-2%] bottom-[10%] opacity-5 pointer-events-none hidden lg:block transform scale-x-[-1] rotate-[15deg]">
        <svg className="w-80 h-80 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" />
        </svg>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
