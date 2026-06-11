
import React from 'react';

const categories = [
  {
    id: 1,
    title: 'Hiking',
    tours: '3 Tours',
    price: '256$',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 48L32 32L42 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 52L32 24L50 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="48" cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 14V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Adventure',
    tours: '3 Tours',
    price: '256$',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="24" width="12" height="28" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="32" y="32" width="12" height="20" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="46" cy="42" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 24V52" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 32H20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 40H20" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Sea Beatches',
    tours: '3 Tours',
    price: '256$',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 48V28" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M32 28C32 28 36 20 48 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M32 36C32 36 24 28 16 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M44 48C44 40 52 40 52 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="50" cy="48" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Boat Tours',
    tours: '3 Tours',
    price: '256$',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 40L16 48H48L52 40H12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M32 40V24L44 32L32 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 52C14 52 18 48 32 48C46 48 50 52 50 52" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    id: 5,
    title: 'City Toures',
    tours: '3 Tours',
    price: '256$',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="20" width="10" height="32" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="26" y="28" width="10" height="24" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="36" y="16" width="10" height="36" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="50" cy="44" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  }
];

const CategoryCard: React.FC<{ category: typeof categories[0] }> = ({ category }) => {
  return (
    <div className="bg-[#FEF9F3] rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-lg transition-transform hover:-translate-y-2 duration-300 relative group overflow-hidden">
      <div className="text-[#3D3014] mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500">
        {category.icon}
      </div>
      
      <h3 className="text-xl font-bold text-[#3D3014] mb-4">
        {category.title}
      </h3>
      
      <div className="bg-white px-5 py-1.5 rounded-full text-[10px] font-bold text-[#3D3014]/60 shadow-sm mb-8">
        {category.tours}
      </div>
      


      {/* Squiggly Arrow Decoration */}
      <div className="absolute right-6 bottom-16 opacity-30 group-hover:opacity-100 transition-opacity">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="text-[#3D3014] transform rotate-[-15deg]">
          <path d="M2 2C2 2 10 10 10 20C10 30 2 38 2 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 32L22 38L14 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

const TourCategories: React.FC = () => {
  return (
    <section className="bg-[#3D3014] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-screen-2xl mx-auto text-center">
        <p className="font-cursive text-[#FEF9F3] text-3xl md:text-4xl mb-6">
          tour catagorires
        </p>
        <h2 className="text-white text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight max-w-4xl mx-auto">
          Shelter of Love, Compassion, <br /> and New Beginnings
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-20 font-medium">
          communication and utilizes cutting edge logistic planning to get your shipment completed on time. itself founded of backgrounds, which simply.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourCategories;
