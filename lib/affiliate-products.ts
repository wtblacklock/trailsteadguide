import type { AffiliateProduct, PlanSlug } from '@/types'

export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  // ------------------------------------------------------------------
  // Shared — used by backyard-test, first-night-camp, easy-family-basecamp.
  // (first-weekend-camp has its own curated list further down.)
  // ------------------------------------------------------------------
  {
    id: 'tent-sundome-3',
    name: 'Coleman Sundome 3-Person',
    description: 'The couple or solo-with-gear pick. 7×7 ft floor, sets up in 10 minutes, fits a full-size air bed.',
    amazonAsin: 'B004J2GUOK',
    imageUrl: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/f19b70cc-14ac-46ae-bec2-33b25b7fd2a9.__CR0,0,1464,600_PT0_SX1464_V1___.png',
    category: 'essential',
    templateSlugs: ['first-night-camp'],
    priceRange: '~$90',
    tags: ['tent', 'solo', 'budget', 'beginner'],
  },
  {
    id: 'tent-sundome-6',
    name: 'Coleman Sundome 6-Person',
    description: 'The size-up pick for families of 5+ or anyone who wants room to stand and spread out gear. 10×10 ft floor.',
    amazonAsin: 'B004E4AWYA',
    imageUrl: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/f19b70cc-14ac-46ae-bec2-33b25b7fd2a9.__CR0,0,1464,600_PT0_SX1464_V1___.png',
    category: 'comfort',
    templateSlugs: ['easy-family-basecamp'],
    priceRange: '~$160',
    tags: ['tent', 'family', 'mid-range', 'comfort', 'with-kids'],
  },
  {
    id: 'sleeping-bag-family',
    name: 'Kelty Tuck 20',
    description: 'Rated to 20°F, roomy fit, easy to get into. Works for most 3-season family trips.',
    amazonAsin: 'B07H99CMNP',
    imageUrl: 'https://m.media-amazon.com/images/S/aplus-media/vc/94b627ff-60b3-4f09-af91-225e2a7b114d._CR0,0,970,300_PT0_SX970__.jpg',
    category: 'essential',
    templateSlugs: ['first-night-camp'],
    priceRange: '~$95',
    tags: ['sleeping-bag', 'mid-range', 'beginner', 'cold-ready', 'rain-ready'],
  },
  {
    id: 'sleeping-pad-air',
    name: 'TETON Sports ComfortLite',
    description: 'Self-inflating, comfortable, packs small. Real comfort upgrade over foam.',
    amazonAsin: 'B00HC9QTO8',
    imageUrl: 'https://m.media-amazon.com/images/I/71AVJB+xn6L._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['first-night-camp', 'first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '~$75',
    tags: ['sleeping-pad', 'mid-range', 'comfort', 'cold-ready'],
  },
  {
    id: 'air-mattress-queen',
    name: 'SoundAsleep Dream Series Air Mattress',
    description: 'Queen size, built-in pump, stays inflated all night. The right call for comfort-focused family trips.',
    amazonAsin: 'B00FAW4O0A',
    imageUrl: 'https://m.media-amazon.com/images/I/616X+781lOL._AC_SX679_.jpg',
    category: 'comfort',
    templateSlugs: ['easy-family-basecamp'],
    priceRange: '~$120',
    tags: ['air-mattress', 'family', 'mid-range', 'comfort', 'with-kids'],
  },
  {
    id: 'stove-2-burner',
    name: 'Camp Chef Everest 2X 2-Burner Stove',
    description: '40,000 BTU, wind-resistant, matchless ignition. Cooks real meals, not just boiling water.',
    amazonAsin: 'B09KNVRDNQ',
    imageUrl: 'https://m.media-amazon.com/images/I/71J5ttHnYvL._AC_SX679_.jpg',
    category: 'essential',
    templateSlugs: ['first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '~$210',
    tags: ['stove', 'family', 'premium', 'comfort'],
  },
  {
    id: 'headlamp-family',
    name: 'Black Diamond Spot 400',
    description: '400 lumens, red night mode, waterproof. One per person is non-negotiable.',
    amazonAsin: 'B09NQK2581',
    imageUrl: 'https://m.media-amazon.com/images/I/81sGcNXb1eL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test'],
    priceRange: '~$50',
    tags: ['headlamp', 'mid-range', 'beginner', 'rain-ready'],
  },
  {
    id: 'camp-chairs',
    name: 'ALPS Mountaineering Leisure Chair',
    description: 'Sturdy steel frame, 300 lb capacity, cup holder. The chair you actually want to sit in for an evening.',
    amazonAsin: 'B001LF3FZK',
    imageUrl: 'https://m.media-amazon.com/images/I/61B-kRUS-IL._AC_SL1200_.jpg',
    category: 'comfort',
    templateSlugs: ['first-night-camp', 'first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '~$95',
    tags: ['chair', 'mid-range', 'comfort'],
  },
  {
    id: 'cooler-basic',
    name: 'Coleman 54-Quart Steel-Belted Cooler',
    description: 'Keeps ice up to 4 days, 85-can capacity, Have-A-Seat lid. Classic for good reason.',
    amazonAsin: 'B0009PURKE',
    imageUrl: 'https://m.media-amazon.com/images/I/91uqAgVltVS._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['first-night-camp'],
    priceRange: '~$120',
    tags: ['cooler', 'family', 'mid-range', 'heat-friendly'],
  },
  {
    id: 'canopy-camp',
    name: 'CORE 10×10 Instant Pop-Up Canopy',
    description: 'Sets up in 2 minutes. Shade at camp is a comfort multiplier.',
    amazonAsin: 'B01E45EYJY',
    imageUrl: 'https://m.media-amazon.com/images/I/610Y31VdNIL._AC_.jpg',
    category: 'convenience',
    templateSlugs: ['easy-family-basecamp'],
    priceRange: '~$130',
    tags: ['canopy', 'shade', 'heat-friendly', 'rain-ready', 'family'],
  },

  // ------------------------------------------------------------------
  // FIRST WEEKEND CAMP — curated list from the affiliate sheet.
  // Canonical /dp/<asin> URLs (built at render time with the
  // associates tag + page-aware ascsubtag) so per-page attribution
  // is preserved end-to-end. Short links bypass the subtag on
  // redirect — kept out of the registry on purpose.
  // ------------------------------------------------------------------
  {
    id: 'fwc-tent-sundome',
    name: 'Coleman Sundome 4-Person',
    description: 'Best-selling family dome tent. 9×7 ft floor, weatherproof, quick to pitch, fits a queen air bed. The safe first-trip tent.',
    amazonAsin: 'B0D7QHY574',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B0D7QHY574.01.L.jpg',
    category: 'essential',
    templateSlugs: ['first-weekend-camp'],
    priceRange: '~$116',
    tags: ['tent', 'family', 'budget', 'beginner', 'rain-ready', 'with-kids'],
  },
  {
    id: 'fwc-stove-coleman-1burner',
    name: 'Coleman 1-Burner Propane Stove',
    description: 'Single burner, propane, rock-solid reliability. Boils water fast and handles a skillet.',
    amazonAsin: 'B0009PUR5E',
    imageUrl: 'https://m.media-amazon.com/images/I/81aj95-ouRL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['first-night-camp'],
    priceRange: '~$40',
    tags: ['stove', 'budget', 'beginner', 'rain-ready', 'heat-friendly'],
  },
  {
    id: 'fwc-cooler-rolling',
    // ASIN reconciled 2026-04-26: amzn.to/4d3oHXX resolves to B08LMVJJ9Q,
    // not B07N3C6Y5M as previously listed. Switched to the resolved value.
    name: 'Coleman Classic Rolling Cooler',
    description: 'Insulated rolling cooler with telescoping handle. Makes the load-in from the car a non-issue.',
    amazonAsin: 'B08LMVJJ9Q',
    imageUrl: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/6a95b9ce-ba2f-46da-a5f8-82593670f6eb.__CR0,0,1464,600_PT0_SX1464_V1___.png',
    category: 'essential',
    templateSlugs: ['first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '~$107',
    tags: ['cooler', 'family', 'mid-range', 'comfort', 'heat-friendly'],
  },
  {
    id: 'fwc-cot-airbed-combo',
    name: 'Coleman Queen Airbed Cot Combo',
    description: 'Folding steel cot with queen air mattress on top. Gets you off the ground with real comfort.',
    amazonAsin: 'B00AU6AVLW',
    imageUrl: 'https://m.media-amazon.com/images/I/91+ezTNiVbL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['easy-family-basecamp'],
    priceRange: '~$30',
    tags: ['cot', 'air-mattress', 'comfort', 'family'],
  },
  {
    id: 'fwc-lantern-consciot',
    // ASIN reconciled 2026-04-26: amzn.to/4tz86RT resolves to B082HD5JDH,
    // not B08D6X8F1L as previously listed. Switched to the resolved value.
    name: 'Consciot LED Camping Lantern (2-pack)',
    description: 'Battery-powered, collapsible, bright enough for the picnic table. Two is the right number.',
    amazonAsin: 'B082HD5JDH',
    imageUrl: 'https://m.media-amazon.com/images/I/71ATGzY0CUL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['first-night-camp', 'first-weekend-camp'],
    priceRange: '~$30',
    tags: ['lantern', 'budget', 'beginner', 'rain-ready'],
  },
  {
    id: 'fwc-sleeping-bag-mallome',
    name: 'MalloMe Sleeping Bag',
    description: 'Lightweight 3-season bag. Affordable, easy to wash, comfortable for a weekend.',
    amazonAsin: 'B077XQDZW4',
    imageUrl: 'https://m.media-amazon.com/images/I/71dhzPLdNML._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['first-weekend-camp'],
    priceRange: '~$26',
    tags: ['sleeping-bag', 'budget', 'beginner'],
  },
  {
    id: 'fwc-chair-gci-rocker',
    name: 'GCI Outdoor Freestyle Rocker',
    description: 'Camp chair that actually rocks. The upgrade you’ll thank yourself for around the fire.',
    amazonAsin: 'B00D4JYR62',
    imageUrl: 'https://m.media-amazon.com/images/I/71O4-VrNP3L._AC_SL1000_.jpg',
    category: 'comfort',
    templateSlugs: ['first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '~$80',
    tags: ['chair', 'mid-range', 'comfort', 'family'],
  },
  {
    id: 'fwc-projector-tmy',
    name: 'TMY 1080P Mini Projector',
    description: 'Portable Bluetooth projector. Movie night on the side of the tent — an unfair advantage with kids.',
    amazonAsin: 'B082F13J55',
    imageUrl: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/bb0c1152-f522-4772-98ea-c3cac62e88bf.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
    category: 'convenience',
    templateSlugs: ['first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '~$50',
    tags: ['projector', 'comfort', 'with-kids', 'budget'],
  },
  {
    id: 'fwc-trash-can-wakeman',
    name: 'Wakeman Outdoor Collapsible Trash Can',
    description: 'Folds flat, pops open at camp. Keeps the site tidy and critter-resistant.',
    amazonAsin: 'B0CHKGXSQ6',
    imageUrl: 'https://m.media-amazon.com/images/I/913OeuUhboL._AC_SL1500_.jpg',
    category: 'convenience',
    templateSlugs: ['first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '~$21',
    tags: ['trash', 'budget'],
  },
  {
    id: 'fwc-lantern-hanger',
    name: 'Coleman Lantern Hanger',
    description: 'Clamp-on hanger for a tent pole or tree branch. A $20 quality-of-life upgrade at night.',
    amazonAsin: 'B0009PUTJI',
    imageUrl: 'https://m.media-amazon.com/images/I/81IPjzQWjlL.jpg',
    category: 'convenience',
    templateSlugs: ['first-night-camp'],
    priceRange: '~$20',
    tags: ['lantern-hanger', 'budget'],
  },
]

export function getProductsForTemplate(slug: PlanSlug): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS.filter((p) => p.templateSlugs.includes(slug))
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
 */
export function getProductsByTag(
  tag: NonNullable<AffiliateProduct['tags']>[number],
): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS.filter((p) => p.tags?.includes(tag))
}
