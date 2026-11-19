const webp = (seed, width = 1800, height = 1100) =>
  `https://picsum.photos/seed/${seed}/${width}/${height}.webp`;

export const navigation = [
  { id: 'home', label: 'Home', href: '#top' },
  { id: 'discover', label: 'Discover the destination', href: '#discover' },
  { id: 'stay', label: 'Stay', href: '#stay', menu: 'stay' },
  { id: 'activities', label: 'Activities', href: '#activities', menu: 'activities' },
  { id: 'food', label: 'Food & local produce', href: '#themes' },
  { id: 'shops', label: 'Shops & services', href: '#footer' },
  { id: 'events', label: 'Events', href: '#highlights' }
];

export const megaMenus = {
  stay: {
    title: 'Find your place',
    intro: 'From quiet lakeside rooms to wild nights under the stars.',
    categories: [
      {
        id: 'hotels',
        label: 'Hotels & guesthouses',
        verb: 'Rest',
        groups: [
          {
            id: 'lakeside',
            label: 'Lakeside stays',
            links: [
              { label: 'Waterfront rooms', href: '#map' },
              { label: 'Breakfast terraces', href: '#map' },
              { label: 'Quiet harbours', href: '#map' }
            ]
          },
          {
            id: 'forest',
            label: 'Forest hideaways',
            links: [
              { label: 'Cabin weeks', href: '#map' },
              { label: 'Woodland cottages', href: '#map' },
              { label: 'Sauna stays', href: '#map' }
            ]
          }
        ]
      },
      {
        id: 'camping',
        label: 'Campsites & cabins',
        verb: 'Sleep wild',
        groups: [
          {
            id: 'tents',
            label: 'Under canvas',
            links: [
              { label: 'Lakeside pitches', href: '#map' },
              { label: 'Family camps', href: '#map' }
            ]
          },
          {
            id: 'cabins',
            label: 'Wooden cabins',
            links: [
              { label: 'Off-grid cabins', href: '#map' },
              { label: 'Fireplace cabins', href: '#map' }
            ]
          }
        ]
      }
    ]
  },
  activities: {
    title: 'Get moving',
    intro: 'Choose a verb, then follow the landscape.',
    categories: [
      {
        id: 'hiking',
        label: 'Hiking',
        verb: 'Hike',
        groups: [
          {
            id: 'circuits',
            label: 'Circuits',
            links: [
              { label: 'Lakeside circuit', href: '#map' },
              { label: 'Ridge loop', href: '#map' },
              { label: 'Forest return', href: '#map' }
            ]
          },
          {
            id: 'favourites',
            label: 'Favourites',
            links: [
              { label: 'Sunrise path', href: '#map' },
              { label: 'Waterfall walk', href: '#map' }
            ]
          },
          {
            id: 'report',
            label: 'Report a problem',
            links: [
              { label: 'Path maintenance', href: '#footer' },
              { label: 'Signage', href: '#footer' }
            ]
          }
        ]
      },
      {
        id: 'cycling',
        label: 'Cycling',
        verb: 'Pedal',
        groups: [
          {
            id: 'routes',
            label: 'Routes',
            links: [
              { label: 'Greenway ride', href: '#map' },
              { label: 'Village loop', href: '#map' }
            ]
          },
          {
            id: 'hire',
            label: 'Bike hire',
            links: [
              { label: 'E-bikes', href: '#footer' },
              { label: 'Family bikes', href: '#footer' }
            ]
          }
        ]
      },
      {
        id: 'horse',
        label: 'Horse riding',
        verb: 'Ride',
        groups: [
          {
            id: 'trails',
            label: 'Trails',
            links: [
              { label: 'Forest ride', href: '#map' },
              { label: 'Open pasture', href: '#map' }
            ]
          }
        ]
      },
      {
        id: 'water',
        label: 'Water',
        verb: 'Splash',
        groups: [
          {
            id: 'paddle',
            label: 'On the water',
            links: [
              { label: 'Canoe routes', href: '#map' },
              { label: 'Lake swimming', href: '#map' }
            ]
          }
        ]
      },
      {
        id: 'fishing',
        label: 'Fishing',
        verb: 'Fish',
        groups: [
          {
            id: 'spots',
            label: 'Best spots',
            links: [
              { label: 'River pools', href: '#map' },
              { label: 'Quiet lakes', href: '#map' }
            ]
          }
        ]
      }
    ]
  }
};

export const heroSlides = [
  {
    id: 'lakes',
    image: webp('little-scandinavia-lakes'),
    alt: 'A still lake between forested hills at first light',
    credit: 'Photo: Eira Lind · Lakes',
    href: '#theme-lakes'
  },
  {
    id: 'forest',
    image: webp('little-scandinavia-forest'),
    alt: 'A pale forest road disappearing into tall pines',
    credit: 'Photo: Matias Kale · Wilderness',
    href: '#theme-wilderness'
  },
  {
    id: 'volcano',
    image: webp('little-scandinavia-volcano'),
    alt: 'A dark volcanic ridge beneath a wide pale sky',
    credit: 'Photo: Sofia Vale · Volcanoes',
    href: '#theme-volcanoes'
  },
  {
    id: 'water',
    image: webp('little-scandinavia-rapids'),
    alt: 'Fast water moving over smooth stones in a gorge',
    credit: 'Photo: Jon Berg · Wild Waters',
    href: '#theme-wild-waters'
  },
  {
    id: 'skies',
    image: webp('little-scandinavia-skies'),
    alt: 'Wide open sky above a low northern landscape',
    credit: 'Photo: Aino Saari · Big Skies',
    href: '#discover'
  }
];

export const highlights = [
  {
    id: 'photo-festival',
    title: 'Lakeside Photography Festival',
    date: '28–30 May 2027',
    teaser:
      'Three days of open-air exhibitions, long-exposure workshops and midnight walks along the harbour, bringing photographers from across the region to the lakefront.',
    image: webp('little-scandinavia-festival', 1200, 800),
    alt: 'Visitors browsing photographs beside a harbour',
    credit: 'Photo: Lina Holm · Festival',
    href: '#footer'
  },
  {
    id: 'film-month',
    title: 'Documentary Film Month',
    date: 'Every Thursday in June 2027',
    teaser:
      'A monthly series of slow cinema and conversations about wild places, shown in village halls and converted barns, with local filmmakers introducing each screening.',
    image: webp('little-scandinavia-cinema', 1200, 800),
    alt: 'A small village cinema with warm light in the evening',
    credit: 'Photo: Oskar Nordin · Cinema',
    href: '#footer'
  },
  {
    id: 'cultural-season',
    title: 'The Cultural Season',
    date: 'July–September 2027',
    teaser:
      'Open studios, chamber music in old churches, harvest suppers and guided heritage walks make up a gentle season of events across all seventeen villages.',
    image: webp('little-scandinavia-culture', 1200, 800),
    alt: 'A summer concert in a stone church',
    credit: 'Photo: Meja Sund · Culture',
    href: '#footer'
  }
];

export const themes = [
  {
    id: 'lakes',
    title: 'Land of Lakes',
    credit: 'Photo: Eira Lind · Lakes',
    image: webp('little-scandinavia-theme-lakes', 1400, 1000),
    alt: 'A blue lake reflecting the sky between low hills',
    paragraph:
      'Follow the water from mirror-still bays to reed-lined channels. Every village has its own shore, its own quiet rhythm and a place to sit awhile.'
  },
  {
    id: 'science',
    title: 'Science',
    credit: 'Photo: Rune Aalto · Science',
    image: webp('little-scandinavia-theme-science', 1400, 1000),
    alt: 'A modern observatory in a northern landscape',
    paragraph:
      'Watch the night sky from a dark-sky reserve, visit the old geological museum and see how local researchers read the landscape layer by layer.'
  },
  {
    id: 'wild-waters',
    title: 'Wild Waters',
    credit: 'Photo: Jon Berg · Waters',
    image: webp('little-scandinavia-theme-water', 1400, 1000),
    alt: 'Rapids cutting through a rocky gorge',
    paragraph:
      'Rivers gather speed here. Walk the gorge paths, paddle the calm reaches and listen to water finding its way through ancient stone.'
  },
  {
    id: 'adventure',
    title: 'Adventure',
    credit: 'Photo: Kaja Nilsson · Adventure',
    image: webp('little-scandinavia-theme-adventure', 1400, 1000),
    alt: 'A cyclist on a gravel road beside a forest',
    paragraph:
      'Take the long way. Trails, greenways and forest roads connect the villages in a loose loop made for unhurried discovery.'
  },
  {
    id: 'wilderness',
    title: 'Wilderness',
    credit: 'Photo: Matias Kale · Wilderness',
    image: webp('little-scandinavia-theme-wilderness', 1400, 1000),
    alt: 'Dense pine forest under a soft morning mist',
    paragraph:
      'Mossy paths, open moorland and the hush of deep forest. The wild is never far away, even from the smallest village street.'
  },
  {
    id: 'volcanoes',
    title: 'Volcanoes',
    credit: 'Photo: Sofia Vale · Volcanoes',
    image: webp('little-scandinavia-theme-volcano', 1400, 1000),
    alt: 'A dark volcanic landscape with a distant crater',
    paragraph:
      'Black rock, hot springs and strange, beautiful shapes. The volcanic trail tells a slow story of fire, ice and time.'
  },
  {
    id: 'history',
    title: 'History',
    credit: 'Photo: Aino Saari · History',
    image: webp('little-scandinavia-theme-history', 1400, 1000),
    alt: 'An old stone castle beside a lake',
    paragraph:
      'Mining trails, old churches and quiet ruins sit beside the modern villages. Look closely and the past is everywhere.'
  }
];

export const villages = [
  { id: 'v1', name: 'Lakstad', x: 150, y: 170 },
  { id: 'v2', name: 'Fjordby', x: 300, y: 120 },
  { id: 'v3', name: 'Skogsvik', x: 470, y: 160 },
  { id: 'v4', name: 'Sjøby', x: 680, y: 130 },
  { id: 'v5', name: 'Myrvik', x: 830, y: 190 },
  { id: 'v6', name: 'Blåsjø', x: 110, y: 320 },
  { id: 'v7', name: 'Granvik', x: 265, y: 300 },
  { id: 'v8', name: 'Storsjø', x: 430, y: 340 },
  { id: 'v9', name: 'Kystby', x: 610, y: 310 },
  { id: 'v10', name: 'Fossby', x: 790, y: 355 },
  { id: 'v11', name: 'Høgda', x: 190, y: 470 },
  { id: 'v12', name: 'Bjørkvik', x: 355, y: 500 },
  { id: 'v13', name: 'Elvby', x: 520, y: 470 },
  { id: 'v14', name: 'Tindra', x: 690, y: 505 },
  { id: 'v15', name: 'Mosby', x: 850, y: 500 },
  { id: 'v16', name: 'Sørvik', x: 290, y: 590 },
  { id: 'v17', name: 'Vatnby', x: 760, y: 590 }
];

export const pointsOfInterest = [
  {
    id: 'castle',
    type: 'castle',
    label: 'Old castle',
    x: 250,
    y: 235,
    title: 'The lakeside castle',
    teaser: 'A weathered stone keep watches over the water and the village below.',
    image: webp('little-scandinavia-poi-castle', 1000, 700),
    alt: 'An old stone castle beside a lake',
    credit: 'Photo: Aino Saari · Castle',
    href: '#theme-history'
  },
  {
    id: 'lakes',
    type: 'lakes',
    label: 'Mirror lakes',
    x: 430,
    y: 220,
    title: 'The mirror lakes',
    teaser: 'Still water, reed beds and a horizon that seems to go on forever.',
    image: webp('little-scandinavia-poi-lakes', 1000, 700),
    alt: 'Still lakes reflecting a pale sky',
    credit: 'Photo: Eira Lind · Lakes',
    href: '#theme-lakes'
  },
  {
    id: 'gorges',
    type: 'gorges',
    label: 'Stone gorges',
    x: 620,
    y: 225,
    title: 'The stone gorges',
    teaser: 'River-cut channels, cool air and the constant sound of moving water.',
    image: webp('little-scandinavia-poi-gorge', 1000, 700),
    alt: 'A narrow rocky gorge with a river below',
    credit: 'Photo: Jon Berg · Gorges',
    href: '#theme-wild-waters'
  },
  {
    id: 'mining',
    type: 'mining',
    label: 'Mining heritage',
    x: 180,
    y: 420,
    title: 'Mining heritage trail',
    teaser: 'Old shafts and engine houses trace a century of work in the hills.',
    image: webp('little-scandinavia-poi-mining', 1000, 700),
    alt: 'An old mining building in a green valley',
    credit: 'Photo: Rune Aalto · Mining',
    href: '#theme-history'
  },
  {
    id: 'dams',
    type: 'dams',
    label: 'Hydroelectric dams',
    x: 365,
    y: 405,
    title: 'The old power dams',
    teaser: 'Concrete, water and mist at the places that first lit the villages.',
    image: webp('little-scandinavia-poi-dam', 1000, 700),
    alt: 'A hydroelectric dam spilling water',
    credit: 'Photo: Oskar Nordin · Dams',
    href: '#theme-science'
  },
  {
    id: 'greenway',
    type: 'greenway',
    label: 'Greenway',
    x: 545,
    y: 395,
    title: 'The greenway',
    teaser: 'A car-free path stitched together from old railway lines and forest tracks.',
    image: webp('little-scandinavia-poi-greenway', 1000, 700),
    alt: 'A green cycle path through trees',
    credit: 'Photo: Kaja Nilsson · Greenway',
    href: '#theme-adventure'
  },
  {
    id: 'volcanism',
    type: 'volcanism',
    label: 'Volcanism',
    x: 745,
    y: 430,
    title: 'The volcanic field',
    teaser: 'Black basalt and warm springs mark the youngest landscape in the region.',
    image: webp('little-scandinavia-poi-volcano', 1000, 700),
    alt: 'Dark volcanic rock with steam rising',
    credit: 'Photo: Sofia Vale · Volcanoes',
    href: '#theme-volcanoes'
  },
  {
    id: 'churches',
    type: 'churches',
    label: 'Old churches',
    x: 350,
    y: 565,
    title: 'Village churches',
    teaser: 'Painted wood, pale stone and bells that carry across the fields.',
    image: webp('little-scandinavia-poi-church', 1000, 700),
    alt: 'A small white church in a village',
    credit: 'Photo: Meja Sund · Churches',
    href: '#theme-history'
  },
  {
    id: 'default',
    type: 'default',
    label: 'Tourist office',
    x: 665,
    y: 555,
    title: 'The tourist office',
    teaser: 'Start here for maps, local advice and a warm welcome in the region.',
    image: webp('little-scandinavia-poi-office', 1000, 700),
    alt: 'The interior of a welcoming tourist office',
    credit: 'Photo: Lina Holm · Office',
    href: '#footer'
  }
];

export const footerImage = {
  src: webp('little-scandinavia-footer', 2000, 900),
  alt: 'A wide landscape of lakes, forest and mountains at dusk',
  credit: 'Photo: Aino Saari · Little Scandinavia'
};
