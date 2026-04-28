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
]

const PRINTABLE_BY_SLUG: Record<string, Printable> = Object.fromEntries(
  PRINTABLES.map((p) => [p.slug, p]),
)

export function getPrintableBySlug(slug: string): Printable | null {
  return PRINTABLE_BY_SLUG[slug] ?? null
}
