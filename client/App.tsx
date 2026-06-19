
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SubHome from './components/SubHome';
import { getWhatsAppLink } from './utils/whatsapp';
import { slugify } from './utils/slugify';

const DestinationsPage = React.lazy(() => import('./components/DestinationsPage'));
const DubaiToursPage = React.lazy(() => import('./components/DubaiToursPage'));
const DubaiInternationalToursPage = React.lazy(() => import('./components/DubaiInternationalToursPage'));
const DubaiLocalToursPage = React.lazy(() => import('./components/DubaiLocalToursPage'));
const IndiaToursPage = React.lazy(() => import('./components/IndiaToursPage'));
const IndiaInternationalToursPage = React.lazy(() => import('./components/IndiaInternationalToursPage'));
const IndiaLocalToursPage = React.lazy(() => import('./components/IndiaLocalToursPage'));
const PackagesPage = React.lazy(() => import('./components/PackagesPage'));
const HolidaysPage = React.lazy(() => import('./components/HolidaysPage'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const SearchPage = React.lazy(() => import('./components/SearchPage'));
const BlogPage = React.lazy(() => import('./components/BlogPage'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));
const PackageDetailPage = React.lazy(() => import('./components/PackageDetailPage'));
const BlogDetailPage = React.lazy(() => import('./components/BlogDetailPage'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const TermsAndConditions = React.lazy(() => import('./components/TermsAndConditions'));
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));


function RouteSync() {
  const location = useLocation();

  useEffect(() => {
    window.parent.postMessage(
      { path: location.pathname },
      "*"
    );
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}


const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'destinations' | 'packages' | 'about' | 'search' | 'blog' | 'contact' | 'package-detail' | 'blog-detail' | 'admin'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const navigateTo = (view: string) => {
    if (view.startsWith('/')) {
      navigate(view);
      return;
    }

    const pathMap: Record<string, string> = {
      home: '/',
      destinations: '/destinations',
      packages: '/packages',
      about: '/about',
      aboutus: '/about',
      blog: '/blog',
      contact: '/contact',
      search: '/search',
      admin: '/admin'
    };

    const normalizedView = view.toLowerCase().replace(/\s/g, '');
    const path = pathMap[normalizedView] || pathMap[view] || '/';
    navigate(path);
    setCurrentView(view as any);
  };
  const handleSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    if (q === 'india') {
      navigate('/india-tours');
    } else if (q === 'dubai') {
      navigate('/dubai-tours');
    } else {
      setSearchQuery(query);
      navigateTo('search');
    }
  };
  const toggleBooking = () => setIsBookingOpen(!isBookingOpen);
  const handlePackageClick = (tour: any) => {
    const slug = slugify(tour.title);
    navigate(`/tour/${slug}`);
  };
  const handleBlogClick = (blog: any) => {
    setSelectedBlog(blog);
    navigateTo(`/blog/${blog.id}`);
  };

  return (
    
    <AuthProvider>
      <RouteSync />
      <div className="min-h-screen bg-brand-bg relative w-full overflow-x-clip">
        {location.pathname !== '/admin' && (
          <Navbar
            onNavigate={navigateTo}
            onBookClick={toggleBooking}
            currentView={currentView as any}
          />
        )}

        <main className="w-full">
          <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#1B6B93] border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SubHome
                      onExplore={handlePackageClick}
                      onBookClick={toggleBooking}
                    />

                  </>
                }
              />

              <Route
                path="/destinations"
                element={<DestinationsPage onBack={() => navigate("/")} onBookClick={toggleBooking} />}
              />

              <Route
                path="/dubai-tours"
                element={<DubaiToursPage onBack={() => navigate("/")} onExplore={handlePackageClick} onBookClick={toggleBooking} />}
              />

              <Route
                path="/dubai-tours/international"
                element={<DubaiInternationalToursPage onExplore={handlePackageClick} onBookClick={toggleBooking} />}
              />

              <Route
                path="/dubai-tours/local"
                element={<DubaiLocalToursPage onExplore={handlePackageClick} onBookClick={toggleBooking} />}
              />

              <Route
                path="/india-tours"
                element={<IndiaToursPage onBack={() => navigate("/")} onExplore={handlePackageClick} onBookClick={toggleBooking} />}
              />

              <Route
                path="/india-tours/international"
                element={<IndiaInternationalToursPage onExplore={handlePackageClick} onBookClick={toggleBooking} />}
              />

              <Route
                path="/india-tours/local"
                element={<IndiaLocalToursPage onExplore={handlePackageClick} onBookClick={toggleBooking} />}
              />

              <Route
                path="/packages"
                element={<PackagesPage onBack={() => navigate("/")}
                  onExplore={handlePackageClick} onBookClick={toggleBooking} />}
              />

              <Route
                path="/holidays"
                element={<HolidaysPage onBack={() => navigate("/")}
                  onExplore={handlePackageClick} onBookClick={toggleBooking} />}
              />

              <Route
                path="/about"
                element={<AboutPage onBack={() => navigate("/")} onBookClick={toggleBooking} />}
              />

              <Route
                path="/search"
                element={<SearchPage query={searchQuery} onBack={() => navigate("/")} />}
              />

              <Route
                path="/blog"

                element={<BlogPage onBack={() => navigate("/")} onBlogClick={handleBlogClick} />}
              />

              <Route
                path="/contact"
                element={<ContactPage onBack={() => navigate("/")} />}
              />

              <Route
                path="/package/:id"
                element={<PackageDetailPage onBookClick={toggleBooking} />}
              />

              <Route
                path="/tour/:id"
                element={<PackageDetailPage onBookClick={toggleBooking} />}
              />

              <Route
                path="/blog/:id"
                element={<BlogDetailPage />}
              />

              <Route
                path="/admin"
                element={<AdminDashboard onBack={() => navigate("/")} />}
              />
              <Route
                path="/terms"
                element={<TermsAndConditions />}
              />
              <Route
                path="/privacy"
                element={<PrivacyPolicy />}
              />
              <Route
                path="/subhome"
                element={<SubHome onExplore={handlePackageClick} onBookClick={toggleBooking} />}
              />

            </Routes>
          </React.Suspense>
        </main>

        {location.pathname !== '/admin' && (
          <Footer onContactClick={toggleBooking} onNavigate={navigateTo} />
        )}
        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />



        {location.pathname !== '/admin' && (
          <a
            href={getWhatsAppLink('Hi! I would like to enquire about your travel packages.')}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-[60px] right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-50 hover:-translate-y-2"
            style={{ backgroundColor: '#25D366' }}
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.003 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.358.632 4.663 1.832 6.678L2.667 29.333l6.823-1.789A13.267 13.267 0 0 0 16.003 29.333C23.365 29.333 29.333 23.363 29.333 16c0-7.363-5.968-13.333-13.33-13.333Zm0 24.267a11.006 11.006 0 0 1-5.61-1.536l-.402-.238-4.046 1.06 1.08-3.938-.262-.414A10.976 10.976 0 0 1 5.001 16c0-6.068 4.937-11.001 11.002-11.001C22.069 4.999 27 9.932 27 16c0 6.066-4.931 10.934-10.997 10.934Zm6.03-8.197c-.33-.166-1.953-.963-2.256-1.072-.303-.11-.523-.165-.743.166-.22.33-.852 1.072-1.044 1.292-.193.22-.385.247-.715.083-.33-.165-1.394-.514-2.656-1.638-.982-.875-1.645-1.955-1.838-2.285-.193-.33-.02-.509.145-.673.149-.148.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.743-1.79-1.018-2.45-.268-.643-.54-.555-.743-.565l-.633-.011c-.22 0-.578.083-.881.413-.303.33-1.155 1.128-1.155 2.75s1.183 3.19 1.348 3.41c.165.22 2.328 3.556 5.643 4.988.789.34 1.404.543 1.884.695.791.252 1.511.216 2.08.131.635-.094 1.953-.798 2.228-1.568.275-.77.275-1.43.193-1.568-.083-.138-.303-.22-.633-.385Z" />
            </svg>
          </a>
        )}

        {/* <button onClick={scrollTop} className={`fixed bottom-8 right-8 w-14 h-14 bg-brand-dark text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-50 hover:bg-brand-gold hover:-translate-y-2 ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button> */}
      </div>
    </AuthProvider>
  );
};

export default App;
