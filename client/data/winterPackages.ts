// Winter 2026 package landing pages, shown under Services in the navbar.
// Content ported from "GCWT Winter Packages - 6 Landing Pages.html".

export type FeatIcon = 'doc' | 'cloche' | 'plane' | 'shield' | 'palm';

export interface WinterStop {
  p: string;
  n: string;
  note: string;
  img: string;
  alt: string;
  credit?: string;
}

export interface WinterPackage {
  id: string;
  tab: string;
  photo: string;
  heroPos?: string;
  heroFx?: string;
  photoAlt: string;
  eyebrow: string;
  ctaPhoto: string;
  ctaPos?: string;
  formTitle: string;
  ctaName?: string;
  routeHead: string;
  feats: { i: FeatIcon; t: string; s: string }[];
  name: string;
  nights: number;
  days: number;
  price: string;
  ex: string;
  exShort?: string;
  /** Hero heading; the part in `headEm` is drawn in the script font. */
  headPre: string;
  headEm: string;
  headLine2: string;
  lede: string;
  stops: WinterStop[];
  days_list: { t: string; d: string }[];
  faq: { q: string; a: string }[];
  /** Package-specific terms; packages without them use the shared lists below. */
  inclusions?: string[];
  exclusions?: string[];
  hotels?: { place: string; hotel: string; nights: number; meal: string }[];
  notes?: string[];
}

const IMG = '/images/winter/';

export const WINTER_PACKAGES: WinterPackage[] = [
  {
    id: 'sikkim', tab: 'Sikkim + Darjeeling',
    photo: IMG + 'skm-hero.webp', heroPos: 'center 40%', // Kangchenjunga from Darjeeling (Istiakuddin Ahmed, CC BY 4.0)
    photoAlt: 'Snow-covered Kangchenjunga above the hills of Darjeeling',
    eyebrow: 'Himalayan Hills',
    ctaPhoto: IMG + 'skm-cta.webp', ctaPos: 'center 40%', // Morning sunlight on Kangchenjunga (YUVRAJ ANAND, CC BY-SA 4.0)
    formTitle: 'Plan Your Sikkim Trip', ctaName: 'Sikkim',
    routeHead: 'Two hill towns, <em>one</em> easy route',
    feats: [{ i: 'doc', t: 'Permits', s: 'Included' }, { i: 'cloche', t: 'Breakfast', s: 'Daily' }, { i: 'plane', t: 'Return', s: 'Transfers' }, { i: 'shield', t: 'No Hidden', s: 'Cost' }],
    name: 'Sikkim and Darjeeling', nights: 4, days: 5, price: '20,600', ex: 'Bagdogra Airport or NJP Railway Station', exShort: 'Bagdogra airport or NJP station',
    headPre: 'Discover ', headEm: 'Sikkim', headLine2: '& Darjeeling',
    lede: 'Tsomgo Lake, sunrise at Tiger Hill and two easy hill towns, with hotels, transfers and permits already handled.',
    stops: [
      { p: 'Gangtok', n: '2 nights', note: 'Tsomgo Lake, MG Marg', img: IMG + 'skm-gangtok.webp', alt: 'Turquoise Tsomgo Lake among snowy slopes, East Sikkim', credit: 'Indrajit Das, CC BY 3.0' },
      { p: 'Darjeeling', n: '2 nights', note: 'Tiger Hill, tea gardens', img: IMG + 'skm-darjeeling.webp', alt: 'Darjeeling Himalayan Railway toy train steaming through the hills', credit: 'Public domain' }],
    days_list: [
      { t: 'Arrive and drive to Gangtok', d: 'Pick up from Bagdogra or NJP and drive up to Gangtok, roughly 4 to 5 hours. Evening free on MG Marg.' },
      { t: 'Tsomgo Lake and Baba Mandir', d: 'Full day to the frozen lake at 12,400 ft and Baba Harbhajan Singh temple. Permit charges are part of your package.' },
      { t: 'Gangtok to Darjeeling', d: 'Drive along the Teesta valley to Darjeeling, about 4 hours. Evening at Chowrasta and Mall Road.' },
      { t: 'Tiger Hill sunrise and town tour', d: 'Early start for the Kanchenjunga sunrise, then Batasia Loop, Ghoom Monastery, HMI and a working tea garden.' },
      { t: 'Departure', d: 'Transfer back to NJP or Bagdogra for your onward journey.' },
    ],
    faq: [
      { q: 'Are the Tsomgo Lake permits arranged for us?', a: 'Yes. Permit charges for Tsomgo Lake and Baba Mandir are included in the package cost. Carry original photo ID and passport size photos.' },
      { q: 'How cold does it get in winter?', a: 'Gangtok and Darjeeling stay between 2 and 12 degrees in peak winter, and Tsomgo Lake can go below zero. Heavy woollens, gloves and caps are a must.' },
      { q: 'Can we add Pelling or Lachung?', a: 'Yes. Send us your dates on WhatsApp and we will quote the extended route with the same hotels and transfers.' },
    ],
  },
  {
    id: 'andaman', tab: 'Andaman',
    photo: IMG + 'andaman-hero.webp',
    photoAlt: 'Traveller on a cliff overlooking a turquoise tropical bay',
    eyebrow: 'Andaman Islands',
    ctaPhoto: IMG + 'cta-andaman.webp', ctaPos: 'right center',
    formTitle: 'Plan Your Andaman Trip',
    routeHead: 'Two islands, <em>one</em> easy route',
    feats: [{ i: 'palm', t: '2 Islands', s: 'Port Blair + Havelock' }, { i: 'cloche', t: 'Breakfast', s: 'Daily' }, { i: 'plane', t: 'Airport', s: 'Transfers' }, { i: 'shield', t: 'Ferry', s: 'Tickets Included' }],
    name: 'Port Blair & Havelock', nights: 4, days: 5, price: '22,300', ex: 'Port Blair',
    headPre: 'Discover ', headEm: 'Andaman', headLine2: 'Like Never Before',
    lede: 'Port Blair 2 nights and Havelock 2 nights: Radhanagar and Elephant Beach, Cellular Jail and Chidiya Tapu sunsets, with ferries and transfers handled.',
    // In travel order: Port Blair → Havelock → back to Port Blair
    stops: [
      { p: 'Port Blair', n: '1 night', note: "Corbyn's Cove, Cellular Jail", img: IMG + 'route-port-blair.webp', alt: 'Cellular Jail, Port Blair', credit: 'Jomesh, CC BY 3.0' },
      { p: 'Havelock', n: '2 nights', note: 'Radhanagar, Elephant Beach, Kalapathar', img: IMG + 'route-havelock.webp', alt: 'Radhanagar Beach, Havelock', credit: 'Vyacheslav Argenberg, CC BY 4.0' },
      { p: 'Port Blair', n: '1 night', note: 'Chidiya Tapu sunset', img: '/images/services/andaman-port-blair.webp', alt: 'Port Blair harbour seen from South Point', credit: 'Prateek4 at English Wikivoyage, Public domain' }],
    days_list: [
      { t: 'Arrive Port Blair', d: "Our representative meets you at the airport and transfers you to the hotel to rest. In the afternoon visit Corbyn's Cove, a coconut-fringed beach about 8 km from the city. In the evening watch the Light and Sound Show at Cellular Jail, which brings the story of India's freedom struggle to life." },
      { t: 'Ferry to Havelock and Radhanagar Beach', d: "After breakfast, take the ferry to Havelock (Swaraj Dweep), one of the largest and most beautiful islands of Ritchie's Archipelago, 57 km north-east of South Andaman. Check in, then spend the afternoon at Radhanagar Beach (Beach No. 7), rated among the best beaches in Asia. On an early ferry, ask the hotel for a packed breakfast, and report at the terminal 1 hour before departure with photo ID." },
      { t: 'Elephant Beach and Kalapathar Beach', d: 'After breakfast, a half-day trip to Elephant Beach by shared boat. In the afternoon, visit Kalapathar Beach. Carry your own water bottle, snacks and a change of clothes.' },
      { t: 'Ferry back to Port Blair and Chidiya Tapu', d: 'After breakfast, check out and take the ferry back to Port Blair. Check in, then head to Chidiya Tapu in the afternoon to watch the sunset.' },
      { t: 'Departure', d: 'After breakfast, check out and transfer to Port Blair airport for your flight home.' },
    ],
    faq: [
      { q: 'Are the ferry tickets included?', a: 'Yes. Port Blair to Havelock and back is included by Makruzz, Green Ocean, Nautika, ITT Majestic or similar, or by government ferry if private ferries are not running. Tickets are issued once we receive your advance payment.' },
      { q: 'Is scuba diving part of the package?', a: 'No. Snorkelling, scuba, glass-bottom boat rides and other water activities are optional and paid directly. We will tell you the current rates before you go.' },
      { q: 'Which dates does this package cover?', a: 'Travel between 1 October 2026 and 31 March 2027. These rates do not apply in peak season, 15 December 2026 to 15 January 2027. Ask us for peak-season prices.' },
    ],
    hotels: [
      { place: 'Port Blair', hotel: 'North Reef (Contemporary room) or similar', nights: 2, meal: 'Breakfast' },
      { place: 'Havelock', hotel: 'Havelock Gateways (Deluxe room) or similar', nights: 2, meal: 'Breakfast' },
    ],
    inclusions: [
      'Accommodation on double sharing basis in AC rooms (deluxe hotels)',
      'Daily breakfast (CP meal plan)',
      'Exclusive AC vehicle for all transfers and sightseeing at Port Blair and Havelock, point to point as per the itinerary',
      'Ferry tickets Port Blair – Havelock – Port Blair',
      'Entry tickets for Port Blair sightseeing',
    ],
    exclusions: [
      'Airfare, train or helicopter fares',
      '5% GST, charged extra',
      'Guide, snorkelling, glass-bottom boat rides, camera fees, optional tours and room upgrades',
      'Entry fees at places other than Port Blair sightseeing',
      'Personal expenses such as laundry, phone calls, tips, mineral water and drinks',
      'Extra sightseeing or vehicle use beyond the itinerary',
      'Costs from natural calamities, road blocks or political disturbances, paid directly on the spot',
      'Any increase in taxes or fuel prices before departure',
      'Travel insurance',
      'Anything not listed under inclusions',
    ],
    notes: [
      'Valid for travel from 1 October 2026 to 31 March 2027. Not valid in peak season, 15 December 2026 to 15 January 2027.',
      'Prices are for base category rooms. Higher room categories cost extra and are quoted at booking.',
      'Ferry tickets are issued after the advance payment. Private ferry seats depend on availability at the time of issue.',
      'Rooms are subject to availability at confirmation. If the listed hotels are full, we provide equivalent hotels.',
      'Ferry and entry charges are at current rates. Any increase is payable by the guest.',
      'Sightseeing depends on the weather and permits. Ferries run subject to weather and government clearance.',
      'Andaman is a restricted area, so every traveller must carry a valid government photo ID.',
      'Check-out at most hotels in Port Blair and Havelock is 8:00 am. Late check-out depends on availability.',
    ],
  },
  {
    id: 'rajasthan', tab: 'Rajasthan',
    photo: IMG + 'raj-hero-sunrise.webp', heroPos: '100% 50%', heroFx: 'translateX(-27.9%) scale(1.56)',
    photoAlt: 'Traveller in a white dress looking over a river valley and mountains at sunrise',
    eyebrow: 'Royal Rajasthan',
    ctaPhoto: IMG + 'raj-cta.webp', ctaPos: 'center 55%', // Taj Lake Palace, Udaipur (Navneet Sharma, CC BY-SA 4.0)
    formTitle: 'Plan Your Rajasthan Trip',
    routeHead: 'Three royal cities, <em>one</em> easy route',
    feats: [{ i: 'palm', t: '3 Cities', s: 'In One Trip' }, { i: 'cloche', t: 'Breakfast', s: 'Daily' }, { i: 'plane', t: 'All Road', s: 'Transfers' }, { i: 'shield', t: 'No Hidden', s: 'Cost' }],
    name: 'Rajasthan', nights: 5, days: 6, price: '24,700', ex: 'Udaipur, Jaisalmer or Jodhpur airport or railway station', exShort: 'Udaipur, Jodhpur or Jaisalmer',
    headPre: 'Discover ', headEm: 'Rajasthan', headLine2: 'Like Royalty',
    lede: 'Lake palaces, mighty forts, the blue city and a night by the golden dunes — three royal cities in one perfect trip.',
    stops: [
      { p: 'Udaipur', n: '2 nights', note: 'City Palace, Pichola', img: IMG + 'raj-udaipur.webp', alt: 'City Palace on Lake Pichola, Udaipur', credit: 'Jakub Hałun, CC BY-SA 4.0' },
      { p: 'Jodhpur', n: '1 night', note: 'Mehrangarh Fort, Blue city', img: IMG + 'raj-jodhpur.webp', alt: 'Mehrangarh Fort ramparts over the blue city, Jodhpur', credit: 'Vyacheslav Argenberg, CC BY 4.0' },
      { p: 'Jaisalmer', n: '2 nights', note: 'Sam dunes, Golden fort', img: IMG + 'raj-jaisalmer.webp', alt: 'Camel on the Sam sand dunes at sunset, Jaisalmer', credit: 'Vijay.dhankahr28, CC BY-SA 4.0' }],
    days_list: [
      { t: 'Arrive Udaipur', d: 'Transfer to hotel and head to the City Palace complex. Boat ride on Lake Pichola is optional at your own cost.' },
      { t: 'Udaipur sightseeing', d: 'Saheliyon ki Bari, Jagdish Temple, Fateh Sagar and the Sajjangarh viewpoint for sunset over the lakes.' },
      { t: 'Drive to Jodhpur', d: 'About 5 hours by road. Afternoon at Mehrangarh Fort and Jaswant Thada, evening in the clock tower bazaar.' },
      { t: 'Jodhpur to Jaisalmer', d: 'Drive across the Thar to the golden city. Evening at Sam sand dunes with a camel ride and folk performance.' },
      { t: 'Jaisalmer sightseeing', d: 'The living fort, Patwon ki Haveli, Gadisar Lake and the old merchant quarter.' },
      { t: 'Departure', d: 'Transfer to Jaisalmer or Jodhpur airport or railway station.' },
    ],
    faq: [
      { q: 'Can we start from Jaipur instead?', a: 'Yes. The route can be rebuilt around Jaipur or the Golden Triangle. Send your dates and we will requote.' },
      { q: 'Is the desert camp night included?', a: 'This version uses hotels in Jaisalmer with a dunes excursion. A Swiss tent camp night can be added on request.' },
      { q: 'How long are the drives?', a: 'Udaipur to Jodhpur is about 5 hours and Jodhpur to Jaisalmer about 5 and a half. All drives are in a private vehicle with breaks.' },
    ],
  },
  {
    id: 'uttarakhand', tab: 'Uttarakhand',
    photo: IMG + 'utk-hero.webp', heroPos: '8% 50%', heroFx: 'translateX(-12%) scale(-1.35,1.35)',
    photoAlt: 'Traveller in a white dress looking over a Himalayan river valley at sunrise',
    eyebrow: 'Devbhoomi Uttarakhand',
    ctaPhoto: IMG + 'utk-cta.webp', ctaPos: 'center 50%', // Elephants at Jim Corbett National Park (Samarchauhan01, CC BY-SA 4.0)
    formTitle: 'Plan Your Uttarakhand Trip',
    routeHead: 'Lakes and jungle, <em>one</em> easy route',
    feats: [{ i: 'palm', t: 'Lakes &', s: 'Jungle' }, { i: 'cloche', t: 'Breakfast', s: 'Daily' }, { i: 'plane', t: 'Delhi', s: 'Pickup' }, { i: 'shield', t: 'No Hidden', s: 'Cost' }],
    name: 'Uttarakhand', nights: 5, days: 6, price: '24,500', ex: 'Delhi Airport or Railway Station', exShort: 'Delhi airport or railway station',
    headPre: 'Discover ', headEm: 'Uttarakhand', headLine2: 'Lakes & Jungle',
    lede: 'Three nights by the lakes and two inside Corbett country, picked up and dropped back in Delhi.',
    stops: [
      { p: 'Nainital', n: '3 nights', note: 'Naini Lake, Tiffin Top', img: IMG + 'utk-nainital.webp', alt: 'Rowing boats on Naini Lake below the Nainital hills', credit: 'Praveen Singh Bisht, CC BY 2.0' },
      { p: 'Jim Corbett', n: '2 nights', note: 'Safari country', img: IMG + 'utk-corbett.webp', alt: 'Bengal tiger in the grassland of Jim Corbett National Park', credit: 'Soumyajit Nandy, CC BY-SA 4.0' }],
    days_list: [
      { t: 'Delhi to Nainital', d: 'Early departure for the 7 to 8 hour drive. Evening walk on Mall Road beside Naini Lake.' },
      { t: 'Nainital local', d: 'Naina Devi temple, Snow View point by ropeway, Tiffin Top and the Eco Cave Gardens.' },
      { t: 'Lake district tour', d: 'Bhimtal, Sattal and Naukuchiatal, the quiet lakes most visitors miss.' },
      { t: 'Drive to Jim Corbett', d: 'Transfer to your resort near the park, about 2 and a half hours. Evening free by the river.' },
      { t: 'Corbett day', d: 'Jungle safari at your own cost, plus Corbett Falls and Garjia Temple.' },
      { t: 'Back to Delhi', d: 'Drive back to Delhi airport or railway station.' },
    ],
    faq: [
      { q: 'Is the jungle safari included?', a: 'No. Safari permits and jeep charges are paid separately and depend on the zone. We will help you book in advance since winter slots fill fast.' },
      { q: 'Can we be picked up from Gurgaon or Noida?', a: 'Yes, pickup anywhere in Delhi NCR can be arranged. Tell us the address when you enquire.' },
      { q: 'Is it suitable for older parents?', a: 'Yes. The sightseeing is gentle and most points are reached by vehicle or ropeway, though the roads are hilly.' },
    ],
  },
  {
    id: 'kashmir', tab: 'Kashmir',
    photo: IMG + 'ksh-hero.webp', heroPos: 'center 0%', // Dal Lake, Hazratbal (Suhail Skindar Sofi, CC BY-SA 4.0)
    photoAlt: 'Shikaras on Dal Lake below snow-covered mountains, Srinagar',
    eyebrow: 'Paradise on Earth',
    ctaPhoto: IMG + 'ksh-cta.webp', ctaPos: 'center 55%', // Shikara at sunset, Dal Lake (Utsav Sabharwal Photography, CC BY-SA 3.0)
    formTitle: 'Plan Your Kashmir Trip',
    routeHead: 'Lakes and snow, <em>one</em> easy route',
    feats: [{ i: 'palm', t: 'Houseboat', s: 'Night' }, { i: 'cloche', t: 'Breakfast', s: 'Daily' }, { i: 'plane', t: 'Airport', s: 'Transfers' }, { i: 'shield', t: 'No Hidden', s: 'Cost' }],
    name: 'Kashmir', nights: 4, days: 5, price: '15,300', ex: 'Srinagar', exShort: 'Srinagar airport',
    headPre: 'Discover ', headEm: 'Kashmir', headLine2: 'Snow & Shikaras',
    lede: 'Mughal gardens, a day each in Gulmarg and Pahalgam, and a shikara ride to your Dal Lake houseboat.',
    stops: [
      { p: 'Srinagar', n: '3 nights', note: 'Gardens, Gulmarg, Pahalgam', img: IMG + 'ksh-srinagar.webp', alt: 'Snow-covered cottage among pines in Gulmarg', credit: 'Zahoor Bhat, CC BY-SA 4.0' },
      { p: 'Houseboat', n: '1 night', note: 'Dal Lake', img: IMG + 'ksh-houseboat.webp', alt: 'Carved wooden houseboat on Dal Lake, Srinagar', credit: 'Slyronit, CC BY-SA 4.0' }],
    days_list: [
      { t: 'Arrive Srinagar', d: 'Airport pickup, then Nishat and Shalimar gardens and the Shankaracharya temple viewpoint.' },
      { t: 'Gulmarg day trip', d: 'Drive up to the meadow and the snow line. Gondola tickets and sledge rides are at your own cost.' },
      { t: 'Pahalgam day trip', d: 'Through saffron fields and apple orchards to Betaab Valley and the Lidder river.' },
      { t: 'Shikara to the houseboat', d: 'Shift to a Dal Lake houseboat, see the floating vegetable market and the old city crafts quarter.' },
      { t: 'Departure', d: 'Transfer to Srinagar airport.' },
    ],
    faq: [
      { q: 'Is the Gulmarg gondola included?', a: 'No. Gondola phase 1 and 2 tickets, pony rides and sledges are paid locally. Everything else on those days is covered.' },
      { q: 'Will we see snow in winter?', a: 'Gulmarg usually holds snow from late December through February, and Srinagar gets spells of it. Sonamarg stays shut in deep winter.' },
      { q: 'Is the houseboat heated?', a: 'Winter houseboats run room heaters and heavy quilts. If you prefer a hotel for all four nights, we can swap it.' },
    ],
  },
  {
    id: 'himachal', tab: 'Himachal',
    photo: IMG + 'him-hero.webp', heroPos: 'center 40%', // Snow mountains near Manali (Aayugoyal, CC BY-SA 4.0)
    photoAlt: 'Snow-covered Himalayan peaks under a blue sky near Manali',
    eyebrow: 'Splendid Himachal',
    ctaPhoto: IMG + 'him-cta.webp', ctaPos: 'center 40%', // Snow-laden Solang (Ayushch, CC BY-SA 4.0)
    formTitle: 'Plan Your Himachal Trip',
    routeHead: 'Snow and hills, <em>one</em> easy route',
    feats: [{ i: 'palm', t: 'Snow Point', s: 'Day' }, { i: 'cloche', t: 'Breakfast', s: 'Daily' }, { i: 'plane', t: 'Private', s: 'Vehicle' }, { i: 'shield', t: 'No Hidden', s: 'Cost' }],
    name: 'Splendid Himachal', nights: 5, days: 6, price: '15,600', ex: 'Chandigarh', exShort: 'Chandigarh airport or railway station',
    headPre: 'Discover ', headEm: 'Himachal', headLine2: 'Snow & Hills',
    lede: "Solang snow, the Atal Tunnel run and Shimla's ridge, with a private vehicle through the whole loop from Chandigarh.",
    stops: [
      { p: 'Manali', n: '3 nights', note: 'Solang, Atal Tunnel', img: IMG + 'him-manali.webp', alt: 'Solang Valley under snow near Manali', credit: 'Bleezebub, CC BY-SA 4.0' },
      { p: 'Shimla', n: '2 nights', note: 'Ridge, Kufri', img: IMG + 'him-shimla.webp', alt: 'Christ Church on the Ridge, Shimla', credit: 'Slyronit, CC BY-SA 4.0' }],
    days_list: [
      { t: 'Chandigarh to Manali', d: 'Scenic drive along the Beas, about 8 hours with breaks. Evening on Mall Road.' },
      { t: 'Solang Valley and Atal Tunnel', d: 'Snow point day and a run through the Atal Tunnel towards Sissu, subject to weather and road conditions.' },
      { t: 'Manali local', d: 'Hadimba Temple, Vashisht hot springs, Manu Temple, Van Vihar and Old Manali.' },
      { t: 'Manali to Shimla', d: 'Drive down via Kullu and Mandi, about 7 hours. Evening on the Ridge.' },
      { t: 'Kufri and Shimla', d: 'Half day at Kufri, then Christ Church, Jakhu Temple and the Lakkar Bazaar.' },
      { t: 'Departure', d: 'Transfer back to Chandigarh airport or railway station.' },
    ],
    faq: [
      { q: 'Will we reach Rohtang Pass?', a: 'Rohtang stays closed in winter. The Atal Tunnel to Sissu is the alternative and gives you the same snow, weather permitting.' },
      { q: 'Are snow clothes and boots included?', a: 'No. They are rented at Solang for a few hundred rupees and your driver will take you to a trusted stall.' },
      { q: 'Can we fly into Delhi instead?', a: 'Yes. Delhi pickup can be added for an extra charge, or you can take the Volvo to Chandigarh and start there.' },
    ],
  },
];

export const EXCLUSIONS = [
  'Airfare and train tickets',
  'Lunch and dinner',
  'Entry tickets, ropeways, safaris and optional activities',
  'Travel insurance and personal expenses',
  'Anything not listed under inclusions',
];

export const inclusionsFor = (d: WinterPackage): string[] => {
  const base = [
    `${d.nights} nights hotel accommodation with breakfast`,
    'Return airport or railway station transfers',
    'Sightseeing as per the itinerary in a private vehicle',
    'Applicable government taxes',
  ];
  if (d.id === 'sikkim') base.splice(3, 0, 'Permit charges and hotel taxes');
  return base;
};

export const servicePath = (id: string) => `/services/${id}`;
