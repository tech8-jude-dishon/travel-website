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
  /** Short start/end line for the route badge and the price card, e.g. "Starts and ends at Port Blair". */
  startEnd: string;
  /** Hero heading; the part in `headEm` is drawn in the script font. */
  headPre: string;
  headEm: string;
  headLine2: string;
  lede: string;
  stops: WinterStop[];
  /** `tab` overrides the place shown on that day's tab. */
  /** Optional per-day `img`/`alt`/`credit` (and `place` for its pin label) replace the stop's photo for that day. */
  days_list: { t: string; d: string; notes?: string[]; tab?: string; img?: string; alt?: string; credit?: string; place?: string }[];
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
    name: 'Sikkim and Darjeeling', nights: 4, days: 5, price: '20,600', ex: 'Bagdogra Airport or NJP Railway Station', exShort: 'Bagdogra airport or NJP station', startEnd: 'Starts and ends at Bagdogra / NJP',
    headPre: 'Discover ', headEm: 'Sikkim', headLine2: '& Darjeeling',
    lede: 'Tsomgo Lake, sunrise at Tiger Hill and two easy hill towns, with hotels, transfers and permits already handled.',
    stops: [
      { p: 'Gangtok', n: '2 nights', note: 'Tsomgo Lake, MG Marg', img: IMG + 'skm-gangtok.webp', alt: 'Turquoise Tsomgo Lake among snowy slopes, East Sikkim', credit: 'Indrajit Das, CC BY 3.0' },
      { p: 'Darjeeling', n: '2 nights', note: 'Tiger Hill, tea gardens', img: IMG + 'skm-darjeeling.webp', alt: 'Darjeeling Himalayan Railway toy train steaming through the hills', credit: 'Public domain' }],
    days_list: [
      {
        t: 'NJP Railway Station / Bagdogra (IXB) Airport to Gangtok',
        img: IMG + 'skm-day1-mgmarg.webp', alt: 'MG Marg, the pedestrian promenade in the heart of Gangtok', credit: 'Bernard Gagnon, CC BY-SA 4.0', place: 'Gangtok',
        d: "About 125 km / 4 hrs. Our representative meets you at NJP or Bagdogra and transfers you to your Gangtok hotel.",
      },
      {
        t: 'Gangtok: Tsomgo Lake + Baba Mandir (New)',
        d: "Half-day trip to sacred Tsomgo Lake (12,400 ft), 32 km from Gangtok, and the new Baba Harbhajan Singh Mandir.",
      },
      {
        t: 'Gangtok Sightseeing and Gangtok to Darjeeling',
        img: IMG + 'skm-day3-chorten.webp', alt: 'Do Drul Chorten stupa in Gangtok under a blue sky', credit: 'Amitabha Gupta, CC BY 4.0', place: 'Gangtok',
        d: "Gangtok city tour (Banjhakri Falls, Do Drul Chorten, Tibetology), then a 120 km / 4 hrs drive to Darjeeling.",
      },
      {
        t: 'Darjeeling Local City Tour',
        img: IMG + 'skm-day4-tigerhill.webp', alt: 'Kangchenjunga above the hills, seen from Tiger Hill, Darjeeling', credit: 'Owasim raja ahmed, CC BY-SA 4.0', place: 'Tiger Hill, Darjeeling',
        d: "Tiger Hill, Ghoom Monastery, HMI, the zoo, Peace Pagoda and a tea garden, then shopping on Mall Road.",
      },
      {
        t: 'Darjeeling to NJP Railway Station / Bagdogra (IXB) Airport',
        d: "About 90 km / 3 hrs. After breakfast, transfer to NJP Railway Station or Bagdogra Airport. Happy journey!",
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
    name: 'Port Blair & Havelock', nights: 4, days: 5, price: '22,300', ex: 'Port Blair', startEnd: 'Starts and ends at Port Blair',
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
        d: "Airport pickup and hotel check-in. Afternoon at Corbyn's Cove Beach, evening Light & Sound Show at Cellular Jail.",
      },
      {
        t: 'Port Blair to Havelock + Radhanagar Beach',
        d: "Morning ferry to Havelock, one of the Andamans' most beautiful islands. Afternoon at Radhanagar Beach, rated Asia's best.",
      },
      {
        t: 'Elephant Beach + Kalapathar Beach',
        img: IMG + 'and-day3-elephant-beach.webp', alt: 'Clear turquoise water at Elephant Beach, Havelock Island', credit: 'Subro89, CC BY-SA 4.0', place: 'Elephant Beach, Havelock',
        d: "Half-day shared boat trip to Elephant Beach, then Kalapathar Beach in the afternoon. Overnight at Havelock.",
      },
      {
        t: 'Havelock to Port Blair + Chidiya Tapu Beach',
        img: IMG + 'and-day4-chidiya-tapu.webp', alt: 'Boats on calm water at sunset, Chidiya Tapu near Port Blair', credit: 'Sivajiphotographer, CC0', place: 'Chidiya Tapu, Port Blair',
        d: "Ferry back to Port Blair and hotel check-in. Afternoon at Chidiya Tapu Beach to watch the sunset.",
      },
      {
        t: 'Departure',
        d: "After breakfast, check out and transfer to Port Blair airport. Depart with sweet memories.",
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
    name: 'Rajasthan', nights: 5, days: 6, price: '24,700', ex: 'Jaipur, ends in Udaipur', exShort: 'Jaipur and ends in Udaipur', startEnd: 'Starts in Jaipur, ends in Udaipur',
    headPre: 'Discover ', headEm: 'Rajasthan', headLine2: 'Like Royalty',
    lede: 'The Pink City, holy Pushkar, the blue city of Jodhpur, Ranakpur’s marble temple and Udaipur’s lakes — three royal cities in one perfect trip.',
    stops: [
      { p: 'Jaipur', n: '2 nights', note: 'Hawa Mahal, Amber Fort', img: '/images/services/rajasthan-jaipur.webp', alt: 'Hawa Mahal facade, Jaipur', credit: 'Chainwit., CC BY-SA 4.0' },
      { p: 'Jodhpur', n: '1 night', note: 'Pushkar, Mehrangarh Fort', img: IMG + 'raj-jodhpur.webp', alt: 'Mehrangarh Fort ramparts over the blue city, Jodhpur', credit: 'Vyacheslav Argenberg, CC BY 4.0' },
      { p: 'Udaipur', n: '2 nights', note: 'Ranakpur, City Palace, Pichola', img: IMG + 'raj-udaipur.webp', alt: 'City Palace on Lake Pichola, Udaipur', credit: 'Jakub Hałun, CC BY-SA 4.0' }],
    days_list: [
      { t: 'Arrival Jaipur', img: IMG + 'raj-day1-jal-mahal.webp', alt: 'Jal Mahal water palace on Man Sagar Lake, Jaipur', credit: 'Jakub Hałun, CC BY-SA 4.0', place: 'Jal Mahal, Jaipur', d: 'On arrival in Jaipur, transfer to your hotel and check in. Rest of the day at leisure. Night stay at Jaipur.' },
      { t: 'Jaipur Sightseeing', d: 'A full day of Jaipur sightseeing in the Pink City. Night stay at Jaipur.' },
      { t: 'Jaipur – Pushkar – Jodhpur', tab: 'Jaipur to Jodhpur', d: "About 380 km / 7 hrs. Drive to Jodhpur via the holy town of Pushkar and check in. Night stay at Jodhpur." },
      { t: 'Jodhpur – Ranakpur – Udaipur', tab: 'Jodhpur to Udaipur', img: IMG + 'raj-day4-ranakpur.webp', alt: 'Marble Jain temple at Ranakpur under a blue sky', credit: 'Ingo Mehling, CC BY-SA 3.0', place: 'Ranakpur', d: 'About 260 km / 5 hrs drive. Check out and drive to Udaipur via Ranakpur. Check in to your hotel. Night stay at Udaipur.' },
      { t: 'Udaipur Sightseeing', d: 'A full day of Udaipur sightseeing in the City of Lakes. Night stay at Udaipur.' },
      { t: 'Udaipur Drop', img: IMG + 'raj-day6-pichola.webp', alt: 'Sunset over Lake Pichola, Udaipur', credit: 'UnpetitproleX, CC BY-SA 4.0', place: 'Lake Pichola, Udaipur', d: 'After breakfast, check out and transfer to Udaipur airport or railway station for your onward journey.' },
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
    name: 'Uttarakhand', nights: 5, days: 6, price: '24,500', ex: 'Delhi Airport or Railway Station', exShort: 'Delhi airport or railway station', startEnd: 'Starts and ends in Delhi',
    headPre: 'Discover ', headEm: 'Uttarakhand', headLine2: 'Lakes & Jungle',
    lede: 'Three nights by the lakes and two inside Corbett country, picked up and dropped back in Delhi.',
    stops: [
      { p: 'Nainital', n: '3 nights', note: 'Naini Lake, Kainchi Dham', img: IMG + 'utk-nainital.webp', alt: 'Rowing boats on Naini Lake below the Nainital hills', credit: 'Praveen Singh Bisht, CC BY 2.0' },
      { p: 'Jim Corbett', n: '2 nights', note: 'Jungle safari', img: IMG + 'utk-corbett.webp', alt: 'Bengal tiger in the grassland of Jim Corbett National Park', credit: 'Soumyajit Nandy, CC BY-SA 4.0' }],
    days_list: [
      { t: 'Arrive Delhi to Nainital', tab: 'Delhi to Nainital', img: IMG + 'utk-day1-hill-road.webp', alt: 'Hill road winding down to Naini Lake, Nainital', credit: 'Suswa9498, CC BY-SA 4.0', place: 'Nainital', d: 'About 310 km / 6–7 hrs drive. On arrival in Delhi, drive up to Nainital and check in to your hotel. Night stay at Nainital.' },
      {
        t: 'Nainital Local Sightseeing',
        d: 'A day of Nainital local sightseeing around Naini Lake and the town. Night stay at Nainital.',
      },
      { t: 'Nainital: Shree Kainchi Dham', img: IMG + 'utk-day3-kainchi-dham.webp', alt: 'Shree Kainchi Dham ashram beside the river in the morning sun', credit: '25 Cents FC, CC BY-SA 3.0', place: 'Kainchi Dham', d: 'Visit Shree Kainchi Dham, the ashram of Param Pujya Baba Shri Neeb Karori Maharaj. Night stay at Nainital.' },
      { t: 'Nainital to Corbett', tab: 'Nainital to Corbett', img: IMG + 'utk-day4-dhikala.webp', alt: 'Golden grassland and a jungle trail at Dhikala, Jim Corbett National Park', credit: 'Atanudey83, CC BY-SA 4.0', place: 'Jim Corbett', d: "About 120 km / 4 hrs. Drive from Nainital to your resort near Corbett and check in. Night stay at Corbett." },
      { t: 'Corbett Jungle Safari', d: 'A jungle safari in Jim Corbett National Park, home of the Bengal tiger. Night stay at Corbett.' },
      { t: 'Corbett to Delhi, Airport Drop', img: IMG + 'utk-day6-corbett-falls.webp', alt: 'Corbett Falls in the forest near Jim Corbett National Park', credit: 'Pranav4321, CC BY-SA 4.0', place: 'Corbett Falls', d: 'About 250 km / 5 hrs drive. Check out and drive back to Delhi for your airport drop.' },
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
    name: 'Kashmir', nights: 4, days: 5, price: '15,300', ex: 'Srinagar', exShort: 'Srinagar airport', startEnd: 'Starts and ends at Srinagar',
    headPre: 'Discover ', headEm: 'Kashmir', headLine2: 'Snow & Shikaras',
    lede: 'Mughal gardens, a day each in Gulmarg and Pahalgam, and a shikara ride to your Dal Lake houseboat.',
    stops: [
      { p: 'Srinagar', n: '3 nights', note: 'Gardens, Gulmarg, Pahalgam', img: IMG + 'ksh-srinagar.webp', alt: 'Snow-covered cottage among pines in Gulmarg', credit: 'Zahoor Bhat, CC BY-SA 4.0' },
      { p: 'Houseboat', n: '1 night', note: 'Dal Lake', img: IMG + 'ksh-houseboat.webp', alt: 'Carved wooden houseboat on Dal Lake, Srinagar', credit: 'Slyronit, CC BY-SA 4.0' }],
    days_list: [
      { t: 'Arrival in Srinagar', img: '/images/india-pkg/ksh-shikara.webp', alt: 'Painted shikara boat on Dal Lake, Srinagar', place: 'Dal Lake, Srinagar', d: "Our representative meets you at Srinagar airport and transfers you to your hotel. Rest of the day at leisure." },
      { t: 'Local Sightseeing in Srinagar', img: IMG + 'ksh-day2-nishat-bagh.webp', alt: 'Terraced lawns, flower beds and fountains of Nishat Bagh below the mountains', credit: 'McKay Savage, CC BY 2.0', place: 'Nishat Bagh, Srinagar', d: "The Mughal gardens of Nishat and Shalimar, the Shankaracharya temple viewpoint and Dal Lake." },
      { t: 'Pahalgam Day Trip', tab: 'Pahalgam', img: IMG + 'ksh-day3-betaab-valley.webp', alt: 'Green meadows and pine forest in Betaab Valley, Pahalgam', credit: 'Nandanupadhyay, CC BY-SA 3.0', place: 'Betaab Valley, Pahalgam', d: "Full-day trip through saffron fields and apple orchards to Betaab Valley and the Lidder river." },
      { t: 'Gulmarg Day Trip', tab: 'Gulmarg', img: IMG + 'ksh-day4-gulmarg.webp', alt: 'Snow-covered meadow below the peaks at Gulmarg', credit: 'Ask6626, CC BY-SA 4.0', place: 'Gulmarg', d: "Full-day trip to the snowy meadows of Gulmarg, back to Srinagar in the evening." },
      { t: 'Srinagar Airport Drop', tab: 'Srinagar', place: 'Dal Lake, Srinagar', d: 'After breakfast, check out and transfer to Srinagar airport for your onward journey.' },
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
    name: 'Splendid Himachal', nights: 5, days: 6, price: '15,600', ex: 'Chandigarh', exShort: 'Chandigarh airport or railway station', startEnd: 'Starts and ends at Chandigarh',
    headPre: 'Discover ', headEm: 'Himachal', headLine2: 'Snow & Hills',
    lede: "Shimla's ridge, the Kullu valley drive, Manali sightseeing and a Rohtang Pass day, with a private vehicle through the whole loop from Chandigarh.",
    stops: [
      { p: 'Shimla', n: '2 nights', note: 'Ridge, Mall Road', img: IMG + 'him-shimla.webp', alt: 'Christ Church on the Ridge, Shimla', credit: 'Slyronit, CC BY-SA 4.0' },
      { p: 'Manali', n: '3 nights', note: 'Kullu, Manali, Rohtang Pass', img: IMG + 'him-manali.webp', alt: 'Solang Valley under snow near Manali', credit: 'Bleezebub, CC BY-SA 4.0' }],
    days_list: [
      { t: 'Arrive Chandigarh – Shimla', tab: 'Chandigarh to Shimla', img: IMG + 'him-day1-mall-road.webp', alt: 'Snow-dusted Mall Road and hills in Shimla', credit: 'UnpetitproleX, CC BY-SA 4.0', place: 'Mall Road, Shimla', d: 'About 110 km / 4 hrs drive. On arrival in Chandigarh, drive up to Shimla and check in to your hotel. Night stay at Shimla.' },
      { t: 'Shimla Sightseeing', d: 'A day of Shimla sightseeing around the Ridge, Christ Church and Mall Road. Night stay at Shimla.' },
      { t: 'Shimla – Kullu – Manali', tab: 'Shimla to Manali', img: IMG + 'him-day3-kullu-valley.webp', alt: 'Green Beas valley below snowy peaks at Palchan, Kullu', credit: 'Biswarup Ganguly (edit: UnpetitproleX), CC BY 3.0', place: 'Kullu Valley', d: "About 285 km / 7 hrs. Drive to Manali through the Kullu valley and check in. Night stay at Manali." },
      { t: 'Manali Local Sightseeing', img: IMG + 'him-day4-hidimba.webp', alt: 'Wooden pagoda-roofed Hidimba Devi Temple among deodar trees, Manali', credit: 'Ganesh Mohan T, CC BY-SA 4.0', place: 'Hidimba Temple, Manali', d: 'A day of Manali local sightseeing. Night stay at Manali.' },
      {
        t: 'Manali – Rohtang Pass',
        img: IMG + 'him-day5-rohtang.webp', alt: 'Snow-covered slopes at Rohtang Pass', credit: 'BIPROJYOTI, CC BY-SA 4.0', place: 'Rohtang Pass',
        tab: 'Rohtang Pass',
        d: 'A day trip from Manali to Rohtang Pass. Return to Manali in the evening. Night stay at Manali.',
      },
      { t: 'Manali – Chandigarh Drop', tab: 'Manali to Chandigarh', img: '/images/india-pkg/him-solang.webp', alt: 'Solang Valley under snow near Manali', place: 'Solang Valley, Manali', d: 'About 290 km / 7 hrs drive. After breakfast, check out and drive back to Chandigarh for your drop.' },
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
