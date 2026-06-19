
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRightIcon, LocationIcon, CalendarIcon, PhoneIcon } from './Icons';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Check, Star, MapPin, Calendar, Users, Camera, Utensils, Building2, Car, UserCheck, Sparkles, Heart, Download, Share2, Info, Plus, Minus, Hotel, ChevronRight, Ticket, CreditCard, Percent, Tag, Plane, Clock, ChevronDown, ChevronUp, Compass, X } from 'lucide-react';
import listData from '../components/PackageList.tsx';
import { popularTours } from './PopularToursSection';
import { indiaTours } from './IndiaToursSection';
import { popularDestinations } from './PopularDestinationsSection';
import { slugify } from '../utils/slugify';
import { packages, packageEnquiries, resolveImageUrl } from '../lib/apiClient';
import { PACKAGES as subhomePackages, TOURS as trendingSubhomeTours } from './SubHome';


interface PackageDetailPageProps {
  onBookClick?: () => void;
}

const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ onBookClick }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [packageData, setPackageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackageData = async () => {
      setIsLoading(true);
      try {
        // Build query safely to avoid type mismatch errors
        let data = null;

        if (id) {
          try {
            // Try fetching by numeric id or slug directly from the API
            data = await packages.getById(id);
          } catch {
            // If not found by id/slug, search all packages
            const allTours = await packages.getAll();
            data = allTours.find((t: any) => slugify(t.title) === id || t.slug === id) ?? null;
          }
        }

        if (data) {
          setPackageData(data);
        } else {
          // Check static data if not found in dynamic (for gradual rollout)
          const staticMatch = [
            ...listData, ...popularTours, ...indiaTours, ...popularDestinations, ...subhomePackages, ...trendingSubhomeTours
          ].find(p => p.id?.toString() === id || slugify(p.title) === id);

          if (staticMatch) setPackageData(staticMatch);
        }
      } catch (err) {
        console.error('Error fetching package:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackageData();
  }, [id]);

  const allImages = React.useMemo(() => {
    if (!packageData) return [];
    return Array.from(new Set([packageData.image_url || packageData.image, ...(packageData.gallery || [])])).filter(Boolean);
  }, [packageData]);

  const [selectedImage, setSelectedImage] = useState('');
  const [direction, setDirection] = useState(0);
  const [openDay, setOpenDay] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFlyer, setShowFlyer] = useState(false);

  useEffect(() => {
    if (packageData) {
      setSelectedImage(packageData.image_url || packageData.image);
      setFormData(prev => ({
        ...prev,
        package_id: packageData.id?.toString() || '',
        package_name: packageData.title || ''
      }));
    }
  }, [packageData?.id]);

  const handleImageChange = (newImage: string, index: number) => {
    const currentIndex = allImages.indexOf(selectedImage);
    setDirection(index > currentIndex ? 1 : -1);
    setSelectedImage(newImage);
  };

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    travel_date: '',
    phone: '',
    package_id: packageData?.id || '',
    package_name: packageData?.title || ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  if (isLoading) {
    return <div className="p-20 text-center py-40 flex flex-col items-center"><div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mb-4"></div><p className="font-serif italic text-brand-dark/40">Discovering your journey...</p></div>;
  }

  if (!packageData) {
    return <div className="p-20 text-center py-40"><h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">Package Not Found</h2><Link to="/" className="text-brand-gold font-bold underline">Return Home</Link></div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await packageEnquiries.submit({
        package_id: formData.package_id,
        package_title: formData.package_name,
        name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        travel_date: formData.travel_date,
      });

      setIsSubmitted(true);
      setFormData({
        full_name: '',
        email: '',
        travel_date: '',
        phone: '',
        package_id: packageData.id,
        package_name: packageData.title
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err: any) {
      console.error('Error submitting enquiry:', err);
      setError(err.message || 'Failed to send enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Hero Section */}
      <div className="w-full h-[40vh] flex items-center relative overflow-hidden" style={{
        backgroundImage: "url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774933647/PackageDetailBg_compressed_rzm1uo.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-14 relative z-10 ">
          <div className="flex flex-col lg:gap-8 max-w-5xl">
            {/* Title */}
            <h1 className="text-3xl text-center lg:text-left lg:text-[50px] font-sans font-black text-white leading-[1] tracking-tight drop-shadow-2xl">
              {packageData.title}
            </h1>

            {/* Bottom row: Info Icons */}
            <div className="flex flex-wrap items-center lg:gap-10 gap-4 text-white/95 font-bold text-lg mt-4">
              {/* <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span>{packageData.location}</span>
              </div> */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span>{packageData.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span>{packageData.guest || '4-6 guest'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumbs */}
        {/* <div className="text-xs font-bold text-slate-500 mb-8 flex flex-wrap items-center gap-2 lowercase capitalize">
          <Link to="/" className="text-[#00A9D7] hover:underline">Home</Link>
          <span className="text-slate-400">›</span>
          <Link to="/india-tours" className="text-[#00A9D7] hover:underline">India Tour Packages</Link>
          <span className="text-slate-400">›</span>
          <span className="text-[#00A9D7] cursor-pointer hover:underline">{packageData.location} Tour Packages</span>
          <span className="text-slate-400">›</span>
          <span className="text-slate-500">{packageData.title}</span>
        </div> */}

        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-10 pb-8 border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="space-y-3">
              {packageData.location && (
                <p className="flex items-center gap-1.5 text-[12px] font-medium tracking-wide text-slate-400">
                  <MapPin className="w-3.5 h-3.5" /> {packageData.location}
                </p>
              )}
              <h1 className="text-3xl md:text-[42px] font-serif font-semibold text-slate-900 tracking-tight leading-[1.1]">{packageData.title}</h1>
            </div>
            {packageData.flyer_url && (
              <button
                type="button"
                onClick={() => setShowFlyer(true)}
                className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-700 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] hover:border-slate-900 hover:text-slate-900 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Flyer
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-5 text-slate-500">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#FFB100] text-[#FFB100]" />
              <span className="text-slate-900 font-semibold text-sm">{packageData.rating?.split(' ')[0] || '4.8'}</span>
              <span className="text-slate-400 text-sm font-normal">({packageData.rating?.match(/\(([^)]+)\)/)?.[1] || '124'} reviews)</span>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <div className="flex items-center gap-2 text-[13px] font-medium tracking-wide">
              <Calendar className="w-4 h-4 text-slate-400" /> {packageData.duration}
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <button className="flex items-center gap-2 text-[13px] font-medium tracking-wide hover:text-slate-900 transition-colors">
              <Share2 className="w-4 h-4 text-slate-400" /> Share
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="flex flex-col md:flex-row gap-3 h-auto md:h-[500px] w-full group/gallery mb-14">
          {/* Left: Main Large Image */}
          <div className="w-full md:w-1/2 relative h-[350px] md:h-auto overflow-hidden rounded-xl">
            <img loading="lazy"
              src={allImages[0]}
              alt={packageData.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right: 2x2 Grid */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 h-[450px] md:h-auto">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="relative overflow-hidden rounded-xl">
                <img loading="lazy"
                  src={allImages[idx] || allImages[0]}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />

              </div>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Overview & Highlights (68%) */}
          <div className="w-full lg:w-[68%] space-y-12">
            {/* Main Tabs */}
            <div className="overflow-x-auto overflow-y-hidden border-b border-slate-200 mb-10">
              <div className="flex items-center gap-8 min-w-max">
                {['OVERVIEW', 'ITINERARY', 'INCLUSIONS', 'REVIEWS'].map((tab) => (
                  <button
                    key={tab}
                    className={`text-[12px] font-semibold uppercase tracking-[0.18em] pb-4 transition-colors relative whitespace-nowrap ${activeTab === tab.toLowerCase()
                      ? 'text-slate-900'
                      : 'text-slate-400 hover:text-slate-600'
                      }`}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase() && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-px left-0 right-0 h-0.5 bg-slate-900"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="space-y-10 min-h-[400px]">
              {activeTab === 'overview' && (
                <div className="space-y-14 animate-in fade-in duration-500">
                  {/* Overview */}
                  <div className="space-y-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">About this tour</p>
                    <h2 className="text-[28px] md:text-[34px] font-serif font-semibold text-slate-900 tracking-tight">Tour Overview</h2>
                    <div className="w-12 h-px bg-slate-300" />
                    <div className="space-y-5 text-slate-600 text-[17px] leading-[1.85] font-normal max-w-3xl">
                      <p>
                        {packageData.overview || `Experience the breathtaking beauty of ${packageData.location} with our specially curated tour package. This journey is designed to offer an unparalleled experience, blending adventure with relaxation as you explore the most stunning landscapes and hidden gems of the region.`}
                      </p>
                      {!packageData.overview && (
                        <p>
                          Whether you're looking for a romantic getaway, a family adventure, or a solo exploration,
                          this {packageData.duration} package ensures you see the best of what {packageData.location} has to offer.
                          From premium accommodations to expert-guided tours, every detail is handled for your comfort and enjoyment.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">What's included in the experience</p>
                    <h2 className="text-[28px] md:text-[34px] font-serif font-semibold text-slate-900 tracking-tight">Highlights</h2>
                    <div className="w-12 h-px bg-slate-300" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-slate-100 mt-2">
                      {(packageData.highlights || [
                        "Spectacular scenic views throughout the journey",
                        "Complimentary welcome drinks and local snacks",
                        "Professional guide for all sightseeing tours",
                        "Premium airport and intercity transfers",
                        "Chance to explore hidden local attractions",
                        "Luxury accommodation in top-rated hotels"
                      ]).map((highlight: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3.5 py-4 border-b border-slate-100">
                          <Check className="w-[18px] h-[18px] text-[#00A9D7] shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="text-slate-700 font-medium text-[15px] leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="space-y-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">Day by day plan</p>
                    <h2 className="text-[28px] md:text-[34px] font-serif font-semibold text-slate-900 tracking-tight">Itinerary</h2>
                    <div className="w-12 h-px bg-slate-300" />
                  </div>
                  <div className="relative pl-1">
                    <div className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-200" />
                    <div className="space-y-10">
                      {(packageData.itinerary || [
                        { title: "Departure & Sunset Cruise", description: "Board the luxury yacht at the marina. Enjoy a welcome reception as we set sail. Experience the spectacular sunset with live music and dinner." },
                        { title: "Coastal Exploration", description: "Wake up to ocean views and enjoy a gourmet breakfast. Anchor near a secluded cove for swimming and paddleboarding. Evening features a dinner under the stars." },
                        { title: "Return Journey", description: "Morning yoga session on the deck followed by brunch. Leisurely cruise back to the marina, arriving by early afternoon with unforgettable memories." }
                      ]).map((item: any, i: number) => (
                        <div key={i} className="relative pl-12 group">
                          <div className="absolute left-0 top-0 w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-500 text-[13px] font-semibold z-10">
                            {i + 1}
                          </div>
                          <div className="space-y-2">
                            <div className="text-lg font-serif font-semibold text-slate-900">Day {i + 1} · {item.title}</div>
                            <p className="text-slate-600 text-[15px] font-normal leading-relaxed max-w-2xl">
                              {item.detail || item.description || "Explore the local attractions and enjoy the scenic beauty of the region."}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="space-y-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">What's covered</p>
                    <h2 className="text-[28px] md:text-[34px] font-serif font-semibold text-slate-900 tracking-tight">Inclusions &amp; Exclusions</h2>
                    <div className="w-12 h-px bg-slate-300" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 pt-2">
                    {/* Included */}
                    <div>
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-1">Included</h3>
                      <div className="border-t border-slate-100">
                        {(packageData.inclusions || [
                          "2 nights luxury cabin accommodation",
                          "All meals (Breakfast, Lunch, Dinner)",
                          "Welcome drinks and snacks",
                          "Use of water sports equipment",
                          "Professional guide and crew"
                        ]).map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3.5 py-3.5 border-b border-slate-100">
                            <Check className="w-[18px] h-[18px] text-slate-800 shrink-0 mt-0.5" strokeWidth={2.5} />
                            <span className="text-slate-700 font-medium text-[15px] leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Excluded */}
                    <div>
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-1">Not Included</h3>
                      <div className="border-t border-slate-100">
                        {(packageData.exclusions || [
                          "Flights to/from departure point",
                          "Premium alcoholic beverages",
                          "Personal expenses",
                          "Travel insurance",
                          "Gratuities for crew"
                        ]).map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3.5 py-3.5 border-b border-slate-100">
                            <X className="w-[18px] h-[18px] text-slate-300 shrink-0 mt-0.5" strokeWidth={2.5} />
                            <span className="text-slate-500 font-medium text-[15px] leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-10 animate-in fade-in duration-500">
                  <div className="space-y-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">Traveller stories</p>
                    <h2 className="text-[28px] md:text-[34px] font-serif font-semibold text-slate-900 tracking-tight">Guest Reviews</h2>
                    <div className="w-12 h-px bg-slate-300" />
                  </div>

                  <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
                    <div className="text-5xl font-serif font-semibold text-slate-900">4.8</div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FFB700] text-[#FFB700]" />)}
                        <Star className="w-4 h-4 text-slate-200 fill-slate-200" />
                      </div>
                      <p className="text-xs font-medium text-slate-400 tracking-wide">Based on 124 reviews</p>
                    </div>
                  </div>

                  <div className="space-y-0 divide-y divide-slate-100">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="py-8 first:pt-0 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-serif font-semibold text-slate-900">Sarah Johnson</h4>
                          <span className="text-xs font-medium text-slate-400">October 15, 2023</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#FFB700] text-[#FFB700]" />)}
                        </div>
                        <p className="text-slate-600 text-[15px] font-normal leading-[1.8] max-w-2xl">
                          Absolutely incredible experience! The views were stunning, the crew was attentive and friendly, and the food was top-notch. Highly recommend this tour for anyone looking for a relaxing and beautiful getaway.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Detailed Booking Form (32%) */}
          <div className="w-full lg:w-[32%]">
            <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_10px_40px_-12px_rgba(15,23,42,0.15)] p-7 sticky top-[10px]">
              {/* Form Fields */}
              <div className="space-y-5">
                {/* Selected Package */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.15em]">Selected Package</label>
                  <input
                    type="text"
                    readOnly
                    value={packageData.title}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-medium text-sm outline-none cursor-not-allowed"
                  />
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.15em]">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-sm outline-none focus:border-slate-900 transition-colors placeholder:text-slate-300 placeholder:font-normal"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.15em]">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-sm outline-none focus:border-slate-900 transition-colors placeholder:text-slate-300 placeholder:font-normal"
                  />
                </div>

                {/* Travel Date */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.15em]">Travel Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="travel_date"
                      value={formData.travel_date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-sm outline-none focus:border-slate-900 transition-colors appearance-none"
                    />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.15em]">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-sm outline-none focus:border-slate-900 transition-colors placeholder:text-slate-300 placeholder:font-normal"
                    />
                    <PhoneIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-3 pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white font-semibold uppercase text-[12px] tracking-[0.2em] py-4 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
                </button>
                {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}
                {isSubmitted && <p className="text-green-600 text-xs font-medium text-center">Enquiry sent successfully!</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flyer Popup */}
      <AnimatePresence>
        {showFlyer && packageData.flyer_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFlyer(false)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setShowFlyer(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-all"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-auto p-2 bg-slate-100 flex items-center justify-center">
                <img
                  src={resolveImageUrl(packageData.flyer_url)}
                  alt={`${packageData.title} flyer`}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PackageDetailPage;
