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
  /** `tab` overrides the place shown on that day's tab. */
  days_list: { t: string; d: string; notes?: string[]; tab?: string }[];
  faq: { q: string; a: string }[];
  /** Package-specific terms; packages without them use the shared lists below. */
  inclusions?: string[];
  exclusions?: string[];
  hotels?: { place: string; hotel: string; nights: number; meal: string }[];
  notes?: string[];
  specialNotes?: string[];
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
      {
        t: 'NJP Railway Station / Bagdogra (IXB) Airport to Gangtok',
        d: 'About 125 km / 4 hrs drive. On arrival at NJP Railway Station or Bagdogra (IXB) Airport, our representative welcomes you and transfers you to Gangtok. Check in to your hotel; the rest of the day is free at leisure. Night halt at Gangtok.',
      },
      {
        t: 'Gangtok: Tsomgo Lake + Baba Mandir (New)',
        d: 'This morning, start on a half-day trip to Tsomgo Lake (12,400 ft), only 32 km from Gangtok city. The lake is almost 1 km long and 15 m deep, and is considered sacred by the local people. A further 12 km on, visit the Baba Harbhajan Singh Mandir (New). Back to the hotel in the afternoon. Night halt at Gangtok.',
      },
      {
        t: 'Gangtok Sightseeing and Gangtok to Darjeeling',
        d: 'About 120 km / 4 hrs drive. After breakfast, check out and start a half-day Gangtok city tour covering Banjhakri Waterfalls, the Flower Show, the Handicraft Centre, Do Drul Chorten and the Institute of Tibetology (closed on Sundays). In the afternoon, transfer to Darjeeling and check in to your hotel. Night halt at Darjeeling.',
      },
      {
        t: 'Darjeeling Local City Tour',
        d: 'This morning, a Darjeeling city tour covering Tiger Hill, Ghoom Monastery, the Himalayan Mountaineering Institute, P.N. Zoological Park (closed on Thursdays), Tenzing Rock, a tea garden (outer view), the Peace Pagoda, the Japanese Temple and the Ropeway (ticket at guest’s own cost). Back to the hotel in the afternoon, then enjoy shopping on the famous Mall Road on foot. Night halt at Darjeeling.',
      },
      {
        t: 'Darjeeling to NJP Railway Station / Bagdogra (IXB) Airport',
        d: 'About 90 km / 3 hrs drive. After breakfast, check out of the hotel and transfer to NJP Railway Station or Bagdogra (IXB) Airport for your onward journey. Happy journey!',
      },
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
      {
        t: "Arrival at Port Blair + Cellular Jail Light & Sound Show + Corbyn's Cove Beach",
        d: "Arrival at Port Blair, where our representative meets and assists you at the airport and transfers you to your hotel to rest till the afternoon. In the afternoon, visit Corbyn's Cove Beach, a coconut-fringed beach about 8 km from Port Blair city. Late in the evening, witness the enthralling Sound and Light Show at Cellular Jail, where the heroic saga of the Indian freedom struggle is brought alive. Overnight stay at Port Blair.",
      },
      {
        t: 'Port Blair to Havelock + Radhanagar Beach',
        d: "After breakfast, check out from the hotel to catch a ferry to Havelock. The island (often just called Havelock) is one of the most beautiful and largest islands of Ritchie's Archipelago, a placid heaven like no other. Situated 57 km north-east of South Andaman with an area of 92 sq km, it offers a breathtaking trail of nature expeditions. On arrival, proceed to your hotel. In the afternoon, visit Beach No. 7, Radhanagar Beach (swimming beach), rated the best beach in Asia, and spend the day relaxing there. Stay overnight amongst sandy beaches and lush green forest in a comfortable beach resort. Overnight stay at Havelock Island.",
        notes: [
          'Do not forget to carry your own water bottle, snacks and a change of clothes.',
          'Breakfast this day is at Port Blair. If you are travelling by an early morning ferry, ask the hotel for a packed breakfast.',
          'Ferry timings are mentioned on the tickets provided to you. Please report at the ferry terminal 1 hour before departure with a valid photo ID card.',
          'Ferry operation is purely subject to weather conditions and government clearance.',
        ],
      },
      {
        t: 'Elephant Beach + Kalapathar Beach',
        d: 'After breakfast, proceed on a half-day trip to Elephant Beach by shared boat. In the afternoon, visit Kalapathar Beach. Overnight stay at Havelock Island.',
        notes: ['Do not forget to carry your own water bottle, snacks and a change of clothes.'],
      },
      {
        t: 'Havelock to Port Blair + Chidiya Tapu Beach',
        d: 'Breakfast at the hotel in the morning. Check out and transfer to the Havelock ferry terminal for the ferry back to Port Blair, then transfer to your hotel in Port Blair. In the afternoon, visit Chidiya Tapu Beach to enjoy the sunset. Overnight stay at Port Blair.',
      },
      {
        t: 'Departure',
        d: 'After breakfast this morning, pack your bags, check out of the hotel and go to the airport. Board your flight on time and depart with sweet memories.',
      },
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
      'Accommodation on double sharing basis in an AC room',
      'Meal plan CPAI (bed and breakfast only)',
      'Exclusive AC vehicle for all transfers and sightseeing at Port Blair and Havelock. The vehicle is not at your disposal; it is available as per the itinerary only (point to point basis)',
      'All ferry charges Port Blair – Havelock – Port Blair by Makruzz / Green Ocean / Nautika / ITT Majestic or similar. If private ferries do not operate, transfer by government ferry as per availability',
      'All entry tickets for Port Blair sightseeing only',
    ],
    exclusions: [
      'Cost of supplementary services, optional tours, upgrade charges, guide, snorkelling, glass-bottom boat ride, camera fees and entry fees to monuments and places',
      'Any airfare, train fare or helicopter fare',
      'Personal expenses (laundry, telephone, tips, mineral water, soft and hard drinks)',
      'Additional sightseeing or extra use of the vehicle other than mentioned in the itinerary',
      'Any cost arising from natural calamities like landslides, road blockages or political disturbances, to be borne by the client and paid directly on the spot',
      'Any increase in taxes or fuel prices leading to higher surface transport and land costs, which may come into effect before departure',
      'Travel insurance',
      'Anything which is not included in the package inclusions',
      '5% GST extra (not included in the package cost)',
    ],
    specialNotes: [
      'Travel dates: 1 October 2026 to 31 March 2027. Rates are not valid during peak season, 15 December 2026 to 15 January 2027.',
      'All rates are net and non-commissionable.',
      'All rooms are base category, unless the room category is mentioned.',
      'Rates will vary with an increase or decrease in the total number of passengers.',
      'The quote is valid for 3 days from the date it is sent. Rates are subject to room availability at the time of booking.',
    ],
    notes: [
      'Quotation is based on base category rooms at all places. Higher room categories cost extra, which we will inform you of at the time of booking.',
      'We issue ferry tickets after receiving the advance payment. Private ferry tickets are subject to availability at the time of issuance.',
      'All rates are net and non-commissionable to agents.',
      'Rooms are subject to availability at the time of confirmation.',
      'The above rates are valid for the given dates only.',
      'This is only an offer and not a confirmation of your booking. We proceed with your booking once we receive your payment. If we cannot get the original hotels, we will provide equivalent or alternative hotels.',
      'Ferry and entry charges are calculated at present rates. If ticket rates increase, the extra cost is to be paid by the guest.',
      'All sightseeing is subject to weather conditions and the issuance of permits.',
      'The Union Territory of Andaman and Nicobar Islands is a restricted area, so please carry a valid photo identity proof issued by the competent authorities for all travellers.',
      'Check-out time at most hotels in Port Blair, Havelock and Neil is 08:00 hrs. Late check-out is subject to availability only.',
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
    name: 'Rajasthan', nights: 5, days: 6, price: '24,700', ex: 'Jaipur, ends in Udaipur', exShort: 'Jaipur and ends in Udaipur',
    headPre: 'Discover ', headEm: 'Rajasthan', headLine2: 'Like Royalty',
    lede: 'The Pink City, holy Pushkar, the blue city of Jodhpur, Ranakpur’s marble temple and Udaipur’s lakes — three royal cities in one perfect trip.',
    stops: [
      { p: 'Jaipur', n: '2 nights', note: 'Hawa Mahal, Amber Fort', img: '/images/services/rajasthan-jaipur.webp', alt: 'Hawa Mahal facade, Jaipur', credit: 'Chainwit., CC BY-SA 4.0' },
      { p: 'Jodhpur', n: '1 night', note: 'Pushkar, Mehrangarh Fort', img: IMG + 'raj-jodhpur.webp', alt: 'Mehrangarh Fort ramparts over the blue city, Jodhpur', credit: 'Vyacheslav Argenberg, CC BY 4.0' },
      { p: 'Udaipur', n: '2 nights', note: 'Ranakpur, City Palace, Pichola', img: IMG + 'raj-udaipur.webp', alt: 'City Palace on Lake Pichola, Udaipur', credit: 'Jakub Hałun, CC BY-SA 4.0' }],
    days_list: [
      { t: 'Arrival Jaipur', d: 'On arrival in Jaipur, transfer to your hotel and check in. Rest of the day at leisure. Night stay at Jaipur.' },
      { t: 'Jaipur Sightseeing', d: 'A full day of Jaipur sightseeing in the Pink City. Night stay at Jaipur.' },
      { t: 'Jaipur – Pushkar – Jodhpur', tab: 'Jaipur to Jodhpur', d: 'About 380 km / 7 hrs drive. Check out and drive to Jodhpur via the holy town of Pushkar. Check in to your hotel. Night stay at Jodhpur.' },
      { t: 'Jodhpur – Ranakpur – Udaipur', tab: 'Jodhpur to Udaipur', d: 'About 260 km / 5 hrs drive. Check out and drive to Udaipur via Ranakpur. Check in to your hotel. Night stay at Udaipur.' },
      { t: 'Udaipur Sightseeing', d: 'A full day of Udaipur sightseeing in the City of Lakes. Night stay at Udaipur.' },
      { t: 'Udaipur Drop', d: 'After breakfast, check out and transfer to Udaipur airport or railway station for your onward journey.' },
    ],
    faq: [
      { q: 'Where does the trip start and end?', a: 'It starts in Jaipur and ends in Udaipur, so book your arrival into Jaipur and your departure from Udaipur. We match the transfers to your flight or train timings.' },
      { q: 'Can we add Jaisalmer or a desert camp night?', a: 'Yes. Jaisalmer and a Swiss tent camp night near the Sam dunes can be added on request. Send your dates and we will requote.' },
      { q: 'How long are the drives?', a: 'Jaipur to Jodhpur via Pushkar is about 380 km / 7 hours and Jodhpur to Udaipur via Ranakpur about 260 km / 5 hours. All drives are in a private vehicle with breaks.' },
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
      { p: 'Nainital', n: '3 nights', note: 'Naini Lake, Kainchi Dham', img: IMG + 'utk-nainital.webp', alt: 'Rowing boats on Naini Lake below the Nainital hills', credit: 'Praveen Singh Bisht, CC BY 2.0' },
      { p: 'Jim Corbett', n: '2 nights', note: 'Jungle safari', img: IMG + 'utk-corbett.webp', alt: 'Bengal tiger in the grassland of Jim Corbett National Park', credit: 'Soumyajit Nandy, CC BY-SA 4.0' }],
    days_list: [
      { t: 'Arrive Delhi to Nainital', tab: 'Delhi to Nainital', d: 'About 310 km / 6–7 hrs drive. On arrival in Delhi, drive up to Nainital and check in to your hotel. Night stay at Nainital.' },
      {
        t: 'Nainital Local Sightseeing',
        d: 'A day of Nainital local sightseeing around Naini Lake and the town. Night stay at Nainital.',
        notes: ['Vehicles are not allowed on Mall Road, so this stretch is explored on foot.'],
      },
      { t: 'Nainital: Shree Kainchi Dham', d: 'Visit Shree Kainchi Dham, the ashram of Param Pujya Baba Shri Neeb Karori Maharaj. Night stay at Nainital.' },
      { t: 'Nainital to Corbett', tab: 'Nainital to Corbett', d: 'About 120 km / 4 hrs drive. Check out and drive to Corbett, then check in to your resort near the park. Night stay at Corbett.' },
      { t: 'Corbett Jungle Safari', d: 'A jungle safari in Jim Corbett National Park, home of the Bengal tiger. Night stay at Corbett.' },
      { t: 'Corbett to Delhi, Airport Drop', d: 'About 250 km / 5 hrs drive. Check out and drive back to Delhi for your airport drop.' },
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
      { t: 'Arrival in Srinagar', d: 'On arrival at Srinagar airport, our representative meets you and transfers you to your hotel. Rest of the day at leisure. Night stay at Srinagar.' },
      { t: 'Local Sightseeing in Srinagar', d: 'A day of Srinagar local sightseeing: the Mughal gardens of Nishat and Shalimar, the Shankaracharya temple viewpoint and Dal Lake. Night stay at Srinagar.' },
      { t: 'Pahalgam Day Trip', tab: 'Pahalgam', d: 'A full-day trip to Pahalgam through saffron fields and apple orchards, to Betaab Valley and the Lidder river. Return to Srinagar in the evening.' },
      { t: 'Gulmarg Day Trip', tab: 'Gulmarg', d: 'A full-day trip to the snowy meadows of Gulmarg. Gondola tickets and sledge rides are at your own cost. Return to Srinagar in the evening.' },
      { t: 'Srinagar Airport Drop', tab: 'Srinagar', d: 'After breakfast, check out and transfer to Srinagar airport for your onward journey.' },
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
    lede: "Shimla's ridge, the Kullu valley drive, Manali sightseeing and a Rohtang Pass day, with a private vehicle through the whole loop from Chandigarh.",
    stops: [
      { p: 'Shimla', n: '2 nights', note: 'Ridge, Mall Road', img: IMG + 'him-shimla.webp', alt: 'Christ Church on the Ridge, Shimla', credit: 'Slyronit, CC BY-SA 4.0' },
      { p: 'Manali', n: '3 nights', note: 'Kullu, Manali, Rohtang Pass', img: IMG + 'him-manali.webp', alt: 'Solang Valley under snow near Manali', credit: 'Bleezebub, CC BY-SA 4.0' }],
    days_list: [
      { t: 'Arrive Chandigarh – Shimla', tab: 'Chandigarh to Shimla', d: 'About 110 km / 4 hrs drive. On arrival in Chandigarh, drive up to Shimla and check in to your hotel. Night stay at Shimla.' },
      { t: 'Shimla Sightseeing', d: 'A day of Shimla sightseeing around the Ridge, Christ Church and Mall Road. Night stay at Shimla.' },
      { t: 'Shimla – Kullu – Manali', tab: 'Shimla to Manali', d: 'About 285 km / 7 hrs drive. Check out and drive to Manali through the Kullu valley. Check in to your hotel. Night stay at Manali.' },
      { t: 'Manali Local Sightseeing', d: 'A day of Manali local sightseeing. Night stay at Manali.' },
      {
        t: 'Manali – Rohtang Pass',
        tab: 'Rohtang Pass',
        d: 'A day trip from Manali to Rohtang Pass. Return to Manali in the evening. Night stay at Manali.',
        notes: ['The Rohtang Pass trip is at your own cost.'],
      },
      { t: 'Manali – Chandigarh Drop', tab: 'Manali to Chandigarh', d: 'About 290 km / 7 hrs drive. After breakfast, check out and drive back to Chandigarh for your drop.' },
    ],
    faq: [
      { q: 'Is the Rohtang Pass trip included?', a: 'No. The Rohtang Pass trip is at your own cost. Rohtang usually closes in deep winter; when it is shut, the Atal Tunnel to Sissu or Solang Valley is the snow alternative, weather permitting.' },
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
