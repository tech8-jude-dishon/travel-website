import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { packages, resolveImageUrl } from '../lib/apiClient';
import { LocationIcon } from './Icons';
import { Users } from 'lucide-react';

const OFFERS = [
  { id: 1, title: 'INTERNATIONAL TOURS ', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774849144/indiaFrom_compressed_gwvhxb.webp', },
  // { id: 2, title: 'DUBAI TOURS', image: '/images/airplanes.png', },
  { id: 3, title: 'INDIA LOCAL TOURS', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774849226/indiaL_compressed_djzdti.webp', },
  // { id: 4, title: 'DUBAI LOCAL TOURS', image: '/images/jeep.png', },
];

interface IndiaToursPageProps {
  onBack: () => void;
  onExplore: (tour: any) => void;
  onBookClick: () => void;
}

// IndiaToursPage component start below

const IndiaToursPage: React.FC<IndiaToursPageProps> = ({ onBack, onExplore, onBookClick }) => {
  const navigate = useNavigate();
  const [tours, setTours] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      try {
        const data = await packages.getAll();
        setTours(data.filter((t: any) => t.region === 'India'));
      } catch (err) {
        console.error('Error fetching India tours:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  const internationalTours = tours.filter(tour => {
    const cat = tour.category?.toLowerCase() || '';
    // User wants 'Standard' tours (like Delhi City Highlights) to appear here too
    return cat === 'standard' || cat === 'international trips from india';
  });

  const northTours = tours.filter(tour => {
    const cat = tour.category?.toLowerCase() || '';
    const title = tour.title?.toLowerCase() || '';
    const loc = tour.location?.toLowerCase() || '';

    // Explicit North India tours
    if (cat === 'north' || cat === 'north india tours') return true;

    // Fallback for uncategorized India tours (but EXCLUDE 'standard' which goes to International)
    if (cat === '') {
      const northKeywords = ['delhi', 'leh', 'ladakh', 'rajasthan', 'himachal', 'manali', 'agra', 'kashmir', 'jaipur', 'north'];
      return northKeywords.some(key => title.includes(key) || loc.includes(key));
    }
    return false;
  });

  const southTours = tours.filter(tour => {
    const cat = tour.category?.toLowerCase() || '';
    const title = tour.title?.toLowerCase() || '';
    const loc = tour.location?.toLowerCase() || '';

    // Explicit South India tours
    if (cat === 'south' || cat === 'south india tours' || cat === 'south indian') return true;

    // Fallback for uncategorized India tours (EXCLUDE 'standard')
    if (cat === '') {
      const southKeywords = ['kerala', 'karnataka', 'tamil', 'chennai', 'munnar', 'cochi', 'bangalore', 'mysore', 'south'];
      return southKeywords.some(key => title.includes(key) || loc.includes(key));
    }
    return false;
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading tours...</div>;
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Header */}
      <section className=" w-full flex items-center overflow-hidden bg-white px-6 md:px-14 ">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch relative z-10 ">
          {/* Left Content */}
          <div className="flex flex-col justify-center ">
            <div className="flex flex-col gap-5 justify-center items-center lg:items-start">
              <h1 className="text-3xl md:text-[59px] text-center lg:text-left font-sans font-black text-slate-600 leading-[1.1] tracking-wide mt-[50px] lg:mt-0">
                Book Your <span className="text-[#2CB8E5]">India</span><br />
                <span className="text-[#2CB8E5]">Tours Today</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-lg leading-relaxed text-center lg:text-left">
                Explore the rich culture, historic landmarks, scenic landscapes, and vibrant traditions of India with our specially curated tour packages.              </p>
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
              <img loading="lazy" src="https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774849573/INDIA_compressed_xagv6z.webp" alt="" className=" md:max-w-md" />
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="lg:w-[600px] lg:h-[492px] w-full h-[300px]"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774848964/indiaRight_compressed_odt48k.webp')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </section>

      {/* Dream Destination Section */}
      <section className="relative overflow-hidden lg:py-4 py-2 bg-white">
        <div className="max-w-[1440px] mx-auto relative z-10 px-6 md:px-14">
          <div className="text-left mb-4">
            <h2 className="text-3xl text-center lg:text-left md:text-[38px] font-sans font-black text-slate-900 leading-tight">
              Choose Your <br /> <span className="text-[#00A9D7]">Dream Destination</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row   lg:gap-12 gap-8 relative">
            {OFFERS.map((offer) => (
              <div
                key={offer.id}
                className="relative rounded-[40px] overflow-hidden lg:p-10  p-5 h-[300px] lg:w-[550px] w-full bg-no-repeat bg-center bg-cover rounded-[2.5rem]   group cursor-pointer"
                style={{ backgroundImage: `url(${offer.image})` }}
                onClick={() => {
                  if (offer.id === 1) navigate('/india-tours/international');
                  if (offer.id === 3) navigate('/india-tours/local');
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
                    if (offer.id === 1) navigate('/india-tours/international');
                    else if (offer.id === 3) navigate('/india-tours/local');
                  }}
                  className="absolute bottom-10 left-10 text-sm  text-[#00A9D7] bg-white px-[32px] py-[14px] rounded-full font-bold hover:bg-white hover:text-[#00A9D7] transition-all"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid Section */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:py-4">
        {/* Trending Destinations Banner with First 4 Cards */}
        <div
          className="w-full h-[360px] mx-auto  relative flex flex-col items-center justify-start lg:pt-24 pb-20 overflow-visible lg:mt-12 mt-4 rounded-[40px] p-cards"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774846701/bannerfive_compressed_zvo9gv.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="lg:text-white text-black lg:text-[38px] text-3xl font-bold text-center mb-4">International  Tours
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative w-full px-6 md:px-14">
            {internationalTours.length === 0 ? (
              <div className="col-span-4 py-10 text-center font-bold text-slate-400/50">No international trips currently featured.</div>
            ) : internationalTours.slice(0, 4).map((tour) => (
              <div
                key={tour.id}
                onClick={() => onExplore(tour)}
                className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer border border-slate-50"
              >
                {/* Image Container */}
                <div className="relative h-[185px]">
                  <img loading="lazy" src={resolveImageUrl(tour.image_url) || tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                    <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-xs font-bold text-slate-700">{tour.rating || "4.8"}</span>
                  </div>
                </div>

                {/* Content Details */}
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
                      {tour.guest_capacity || '2-4 guests'}
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

        {/* North India Tours Section */}
        <div className="max-w-[1440px] mx-auto lg:pt-16 px-6 md:px-14 lg:mt-[80px] mt-[20px]">
          <h2 className="text-2xl md:text-[38px] text-center lg:text-left font-sans font-black text-slate-900 leading-tight lg:mb-4 mb-4 lg:pt-[30px]">
            North India <span className="text-[#00A9D7]">Tours</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-[20px]">
            {northTours.map((tour) => (
              <div
                key={tour.id}
                onClick={() => onExplore(tour)}
                className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer border border-slate-50"
              >
                {/* Image Container */}
                <div className="relative h-[200px]">
                  <img loading="lazy" src={resolveImageUrl(tour.image_url) || tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                    <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-xs font-bold text-slate-700">{tour.rating || "4.8"}</span>
                  </div>
                </div>

                {/* Content Details */}
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
                      {tour.guest_capacity || '2-4 guests'}
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

        {/* South India Tours Section */}
        <div className="max-w-[1440px] mx-auto lg:py-8 px-6 md:px-14">
          <div className="text-2xl md:text-[38px] font-sans text-center lg:text-left font-black text-slate-900 leading-tight lg:mb-4 mb-4">
            South India <span className="text-[#00A9D7]">Tours</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {southTours.map((tour) => (
              <div
                key={tour.id}
                onClick={() => onExplore(tour)}
                className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer border border-slate-50"
              >
                {/* Image Container */}
                <div className="relative h-[185px]">
                  <img loading="lazy" src={resolveImageUrl(tour.image_url) || tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                    <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-xs font-bold text-slate-700">{tour.rating || "4.8"}</span>
                  </div>
                </div>

                {/* Content Details */}
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
                      {tour.guest_capacity || '2-4 guests'}
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

export default IndiaToursPage;
