import React, { useState, useEffect, useRef } from 'react';
import { TourCard } from './FactsSection';
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, ArrowRight, ChevronLeft, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LocationIcon } from './Icons';
import { packages } from '../lib/apiClient';

const OFFERS = [
  { id: 1, title: 'INDIA TOURS', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774849144/indiaFrom_compressed_gwvhxb.webp', },
  { id: 2, title: 'DUBAI TOURS', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774848813/dubaiL_compressed_b2g09h.webp', },
  { id: 3, title: 'INDIA LOCAL TOURS', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774855016/trolly_compressed_ewkjjq.webp', },
  { id: 4, title: 'DUBAI LOCAL TOURS', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774854963/jeep_compressed_fulf9o.webp', },
];

const INDIA_DESTINATIONS = [
  {
    name: 'Andaman',
    price: '17,300',
    image: 'https://img.freepik.com/free-photo/beautiful-tropical-beach-sea_74190-6583.jpg?t=st=1772696448~exp=1772700048~hmac=e6bcdb44f062cfbb307890ab604633f14a83b86e277dfa067312089ae40aa986&w=1060',
    tourId: 105
  },
  {
    name: 'Sri lanka',
    price: '34,100',
    image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'North east',
    price: '18,900',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Rajasthan',
    price: '18,000',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Kashmir',
    price: '16,300',
    image: 'https://img.freepik.com/free-photo/beautiful-view-rigi-mountain-range-sunny-winter-day-with-brick-buildings_181624-16950.jpg?t=st=1772696594~exp=1772700194~hmac=04aa72cfe8d3fc7e356a5a905a0c06da4de8ea992703a4677cae456016ae6704&w=1060',
  },
];


const INDIA_DESTINATION_SOUTH = [
  {
    name: 'Munnar',
    price: '17,300',
    image: 'https://img.freepik.com/free-photo/beautiful-tropical-beach-sea_74190-6583.jpg?t=st=1772696448~exp=1772700048~hmac=e6bcdb44f062cfbb307890ab604633f14a83b86e277dfa067312089ae40aa986&w=1060',
    tourId: 105
  },
  {
    name: 'Ooty',
    price: '34,100',
    image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Mysore',
    price: '18,900',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Hampi',
    price: '18,000',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Rameswaram',
    price: '16,300',
    image: 'https://img.freepik.com/free-photo/beautiful-view-rigi-mountain-range-sunny-winter-day-with-brick-buildings_181624-16950.jpg?t=st=1772696594~exp=1772700194~hmac=04aa72cfe8d3fc7e356a5a905a0c06da4de8ea992703a4677cae456016ae6704&w=1060',
  },
];



const BEST_SELLING_PACKAGES = [
  {
    id: 'B01',
    title: 'Andaman',
    price: '49,999',
    image: 'public/images/aerial-view-sandy-beach-with-tourists-swimming-beautiful-clear-sea-water-sumilon-island-beach-landing-near-oslob-cebu-philippines-boost-up-color-processing.jpg',
    tourId: 105
  },
  {
    id: 'B02',
    title: 'Kashmir',
    price: '37,900',
    image: 'public/images/snow-village-shirakawago.jpg',
  },
  {
    id: 'B03',
    title: 'Kerala',
    price: '53,000',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop',
    tourId: 102
  },
  {
    id: 'B04',
    title: 'Sri Lanka',
    price: '34,128',
    image: 'https://img.freepik.com/free-photo/beautiful-tropical-beach-sea_74190-6583.jpg?t=st=1772696448~exp=1772700048~hmac=e6bcdb44f062cfbb307890ab604633f14a83b86e277dfa067312089ae40aa986&w=1060',
  },
  {
    id: 'B05',
    title: 'Andaman',
    price: '49,990',
    image: 'public/images/aerial-view-sandy-beach-with-tourists-swimming-beautiful-clear-sea-water-sumilon-island-beach-landing-near-oslob-cebu-philippines-boost-up-color-processing.jpg',
    tourId: 105
  }
];

const EXPLORE_BY_THEME = [
  {
    title: 'Honeymoon',
    image: 'public/images/snow-village-shirakawago.jpg'
  },
  {
    title: 'Wildlife & Safari',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Short Getaways',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Spiritual Journeys',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Luxury Holidays',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&auto=format&fit=crop'
  }
];

// Static types for fallback or themes (keeping definitions but will use dynamic list for main grid)
const themes = EXPLORE_BY_THEME;

interface PackagesPageProps {
  onBack: () => void;
  onExplore: (tour: any) => void;
  onBookClick?: () => void;
}

const PackagesPage: React.FC<PackagesPageProps> = ({ onBack, onExplore, onBookClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDestination, setActiveDestination] = useState(0);
  const [activeDestinationSouth, setActiveDestinationSouth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPausedSouth, setIsPausedSouth] = useState(false);
  const [packagesList, setPackagesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchDynamicPackages = async () => {
      setIsLoading(true);
      try {
        const data = await packages.getAll();

        // Map image_url to image for compatibility with existing UI
        const mappedData = data.map((pkg: any) => ({
          ...pkg,
          image: pkg.image_url, // For compatibility
          description: pkg.overview // For compatibility
        }));

        setPackagesList(mappedData);
      } catch (err) {
        console.error('Error fetching packages:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDynamicPackages();
  }, []);

  // Filter packages based on search query
  const filteredPackages = packagesList.filter(pkg =>
    (pkg.title || '').toLowerCase().includes(searchQuery) ||
    (pkg.location || '').toLowerCase().includes(searchQuery) ||
    (pkg.description || '').toLowerCase().includes(searchQuery)
  );



  // Autoplay Effect
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveDestination((prev) => (prev + 1) % INDIA_DESTINATIONS.length);
    }, 4000); // 4 seconds interval

    return () => clearInterval(timer);
  }, [isPaused]);

  // Autoplay Effect for South India
  React.useEffect(() => {
    if (isPausedSouth) return;

    const timer = setInterval(() => {
      setActiveDestinationSouth((prev) => (prev + 1) % INDIA_DESTINATION_SOUTH.length);
    }, 4000); // 4 seconds interval

    return () => clearInterval(timer);
  }, [isPausedSouth]);

  const handleBookNow = (pkg: any) => {
    onExplore(pkg);
  };

  const bestSellingRef = useRef<HTMLDivElement>(null);
  const [bestSellingPaused, setBestSellingPaused] = useState(false);

  const bestSellingScroll = (direction: 'left' | 'right') => {
    if (bestSellingRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = bestSellingRef.current;
      const scrollAmount = clientWidth / (window.innerWidth < 1024 ? 1 : 4);

      let nextScrollPosition;
      if (direction === 'right') {
        nextScrollPosition = scrollLeft + scrollAmount;
        if (nextScrollPosition >= scrollWidth - clientWidth) {
          nextScrollPosition = 0;
        }
      } else {
        nextScrollPosition = scrollLeft - scrollAmount;
        if (nextScrollPosition < 0) {
          nextScrollPosition = scrollWidth - clientWidth;
        }
      }

      bestSellingRef.current.scrollTo({ left: nextScrollPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const autoplay = setInterval(() => {
      if (!bestSellingPaused) {
        bestSellingScroll('right');
      }
    }, 4000);
    return () => clearInterval(autoplay);
  }, [bestSellingPaused]);

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Header */}
      <section className=" w-full flex items-center overflow-hidden bg-white px-6 md:px-14 ">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-10 items-stretch relative z-10 ">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-5 justify-center items-center lg:items-start">
              <h1 className="text-3xl md:text-[56px] text-center lg:text-left font-sans font-black text-slate-600 leading-[1.1] tracking-wide mt-[50px] lg:mt-0">
                Book Your <span className="text-[#2CB8E5]">Special</span><br />
                <span className="text-[#2CB8E5]">Packages Today</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-lg leading-relaxed text-center lg:text-left">
                Curated journeys designed for those who seek the extraordinary. Explore our exclusive travel packages tailored to your desires.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onBookClick}
                  className="flex items-center gap-2 px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all group">
                  Book Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                {/* <button className="px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all">
                  Explore More
                </button> */}
              </div>
            </div>

            <div className="lg:mt-[20px] mt-[25px]">
              <img loading="lazy" src="https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774849758/PACKAGES_compressed_swpdxx.webp" alt="" className="" />
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="lg:w-[600px] lg:h-[492px] w-full h-[300px]  lg:bg-center lg:bg-right bg-center "
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774848164/dubaibanner_compressed_vrqn5r.webp')",
              backgroundSize: "contain",
              // backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </section>

      {/* Main Content Area */}
      {searchQuery ? (
        <div className="max-w-screen-2xl mx-auto px-6 md:px-14 py-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="text-4xl md:text-[38px] font-sans font-black text-slate-900">
              Search Results for <span className="text-[#00A9D7]">"{searchQuery}"</span>
            </div>
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{filteredPackages.length} Packages</span>
          </div>

          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handleBookNow(pkg)}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer border border-slate-50"
                >
                  <div className="relative h-[200px]">
                    <img loading="lazy" src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                      <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="text-xs font-bold text-slate-700">{(pkg as any).rating || "4.8"}</span>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-1 flex flex-col flex-grow text-left">
                    <div className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                      {pkg.title}
                    </div>
                    <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                        {pkg.duration.match(/(\d+)\s*days?/i) ? `${pkg.duration.match(/(\d+)\s*days?/i)?.[1]} DAYS` : pkg.duration.toUpperCase()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                        {(pkg as any).guest_capacity || (pkg as any).guest || "2-4 GUESTS"}
                      </div>
                    </div>
                    <div className="flex items-end justify-center mt-auto">
                      <div className="flex flex-col hidden">
                        <span className="text-[11px] text-slate-400">Starting from</span>
                        <span className="text-lg font-bold text-[#1B6B93]">
                          {pkg.price ? (pkg.price.toString().startsWith('$') || pkg.price.toString().startsWith('₹') ? pkg.price : `$${pkg.price}`) : '$0'}
                        </span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleBookNow(pkg) }}
                        className="bg-[#1B6B93] text-white px-[23px] py-[8px] rounded-full text-sm font-semibold"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
              <div className="text-6xl mb-6">🔍</div>
              <div className="text-2xl font-bold text-slate-900 mb-2">No packages found</div>
              <p className="text-slate-500">Try adjusting your search terms to find what you're looking for.</p>
              <button
                onClick={() => navigate('/packages')}
                className="mt-8 px-8 py-3 bg-[#00A9D7] text-white rounded-full font-bold text-sm hover:bg-[#008db3] transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Dream Destination Section */}
          <section className="relative overflow-hidden py-4 bg-white">
            <div className="max-w-[1440px] mx-auto relative z-10 px-6 md:px-14">
              <div className="text-left lg:mb-12 mb-4">
                <h2 className="text-3xl md:text-[38px] font-sans font-black text-slate-900 leading-tight text-center lg:text-left">
                  Choose Your <br /> <span className="text-[#00A9D7]">Dream Destination</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {OFFERS.map((offer) => (
                  <div
                    key={offer.id}
                    className="relative rounded-3xl overflow-hidden p-6 h-[180px] bg-no-repeat bg-right-bottom lg:bg-cover bg-cover shadow-sm border border-slate-100"
                    style={{ backgroundImage: `url(${offer.image})` }}
                  >
                    <div className="text-white font-bold text-[20px] leading-tight">
                      {offer.title.split(' ').slice(0, -1).join(' ')}<br />
                      {offer.title.split(' ').slice(-1)}
                    </div>
                    <button onClick={() => {
                      if (offer.title.includes('INDIA')) {
                        navigate('/india-tours');
                      } else if (offer.title.includes('DUBAI')) {
                        navigate('/dubai-tours');
                      }
                    }} className="absolute bottom-6 left-6 text-xs border border-white bg-white text-[#00A9D7] px-[20px] py-[10px] rounded-full  transition-colors">
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Packages Grid Section */}
          <div className="max-w-screen-2xl mx-auto px-6 py-4">
            <div
              className="w-full h-[360px] mx-auto relative flex flex-col items-center justify-start lg:pt-24 pb-20 overflow-visible lg:mt-12 rounded-[40px] p-cards"
              style={{
                backgroundImage: "url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774846701/bannerfive_compressed_zvo9gv.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="text-black lg:text-white lg:text-[38px] text-3xl font-bold text-center lg:mb-12">Trending Travel Hotspots</div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative w-full px-6 md:px-14 pt-[30px]">
                {isLoading ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-sm rounded-[32px] shadow-xl border border-white/20">
                    <div className="w-12 h-12 border-4 border-[#00A9D7] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-600 font-bold uppercase tracking-widest text-sm">Loading Amazing Packages...</p>
                  </div>
                ) : packagesList.length > 0 ? (
                  packagesList.slice(0, 4).map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => handleBookNow(pkg)}
                      className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer border border-slate-50"
                    >
                      <div className="relative h-[200px]">
                        <img loading="lazy" src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                          <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          <span className="text-xs font-bold text-slate-700">{(pkg as any).rating || "4.8"}</span>
                        </div>
                      </div>
                      <div className="p-[18px]  flex flex-col flex-grow text-left">
                        <div className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                          {pkg.title}
                        </div>
                        <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4 border-b-[1px] border-[#ebe0e0] p-0 pb-[9px]">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                            {pkg.duration.match(/(\d+)\s*days?/i) ? `${pkg.duration.match(/(\d+)\s*days?/i)?.[1]} DAYS` : pkg.duration.toUpperCase()}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                            {(pkg as any).guest_capacity || (pkg as any).guest || "2-4 GUESTS"}
                          </div>
                        </div>
                        <div className="flex items-end justify-center mt-auto">
                          <div className="flex flex-col hidden">
                            <span className="text-[11px] text-slate-400">Starting from</span>
                            <span className="text-lg font-bold text-[#1B6B93]">
                              {pkg.price ? (pkg.price.toString().startsWith('$') || pkg.price.toString().startsWith('₹') ? pkg.price : `$${pkg.price}`) : '$0'}
                            </span>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleBookNow(pkg) }}
                            className="bg-[#1B6B93] text-white px-[23px] py-[8px] rounded-full text-sm font-semibold"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 bg-white/80 backdrop-blur-sm rounded-[32px] shadow-xl border border-white/20">
                    <p className="text-slate-600 font-black text-xl uppercase tracking-widest">No Trendings destinations found</p>
                  </div>
                )}
              </div>
            </div>

            <div className="max-w-[1440px] mx-auto lg:py-16 px-6 md:px-14 lg:mt-[160px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {packagesList.slice(4, 8).map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handleBookNow(pkg)}
                    className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer border border-slate-50 mt-[20px]"
                  >
                    <div className="relative h-[200px]">
                      <img loading="lazy" src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                        <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <span className="text-xs font-bold text-slate-700">{(pkg as any).rating || "4.8"}</span>
                      </div>
                    </div>
                    <div className=" p-[18px] flex flex-col flex-grow text-left">
                      <div className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                        {pkg.title}
                      </div>
                      <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4 border-b-[1px] border-[#ebe0e0] p-0 pb-[9px]">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                          {pkg.duration.match(/(\d+)\s*days?/i) ? `${pkg.duration.match(/(\d+)\s*days?/i)?.[1]} DAYS` : pkg.duration.toUpperCase()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                          {(pkg as any).guest_capacity || (pkg as any).guest || "2-4 GUESTS"}
                        </div>
                      </div>
                      <div className="flex items-end justify-center mt-auto">
                        <div className="flex flex-col hidden">
                          <span className="text-[11px] text-slate-400">Starting from</span>
                          <span className="text-lg font-bold text-[#1B6B93]">
                            {pkg.price ? (pkg.price.toString().startsWith('$') || pkg.price.toString().startsWith('₹') ? pkg.price : `$${pkg.price}`) : '$0'}
                          </span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleBookNow(pkg) }}
                          className="bg-[#1B6B93] text-white px-[23px] py-[8px] rounded-full text-sm font-semibold"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </>
      )}
    </div>
  );
};

export default PackagesPage;
