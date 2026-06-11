
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LocationIcon } from './Icons';

const OFFERS = [
    { id: 1, title: 'INDIA TOURS', image: '/images/travel.png', },
    { id: 2, title: 'DUBAI TOURS', image: '/images/airplanes.png', },
    { id: 3, title: 'INDIA LOCAL TOURS', image: '/images/trolly.png', },
    { id: 4, title: 'DUBAI LOCAL TOURS', image: '/images/jeep.png', },
];

const HOLIDAY_DESTINATIONS = [
    {
        name: 'Maldives Honeymoon',
        price: '85,000',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop',
        tourId: 101
    },
    {
        name: 'Bali Luxury Retreat',
        price: '65,000',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'Swiss Alps Escape',
        price: '1,45,000',
        image: 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'Santorini Sunset',
        price: '1,10,000',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'Paris Romance',
        price: '95,000',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    }
];

const ADVENTURE_HOLIDAYS = [
    {
        name: 'Leh Ladakh Bike Trip',
        price: '35,000',
        image: 'https://images.unsplash.com/photo-1581791538302-03537b9c97bf?q=80&w=1200&auto=format&fit=crop',
        tourId: 103
    },
    {
        name: 'Everest Base Camp',
        price: '1,20,000',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'Iceland Northern Lights',
        price: '1,80,000',
        image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'African Safari Kenya',
        price: '2,10,000',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'New Zealand Skydiving',
        price: '2,40,000',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
    }
];



const RECOMMENDED_HOLIDAYS = [
    {
        id: 'RH01',
        title: 'Swiss Alps',
        price: '1,45,000',
        image: 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'RH02',
        title: 'Maldives',
        price: '85,000',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop',
        tourId: 101
    },
    {
        id: 'RH03',
        title: 'Santorini',
        price: '1,10,000',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'RH04',
        title: 'Bali',
        price: '65,000',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'RH05',
        title: 'Paris',
        price: '95,000',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
    }
];

interface HolidaysPageProps {
    onBack: () => void;
    onExplore: (tour: any) => void;
    onBookClick?: () => void;
}

const HolidaysPage: React.FC<HolidaysPageProps> = ({ onBack, onExplore, onBookClick }) => {
    const navigate = useNavigate();
    const [activeHoliday, setActiveHoliday] = useState(0);
    const [activeAdventure, setActiveAdventure] = useState(0);
    const [isPausedHoliday, setIsPausedHoliday] = useState(false);
    const [isPausedAdventure, setIsPausedAdventure] = useState(false);

    const recommendedRef = useRef<HTMLDivElement>(null);
    const [recommendedPaused, setRecommendedPaused] = useState(false);



    // Autoplay for Holidays
    useEffect(() => {
        if (isPausedHoliday) return;
        const timer = setInterval(() => {
            setActiveHoliday((prev) => (prev + 1) % HOLIDAY_DESTINATIONS.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [isPausedHoliday]);

    // Autoplay for Adventure
    useEffect(() => {
        if (isPausedAdventure) return;
        const timer = setInterval(() => {
            setActiveAdventure((prev) => (prev + 1) % ADVENTURE_HOLIDAYS.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [isPausedAdventure]);

    const recommendedScroll = (direction: 'left' | 'right') => {
        if (recommendedRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = recommendedRef.current;
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

            recommendedRef.current.scrollTo({ left: nextScrollPosition, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const autoplay = setInterval(() => {
            if (!recommendedPaused) {
                recommendedScroll('right');
            }
        }, 4000);
        return () => clearInterval(autoplay);
    }, [recommendedPaused]);



    const allHolidays = [...HOLIDAY_DESTINATIONS, ...ADVENTURE_HOLIDAYS];

    return (
        <div className="min-h-screen bg-brand-bg">
            {/* Hero Header */}
            <section className=" w-full flex items-center overflow-hidden bg-white px-6 md:px-14 ">
                <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch relative z-10 py-20">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-5xl md:text-[59px] font-sans font-black text-slate-600 leading-[1.1] tracking-wide">
                                Book Your <span className="text-[#2CB8E5]">India</span><br />
                                <span className="text-[#2CB8E5]">Holiday Today</span>
                            </h1>
                            <p className="text-slate-500 text-lg md:text-xl max-w-lg leading-relaxed">
                                Escape the ordinary and rediscover the world through our curated holiday journeys and luxury escapes.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="flex items-center gap-2 px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all group">
                                    Holiday Guide
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                                <button className="px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all">
                                    Explore More
                                </button>
                            </div>
                        </div>

                        <div className="mt-[20px]">
                            <img loading="lazy" src="/images/HOLIDAYS.png" alt="" className="h-[59px] object-cover max-w-[100%] " />
                        </div>
                    </div>

                    {/* Right Content - Hero Image */}
                    <div className="w-[600px] h-[492px]"
                        style={{
                            backgroundImage: "url('/images/dubaibanner.png')",
                            backgroundSize: "contain",
                            backgroundPosition: "center right",
                            backgroundRepeat: "no-repeat",
                        }}
                    ></div>
                </div>
            </section>

            {/* Dream Destination Section */}
            <section className="relative overflow-hidden py-4 bg-white">
                <div className="max-w-[1440px] mx-auto relative z-10 px-6 md:px-14">
                    <div className="text-left mb-12">
                        <h2 className="text-4xl md:text-[38px] font-sans font-black text-slate-900 leading-tight">
                            Choose Your <br /> <span className="text-[#00A9D7]">Dream Destination</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {OFFERS.map((offer) => (
                            <div
                                key={offer.id}
                                className="relative rounded-3xl overflow-hidden p-6 h-[180px] bg-no-repeat bg-right-bottom bg-contain shadow-sm border border-slate-100"
                                style={{ backgroundImage: `url(${offer.image})` }}
                            >
                                {/* TITLE */}
                                <h3 className="text-white font-bold text-[20px] leading-tight">
                                    {offer.title.split(' ').slice(0, -1).join(' ')}<br />
                                    {offer.title.split(' ').slice(-1)}
                                </h3>

                                {/* BUTTON */}
                                <button className="absolute bottom-6 left-6 text-xs border border-white text-white px-[20px] py-[10px] rounded-full hover:bg-white/10 transition-colors">
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Holiday Packages Grid Section */}
            <div className="max-w-screen-2xl mx-auto px-6 py-4">
                {/* Trending Destinations Banner with First 4 Cards */}
                <div
                    className="w-full h-[360px] mx-auto  relative flex flex-col items-center justify-start pt-24 pb-20 overflow-visible mt-12 rounded-[40px]"
                    style={{
                        backgroundImage: "url('/images/bannerfive.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="text-white text-[38px] font-bold text-center mb-12">Amazing Trendings desinations</div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative w-full px-6 md:px-14">
                        {RECOMMENDED_HOLIDAYS.slice(0, 4).map((pkg) => (
                            <div
                                key={pkg.id}
                                onClick={() => pkg.tourId && navigate(`/package/${pkg.tourId}`)}
                                className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer border border-slate-50"
                            >
                                {/* Image Container */}
                                <div className="relative h-[200px]">
                                    <img loading="lazy" src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                                        <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        <span className="text-xs font-bold text-slate-700">4.8</span>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="px-5 pb-5 pt-1 flex flex-col flex-grow text-left">
                                    <h3 className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                                        {pkg.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                            6 Days
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                                            4-6 guests
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-center mt-auto">
                                        <div className="flex flex-col hidden">
                                            <span className="text-[11px] text-slate-400">Starting from</span>
                                            <span className="text-lg font-bold text-[#1B6B93]">
                                                {pkg.price ? (pkg.price.toString().startsWith('$') || pkg.price.toString().startsWith('₹') ? pkg.price : `₹${pkg.price}`) : '₹0'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); }}
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

                {/* Remaining Cards through out Holiday Sections */}
                <div className="max-w-[1440px] mx-auto py-16 px-6 md:px-14 mt-[200px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {RECOMMENDED_HOLIDAYS.map((pkg) => (
                            <div
                                key={pkg.id}
                                onClick={() => pkg.tourId && navigate(`/package/${pkg.tourId}`)}
                                className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer border border-slate-50 mt-[20px]"
                            >
                                {/* Image Container */}
                                <div className="relative h-[200px]">
                                    <img loading="lazy" src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                                        <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        <span className="text-xs font-bold text-slate-700">4.8</span>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="px-5 pb-5 pt-1 flex flex-col flex-grow text-left">
                                    <h3 className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                                        {pkg.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                            6 Days
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                                            4-6 guests
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-center mt-auto">
                                        <div className="flex flex-col hidden">
                                            <span className="text-[11px] text-slate-400">Starting from</span>
                                            <span className="text-lg font-bold text-[#1B6B93]">
                                                {pkg.price ? (pkg.price.toString().startsWith('$') || pkg.price.toString().startsWith('₹') ? pkg.price : `₹${pkg.price}`) : '₹0'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); }}
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
        </div>
    );
};

export default HolidaysPage;
