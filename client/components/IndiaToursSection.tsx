import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LocationIcon } from './Icons';

interface IndiaToursSectionProps {
  onExplore?: (tour: any) => void;
}

export const indiaTours = [
  // North India Tours
  {
    id: 101,
    title: "Delhi City Highlights",
    location: "Delhi, India",
    image: "/images/delhiicityone.png",
    description: "Explore the historic monuments and vibrant markets of India's capital city.",
    rating: "4.95 (840)",
    duration: "2 Days",
    tag: "Cultural",
    category: "North",
    gallery: [
      "/images/delhiicityTwo.png",
      "/images/delhiiCityThree.png",
      "/images/DelhiiCityFour.png",
      "/images/DelhiiCityFive.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Old Delhi Heritage", detail: "Visit the iconic Red Fort and Jama Masjid." },
      { day: "Day 2", title: "New Delhi Landmark", detail: "Explore the Qutub Minar and Humayun's Tomb." }
    ],
    overview: "Discover the heart of India with our Delhi City Highlights tour. This journey takes you through the bustling streets of Old Delhi and the grand avenues of New Delhi, showcasing centuries of history, culture, and architecture.",
    highlights: [
      "Guided tour of the UNESCO World Heritage Red Fort",
      "Traditional rickshaw ride through Chandni Chowk markets",
      "Visit the magnificent Humayun's Tomb and Qutub Minar",
      "Delicious street food tasting in old Delhi",
      "Private air-conditioned vehicle for entire tour"
    ],
    inclusions: [
      "2 nights stay in a luxury 5-star hotel",
      "Daily breakfast and traditional lunch",
      "All monument entrance fees",
      "English-speaking professional guide",
      "Airport transfers in private car"
    ],
    exclusions: [
      "International or domestic flights",
      "Dinner and personal alcoholic beverages",
      "Tipping and gratuities for guide/driver",
      "Any activities not mentioned in itinerary",
      "Camera fees at monuments"
    ]
  },
  {
    id: 102,
    title: "Agra (Taj Mahal) Heritage",
    location: "Agra, UP",
    image: "/images/majestic-mausoleum-ancient-god-spiritual-journey-generated-by-ai (1).jpg",
    description: "Witness the eternal beauty of the Taj Mahal, a masterpiece of Mughal architecture.",
    rating: "4.98 (1200)",
    duration: "1 Day",
    tag: "Historic",
    category: "North",
    gallery: [
      "/images/Tajii.jpg",
      "/images/Tajiiis.jpg",
      "/images/TajiisFour.jpg",
      "/images/majestic-mausoleum-ancient-god-spiritual-journey-generated-by-ai (1).jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Monument of Love", detail: "Experience the Taj Mahal at sunrise and sunset." }
    ],
    overview: "Witness the sheer brilliance of the Taj Mahal, the world's most famous monument of love. Our Agra Heritage tour provides an intimate look at Mughal history, including the magnificent Agra Fort and the 'Baby Taj'.",
    highlights: [
      "Early morning sunrise visit to the Taj Mahal",
      "Comprehensive guided tour of Agra Fort",
      "Visit the beautiful Tomb of Itmad-ud-Daulah (Baby Taj)",
      "Traditional marble inlay work demonstration",
      "Gourmet lunch at a top-rated local restaurant"
    ],
    inclusions: [
      "Round-trip private transfers from Delhi",
      "Guided tours by historians",
      "All monument entrance tickets (Priority access)",
      "Buffet lunch at a 5-star hotel",
      "Mineral water and snacks during transit"
    ],
    exclusions: [
      "Accommodation in Agra (unless requested)",
      "Alcoholic beverages",
      "Tips for guide and driver",
      "Personal shopping and souvenirs",
      "Travel insurance"
    ]
  },
  {
    id: 103,
    title: "Jaipur Pink City Tour",
    location: "Jaipur, Rajasthan",
    image: "/images/jaipur.jpg",
    description: "Discover the majestic forts and palaces of Jaipur, the royal city of Rajasthan.",
    rating: "4.92 (750)",
    duration: "3 Days",
    tag: "Royal",
    category: "North",
    gallery: [
      "/images/jaipur.jpg",
      "/images/jaipurFour.jpg",
      "/images/jaipurThree.jpg",
      "/images/jaipurTwo.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Forts of Jaipur", detail: "Visit the grand Amer Fort and Nahargarh Fort." },
      { day: "Day 2", title: "City Palace Exploration", detail: "Guided tour of the City Palace and Hawa Mahal." },
      { day: "Day 3", title: "Cultural Heritage", detail: "Visit the Jantar Mantar and local craft markets." }
    ],
    overview: "Step into the royal world of the Pink City. Our Jaipur heritage tour takes you through majestic forts, opulent palaces, and vibrant local markets that have defined Rajasthan's royal heritage for centuries.",
    highlights: [
      "Elephant ride or Jeep ride to the hilltop Amer Fort",
      "Photography session at the iconic Hawa Mahal (Palace of Winds)",
      "Guided walk through the Royal City Palace museum",
      "Traditional Rajasthani Thali dinner experience",
      "Shopping for authentic blue pottery and handcrafted jewelry"
    ],
    inclusions: [
      "3 nights stay in a luxury heritage haveli",
      "Daily breakfast and one royal dinner",
      "Private AC vehicle for all transfers and sightseeing",
      "Govt-certified historian guides",
      "All monument entry fees and activity charges"
    ],
    exclusions: [
      "Flight or Train tickets to Jaipur",
      "Lunches and additional snacks",
      "Tips for guides and drivers",
      "Personal shopping and souvenirs",
      "Camera fees at monuments"
    ]
  },
  {
    id: 104,
    title: "Kashmir Paradise Valley",
    location: "Kashmir, J&K",
    image: "/images/kahtwo.jpg",
    description: "Experience the ethereal beauty of Dal Lake and the snow-capped mountains of Kashmir.",
    rating: "4.97 (560)",
    duration: "6 Days",
    tag: "Nature",
    category: "North",
    gallery: [
      "/images/kashone.jpg",
      "/images/kashmir.jfif",
      "/images/KashMirThree.jpg",
      "/images/KashmirTwo.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Srinagar", detail: "Check-in to a traditional houseboat on Dal Lake." },
      { day: "Day 3", title: "Gulmarg Day Trip", detail: "Enjoy the scenic beauty and activities in Gulmarg." },
      { day: "Day 5", title: "Pahalgam Nature Walk", detail: "Explore the lush meadows of Pahalgam." }
    ],
    overview: "Experience 'Heaven on Earth' with our Kashmir Paradise Valley tour. From staying in traditional houseboats on Dal Lake to exploring the snow-capped peaks of Gulmarg and the lush meadows of Pahalgam, this journey is a feast for the soul.",
    highlights: [
      "Stay in a luxury carved wooden houseboat on Dal Lake",
      "Shikara ride at sunset with views of the mountain peaks",
      "Gondola cable car ride to Apharwat Peak in Gulmarg",
      "Leisurely walk through the Saffron fields of Pampore",
      "Traditional Kashmiri Wazwan feast experience"
    ],
    inclusions: [
      "5 nights stay (houseboat and luxury hotels)",
      "Breakfast and Dinner daily",
      "Private vehicle for all inter-city transfers",
      "Shikara ride and Gondola tickets",
      "Toll, parking, and driver allowances"
    ],
    exclusions: [
      "Airfare to Srinagar Airport",
      "Pony rides and personal adventure activities",
      "Lunches and winter clothing rental",
      "Tips and gratutities",
      "Any services not mentioned in the plan"
    ]
  },
  {
    id: 105,
    title: "Leh Ladakh Adventure",
    location: "Leh, Ladakh",
    image: "/images/ladaonetwo.jpg",
    description: "Conquer high-altitude passes and visit ancient monasteries in the land of high passes.",
    rating: "4.99 (420)",
    duration: "7 Days",
    tag: "Adventure",
    category: "North",
    gallery: [
      "/images/ladaone.jpg",
      "/images/ladaonetwo.jpg",
      "/images/ladaoneThree.jpg",
      "/images/ladaFour.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Leh Acclimatization", detail: "Ease into the altitude with a rest day." },
      { day: "Day 3", title: "Nubra Valley Crossing", detail: "Cross the highest motorable road in the world." },
      { day: "Day 5", title: "Pangong Lake Sightseeing", detail: "Experience the crystal clear waters of Pangong." }
    ],
    overview: "Embark on an epic high-altitude adventure in the Land of High Passes. Our Ladakh Heritage tour offers a unique blend of ancient Tibetan Buddhist culture, dramatic mountain landscapes, and serene high-altitude lakes.",
    highlights: [
      "Stunning overnight stay by the Pangong Tso Lake",
      "Double-humped camel ride in the Nubra Valley dunes",
      "Visit the iconic Thiksey and Hemis Monasteries",
      "Drive across Khardung La, one of the world's highest motorable roads",
      "Panoramic views of the Indus-Zanskar river confluence"
    ],
    inclusions: [
      "6 nights stay in boutique guest houses and luxury camps",
      "Daily breakfast and dinner (MAP plan)",
      "Dedicated 4x4 or private SUV for all transfers",
      "Inner Line Permits for restricted areas",
      "Oxygen cylinders in vehicles for safety"
    ],
    exclusions: [
      "Airfare to Leh Airport",
      "Lunch and personal beverages",
      "Adventure activities like rafting or cycling",
      "Tips for local team",
      "Personal warm clothing and gear"
    ]
  },
  {
    id: 106,
    title: "Varanasi Spiritual Ghats",
    location: "Varanasi, UP",
    image: "/images/varansiiImgthree.jpg",
    description: "Immerse yourself in the spiritual energy of the oldest living city in the world.",
    rating: "4.88 (980)",
    duration: "3 Days",
    tag: "Spiritual",
    category: "North",
    gallery: [
      "/images/varansiiSix.jpg",
      "/images/varansiiimgTwo.jpg",
      "/images/varansiiFive.png",
      "/images/varansii.jpg",

    ],
    itinerary: [
      { day: "Day 1", title: "Ganga Aarti Experience", detail: "Witness the magnificent evening prayer." },
      { day: "Day 2", title: "Ghats & Temples Tour", detail: "Morning boat ride and temple meditation." }
    ],
    overview: "Journey to the oldest living city in the world. Our Spiritual Varanasi tour provides a deep immersion into the rituals, traditions, and spiritual energy that make this city the heart of Hindu culture.",
    highlights: [
      "Witness the mesmerizing Ganga Aarti at Dashashwamedh Ghat",
      "Early morning boat ride to see the morning rituals on the ghats",
      "Guided spiritual walk through the ancient narrow lanes",
      "Visit the sacred Sarnath, where Buddha gave his first sermon",
      "Traditional silk weaving experience in the weavers' colony"
    ],
    inclusions: [
      "2 nights stay in a luxury riverside heritage hotel",
      "Daily breakfast and traditional local lunch",
      "Private boat for dawn and dusk ceremonies",
      "Professional expert on Hindu spiritual traditions",
      "Airport pickup and drop-off"
    ],
    exclusions: [
      "Intercity travel to Varanasi",
      "Personal donations at temples",
      "Dinner and additional beverages",
      "Shopping and personal expenses",
      "Gratuities for boatmen and guides"
    ]
  },
  {
    id: 107,
    title: "Himachal Solitude Tour",
    location: "Shimla & Manali",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    description: "Explore the scenic beauty and colonial charm of the hill stations in Himachal Pradesh.",
    rating: "4.91 (680)",
    duration: "5 Days",
    tag: "Hill Station",
    category: "North",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600",
      "/images/Hima.jpg",
      "/images/HimaThree.jpg",
      "/images/HimaTwo.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Colonial Shimla", detail: "Stroll along the historic Mall Road." },
      { day: "Day 3", title: "Manali Adventure", detail: "Visit Solang Valley for breathtaking views." }
    ],
    overview: "Escape to the cooling mist of the Himalayas. Our Himachal Retreat takes you through the pine-scented forests of Shimla and the adventure hubs of Manali, offering breathtaking mountain views and serene nature walks.",
    highlights: [
      "Stay in boutique mountain resorts with valley views",
      "Guided trek through cedar forests in Manali",
      "Visit the historic Vice-Regal Lodge in Shimla",
      "Adventure sports like paragliding in Solang Valley",
      "Scenic drive through the Atal Tunnel"
    ],
    inclusions: [
      "6 nights stay in handpicked 4-star mountain hotels",
      "Daily breakfast and dinner with local specialties",
      "Private AC vehicle for entire mountain circuit",
      "Sightseeing permits for Rohtang/Gulaba",
      "Professional mountain guides for short treks"
    ],
    exclusions: [
      "Airfare/Train to Chandigarh or Delhi",
      "Activities like paragliding and river rafting",
      "Lunch and extra snacks",
      "Personal woollens and equipment rental",
      "Tips for driver and hotel staff"
    ]
  },

  // South India Tours
  {
    id: 201,
    title: "Kerala Backwaters & Serenity",
    location: "Kerala, India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    description: "Experience God's Own Country with serene backwaters and lush tea plantations.",
    rating: "4.96 (1100)",
    duration: "5 Days",
    tag: "Relaxing",
    category: "South",
    gallery: [
      "/images/keone.jpg",
      "/images/ker2.jpg",
      "/images/kerthree.jpg",
      "/images/kerelaFour.jpg",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Cochin Coastal Life", detail: "Experience the mix of cultures in Old Kochi." },
      { day: "Day 2", title: "Munnar Tea Estates", detail: "Tour the sprawling green hills of Munnar." },
      { day: "Day 5", title: "Backwaters Cruise", detail: "Relax on a traditional houseboat journey." }
    ],
    overview: "Discover 'God's Own Country' with our Kerala serenity tour. From the mist-covered tea gardens of Munnar to the tranquil backwaters of Alleppey and the historic coastline of Kochi, experience the true essence of Kerala's natural beauty.",
    highlights: [
      "Overnight stay on a traditional luxury houseboat",
      "Guided walk through Munnar's sprawling tea estates",
      "Watch a Kathakali dance and Kalaripayattu performance",
      "Visit the historic Chinese fishing nets in Kochi",
      "Traditional Sadhya meal served on a banana leaf"
    ],
    inclusions: [
      "5 nights premium accommodation (Hotel & Houseboat)",
      "Daily breakfast and all meals on the houseboat",
      "Private air-conditioned car for entire tour",
      "Kathakali performance tickets",
      "English/Hindi speaking local guides"
    ],
    exclusions: [
      "Airfare/Rail tickets to Kochi",
      "Optional Ayurveda spa treatments",
      "Lunches at hotels",
      "Laundry and personal expenses",
      "Tips for guide and driver"
    ]
  },
  {
    id: 202,
    title: "Ooty Queen of Hills",
    location: "Ooty, Tamil Nadu",
    image: "/images/oooFour.png",
    description: "A charming hill station known for its tea estates and colonial-era architecture.",
    rating: "4.87 (540)",
    duration: "3 Days",
    tag: "Hill Station",
    category: "South",
    gallery: [
      "/images/ootyone.webp",
      "/images/ootyTwo.webp",
      "/images/oothree.jpg",
      "/images/oooFive.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Nilgiri Mountain Railway", detail: "Ride the toy train for spectacular views." }
    ],
    overview: "Escape to the 'Queen of Hill Stations' in the heart of the Nilgiris. Ooty offers a charming blend of colonial history, sprawling tea gardens, and mist-covered peaks that make it a favorite for nature lovers and honeymooners alike.",
    highlights: [
      "Ride the UNESCO World Heritage Nilgiri Mountain Railway toy train",
      "Guided walk through aromatic tea estates and botanical gardens",
      "Boating on the serene Ooty Lake surrounded by eucalyptus trees",
      "Panoramic views from Doddabetta Peak, the highest in the Nilgiris",
      "Visit the historic Rose Garden with thousands of varieties"
    ],
    inclusions: [
      "2 nights stay in a cozy heritage bungalow",
      "Daily breakfast and traditional home-style dinner",
      "Private car for all local sightseeing",
      "Nilgiri Mountain Railway tickets",
      "All park and garden entry fees"
    ],
    exclusions: [
      "Travel to Mettupalayam or Ooty",
      "Lunches and additional refreshments",
      "Boating charges (Direct payment)",
      "Tips for driver and guides",
      "Laundry and other personal bills"
    ]
  },
  {
    id: 203,
    title: "Kodaikanal Lakeside",
    location: "Kodaikanal, TN",
    image: "/images/kodaiOne.png",
    description: "Discover the princess of hill stations with its enchanting lake and mist-covered forests.",
    rating: "4.89 (430)",
    duration: "3 Days",
    tag: "Lake Side",
    category: "South",
    gallery: [
      "/images/KodaiFour.png",
      "/images/KodaiThre.png",
      "/images/kodaiTwo.png",
      "/images/kodaiOne.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Kodai Lake Serenity", detail: "Enjoy boating and nature walks by the lake." }
    ],
    overview: "Discover the 'Princess of Hill Stations' perched on the upper Palani Hills. Kodaikanal is famed for its star-shaped lake, dense forests, and the mystical mist that often rolls across the valley floor.",
    highlights: [
      "Boating and cycling around the iconic star-shaped Kodaikanal Lake",
      "Scenic forest walk across the Coaker's Walk for panoramic valley views",
      "Visit the unique Column Rocks for breathtaking cliffside vistas",
      "Explore the Guna Caves and Pine Forests",
      "Stroll through the colorful Bryant Park"
    ],
    inclusions: [
      "2 nights luxury resort stay with mountain views",
      "Daily breakfast and select buffet dinner",
      "Private vehicle for local site exploration",
      "Local forest department entry permits",
      "Professional local trekking guide"
    ],
    exclusions: [
      "Inter-city travel to Kodaikanal",
      "Adventure activities like horse riding",
      "Personal items and insurance",
      "Tipping and portage",
      "Any unplanned sightseeing detours"
    ]
  },
  {
    id: 204,
    title: "Mysore Royal Heritage",
    location: "Mysore, Karnataka",
    image: "/images/mysorethree.jpg",
    description: "Visit the magnificent Mysore Palace and experience the city's rich cultural heritage.",
    rating: "4.93 (720)",
    duration: "2 Days",
    tag: "Royal",
    category: "South",
    gallery: [
      "/images/mysoreimg2.jpg",
      "/images/mysoreimage1.jpg",
      "/images/mysoreFour.jpg",
      "/images/mysorethree.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Palace Illumination", detail: "Witness the majestic palace lit up at night (on weekends)." }
    ],
    overview: "Immerse yourself in the royal grandeur of Mysore, the cultural capital of Karnataka. From the world-famous Mysore Palace to the artisanal heritage of sandalwood and silk, experience a city that lives its history every day.",
    highlights: [
      "Guided tour of the magnificent Mysore Amba Vilas Palace",
      "Visit the hilltop Chamundeshwari Temple for city-wide views",
      "Stroll through the colorful and aromatic Devaraja Market",
      "Musical fountain show at the Brindavan Gardens",
      "Traditional Mysore sandalwood and silk weaving demonstration"
    ],
    inclusions: [
      "1 night stay in a premium city-center hotel",
      "Grand Mysore-style breakfast and dinner",
      "Private AC sedan for all sightseeing",
      "Priority entrance tickets to the Palace",
      "English/Kannada speaking local historian"
    ],
    exclusions: [
      "Transport to/from Mysore",
      "Lunch at the hotel or city",
      "Camera fees at the Palace",
      "Personal shopping and souvenirs",
      "Tips and gratuities for the team"
    ]
  },
  {
    id: 205,
    title: "Coorg Coffee Plantations",
    location: "Coorg, Karnataka",
    image: "/images/coorgone.png",
    description: "Escape to the Scotland of India, famous for its coffee estates and misty hills.",
    rating: "4.94 (610)",
    duration: "4 Days",
    tag: "Nature",
    category: "South",
    gallery: [
      "/images/coorgTwo.png",
      "/images/coorgThree.png",
      "/images/CoorgFour.png",
      "/images/coorgFive.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Coffee Estate Walk", detail: "Learn about coffee harvesting and processing." }
    ],
    overview: "Breathe in the aromatic air of the 'Scotland of India'. Coorg is a lush haven of coffee plantations, spice gardens, and cascading waterfalls, offering a tranquil escape into the heart of Karnataka's Western Ghats.",
    highlights: [
      "Guided walking tour through a family-owned coffee plantation",
      "Visit the majestic Abbey Falls tucked inside the forest",
      "Meet the gentle giants at the Dubare Elephant Camp",
      "Panoramic views from Raja's Seat during sunset",
      "Explore the golden temple at the Namdroling Monastery"
    ],
    inclusions: [
      "3 nights stay in a luxury plantation bungalow or resort",
      "Daily breakfast and plantation-style dinner",
      "Private crossover/SUV for hill station travel",
      "Entrance fees to forest areas and Abbey Falls",
      "Guided spice market walk"
    ],
    exclusions: [
      "Internal travel to Madikeri (Coorg)",
      "Lunches and additional snacks",
      "Elephant interaction activities (Direct payment)",
      "Personal travel insurance",
      "Gratuities for guides and drivers"
    ]
  },
  {
    id: 206,
    title: "Madurai Temple City",
    location: "Madurai, TN",
    image: "/images/maduraione.png",
    description: "Explore the historic Meenakshi Amman Temple and the vibrant culture of Madurai.",
    rating: "4.86 (390)",
    duration: "2 Days",
    tag: "Spiritual",
    category: "South",
    gallery: [
      "/images/MaduraiTwo.png",
      "/images/MaduraiThree.png",
      "/images/MaduraiFour.png",
      "/images/MaduraiFive.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Night Ceremony", detail: "Witness the unique bedtime ritual at the temple." }
    ],
    overview: "Step back in time in the 'Athens of the East'. Madurai is one of India's oldest continuously inhabited cities, centered around the breathtaking Meenakshi Amman Temple and its thousand-pillar halls.",
    highlights: [
      "Visit the magnificent Meenakshi Amman Temple with its 14 gopurams",
      "Witness the dramatic 'Night Ceremony' where the deity is moved",
      "Explore the Indo-Saracenic Tirumalai Nayakkar Palace",
      "Sample Madurai's famous street food, including Madurai Jigarthanda",
      "Guided walk through the ancient markets around the temple"
    ],
    inclusions: [
      "1 night stay in a luxury heritage hotel",
      "Daily breakfast and authentic Madurai lunch",
      "Private vehicle for all city transfers",
      "Temple entry and special darshan passes",
      "Professional English-speaking historian guide"
    ],
    exclusions: [
      "Travel to Madurai city",
      "Personal offerings at the temple",
      "Dinner and personal alcoholic beverages",
      "Laundry and phone calls",
      "Tips for guide and driver"
    ]
  },
  {
    id: 207,
    title: "Rameswaram Island Pilgrimage",
    location: "Rameswaram, TN",
    image: "/images/raone.png",
    description: "Embark on a spiritual journey to one of the most sacred pilgrimage sites in India.",
    rating: "4.90 (510)",
    duration: "2 Days",
    tag: "Spiritual",
    category: "South",
    gallery: [
      "/images/raTwo.png",
      "/images/Rathee.png",
      "/images/Rafour.png",
      "/images/raFive.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Adam's Bridge Views", detail: "Scenic drive across the Pamban Bridge." }
    ],
    overview: "Embark on a sacred journey to the island town of Rameswaram. A major pilgrimage center, it is home to the stunning Ramanathaswamy Temple and the historic Pamban Bridge that connects the island to the mainland.",
    highlights: [
      "Walk through the world's longest temple corridor in Rameswaram",
      "Drive across the iconic Pamban Bridge over the turquoise sea",
      "Visit Dhanushkodi, the 'Ghost Town' at the tip of the island",
      "Take a holy dip in the 22 sacred wells (Theertham)",
      "Visit the former home and museum of Dr. APJ Abdul Kalam"
    ],
    inclusions: [
      "1 night stay in a premium pilgrimage hotel",
      "Daily breakfast and traditional South Indian meals",
      "Private vehicle for island sightseeing and Dhanushkodi trip",
      "Temple entry facilitation",
      "English/Tamil speaking local coordinator"
    ],
    exclusions: [
      "Travel to Rameswaram",
      "Personal religious rituals or poojas",
      "Laundry and personal expenses",
      "Tipping and portage",
      "Any unplanned coastal excursions"
    ]
  }
];

const IndiaTourCard: React.FC<{ tour: any; onExplore?: (tour: any) => void }> = ({ tour, onExplore }) => {
  return (
    <div
        onClick={() => onExplore?.(tour)}
        className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer h-full"
    >
        <div className="relative h-[200px]">
            <img loading="lazy"
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop';
                }}
            />
            <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-xs font-bold text-slate-700">{tour.rating}</span>
            </div>
        </div>
        <div className="px-5 pb-5 pt-1 flex flex-col flex-grow">
            <h3 className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
                {tour.title}
            </h3>
            <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-4">
                <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    {tour.duration}
                </div>
            </div>
            <div className="flex items-end justify-center mt-auto">
                <div className="flex flex-col hidden">
                    <span className="text-[11px] text-slate-400">Starting from</span>
                    <span className="text-lg font-bold text-[#1B6B93]">
                        {tour.location}
                    </span>
                </div>
                <button
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); }}
                    className="bg-[#1B6B93] text-white px-[23px] py-[8px] rounded-full text-sm font-semibold"
                >
                    Book Now
                </button>
            </div>
        </div>
    </div>
  );
};

const IndiaToursSection: React.FC<IndiaToursSectionProps> = ({ onExplore }) => {
  const navigate = useNavigate();

  return (
    <section className="global-page-container max-w-screen-2xl mx-auto bg-brand-bg py-24">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
        <div className="max-w-2xl">
          <p className="font-cursive text-brand-gold text-3xl md:text-4xl mb-4">
            Explore More
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif font-bold text-brand-dark mb-8 leading-tight tracking-tight">
            India Tours
          </h2>
          <p className="text-brand-dark/60 text-sm md:text-base leading-relaxed max-w-md font-medium">
            Discover the vibrant colors, rich heritage, and diverse landscapes of India. From the Taj Mahal to the backwaters of Kerala.
          </p>
        </div>

        <button
          onClick={() => navigate("/india-tours")}
          className="flex items-center gap-3 bg-brand-dark text-white px-10 py-5 rounded-full font-bold text-[12px] tracking-[0.2em] uppercase shadow-xl shadow-brand-gold/20 hover:shadow-brand-gold/40 hover:-translate-y-1 transition-all duration-300 group"
        >
          View More
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
        {indiaTours.slice(0, 4).map((tour) => (
          <IndiaTourCard key={tour.id} tour={tour} onExplore={onExplore} />
        ))}
      </div>
    </section>
  );
};

export default IndiaToursSection;
