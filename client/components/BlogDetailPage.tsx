
import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import blogPosts from "../components/BlogList.tsx";


// interface BlogDetailPageProps {
//   blog: any;
//   onBack: () => void;
// }

const BlogDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogPosts.find(b => b.id === Number(id));

  if (!blog) {
    return <div className="p-20 text-center">Blog Not Found</div>;
  }
  // Logic to simplify the title: Take the portion before a colon if it exists, 
  // keeping the hero section minimal and punchy.
  const simplifiedTitle = blog.title.includes(':')
    ? blog.title.split(':')[0]
    : blog.title;

  // Condensed content to ensure height balance with the featured image
  const contentParagraphs = [
    "In the rapidly evolving world of technology, artificial intelligence has become a cornerstone of modern mobile experiences. Android users, in particular, have access to a vast ecosystem of AI-powered applications that can significantly enhance productivity, creativity, and daily life management.",
    "From advanced photography tools that use machine learning to perfect every shot, to intelligent virtual assistants that anticipate your needs, the landscape of travel apps is being transformed by AI. These applications are not just tools; they are intelligent companions that learn from your behavior and adapt to your unique workflow.",
    "One of the primary benefits of these AI-driven apps is their ability to automate mundane tasks. Whether it's sorting through emails, or providing real-time language translation, AI is making the impossible, possible. In this deep dive, we explore how cutting-edge algorithms make your next journey easier, faster, and more profound."
  ];

  return (
    <div className="min-h-screen bg-white text-brand-dark overflow-x-hidden">
      {/* Hero Header Section - Clean & Minimal as per reference */}
      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy"
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover brightness-[0.75] contrast-[1.05]"
          />
          {/* Transition Gradient (White fade at bottom) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white"></div>
        </div>

        {/* Hero Content Overlay - Simplified Title for minimal character density */}
        <div className="relative z-10 w-full max-w-5xl px-6 text-center">
          <h1 className="text-white text-4xl md:text-6xl lg:text-[84px] font-serif font-bold leading-[1.1] drop-shadow-lg max-w-4xl mx-auto tracking-tight">
            {simplifiedTitle}
          </h1>
        </div>
      </section>

      {/* Main Content Area - Layout where content height balances image height */}
      <main className="max-w-screen-xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16 items-start lg:items-stretch">

          {/* Left Side: Image Column */}
          <div className="w-full lg:w-5/12 flex flex-col h-full">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.01] h-full relative">
              <img loading="lazy"
                src={blog.image}
                className="w-full h-full object-cover aspect-[4/5]"
                alt="Exploration Visual"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-brand-dark/10 backdrop-blur-sm p-4 text-center italic text-white text-[10px] font-medium border-t border-white/10">
                Capturing the essence of 2025 travel trends.
              </div>
            </div>
          </div>

          {/* Right Side: Content Explanation Column - Height matched to image */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <div className="flex flex-col gap-8 h-full">
              <div className="space-y-6 flex-grow flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-brand-dark mb-4">{blog.title}</h2>
                {contentParagraphs.map((para, idx) => (
                  <p key={idx} className="text-[#64718C] text-lg md:text-xl leading-relaxed font-medium">
                    {para}
                  </p>
                ))}
              </div>

              {/* Conclusion / Footer of Post - Tucked within the height boundary */}
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 mt-auto">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/30">Share Story</span>
                  <div className="flex gap-4">
                    {['Twitter', 'LinkedIn'].map(p => (
                      <button key={p} className="text-[10px] font-bold text-brand-dark/40 hover:text-brand-gold transition-colors tracking-widest uppercase">{p}</button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => navigate("/blog")}
                  className="bg-brand-dark text-white px-8 py-3.5 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-brand-gold hover:text-brand-dark transition-all shadow-xl shadow-brand-dark/5"
                >
                  ← Back to Stories
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Subscription Footer - Clean & Professional */}
      <section className="bg-brand-bg py-24 px-6">
        <div className="max-w-5xl mx-auto text-center bg-white p-12 md:p-20 rounded-[3rem] border border-brand-dark/5 shadow-sm">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6">Join the Explorer's Club</h2>
          <p className="text-[#64718C] text-lg mb-10 max-w-xl mx-auto">Get monthly travel insights and early access to our exclusive tour packages directly in your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="bg-brand-bg border-none rounded-2xl px-6 py-4 text-brand-dark focus:ring-1 focus:ring-brand-gold/50 outline-none w-full"
            />
            <button className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-brand-gold transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
