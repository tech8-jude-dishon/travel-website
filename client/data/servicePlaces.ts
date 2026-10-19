// Destination tiles on the /services overview page, grouped by winter package region.
// Photos from Wikimedia Commons (credit per tile), stored in /images/services/.

export interface ServicePlace { name: string; img: string; alt: string; credit: string }
export interface ServiceRegion { id: string; title: string; sub: string; places: ServicePlace[] }

const IMG = '/images/services/';

export const SERVICE_REGIONS: ServiceRegion[] = [
  {
    id: 'sikkim', title: 'Sikkim + Darjeeling',
    sub: 'Misty mountains, tea gardens and breathtaking Himalayan views',
    places: [
      { name: 'Gangtok', img: IMG + 'sikkim-gangtok.webp', alt: 'Kangchenjunga range seen from the Goecha La trail, Sikkim', credit: 'Ashinpt at enwiki, CC BY-SA 3.0' },
      { name: 'Darjeeling', img: IMG + 'sikkim-darjeeling.webp', alt: 'Darjeeling toy train passing shops in town', credit: 'Arne Hückelheim, CC BY-SA 4.0' },
      { name: 'Tsomgo Lake', img: IMG + 'sikkim-tsomgo-lake.webp', alt: 'Tsomgo Lake among the hills of East Sikkim', credit: 'Indrajit Das, CC BY 3.0' },
      { name: 'Yumthang Valley', img: IMG + 'sikkim-yumthang-valley.webp', alt: 'Yumthang Valley near Lachung, North Sikkim', credit: 'Joginder Pathak, CC BY-SA 2.0' },
      { name: 'Pelling', img: IMG + 'sikkim-pelling.webp', alt: 'Sunrise over Kangchenjunga seen from Pelling', credit: 'Santanu Paul, CC BY-SA 4.0' },
      { name: 'Ravangla', img: IMG + 'sikkim-ravangla.webp', alt: 'Ravangla town in South Sikkim', credit: 'Devsutapabublu, CC BY-SA 4.0' },
      { name: 'Lachung', img: IMG + 'sikkim-lachung.webp', alt: 'Lachung village in North Sikkim', credit: 'Indrajit Das, CC BY-SA 3.0' },
      { name: 'Namchi', img: IMG + 'sikkim-namchi.webp', alt: 'Giant Guru Padmasambhava statue at Namchi', credit: 'Subhrajyoti07, CC BY-SA 4.0' },
    ],
  },
  {
    id: 'andaman', title: 'Andaman',
    sub: 'Pristine beaches, turquoise waters and tropical paradise',
    places: [
      { name: 'Port Blair', img: IMG + 'andaman-port-blair.webp', alt: 'Port Blair harbour seen from South Point', credit: '(WT-en) Prateek4 at English Wikivoyage, Public domain' },
      { name: 'Havelock Island', img: IMG + 'andaman-havelock-island.webp', alt: 'Beach on Havelock (Swaraj Dweep) island', credit: 'Dr. K. Vedhagiri, CC BY-SA 3.0' },
      { name: 'Neil Island', img: IMG + 'andaman-neil-island.webp', alt: 'Natural rock arch on Neil (Shaheed Dweep) island', credit: 'Dorhodor, CC BY-SA 3.0' },
      { name: 'Ross Island', img: IMG + 'andaman-ross-island.webp', alt: 'Ruins on Ross Island (Netaji Subhas Chandra Bose Dweep)', credit: 'Travelira, CC BY-SA 4.0' },
      { name: 'Radhanagar Beach', img: IMG + 'andaman-radhanagar-beach.webp', alt: 'Sunset at Radhanagar Beach, Havelock', credit: 'Harvinder Chandigarh, CC BY-SA 4.0' },
      { name: 'Wandoor Marine Park', img: IMG + 'andaman-wandoor-marine-park.webp', alt: 'Mahatma Gandhi Marine National Park at Wandoor', credit: 'Nilanjan pathak, CC BY-SA 4.0' },
      { name: 'Cellular Jail', img: IMG + 'andaman-cellular-jail.webp', alt: 'Front view of the Cellular Jail, Port Blair', credit: 'Jomesh, CC BY 3.0' },
      { name: 'Barren Island', img: IMG + 'andaman-barren-island.webp', alt: 'Barren Island, the active volcano of the Andamans', credit: 'Rohitjahnavi, CC BY-SA 3.0' },
    ],
  },
  {
    id: 'rajasthan', title: 'Rajasthan',
    sub: 'Royal heritage, grand forts and vibrant cultural experiences',
    places: [
      { name: 'Jaipur', img: IMG + 'rajasthan-jaipur.webp', alt: 'Hawa Mahal facade, Jaipur', credit: 'Chainwit., CC BY-SA 4.0' },
      { name: 'Udaipur', img: IMG + 'rajasthan-udaipur.webp', alt: 'City Palace on Lake Pichola at dusk, Udaipur', credit: 'Geri from Biel/Bienne, Schweiz, CC BY-SA 2.0' },
      { name: 'Jodhpur', img: IMG + 'rajasthan-jodhpur.webp', alt: 'Mehrangarh Fort above Jodhpur', credit: 'Sanhitasinha, CC BY-SA 4.0' },
      { name: 'Jaisalmer', img: IMG + 'rajasthan-jaisalmer.webp', alt: 'Golden sandstone walls of Jaisalmer Fort', credit: 'Adrian Sulc, CC BY-SA 3.0' },
      { name: 'Pushkar', img: IMG + 'rajasthan-pushkar.webp', alt: 'Ghats around Pushkar Lake', credit: 'Bernard Gagnon, CC BY-SA 3.0' },
      { name: 'Bikaner', img: IMG + 'rajasthan-bikaner.webp', alt: 'Laxmi Niwas Palace, Bikaner', credit: 'DevUbc, CC BY-SA 4.0' },
      { name: 'Chittorgarh', img: IMG + 'rajasthan-chittorgarh.webp', alt: 'Chittorgarh Fort, Rajasthan', credit: 'Ssjoshi111, CC BY-SA 3.0' },
      { name: 'Ranthambore', img: IMG + 'rajasthan-ranthambore.webp', alt: 'Ranthambore National Park', credit: 'THerrington, CC BY-SA 3.0' },
    ],
  },
  {
    id: 'uttarakhand', title: 'Uttarakhand',
    sub: 'Sacred rivers, serene hills and spiritual journeys',
    places: [
      { name: 'Rishikesh', img: IMG + 'uttarakhand-rishikesh.webp', alt: 'Lakshman Jhula over the Ganga, Rishikesh', credit: 'KaustubhNayyar, CC BY-SA 4.0' },
      { name: 'Haridwar', img: IMG + 'uttarakhand-haridwar.webp', alt: 'Evening Ganga aarti at Haridwar', credit: 'pavankunar, CC BY-SA 4.0' },
      { name: 'Mussoorie', img: IMG + 'uttarakhand-mussoorie.webp', alt: 'Snow on the hills of Mussoorie', credit: 'Paul Hamilton, CC BY-SA 2.0' },
      { name: 'Nainital', img: IMG + 'uttarakhand-nainital.webp', alt: 'Naini Lake and Nainital town', credit: 'Skalvanov, CC BY-SA 4.0' },
      { name: 'Jim Corbett', img: IMG + 'uttarakhand-jim-corbett.webp', alt: 'Bengal tiger in Jim Corbett National Park', credit: 'Soumyajit Nandy, CC BY-SA 3.0' },
      { name: 'Auli', img: IMG + 'uttarakhand-auli.webp', alt: 'Himalayan peaks above Auli', credit: 'Vaibhav 369, CC BY-SA 4.0' },
      { name: 'Valley of Flowers', img: IMG + 'uttarakhand-valley-of-flowers.webp', alt: 'Meadows of the Valley of Flowers', credit: 'Original: Rohit Sharma Derivative work: UnpetitproleX, CC BY-SA 4.0' },
      { name: 'Kedarnath', img: IMG + 'uttarakhand-kedarnath.webp', alt: 'Kedarnath Temple below the mountains', credit: 'Shivam Kumar 766, CC BY-SA 4.0' },
    ],
  },
  {
    id: 'kashmir', title: 'Kashmir',
    sub: 'Paradise on earth with enchanting landscapes',
    places: [
      { name: 'Srinagar', img: IMG + 'kashmir-srinagar.webp', alt: 'Dal Lake near Hazratbal, Srinagar', credit: 'Suhail Skindar Sofi, CC BY-SA 4.0' },
      { name: 'Gulmarg', img: IMG + 'kashmir-gulmarg.webp', alt: 'Gulmarg Gondola over snowy slopes', credit: 'Arup1981, CC BY-SA 4.0' },
      { name: 'Pahalgam', img: IMG + 'kashmir-pahalgam.webp', alt: 'Lidder River flowing through Pahalgam', credit: 'Wikimedia Commons, CC0' },
      { name: 'Sonamarg', img: IMG + 'kashmir-sonamarg.webp', alt: 'Meadows and peaks of Sonamarg', credit: 'Wikiditot, CC BY-SA 4.0' },
      { name: 'Tulip Garden', img: IMG + 'kashmir-tulip-garden.webp', alt: 'Tulips in bloom at Srinagar', credit: 'Abdars, CC BY-SA 3.0' },
      { name: 'Betaab Valley', img: IMG + 'kashmir-betaab-valley.webp', alt: 'Betaab Valley near Pahalgam', credit: 'Nandanupadhyay, CC BY-SA 3.0' },
      { name: 'Yusmarg', img: IMG + 'kashmir-yusmarg.webp', alt: 'Meadows of Yusmarg', credit: 'Suhail Skindar Sofi, CC BY-SA 4.0' },
      { name: 'Doodhpathri', img: IMG + 'kashmir-doodhpathri.webp', alt: 'Scenic view over Doodhpathri', credit: 'Ankur P from Pune, India, CC BY-SA 2.0' },
    ],
  },
  {
    id: 'himachal', title: 'Himachal',
    sub: 'Snowy passes, apple orchards and quiet mountain villages',
    places: [
      { name: 'Manali', img: IMG + 'himachal-manali.webp', alt: 'Manali town in the Kullu valley', credit: 'Neerajsinghazm, CC BY-SA 4.0' },
      { name: 'Shimla', img: IMG + 'himachal-shimla.webp', alt: 'Hillside landscape of Shimla', credit: 'Navneet Sharma, CC BY-SA 4.0' },
      { name: 'Dharamshala', img: IMG + 'himachal-dharamshala.webp', alt: 'Dharamshala below the Dhauladhar range', credit: 'Amit Phulera, CC BY-SA 4.0' },
      { name: 'Dalhousie', img: IMG + 'himachal-dalhousie.webp', alt: 'Hills around Dalhousie', credit: 'Arkadeep Meta, CC BY-SA 4.0' },
      { name: 'Khajjiar', img: IMG + 'himachal-khajjiar.webp', alt: 'Meadow and forest at Khajjiar', credit: '7018412375, CC BY-SA 4.0' },
      { name: 'Spiti Valley', img: IMG + 'himachal-spiti-valley.webp', alt: 'Spiti River near Kaza', credit: 'Timothy A. Gonsalves, CC BY-SA 4.0' },
      { name: 'Kinnaur', img: IMG + 'himachal-kinnaur.webp', alt: 'Kamru Fort temple, Kinnaur', credit: 'Ashish Gupta from Noida, India, CC BY 2.0' },
      { name: 'Chitkul', img: IMG + 'himachal-chitkul.webp', alt: 'Wooden temple at Chitkul village', credit: 'Kaiho, CC BY-SA 3.0' },
    ],
  },
];
