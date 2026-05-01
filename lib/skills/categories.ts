import type { SkillCategory, SkillCategoryId } from './types'

/**
 * The 12 Camp Skills categories. URL slugs match the Camp Skills spec
 * exactly — short, learner-facing terms ("cooking", not "camp-cooking").
 */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'knots',
    slug: 'knots',
    label: 'Knots',
    navLabel: 'Knots',
    blurb: 'Four useful knots that cover almost every camp situation.',
    heroTitle: 'Camp knots that actually hold',
    heroSubhead: 'Learn four knots and you can pitch tarps, hang lanterns, and tie down a load with confidence.',
  },
  {
    id: 'cooking',
    slug: 'cooking',
    label: 'Camp Cooking',
    navLabel: 'Camp Cooking',
    blurb: 'Stove basics, simple meals, food safety, and cleanup that doesn’t take all night.',
    heroTitle: 'Camp cooking without the chaos',
    heroSubhead: 'Light a stove, cook real food, and clean up fast — even with kids running through the kitchen.',
  },
  {
    id: 'fire',
    slug: 'fire',
    label: 'Fire Basics',
    navLabel: 'Fire Basics',
    blurb: 'Build a fire that lights on the first try — and goes out cold when you’re done.',
    heroTitle: 'Build a fire you can trust',
    heroSubhead: 'Safety rules, two reliable structures, and the right way to put it out.',
  },
  {
    id: 'hiking',
    slug: 'hiking',
    label: 'Hiking & Navigation',
    navLabel: 'Hiking & Navigation',
    blurb: 'Read the trail, pack the right things, and stay found.',
    heroTitle: 'Hike confidently, stay found',
    heroSubhead: 'Trail markers, day-pack essentials, and the habits that keep a family on-route.',
  },
  {
    id: 'orienteering',
    slug: 'orienteering',
    label: 'Orienteering',
    navLabel: 'Orienteering',
    blurb: 'Compass and map basics that beat staring at a dead phone.',
    heroTitle: 'Compass + map, no panic',
    heroSubhead: 'A practical introduction to map orientation and bearing-taking, with simple practice exercises.',
  },
  {
    id: 'fishing',
    slug: 'fishing',
    label: 'Fishing Basics',
    navLabel: 'Fishing Basics',
    blurb: 'Set up a rod, bait a hook, cast cleanly, and release fish unharmed.',
    heroTitle: 'Fishing, the simple version',
    heroSubhead: 'Rod setup, bait basics, and a clean catch-and-release — no tackle-shop intimidation.',
  },
  {
    id: 'shelter',
    slug: 'shelter',
    label: 'Shelter Setup',
    navLabel: 'Shelter Setup',
    blurb: 'Pick a smart tent site and pitch it so it stays dry overnight.',
    heroTitle: 'Pitch a shelter that works',
    heroSubhead: 'Site selection, tent setup, and weather awareness that pays off when it matters.',
  },
  {
    id: 'camp-setup',
    slug: 'camp-setup',
    label: 'Camp Setup',
    navLabel: 'Camp Setup',
    blurb: 'Lay out a campsite that flows: kitchen, sleep, fire, gear.',
    heroTitle: 'A campsite that flows',
    heroSubhead: 'The order to set things up, where each zone goes, and how to keep the site organized for the whole trip.',
  },
  {
    id: 'safety',
    slug: 'safety',
    label: 'Safety & First Aid',
    navLabel: 'Safety & First Aid',
    blurb: 'Build a basic kit and respond calmly to the most common camp injuries.',
    heroTitle: 'Calm, capable first response',
    heroSubhead: 'A real first-aid kit, the four injuries you’ll actually see, and what to do first.',
  },
  {
    id: 'stargazing',
    slug: 'stargazing',
    label: 'Stargazing',
    navLabel: 'Stargazing',
    blurb: 'Find constellations, plan around the moon, and use the right (free) app.',
    heroTitle: 'Read the night sky',
    heroSubhead: 'A few constellations, the best viewing windows, and the apps worth having on your phone.',
  },
  {
    id: 'knife-skills',
    slug: 'knife-skills',
    label: 'Knife Skills',
    navLabel: 'Knife Skills',
    blurb: 'Use a knife at camp safely and confidently — from food prep to cutting cord.',
    heroTitle: 'Knife Skills for Camping',
    heroSubhead: 'Use a knife safely and confidently. Safety first, every time.',
  },
  {
    id: 'woodcarving',
    slug: 'woodcarving',
    label: 'Woodcarving',
    navLabel: 'Woodcarving',
    blurb: 'Simple, safe carving projects anyone can try.',
    heroTitle: 'Woodcarving at Camp',
    heroSubhead: 'Simple carving projects anyone can try safely — starting with a sharpened stick.',
  },
]

const CATEGORY_BY_SLUG: Record<string, SkillCategory> = Object.fromEntries(
  SKILL_CATEGORIES.map((c) => [c.slug, c]),
)

const CATEGORY_BY_ID: Record<SkillCategoryId, SkillCategory> = Object.fromEntries(
  SKILL_CATEGORIES.map((c) => [c.id, c]),
) as Record<SkillCategoryId, SkillCategory>

export function getCategoryBySlug(slug: string): SkillCategory | null {
  return CATEGORY_BY_SLUG[slug] ?? null
}

export function getCategoryById(id: SkillCategoryId): SkillCategory {
  return CATEGORY_BY_ID[id]
}
