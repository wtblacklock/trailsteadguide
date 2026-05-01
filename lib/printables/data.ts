import type { Printable } from './types'

/**
 * The full printable catalogue. Each entry corresponds to a free,
 * email-gated, one-page reference card downloadable from
 * /printables/<slug>. New entries appear in the index page, the sitemap,
 * and llms.txt automatically.
 */
export const PRINTABLES: Printable[] = [
  {
    slug: 'northern-hemisphere-constellation-wheel',
    category: 'stargazing',
    title: 'Northern Hemisphere Constellation Wheel',
    description:
      'A free printable star chart showing major constellations by season — spring, summer, fall, winter — for backyard and campsite stargazing.',
    tagline:
      'A one-page printable. Four seasonal sky maps. Polaris in the center of every view, with the major constellations placed where you’ll actually see them.',
    whatYouGet: [
      'Four quadrant sky maps — spring, summer, fall, winter — sized to fold flat in a pack',
      'The Big Dipper, Cassiopeia, Orion, the Summer Triangle, and 8+ more major constellations',
      'A short "how to read this" sidebar so it works the first time out',
      'Letter / A4 sized, printed in a single ink-friendly color pass',
    ],
    useCases: [
      'A camp activity for kids that doesn’t need a phone',
      'Something to clip to the fridge so you actually go outside on the next clear night',
      'A reference card for a first stargazing trip',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-04-27',
    relatedSkillPath: 'stargazing/reading-a-star-chart',
    relatedGuideSlug: 'first-night-camping-guide',
  },
  {
    slug: 'camp-cooking-conversion-card',
    category: 'cooking',
    title: 'Camp Cooking Conversion Card',
    description:
      'A free printable cooking reference card — water-to-grain ratios, foil-pack times, kitchen conversions, and altitude boil-time notes for camp meals.',
    tagline:
      'One page. Every conversion and ratio camp cooks reach for, plus foil-pack times that actually work over coals.',
    whatYouGet: [
      'Cup, oz, tablespoon, teaspoon, and milliliter conversions',
      'Water-to-grain ratios for rice, pasta, oatmeal, couscous, and quinoa',
      'Foil-pack cook times for coals, embers, and a hot grate',
      'Boil-time adjustments for altitude (every 1,000 ft of elevation matters)',
      'Daily calorie targets for an active camper by activity level',
      'Letter / A4 sized, one-color print',
    ],
    useCases: [
      'Clip to the cooler lid before the trip',
      'Hand to a cooking partner who hasn’t camped before',
      'Reference at altitude when home boil times stop matching',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-04-27',
    relatedSkillPath: 'cooking/two-burner-stove-basics',
    relatedGuideSlug: 'first-camping-trip-checklist',
  },
  {
    slug: 'backyard-test-checklist',
    category: 'planning',
    title: 'Backyard Test Pre-Flight Checklist',
    description:
      'A free one-page checklist for the night-before backyard tent test — what to set up, what to test, and what to learn before the real trip.',
    tagline:
      'The checklist that turns "we have all the gear" into "we know all the gear works." Run it the weekend before any real trip.',
    whatYouGet: [
      'Pre-trip gear test list — tent, stove, headlamps, sleeping pads, lanterns',
      'A sunset-to-sunrise schedule for a real overnight in the yard',
      'A skip-this-test rubric for when you genuinely don’t need it',
      'Three things you’ll only learn by sleeping outside one night',
      'Letter / A4 sized, fits on a fridge clip',
    ],
    useCases: [
      'The week before a first family camping trip',
      'After buying any new shelter or sleep gear',
      'A low-stakes way to ease nervous kids into camping',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-04-27',
    relatedSkillPath: 'shelter/pitching-a-tent',
    relatedGuideSlug: 'first-camping-trip-checklist',
  },
  {
    slug: 'knot-reference-card',
    category: 'knots',
    title: 'Camp Knots Reference Card',
    description:
      'A free printable knot card with four essential camping knots — square knot, bowline, taut-line hitch, and clove hitch — with steps and use cases.',
    tagline:
      'The four camp knots a kid can master in an afternoon. Diagram, steps, and use case for each — all on one page.',
    whatYouGet: [
      'Square knot — for joining two equal-diameter ropes',
      'Bowline — the rescue loop that never slips',
      'Taut-line hitch — adjustable tension for tent guy lines',
      'Clove hitch — the quick anchor for a tarp ridgeline',
      'Letter / A4 sized, with attributed diagrams sourced from Wikimedia Commons',
    ],
    useCases: [
      'Teach a kid the four most-useful camp knots in one sitting',
      'Carry in a pack as the rope-work cheat sheet',
      'Hand to a Scout working on basic knots',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-04-27',
    relatedSkillPath: 'knots/square-knot',
    relatedGuideSlug: 'first-camping-trip-checklist',
  },
  {
    slug: 'fire-starting-checklist',
    category: 'fire',
    title: 'Fire-Starting Checklist',
    description:
      'A free printable fire-starting checklist with the tinder-kindling-fuelwood stack, lighting steps, and the drown-stir-drown extinguish protocol.',
    tagline:
      'Build, light, maintain, extinguish. The four-stage fire process every camper should know — on one page.',
    whatYouGet: [
      'The three-tier wood stack: tinder, kindling, fuelwood — sizes and quantities',
      'Teepee vs log cabin build comparison',
      'The light sequence — under the tinder bundle, not above',
      'The drown-stir-drown extinguish protocol with safety call-outs',
      'Letter / A4 sized, one-color print',
    ],
    useCases: [
      'Hand to a kid old enough to build their first fire',
      'Carry in a glove-box first-aid kit as a quick reference',
      'Brief a co-camper before a trip',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-04-27',
    relatedSkillPath: 'fire/starting-a-fire',
    relatedGuideSlug: 'first-camping-trip-checklist',
  },
  // ── New printables ────────────────────────────────────────────────────────
  {
    slug: 'animal-track-id-card',
    category: 'kids',
    title: 'Animal Track ID Card',
    description:
      'A free printable animal track identification card for 8 common North American animals — deer, raccoon, rabbit, squirrel, fox, coyote, black bear, and skunk — with track sizes and field notes.',
    tagline:
      'Eight animals. Eight tracks. Fold it into a pocket and know what walked through camp last night.',
    whatYouGet: [
      'Track patterns for 8 common North American animals with size in inches',
      'Front and hind foot differences where they matter for ID',
      'Key field markers: gait pattern, claw visibility, toe count',
      '"What to do" notes for bear and coyote sightings',
      'Letter / A4 sized, one-color print',
    ],
    useCases: [
      'Morning nature walk around the campsite — pairs with the Animal Track Hunt activity',
      'Field reference near water, mud, or soft trail edges where tracks appear',
      'A structured nature lesson for kids who need something to look for',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-05-01',
    relatedSkillPath: 'hiking/day-hike-essentials',
    relatedGuideSlug: 'camping-with-kids-first-time',
  },
  {
    slug: 'nature-scavenger-hunt-card',
    category: 'kids',
    title: 'Nature Scavenger Hunt Card',
    description:
      'A free printable nature scavenger hunt checklist — 24 things to find at any campsite or trail, sorted into easy, medium, tricky, and bonus tiers for kids of all ages.',
    tagline:
      '24 things to find. Works on any trail, in any forest. The first kid done has to help the youngest find theirs.',
    whatYouGet: [
      '24 items across four difficulty tiers: easy, medium, tricky, and bonus',
      'Checkbox format — print, fold, tuck in a pocket',
      'Works anywhere in North America — no region-specific items',
      'A short scoring guide and tie-breaker rule',
      'Letter / A4 sized',
    ],
    useCases: [
      'The Nature Scavenger Hunt activity — this is the card it uses',
      'Any slow afternoon at camp when energy is low',
      'A structured first hike for kids who need something to look for',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-05-01',
    relatedSkillPath: 'hiking/day-hike-essentials',
    relatedGuideSlug: 'camping-with-kids-first-time',
  },
  {
    slug: 'night-sky-bingo',
    category: 'kids',
    title: 'Night Sky Bingo Card',
    description:
      'A free printable night sky bingo card — a 5×5 grid of 25 sky objects and events to spot, from the Big Dipper and shooting stars to satellites and the Milky Way core.',
    tagline:
      'A bingo card for the sky. Takes one clear night. Works best far from city lights — or in a backyard on a dark night.',
    whatYouGet: [
      'A 5×5 bingo grid with 25 sky objects sorted easy to hard',
      'Short descriptions so you know exactly what you\'re looking for',
      'A FREE center square: name any constellation you can see',
      'Tips for spotting the hardest squares: Milky Way, ISS, meteor',
      'Letter / A4 sized',
    ],
    useCases: [
      'Pair with the Night Sound Bingo activity for a full dark-hours session',
      'Pair with the Finding Constellations skill for a guided first look',
      'Keep kids engaged around the fire while adults stargaze',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-05-01',
    relatedSkillPath: 'stargazing/finding-constellations',
    relatedGuideSlug: 'first-night-camping-guide',
  },
  {
    slug: 'shadow-puppet-hand-guide',
    category: 'kids',
    title: 'Shadow Puppet Hand Guide',
    description:
      'A free printable shadow puppet guide with hand-position diagrams for 8 animals — dog, rabbit, bird, butterfly, fox, bear, deer, and snake — for campfire and lantern storytelling.',
    tagline:
      'Eight animals. One lantern. No props. The diagrams are clear enough for a 6-year-old to follow in the dark.',
    whatYouGet: [
      'Hand position diagrams for 8 classic shadow puppets',
      'Animation tips for each animal — ears, beak, mouth, tail',
      'Setup note: distance from light source, screen angle, best light types',
      'A three-scene starter story that uses all eight animals',
      'Letter / A4 sized',
    ],
    useCases: [
      'The Shadow Puppet Theatre activity — this is its companion card',
      'Post-dinner entertainment before the campfire dies down',
      'A screen-free tent activity on a rainy night',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-05-01',
    relatedSkillPath: 'fire/starting-a-fire',
    relatedGuideSlug: 'camping-with-kids-first-time',
  },
  {
    slug: 'kids-camping-packing-list',
    category: 'kids',
    title: 'Kids Camping Packing List',
    description:
      'A free printable kids camping packing list — age-segmented additions for toddlers (2–4), early elementary (5–8), and older kids (9–12) layered on top of the family base kit.',
    tagline:
      'The base family list plus everything that changes when a kid is in the group. Three age tiers, one page, checkboxes.',
    whatYouGet: [
      'Universal kids\' layer — items every child needs regardless of age',
      'Toddler tier (ages 2–4): sleep, feeding, safety, and comfort extras',
      'Elementary tier (ages 5–8): clothing, footwear, and activity gear',
      'Older kids tier (ages 9–12): independence gear — headlamp, pocket knife, journal',
      'Letter / A4 sized, checkbox format',
    ],
    useCases: [
      'Pack the car before a first family camping trip',
      'Brief a co-parent who\'s handling packing for the first time',
      'Let older kids check off their own tier independently',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-05-01',
    relatedSkillPath: 'camp-setup/setup-order',
    relatedGuideSlug: 'camping-with-kids-first-time',
  },
  {
    slug: 'weather-signs-field-card',
    category: 'planning',
    title: 'Weather Signs Field Card',
    description:
      'A free printable weather reference card for campers — five cloud types, wind shift signals, red-sky rules, and a 6-hour forecast decision tree for car campers and day hikers.',
    tagline:
      'Read the sky before the sky reads you. Five cloud types, four wind signs, and the red-sky rules — on one page.',
    whatYouGet: [
      'Five key cloud types with what each signals in the next 6 hours',
      'The red-sky rules: morning and evening sky colors interpreted correctly',
      'Wind shift and backing wind explained in plain terms',
      'A decision tree: pack up now, set a rain fly, or wait it out',
      'Letter / A4 sized',
    ],
    useCases: [
      'Pair with the Weather Reading skill — the field version of that guide',
      'Morning sky check before a day hike',
      'Brief a co-camper who hasn\'t read weather signs before',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-05-01',
    relatedSkillPath: 'safety/weather-reading',
    relatedGuideSlug: 'camping-when-the-weather-turns',
  },
  {
    slug: 'bear-bag-food-storage-card',
    category: 'planning',
    title: 'Bear Bag & Food Storage Card',
    description:
      'A free printable food storage reference card — what goes in the bear bag, the PCT hang method step-by-step, bear canister sizing, and the campsite food rules that apply across most US public land.',
    tagline:
      'What goes in. How to hang it. What to do if the bag comes down. One page keeps your food — and the bear — safe.',
    whatYouGet: [
      'Complete "goes in the bag" checklist: food, wrappers, toiletries, lip balm, dog food',
      'PCT counter-balance hang method with rope length and branch-height specs',
      'Bear canister volume guide by trip length and party size',
      'What to do if a bear gets your food — the actual steps',
      'Letter / A4 sized',
    ],
    useCases: [
      'Pair with the Food Storage & Bear Bags skill — the field-carry version',
      'Brief a first-timer co-camper before a backcountry or dispersed trip',
      'Keep in a bear canister lid as a nightly reminder',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-05-01',
    relatedSkillPath: 'safety/food-storage-and-bear-bags',
    relatedGuideSlug: 'first-camping-trip-checklist',
  },
  {
    slug: 'camp-first-aid-quick-reference',
    category: 'planning',
    title: 'Camp First Aid Quick Reference',
    description:
      'A free printable camp first aid reference card covering the 8 most common campsite injuries — blisters, sprains, cuts, insect stings, sunburn, dehydration, hypothermia signs, and minor burns.',
    tagline:
      'Eight injuries. What to look for, what to do, when to leave. Laminate it and keep it inside the first aid kit.',
    whatYouGet: [
      'Treatment steps for 8 common camp injuries in plain language',
      '"Evacuate now" flags — the specific signs that mean leave, not wait',
      'The baseline kit checklist: what a camp first aid kit must include',
      'An emergency contact fill-in section for nearest ranger station and hospital',
      'Letter / A4 sized',
    ],
    useCases: [
      'Laminate and keep inside the first aid kit so they always travel together',
      'Pair with the Building a Camp First Aid Kit skill',
      'Brief any co-camper who might be alone with kids on the trail',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-05-01',
    relatedSkillPath: 'safety/building-a-camp-first-aid-kit',
    relatedGuideSlug: 'first-camping-trip-checklist',
  },
  {
    slug: 'leave-no-trace-quick-reference',
    category: 'planning',
    title: 'Leave No Trace Quick Reference',
    description:
      'A free printable Leave No Trace reference card — the 7 LNT principles with specific, actionable rules for each, written for car campers and day hikers, not just backcountry users.',
    tagline:
      'The 7 principles. Specific rules, not slogans. Written for families on their first trip.',
    whatYouGet: [
      'All 7 Leave No Trace principles with 2–3 specific actions per principle',
      'Car camping and day-hiking versions of each rule — no backcountry-only language',
      'The most-broken LNT rules flagged: soap in waterways, cutting switchbacks, feeding wildlife',
      'A "before you leave camp" final check at the bottom',
      'Letter / A4 sized',
    ],
    useCases: [
      'Hand to a first-time camper before their first trip',
      'Pin inside a camp kitchen box lid',
      'A conversation starter for teaching kids LNT habits at the site',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-05-01',
    relatedSkillPath: 'camp-setup/setup-order',
    relatedGuideSlug: 'camping-for-beginners',
  },
  {
    slug: '3-day-camp-meal-planner',
    category: 'cooking',
    title: '3-Day Camp Meal Planner',
    description:
      'A free printable camping meal planner — a 3-day breakfast, lunch, dinner, and snacks grid with a cook-method column, fill-in shopping list, and meal ideas for each slot.',
    tagline:
      'Plan 3 days of camp food in 20 minutes. Fill the grid, transfer to the shopping list, done.',
    whatYouGet: [
      'A 3-day meal grid: Breakfast · Lunch · Dinner · Snacks × Day 1, 2, 3',
      'A cook-method column: campfire, 2-burner stove, cast iron, or no-cook',
      'A fill-in shopping list organized by category',
      'Suggested meals per slot with prep time and difficulty',
      'Party-size scaling note — default portions for 4 people',
      'Letter / A4 sized',
    ],
    useCases: [
      'Meal planning the week before any multi-day camping trip',
      'Pair with the Camp Coffee and Cast Iron Cooking skills',
      'Brief a co-parent handling food so nothing gets doubled or missed',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
    datePublished: '2026-05-01',
    relatedSkillPath: 'cooking/cast-iron-cooking',
    relatedGuideSlug: 'first-camping-trip-checklist',
  },
]

const PRINTABLE_BY_SLUG: Record<string, Printable> = Object.fromEntries(
  PRINTABLES.map((p) => [p.slug, p]),
)

export function getPrintableBySlug(slug: string): Printable | null {
  return PRINTABLE_BY_SLUG[slug] ?? null
}
