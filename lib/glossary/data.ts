export type Term = {
  term: string
  definition: string
  href?: string
  linkText?: string
}

// Alphabetized in flat list; grouped by first letter for rendering.
export const TERMS: Term[] = [
  // B
  {
    term: 'Baseplate compass',
    definition:
      'A flat, see-through compass with a rectangular plate, used for taking bearings off a paper map. The orienteering standard for beginners.',
    href: '/skills/orienteering/compass-basics',
    linkText: 'Compass basics',
  },
  {
    term: 'Bear box',
    definition:
      'A metal locker provided at many campsites for storing food and scented items overnight. Use it where it exists — your cooler is not bear-proof.',
  },
  {
    term: 'Bearing',
    definition:
      'A direction expressed in degrees (0–360) from north. You take a bearing with a compass to head toward a known landmark.',
    href: '/skills/orienteering/compass-basics',
    linkText: 'Compass basics',
  },
  {
    term: 'Bivy',
    definition:
      'Short for "bivouac sack" — a single-person waterproof shell that goes over a sleeping bag. Lighter than a tent, but cramped.',
  },
  {
    term: 'BLM',
    definition:
      'Bureau of Land Management. Federal agency that manages 245 million acres of public land, much of which allows free dispersed camping.',
    href: '/guides/dispersed-camping-on-blm-and-national-forest-land',
    linkText: 'Dispersed camping guide',
  },
  {
    term: 'Bowline',
    definition:
      'A fixed loop knot that holds under load and unties easily after. The classic "rabbit comes out of the hole" knot.',
    href: '/skills/knots/bowline',
    linkText: 'Learn the knot',
  },

  // C
  {
    term: 'Cathole',
    definition:
      'A 6–8 inch hole dug at least 200 feet from water for human waste in the backcountry. Pack out toilet paper. Part of Leave No Trace.',
  },
  {
    term: 'Clove hitch',
    definition:
      'A fast hitch used to tie a rope to a pole, post, or tree. Great for hanging lanterns or stringing a clothesline; not for heavy loads.',
    href: '/skills/knots/clove-hitch',
    linkText: 'Learn the knot',
  },
  {
    term: 'Condensation',
    definition:
      'Moisture that forms inside your tent overnight from your breath. Crack a vent or door even in the cold to keep your sleeping bag dry.',
  },

  // D
  {
    term: 'Daypack',
    definition:
      'A small backpack (15–25 liters) for carrying water, snacks, and a layer on a day hike from camp. Not a full backpacking pack.',
  },
  {
    term: 'Dead reckoning',
    definition:
      'Navigating by tracking your direction, speed, and time elapsed instead of using landmarks. Useful when fog or trees obscure the view.',
  },
  {
    term: 'Declination',
    definition:
      'The angle between true north and magnetic north at your location. Adjust your compass for it before plotting bearings on a map.',
  },
  {
    term: 'Dehydrated meal',
    definition:
      'A pre-cooked meal with the moisture removed; you add boiling water in the bag. Light, fast, and clean — ideal for backpacking and easy car camping.',
  },
  {
    term: 'Dew point',
    definition:
      'The temperature at which air gets so saturated that water condenses out of it. When the overnight low approaches the dew point, expect heavy condensation.',
  },
  {
    term: 'Dispersed camping',
    definition:
      'Free camping outside developed campgrounds, typically on BLM or National Forest land. No facilities, no reservations, but real rules.',
    href: '/guides/dispersed-camping-on-blm-and-national-forest-land',
    linkText: 'Dispersed camping guide',
  },
  {
    term: 'Dome tent',
    definition:
      'A tent with two crossing poles that arch over the top, forming a dome. The most common beginner tent — easy to pitch, sheds wind well.',
  },
  {
    term: 'Douse',
    definition:
      'To fully extinguish a campfire with water — soak, stir, soak again until the ashes are cold to the touch. The only acceptable way to leave a fire.',
    href: '/skills/fire/extinguishing-a-fire',
    linkText: 'How to extinguish a fire',
  },
  {
    term: 'Dry bag',
    definition:
      'A waterproof roll-top bag for keeping clothes, electronics, or food dry in canoes, rain, or stream crossings.',
  },
  {
    term: 'Dutch oven',
    definition:
      'A heavy cast-iron pot with a tight lid, used over coals to bake, braise, or roast at camp. Comes in a flat-bottom kitchen version and a footed camp version.',
    href: '/skills/cooking/cast-iron-cooking',
    linkText: 'Cast-iron cooking',
  },

  // E
  {
    term: 'Elevation gain',
    definition:
      'The total vertical climb on a hike, measured in feet (or meters), summed across every uphill section. A flat-distance number alone undersells effort.',
  },
  {
    term: 'Ember',
    definition:
      'A glowing chunk of charcoal left from a fire. Embers stay hot for hours and are how dutch ovens cook — and how forest fires start.',
  },

  // F
  {
    term: 'FCFS',
    definition:
      'First-come, first-served. A campsite that can\'t be reserved — you show up and claim what\'s open. Arrive early on summer Fridays or expect to be turned away.',
    href: '/guides/recreation-gov-reservation-strategy',
    linkText: 'Reservation strategy',
  },
  {
    term: 'Fire ban',
    definition:
      'A regional restriction on open flames during high fire danger. Stage 1 typically bans campfires; Stage 2 also bans stoves with flames; Stage 3 closes the area entirely. Always check the day-of status.',
    href: '/skills/fire/fire-safety-rules',
    linkText: 'Fire safety rules',
  },
  {
    term: 'Fire ring',
    definition:
      'The metal or stone circle at a developed campsite where fires are allowed. Build inside the ring; never anywhere else, even if it looks fine.',
  },
  {
    term: 'Foil pack',
    definition:
      'A meal of meat, vegetables, and seasoning wrapped in heavy-duty foil and cooked over coals. Great kid food — almost no cleanup.',
    href: '/skills/cooking/foil-pack-meals',
    linkText: 'Foil pack meals',
  },
  {
    term: 'Footprint',
    definition:
      'A custom-shaped ground sheet sized to your tent floor. Protects the tent from abrasion and adds a moisture barrier on damp ground.',
  },

  // G
  {
    term: 'Ground cloth',
    definition:
      'A generic tarp or sheet under your tent — same role as a footprint, but cut from any material. Tuck it inside the tent\'s perimeter or rain runs under you.',
  },
  {
    term: 'Guy line',
    definition:
      'A cord that runs from a tent or tarp to a stake to add tension and stability in wind. Adjust with a taut-line hitch.',
    href: '/skills/knots/taut-line-hitch',
    linkText: 'Taut-line hitch',
  },

  // H
  {
    term: 'Headlamp lumens',
    definition:
      'The brightness rating of a headlamp. 100 lumens is enough for camp tasks; 300+ for trail walking. Higher isn\'t always better — it kills your night vision.',
  },
  {
    term: 'Heat exhaustion',
    definition:
      'Early heat illness: heavy sweating, headache, nausea, weakness. Move to shade, drink water, cool the skin. Untreated, it progresses to heat stroke.',
  },
  {
    term: 'Hydration bladder',
    definition:
      'A flexible water reservoir (1.5–3 L) that lives inside your daypack with a hose to your shoulder strap. Easier to drink while moving than reaching for a bottle.',
  },
  {
    term: 'Hypothermia',
    definition:
      'When your core body temperature drops below 95°F. Watch for shivering, slurred speech, and fumbling. Get the person dry, insulated, and into warm shelter immediately.',
  },

  // J
  {
    term: 'Jetboil',
    definition:
      'A brand of integrated canister stove popular for backpacking. Boils water in 90 seconds. Brand name has become shorthand for the whole product category.',
  },

  // K
  {
    term: 'Kindling',
    definition:
      'Small dry sticks (pencil-thick to thumb-thick) that catch flame from tinder and build heat for larger logs. Gather a pile bigger than you think you need.',
    href: '/skills/fire/starting-a-fire',
    linkText: 'How to start a fire',
  },

  // L
  {
    term: 'Leave No Trace',
    definition:
      'A widely-adopted seven-principle outdoor ethic: plan ahead, camp on durable surfaces, dispose of waste properly, leave what you find, minimize fire impact, respect wildlife, and be considerate of others.',
  },
  {
    term: 'Lightning safety',
    definition:
      'If you can hear thunder, you\'re in strike range. Get off ridges and out from under tall lone trees. Crouch in a low spot until 30 minutes after the last thunder.',
  },

  // M
  {
    term: 'Mummy bag',
    definition:
      'A sleeping bag tapered toward the feet to reduce dead air space and warm faster. Less roomy than a rectangular bag, but warmer for the same insulation.',
  },

  // N
  {
    term: 'National Forest',
    definition:
      'Land managed by the U.S. Forest Service (USFS). Most allows dispersed camping for free; developed campgrounds inside forests have fees and reservations.',
  },
  {
    term: 'NPS / National Park',
    definition:
      'Land managed by the National Park Service. Stricter rules than National Forest — campfires only in fire rings, no dispersed camping, food storage strictly enforced.',
  },

  // O
  {
    term: 'Orienteering',
    definition:
      'The skill of navigating with map and compass alone. Foundational backcountry knowledge even if you usually rely on GPS — batteries die.',
    href: '/skills/orienteering/compass-basics',
    linkText: 'Compass basics',
  },

  // P
  {
    term: 'Paracord',
    definition:
      'A lightweight nylon kernmantle rope (550 lb test) originally used for parachute suspension lines. The general-purpose camp rope — every kit should have 25–50 feet.',
  },
  {
    term: 'Primitive site',
    definition:
      'A campsite with no hookups and minimal amenities — usually just a fire ring and a flat tent pad. Sometimes no toilet. Cheaper, quieter, more work.',
  },

  // Q
  {
    term: 'Quilt',
    definition:
      'An open-back sleeping bag that wraps over you instead of zipping around. Lighter than a bag because there\'s no insulation under you (your pad does that job).',
  },

  // R
  {
    term: 'Rainfly',
    definition:
      'The waterproof outer layer of a tent that goes over the mesh body. Pitch it taut — sagging fabric leaks where it touches the inner wall.',
  },
  {
    term: 'Recreation.gov',
    definition:
      'The federal reservation system for campgrounds, permits, and tours across NPS, USFS, BLM, and other agencies. Popular sites release on a 6-month rolling window at 10 a.m. ET.',
    href: '/guides/recreation-gov-reservation-strategy',
    linkText: 'Reservation strategy',
  },
  {
    term: 'Ridgeline',
    definition:
      'A horizontal line strung between two anchors to support a tarp shelter or hang gear. A taut-line hitch on each end keeps it tight.',
    href: '/skills/knots/taut-line-hitch',
    linkText: 'Taut-line hitch',
  },
  {
    term: 'R-value',
    definition:
      'The insulation rating of a sleeping pad. R-2 is fine for summer; R-4 for shoulder seasons; R-5+ for cold ground or snow. The pad matters as much as the bag.',
  },

  // S
  {
    term: 'Sleeping bag temp rating',
    definition:
      'The lowest temperature at which the bag is rated to keep an average sleeper safe (not necessarily comfortable). Add 10°F of headroom for kids and cold sleepers.',
  },
  {
    term: 'Sleeping pad',
    definition:
      'The cushion between you and the ground — air, foam, or self-inflating. Without one, the cold ground will steal your warmth no matter how good your sleeping bag is.',
  },
  {
    term: 'Square knot',
    definition:
      'A flat, symmetrical knot that joins two ropes of equal thickness. Easy to tie ("right over left, left over right"), easy to untie. Not for heavy loads.',
    href: '/skills/knots/square-knot',
    linkText: 'Learn the knot',
  },
  {
    term: 'State park',
    definition:
      'Land managed by the state, not the federal government. Reservation systems, fee structures, and rules vary by state — check the state\'s parks website, not Recreation.gov.',
  },

  // T
  {
    term: 'Tarp',
    definition:
      'A flat sheet of waterproof fabric strung up as a sun shade, rain cover over a picnic table, or minimalist shelter. The single most useful piece of camp gear after a tent.',
  },
  {
    term: 'Taut-line hitch',
    definition:
      'An adjustable knot that grips when loaded and slides when relaxed. The right knot for tent guy lines and tarp ridgelines.',
    href: '/skills/knots/taut-line-hitch',
    linkText: 'Learn the knot',
  },
  {
    term: 'Teepee fire',
    definition:
      'A fire structure built with kindling leaning into a central peak over tinder. Lights fast, burns hot, collapses early — best for getting things started.',
    href: '/skills/fire/fire-structures',
    linkText: 'Fire structures',
  },
  {
    term: 'Tinder',
    definition:
      'Highly flammable, fluffy material that catches a spark — dry grass, birch bark, dryer lint, fatwood shavings. Distinct from kindling, which is one step bigger.',
    href: '/skills/fire/starting-a-fire',
    linkText: 'How to start a fire',
  },
  {
    term: 'Two-burner stove',
    definition:
      'A propane-fueled car-camping stove with two side-by-side burners. The standard family-camping cook setup — coffee on one side, breakfast on the other.',
    href: '/skills/cooking/two-burner-stove-basics',
    linkText: 'Two-burner stove basics',
  },

  // V
  {
    term: 'Vestibule',
    definition:
      'The covered area outside the inner tent door, under the rainfly. Park muddy boots and wet packs here so they don\'t come into the sleeping space.',
  },

  // W
  {
    term: 'Widowmaker',
    definition:
      'A dead branch or top hung up in a tree, ready to fall in wind. Look up before pitching your tent — never camp under one.',
  },
]

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
