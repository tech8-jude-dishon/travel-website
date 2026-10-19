// Card photo per winter package (960px WebP). Free-licence photos from Wikimedia Commons —
// credits are listed in PHOTO_CREDITS and shown on the India packages page.
export const WINTER_CARD_IMG: Record<string, string> = {
  sikkim: '/images/india-pkg/skm-kangchenjunga-sm.webp',
  andaman: '/images/india-pkg/and-mangrove-beach-sm.webp',
  rajasthan: '/images/india-pkg/raj-camel-sunset-sm.webp',
  uttarakhand: '/images/india-pkg/utk-nainital-sunset-sm.webp',
  kashmir: '/images/india-pkg/ksh-shikara-sm.webp',
  himachal: '/images/india-pkg/him-solang-sm.webp',
};

// Full-size (1920px) versions for hero / gallery use
export const WINTER_HERO_IMG: Record<string, string> = Object.fromEntries(
  Object.entries(WINTER_CARD_IMG).map(([k, v]) => [k, v.replace('-sm.webp', '.webp')]),
);

// CC BY / CC BY-SA require attribution
export const PHOTO_CREDITS: { place: string; creator: string; license: string; url: string }[] = [
  { place: 'Kashmir', creator: 'Billyakhtar', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/w/index.php?curid=49376460' },
  { place: 'Himachal', creator: 'Bleezebub', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/w/index.php?curid=49360002' },
  { place: 'Sikkim', creator: 'Jakub Michankow', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/w/index.php?curid=38646683' },
  { place: 'Uttarakhand', creator: 'Harshit.S.R', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/w/index.php?curid=123867950' },
  { place: 'Rajasthan', creator: 'Manish Pareek', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/w/index.php?curid=21016223' },
  { place: 'Andaman', creator: 'Vyacheslav Argenberg', license: 'CC BY 4.0', url: 'https://commons.wikimedia.org/w/index.php?curid=102119646' },
];
