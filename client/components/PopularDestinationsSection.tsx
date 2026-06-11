
import React from 'react';
import { LocationIcon, ArrowUpRightIcon } from './Icons';
import { useNavigate } from 'react-router-dom';


export const popularDestinations = [
  {
    id: 1,
    title: "Paris, France",
    location: "Europe",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
    rating: "4.95 (1.2k)",
    duration: "5 Days",
    tag: "Romantic",
    description: "Experience the magic of the City of Light. From the iconic Eiffel Tower to the charming streets of Montmartre, Paris offers an unparalleled blend of history, art, and romance.",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival & Eiffel Tower", detail: "Arrive in Paris and check into your luxury hotel. Evening visit to the Eiffel Tower for sunset views." },
      { day: "Day 2", title: "Louvre Museum", detail: "Guided tour of the world's largest art museum, home to the Mona Lisa." },
      { day: "Day 3", title: "Seine River Cruise", detail: "Relaxing boat cruise along the Seine, passing Notre Dame and Musée d'Orsay." }
    ]
  },
  {
    id: 2,
    title: "Bali, Indonesia",
    location: "Asia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    rating: "4.88 (950)",
    duration: "7 Days",
    tag: "Tropical",
    description: "Escape to the Island of the Gods. Bali is a tropical paradise known for its volcanic mountains, iconic rice paddies, coral reefs, and spiritual culture.",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600",
      "https://images.unsplash.com/photo-1537953391648-762d018c19ad?q=80&w=600",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Ubud Arrival", detail: "Transfer to Ubud, the cultural heart of Bali. Evening traditional dance performance." },
      { day: "Day 2", title: "Tegalalang Rice Terrace", detail: "Explore the stunning rice terraces and visit the Sacred Monkey Forest Sanctuary." },
      { day: "Day 3", title: "Beach Day", detail: "Head to the southern coast for surfing, sunbathing, and a seafood dinner at Jimbaran Bay." }
    ]
  },
  {
    id: 3,
    title: "Santorini, Greece",
    location: "Europe",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
    rating: "4.92 (840)",
    duration: "4 Days",
    tag: "Coastal",
    description: "Witness the most beautiful sunsets in the world. Santorini is famous for its white-washed buildings, blue-domed churches, and dramatic volcanic cliffs.",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600",
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=600",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Oia Sunset", detail: "Check into your caldera-view hotel and explore the charming village of Oia." },
      { day: "Day 2", title: "Volcano Tour", detail: "Boat trip to the volcanic islands of Nea Kameni and Palea Kameni." },
      { day: "Day 3", title: "Wine Tasting", detail: "Visit local wineries and sample Santorini's unique volcanic wines." }
    ]
  },
 
];

interface DestinationCardProps {
  destination: any;
  onExplore?: (destination: any) => void;
  className?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onExplore, className = "" }) => {
  return (
    <div
        onClick={() => onExplore?.(destination)}
        className={`bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer h-full ${className}`}
    >
        <div className="relative h-[200px]">
            <img loading="lazy"
                src={destination.image}
                alt={destination.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop';
                }}
            />
            <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-xs font-bold text-slate-700">{destination.rating}</span>
            </div>
        </div>
        <div className="px-5 pb-5 pt-1 flex flex-col flex-grow">
            <h3 className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                {destination.title}
            </h3>
            <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4">
                <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    {destination.duration}
                </div>
            </div>
            <div className="flex items-end justify-center mt-auto">
                <div className="flex flex-col hidden">
                    <span className="text-[11px] text-slate-400">Starting from</span>
                    <span className="text-lg font-bold text-[#1B6B93]">
                        {destination.price ? (destination.price.toString().startsWith('$') || destination.price.toString().startsWith('₹') ? destination.price : `₹${destination.price}`) : '₹17,300'}
                    </span>
                </div>
                <button
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); }}
                    className="bg-[#1B6B93] text-white px-[23px] py-[8px] rounded-full text-sm font-semibold"
                >
                    Book Now
                </button>
            </div>
        </div>
    </div>
  );
};

const PopularDestinationsSection: React.FC<{ onExplore?: (dest: any) => void; onViewAll?: () => void }> = ({ onExplore, onViewAll }) => {
    const navigate = useNavigate();

  return (
    <section className="global-page-container bg-brand-bg relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10 relative z-10">
          <div className="max-w-2xl">
            <p className="font-cursive text-brand-gold text-3xl md:text-4xl mb-4">
              Explore More
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-8 leading-tight">
              Popular Packages
            </h2>
            <p className="text-brand-dark/60 text-base md:text-lg leading-relaxed max-w-xl font-medium">
              Discover the most sought-after locations around the globe. From historical cities to tropical paradises, find your next dream destination.
            </p>
          </div>

          <button
            onClick={() => navigate("/packages")}
            className="hidden lg:flex items-center gap-3 bg-brand-dark text-white px-10 py-5 rounded-full font-bold text-xs tracking-widest uppercase shadow-xl shadow-brand-gold/20 hover:shadow-brand-gold/40 hover:-translate-y-1 transition-all duration-300"
          >
            Explore All <ArrowUpRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} onExplore={onExplore} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinationsSection;
