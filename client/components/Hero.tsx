
import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { ArrowUpRightIcon } from './Icons';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Compass, ArrowRight, ChevronRight, Globe, Star, Menu, X, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../lib/utils';


interface HeroProps {
  onContactClick?: () => void;
  onSearch?: (query: string) => void;
}


const SLIDER_DATA = [
  {
    image: "public/images/plane-travel-concept-hand-holding-passports-with-plane-paris-france-cityscape-background.jpg",
    title: "Explore Beyond Boundaries.",
    description: "Welcome to our Vitour website! We are a professional and reliable tours company that offers a wide range of are many variations of passages."
  },
  {
    image: "public/images/architecture-ancient-monument-world-heritage-day-celebration.jpg",
    title: "Your Journey Starts Here.",
    description: "Journey through time and discover hidden gems tucked away in the most remote corners of the globe."
  },
  {
    image: "public/images/hotel-rooftop-pool-with-infinity-edge-overlooking-city-skyline.jpg",
    title: "Experience Nature's Purest Wonders.",
    description: "From emerald forests to crystal clear lakes, immerse yourself in the breathtaking beauty of the natural world."
  },

];

const Hero: React.FC<HeroProps> = ({ onContactClick, onSearch }) => {

  const [imgError, setImgError] = useState(false);
  // High-impact travel imagery: A stunning vista of a premium destination
  const heroImage = "https://globalconnectworldtravel.com/img/banner.jpg";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDER_DATA.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDER_DATA.length) % SLIDER_DATA.length);

  return (

    <>


      <header className="relative  flex flex-col items-center justify-center  ">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentSlide}
              src={SLIDER_DATA[currentSlide].image}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
              alt={`Slide ${currentSlide + 1}`}
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute  z-10" />
        </div>

        <div className="relative z-20 w-full h-[600px] max-w-7xl mx-auto px-6 flex flex-col items-start justify-center text-left ">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl ]"
            >
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-[40px] lg:text-[70px] text-white font-bold leading-[1.1] tracking-tight "
              >
                {SLIDER_DATA[currentSlide].title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}<br /></React.Fragment>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white text-lg md:text-xl max-w-xl leading-relaxed font-medium global-page-container"
              >
                {SLIDER_DATA[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-6 w-full"
              >

              </motion.div>

              {/* Slider Indicators */}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Search Bar - Aligned with title and description, overlapping the bottom edge */}
        <div className="absolute left-0 right-0 translate-y-1/2 z-30 bottom-[20px]">
          <div className="max-w-[1440px] mx-auto px-6 ">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="w-full "
            >
              <SearchBar onSearch={onSearch} />
            </motion.div>
          </div>
        </div>

        {/* Vertical Navigation Pill */}
        <div className="absolute right-8 top-[50%] -translate-y-1/2 z-30 hidden lg:block">
          <div className="glass rounded-full py-8 px-3 flex flex-col items-center gap-6 shadow-2xl border-white/10">
            <button
              onClick={prevSlide}
              className="text-white/60 hover:text-white transition-colors"
            >
              <ArrowUp className="w-5 h-5" />
            </button>

            <div className="flex flex-col gap-4">
              {SLIDER_DATA.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={cn(
                    "w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 relative group",
                    currentSlide === idx
                      ? "border-brand-gold scale-110 shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                      : "border-white/20 hover:border-white/50"
                  )}
                >
                  <img loading="lazy"
                    src={item.image}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {currentSlide !== idx && (
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="text-white/60 hover:text-white transition-colors"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

    </>

  );
};

export default Hero;
