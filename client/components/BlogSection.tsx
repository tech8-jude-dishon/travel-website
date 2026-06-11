
import React from 'react';
import { ArrowUpRightIcon } from './Icons';

const blogs = [
  {
    id: 1,
    title: "Unveiling Hidden Wonders: 10 Destinations to Visit in 2025",
    author: "Alex Rivers",
    comments: "08",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "The Art of Slow Travel: Why Your Next Journey Should Be Longer",
    author: "Sophia Chen",
    comments: "14",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
  }
];

const BlogCard: React.FC<{ blog: typeof blogs[0]; onClick?: (blog: any) => void }> = ({ blog, onClick }) => {
  return (
    <div className="flex flex-col group">
      {/* Image Container */}
      <div className="rounded-[2rem] overflow-hidden mb-6 shadow-md transition-all duration-500 group-hover:shadow-xl">
        <img loading="lazy"
          src={blog.image}
          alt={blog.title}
          className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-6 mb-4 px-2">
        <div className="flex items-center gap-2 text-brand-dark/60 text-xs font-semibold">
          <svg className="w-4 h-4 text-brand-dark/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {blog.author}
        </div>
        <div className="flex items-center gap-2 text-brand-dark/60 text-xs font-semibold">
          <svg className="w-4 h-4 text-brand-dark/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comments ({blog.comments})
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-brand-dark mb-8 leading-tight px-2 group-hover:text-brand-gold transition-colors duration-300">
        {blog.title}
      </h3>

      {/* Button */}
      <div className="px-2">
        <button
          onClick={() => onClick?.(blog)}
          className="flex items-center gap-2 bg-brand-dark text-white px-8 py-3.5 rounded-full font-bold text-[10px] tracking-widest uppercase transition-all duration-300 hover:bg-[#1a3a7a] hover:shadow-lg active:scale-95"
        >
          Continue Reading <ArrowUpRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

interface BlogSectionProps {
  onViewAll?: () => void;
  onBlogClick?: (blog: any) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onViewAll, onBlogClick }) => {
  return (
    <section className="py-24 bg-brand-bg px-6 md:px-12 lg:px-24">
      {/* Centered Header */}
      <div className="max-w-screen-2xl mx-auto text-center mb-16">
        <p className="font-cursive text-brand-gold text-3xl md:text-4xl mb-4">
          news & blogs
        </p>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-6 leading-tight">
          Travel Stories & Insights
        </h2>
        <p className="text-brand-dark/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
          Stay updated with the latest travel trends, hidden destination guides, and expert tips from our seasoned explorers to help you plan your next perfect escape.
        </p>
      </div>

      {/* White Content Container */}
      <div className="max-w-screen-2xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-sm border border-brand-dark/5">

        {/* Container Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-brand-dark max-w-xl text-center md:text-left">
            Inspiration and insights to help you plan your next unforgettable journey better and faster.
          </h3>
          <button
            onClick={onViewAll}
            className="flex items-center gap-2 bg-brand-gold text-brand-dark px-8 py-4 rounded-full font-bold text-[10px] tracking-widest uppercase shadow-md shadow-brand-gold/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
          >
            Read All Posts <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onClick={onBlogClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
