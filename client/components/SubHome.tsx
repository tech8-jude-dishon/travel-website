
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { packages, trendingDestinations as trendingDestinationsApi, dreamDestinations as dreamDestinationsApi, resolveImageUrl } from '../lib/apiClient';
import { getWhatsAppLink } from '../utils/whatsapp';
import {
    Plane, Hotel, Palmtree, Ticket, FileText, Search, MapPin,
    Users, ChevronRight, ChevronLeft, Star, MoveRight
} from 'lucide-react';

const TABS = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'holidays', label: 'Holidays', icon: Palmtree },
    { id: 'tours', label: 'Tours', icon: Ticket },
    { id: 'visa', label: 'Visa', icon: FileText },
];

const OFFERS = [
    { id: 1, title: 'INDIA TOURS', image: '/images/indiaFrom.png', },
    { id: 2, title: 'DUBAI TOURS', image: '/images/dubaii.png', },
    { id: 3, title: 'INDIA LOCAL TOURS', image: '/images/indiaL.png', },
    { id: 4, title: 'DUBAI LOCAL TOURS', image: '/images/dubaiL.png', },
];

const AIRLINES = [
    { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg' },
    { name: 'US Airways', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/US_Airways_Logo.svg/1200px-US_Airways_Logo.svg.png' },
    { name: 'Wizz Air', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Wizz_Air_logo.svg/1280px-Wizz_Air_logo.svg.png' },
    { name: 'Qatar Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png' },
];

export const TOURS = [
    {
        id: 201, title: 'Rajasthan Heritage ', location: 'Rajasthan, India', price: 'AED 450', rating: '4.9', duration: '7 days 6 nights', guest: '2-4 guest', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774874169/htwo_compressed_vhaw4v.webp',
        gallery: [
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774874169/htwo_compressed_vhaw4v.webp",
            "/images/htwo.jpg",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774874635/hfour_compressed_qyhirt.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774874364/hthree_compressed_b0bswl.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774874635/hfour_compressed_qyhirt.webp"
        ],
        overview: "Journey through the land of Maharajas and majestic forts. Our Rajasthan Heritage tour brings you into a world of royal palaces, vibrant bazaars, and golden desert sands, offering a glimpse into the opulent history of India's most colorful state.",
        highlights: [
            "Visit the majestic Amer Fort and City Palace in Jaipur",
            "Witness the sunset over the desert dunes",
            "Traditional Folk dance and music performance",
            "Guided tour of Jodhpur's Mehrangarh Fort",
            "Luxury stay in converted palace hotels"
        ],
        inclusions: [
            "6 nights premium heritage accommodation",
            "Daily royal breakfast and traditional Rajasthani dinner",
            "Private chauffeured transportation",
            "English-speaking local guides at all monuments",
            "Entry tickets to major palaces and forts"
        ],
        exclusions: [
            "Internal flight to Jaipur/Jodhpur",
            "Personal tips and gratuities",
            "Alcoholic beverages during meals",
            "Personal shopping and souvenirs",
            "Laundry and other room services"
        ]
    },
    {
        id: 202, title: 'Mumbai City Lights ', location: 'Mumbai, India', price: 'AED 120', rating: '4.8', duration: '2 days 1 nights', guest: '2-6 guest', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774875684/mumbai_street_food_compressed_ugmj9j.webp', tag: 'City',
        gallery: [
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774875684/mumbai_street_food_compressed_ugmj9j.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774875618/mumthree_compressed_yaz9yv.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774875579/mumone_compressed_hztmws.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774875538/mumfour_compressed_iyxpoy.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774875599/mumtwo_compressed_zodfmy.webp"
        ],
        overview: "Experience the electric energy of India's maximum city. From the colonial landmarks of South Mumbai to the bustling street food trails of Colaba and the iconic Marine Drive sunset, this tour captures the true spirit of Mumbai.",
        highlights: [
            "Guided street food crawl through Mumbai's best eateries",
            "Visit the iconic Gateway of India and Taj Mahal Palace",
            "Scenic drive along Marine Drive and Bandra-Worli Sea Link",
            "Explore the historic Victoria Terminus (CST) station",
            "Sunset views at Juhu Beach"
        ],
        inclusions: [
            "1 night stay in a luxury sea-facing hotel",
            "Curated street food tasting tour",
            "Private AC car for city sightseeing",
            "Local expert guide for market tours",
            "All toll and parking charges"
        ],
        exclusions: [
            "Lunch and Dinner (beyond street food tour)",
            "Monument entry fees",
            "Personal insurance",
            "Laundry and phone calls",
            "Anything not mentioned in inclusions"
        ]
    },
    {
        id: 203, title: 'Dubai Mall ', location: 'Dubai, UAE', price: 'AED 199', rating: '5.0', duration: '1 day', guest: '1-10 guest', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876150/dmThree_compressed_tkt0zt.webp', tag: 'Luxury',
        gallery: [
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876150/dmThree_compressed_tkt0zt.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876134/dmtwo_compressed_khtke2.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876115/dm_compressed_hwifsw.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876201/DmFive_compressed_vu14lp.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876150/dmThree_compressed_tkt0zt.webp"
        ],
        overview: "Touch the sky with our exclusive Burj Khalifa experience. Visit the world's tallest building, witness the spectacular Dubai Fountain show, and enjoy world-class shopping and dining at the iconic Dubai Mall.",
        highlights: [
            "Access to At the Top level 124 & 125",
            "VIP view of the Dubai Fountain show",
            "Guided tour of the Dubai Aquarium & Underwater Zoo",
            "Luxury shopping experience at Dubai Mall",
            "Gourmet dining with views of the Burj Khalifa"
        ],
        inclusions: [
            "Entry tickets to Burj Khalifa observation deck",
            "Tickets to Dubai Aquarium & Underwater Zoo",
            "Private luxury transfer from hotel",
            "Gourmet lunch at a Dubai Mall restaurant",
            "Professional photographer for one souvenir portrait"
        ],
        exclusions: [
            "Personal shopping expenses",
            "Alcoholic drinks",
            "Tips for the driver",
            "Access to Level 148 (Sky level) unless upgraded",
            "Travel insurance"
        ]
    },
    {
        id: 204, title: 'Goa Coastal Adventure ', location: 'Goa, India', price: 'AED85', rating: '4.7', duration: '1 day', guest: '2-8 guest', image: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876438/goaFour_compressed_ktj0kr.webp', tag: 'Adventure',

        gallery: [
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876438/goaFour_compressed_ktj0kr.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876422/goaThree_compressed_gqzozo.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876411/goaTwo_compressed_xegw3u.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876422/goaThree_compressed_gqzozo.webp",
            "https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774876438/goaFour_compressed_ktj0kr.webp"
        ],
        overview: "Get your heart racing with our Goa coastal adventure. Spend a day on Goa's sun-drenched beaches participating in thrilling water sports, exploring hidden coves, and enjoying fresh seafood by the Arabian Sea.",
        highlights: [
            "Parasailing with views of the Goan coastline",
            "Jet ski and banana boat rides at Calangute",
            "Private boat trip for dolphin spotting",
            "Authentic Goan shack lunch on the beach",
            "Sunset beach walk at North Goa"
        ],
        inclusions: [
            "Full day of managed water sports activities",
            "Goan seafood buffet lunch",
            "Hotel pickup and drop-off in North Goa",
            "Professional life jackets and safety gear",
            "Safety instruction from certified trainers"
        ],
        exclusions: [
            "Personal video/photos during activities",
            "Additional snacks and drinks",
            "Alcoholic beverages",
            "Swimwear and sunscreen",
            "Gratuities for instructors"
        ]
    },
];

export const PACKAGES = [
    {
        id: 1, title: 'Kerala Premium Backwater Package', location: 'Kerala, India', price: '$299', rating: '4.9', duration: '5 days 4 nights', guest: '2-4 guest', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
        overview: "Experience God's Own Country with our premium backwater package. Stay in a luxury houseboat, explore lush tea plantations in Munnar, and relax by the serene beaches of Marari.",
        highlights: ["Overnight Houseboat Cruise", "Munnar Tea Garden Tour", "Kathakali Performance", "Spice Plantation Visit", "Kochi Heritage Walk"],
        inclusions: ["Luxury Accommodation", "All Meals on Houseboat", "Private transfers", "Guide services", "Entry tickets"],
        exclusions: ["Airfare", "Personal expenses", "Tips", "Insurance", "Optional activities"]
    },
    {
        id: 2, title: 'Himachal Snow Adventure Tour', location: 'Manali, India', price: '$350', rating: '4.7', duration: '6 days 5 nights', guest: '2-6 guest', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
        overview: "Discover the snow-capped peaks and adventurous spirit of Himachal. From paragliding in Solang Valley to the tranquility of Old Manali, this tour is perfect for thrill-seekers and nature lovers.",
        highlights: ["Rohtang Pass excursion", "Paragliding in Solang", "River Rafting in Beas", "Hadimba Temple visit", "Shopping at Mall Road"],
        inclusions: ["Mountain View Hotels", "Breakfast & Dinner", "Adventure activity guidance", "Private SUV for travel", "Permit fees"],
        exclusions: ["Flight tickets", "Equipment rental", "Personal snacks", "Tips", "Insurance"]
    },
    {
        id: 3, title: 'Andaman Crystal Waters Getaway', location: 'Andaman, India', price: '$450', rating: '4.8', duration: '4 days 3 nights', guest: '2-4 guest', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop',
        overview: "Relax on the pristine white sands of the Andaman Islands. Enjoy world-class scuba diving, explore historic sites like Cellular Jail, and witness stunning sunsets over the Bay of Bengal.",
        highlights: ["Scuba Diving at Havelock", "Cellular Jail Light & Sound Show", "Radhanagar Beach sunset", "Glass bottom boat ride", "Coral reef exploration"],
        inclusions: ["Island resorts stay", "Daily breakfast", "Ferry transfers between islands", "Snorkeling gear", "Private tours"],
        exclusions: ["Airfare to Port Blair", "Scuba diving costs", "Personal expenses", "Dinner (except cruise)", "Tips"]
    },
    {
        id: 4, title: 'Goa Sun-Kissed Beach Vacation', location: 'Goa, India', price: '$199', rating: '4.6', duration: '3 days 2 nights', guest: '2-8 guest', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop',
        overview: "Immerse yourself in the laid-back vibe of Goa. From North Goa's bustling beaches to the serene churches of Old Goa, experience the perfect coastal holiday.",
        highlights: ["Baga Beach water sports", "Old Goa Church tour", "Sunset cruise", "Night market visit", "Seafood shack experience"],
        inclusions: ["Beach-side hotel stay", "Daily breakfast", "Full day city tour", "Shared airport transfers", "Welcome drinks"],
        exclusions: ["Flights", "Water sports fees", "Alcoholic drinks", "Tips", "Personal shopping"]
    },
    {
        id: 5, title: 'Switzerland Alpine Magic Tour', location: 'Interlaken, Switzerland', price: '$899', rating: '4.9', duration: '7 days 6 nights', guest: '2-4 guest', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop',
        overview: "Discover the breathtaking beauty of the Swiss Alps. Visit iconic peaks, charming villages, and crystal-clear lakes in this ultimate European alpine adventure.",
        highlights: ["Jungfraujoch Top of Europe", "Mount Titlis cable car", "Scenic Golden Pass rail journey", "Lake Brienz boat trip", "Lucerne city tour"],
        inclusions: ["Luxury alpine hotels", "Daily Swiss breakfast", "Swiss Travel Pass", "Mountain excursion tickets", "Professional guides"],
        exclusions: ["International flights", "Ski equipment", "Lunch & Dinner", "Insurance", "Visas"]
    },
    {
        id: 6, title: 'Bali Tropical Paradise Escape', location: 'Ubud, Bali', price: '$499', rating: '4.8', duration: '5 days 4 nights', guest: '2-6 guest', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
        overview: "Relax in the heart of Bali's cultural soul. From lush rice terraces to ancient temples and stunning beaches, experience the magic of Ubud and Seminyak.",
        highlights: ["Tegalalang Rice Terrace tour", "Uluwatu Temple sunset", "Mount Batur sunrise trek", "Monkey Forest visit", "Beach club relaxation"],
        inclusions: ["Private pool villas", "Daily breakfast", "Private car & driver", "Snorkeling tour", "Temple entrance fees"],
        exclusions: ["International airfare", "Personal laundry", "Additional meals", "Tips", "Travel insurance"]
    },
    {
        id: 7, title: 'Paris Romantic City Getaway', location: 'Paris, France', price: '$650', rating: '4.7', duration: '4 days 3 nights', guest: '2-4 guest', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
        overview: "Fall in love with the City of Lights. Enjoy romantic walks along the Seine, visit iconic landmarks, and indulge in world-class French cuisine and pastries.",
        highlights: ["Eiffel Tower top level access", "Louvre Museum guided tour", "Seine River dinner cruise", "Montmartre walking tour", "Palace of Versailles trip"],
        inclusions: ["Chic Parisian hotel stay", "Daily breakfast", "Paris Museum Pass", "Public transport pass", "Gourmet dinner cruise"],
        exclusions: ["International flights", "Extra meals", "Shopping", "Tips", "Travel insurance"]
    },
    {
        id: 8, title: 'Dubai Desert Sands Adventure', location: 'Dubai, UAE', price: '$399', rating: '4.8', duration: '3 days 2 nights', guest: '2-8 guest', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
        overview: "Experience the thrill of the desert and the luxury of the city. From high-speed dune bashing to the top of the Burj Khalifa, Dubai is a world like no other.",
        highlights: ["Burj Khalifa Level 124", "Luxury Desert Safari with BBQ", "Dubai Fountain show", "Global Village tour", "Old Dubai boat ride"],
        inclusions: ["Luxury hotel stay", "Daily breakfast", "All tour transfers", "BBQ dinner in desert", "Observation deck tickets"],
        exclusions: ["International flights", "Adventure sports add-ons", "Tips", "Personal shopping", "Visas"]
    },
];

const BLOGS = [
    { id: 1, title: 'The Best Destination New York City For Drinks', date: 'September 12, 2024', image: 'https://images.unsplash.com/photo-1496442226666-8d4d2e62e6e9?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'All Inclusive Ultimate Cruise Island Day with Lunch', date: 'October 24, 2024', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop' },
    { id: 3, title: 'The Story Which Backpackers Around The World', date: 'November 05, 2024', image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=800&auto=format&fit=crop' },
    { id: 4, title: 'The Famous Great National Park Adventure Walkers', date: 'December 18, 2024', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop' },
];

const INSTAGRAM = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=400&auto=format&fit=crop',
];

const TRENDING_DESTINATIONS = [
    { id: 1, image: '/images/AbhudaiCityTourthree.jpg' },
    { id: 2, image: '/images/maladives.jpg' },
    { id: 3, image: '/images/siya.jpg' },
    { id: 4, image: '/images/desertone.jpg' },
    { id: 5, image: '/images/desrtFour.jpg' },
    { id: 6, image: '/images/safari.jpg' },
];

const TESTIMONIALS = [
    {
        id: 1,
        name: 'Priya Sharma',
        location: 'Mumbai, India',
        trip: 'Kerala Backwater Package',
        avatar: 'PS',
        avatarColor: '#00A9D7',
        rating: 5,
        review: 'Absolutely breathtaking experience! The houseboat stay in Kerala was a dream come true. Everything was perfectly planned — from the transfers to the local food. GCWT made our anniversary trip truly unforgettable.',
    },
    {
        id: 2,
        name: 'Ahmed Al Farsi',
        location: 'Dubai, UAE',
        trip: 'Rajasthan Heritage Tour',
        avatar: 'AA',
        avatarColor: '#F97316',
        rating: 5,
        review: 'The Rajasthan heritage tour was beyond our expectations. The palace hotels were stunning, and the guided fort tours were incredibly detailed. Our family of 5 felt completely taken care of throughout the journey.',
    },
    {
        id: 3,
        name: 'Sarah Thompson',
        location: 'London, UK',
        trip: 'Goa Coastal Adventure',
        avatar: 'ST',
        avatarColor: '#8B5CF6',
        rating: 5,
        review: "What a trip! The water sports in Goa were thrilling, and the beach shack lunch was the best seafood I've ever had. The team was so responsive and professional. Already planning my next trip with GCWT!",
    },
    {
        id: 4,
        name: 'Rahul Mehta',
        location: 'Bangalore, India',
        trip: 'Dubai Desert Safari',
        avatar: 'RM',
        avatarColor: '#10B981',
        rating: 5,
        review: 'The Dubai desert safari exceeded all expectations. Dune bashing, camel rides, and a stunning BBQ dinner under the stars — it was pure magic. Seamless booking process and top-notch guides. Highly recommend!',
    },
];

interface SubHomeProps {
    onExplore: (tour: any) => void;
    onBookClick: () => void;
}

const SubHome: React.FC<SubHomeProps> = ({ onExplore, onBookClick }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('holidays');
    const [expandedService, setExpandedService] = useState<number | null>(null);
    const [dynamicTours, setDynamicTours] = useState<any[]>([]);
    const [dynamicPackages, setDynamicPackages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [trendingImages, setTrendingImages] = useState<{ id: number; name: string; image_url: string }[]>([]);
    const [dreamOffers, setDreamOffers] = useState<{ id: number; title: string; image_url: string; link: string }[]>([]);
    const dreamRef = React.useRef<HTMLDivElement>(null);

    const dreamList = dreamOffers.length > 0
        ? dreamOffers.map(d => ({ id: d.id, title: d.title, image: d.image_url, link: d.link }))
        : OFFERS.map(o => ({ id: o.id, title: o.title, image: o.image, link: '' }));

    const loopedDreamList = [...dreamList, ...dreamList];
    const [dreamIndex, setDreamIndex] = useState(0);
    const [dreamTransition, setDreamTransition] = useState(true);

    const handleNextDream = () => {
        setDreamIndex(prev => prev >= dreamList.length ? prev : prev + 1);
    };

    const handlePrevDream = () => {
        if (dreamIndex === 0) {
            setDreamTransition(false);
            setDreamIndex(dreamList.length);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setDreamTransition(true);
                    setDreamIndex(dreamList.length - 1);
                });
            });
        } else {
            setDreamIndex(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (dreamList.length <= 4) return;
        const timer = setInterval(() => {
            setDreamIndex(prev => prev + 1);
        }, 3000);
        return () => clearInterval(timer);
    }, [dreamList.length, dreamIndex]);

    useEffect(() => {
        if (dreamIndex === dreamList.length) {
            const timeout = setTimeout(() => {
                setDreamTransition(false);
                setDreamIndex(0);
            }, 800);
            return () => clearTimeout(timeout);
        }
        if (!dreamTransition) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setDreamTransition(true);
                });
            });
        }
    }, [dreamIndex, dreamList.length, dreamTransition]);

    useEffect(() => {
        const fetchHomeData = async () => {
            setIsLoading(true);

            // Fetch all three in parallel — one failure doesn't block the others
            const [packagesRes, trendingRes, dreamRes] = await Promise.allSettled([
                packages.getAll(),
                trendingDestinationsApi.getAll(),
                dreamDestinationsApi.getAll(),
            ]);

            if (packagesRes.status === 'fulfilled') {
                const toursData = packagesRes.value.filter((t: any) => t.is_featured);
                setDynamicTours(toursData);
                setDynamicPackages(toursData);
            } else {
                console.error('Error fetching packages:', packagesRes.reason);
            }

            if (trendingRes.status === 'fulfilled' && trendingRes.value && trendingRes.value.length > 0) {
                setTrendingImages(trendingRes.value);
            } else {
                if (trendingRes.status === 'rejected') console.error('Error fetching trending destinations:', trendingRes.reason);
                setTrendingImages(TRENDING_DESTINATIONS.map((d) => ({ id: d.id, name: '', image_url: d.image })));
            }

            if (dreamRes.status === 'fulfilled') {
                if (dreamRes.value && dreamRes.value.length > 0) {
                    setDreamOffers(dreamRes.value);
                }
            } else {
                console.error('Error fetching dream destinations:', dreamRes.reason);
            }

            setIsLoading(false);
        };
        fetchHomeData();
    }, []);

    const displayTours = dynamicTours.length > 0 ? dynamicTours : TOURS;
    const displayPackages = dynamicPackages.length > 0 ? dynamicPackages : PACKAGES;

    const filteredTours = displayTours.filter(tour =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredPackages = displayPackages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const loopedTours = [...filteredTours, ...filteredTours];
    const [pkgIndex, setPkgIndex] = useState(0);
    const [pkgTransition, setPkgTransition] = useState(true);
    const pkgContainerRef = useRef<HTMLDivElement>(null);
    const [pkgStepPx, setPkgStepPx] = useState(312);

    useEffect(() => {
        const calcStep = () => {
            const W = pkgContainerRef.current?.offsetWidth ?? window.innerWidth;
            if (W >= 1024) setPkgStepPx((W - 96) / 4 + 32);
            else if (W >= 768) setPkgStepPx((W - 32) / 2 + 32);
            else setPkgStepPx(280 + 32);
        };
        calcStep();
        window.addEventListener('resize', calcStep);
        return () => window.removeEventListener('resize', calcStep);
    }, []);

    const handleNextPkg = () => setPkgIndex(prev => prev >= filteredTours.length ? prev : prev + 1);
    const handlePrevPkg = () => {
        if (pkgIndex === 0) {
            setPkgTransition(false);
            setPkgIndex(filteredTours.length);
            requestAnimationFrame(() => requestAnimationFrame(() => {
                setPkgTransition(true);
                setPkgIndex(filteredTours.length - 1);
            }));
        } else {
            setPkgIndex(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (filteredTours.length < 1) return;
        if (window.innerWidth < 768) return;
        const timer = setInterval(() => setPkgIndex(prev => prev + 1), 5000);
        return () => clearInterval(timer);
    }, [filteredTours.length, pkgIndex]);

    useEffect(() => {
        if (pkgIndex === filteredTours.length) {
            const t = setTimeout(() => { setPkgTransition(false); setPkgIndex(0); }, 800);
            return () => clearTimeout(t);
        }
        if (!pkgTransition) {
            requestAnimationFrame(() => requestAnimationFrame(() => setPkgTransition(true)));
        }
    }, [pkgIndex, filteredTours.length, pkgTransition]);

    const loopedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];
    const [testimIndex, setTestimIndex] = useState(0);
    const [testimTransition, setTestimTransition] = useState(true);

    const handleNextTestim = () => setTestimIndex(prev => prev >= TESTIMONIALS.length ? prev : prev + 1);
    const handlePrevTestim = () => {
        if (testimIndex === 0) {
            setTestimTransition(false);
            setTestimIndex(TESTIMONIALS.length);
            requestAnimationFrame(() => requestAnimationFrame(() => {
                setTestimTransition(true);
                setTestimIndex(TESTIMONIALS.length - 1);
            }));
        } else {
            setTestimIndex(prev => prev - 1);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => setTestimIndex((prev: number) => prev + 1), 3500);
        return () => clearInterval(timer);
    }, [testimIndex]);

    useEffect(() => {
        if (testimIndex === TESTIMONIALS.length) {
            const t = setTimeout(() => { setTestimTransition(false); setTestimIndex(0); }, 800);
            return () => clearTimeout(t);
        }
        if (!testimTransition) {
            requestAnimationFrame(() => requestAnimationFrame(() => setTestimTransition(true)));
        }
    }, [testimIndex, testimTransition]);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">

            {/* 1. HERO SECTION (BANNER) */}
            <section
                className="relative w-full lg:h-[760px] h-auto z-0 mt-[-9%] lg:bg-white overflow-hidden flex items-center justify-center"
            >
                {/* LCP images as <img loading="lazy"> with fetchpriority="high" for fast loading */}
                <img src="https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774847994/backgrond_compressed_aupq3k.webp" fetchPriority="high" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center lg:hidden" />
                <img src="https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774845947/homeBg_compressed_ecbphd.webp" fetchPriority="high" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-contain object-center hidden lg:block" />

                {/* Mobile hero layout */}
                <div className="relative z-10 w-full px-6 pt-[63px] pb-[40px] flex flex-col items-center lg:hidden">
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-6 animate-fade-in-up">
                        Your Journey Starts Here
                    </span>

                    <h1 className="text-[30px] font-sans font-bold text-center text-white drop-shadow-2xl leading-tight animate-fade-in-up">
                        Book Your Next <br /> Adventure Today
                    </h1>

                    <p className="text-white/80 text-[14px] text-center leading-relaxed mt-4 max-w-[320px] animate-fade-in-up">
                        Curated travel experiences from Dubai to Bali. Premium flights, luxury stays, and unforgettable adventures.
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 animate-fade-in-up delay-200 mt-5">
                        <button
                            onClick={onBookClick}
                            className="px-4 py-3 rounded-full border border-white/40 text-white font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-md"
                        >
                            Book Now
                        </button>
                        <a
                            href={getWhatsAppLink('Hi! I would like to enquire about your travel packages.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 rounded-full border border-white/40 text-white font-bold text-sm flex items-center gap-2 hover:bg-white/20 transition-all backdrop-blur-md bg-[#25D366]"
                        >
                            Whatsapp Now
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-xl shadow-3xl p-2 animate-fade-in-up border border-white/20 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 flex items-center gap-3 px-3 py-2">
                                <MapPin className="w-5 h-5 text-[#00A9D7] shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Where do you want to go?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent text-sm font-bold text-gray-800 focus:outline-none w-full placeholder:text-gray-400 border-none ring-0"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    if (searchQuery.trim()) {
                                        navigate(`/packages?search=${encodeURIComponent(searchQuery.trim())}`);
                                    }
                                }}
                                className="h-10 w-12 bg-[#00A9D7] hover:bg-[#008db3] text-white rounded-2xl flex items-center justify-center transition-all shadow-lg shrink-0">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-center gap-6 mt-8 w-full animate-fade-in-up">
                        <div className="text-center">
                            <p className="text-white text-xl font-black">500+</p>
                            <p className="text-white text-[10px] font-medium">Destinations</p>
                        </div>
                        <div className="w-[1px] h-8 bg-white/30" />
                        <div className="text-center">
                            <p className="text-white text-xl font-black">10K+</p>
                            <p className="text-white text-[10px] font-medium">Happy Travelers</p>
                        </div>
                        <div className="w-[1px] h-8 bg-white/30" />
                        <div className="text-center">
                            <p className="text-white text-xl font-black">4.9</p>
                            <p className="text-white text-[10px] font-medium">Rating</p>
                        </div>
                    </div>
                </div>

                {/* Desktop hero layout */}
                <div className="relative z-10 lg:left-[60px] max-w-[1440px] mx-auto w-full px-6 grid-cols-1 lg:grid-cols-2 gap-10 items-center hidden lg:grid">
                    <div className="lg:mt-[-90px]">
                        <h1 className="text-[60px] font-sans font-bold text-left text-white drop-shadow-2xl leading-tight animate-fade-in-up">
                            Book Your Next <br /> Adventure Today
                        </h1>

                        <div className="flex flex-column gap-4 animate-fade-in-up delay-200 justify-start pt-[20px]">
                            <button
                                onClick={onBookClick}
                                className="px-8 py-3 rounded-full border border-white/40 text-white font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-md"
                            >
                                Book Now
                            </button>
                            <a
                                href={getWhatsAppLink('Hi! I would like to enquire about your travel packages.')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 rounded-full border border-white/40 text-white font-bold text-sm flex items-center gap-2 hover:bg-white/20 transition-all group backdrop-blur-md bg-[#25D366]"
                            >
                                Whatsapp Now
                            </a>
                        </div>

                        {/* Premium Redesigned Search Bar */}
                        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-full shadow-3xl p-3 animate-fade-in-up delay-400 border border-white/20 mt-[30px]">
                            <div className="flex items-center gap-4">
                                <div className="flex-1 flex items-center gap-4 px-6 py-3 bg-gray-50/50 rounded-2xl border border-gray-100 group focus-within:border-[#00A9D7]/30 focus-within:bg-white transition-all">
                                    <MapPin className="w-5 h-5 text-[#00A9D7]" />
                                    <input
                                        type="text"
                                        placeholder="Where do you want to go?"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-transparent text-lg font-bold text-gray-800 focus:outline-none w-full placeholder:text-gray-400 border-none ring-0"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        if (searchQuery.trim()) {
                                            navigate(`/packages?search=${encodeURIComponent(searchQuery.trim())}`);
                                        }
                                    }}
                                    className="px-10 h-14 bg-[#00A9D7] hover:bg-[#008db3] text-white rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest transition-all shadow-lg hover:shadow-xl shrink-0 group">
                                    <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
                                    <span>Search</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            {/* OUR SERVICES SECTION */}
            <section className="py-8 lg:mt-[-100px] relative z-50 global-page-container overflow-hidden">

                <div className="max-w-7xl mx-auto lg:px-[20px] relative z-10">
                    {/* <p className="md:hidden text-[#00A9D7] text-xs font-bold tracking-[0.2em] uppercase text-center mb-2 animate-fade-in-up">What We Offer</p> */}
                    <h2
                        className="text-2xl md:text-[42px] font-black text-brand-dark mb-3 lg:text-left text-center animate-fade-in-up"
                    >
                        Our <span className="text-[#00A9D7] ">Services</span>
                    </h2>
                    <p className="md:hidden text-gray-500 text-[13px] text-center mb-8 animate-fade-in-up">Everything you need for a perfect trip, all in one place</p>

                    {/* Services list */}
                    {(() => {
                        const services = [
                            {
                                label: 'Flight Booking',
                                desc: 'Domestic & international flights at best prices',
                                detail: 'Compare 500+ airlines, get instant confirmations, and enjoy exclusive deals on business & economy class.',
                                img: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774701649/flightbookingcloud_lnvyup.jpg'
                            },
                            {
                                label: 'Hotel Booking',
                                desc: 'Luxury to budget stays worldwide',
                                detail: 'Access 1M+ properties worldwide with free cancellation, best price guarantee, and loyalty rewards.',
                                img: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774702257/hotelbookingCloud_ezqgsc.jpg'
                            },
                            {
                                label: 'Global Transport',
                                desc: 'Worldwide transport & transfer services',
                                detail: 'Airport transfers, intercity rides, and chauffeur services across major destinations worldwide.',
                                img: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774855842/worldwide_compressed_vlcev5.webp'
                            },
                            {
                                label: 'Visa Assistance',
                                desc: 'UAE & global visa processing support',
                                detail: 'Smooth visa support for 50+ countries with step-by-step document help and faster processing.',
                                img: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774855942/passport_compressed_sjuard.webp'
                            },
                            {
                                label: 'Holiday Packages',
                                desc: 'Curated worldwide holiday experiences',
                                detail: 'All-inclusive packages with flights, hotels, transfers, and guided tours at unbeatable prices.',
                                img: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774855999/hpack_compressed_f00jgm.webp'
                            },
                            {
                                label: 'Car Rentals',
                                desc: 'Self-drive & chauffeur car rentals',
                                detail: 'Wide range of vehicles from economy to luxury with flexible pickup and drop-off locations.',
                                img: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774856692/carrentals_compressed_uj2g5p.webp'
                            },
                            {
                                label: '24/7 Support',
                                desc: 'Round the clock customer assistance',
                                detail: 'Dedicated travel experts available anytime via call, chat, or email for all your travel needs.',
                                img: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774856755/24into7_compressed_ni6guy.webp'
                            },
                            {
                                label: 'Luxury Staycation',
                                desc: 'Premium staycation deals & getaways',
                                detail: 'Exclusive staycation offers at top-rated resorts and hotels with spa, dining, and activity packages.',
                                img: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774856893/Luxury_Staycation_compressed_jup8ws.webp'
                            },
                            {
                                label: 'Luxury Yachts',
                                desc: 'Private yacht cruises & charters',
                                detail: 'Experience the ultimate luxury on the water with private yacht charters for special occasions and leisure cruises.',
                                img: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1775303887/yatch_aku4yu.webp'
                            },
                            {
                                label: 'Limousines',
                                desc: 'Premium limousine hire services',
                                detail: 'Travel in style with our chauffeur-driven limousine services for airport transfers, events, and city tours.',
                                img: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1775303886/Lumoise_d9qg5f.webp'
                            },
                            {
                                label: 'Charter Flight',
                                desc: 'Private & group charter flights',
                                detail: 'Book private charter flights for business or leisure with flexible schedules and personalized in-flight services.',
                                img: 'https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1775303886/Charter_Flight_adz8tp.webp'
                            },
                        ];
                        return (
                            <>
                                {/* Mobile: horizontal card list with expandable detail */}
                                <div className="flex flex-col gap-3 md:hidden">
                                    {services.map((service, i) => {
                                        const isOpen = expandedService === i;
                                        return (
                                            <div
                                                key={i}
                                                className="bg-[#f4f7fa] rounded-2xl px-4 py-2  animate-fade-in-up transition-all duration-300"
                                                style={{ animationDelay: `${i * 0.06}s`, animationFillMode: 'both' }}
                                                onClick={() => setExpandedService(isOpen ? null : i)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-[50px] h-[50px] rounded-xl bg-white flex items-center justify-center shrink-0">
                                                        <img
                                                            loading="lazy"
                                                            src={service.img}
                                                            alt={service.label}
                                                            width={50}
                                                            height={50}
                                                            className="w-[50px] h-[50px] rounded-xl object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[14px] font-bold text-brand-dark">{service.label}</p>
                                                        <p className="text-[12px] text-gray-500 leading-snug">{service.desc}</p>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[200px] mt-3' : 'max-h-0'}`}>
                                                    <p className="text-[12px] text-gray-500 leading-relaxed pl-[66px]">
                                                        {service.detail}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Desktop: circular icon grid — Row 1 (6 items) + Row 2 (5 items centered) */}
                                <div className="hidden md:flex flex-col gap-10 w-full">
                                    <div className="grid grid-cols-6 gap-y-10 justify-items-center w-full">
                                        {services.slice(0, 6).map((service, i) => (
                                            <div
                                                key={i}
                                                className="flex flex-col items-center gap-3 group animate-fade-in-up"
                                                style={{ animationDelay: `${i * 0.06}s`, animationFillMode: 'both' }}
                                            >
                                                <div className="transition-transform duration-300 group-hover:scale-105">
                                                    <img
                                                        loading="lazy"
                                                        src={service.img}
                                                        alt={service.label}
                                                        width={120}
                                                        height={120}
                                                        className="w-[120px] h-[120px] rounded-full object-cover"
                                                    />
                                                </div>
                                                <p className="text-[13px] font-semibold text-brand-dark text-center leading-snug">
                                                    {service.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-5 justify-items-center w-full px-16">
                                        {services.slice(6).map((service, i) => (
                                            <div
                                                key={i + 6}
                                                className="flex flex-col items-center gap-3 group animate-fade-in-up"
                                                style={{ animationDelay: `${(i + 6) * 0.06}s`, animationFillMode: 'both' }}
                                            >
                                                <div className="transition-transform duration-300 group-hover:scale-105">
                                                    <img
                                                        loading="lazy"
                                                        src={service.img}
                                                        alt={service.label}
                                                        width={120}
                                                        height={120}
                                                        className="w-[120px] h-[120px] rounded-full object-cover"
                                                    />
                                                </div>
                                                <p className="text-[13px] font-semibold text-brand-dark text-center leading-snug">
                                                    {service.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        );
                    })()}
                </div>
            </section>

            {/* 2. DREAM DESTINATION SECTION */}
            <section className="global-page-container lg:mt-[] relative overflow-hidden">
                <div className="max-w-7xl mx-auto z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between lg:mb-10 mb-4 px-[20px] animate-fade-in-up gap-6">
                        <h2 className="text-2xl text-center lg:text-left md:text-[45px] font-sans font-black text-slate-900 leading-tight">
                            Choose Your <br /> <span className="text-[#00A9D7]">Dream Destination</span>
                        </h2>

                        <div className="flex items-center gap-4 ">
                            <button
                                onClick={handlePrevDream}
                                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:border-[#00A9D7]"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNextDream}
                                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:border-[#00A9D7]"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-hidden mx-[20px]" style={{ touchAction: 'pan-y' }}>
                        <div
                            className="flex gap-8"
                            style={{
                                transform: window.innerWidth <= 768
                                    ? `translateX(calc(-${dreamIndex} * (100% + 32px)))`
                                    : `translateX(calc(-${dreamIndex} * (25% + 8px)))`,
                                transition: dreamTransition ? 'transform 0.8s ease-in-out' : 'none',
                            }}
                        >
                            {loopedDreamList.map((offer, idx) => (
                                <div
                                    key={`${offer.id}-${idx}`}
                                    className="dream-card relative rounded-3xl overflow-hidden px-[10px] py-[10px] h-[180px] lg:w-[calc((100%-96px)/4)] md:w-[calc((100%-32px)/2)] w-full shrink-0 cursor-pointer bg-no-repeat bg-right-bottom bg-cover"
                                    style={{ backgroundImage: `url(${resolveImageUrl(offer.image)})` }}
                                    onClick={() => {
                                        if (offer.link) {
                                            navigate(offer.link);
                                        } else if (offer.title.includes('INDIA')) {
                                            navigate('/india-tours');
                                        } else if (offer.title.includes('DUBAI')) {
                                            navigate('/dubai-tours');
                                        }
                                    }}
                                >
                                    <div className="text-white font-semibold text-[16px] leading-5 relative flex px-[16px] py-[7px] z-1111">
                                        {offer.title.split(' ').slice(0, -1).join(' ')}<br />
                                        {offer.title.split(' ').slice(-1)}
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onBookClick(); }}
                                        className="absolute bottom-6 left-6 text-xs bg-white text-[#00A9D7] px-[20px] z-111 py-[10px] rounded-full"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>




            {/* section 3 */}

            <section className="bg-white">
                {/* Mobile: vertical card list */}
                <div className="md:hidden px-4 py-8">
                    <h2 className="text-2xl font-bold text-black text-center mb-6">
                        Amazing Trendings Desinations
                    </h2>
                    <div className="flex flex-col gap-5">
                        {filteredTours.map((tour: any, idx: number) => (
                            <div
                                key={`${tour.id}-mobile-${idx}`}
                                onClick={() => onExplore(tour)}
                                className="bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer"
                                style={{ boxShadow: "rgb(149 157 165 / 10%) 0px 8px 24px" }}
                            >
                                <div className="relative h-[185px]">
                                    <img loading="lazy" src={resolveImageUrl(tour.image_url) || tour.image} alt={tour.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                                        <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        <span className="text-xs font-bold text-slate-700">{tour.rating}</span>
                                    </div>
                                </div>
                                <div className="p-[18px] flex flex-col flex-grow">
                                    <div className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                                        {tour.title}
                                    </div>
                                    <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4 p-0 pb-[9px] border-b-[1px] border-[#ebe0e0]">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                            {tour.duration}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                                            {tour.guest_capacity || tour.guest}
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-center mt-auto">
                                        <div className="flex flex-col hidden">
                                            <span className="text-[11px] text-slate-400">Starting from</span>
                                            <span className="text-lg font-bold text-[#1B6B93]">
                                                {tour.price ? (tour.price.toString().startsWith('AED') || tour.price.toString().startsWith('₹') ? tour.price : `${tour.price}`) : 'AED 0'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e: React.MouseEvent) => { e.stopPropagation(); onBookClick?.(); }}
                                            className="bg-[#1B6B93] text-white px-[23px] py-[8px] rounded-full text-sm font-semibold"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop: original slider */}
                <div
                    className="hidden md:flex w-full h-[360px] relative flex-col items-center justify-start lg:pt-24 overflow-visible global-page-container p-cards lg:mt-[30px]"
                    style={{
                        backgroundImage: "url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774846701/bannerfive_compressed_zvo9gv.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="flex flex-row items-center justify-center mb-10 w-full relative z-10 lg:px-14 px-6 gap-6 pt-[45px]">
                        <div className="lg:text-white text-2xl lg:text-[45px] font-bold text-center">
                            Amazing Trendings Desinations
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            <button
                                onClick={handlePrevPkg}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/10 hover:bg-[#00A9D7] hover:border-[#00A9D7] transition-all shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNextPkg}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/10 hover:bg-[#00A9D7] hover:border-[#00A9D7] transition-all shadow-sm"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Decorative Dashed Line */}
                    <div className="absolute top-[60%] left-0 right-0 -translate-y-1/2 pointer-events-none z-0 opacity-40">
                        <svg className="w-full h-40 overflow-visible" viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M-50 80 C 200 140, 500 -20, 720 80 C 940 180, 1240 -20, 1490 80"
                                stroke="white"
                                strokeWidth="3"
                                strokeDasharray="12 12"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className="relative z-10 w-full mt-[30px]">
                        <div className="overflow-hidden mx-[20px] mb-[20px]">
                            <div
                                className="flex gap-8"
                                style={{
                                    transform: `translateX(calc(-${pkgIndex} * (25% + 8px)))`,
                                    transition: pkgTransition ? 'transform 0.8s ease-in-out' : 'none',
                                }}
                            >
                                {loopedTours.map((tour: any, idx: number) => (
                                    <div
                                        key={`${tour.id}-${idx}`}
                                        onClick={() => onExplore(tour)}
                                        className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-lg cursor-pointer shrink-0 mb-6 lg:w-[calc((100%-96px)/4)] md:w-[calc((100%-32px)/2)]"
                                        style={{ boxShadow: "rgb(149 157 165 / 10%) 0px 8px 24px" }}
                                    >
                                        <div className="relative h-[185px]">
                                            <img loading="lazy" src={resolveImageUrl(tour.image_url) || tour.image} alt={tour.title} className="w-full h-full object-cover" />
                                            <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                                                <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                <span className="text-xs font-bold text-slate-700">{tour.rating}</span>
                                            </div>
                                        </div>
                                        <div className="p-[18px] flex flex-col flex-grow">
                                            <div className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                                                {tour.title}
                                            </div>
                                            <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4 p-0 pb-[9px] border-b-[1px] border-[#ebe0e0]">
                                                <div className="flex items-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                                    {tour.duration}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                                                    {tour.guest_capacity || tour.guest}
                                                </div>
                                            </div>
                                            <div className="flex items-end justify-center mt-auto">
                                                <div className="flex flex-col hidden">
                                                    <span className="text-[11px] text-slate-400">Starting from</span>
                                                    <span className="text-lg font-bold text-[#1B6B93]">
                                                        {tour.price ? (tour.price.toString().startsWith('AED') || tour.price.toString().startsWith('₹') ? tour.price : `${tour.price}`) : 'AED 0'}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); onBookClick?.(); }}
                                                    className="bg-[#1B6B93] text-white px-[23px] py-[8px] rounded-full text-sm font-semibold"
                                                >
                                                    Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Recommended Packages */}
            {/* <section className=" bg-white relative overflow-hidden mt-[280px]">
                <div className="max-w-7xl mx-auto mx-6 relative z-10 global-page-container ">
                    <div className="flex items-end justify-center">
                        <div>
                            <h2 className="text-4xl md:text-[38px] font-sans font-black text-slate-900 mb-4 mx-6">
                                Recommend packages
                            </h2>
                            <p className="text-slate-400 font-medium mx-6">Specially curated travel experiences for you</p>
                        </div>
                    </div>

                    <div className="relative group/carousel  mx-6">
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-0 opacity-10 ">
                            <svg className="w-full h-40 overflow-visible" viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M-50 80 C 200 140, 500 -20, 720 80 C 940 180, 1240 -20, 1490 80"
                                    stroke="#00A9D7"
                                    strokeWidth="3"
                                    strokeDasharray="12 12"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <button
                            onClick={handlePrevPkg}
                            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#00A9D7] border border-slate-200 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95"
                        >
                            <ChevronRight className="w-5 h-5 rotate-180 text-white" />
                        </button>
                        <button
                            onClick={handleNextPkg}
                            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#00A9D7] text-white rounded-full flex items-center justify-center shadow-md transition-all active:scale-95"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                            {filteredPackages.length > 0 ? (
                                filteredPackages.slice(pkgIndex, pkgIndex + packagesPerPage).map((pkg: any) => (
                                    <div
                                        key={pkg.id}
                                        onClick={() => onExplore(pkg)}
                                        className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer"
                                    >
                                        <div className="relative p-3 h-[200px]">
                                            <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                                                <img loading="lazy" src={resolveImageUrl(pkg.image_url) || pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                                            </div>
                                        </div>

                                        <div className="px-7 pb-7 pt-2 flex flex-col flex-grow">
                                            <div className="text-[17px] font-black text-slate-900 leading-tight mb-4 group-hover:text-[#00A9D7] transition-colors line-clamp-2 h-12">
                                                {pkg.title}
                                            </div>
                                            <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 mb-8 uppercase tracking-wide">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                                                        <div className="w-1 h-1 rounded-full bg-[#00A9D7]" />
                                                    </div>
                                                    {pkg.duration}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                                                        <Users className="w-3.5 h-3.5 text-[#00A9D7]" strokeWidth={3} />
                                                    </div>
                                                     {pkg.guest_capacity || pkg.guest}
                                                </div>
                                            </div>
                                            <div className="mt-auto flex items-center justify-center">
                                                <button className="bg-[#00A9D7]/10 text-[#00A9D7] w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:shadow-md">
                                                    Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <p className="text-gray-400 text-lg font-bold">No packages found for "{searchQuery}".</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section> */}
            {/* sections 5*/}

            <section className="w-full lg:h-[621px] h-[400px] relative bg-[#00A9D7] lg:bg-white overflow-hidden lg:bg-[url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774847784/bannerFour_compressed_u3osie.webp')] lg:bg-cover lg:bg-no-repeat lg:bg-center flex items-center justify-end px-6 lg:px-40 lg:mt-[280px]" style={{
                // backgroundImage: "url('/images/bannerFour.png')",
                // backgroundSize: "cover",
                // backgroundPosition: "center",
                // backgroundRepeat: "no-repeat"
            }}>
                <div className="absolute lg:left-10 left-0 lg:top-4 z-10 max-w-2xl text-white space-y-8 animate-fade-in-right">
                    <div className="text-3xl md:text-[60px] text-center lg:text-left font-sans font-black leading-[1.1] tracking-tight drop-shadow-lg">
                        Get 5–10% OFF on <br />
                        <span className="text-white">Your First Online Booking</span>
                    </div>

                    <p className="text-xl md:text-[20px] text-center lg:text-left font-medium leading-relaxed opacity-90 drop-shadow-md max-w-xl">
                        Explore beautiful beaches and exciting cities while making memories that last forever.
                    </p>

                    <div className="flex flex-wrap gap-6 pt-4 justify-center lg:justify-start">
                        <button
                            onClick={onBookClick}
                            className="px-10 py-4 bg-white/20 backdrop-blur-md border-2 border-white rounded-full text-white font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:bg-white hover:text-[#00A9D7] transition-all group shadow-xl"
                        >
                            Book Now
                            <MoveRight className="w-6 h-6 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                        </button>
                        {/* <button className="px-10 py-4 border-2 border-white/60 rounded-full text-white font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm">
                            Explore More
                        </button> */}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-white global-page-container py-[60px]">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center lg:justify-between justify-center lg:mb-10 mb-4 px-[20px] gap-6">
                        <div>
                            <span className=" text-[#00A9D7] inline-block text-sm font-black uppercase tracking-widest mb-2 flex justify-center lg:text-left">
                                Traveler Stories
                            </span>
                            <div className="text-2xl md:text-[45px] font-sans font-black text-slate-900 leading-tight text-center lg:text-left">
                                What Our <span className="text-[#00A9D7]">Travelers Say</span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={handlePrevTestim}
                                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:border-[#00A9D7]"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNextTestim}
                                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:border-[#00A9D7]"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile: vertical card list */}
                    <div className="md:hidden flex flex-col gap-5 px-[20px]">
                        {TESTIMONIALS.map((t, idx) => (
                            <div
                                key={`${t.id}-mobile-${idx}`}
                                className="bg-white rounded-[28px] p-6 flex flex-col gap-4 shadow-xl border border-gray-100"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: t.rating }).map((_, i) => (
                                            <Star key={i} className="w-[18px] h-[18px] text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 28V17.2C0 14.1333 0.533333 11.3333 1.6 8.8C2.66667 6.26667 4.13333 4.13333 6 2.4C7.86667 0.666667 10.0667 -0.133333 12.6 0L13.4 2.4C11.4 2.93333 9.73333 4.06667 8.4 5.8C7.06667 7.53333 6.26667 9.46667 6 11.6H13.4V28H0ZM22.6 28V17.2C22.6 14.1333 23.1333 11.3333 24.2 8.8C25.2667 6.26667 26.7333 4.13333 28.6 2.4C30.4667 0.666667 32.6667 -0.133333 35.2 0L36 2.4C34 2.93333 32.3333 4.06667 31 5.8C29.6667 7.53333 28.8667 9.46667 28.6 11.6H36V28H22.6Z" fill="#d1d5db" />
                                    </svg>
                                </div>
                                <p className="text-slate-600 text-[13.5px] font-medium leading-relaxed flex-grow">
                                    {t.review}
                                </p>
                                <div className="flex items-center gap-3 pt-1">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 ring-2 ring-white shadow-md"
                                        style={{ backgroundColor: t.avatarColor }}
                                    >
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="text-slate-900 text-sm font-black leading-tight">{t.name}</p>
                                        <p className="text-[#00A9D7] text-[11px] font-semibold uppercase tracking-wide mt-0.5">
                                            {t.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop: Slider */}
                    <div className="hidden md:block overflow-hidden mx-[20px]">
                        <div
                            className="flex gap-8"
                            style={{
                                transform: `translateX(calc(-${testimIndex} * (33.334% + 10.667px)))`,
                                transition: testimTransition ? 'transform 0.8s ease-in-out' : 'none',
                            }}
                        >
                            {loopedTestimonials.map((t, idx) => (
                                <div
                                    key={`${t.id}-${idx}`}
                                    className="bg-[#00A9D7] rounded-[28px] p-6 flex flex-col gap-4 shadow-xl border border-gray-100 shrink-0 lg:w-[calc((100%-64px)/3)] md:w-[calc((100%-32px)/2)]"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: t.rating }).map((_, i) => (
                                                <Star key={i} className="w-[18px] h-[18px] text-amber-400 fill-amber-400" />
                                            ))}
                                        </div>
                                        <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 28V17.2C0 14.1333 0.533333 11.3333 1.6 8.8C2.66667 6.26667 4.13333 4.13333 6 2.4C7.86667 0.666667 10.0667 -0.133333 12.6 0L13.4 2.4C11.4 2.93333 9.73333 4.06667 8.4 5.8C7.06667 7.53333 6.26667 9.46667 6 11.6H13.4V28H0ZM22.6 28V17.2C22.6 14.1333 23.1333 11.3333 24.2 8.8C25.2667 6.26667 26.7333 4.13333 28.6 2.4C30.4667 0.666667 32.6667 -0.133333 35.2 0L36 2.4C34 2.93333 32.3333 4.06667 31 5.8C29.6667 7.53333 28.8667 9.46667 28.6 11.6H36V28H22.6Z" fill="white" />
                                        </svg>
                                    </div>
                                    <p className="text-white text-[13.5px] font-medium leading-relaxed flex-grow">
                                        {t.review}
                                    </p>
                                    <div className="flex items-center gap-3 pt-1">
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 ring-2 ring-white shadow-md"
                                            style={{ backgroundColor: t.avatarColor }}
                                        >
                                            {t.avatar}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-black leading-tight">{t.name}</p>
                                            <p className="text-white text-[11px] font-semibold uppercase tracking-wide mt-0.5">
                                                {t.location} • <span className="text-white">{t.trip}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* section 6 */}
            <div className="">

                {/* Mobile: Bento grid layout */}
                <div className="md:hidden px-4">
                    <div className="bg-[#00A9D7] rounded-[20px] px-5 py-4 mb-5">
                        <h2 className="text-2xl font-black text-white text-center leading-tight">
                            Trending India And Around Destinations
                        </h2>
                    </div>

                    {trendingImages.length >= 5 && (
                        <div className="flex flex-col gap-3">
                            {/* Row 1: tall left + two stacked right */}
                            <div className="flex gap-3 h-[280px]">
                                <div className="relative w-[48%] h-full rounded-2xl overflow-hidden">
                                    <img loading="lazy" src={resolveImageUrl(trendingImages[0].image_url)} alt={trendingImages[0].name || 'Destination'} className="w-full h-full object-cover" />
                                    {trendingImages[0].name && <p className="absolute bottom-2 left-3 text-white text-sm font-bold drop-shadow-lg">{trendingImages[0].name}</p>}
                                </div>
                                <div className="w-[52%] flex flex-col gap-3">
                                    <div className="relative flex-1 rounded-2xl overflow-hidden">
                                        <img loading="lazy" src={resolveImageUrl(trendingImages[1].image_url)} alt={trendingImages[1].name || 'Destination'} className="w-full h-full object-cover" />
                                        {trendingImages[1].name && <p className="absolute bottom-2 left-3 text-white text-sm font-bold drop-shadow-lg">{trendingImages[1].name}</p>}
                                    </div>
                                    <div className="relative flex-1 rounded-2xl overflow-hidden">
                                        <img loading="lazy" src={resolveImageUrl(trendingImages[2].image_url)} alt={trendingImages[2].name || 'Destination'} className="w-full h-full object-cover" />
                                        {trendingImages[2].name && <p className="absolute bottom-2 left-3 text-white text-sm font-bold drop-shadow-lg">{trendingImages[2].name}</p>}
                                    </div>
                                </div>
                            </div>
                            {/* Row 2: two stacked left + tall right (mirrored) */}
                            <div className="flex gap-3 h-[280px]">
                                <div className="w-[52%] flex flex-col gap-3">
                                    <div className="relative flex-1 rounded-2xl overflow-hidden">
                                        <img loading="lazy" src={resolveImageUrl(trendingImages[3].image_url)} alt={trendingImages[3].name || 'Destination'} className="w-full h-full object-cover" />
                                        {trendingImages[3].name && <p className="absolute bottom-2 left-3 text-white text-sm font-bold drop-shadow-lg">{trendingImages[3].name}</p>}
                                    </div>
                                    <div className="relative flex-1 rounded-2xl overflow-hidden">
                                        <img loading="lazy" src={resolveImageUrl(trendingImages[4].image_url)} alt={trendingImages[4].name || 'Destination'} className="w-full h-full object-cover" />
                                        {trendingImages[4].name && <p className="absolute bottom-2 left-3 text-white text-sm font-bold drop-shadow-lg">{trendingImages[4].name}</p>}
                                    </div>
                                </div>
                                {trendingImages[5] && (
                                    <div className="relative w-[48%] h-full rounded-2xl overflow-hidden">
                                        <img loading="lazy" src={resolveImageUrl(trendingImages[5].image_url)} alt={trendingImages[5].name || 'Destination'} className="w-full h-full object-cover" />
                                        {trendingImages[5].name && <p className="absolute bottom-2 left-3 text-white text-sm font-bold drop-shadow-lg">{trendingImages[5].name}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Desktop: Original marquee layout */}
                <div
                    className="hidden md:flex w-full h-[340px] relative flex-col items-center justify-start mt-[40px] overflow-visible rounded-[40px]"
                    style={{
                        backgroundImage: "url('https://res.cloudinary.com/dn29cn21x/image/upload/f_auto,q_auto,c_limit,w_1600/v1774846701/bannerfive_compressed_zvo9gv.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="relative z-10 mt-[30px] ">
                        <div className="text-3xl md:text-[45px] font-sans font-black text-white text-center drop-shadow-lg lg:pt-[59px] ">
                            Trending India And Around  Destinations
                        </div>
                    </div>

                    {/* Infinite Marquee Container */}
                    <div className="relative w-full overflow-hidden mt-6">
                        {/* Decorative Dashed Line background */}
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-0 opacity-20">
                            <svg className="w-full h-40 overflow-visible" viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M-50 80 C 200 140, 500 -20, 720 80 C 940 180, 1240 -20, 1490 80"
                                    stroke="white"
                                    strokeWidth="4"
                                    strokeDasharray="15 15"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <div
                            className="flex gap-8 px-6 relative z-10 marquee-scroll"
                        >
                            {[...trendingImages, ...trendingImages, ...trendingImages].map((dest, idx) => (
                                <div
                                    key={`${dest.id}-${idx}`}
                                    className="flex-shrink-0 w-[180px] group hover:scale-105 transition-transform duration-500"
                                >
                                    <div className="relative w-full h-[150px] rounded-[20px] overflow-hidden shadow-2xl">
                                        <img
                                            loading="lazy"
                                            src={resolveImageUrl(dest.image_url)}
                                            alt={dest.name || 'Trending Destination'}
                                            width={180}
                                            height={150}
                                            className="w-full h-full object-cover transition-opacity duration-400 group-hover:opacity-50"
                                        />
                                        {dest.name && (
                                            <p className="absolute bottom-3 left-3 text-white text-lg font-bold drop-shadow-lg leading-tight">
                                                {dest.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

const GoogleIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 488 512" fill="#EA4335">
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
    </svg>
);

export default SubHome;