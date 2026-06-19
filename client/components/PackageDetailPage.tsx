
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
      <div className="w-full lg:h-[70vh] h-[50vh] flex items-center relative overflow-hidden" style={{
        backgroundImage: "url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774933647/PackageDetailBg_compressed_rzm1uo.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-14 relative z-10 ">
          <div className="flex flex-col lg:gap-8 max-w-5xl">
            {/* Top row: Badge and Rating */}
            <div className="flex flex-wrap items-center gap-6">

              <div className="flex items-center gap-1.5 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFB700] text-[#FFB700]" />
                  ))}
                </div>
                <span className="text-white text-xs font-bold ml-2">({packageData.rating?.match(/\(([^)]+)\)/)?.[1] || '4.8'})</span>
              </div>
            </div>

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
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl md:text-[36px] font-black text-slate-900 tracking-tight leading-tight">{packageData.title}</h1>
            <div className="flex items-center gap-2 text-sm font-bold bg-white p-1 rounded-xl">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg">
                <span className="text-slate-800">{packageData.rating?.split(' ')[0] || '4.8'}</span>
                <Star className="w-4 h-4 fill-[#FFB100] text-[#FFB100]" />
                <span className="text-slate-400 font-bold ml-1">({packageData.rating?.match(/\(([^)]+)\)/)?.[1] || '124'})</span>
              </div>
              {packageData.flyer_url && (
                <button
                  type="button"
                  onClick={() => setShowFlyer(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#00A9D7] text-white rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-[#008db3] transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Flyer
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-lg bg-white shadow-sm">
              <Share2 className="w-3.5 h-3.5 text-[#00A9D7]" />
              <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Share</span>
            </div>
            <div className="flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-lg bg-white shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">{packageData.duration}</span>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[520px] w-full group/gallery mb-12">
          {/* Left: Main Large Image */}
          <div className="w-full md:w-1/2 relative h-[350px] md:h-auto overflow-hidden rounded-[2rem]">
            <img loading="lazy"
              src={allImages[0]}
              alt={packageData.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right: 2x2 Grid */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 h-[450px] md:h-auto">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="relative overflow-hidden rounded-[2rem]">
                <img loading="lazy"
                  src={allImages[idx] || allImages[0]}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
            <div className="overflow-x-auto overflow-y-hidden border-b border-slate-100 mb-10">
              <div className="flex items-center gap-6 min-w-max">
                {['OVERVIEW', 'ITINERARY', 'INCLUSIONS', 'REVIEWS'].map((tab) => (
                  <button
                    key={tab}
                    className={`text-[13px] font-black tracking-widest pb-4 transition-all relative whitespace-nowrap ${activeTab === tab.toLowerCase()
                      ? 'text-[#00A9D7]'
                      : 'text-slate-400 hover:text-slate-600'
                      }`}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase() && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A9D7] rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="space-y-10 min-h-[400px]">
              {activeTab === 'overview' && (
                <div className="space-y-10 animate-in fade-in duration-500">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Tour Overview</h2>
                    <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-bold opacity-80">
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

                  <div className="pt-4 space-y-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                      {(packageData.highlights || [
                        "Spectacular scenic views throughout the journey",
                        "Complimentary welcome drinks and local snacks",
                        "Professional guide for all sightseeing tours",
                        "Premium airport and intercity transfers",
                        "Chance to explore hidden local attractions",
                        "Luxury accommodation in top-rated hotels"
                      ]).map((highlight: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 group">
                          <div className="w-6 h-6 rounded-full bg-[#00A9D7]/10 flex items-center justify-center shrink-0">
                            <Check className="w-4 h-4 text-[#00A9D7]" />
                          </div>
                          <span className="text-slate-700 font-bold text-base">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="space-y-10 animate-in fade-in duration-500">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Itinerary</h2>
                  <div className="relative pl-1">
                    <div className="absolute left-[13px] top-6 bottom-6 w-[2px] bg-slate-100" />
                    <div className="space-y-12">
                      {(packageData.itinerary || [
                        { title: "Departure & Sunset Cruise", description: "Board the luxury yacht at the marina. Enjoy a welcome reception as we set sail. Experience the spectacular sunset with live music and dinner." },
                        { title: "Coastal Exploration", description: "Wake up to ocean views and enjoy a gourmet breakfast. Anchor near a secluded cove for swimming and paddleboarding. Evening features a dinner under the stars." },
                        { title: "Return Journey", description: "Morning yoga session on the deck followed by brunch. Leisurely cruise back to the marina, arriving by early afternoon with unforgettable memories." }
                      ]).map((item: any, i: number) => (
                        <div key={i} className="relative pl-12 group">
                          <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-[#00A9D7] flex items-center justify-center text-white text-[13px] font-black z-10 shadow-lg shadow-blue-200">
                            {i + 1}
                          </div>
                          <div className="space-y-3">
                            <div className="text-xl font-black text-slate-900 group-hover:text-[#00A9D7] transition-colors line-clamp-1">Day {i + 1}: {item.title}</div>
                            <p className="text-slate-600 text-base font-bold opacity-80 leading-relaxed max-w-2xl">
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
                <div className="space-y-10 animate-in fade-in duration-500">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">What's Included & Excluded</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Included */}
                    <div className="space-y-8 p-8 rounded-3xl bg-green-50/30 border border-green-100/50">
                      <div className="flex items-center gap-3">
                        <Check className="w-6 h-6 text-green-600" />
                        <div className="text-xl font-black text-green-600">Included</div>
                      </div>
                      <div className="space-y-5">
                        {(packageData.inclusions || [
                          "2 nights luxury cabin accommodation",
                          "All meals (Breakfast, Lunch, Dinner)",
                          "Welcome drinks and snacks",
                          "Use of water sports equipment",
                          "Professional guide and crew"
                        ]).map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-4 text-slate-700 font-bold opacity-80">
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Excluded */}
                    <div className="space-y-8 p-8 rounded-3xl bg-red-50/30 border border-red-100/50">
                      <div className="flex items-center gap-3">
                        <Plus className="w-6 h-6 text-red-600 rotate-45" />
                        <div className="text-xl font-black text-red-600">Excluded</div>
                      </div>
                      <div className="space-y-5">
                        {(packageData.exclusions || [
                          "Flights to/from departure point",
                          "Premium alcoholic beverages",
                          "Personal expenses",
                          "Travel insurance",
                          "Gratuities for crew"
                        ]).map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-4 text-slate-700 font-bold opacity-80">
                            <Plus className="w-4 h-4 text-red-400 shrink-0 rotate-45" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-12 animate-in fade-in duration-500">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Guest Reviews</h2>

                  <div className="flex items-center gap-8 bg-slate-50/50 p-4 lg:p-8 rounded-3xl border border-slate-100">
                    <div className="text-2xl font-black text-slate-900">4.8</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => <Star key={i} className="w-6 h-6 fill-[#FFB700] text-[#FFB700]" />)}
                        <Star className="w-6 h-6 text-slate-200 fill-slate-200" />
                      </div>
                      <p className="text-sm font-black text-slate-400 uppercase tracking-widest pl-1">Based on 124 reviews</p>
                    </div>
                  </div>

                  <div className="space-y-0 divide-y divide-slate-100 pb-10">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="py-10 first:pt-0 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-black text-slate-900">Sarah Johnson</h4>
                          <span className="text-sm font-bold text-slate-400">October 15, 2023</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FFB700] text-[#FFB700]" />)}
                        </div>
                        <p className="text-slate-600 text-[17px] font-bold leading-relaxed opacity-80 pr-10">
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
            <div className="bg-white border-2 border-slate-50 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] p-8 sticky top-32 space-y-7">
              {/* Form Fields from Image 2 */}
              <div className="space-y-5">
                {/* Selected Package */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Selected Package</label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={packageData.title}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50/50 text-slate-800 font-bold outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50/50 text-slate-600 font-bold outline-none focus:border-[#00A9D7]/20 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50/50 text-slate-600 font-bold outline-none focus:border-[#00A9D7]/20 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Travel Date */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Travel Date</label>
                  <div className="relative group">
                    <input
                      type="date"
                      name="travel_date"
                      value={formData.travel_date}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50/50 text-slate-600 font-bold outline-none focus:border-[#00A9D7]/20 focus:bg-white transition-all appearance-none"
                    />
                    <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                  <div className="relative group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50/50 text-slate-600 font-bold outline-none focus:border-[#00A9D7]/20 focus:bg-white transition-all"
                    />
                    <PhoneIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Action Button from Image 1 */}
              <div className="space-y-4 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#00A9D7] text-white font-black uppercase text-sm tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-[#00A9D7]/20 hover:bg-[#008db3] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Book Now'}
                </button>
                {/* <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  You won't be charged yet
                </p> */}
                {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
                {isSubmitted && <p className="text-green-500 text-xs font-bold text-center">Inquiry sent successfully!</p>}
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
