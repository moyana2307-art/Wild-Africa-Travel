const commons = (file, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

export const company = {
  name: 'Wild Africa Travel',
  email: 'info@wildafricatravel.co.zw',
  phones: ['+263 78 340 2388', '+263 77 673 9598'],
  whatsapp: '263783402388',
  offices: [
    '92C East Road, Belgravia, Harare, Zimbabwe',
    'Long Cheng Plaza, Shop 120–123, Belvedere, Harare, Zimbabwe'
  ],
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com/' },
    { name: 'Instagram', href: 'https://www.instagram.com/' }
  ]
};

export const images = {
  falls: commons('Cataratas Victoria, Zambia-Zimbabue, 2018-07-27, DD 21.jpg'),
  fallsWide: commons('Cataratas Victoria, Zambia-Zimbabue, 2018-07-27, DD 16-20 PAN.jpg'),
  fallsLunar: commons('Lunar Rainbow at Victoria Falls HP L2778e2.jpg'),
  fallsBridge: commons('Puente de las cataratas Victoria, Zambia-Zimbabue, 2018-07-27, DD 10.jpg'),
  fallsBridgeClassic: commons('Victoria Falls Bridge, Africa 092.jpg'),
  livingstoneFalls: commons('Mosi-oa-Tunya, Livingstone (20260519-P1075700).jpg'),
  hwangeElephant: commons('Hwange National Park, Zimbabwe (48595113747).jpg'),
  hwangeLandscape: commons('Hwange National Park, Zimbabwe (48594790636).jpg'),
  hwangePans: commons('Hwange National Park, Zimbabwe (48594879541).jpg'),
  hwangeWildlife: commons('Hwange National Park, Zimbabwe (48594967867).jpg'),
  chobeGiraffes: commons('Giraffes in Chobe National Park 04.jpg'),
  chobeKudu: commons('Greater kudu in Chobe National Park 01.jpg'),
  chobeLion: commons('Lion (Panthera leo) old male Chobe.jpg'),
  chobeKingfisher: commons('Brown-hooded Kingfisher, Chobe National Park, Botswana.jpg'),
  okavangoZebras: commons('Cebras de Burchell (Equus quagga burchellii), vista aérea del delta del Okavango, Botsuana, 2018-08-01, DD 30.jpg'),
  okavangoElephants: commons('Elefantes africanos de sabana (Loxodonta africana), delta del Okavango, Botsuana, 2018-07-31, DD 03.jpg'),
  okavangoMokoro: commons('Travesía del delta del Okavango en makoro, Botsuana, 2018-07-31, DD 08.jpg'),
  okavangoBird: commons('Jabirú africano (Ephippiorhynchus senegalensis), delta del Okavango, Botsuana, 2018-07-31, DD 11.jpg'),
  capeCampsBay: commons('Camps Bay, Cape Town, SA4.jpg'),
  capeTableMountain: commons('Cape Town (ZA), Table Mountain -- 2024 -- 2821.jpg'),
  capePanorama: commons('Cape Town (ZA), Table Mountain -- 2024 -- 2794+96+98+2800+01.jpg'),
  capeRidge: commons('Cape Town (ZA), Table Mountain -- 2024 -- 2825.jpg'),
  krugerElephant: commons('Kruger National Park (ZA), Elefant -- 2024 -- 0649.jpg'),
  krugerGiraffe: commons('Kruger National Park (ZA), Giraffe -- 2024 -- 0431.jpg'),
  krugerBush: commons('Kruger National Park (ZA), Kruger Tablets -- 2024 -- 0693.jpg'),
  namibiaDune: commons('006 Dune 45 in Sossusvlei at sunrise Photo by Giles Laurent.jpg'),
  namibiaDeadVlei: commons('Dead Vlei, Sossusvlei, Namibia, 2018-08-06, DD 041-049 PAN.jpg'),
  namibiaSossusvlei: commons('Sossusvlei, Namibia, 2018-08-06, DD 040.jpg'),
  namibiaRipples: commons('Sossusvlei Dune Rippled cropped.jpg'),
  greatZimbabwe: commons('Great-zim-aerial-looking-West.JPG'),
  greatZimbabweWalls: commons('Great-Zimbabwe-ruins-outer-walls-3-1200.jpg'),
  serengetiSunset: commons('017 Sunset in the Serengeti National Park Photo by Giles Laurent.jpg'),
  serengetiSunrise: commons('019 Sunrise in the Serengeti National Park Photo by Giles Laurent.jpg'),
  kariba: commons('Kariba, Zimbabwe 04.JPG'),
  karibaSunset: commons('Kariba, Zimbabwe 05.JPG'),
  safariVehicle: commons('Kapama Game Reserve safari photo en Jeep.jpg'),
  smallAircraft: commons('Cessna 185B Skywagon at Victoria Falls Wallner.jpg'),
  hotel: commons('The Kingdom Hotel, Victoria Falls 01.jpg')
};

export const heroSlides = [
  { id: 'falls', image: images.falls, name: 'Victoria Falls', country: 'Zimbabwe / Zambia', slug: 'victoria-falls' },
  { id: 'hwange', image: images.hwangeElephant, name: 'Hwange National Park', country: 'Zimbabwe', slug: 'hwange-national-park' },
  { id: 'delta', image: images.okavangoZebras, name: 'Okavango Delta', country: 'Botswana', slug: 'okavango-delta' },
  { id: 'cape', image: images.capeCampsBay, name: 'Cape Town', country: 'South Africa', slug: 'cape-town' },
  { id: 'namibia', image: images.namibiaDune, name: 'Sossusvlei', country: 'Namibia', slug: 'namibia' }
];

export const destinations = [
  {
    slug: 'victoria-falls',
    key: 'victoriaFalls',
    name: 'Victoria Falls',
    country: 'Zimbabwe',
    region: 'Zambezi',
    image: images.falls,
    gallery: [images.falls, images.fallsWide, images.fallsLunar, images.fallsBridge],
    lat: -17.9243,
    lng: 25.8572,
    featured: true,
    size: 'large'
  },
  {
    slug: 'hwange-national-park',
    key: 'hwangeNationalPark',
    name: 'Hwange National Park',
    country: 'Zimbabwe',
    region: 'Matabeleland North',
    image: images.hwangeElephant,
    gallery: [images.hwangeElephant, images.hwangeLandscape, images.hwangePans, images.hwangeWildlife],
    lat: -18.7,
    lng: 26.9,
    featured: true,
    size: 'tall'
  },
  {
    slug: 'chobe-national-park',
    key: 'chobeNationalPark',
    name: 'Chobe National Park',
    country: 'Botswana',
    region: 'Chobe',
    image: images.chobeGiraffes,
    gallery: [images.chobeGiraffes, images.chobeKudu, images.chobeLion, images.chobeKingfisher],
    lat: -18.15,
    lng: 24.4,
    featured: true,
    size: 'small'
  },
  {
    slug: 'okavango-delta',
    key: 'okavangoDelta',
    name: 'Okavango Delta',
    country: 'Botswana',
    region: 'Ngamiland',
    image: images.okavangoZebras,
    gallery: [images.okavangoZebras, images.okavangoElephants, images.okavangoMokoro, images.okavangoBird],
    lat: -19.2833,
    lng: 22.9167,
    featured: true,
    size: 'wide'
  },
  {
    slug: 'cape-town',
    key: 'capeTown',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Western Cape',
    image: images.capeCampsBay,
    gallery: [images.capeCampsBay, images.capeTableMountain, images.capePanorama, images.capeRidge],
    lat: -33.9249,
    lng: 18.4241,
    featured: true,
    size: 'small'
  },
  {
    slug: 'kruger-national-park',
    key: 'krugerNationalPark',
    name: 'Kruger National Park',
    country: 'South Africa',
    region: 'Mpumalanga / Limpopo',
    image: images.krugerElephant,
    gallery: [images.krugerElephant, images.krugerGiraffe, images.krugerBush, images.safariVehicle],
    lat: -23.9884,
    lng: 31.5547,
    featured: true,
    size: 'large'
  },
  {
    slug: 'namibia',
    key: 'namibia',
    name: 'Namibia',
    country: 'Namibia',
    region: 'Namib Desert',
    image: images.namibiaDune,
    gallery: [images.namibiaDune, images.namibiaDeadVlei, images.namibiaSossusvlei, images.namibiaRipples],
    lat: -24.7333,
    lng: 15.3,
    featured: true,
    size: 'tall'
  },
  {
    slug: 'zambia',
    key: 'zambia',
    name: 'Zambia',
    country: 'Zambia',
    region: 'Zambezi Valley',
    image: images.livingstoneFalls,
    gallery: [images.livingstoneFalls, images.fallsBridgeClassic, images.fallsLunar, images.karibaSunset],
    lat: -17.85,
    lng: 25.75,
    featured: true,
    size: 'wide'
  },
  {
    slug: 'harare',
    key: 'harare',
    name: 'Harare',
    country: 'Zimbabwe',
    region: 'Harare Province',
    image: images.greatZimbabwe,
    gallery: [images.greatZimbabwe, images.greatZimbabweWalls, images.kariba, images.karibaSunset],
    lat: -17.8252,
    lng: 31.0335,
    featured: false,
    size: 'small'
  },
  {
    slug: 'livingstone',
    key: 'livingstone',
    name: 'Livingstone',
    country: 'Zambia',
    region: 'Southern Province',
    image: images.fallsBridgeClassic,
    gallery: [images.fallsBridgeClassic, images.livingstoneFalls, images.fallsWide, images.karibaSunset],
    lat: -17.8556,
    lng: 25.8547,
    featured: false,
    size: 'small'
  }
];

export const mapLocations = [
  { id: 'harare', name: 'Harare', country: 'Zimbabwe', slug: 'harare', key: 'harare', type: 'city', lat: -17.8252, lng: 31.0335, image: images.greatZimbabwe },
  { id: 'victoria-falls', name: 'Victoria Falls', country: 'Zimbabwe', slug: 'victoria-falls', key: 'victoriaFalls', type: 'nature', lat: -17.9243, lng: 25.8572, image: images.falls },
  { id: 'hwange', name: 'Hwange', country: 'Zimbabwe', slug: 'hwange-national-park', key: 'hwangeNationalPark', type: 'nature', lat: -18.7, lng: 26.9, image: images.hwangeElephant },
  { id: 'chobe', name: 'Chobe', country: 'Botswana', slug: 'chobe-national-park', key: 'chobeNationalPark', type: 'nature', lat: -18.15, lng: 24.4, image: images.chobeGiraffes },
  { id: 'okavango', name: 'Okavango Delta', country: 'Botswana', slug: 'okavango-delta', key: 'okavangoDelta', type: 'nature', lat: -19.2833, lng: 22.9167, image: images.okavangoZebras },
  { id: 'cape-town', name: 'Cape Town', country: 'South Africa', slug: 'cape-town', key: 'capeTown', type: 'city', lat: -33.9249, lng: 18.4241, image: images.capeCampsBay },
  { id: 'kruger', name: 'Kruger National Park', country: 'South Africa', slug: 'kruger-national-park', key: 'krugerNationalPark', type: 'nature', lat: -23.9884, lng: 31.5547, image: images.krugerElephant },
  { id: 'livingstone', name: 'Livingstone', country: 'Zambia', slug: 'livingstone', key: 'livingstone', type: 'city', lat: -17.8556, lng: 25.8547, image: images.fallsBridgeClassic }
];

export const experiences = [
  { id: 'wildlife-safaris', key: 'wildlifeSafaris', image: images.chobeLion, slug: 'wildlife-safaris', featured: true },
  { id: 'adventure-outdoor', key: 'adventureOutdoor', image: images.okavangoMokoro },
  { id: 'cultural', key: 'cultural', image: images.greatZimbabweWalls },
  { id: 'luxury-escapes', key: 'luxuryEscapes', image: images.namibiaSossusvlei },
  { id: 'family-holidays', key: 'familyHolidays', image: images.chobeGiraffes },
  { id: 'romantic-getaways', key: 'romanticGetaways', image: images.karibaSunset },
  { id: 'guided-tours', key: 'guidedTours', image: images.safariVehicle },
  { id: 'multi-country', key: 'multiCountry', image: images.serengetiSunset }
];

export const journeys = [
  {
    slug: 'victoria-falls-discovery',
    key: 'victoriaFallsDiscovery',
    image: images.falls,
    category: 'Zimbabwe / Zambia'
  },
  {
    slug: 'zimbabwe-wildlife-safari',
    key: 'zimbabweWildlifeSafari',
    image: images.hwangeElephant,
    category: 'Zimbabwe'
  },
  {
    slug: 'zimbabwe-botswana-explorer',
    key: 'zimbabweBotswanaExplorer',
    image: images.okavangoMokoro,
    category: 'Zimbabwe / Botswana'
  },
  {
    slug: 'southern-africa-grand-adventure',
    key: 'southernAfricaGrandAdventure',
    image: images.namibiaDune,
    category: 'Multi-country'
  },
  {
    slug: 'cape-town-victoria-falls-escape',
    key: 'capeTownVictoriaFallsEscape',
    image: images.capeCampsBay,
    category: 'South Africa / Zimbabwe'
  }
];

export const services = [
  { id: 'flights', key: 'flights', icon: 'Plane', image: images.smallAircraft },
  { id: 'hotels', key: 'hotels', icon: 'BedDouble', image: images.hotel },
  { id: 'visas', key: 'visas', icon: 'FileCheck2', image: images.fallsBridgeClassic },
  { id: 'cars', key: 'cars', icon: 'CarFront', image: images.safariVehicle },
  { id: 'tours', key: 'tours', icon: 'Compass', image: images.chobeLion },
  { id: 'tailor-made', key: 'tailorMade', icon: 'Route', image: images.okavangoMokoro }
];

export const stories = [
  {
    slug: 'falls-after-the-rain',
    key: 'fallsAfterRain',
    image: images.fallsWide,
    body: [
      'After the rains, the Zambezi carries more water and the falls become a wall of movement and sound. The spray can be felt from a long way away, and the rainforest paths are at their most alive.',
      'This is a spectacular time to visit, but it is also a time to plan carefully. Some viewpoints can be wet, and the amount of spray changes with the wind. We help travellers choose the right side of the river and the right time of day.',
      'For many visitors, the most memorable moment is not the first view of the falls, but the quiet that arrives when the path turns and the river appears again below the mist.'
    ]
  },
  {
    slug: 'where-the-elephants-gather',
    key: 'hwangeElephants',
    image: images.hwangeElephant,
    body: [
      'Hwange is a park of patience. Its waterholes draw animals in numbers that can seem almost still at first, until you notice the constant movement at the edge of the water.',
      'Elephants often arrive in family groups, moving with a caution that belies their size. Buffalo, zebra and antelope follow, and the predators are never far from the story.',
      'A good game drive here is not measured by distance covered. It is measured by the hours spent watching a single stretch of water as the light changes.'
    ]
  },
  {
    slug: 'the-delta-by-water',
    key: 'okavangoByWater',
    image: images.okavangoMokoro,
    body: [
      'At water level, the Okavango Delta becomes intimate. The reeds rise above the mokoro, the bird calls are close, and the channel bends slowly through a landscape that seems newly made.',
      'A guided walk on one of the islands reveals another scale entirely: tracks, grasses, termite mounds and the sudden appearance of wildlife between the trees.',
      'The delta rewards travellers who allow time for both stillness and movement. It is less a checklist than a place to notice.'
    ]
  },
  {
    slug: 'from-cape-town-to-the-falls',
    key: 'capeToCape',
    image: images.capeTableMountain,
    body: [
      'Cape Town and Victoria Falls could not look more different. One is shaped by mountain, ocean and city life; the other by a river falling into a gorge of basalt and rainforest.',
      'That contrast is exactly what makes the pairing work. A traveller can begin with coastal roads and Table Mountain, then fly north to a landscape defined by water and wilderness.',
      'With the right pacing, the two destinations feel like chapters of the same journey rather than separate stops.'
    ]
  },
  {
    slug: 'travelling-in-the-green-season',
    key: 'greenSeason',
    image: images.serengetiSunrise,
    body: [
      'The green season changes the rhythm of the bush. Skies build dramatically, new growth spreads across the plains and birdlife becomes especially active.',
      'Wildlife may be more dispersed, but the landscapes are open and the light is extraordinary. It is a rewarding time for photographers and for travellers who prefer fewer crowds.',
      'The key is flexibility. Routes can be shaped around weather, river levels and the best available sightings, with enough time built in to enjoy the atmosphere.'
    ]
  }
];

export const whyUs = [
  { key: 'personal', icon: 'UserRoundCheck' },
  { key: 'expertise', icon: 'BookOpenCheck' },
  { key: 'flights', icon: 'Plane' },
  { key: 'hotels', icon: 'BedDouble' },
  { key: 'visas', icon: 'FileCheck2' },
  { key: 'support', icon: 'Headset' }
];

export const countries = ['All', 'Zimbabwe', 'Botswana', 'South Africa', 'Namibia', 'Zambia'];
