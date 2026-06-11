
import React from 'react';

export const destinationsList = [
  { id: '01', name: 'Flights',label:'Global Flights', image: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?q=80&w=800&auto=format&fit=crop' },
  { id: '02', name: 'Holidays',label:'Custom Holidays', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop' },
  { id: '03', name: 'Visa', label:'Visa Support', image: 'https://images.unsplash.com/photo-1517086822157-2b0358e7684a?q=80&w=800&auto=format&fit=crop' },
  { id: '04', name: 'Hotels',label:'Hotel Booking', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop' },
  { id: '05', name: 'Tours', label:'Guided Tours', image: 'https://images.unsplash.com/photo-1500835595353-b0ad2e58b912?q=80&w=800&auto=format&fit=crop' },
  { id: '06', name: 'Group Tours',label:'Group Tours', image: 'https://images.unsplash.com/photo-1539635278303-d4002c07dee3?q=80&w=800&auto=format&fit=crop' },
];

export const DestinationCard: React.FC<{ destination: typeof destinationsList[0] }> = ({ destination }) => {
  return (
    <div className="group relative bg-[#FEF9F3] border border-brand-gold/10 rounded-[2.5rem] p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-gold/10 hover:-translate-y-1.5 flex items-center gap-7 overflow-hidden">
      {/* Polaroid Image Left */}
      <div className="relative shrink-0 w-[48%] aspect-[4/3] transform -rotate-2 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105 z-10">
        <div className="h-full w-full bg-white p-2 pb-8 shadow-xl border border-gray-100 rounded-sm overflow-hidden flex flex-col relative">
          <div className="w-full h-full bg-[#f3f3f3] rounded-sm overflow-hidden">
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="w-full h-full object-cover block"
              loading="eager"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop';
              }}
            />
          </div>
        </div>
        
        {/* Listing Ribbon */}
        <div className="absolute top-[10px] left-[-28px] bg-brand-dark text-white py-1.5 transform -rotate-45 shadow-md z-20 w-[110px] border-b border-brand-dark/5">
          <span className="text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap block text-center leading-none">
            {destination.label}
          </span>
        </div>
      </div>

      {/* Text Content Right */}
      <div className="flex flex-col flex-1 justify-center">
        <h3 className="text-2xl lg:text-[28px] font-serif font-bold text-brand-dark group-hover:text-brand-gold transition-colors leading-tight">
          {destination.name}
        </h3>
      </div>
    </div>
  );
};

interface DestinationsSectionProps {
  onExplore?: () => void;
}

const DestinationsSection: React.FC<DestinationsSectionProps> = ({ onExplore }) => {
  return (
    <section className=" global-page-container max-w-screen-2xl mx-auto bg-brand-bg">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10">
        <div className="max-w-2xl">
          <p className="font-cursive text-brand-gold text-3xl md:text-4xl mb-2">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif font-bold text-brand-dark mb-6 leading-tight tracking-tight">
           Premium Travel Solutions
          </h2>
          <p className="text-brand-dark/60 text-sm md:text-base leading-relaxed max-w-md font-medium">
            Discover breathtaking landscapes and iconic landmarks across the globe with our meticulously planned tours designed for unforgettable memories.
          </p>
        </div>
        
      
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {destinationsList.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </section>
  );
};

export default DestinationsSection;
