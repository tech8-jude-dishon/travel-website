import React from 'react';
import { ArrowUpRightIcon } from './Icons';
import {
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  Mail, Phone, MapPin
} from 'lucide-react';

interface FooterProps {
  onContactClick?: () => void;
  onNavigate?: (view: any) => void;
}

const PinterestIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-1.12 0-2.19-.184-3.186-.523L8 22l.523-2.814C6.184 17.19 6 16.12 6 15c0-5.523 4.477-10 10-10Z" />
    <path d="M12 8c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4" />
    <path d="M12 16v5" />
  </svg>
);

const Footer: React.FC<FooterProps> = ({ onContactClick, onNavigate }) => {
  const addresses = [
    {
      country: "India",
      address: `Dream Destinas Tours & Travels
    (A Division of Global Connect World Travel)
1st Floor, Tenco Complex, Pallikkunnu,
    Kannur, Kerala - 670004`,
      phones: ["+971 58 952 0398", "+91 89210 95973", "+91 8075852170,+91 7025791083"],
      emails: ["santhosh@globalconnectworldtravel.com", "booking@globalconnectworldtravel.com"]
    },

    {
      country: "UAE",
      address: "No - 413, Hamsah A Building, Karama, Dubai.",
      phones: ["+971 58 952 0398", "+91 89210 95973", "+91 8075852170,+91 7025791083"],
      emails: ["santhosh@globalconnectworldtravel.com", "booking@globalconnectworldtravel.com"]
    },
    {
      country: "USA",
      address: "8 The Green, STE R, Dover, Delaware, 19901, USA.",
      phones: ["+1 727 633 0007"],
      emails: ["santhosh@globalconnectworldtravel.com", "booking@globalconnectworldtravel.com"]
    },
    {
      country: "KSA",
      address: "No - 23 Gold St, Al Olaya, Riyadh, Saudi Arabia.",
      phones: ["+971 56 251 7290"],
      emails: ["santhosh@globalconnectworldtravel.com", "booking@globalconnectworldtravel.com"]
    },
    {
      country: "UK",
      address: "71-75, Shelton Street, Covent Garden, London, WC2H 9JQ, UK.",
      phones: ["+44 20 3725 1755"],
      emails: ["santhosh@globalconnectworldtravel.com", "booking@globalconnectworldtravel.com"]
    },
    {
      country: "INDIA",
      address: "C-150 Meenakshi Tower, 6th Cross Thillainagar, Trichy, TN",
      phones: ["+91 90 439 94408"],
      emails: ["santhosh@globalconnectworldtravel.com", "booking@globalconnectworldtravel.com"]
    },
    {
      country: "INDIA",
      address: "1st Floor, 35/9, Desabandhu St, Ram Nagar, Coimbatore, TN",
      phones: ["+91 90 439 94408"],
      emails: ["santhosh@globalconnectworldtravel.com", "booking@globalconnectworldtravel.com"]
    },
    {
      country: "INDIA",
      address: "DLF Forum, DLF Cyber city, Phase III, Gurugram, Haryana",
      phones: ["+91 90 439 94408"],
      emails: ["santhosh@globalconnectworldtravel.com", "booking@globalconnectworldtravel.com"]
    }
  ];

  return (
    <footer className="global-page-container" style={{ background: 'aliceblue' }}>


      {/* <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 border-t border-brand-dark/5 pt-20">
        <div className="flex flex-column gap-12 lg:gap-16">
        
          <div className="flex flex-col gap-6">
            <div
              onClick={() => onNavigate?.('home')}
              className="cursor-pointer group mb-2"
            >
              <img loading="lazy"
                src="https://globalconnectworldtravel.com/img/logo.png"
                alt="Global Connect"
                className="h-16 md:h-20 w-auto object-contain transition-transform group-hover:scale-105"
              />

            </div>

            <div className="flex flex-col gap-8 lg:border-l border-brand-dark/5 ">
              <h4 className="text-[17px]  font-serif font-bold text-brand-dark">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Destinations', 'Packages', 'Blog', 'Contact'].map(link => (
                  <li key={link}>
                    <button
                      onClick={() => onNavigate?.(link.toLowerCase().replace(' ', ''))}
                      className="text-brand-dark/60 hover:text-brand-gold transition-colors text-sm font-medium flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">

              <div className="flex gap-3 pt-2">
                <a href="#" className="w-9 h-9 rounded-full bg-brand-dark/5 hover:bg-brand-gold text-brand-dark/60 hover:text-white flex items-center justify-center transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-brand-dark/5 hover:bg-brand-gold text-brand-dark/60 hover:text-white flex items-center justify-center transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-8 md:border-l border-brand-dark/5 md:pl-8 lg:pl-12">
            <h4 className="text-2xl font-serif font-bold text-brand-dark">Dream Destinas Tours & Travels</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
              {addresses.map((addr, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-gold font-black text-[10px] tracking-widest uppercase">{addr.country}</span>
                    <div className="h-[1px] flex-1 bg-brand-gold/20"></div>
                  </div>
                  <p className="text-brand-dark/70 text-xs font-bold leading-relaxed">
                    {addr.address}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {addr.phones.map((phone, pIdx) => (
                      <span key={pIdx} className="text-brand-dark text-[10px] font-black">{phone}</span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    {addr.emails?.map((email, eIdx) => (
                      <a key={eIdx} href={`mailto:${email}`} className="text-brand-dark/60 hover:text-brand-gold text-[10px] font-bold transition-colors">{email}</a>
                    ))}
                  </div>
                  <p className="text-brand-dark/50 text-[10px] font-bold">www.globalconnectworldtravel.com</p>
                </div>
              ))}
            </div>
          </div>

         
        </div>
      </div>

      {/* <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 mt-20 pt-8 border-t border-brand-dark/5 flex flex-col md:flex-row justify-between items-center opacity-40">
        <p className="text-[10px] font-bold uppercase tracking-widest">Global Connect World Travel &copy; 2025. Established in 2018.</p>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div> */}

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-6">
            <img loading="lazy"
              src="/images/footer-logo.png"
              alt="Global Connect"
              className="h-16 md:h-20 w-auto object-contain"
            />
            <p className="text-sm text-slate-600 mt-2 leading-relaxed hidden lg:block">
              Travel the world, discover new places, and create unforgettable memories.
            </p>
            <div className="flex gap-4 lg:pt-[10px] pt-0">
              {[
                { Icon: Facebook, link: 'https://www.facebook.com/people/Global-Connect-World-Travel/61586916384409/' },
                { Icon: Twitter, link: 'https://x.com/GlobalT6016' },
                { Icon: Instagram, link: 'https://www.instagram.com/globalconnectworldtravel/' },
                { Icon: PinterestIcon, link: 'https://www.pinterest.com/globalconnectworldtravel/' },
                { Icon: Linkedin, link: 'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQH9QK7mS7DLiQAAAZzsG6KAG0eJRHME6v9mCl9BBAniglAvaWXrNTdhu9X9OAgDS4NPc-VtqqT0cHXKBIVoJdGQDGYtIUV_z7EPRt2hyJOJWXWrqtbAtImEIcVU8Rh5BDx8cxU=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fglobal-connect-world-travel%2F%3FviewAsMember%3Dtrue' },
                { Icon: Youtube, link: 'https://www.youtube.com/@GlobalConnectWorldTravels' }
              ].map((item, idx) => (
                <a key={idx} href={item.link} target={item.link !== '#' ? "_blank" : undefined} rel={item.link !== '#' ? "noopener noreferrer" : undefined} className="text-[#00A9D7] hover:opacity-70 transition-opacity cursor-pointer">
                  <item.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

          </div>

          {/* Column 2: Product */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[#00A9D7] font-bold text-lg">Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', path: '/' },
                // { label: 'Holidays', path: '/holidays' },
                { label: 'Dubai', path: '/dubai-tours' },
                { label: 'India', path: '/india-tours' },
                { label: 'Packages', path: '/packages' },
                { label: 'Contact', path: '/contact' }
              ].map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate?.(link.label.toLowerCase().replace(' ', ''))}
                    className="text-slate-600 hover:text-[#00A9D7] text-sm transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[#00A9D7] font-bold text-lg">Services</h4>
            <div className="flex gap-6">
              <ul className="space-y-4 flex-1">
                {[
                  'International & Domestic Flight Booking',
                  'Worldwide Hotel Booking',
                  'Worldwide Transportation Arrangements',
                  'UAE & Global Visa Assistance',
                ].map(service => (
                  <li key={service} className="text-slate-600 text-sm">{service}</li>
                ))}
              </ul>
              <ul className="space-y-4 flex-1">
                {[
                  'Worldwide Holiday Packages',
                  'Car Rentals',
                  '24/7 Availability & Emergency Travel Assistance',
                  'Luxury Staycation',
                ].map(service => (
                  <li key={service} className="text-slate-600 text-sm">{service}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Contacts us */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[#00A9D7] font-bold text-lg">Contacts us</h4>
            <div className="space-y-4">
              <a href="mailto:booking@globalconnectworldtravel.com" className="flex items-center gap-3 text-slate-600 hover:text-[#00A9D7] text-sm transition-colors">
                <Mail className="w-5 h-5 text-[#00A9D7]" />
                booking@globalconnectworldtravel.com
              </a>
              <a href="mailto:santhosh@globalconnectworldtravel.com" className="flex items-center gap-3 text-slate-600 hover:text-[#00A9D7] text-sm transition-colors">
                <Mail className="w-5 h-5 text-[#00A9D7]" />
                santhosh@globalconnectworldtravel.com
              </a>

              <a href="tel:+91 89210 95973" className="flex items-center gap-3 text-slate-600 hover:text-[#00A9D7] text-sm transition-colors">
                <Phone className="w-5 h-5 text-[#00A9D7]" />
                +91 89210 95973(india)
              </a>
              <a href="tel:+91 62387 19549" className="flex items-center gap-3 text-slate-600 hover:text-[#00A9D7] text-sm transition-colors">
                <Phone className="w-5 h-5 text-[#00A9D7]" />
                +971 58 952 0398(dubai)
              </a>
              <div className="flex items-start gap-3 text-slate-600 text-sm">
                <MapPin className="w-5 h-5 text-[#00A9D7] mt-1 shrink-0" />
                <span>
                  Dubai Address : No 413, Hamsah A Building,<br /> Al Karama, Dubai, UAE
                </span>
                <br />


              </div>
              <div className="flex items-start gap-3 text-slate-600 text-sm">
                <MapPin className="w-5 h-5 text-[#00A9D7] mt-1 shrink-0" />

                <span>
                  Kerala Address: 1st Floor, Tenco Complex,<br /> Pallikunnu, Kannur, Kerala - 670004                </span>

              </div>

            </div>
          </div>
        </div>

        {/* Our Branches */}
        <div className="mt-8 pt-8 border-t border-slate-100">
          <h4 className="text-[#00A9D7] font-bold text-lg mb-6">Our Branches</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gurgaon */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00A9D7] mt-1 shrink-0" />
              <div>
                <h5 className="font-semibold text-slate-800 text-sm mb-1">Gurgaon</h5>
                <p className="text-slate-600 text-sm leading-relaxed">
                  DLF Forum, DLF Cyber City, Phase III, Gurugram, Haryana, Pincode - 122002
                </p>
              </div>
            </div>
            {/* Coimbatore */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00A9D7] mt-1 shrink-0" />
              <div>
                <h5 className="font-semibold text-slate-800 text-sm mb-1">Coimbatore</h5>
                <p className="text-slate-600 text-sm leading-relaxed">
                  1st Floor, Baba Complex, Vivekananda Rd, Ram Nagar, Gandhipuram, Coimbatore, TN, Pincode - 641009
                </p>
              </div>
            </div>
            {/* Hyderabad */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00A9D7] mt-1 shrink-0" />
              <div>
                <h5 className="font-semibold text-slate-800 text-sm mb-1">Hyderabad</h5>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Suite - B1003, 10th Floor, The Platina, Banjara Basthi, Jayabheri Enclave, Gachibowli, Hyderabad, Telangana 500032
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">Copyright &copy; 2026 All Rights Reserved</p>
          <div className="flex gap-4 text-sm font-medium">
            <a href="/terms" className="text-slate-500 hover:underline">Terms and Conditions</a>
            <span className="text-slate-300">|</span>
            <a href="/privacy" className="text-slate-500 hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>



    </footer>
  );
};

export default Footer;
