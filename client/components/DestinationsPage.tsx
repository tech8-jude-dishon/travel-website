
import React from 'react';
import { DestinationCard } from './PopularDestinationsSection';
import { ArrowUpRightIcon } from './Icons';

const extendedDestinations = [
  { id: '01', title: 'Burj Khalifa', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1582470653947-3fc0634d501b?q=80&w=800&auto=format&fit=crop', rating: '4.95 (1.2k)', duration: '2 Hours', tag: 'Skyline' },
  { id: '02', title: 'Palm Jumeirah', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop', rating: '4.88 (950)', duration: '4 Hours', tag: 'Luxury' },
  { id: '03', title: 'Dubai Marina', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop', rating: '4.92 (840)', duration: '3 Hours', tag: 'Coastal' },
  { id: '04', title: 'Burj Al Arab', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1537042102057-6196a0f02c0b?q=80&w=800&auto=format&fit=crop', rating: '4.97 (1.1k)', duration: '2 Hours', tag: 'Iconic' },
  { id: '05', title: 'Dubai Desert', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1452022582947-af526465192c?q=80&w=800&auto=format&fit=crop', rating: '4.90 (2.1k)', duration: '6 Hours', tag: 'Adventure' },
  { id: '06', title: 'Old Dubai', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1546412414-e1885261bb3b?q=80&w=800&auto=format&fit=crop', rating: '4.85 (720)', duration: '4 Hours', tag: 'Cultural' },
  { id: '07', title: 'Miracle Garden', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1578307336416-0c9780f2d952?q=80&w=800&auto=format&fit=crop', rating: '4.80 (1.5k)', duration: '3 Hours', tag: 'Nature' },
  { id: '08', title: 'Global Village', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=800&auto=format&fit=crop', rating: '4.93 (3.2k)', duration: '5 Hours', tag: 'Family' },
  { id: '09', title: 'Hatta Mountains', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=800&auto=format&fit=crop', rating: '4.87 (450)', duration: 'Full Day', tag: 'Hiking' },
  { id: '10', title: 'Zabeel Park', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1549944811-f1aae230cc90?q=80&w=800&auto=format&fit=crop', rating: '4.75 (890)', duration: '2 Hours', tag: 'Park' },
  { id: '11', title: 'Dubai Frame', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop', rating: '4.82 (1.1k)', duration: '1 Hour', tag: 'Modern' },
  { id: '12', title: 'Kite Beach', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', rating: '4.89 (2.4k)', duration: '3 Hours', tag: 'Beach' },
];

interface DestinationsPageProps {
  onBack: () => void;
  onBookClick?: () => void;
}

const DestinationsPage: React.FC<DestinationsPageProps> = ({ onBack, onBookClick }) => {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Header Section - Updated height to 80vh */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy"
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop"
            alt="World Destinations"
            className="w-full h-full object-cover brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/20 to-brand-bg"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="flex justify-center items-center gap-2  animate-fade-in-down">
            <span
              className="cursor-pointer text-white/70 font-bold text-[10px] tracking-[0.2em] uppercase hover:text-brand-gold transition-colors"
              onClick={onBack}
            >
              Home
            </span>
            <span className="text-white/40 text-[10px]">/</span>
            <span className="text-brand-gold font-bold text-[10px] tracking-[0.2em] uppercase">Destinations</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-serif font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl animate-fade-in-up">
            Our Destinations
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-2xl font-medium leading-relaxed italic drop-shadow-md animate-fade-in-up delay-200">
            "Your passport to the most breathtaking corners of the globe."
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <div className="max-w-screen-2xl mx-auto px-6 global-page-container">
        {/* Intro Text Block */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">
            Explore Curated Landscapes
          </h2>
          <p className="text-[#64718C] text-lg font-medium leading-relaxed">
            From the futuristic skyline of Dubai to the serene blue waters of the Maldives, we've hand-picked the world's most iconic locations to ensure your travel experience is nothing short of legendary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {extendedDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>

        {/* Feature Middle Banner */}
        <section className="relative w-full h-[500px] my-32 rounded-[3.5rem] overflow-hidden group shadow-2xl">
          <div className="absolute inset-0">
            <img loading="lazy"
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
              alt="Escape the Ordinary"
              className="w-full h-full object-cover brightness-[0.7] group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/40 to-transparent"></div>
          </div>

          <div className="relative h-full px-12 md:px-24 flex flex-col justify-center items-start">
            <p className="font-cursive text-brand-gold text-4xl mb-4 animate-fade-in-down">
              Escape the Ordinary
            </p>
            <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-tight">
              Journey Beyond <br /> <span className="brush-highlight inline-block">Expectations</span>
            </h2>
            <button
              onClick={onBookClick}
              className="bg-brand-gold text-brand-dark px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-white transition-all"
            >
              Start Your Adventure
            </button>
          </div>
        </section>

        {/* Final CTA Footer for Page */}

      </div>
    </div>
  );
};

export default DestinationsPage;
