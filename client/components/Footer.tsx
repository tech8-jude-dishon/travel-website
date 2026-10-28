import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import {
  Mail, Phone, MapPin, Plane, Building2, BusFront, TreePalm, CarFront, Gem,
} from 'lucide-react';

interface FooterProps {
  onContactClick?: () => void;
  onNavigate?: (view: any) => void;
}

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4v3.2h2.8V22z" /></svg>
);

const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M23 5.1c-.8.4-1.7.6-2.6.7.9-.6 1.6-1.4 2-2.5-.9.5-1.9.9-2.9 1.1a4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 2.5 3.8a4.5 4.5 0 0 0 1.4 6 4.4 4.4 0 0 1-2-.6v.1c0 2.2 1.5 4 3.6 4.4-.7.2-1.4.2-2 .1.6 1.8 2.2 3.1 4.2 3.1A9 9 0 0 1 1 18.8 12.8 12.8 0 0 0 7.9 21c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.7 1.7-1.5 2.3-2.5z" /></svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.6h4V21H3zM5 2.5a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6zM9.4 8.6h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6.1V21h-4v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6h-4z" /></svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3z" /></svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" /></svg>
);

const PinterestIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-1.12 0-2.19-.184-3.186-.523L8 22l.523-2.814C6.184 17.19 6 16.12 6 15c0-5.523 4.477-10 10-10Z" />
    <path d="M12 8c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4" />
    <path d="M12 16v5" />
  </svg>
);

// passport with a globe (visa services)
const PassportIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2.5" width="16" height="19" rx="2" />
    <circle cx="12" cy="11" r="4" />
    <path d="M8 11h8M12 7c1.3 1.1 1.3 6.9 0 8M12 7c-1.3 1.1-1.3 6.9 0 8M9 18h6" />
  </svg>
);

// clock arrow with "24" (round-the-clock help)
const Clock24Icon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.5 12a8.5 8.5 0 1 1-2.5-6" />
    <path d="M18.5 2.5v3.5H15" />
    <path d="M12 7v3.2" />
    <text x="12.4" y="18.6" textAnchor="middle" fontSize="7.2" fontWeight="700" fill="currentColor" stroke="none" fontFamily="system-ui, sans-serif">24</text>
  </svg>
);

const SOCIALS = [
  { label: 'Facebook', Icon: FacebookIcon, link: 'https://www.facebook.com/people/Global-Connect-World-Travel/61586916384409/' },
  { label: 'X (Twitter)', Icon: TwitterIcon, link: 'https://x.com/GlobalT6016' },
  { label: 'Instagram', Icon: InstagramIcon, link: 'https://www.instagram.com/globalconnectworldtravel/' },
  { label: 'Pinterest', Icon: PinterestIcon, link: 'https://www.pinterest.com/globalconnectworldtravel/' },
  { label: 'LinkedIn', Icon: LinkedinIcon, link: 'https://www.linkedin.com/company/global-connect-world-travel/' },
  { label: 'YouTube', Icon: YoutubeIcon, link: 'https://www.youtube.com/@GlobalConnectWorldTravels' },
];

const SERVICES: { Icon: React.ElementType; text: string }[][] = [
  [
    { Icon: Plane, text: 'International & Domestic\nFlight Booking' },
    { Icon: Building2, text: 'Worldwide Hotel Booking' },
    { Icon: BusFront, text: 'Worldwide Transportation\nArrangements' },
    { Icon: PassportIcon, text: 'UAE & Global Visa\nAssistance' },
  ],
  [
    { Icon: TreePalm, text: 'Worldwide Holiday\nPackages' },
    { Icon: CarFront, text: 'Car Rentals' },
    { Icon: Clock24Icon, text: '24/7 Availability &\nEmergency Travel Assistance' },
    { Icon: Gem, text: 'Luxury Staycation' },
  ],
];

const CONTACTS: { Icon: React.ElementType; text: React.ReactNode; href?: string }[] = [
  { Icon: Mail, text: 'booking@globalconnectworldtravel.com', href: 'mailto:booking@globalconnectworldtravel.com' },
  { Icon: Mail, text: 'santhosh@globalconnectworldtravel.com', href: 'mailto:santhosh@globalconnectworldtravel.com' },
  { Icon: Phone, text: '+91 89210 95973 (India)', href: 'tel:+918921095973' },
  { Icon: Phone, text: '+971 58 952 0398 (Dubai)', href: 'tel:+971589520398' },
  { Icon: MapPin, text: 'Dubai Address: No 413, Hamsah A Building, Al Karama, Dubai, UAE' },
  { Icon: MapPin, text: 'Kerala Address: 1st Floor, Tenco Complex, Pallikunnu, Kannur, Kerala - 670004' },
];

const BRANCHES = [
  { city: 'Gurgaon', address: 'DLF Forum, DLF Cyber City, Phase III,\nGurugram, Haryana, Pincode - 122002' },
  { city: 'Coimbatore', address: '1st Floor, Baba Complex, Vivekananda Rd,\nRam Nagar, Gandhipuram, Coimbatore, TN,\nPincode - 641009' },
  { city: 'Hyderabad', address: 'Suite - B1003, 10th Floor, The Platina, Banjara Basthi,\nJayabheri Enclave, Gachibowli, Hyderabad,\nTelangana 500032' },
];

// column heading with the short cyan bar (not an <h*>: the site styles those in the serif)
const ColTitle: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <p className={`gf-title${dark ? ' is-dark' : ''}`}>{children}</p>
);

const Footer: React.FC<FooterProps> = () => (
  <footer className="gf">
    {/* logo + socials above the services, contacts on the right */}
    <div className="gf-main">
      <div className="gf-svc">
        <div className="gf-brand">
          <Link to="/" className="gf-logo" aria-label="Global Connect World Travel - home">
            <img loading="lazy" src="/images/footer-logo-hd.png" alt="Global Connect World Travel" width={916} height={523} />
          </Link>
          <p className="gf-tag">Travel the world, discover new places, and create unforgettable memories.</p>
        </div>
        <ColTitle>Our Services</ColTitle>
        <div className="gf-svc-cols">
          {SERVICES.map((col, ci) => (
            <React.Fragment key={ci}>
              {ci === 1 && <span className="gf-sdiv" aria-hidden="true" />}
              <ul>
                {col.map(({ Icon, text }) => (
                  <li key={text}><span className="gf-sbox"><Icon strokeWidth={1.4} aria-hidden="true" /></span><span className="gf-stxt">{text}</span></li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </div>
      </div>

      <span className="gf-vdiv" aria-hidden="true" />

      <div className="gf-contact">
        <ColTitle>Get In Touch</ColTitle>
        <ul>
          {CONTACTS.map(({ Icon, text, href }, i) => {
            const body = (
              <>
                <span className="gf-ic" aria-hidden="true"><Icon /></span>
                <span className="gf-txt">{text}</span>
              </>
            );
            return <li key={i} className={href ? undefined : 'is-addr'}>{href ? <a href={href}>{body}</a> : <span>{body}</span>}</li>;
          })}
        </ul>
      </div>
    </div>

    {/* branches */}
    <div className="gf-branches">
      <div className="gf-bhead">
        <ColTitle dark>Our Branches</ColTitle>
        <div className="gf-socials">
          {SOCIALS.map(({ label, Icon, link }) => (
            <a key={label} href={link} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon /></a>
          ))}
        </div>
      </div>
      <ul className="gf-cards">
        {BRANCHES.map(b => (
          <li key={b.city} className="gf-card">
            <span className="gf-pin" aria-hidden="true"><MapPin strokeWidth={1.9} /></span>
            <span className="gf-cdiv" aria-hidden="true" />
            <span>
              <span className="gf-city">{b.city}</span>
              <span className="gf-addr">{b.address}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>

    {/* bottom bar */}
    <div className="gf-bottom">
      <p>Copyright &copy; 2026 All Rights Reserved</p>
      <div className="gf-legal">
        <Link to="/terms">Terms and Conditions</Link>
        <span aria-hidden="true">|</span>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
