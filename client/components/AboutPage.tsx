
import React from 'react';
import { ArrowUpRightIcon } from './Icons';

interface AboutPageProps {
  onBack: () => void;
  onBookClick?: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onBookClick }) => {
  const teamMembers = [
    {
      name: "Siddhartha Ghosh",
      role: "CEO & FOUNDER",
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=600&auto=format&fit=crop",
      bgClass: "bg-[#FBB03B]" // Mimicking the yellow background for the first card
    },
    {
      name: "Alizeh Khan",
      role: "HEAD OF OPERATIONS",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
      isBW: true
    },
    {
      name: "Marcus Thorne",
      role: "CHIEF LOGISTICS OFFICER",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
      isBW: true
    },
    {
      name: "Elena Rossi",
      role: "EXPERIENCE DESIGNER",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Header */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy"
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
            alt="About Our Journey"
            className="w-full h-full object-cover brightness-[0.7]"
          />
          <div className="absolute  bg-gradient-to-b from-brand-dark/40 to-brand-bg/90"></div>
        </div>

        <div className="relative z-10 text-center px-6 pt-[10px]">
          <div className="flex justify-center items-center gap-2 ">
            <span
              className="cursor-pointer text-white/70 font-bold text-[10px] tracking-[0.2em] uppercase hover:text-brand-gold transition-colors"
              onClick={onBack}
            >
              Home
            </span>
            <span className="text-white/40 text-[10px]">/</span>
            <span className="text-brand-gold font-bold text-[10px] tracking-[0.2em] uppercase">About Us</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-serif font-bold text-white  leading-tight tracking-tight">
            Our Journey
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed italic">
            "Connecting hearts with horizons since 1997."
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2">
            <p className="font-cursive text-brand-gold text-3xl md:text-4xl mb-4">
              Our humble beginnings
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-8 leading-tight">
              A Passion for <br /> <span className="brush-highlight">Exploration</span>
            </h2>
            <div className="space-y-6 text-brand-dark/70 text-base md:text-lg leading-relaxed">
              <p>
                Founded in 1997, Travelor began as a small family-run agency in the heart of Dubai with a single mission: to provide authentic, high-resonance travel experiences that go beyond the typical tourist paths.
              </p>
              <p>
                Today, we have evolved into a global travel logistics powerhouse, known for our precision planning and deep emotional connection to the destinations we serve. We believe that travel is more than just seeing new places; it's about seeing life with new eyes.
              </p>
              <p className="font-bold text-brand-dark italic">
                "We don't just book trips; we craft lifelong memories."
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl h-64 group relative">
                <img loading="lazy" src="/images/taj-mahal.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="India Taj Mahal" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="rounded-[2rem] overflow-hidden shadow-xl h-80 group relative">
                <img loading="lazy" src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Kerala Backwaters" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl h-80 group relative">
                <img loading="lazy" src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Dubai Skyline" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="rounded-[2rem] overflow-hidden shadow-xl h-64 group relative">
                <img loading="lazy" src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Dubai Desert" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-brand-dark py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-screen-2xl mx-auto text-center mb-20">
          <p className="font-cursive text-brand-gold text-3xl mb-4">What we stand for</p>
          <h2 className="text-white text-4xl md:text-6xl font-serif font-bold">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-screen-xl mx-auto">
          {[
            {
              title: "Excellence",
              desc: "We pursue the highest standards in logistics and customer service, ensuring every detail of your journey is perfect.",
              icon: "✨"
            },
            {
              title: "Integrity",
              desc: "Honesty and transparency are the foundations of our relationship with clients and local partners worldwide.",
              icon: "🛡️"
            },
            {
              title: "Adventure",
              desc: "We believe in the transformative power of the unknown and encourage our travelers to step outside their comfort zones.",
              icon: "🏔️"
            }
          ].map((value, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 text-center hover:bg-white/10 transition-all group">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">{value.icon}</div>
              <h3 className="text-white text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section - Recreated from Reference Image */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-start mb-16">
          <div>
            <p className="font-cursive text-brand-gold text-3xl mb-0">Our team</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark tracking-tight">Meet the Experts</h2>
          </div>
          <button className="flex items-center gap-2 bg-brand-gold text-brand-dark px-8 py-3 rounded-full font-bold text-[10px] tracking-[0.15em] uppercase shadow-[0_15px_30px_-5px_rgba(251,176,59,0.4)] hover:shadow-none hover:translate-y-0.5 transition-all">
            Join Our Team <span className="text-lg">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className={`aspect-[4/5] rounded-[3rem] overflow-hidden mb-6 shadow-sm border border-brand-dark/5 ${member.bgClass || 'bg-gray-100'}`}>
                <img loading="lazy"
                  src={member.image}
                  alt={member.name}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${member.isBW ? 'grayscale' : ''}`}
                />
              </div>
              <h4 className="text-xl font-bold text-brand-dark mb-1 leading-none">{member.name}</h4>
              <p className="text-[#8E95A5] text-[10px] font-bold uppercase tracking-[0.2em]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="bg-brand-gold rounded-[3.5rem] p-16 md:p-24 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-brand-dark text-4xl md:text-7xl font-serif font-bold mb-8">Ready to write your own story?</h2>
            <p className="text-brand-dark/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              Let us guide you through the most incredible landscapes the world has to offer. Your next adventure starts with a single click.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => onBookClick?.()}
                className="bg-brand-dark text-white px-16 py-5 rounded-full font-bold text-sm tracking-widest uppercase shadow-2xl hover:bg-brand-dark/90 transition-all"
              >
                Plan My Trip
              </button>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-brand-dark/5 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
