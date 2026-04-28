import type { GuideCategory, GuideCategoryId } from './types'

/**
 * The 4 Camping Guide categories. Slugs are URL-safe and chosen to not
 * collide with any existing guide slug under `/app/guides/`.
 */
export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: 'basics',
    slug: 'basics',
    label: 'Camping Basics',
    blurb: 'Foundational skills and essentials.',
    heroTitle: 'Camping Basics',
    heroSubhead:
      'The starter set: how camping actually works, what to bring, and what to skip on your first trip.',
    ctaLabel: 'Learn Basics',
    metaTitle: 'Camping Basics for Beginners — Start Here',
    metaDescription:
      'Camping basics for beginners: how it works, what to pack, what to skip, and the order to book and arrive — the foundation for a confident first trip.',
  },
  {
    id: 'scenario',
    slug: 'scenario',
    label: 'Scenario-Based Camping',
    blurb: 'Real-world camping situations and how to handle them.',
    heroTitle: 'Scenario-Based Camping',
    heroSubhead:
      'When the situation changes — kids in tow, a rainy weekend, a tricky first night — these guides walk you through it.',
    ctaLabel: 'Explore Scenarios',
    metaTitle: 'Camping Scenarios — Kids, Rain, Dogs',
    metaDescription:
      'Camping scenario guides: kids in tow, a rainy weekend, dogs, heatwaves, and the bail-versus-stay call — the hard cases first-timers actually face.',
  },
  {
    id: 'seasonal',
    slug: 'seasonal',
    label: 'Seasonal Camping',
    blurb: 'Plan your trips around weather and conditions.',
    heroTitle: 'Seasonal Camping',
    heroSubhead:
      'Spring, summer, fall, winter — what changes, what to pack, and how to pick the right weekend.',
    ctaLabel: 'Explore Seasonal Camping',
    metaTitle: 'Seasonal Camping Guides — Spring–Winter',
    metaDescription:
      'Seasonal camping guides for beginners: spring mud, summer heat, fall cold snaps, winter cabins. What to pack each season, and the weekends to skip.',
  },
  {
    id: 'location',
    slug: 'location',
    label: 'Location-Based Camping',
    blurb: 'Where to camp and what changes by region.',
    heroTitle: 'Location-Based Camping',
    heroSubhead:
      'State parks, national parks, regional differences, and the campgrounds worth booking.',
    ctaLabel: 'Explore Locations',
    metaTitle: 'Camping by State + Region for Beginners',
    metaDescription:
      'Camping by region for beginners: Texas, California, Colorado, Florida, the PNW, and 4 more — what changes by climate and the parks worth booking first.',
  },
]

const CATEGORY_BY_ID: Record<GuideCategoryId, GuideCategory> = Object.fromEntries(
  GUIDE_CATEGORIES.map((c) => [c.id, c]),
) as Record<GuideCategoryId, GuideCategory>

const CATEGORY_BY_SLUG: Record<string, GuideCategory> = Object.fromEntries(
  GUIDE_CATEGORIES.map((c) => [c.slug, c]),
)

export function getCategoryById(id: GuideCategoryId): GuideCategory {
  return CATEGORY_BY_ID[id]
}

export function getCategoryBySlug(slug: string): GuideCategory | null {
  return CATEGORY_BY_SLUG[slug] ?? null
}
