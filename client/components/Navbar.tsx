import React, { useState, useEffect } from 'react';
import {
  ChevronDownIcon, ArrowUpRightIcon, MenuIcon, CloseIcon
} from './Icons';
import {
  Home, Umbrella, Plane, Luggage, ShoppingBag,
  MessageSquare, Send, ChevronDown
} from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { WINTER_PACKAGES, servicePath } from '../data/winterPackages';

interface NavbarProps {
  onBookClick?: () => void;
  onNavigate?: (view: string) => void;
  currentView?: 'home' | 'destinations' | 'packages' | 'about' | 'blog' | 'contact' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick, onNavigate }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // After picking a package the pointer is still over the menu and the link keeps focus,
  // so hover/focus-within would hold it open; stay shut until the pointer leaves.
  const [dropdownClosed, setDropdownClosed] = useState(false);

  const closeDropdown = () => {
    (document.activeElement as HTMLElement | null)?.blur();
    setDropdownClosed(true);
  };

  // Forced to white background as requested
  const isSolid = true;

  const handleMobileNav = (view: any) => {
    onNavigate?.(view);
    setIsMenuOpen(false);
  };

  // India's dropdown: India Tours, the services overview, then the winter package pages
  const indiaMenu = [
    { label: 'India Tours', path: '/india-tours' },
    { label: 'All Destinations', path: '/services' },
    ...WINTER_PACKAGES.map((p) => ({ label: p.tab, path: servicePath(p.id) })),
  ];

  const isItemActive = (path: string) =>
    path === '/india-tours'
      ? location.pathname.startsWith('/india-tours') || location.pathname.startsWith('/services')
      : location.pathname === path;

  const menuItems: { label: string; path: string; icon: React.ElementType; hasPackages?: boolean }[] = [
    { label: 'Home', path: '/', icon: Home },
    // { label: 'Holidays', path: '/holidays', icon: Umbrella },
    { label: 'Dubai', path: '/dubai-tours', icon: Plane },
    { label: 'India', path: '/india-tours', icon: Luggage, hasPackages: true },
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
        <div className="max-w-[1440px] mx-auto flex items-center p-[10px] lg:p-0 lg:px-6 lg:h-20">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src="/images/logo.webp"
              width={280}
              height={160}
              alt="Global Connect"
              className="h-[50px] lg:h-16 w-auto object-contain"
            />
          </Link>

          {/* Spacer 1 */}
          <div className="flex-1" />

          {/* Centered Pill Navigation */}
          <nav className="hidden lg:flex items-center gap-3">
            {menuItems.map((item) => {
              const isActive = isItemActive(item.path);
              const Icon = item.icon;
              if (item.hasPackages) {
                return (
                  <div key={item.path} className="relative group" onMouseLeave={() => setDropdownClosed(false)}>
                    <Link
                      to={item.path}
                      onClick={closeDropdown}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2
                        ${isActive
                          ? 'bg-[#00A9D7] border-[#00A9D7] text-white'
                          : 'bg-transparent border-[#00A9D7] text-[#00A9D7] hover:bg-[#00A9D7]/5'
                        }`}
                    >
                      <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-[#00A9D7]'}`} />
                      <span className="leading-tight">{item.label}</span>
                      <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:rotate-180" />
                    </Link>

                    {/* Hover dropdown: India Tours + winter packages */}
                    <div className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 z-[1200] opacity-0 invisible translate-y-1 transition-all duration-200 ${dropdownClosed ? '' : 'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0'}`}>
                      <div className="flex flex-col min-w-[220px] whitespace-nowrap bg-white rounded-2xl py-2 shadow-xl border border-slate-100">
                        {indiaMenu.map((m) => {
                          const isCurrent = location.pathname === m.path;
                          return (
                            <Link
                              key={m.path}
                              to={m.path}
                              onClick={closeDropdown}
                              className={`px-5 py-2.5 text-[15px] font-semibold transition-colors duration-200
                                ${isCurrent
                                  ? 'bg-[#00A9D7]/10 text-[#00A9D7]'
                                  : 'text-slate-600 hover:text-[#00A9D7] hover:bg-[#00A9D7]/5'
                                }`}
                            >
                              {m.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
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
      <div className={`fixed top-0 right-0 w-[80%] md:w-[30%] h-full overflow-y-auto z-[1120] bg-white pt-[50px] pb-6 px-6 shadow-2xl transition-transform duration-500 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#00A9D7] hover:bg-slate-50 rounded-xl"
        >
          <CloseIcon className="w-8 h-8" />
        </button>
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const isActive = isItemActive(item.path);
            const Icon = item.icon;
            if (item.hasPackages) {
              return (
                <div key={item.path} className={`rounded-2xl border-2 ${isActive ? 'border-[#00A9D7]' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-4 p-4 font-bold text-[#00A9D7]">
                    <Icon className="w-6 h-6" />
                    {item.label}
                  </div>
                  <div className="flex flex-col gap-1 px-3 pb-3">
                    {indiaMenu.map((m) => {
                      const isCurrent = location.pathname === m.path;
                      return (
                        <Link
                          key={m.path}
                          to={m.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`px-4 py-2.5 rounded-full text-sm font-semibold
                            ${isCurrent ? 'bg-[#0B5C9E] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          {m.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }
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
