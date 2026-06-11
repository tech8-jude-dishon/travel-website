import React, { useState, useEffect } from 'react';
import { packages, resolveImageUrl } from '../lib/apiClient';
import { Users } from 'lucide-react';

interface DubaiLocalToursPageProps {
  onExplore: (tour: any) => void;
  onBookClick: () => void;
}

const DubaiLocalToursPage: React.FC<DubaiLocalToursPageProps> = ({ onExplore, onBookClick }) => {
  const [tours, setTours] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      try {
        const data = await packages.getAll();
        const dubaiTours = data.filter((t: any) => t.region === 'Dubai');
        setTours(dubaiTours.filter((tour: any) => {
          const cat = tour.category?.toLowerCase() || '';
          return cat === 'local' || cat === 'dubai local tours' || cat === 'dubai local toures' || cat === 'standard' || cat === '';
        }));
      } catch (err) {
        console.error('Error fetching local tours:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Banner */}
      <div
        className="w-full h-[360px] mx-auto relative flex flex-col items-center justify-start lg:pt-24 pb-20 overflow-visible rounded-b-[40px] p-cards"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774846701/bannerfive_compressed_zvo9gv.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="lg:text-white text-black lg:text-[38px] text-2xl font-bold text-center lg:mb-12 mb-4">
          Dubai <span className="">Local Tour</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative w-full px-6 md:px-14">
          {isLoading ? (
            <div className="col-span-4 py-20 text-center">
              <div className="w-8 h-8 border-4 border-[#00A9D7] border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : tours.length === 0 ? (
            <div className="col-span-4 py-20 text-center font-bold text-slate-400">No local tours found.</div>
          ) : tours.slice(0, 4).map((tour) => (
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
                <div className="text-[16px] font-bold text-slate-900 leading-snug mb-3">{tour.title}</div>
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

      {/* Remaining cards below banner */}
      {tours.length > 4 && (
        <div className="max-w-[1440px] mx-auto lg:pb-16 pb-8 lg:pt-[200px] pt-[22px] px-6 md:px-14 lg:mt-[40px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tours.slice(4).map((tour) => (
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
                  <div className="text-[16px] font-bold text-slate-900 leading-snug mb-3">{tour.title}</div>
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
      )}
    </div>
  );
};

export default DubaiLocalToursPage;
