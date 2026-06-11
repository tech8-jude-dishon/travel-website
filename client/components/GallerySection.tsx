
import React from 'react';

const GalleryItem: React.FC<{ 
  src: string; 
  alt: string; 
  title: string; 
  duration: string; 
  className?: string;
  imgClassName?: string;
}> = ({ src, alt, title, duration, className, imgClassName }) => (
  <div className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.02] group ${className}`}>
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${imgClassName}`}
      referrerPolicy="no-referrer"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop';
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500"></div>
    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
      <h3 className="text-white text-lg md:text-xl font-bold tracking-tight mb-0.5 uppercase">
        {title}
      </h3>
      <p className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
        {duration}
      </p>
    </div>
  </div>
);

const GallerySection: React.FC = () => {
  return (
    <section className="global-page-container bg-brand-bg overflow-hidden py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">
            Inspiring Travel Stories
          </h2>
          <p className="mt-4 text-brand-dark/60 max-w-xl mx-auto font-medium">
            See the world through experiences that define adventure and elegance.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-12 gap-4 items-start">
          
          {/* Left Column */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-4">
            <GalleryItem 
              src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop" 
              alt="Manali" 
              title="MANALI" 
              duration="3 Nights / 4 Days"
              imgClassName="aspect-[4/5]"
            />
            <GalleryItem 
              src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop" 
              alt="Gujarat" 
              title="GUJARAT" 
              duration="4 Nights / 5 Days"
              imgClassName="aspect-square"
            />
          </div>

          {/* Center Column */}
          <div className="col-span-12 md:col-span-8 lg:col-span-6 flex flex-col items-center">
            <GalleryItem 
              src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop" 
              alt="Thailand" 
              title="THAILAND" 
              duration="5 Nights / 6 Days"
              className="w-full"
              imgClassName="aspect-square"
            />
            
            {/* Bottom Row Spanning under Center */}
            <div className="w-[120%] mt-[80px] -ml-[25%] hidden lg:block">
              <GalleryItem 
                src="https://images.unsplash.com/photo-1589136142558-90c0d94915e0?q=80&w=1200&auto=format&fit=crop" 
                alt="Andaman" 
                title="ANDAMAN" 
                duration="4 Nights / 5 Days"
                imgClassName="aspect-[21/9]"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-4">
            <GalleryItem 
              src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop" 
              alt="Sri Lanka" 
              title="SRI LANKA" 
              duration="3 Nights / 4 Days"
              imgClassName="aspect-[4/3]"
            />
            <GalleryItem 
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop" 
              alt="Dubai" 
              title="DUBAI" 
              duration="5 Nights / 6 Days"
              imgClassName="aspect-[4/5]"
            />
            <GalleryItem 
              src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=600&auto=format&fit=crop" 
              alt="Maldives" 
              title="MALDIVES" 
              duration="4 Nights / 5 Days"
              className="lg:translate-y-4"
              imgClassName="aspect-[3/4]"
            />
          </div>

          {/* Mobile Fallback */}
          <div className="col-span-12 mt-4 lg:hidden">
             <GalleryItem 
                src="https://images.unsplash.com/photo-1589136142558-90c0d94915e0?q=80&w=800&auto=format&fit=crop" 
                alt="Andaman" 
                title="ANDAMAN" 
                duration="4 Nights / 5 Days"
                imgClassName="aspect-[16/9]"
              />
          </div>

        </div>
      </div>
    </section>
  );
};

export default GallerySection;
