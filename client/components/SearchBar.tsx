import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Calendar, Search, Plane, Hotel, Palmtree, Ticket, FileText, MapPin, Users, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const TABS = [
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'hotels', label: 'Hotels', icon: Hotel },
  { id: 'holidays', label: 'Holidays', icon: Palmtree },
  { id: 'tours', label: 'Tours & Attractions', icon: Ticket },
  { id: 'visa', label: 'Visa', icon: FileText },
];

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [activeTab, setActiveTab] = useState('flights');
  const [flightType, setFlightType] = useState('one-way');
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setStep(1);
    setDestination('');
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(destination);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl p-4 md:p-6 border border-white/20">
        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-[176px] mb-6 border-b border-gray-100 pb-4">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-2 group transition-all relative pb-2",
                  isActive ? "text-[#00A9D7]" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  isActive ? "bg-[#00A9D7]/10" : "bg-gray-50 group-hover:bg-gray-100"
                )}>
                  <Icon className={cn("w-5 h-5", isActive ? "text-[#00A9D7]" : "text-gray-400")} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-[25px] left-0 right-0 h-1 bg-[#00A9D7] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Flights Specific UI */}
        {activeTab === 'flights' ? (
          <div className="w-full">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
                >
                  {/* Leaving From */}
                  <div className=" border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">Leaving From</span>
                      <MapPin className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="City or Airport"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
                    />
                  </div>

                  {/* Going To */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">Going To</span>
                      <MapPin className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="City or Airport"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
                    />
                  </div>

                  {/* Departure Date */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">Departure Date</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Travellers & Cabin Class */}
                  <div className="px-4 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">Travellers & Class</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1 Traveller, Economy"
                        className="w-full bg-gray-50/50 rounded-xl  py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
                      />
                      <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Next Button */}
                  <div className="px-4">
                    <button
                      onClick={handleNext}
                      className="w-full bg-[#00A9D7] hover:bg-[#008db3] text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2 group"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
                >
                  {/* Full Name */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5 flex-row-reverse">
                      <span className="text-sm font-bold text-gray-900">Full Name</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      dir="rtl"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 text-right"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5 flex-row-reverse">
                      <span className="text-sm font-bold text-gray-900">Email Address</span>
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      dir="rtl"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 text-right"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5 flex-row-reverse">
                      <span className="text-sm font-bold text-gray-900">Phone Number</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      placeholder="+1 234 567 890"
                      dir="rtl"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 text-right"
                    />
                  </div>

                  {/* Submit & Back Buttons */}
                  <div className="px-4 flex items-center gap-4">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-[#00A9D7] hover:bg-[#008db3] text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2 group"
                    >
                      <span>Submit</span>
                      <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={handleBack}
                      className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-wider"
                    >
                      Back
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : activeTab === 'hotels' ? (
          <div className="w-full">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="hotels-step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
                >
                  {/* Where to? */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">Where to?</span>
                      <MapPin className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="India"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
                    />
                  </div>

                  {/* Dates */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">Dates</span>
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Thu 12 Mar - Sat 14 Mar"
                        className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Travellers */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">Travellers</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="2 travellers, 1 room"
                        className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Next Button */}
                  <div className="px-4">
                    <button
                      onClick={handleNext}
                      className="w-full bg-[#00A9D7] hover:bg-[#008db3] text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2 group"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hotels-step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
                >
                  {/* Full Name */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5 flex-row-reverse">
                      <span className="text-sm font-bold text-gray-900">Full Name</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      dir="rtl"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 text-right"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5 flex-row-reverse">
                      <span className="text-sm font-bold text-gray-900">Email Address</span>
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      dir="rtl"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 text-right"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5 flex-row-reverse">
                      <span className="text-sm font-bold text-gray-900">Phone Number</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      placeholder="+1 234 567 890"
                      dir="rtl"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 text-right"
                    />
                  </div>

                  {/* Submit & Back Buttons */}
                  <div className="px-4 flex items-center gap-4">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-[#00A9D7] hover:bg-[#008db3] text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2 group"
                    >
                      <span>Submit</span>
                      <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={handleBack}
                      className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-wider"
                    >
                      Back
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : activeTab === 'visa' ? (
          <div className="w-full">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="visa-step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
                >
                  {/* Nationality */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">Nationality</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <select className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 appearance-none">
                      <option value="">Select Nationality</option>
                      <option value="india">India</option>
                      <option value="usa">USA</option>
                      <option value="uk">UK</option>
                      <option value="uae">UAE</option>
                    </select>
                  </div>

                  {/* Destination Country */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">Destination</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <select className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 appearance-none">
                      <option value="">Select Destination</option>
                      <option value="dubai">Dubai (UAE)</option>
                      <option value="singapore">Singapore</option>
                      <option value="thailand">Thailand</option>
                      <option value="malaysia">Malaysia</option>
                    </select>
                  </div>

                  {/* Travel Date */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">Travel Date</span>
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Visa Type */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">Visa Type</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <select className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 appearance-none">
                      <option value="tourist">Tourist Visa</option>
                      <option value="business">Business Visa</option>
                      <option value="transit">Transit Visa</option>
                      <option value="multiple">Multiple Entry</option>
                    </select>
                  </div>

                  {/* Next Button */}
                  <div className="px-4">
                    <button
                      onClick={handleNext}
                      className="w-full bg-[#00A9D7] hover:bg-[#008db3] text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2 group"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="visa-step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
                >
                  {/* Full Name */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5 flex-row-reverse">
                      <span className="text-sm font-bold text-gray-900">Full Name</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      dir="rtl"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 text-right"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5 flex-row-reverse">
                      <span className="text-sm font-bold text-gray-900">Email Address</span>
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      dir="rtl"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 text-right"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                    <div className="flex items-center justify-between mb-1.5 flex-row-reverse">
                      <span className="text-sm font-bold text-gray-900">Phone Number</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      placeholder="+1 234 567 890"
                      dir="rtl"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200 text-right"
                    />
                  </div>

                  {/* Submit & Back Buttons */}
                  <div className="px-4 flex items-center gap-4">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-[#00A9D7] hover:bg-[#008db3] text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2 group"
                    >
                      <span>Submit</span>
                      <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={handleBack}
                      className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-wider"
                    >
                      Back
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Default/Other Tabs UI (Preserved) */
          <div className={cn(
            "grid grid-cols-1 gap-4 items-center",
            (activeTab === 'holidays' || activeTab === 'tours') ? "md:grid-cols-4" : "md:grid-cols-5"
          )}>

            {/* Destination */}
            <div className={cn(
              "px-4 border-b md:border-b-0 pb-4 md:pb-0",
              (activeTab === 'holidays' || activeTab === 'tours') ? "md:col-span-3" : "md:border-r border-gray-100"
            )}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-gray-900">Destination</span>
                {!(activeTab === 'holidays' || activeTab === 'tours') && <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
              <input
                type="text"
                placeholder="New York City"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
              />
            </div>

            {!(activeTab === 'holidays' || activeTab === 'tours') && (
              <>
                {/* Check In */}
                <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-gray-900">Check In</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
                    />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Check Out */}
                <div className="px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-gray-900">Check Out</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
                    />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Tour Type */}
                <div className="px-4 pb-4 md:pb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-gray-900">Tour Type</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Family Tour"
                    className="w-full bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent hover:border-gray-200"
                  />
                </div>
              </>
            )}

            {/* Search Button */}
            <div className="px-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-[#00A9D7] hover:bg-[#008db3] text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2 group"
              >
                <span>{(activeTab === 'holidays' || activeTab === 'tours') ? 'Search' : 'Submit'}</span>
                {(activeTab === 'holidays' || activeTab === 'tours') && (
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
