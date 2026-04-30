import type { AffiliateProduct, PlanSlug } from '@/types'

/**
 * Affiliate product registry.
 *
 * The first block (no `deprecated` flag) is the active recommendation
 * set — these are what render on guide gear shelves, the quiz results
 * `<AffiliateBlock>`, and the Trip Pack PDF bundles. Sourced from the
 * curated worksheet in `data/affiliate-coverage.csv`.
 *
 * The second block (`deprecated: true`) keeps older products in the
 * registry so the `/compare/*` editorial pages and historical references
 * keep rendering. Anything reached via `getGearForGuide()` or the new
 * recommendation paths excludes deprecated entries.
 */
export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  // ------------------------------------------------------------------
  // Active recommendation set — sourced from data/affiliate-coverage.csv
  // ------------------------------------------------------------------
  {
    id: 'coleman-sundome-4p',
    name: 'Coleman Sundome 4-Person',
    description:
      'Best-selling family dome tent. 9×7 ft floor, weatherproof, fits a queen air bed. Sets up in under 15 minutes.',
    amazonAsin: 'B0D7QHY574',
    imageUrl: 'https://m.media-amazon.com/images/I/71wxEg6ubCL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$68',
    tags: ['tent', 'family', 'budget', 'beginner', 'rain-ready', 'with-kids'],
    slot: 'TENT',
  },
  {
    id: 'fanttik-zeta-c6-pro',
    name: 'Fanttik Zeta C6 Pro',
    description:
      'Pop-up cabin tent for 6+. Vertical walls, fast pitch, two doors. The size-up pick when you want room to stand.',
    amazonAsin: 'B0CRL4GDDR',
    imageUrl: 'https://m.media-amazon.com/images/I/61vY3Vy0leL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$179',
    tags: ['tent', 'family', 'mid-range', 'comfort'],
    slot: 'TENT',
  },
  {
    id: 'alps-lynx-4p',
    name: 'ALPS Mountaineering Lynx 4-Person Tent',
    description:
      'Sturdier free-standing 4-person tent than the budget picks. Better fly coverage and pole quality for the price.',
    amazonAsin: 'B0CXKQWRDD',
    imageUrl: 'https://m.media-amazon.com/images/I/51LCvZqQ1rL._AC_SL1000_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$190',
    tags: ['tent', 'family', 'mid-range', 'comfort'],
    slot: 'TENT',
  },
  {
    id: 'tnf-wawona-6',
    name: 'The North Face Wawona 6',
    description:
      '6-person tent with a huge vestibule. The pick when heat or sun makes the porch as important as the inner room.',
    amazonAsin: 'B0DG5XTJTY',
    imageUrl: 'https://m.media-amazon.com/images/I/61ypWVbZ2AL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$585',
    tags: ['tent', 'family', 'premium', 'comfort', 'shade', 'heat-friendly'],
    slot: 'TENT',
  },
  {
    id: 'coleman-brazos-bag',
    name: 'Coleman Brazos Sleeping Bag',
    description:
      '3-season cool-weather sleeping bag. Roomy fit, easy to wash, comfortable down to the 40s.',
    amazonAsin: 'B0D6416YYW',
    imageUrl: 'https://m.media-amazon.com/images/I/71SIunv+zrL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$54',
    tags: ['sleeping-bag', 'budget', 'beginner'],
    slot: 'SLEEP_BAG',
  },
  {
    id: 'vumos-bag-liner',
    name: 'Vumos Sleeping Bag Liner',
    description:
      'Sleeping bag liner. Adds warmth in shoulder seasons, keeps the bag clean, doubles as a sheet in heat.',
    amazonAsin: 'B07PRRV7NM',
    imageUrl: 'https://m.media-amazon.com/images/I/61eaYiIy1wL._AC_SX679_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$20',
    tags: ['sleeping-bag', 'budget', 'cold-ready', 'comfort'],
    slot: 'SLEEP_BAG',
  },
  {
    id: 'big-agnes-divide',
    name: 'Big Agnes Divide UnInsulated Pad',
    description:
      'Lightweight self-inflating pad. Real comfort upgrade over foam, packs small.',
    amazonAsin: 'B0BPD3SSV9',
    imageUrl: 'https://m.media-amazon.com/images/I/61M0wRnoksL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$100',
    tags: ['sleeping-pad', 'mid-range'],
    slot: 'SLEEP_SURFACE',
  },
  {
    id: 'mondoking-3d-pad',
    name: 'MondoKing 3D Self-Inflating Pad',
    description:
      'Thick self-inflating luxury pad. The closest a pad gets to a real mattress.',
    amazonAsin: 'B0CQRVCFH8',
    imageUrl: 'https://m.media-amazon.com/images/I/71+BNN310+L._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$260',
    tags: ['sleeping-pad', 'premium', 'comfort'],
    slot: 'SLEEP_SURFACE',
  },
  {
    id: 'lost-horizon-air-foam-mattress',
    name: 'LOST HORIZON Air & Foam Mattress',
    description:
      'Queen-size air-and-foam camping mattress. Built-in pump, stays inflated all night. The comfort pick for car camping.',
    amazonAsin: 'B0DGGB2NFJ',
    imageUrl: 'https://m.media-amazon.com/images/I/81zVcTv3MNL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$210',
    tags: ['air-mattress', 'family', 'comfort'],
    slot: 'SLEEP_SURFACE',
  },
  {
    id: 'coleman-triton-2-burner',
    name: 'Coleman Triton+ 2-Burner Propane Stove',
    description:
      'Two-burner propane stove. 22,000 BTU per burner, wind-blocking panels, matchless ignition. Cooks real meals.',
    amazonAsin: 'B09HN1YW6V',
    imageUrl: 'https://m.media-amazon.com/images/I/71XpkqycxmL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$108',
    tags: ['stove', 'family', 'mid-range', 'comfort'],
    slot: 'STOVE',
  },
  {
    id: 'coleman-1-burner',
    name: 'Coleman 1-Burner Propane Stove',
    description:
      'Single-burner propane stove. Reliable under fire bans, boils water fast, no learning curve.',
    amazonAsin: 'B0009PUR5E',
    imageUrl: 'https://m.media-amazon.com/images/I/71urdCM7LAL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$40',
    tags: ['stove', 'budget', 'beginner', 'rain-ready', 'heat-friendly'],
    slot: 'STOVE',
  },
  {
    id: 'coleman-classic-rolling-cooler',
    name: 'Coleman Classic Rolling Cooler 100QT',
    description:
      '100-quart rolling cooler with telescoping handle. Wheels matter when summer parking is a hike from the site.',
    amazonAsin: 'B08LMVJJ9Q',
    imageUrl: 'https://m.media-amazon.com/images/I/71qyOkQOgDL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$107',
    tags: ['cooler', 'family', 'mid-range', 'comfort', 'heat-friendly'],
    slot: 'COOLER',
  },
  {
    id: 'luminaid-packlite-max',
    name: 'LuminAid PackLite Max 2-in-1',
    description:
      'Inflatable solar lantern + phone charger. Bright, packable, and weather-resistant — pulls double duty.',
    amazonAsin: 'B08JX5STJ6',
    imageUrl: 'https://m.media-amazon.com/images/I/717hSIbDzlL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$75',
    tags: ['lantern', 'mid-range', 'rain-ready'],
    slot: 'LIGHTING',
  },
  {
    id: 'streamlight-protac-2',
    name: 'Streamlight ProTac 2.0 Flashlight',
    description:
      'High-output handheld flashlight. Long throw, runs on rechargeable or AA cells. The "find it in the dark" tool.',
    amazonAsin: 'B0BN6S5PMQ',
    imageUrl: 'https://m.media-amazon.com/images/I/71wlkfE1d4L._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$112',
    tags: ['headlamp', 'mid-range'],
    slot: 'LIGHTING',
  },
  {
    id: 'black-diamond-spot-400',
    name: 'Black Diamond Spot 400 Headlamp',
    description:
      '400-lumen headlamp with red night mode and waterproof rating. One per person is non-negotiable.',
    amazonAsin: 'B09NQK2581',
    imageUrl: 'https://m.media-amazon.com/images/I/71MiiDPJZZL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$60',
    tags: ['headlamp', 'mid-range', 'rain-ready'],
    slot: 'LIGHTING',
  },
  {
    id: 'coleman-portable-chair-cooler',
    name: 'Coleman Portable Chair with 4-Can Cooler',
    description:
      'Folding camp chair with a built-in 4-can cooler in the armrest. Cheap, durable, surprisingly handy.',
    amazonAsin: 'B0033990ZQ',
    imageUrl: 'https://m.media-amazon.com/images/I/71oAndTPdRL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$50',
    tags: ['chair', 'budget', 'family'],
    slot: 'CHAIR',
  },
  {
    id: 'gci-freestyle-rocker',
    name: 'GCI Outdoor Freestyle Rocker',
    description:
      'Camp chair that actually rocks. The upgrade you’ll thank yourself for around the fire.',
    amazonAsin: 'B00D4JYR62',
    imageUrl: 'https://m.media-amazon.com/images/I/81bV+19K6wL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$80',
    tags: ['chair', 'mid-range', 'comfort', 'family'],
    slot: 'CHAIR',
  },
  {
    id: 'core-10x10-canopy',
    name: 'CORE 10×10 Instant Pop-Up Canopy',
    description:
      '10×10 instant pop-up canopy. Two-minute setup, the gear that gets used the most on hot or rainy days.',
    amazonAsin: 'B01E45EYJY',
    imageUrl: 'https://m.media-amazon.com/images/I/71upZwo-QQL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$130',
    tags: ['canopy', 'shade', 'heat-friendly', 'rain-ready', 'family'],
    slot: 'CANOPY',
  },
  {
    id: 'kidco-gopod',
    name: 'KidCo GoPod Portable Activity Center',
    description:
      'Portable activity center for infants and toddlers. Keeps the smallest camper safe and contained at the site.',
    amazonAsin: 'B00477ND0Q',
    imageUrl: 'https://m.media-amazon.com/images/I/61nVHw0nj+L._SL1500_.jpg',
    category: 'convenience',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$80',
    tags: ['with-kids', 'family', 'comfort'],
    slot: 'KID_GEAR',
  },
  {
    id: 'thriad-first-aid-430',
    name: 'THRIAD 430-Piece First Aid Kit',
    description:
      '430-piece first aid kit in a hard case. Comprehensive enough for two cars and a long weekend.',
    amazonAsin: 'B0DS21ZBSB',
    imageUrl: 'https://m.media-amazon.com/images/I/81pbblY-YCL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$53',
    tags: ['family', 'mid-range', 'rain-ready', 'cold-ready', 'heat-friendly'],
    slot: 'SAFETY',
  },
  {
    id: 'dripdrop-hydration',
    name: 'DripDrop Hydration Packets',
    description:
      'Electrolyte hydration packets. The fix when heat, altitude, or activity outpaces plain water.',
    amazonAsin: 'B08TZM8S1F',
    imageUrl: 'https://m.media-amazon.com/images/I/71pXv5WL9qL._AC_SL1200_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$18',
    tags: ['heat-friendly', 'budget'],
    slot: 'SAFETY',
  },
  {
    id: 'marmot-mad-river-0',
    name: 'Marmot Mad River 0',
    description:
      '0°F mummy bag for serious cold-weather camping. The upgrade pick when a 40°F bag plus liner stops cutting it.',
    amazonAsin: 'B0GJMQNGXD',
    imageUrl: 'https://m.media-amazon.com/images/I/51I4c4UzhIL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$339',
    tags: ['sleeping-bag', 'premium', 'cold-ready'],
    slot: 'SLEEP_BAG',
  },
  {
    id: 'rab-ionosphere-5-5',
    name: 'Rab Ionosphere 5.5',
    description:
      'Insulated backpacking pad with R-value 5.5 — cuts the cold from the ground on shoulder-season and altitude trips. The pair for the Mad River 0.',
    amazonAsin: 'B0BNX4QNGW',
    imageUrl: 'https://m.media-amazon.com/images/I/412NOySu6EL._AC_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$168',
    tags: ['sleeping-pad', 'premium', 'cold-ready'],
    slot: 'SLEEP_SURFACE',
  },
  {
    id: 'katolk-tie-out',
    name: 'KATOLK Upgraded Dog Tie Out Cable',
    description:
      'Heavy-duty trolley-style dog tie-out for camp. Gives the dog real range without letting them wander into the next site.',
    amazonAsin: 'B0BGH8BS3R',
    imageUrl: 'https://m.media-amazon.com/images/I/71Owf9HoVIL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$29',
    tags: ['with-dogs', 'budget'],
    slot: 'DOG_GEAR',
  },

  // ------------------------------------------------------------------
  // Legacy / deprecated. Kept in the registry so /compare/* editorial
  // pages and historical references keep rendering. Excluded from
  // recommendation surfaces (guide gear shelf, quiz results, Trip Pack).
  // ------------------------------------------------------------------
  {
    id: 'tent-sundome-3',
    name: 'Coleman Sundome 3-Person',
    description:
      'The couple or solo-with-gear pick. 7×7 ft floor, sets up in 10 minutes, fits a full-size air bed.',
    amazonAsin: 'B004J2GUOK',
    imageUrl:
      'https://m.media-amazon.com/images/S/aplus-media-library-service-media/f19b70cc-14ac-46ae-bec2-33b25b7fd2a9.__CR0,0,1464,600_PT0_SX1464_V1___.png',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$90',
    tags: ['tent', 'solo', 'budget', 'beginner'],
    deprecated: true,
  },
  {
    id: 'tent-sundome-6',
    name: 'Coleman Sundome 6-Person',
    description:
      'The size-up pick for families of 5+ or anyone who wants room to stand and spread out gear. 10×10 ft floor.',
    amazonAsin: 'B004E4AWYA',
    imageUrl:
      'https://m.media-amazon.com/images/S/aplus-media-library-service-media/f19b70cc-14ac-46ae-bec2-33b25b7fd2a9.__CR0,0,1464,600_PT0_SX1464_V1___.png',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$160',
    tags: ['tent', 'family', 'mid-range', 'comfort', 'with-kids'],
    deprecated: true,
  },
  {
    id: 'sleeping-bag-family',
    name: 'Kelty Tuck 20',
    description:
      'Rated to 20°F, roomy fit, easy to get into. Works for most 3-season family trips.',
    amazonAsin: 'B07H99CMNP',
    imageUrl:
      'https://m.media-amazon.com/images/S/aplus-media/vc/94b627ff-60b3-4f09-af91-225e2a7b114d._CR0,0,970,300_PT0_SX970__.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$95',
    tags: ['sleeping-bag', 'mid-range', 'beginner', 'cold-ready', 'rain-ready'],
    deprecated: true,
  },
  {
    id: 'sleeping-pad-air',
    name: 'TETON Sports ComfortLite',
    description:
      'Self-inflating, comfortable, packs small. Real comfort upgrade over foam.',
    amazonAsin: 'B00HC9QTO8',
    imageUrl: 'https://m.media-amazon.com/images/I/71AVJB+xn6L._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$75',
    tags: ['sleeping-pad', 'mid-range', 'comfort', 'cold-ready'],
    deprecated: true,
  },
  {
    id: 'air-mattress-queen',
    name: 'SoundAsleep Dream Series Air Mattress',
    description:
      'Queen size, built-in pump, stays inflated all night. The right call for comfort-focused family trips.',
    amazonAsin: 'B00FAW4O0A',
    imageUrl: 'https://m.media-amazon.com/images/I/616X+781lOL._AC_SX679_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$120',
    tags: ['air-mattress', 'family', 'mid-range', 'comfort', 'with-kids'],
    deprecated: true,
  },
  {
    id: 'stove-2-burner',
    name: 'Camp Chef Everest 2X 2-Burner Stove',
    description:
      '40,000 BTU, wind-resistant, matchless ignition. Cooks real meals, not just boiling water.',
    amazonAsin: 'B09KNVRDNQ',
    imageUrl: 'https://m.media-amazon.com/images/I/71J5ttHnYvL._AC_SX679_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$210',
    tags: ['stove', 'family', 'premium', 'comfort'],
    deprecated: true,
  },
  {
    id: 'headlamp-family',
    name: 'Black Diamond Spot 400',
    description:
      '400 lumens, red night mode, waterproof. One per person is non-negotiable.',
    amazonAsin: 'B09NQK2581',
    imageUrl: 'https://m.media-amazon.com/images/I/81sGcNXb1eL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$50',
    tags: ['headlamp', 'mid-range', 'beginner', 'rain-ready'],
    deprecated: true,
  },
  {
    id: 'camp-chairs',
    name: 'ALPS Mountaineering Leisure Chair',
    description:
      'Sturdy steel frame, 300 lb capacity, cup holder. The chair you actually want to sit in for an evening.',
    amazonAsin: 'B001LF3FZK',
    imageUrl: 'https://m.media-amazon.com/images/I/61B-kRUS-IL._AC_SL1200_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$95',
    tags: ['chair', 'mid-range', 'comfort'],
    deprecated: true,
  },
  {
    id: 'cooler-basic',
    name: 'Coleman 54-Quart Steel-Belted Cooler',
    description:
      'Keeps ice up to 4 days, 85-can capacity, Have-A-Seat lid. Classic for good reason.',
    amazonAsin: 'B0009PURKE',
    imageUrl: 'https://m.media-amazon.com/images/I/91uqAgVltVS._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$120',
    tags: ['cooler', 'family', 'mid-range', 'heat-friendly'],
    deprecated: true,
  },
  {
    id: 'canopy-camp',
    name: 'CORE 10×10 Instant Pop-Up Canopy',
    description: 'Sets up in 2 minutes. Shade at camp is a comfort multiplier.',
    amazonAsin: 'B01E45EYJY',
    imageUrl: 'https://m.media-amazon.com/images/I/610Y31VdNIL._AC_.jpg',
    category: 'convenience',
    templateSlugs: [],
    priceRange: '~$130',
    tags: ['canopy', 'shade', 'heat-friendly', 'rain-ready', 'family'],
    deprecated: true,
  },
  {
    id: 'fwc-tent-sundome',
    name: 'Coleman Sundome 4-Person',
    description:
      'Best-selling family dome tent. 9×7 ft floor, weatherproof, quick to pitch, fits a queen air bed. The safe first-trip tent.',
    amazonAsin: 'B0D7QHY574',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B0D7QHY574.01.L.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$116',
    tags: ['tent', 'family', 'budget', 'beginner', 'rain-ready', 'with-kids'],
    deprecated: true,
  },
  {
    id: 'fwc-stove-coleman-1burner',
    name: 'Coleman 1-Burner Propane Stove',
    description:
      'Single burner, propane, rock-solid reliability. Boils water fast and handles a skillet.',
    amazonAsin: 'B0009PUR5E',
    imageUrl: 'https://m.media-amazon.com/images/I/81aj95-ouRL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$40',
    tags: ['stove', 'budget', 'beginner', 'rain-ready', 'heat-friendly'],
    deprecated: true,
  },
  {
    id: 'fwc-cooler-rolling',
    name: 'Coleman Classic Rolling Cooler',
    description:
      'Insulated rolling cooler with telescoping handle. Makes the load-in from the car a non-issue.',
    amazonAsin: 'B08LMVJJ9Q',
    imageUrl:
      'https://m.media-amazon.com/images/S/aplus-media-library-service-media/6a95b9ce-ba2f-46da-a5f8-82593670f6eb.__CR0,0,1464,600_PT0_SX1464_V1___.png',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$107',
    tags: ['cooler', 'family', 'mid-range', 'comfort', 'heat-friendly'],
    deprecated: true,
  },
  {
    id: 'fwc-cot-airbed-combo',
    name: 'Coleman Queen Airbed Cot Combo',
    description:
      'Folding steel cot with queen air mattress on top. Gets you off the ground with real comfort.',
    amazonAsin: 'B00AU6AVLW',
    imageUrl: 'https://m.media-amazon.com/images/I/91+ezTNiVbL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$30',
    tags: ['cot', 'air-mattress', 'comfort', 'family'],
    deprecated: true,
  },
  {
    id: 'fwc-lantern-consciot',
    name: 'Consciot LED Camping Lantern (2-pack)',
    description:
      'Battery-powered, collapsible, bright enough for the picnic table. Two is the right number.',
    amazonAsin: 'B082HD5JDH',
    imageUrl: 'https://m.media-amazon.com/images/I/71ATGzY0CUL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$30',
    tags: ['lantern', 'budget', 'beginner', 'rain-ready'],
    deprecated: true,
  },
  {
    id: 'fwc-sleeping-bag-mallome',
    name: 'MalloMe Sleeping Bag',
    description:
      'Lightweight 3-season bag. Affordable, easy to wash, comfortable for a weekend.',
    amazonAsin: 'B077XQDZW4',
    imageUrl: 'https://m.media-amazon.com/images/I/71dhzPLdNML._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$26',
    tags: ['sleeping-bag', 'budget', 'beginner'],
    deprecated: true,
  },
  {
    id: 'fwc-chair-gci-rocker',
    name: 'GCI Outdoor Freestyle Rocker',
    description:
      'Camp chair that actually rocks. The upgrade you’ll thank yourself for around the fire.',
    amazonAsin: 'B00D4JYR62',
    imageUrl: 'https://m.media-amazon.com/images/I/71O4-VrNP3L._AC_SL1000_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$80',
    tags: ['chair', 'mid-range', 'comfort', 'family'],
    deprecated: true,
  },
  {
    id: 'fwc-projector-tmy',
    name: 'TMY 1080P Mini Projector',
    description:
      'Portable Bluetooth projector. Movie night on the side of the tent — an unfair advantage with kids.',
    amazonAsin: 'B082F13J55',
    imageUrl:
      'https://m.media-amazon.com/images/S/aplus-media-library-service-media/bb0c1152-f522-4772-98ea-c3cac62e88bf.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
    category: 'convenience',
    templateSlugs: [],
    priceRange: '~$50',
    tags: ['projector', 'comfort', 'with-kids', 'budget'],
    deprecated: true,
  },
  {
    id: 'fwc-trash-can-wakeman',
    name: 'Wakeman Outdoor Collapsible Trash Can',
    description:
      'Folds flat, pops open at camp. Keeps the site tidy and critter-resistant.',
    amazonAsin: 'B0CHKGXSQ6',
    imageUrl: 'https://m.media-amazon.com/images/I/913OeuUhboL._AC_SL1500_.jpg',
    category: 'convenience',
    templateSlugs: [],
    priceRange: '~$21',
    tags: ['trash', 'budget'],
    deprecated: true,
  },
  {
    id: 'fwc-lantern-hanger',
    name: 'Coleman Lantern Hanger',
    description:
      'Clamp-on hanger for a tent pole or tree branch. A $20 quality-of-life upgrade at night.',
    amazonAsin: 'B0009PUTJI',
    imageUrl: 'https://m.media-amazon.com/images/I/81IPjzQWjlL.jpg',
    category: 'convenience',
    templateSlugs: [],
    priceRange: '~$20',
    tags: ['lantern-hanger', 'budget'],
    deprecated: true,
  },
]

/**
 * Active (non-deprecated) products only. Used by the new gear shelf and
 * other paths that should not surface legacy entries.
 */
export const ACTIVE_AFFILIATE_PRODUCTS: AffiliateProduct[] =
  AFFILIATE_PRODUCTS.filter((p) => !p.deprecated)

export function getProductsForTemplate(slug: PlanSlug): AffiliateProduct[] {
  return ACTIVE_AFFILIATE_PRODUCTS.filter((p) => p.templateSlugs.includes(slug))
}

const PRODUCT_BY_ID: Record<string, AffiliateProduct> = Object.fromEntries(
  AFFILIATE_PRODUCTS.map((p) => [p.id, p]),
)

/**
 * Look up an affiliate product by its registry ID. Throws if the id is
 * unknown — guides reference these by string and we want a loud failure
 * at build time rather than a silently-rendered broken link.
 */
export function getProductById(id: string): AffiliateProduct {
  const product = PRODUCT_BY_ID[id]
  if (!product) {
    throw new Error(
      `Unknown affiliate product id: "${id}". Add it to AFFILIATE_PRODUCTS in lib/affiliate-products.ts.`,
    )
  }
  return product
}

/**
 * Filter the registry by tag. Useful for editorially picking which gear
 * to feature on a topical guide (e.g. all `heat-friendly` products).
 * Excludes deprecated entries by default — pass `{ includeDeprecated: true }`
 * to opt in.
 */
export function getProductsByTag(
  tag: NonNullable<AffiliateProduct['tags']>[number],
  options: { includeDeprecated?: boolean } = {},
): AffiliateProduct[] {
  const source = options.includeDeprecated
    ? AFFILIATE_PRODUCTS
    : ACTIVE_AFFILIATE_PRODUCTS
  return source.filter((p) => p.tags?.includes(tag))
}
