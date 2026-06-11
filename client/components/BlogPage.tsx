
import React from 'react';
import { ArrowUpRightIcon } from './Icons';
import { useNavigate } from "react-router-dom";

interface BlogItem {
  id: number;
  title: string;
  author: string;
  comments: string;
  image: string;
}

const blogPosts: BlogItem[] = [
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
  },
  {
    id: 3,
    title: "Hidden Gems: Exploring the Undiscovered Europe",
    author: "Alize Rossi",
    comments: "12",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "The Ultimate Guide to Desert Safari Adventures",
    author: "Marcus Thorne",
    comments: "07",
    image: "https://images.unsplash.com/photo-1452022582947-af526465192c?q=80&w=800&auto=format&fit=crop",
  }
];

const BlogCard: React.FC<{ blog: BlogItem; onClick?: (blog: any) => void }> = ({ blog, onClick }) => {

  return (
    <div className="flex flex-col group animate-fade-in-up">
      {/* Image Container - Matches reference rounded-corner design */}
      <div className="rounded-[2.5rem] overflow-hidden mb-8 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
        <img loading="lazy"
          src={blog.image}
          alt={blog.title}
          className="w-full aspect-[1.8/1] object-cover transition-transform duration-[1.5s] group-hover:scale-110"
        />
      </div>

      {/* Meta Info - Matches reference layout with icons */}
      <div className="flex items-center gap-6 mb-4 px-2">
        <div className="flex items-center gap-2 text-[#8E95A5] text-xs font-bold">
          <svg className="w-4 h-4 text-[#8E95A5]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {blog.author}
        </div>
        <div className="flex items-center gap-2 text-[#8E95A5] text-xs font-bold">
          <svg className="w-4 h-4 text-[#8E95A5]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comments ({blog.comments})
        </div>
      </div>

      {/* Title - Bold sans-serif as seen in reference */}
      <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8 leading-tight px-2 group-hover:text-brand-gold transition-colors duration-300">
        {blog.title}
      </h3>

      {/* Button - Navy blue rounded pill from reference */}
      <div className="px-2">
        <button
          onClick={() => onClick?.(blog)}
          className="flex items-center gap-3 bg-[#0F2454] text-white px-8 py-4 rounded-full font-bold text-[10px] tracking-widest uppercase transition-all duration-300 hover:bg-brand-gold hover:text-brand-dark hover:shadow-xl active:scale-95 shadow-lg shadow-brand-dark/10"
        >
          CONTINUE READING <span className="text-sm">→</span>
        </button>
      </div>
    </div>
  );
};

interface BlogPageProps {
  onBack: () => void;
  onBlogClick?: (blog: any) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack, onBlogClick }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Header Section - High impact background matching page theme */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy"
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
            alt="News and Blog"
            className="w-full h-full object-cover brightness-[0.6]"
          />
          <div className="absolute  bg-gradient-to-b from-brand-dark/70 via-brand-dark/30 to-brand-bg"></div>
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
            <span className="text-brand-gold font-bold text-[10px] tracking-[0.2em] uppercase">News & Blogs</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-serif font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl animate-fade-in-up">
            Latest Blogs
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg text-xl font-medium leading-relaxed italic drop-shadow-md animate-fade-in-up delay-200">
            "Insights, stories, and expertise from the heart of global travel."
          </p>
        </div>
      </section>

      {/* Blog Feed Grid */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {blogPosts.map((blog) => (
            <BlogCard key={blog.id}
              blog={blog}
              onClick={() => navigate(`/blog/${blog.id}`)} />
          ))}
        </div>

        {/* Newsletter / CTA Banner */}

      </div>
    </div>
  );
};

export default BlogPage;
