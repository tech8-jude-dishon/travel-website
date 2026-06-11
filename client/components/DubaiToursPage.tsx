import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { packages, resolveImageUrl } from '../lib/apiClient';
import { LocationIcon } from './Icons';
import { Users } from 'lucide-react';

interface DubaiToursPageProps {
  onBack: () => void;
  onExplore: (tour: any) => void;
  onBookClick: () => void;
}

const OFFERS = [
  // { id: 1, title: 'INDIA TOURS', image: '/images/travel.png', },
  { id: 2, title: 'INTERNATIONAL TOURS ', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774848589/dubaii_compressed_wnqjzq.webp', },
  // { id: 3, title: 'INDIA LOCAL TOURS', image: '/images/trolly.png', },
  { id: 4, title: 'DUBAI LOCAL TOURS', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774848813/dubaiL_compressed_b2g09h.webp', },
];

const DubaiToursPage: React.FC<DubaiToursPageProps> = ({ onBack, onExplore, onBookClick }) => {
  const navigate = useNavigate();
  const [tours, setTours] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      try {
        const data = await packages.getAll();
        setTours(data.filter((t: any) => t.region === 'Dubai'));
      } catch (err) {
        console.error('Error fetching Dubai tours:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  const standardTours = tours.filter(tour => {
    const cat = tour.category?.toLowerCase() || '';
    // Only show explicitly international trips from Dubai
    return cat === 'international trips from dubai';
  });
  const localTours = tours.filter(tour => {
    const cat = tour.category?.toLowerCase() || '';
    // Show local tours OR standard Dubai tours in the local section
    return cat === 'local' || cat === 'dubai local tours' || cat === 'dubai local toures' || cat === 'standard' || cat === '';
  });

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Header */}
      <section className=" w-full flex items-center overflow-hidden bg-white px-6 md:px-14 ">
        {/* DUBAI Background Watermark */}


        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-10 gap-2 items-stretch relative z-10 ">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-5 justify-center items-center lg:items-start">
              <h1 className="text-3xl md:text-[59px] font-sans text-center lg:text-left font-black text-slate-600 leading-[1.1] tracking-wide mt-[50px] lg:mt-0">
                Book Your <span className="text-[#2CB8E5]">Dubai</span><br />
                <span className="text-[#2CB8E5]">Tours Today</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-lg leading-relaxed text-center lg:text-left">
                Explore Dubai’s famous landmarks, desert safaris, luxury shopping, and top attractions with our curated tour experiences.             </p>
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
              <img loading="lazy" src="https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774848407/DUBAI_compressed_wwhgos.webp" alt="" className=" md:max-w-md" />
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="lg:w-[600px] lg:h-[492px] w-[294px]  h-[259px]  "
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774848164/dubaibanner_compressed_vrqn5r.webp')",
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
          <div className="text-left mb-4">
            <h2 className="text-3xl l text-center lg:text-left md:text-[38px] font-sans font-black text-slate-900 leading-tight">
              Choose Your <br /> <span className="text-[#00A9D7]">Dream Destination</span>
            </h2>
          </div>

          <div className="flex  flex-col lg:flex-row  lg:gap-12 gap-4 relative">
            {OFFERS.map((offer) => (
              <div
                key={offer.id}
                className="relative rounded-[40px] overflow-hidden lg:p-10  p-5 h-[300px] lg:w-[550px] bg-no-repeat bg-center bg-cover rounded-[2.5rem]   group cursor-pointer"
                style={{ backgroundImage: `url(${offer.image})` }}
                onClick={() => {
                  if (offer.id === 2) navigate('/dubai-tours/international');
                  if (offer.id === 4) navigate('/dubai-tours/local');
                }}
              >
                {/* TITLE */}
                <div className="text-white font-black lg:text-[32px] text-[20px] leading-tight">
                  {offer.title}<br />
                </div>

                {/* BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (offer.id === 2) navigate('/dubai-tours/international');
                    else if (offer.id === 4) navigate('/dubai-tours/local');
                  }}
                  className="absolute bottom-10 bottom-[20px] left-10 text-sm  text-[#00A9D7] bg-white px-[32px] py-[14px] rounded-full font-bold hover:bg-white hover:text-[#00A9D7] transition-all"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid Section */}
      <div className="max-w-screen-2xl mx-auto px-6 py-4">
        {/* New Design Grid */}


        {/* Commented Old Design - Kept as requested */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {popularTours.map((tour) => (
            <div
              key={tour.id}
              onClick={() => onExplore(tour)}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-dark/5 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group flex flex-col h-full cursor-pointer"
            >
              <div className="p-5 pb-0">
                <div className="aspect-[16/11] rounded-[2rem] overflow-hidden relative">
                  <img loading="lazy"
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                    <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">{tour.tag}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-brand-gold mb-3">
                  <LocationIcon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{tour.location}</span>
                </div>

                <div className="text-2xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-gold transition-colors leading-tight">
                  {tour.title}
                </div>

                <div className="mt-auto bg-[#FFF8ED] rounded-2xl p-5 border border-brand-gold/10">
                  <div className="flex justify-between items-center text-[12px] font-bold text-brand-dark">
                    <div className="flex items-center gap-2 justify-center">
                      <svg className="w-4 h-4 text-brand-gold fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      {tour.rating}
                    </div>
                    <div className="h-6 w-[1px] bg-brand-dark/10"></div>
                    <div className="flex items-center gap-2 flex-1 justify-center">
                      <svg className="w-4 h-4 text-brand-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {tour.duration}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Trending Destinations Banner with First 4 Cards */}
        <div
          className="w-full h-[360px] mx-auto  relative flex flex-col items-center justify-start lg:pt-24 pb-20 overflow-visible lg:mt-12 rounded-[40px] p-cards"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774846701/bannerfive_compressed_zvo9gv.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="lg:text-white text-black lg:text-[38px] text-2xl font-bold text-center lg:mb-12 mb-4">Top International Tour Packages from Dubai</div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative w-full px-6 md:px-14">
            {isLoading ? (
              <div className="col-span-4 py-20 text-center"><div className="w-8 h-8 border-4 border-[#00A9D7] border-t-transparent rounded-full animate-spin mx-auto"></div></div>
            ) : standardTours.length === 0 ? (
              <div className="col-span-4 py-20 text-center font-bold text-slate-400">No international tours found.</div>
            ) : standardTours.slice(0, 4).map((tour) => (
              <div
                key={tour.id}
                onClick={() => onExplore(tour)}
                className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer border border-slate-50"
              >
                <div className="relative h-[185px]">
                  <img loading="lazy" src={resolveImageUrl(tour.image_url) || tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                    <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-xs font-bold text-slate-700">{tour.rating || "4.8"}</span>
                  </div>
                </div>

                <div className="p-[18px]  flex flex-col flex-grow text-left">
                  <div className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                    {tour.title}
                  </div>
                  <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4  p-0 pb-[9px] border-b-[1px] border-[#ebe0e0]">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                      {tour.guest_capacity || tour.guest || '2-4 guests'}
                    </div>
                  </div>
                  <div className="flex items-end justify-center mt-auto">
                    <div className="flex flex-col hidden">
                      <span className="text-[11px] text-slate-400">Starting from</span>
                      <span className="text-lg font-bold text-[#1B6B93]">
                        {tour.price ? (tour.price.toString().startsWith('$') || tour.price.toString().startsWith('₹') ? tour.price : `$${tour.price}`) : '$0'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onBookClick(); }}
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

        {/* Dubai Tour Section */}
        <div className="max-w-[1440px] mx-auto lg:pb-16 pb-8 lg:pt-[200px] pt-[22px] px-6 md:px-14 lg:mt-[40px]">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {standardTours.slice(4).map((tour) => (
              <div
                key={tour.id}
                onClick={() => onExplore(tour)}
                className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer border border-slate-50"
              >
                <div className="relative h-[185px]">
                  <img loading="lazy" src={resolveImageUrl(tour.image_url) || tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                    <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-xs font-bold text-slate-700">{tour.rating || "4.8"}</span>
                  </div>
                </div>

                <div className="p-[18px] flex flex-col flex-grow text-left">
                  <div className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                    {tour.title}
                  </div>
                  <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4 p-0 pb-[9px] border-b-[1px] border-[#ebe0e0]">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                      {tour.guest_capacity || tour.guest || '2-4 guests'}
                    </div>
                  </div>
                  <div className="flex items-end justify-center mt-auto">
                    <div className="flex flex-col hidden">
                      <span className="text-[11px] text-slate-400">Starting from</span>
                      <span className="text-lg font-bold text-[#1B6B93]">
                        {tour.price ? (tour.price.toString().startsWith('$') || tour.price.toString().startsWith('₹') ? tour.price : `$${tour.price}`) : '$0'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onBookClick(); }}
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

        {/* Dubai Local Tour Section */}
        <div className="max-w-[1440px] mx-auto pb-12 px-6 md:px-14">
          <h2 className="text-2xl md:text-[38px] text-center lg:text-left font-sans font-black text-slate-900 leading-tight mb-6">
            Dubai <span className="text-[#00A9D7]">Local Tour</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {localTours.map((tour) => (
              <div
                key={tour.id}
                onClick={() => onExplore(tour)}
                className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer border border-slate-50"
              >
                <div className="relative h-[185px]">
                  <img loading="lazy" src={resolveImageUrl(tour.image_url) || tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                    <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-xs font-bold text-slate-700">{tour.rating || "4.8"}</span>
                  </div>
                </div>

                <div className="p-[18px] flex flex-col flex-grow text-left">
                  <div className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                    {tour.title}
                  </div>
                  <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4 p-0 pb-[9px] border-b-[1px] border-[#ebe0e0]">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                      {tour.guest_capacity || tour.guest || '2-4 guests'}
                    </div>
                  </div>
                  <div className="flex items-end justify-center mt-auto">
                    <div className="flex flex-col hidden">
                      <span className="text-[11px] text-slate-400">Starting from</span>
                      <span className="text-lg font-bold text-[#1B6B93]">
                        {tour.price ? (tour.price.toString().startsWith('$') || tour.price.toString().startsWith('₹') ? tour.price : `$${tour.price}`) : '$0'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onBookClick(); }}
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

export default DubaiToursPage;
