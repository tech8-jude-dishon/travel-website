import React, { useState, useEffect } from 'react';
import {
  ChevronDownIcon, ArrowUpRightIcon, MenuIcon, CloseIcon
} from './Icons';
import {
  Home, Umbrella, Plane, Luggage, ShoppingBag,
  MessageSquare, Send
} from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  onBookClick?: () => void;
  onNavigate?: (view: string) => void;
  currentView?: 'home' | 'destinations' | 'packages' | 'about' | 'blog' | 'contact' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick, onNavigate }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Forced to white background as requested
  const isSolid = true;

  const handleMobileNav = (view: any) => {
    onNavigate?.(view);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    // { label: 'Holidays', path: '/holidays', icon: Umbrella },
    { label: 'Dubai', path: '/dubai-tours', icon: Plane },
    { label: 'India', path: '/india-tours', icon: Luggage },
    // { label: 'Packages', path: '/packages', icon: ShoppingBag },
    { label: 'Contact', path: '/contact', icon: MessageSquare },
  ];

  return (
    <>
      {/* <header
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-500 py-4 px-6 global-page-container bg-white shadow-md`}
      >
        <div className="w-full flex items-center justify-between">
       
          <Link
            to="/"
            className="cursor-pointer group shrink-0"
          >
            <img loading="lazy"
              src="https://globalconnectworldtravel.com/img/logo.png"
              alt="Global Connect"
              className="h-12 md:h-24 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

       
          <nav className="hidden lg:flex items-center px-8 py-2.5 rounded-full border border-brand-dark/10 bg-brand-dark/5 transition-all duration-300">
            <ul className="flex items-center gap-10 text-sm xl:text-base font-bold text-brand-dark">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`cursor-pointer transition-colors ${location.pathname === item.path
                      ? 'text-brand'
                      : 'text-black'
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

         
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => onBookClick?.()}
              className="hidden sm:flex items-center gap-2  bg-brand-dark text-white px-6 md:px-8 py-3 rounded-full font-bold text-xs md:text-[13px] tracking-wider shadow-lg shadow-brand-gold/20 hover:bg-brand-gold/90 hover:-translate-y-0.5 transition-all duration-300 uppercase"
            >
              ENQUIRE NOW <ArrowUpRightIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-brand-dark/5 text-brand-dark hover:bg-brand-dark/10 transition-all duration-300"
            >
              {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header> */}


      {/* <div
        className={`fixed inset-0 z-[60] bg-brand-dark transition-all duration-500 flex flex-col items-center justify-center p-8 lg:hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
      >
        <nav className="w-full flex flex-col items-center gap-8 relative z-10">
          <ul className="flex flex-col items-center gap-6">
            {menuItems.map((item, idx) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                   onClick={() => setIsMenuOpen(false)}
                  className={`text-3xl md:text-4xl font-serif font-bold transition-all duration-300 transform cursor-pointer ${location.pathname === item.path
                    ? 'text-brand-gold'
                    : 'text-white'
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="w-full max-xs mt-8 flex flex-col gap-4">
            <button
               onClick={() => { onBookClick?.(); setIsMenuOpen(false); }}
              className="w-full  bg-brand-dark text-white py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-2xl"
            >
              BOOK NOW
            </button>
          </div>
        </nav>
      </div> */}

      <header className="  relative z-[1100] bg-white  shadow-sm">
        <div className="max-w-[1440px] mx-auto flex items-center p-[10px] lg:p-0 lg:px-6 lg:h-28">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img loading="lazy"
              src="/images/logo.png"
              alt="Global Connect"
              className="h-[50px] lg:h-20 w-auto object-contain"
            />
          </Link>

          {/* Spacer 1 */}
          <div className="flex-1" />

          {/* Centered Pill Navigation */}
          <nav className="hidden lg:flex items-center gap-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2
                    ${isActive
                      ? 'bg-[#00A9D7] border-[#00A9D7] text-white'
                      : 'bg-transparent border-[#00A9D7] text-[#00A9D7] hover:bg-[#00A9D7]/5'
                    }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-[#00A9D7]'}`} />
                  <span className="whitespace-pre-line leading-tight text-left">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Spacer 2 */}
          <div className="flex-1" />

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onBookClick?.()}
              className="hidden sm:flex items-center gap-2 bg-[#00A9D7] text-white px-8 h-[48px] rounded-full font-bold text-sm shadow-lg hover:bg-[#00A9D7]/90 transition-all duration-300 uppercase shrink-0"
            >
              Plan My Tour
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#00A9D7]"
            >
              {isMenuOpen ? <CloseIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1110] lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu (simplified for redesign) */}
      <div className={`fixed top-0 right-0 w-[80%] md:w-[30%] h-full z-[1120] bg-white pt-[50px] pb-6 px-6 shadow-2xl transition-transform duration-500 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#00A9D7] hover:bg-slate-50 rounded-xl"
        >
          <CloseIcon className="w-8 h-8" />
        </button>
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl font-bold border-2
                  ${isActive ? 'bg-[#00A9D7] border-[#00A9D7] text-white' : 'border-slate-100 text-[#00A9D7]'}`}
              >
                <Icon className="w-6 h-6" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
