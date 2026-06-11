
import React from 'react';

const WideBanner: React.FC = () => {
  return (
    <section className="w-full h-[300px] md:h-[450px] overflow-hidden relative group">
      {/* Edge-to-edge background image with cinematic transition */}
      
      
      {/* Artistic Overlay - Subtle Vignette and Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/10 via-transparent to-brand-dark/30"></div>
    </section>
  );
};

export default WideBanner;
