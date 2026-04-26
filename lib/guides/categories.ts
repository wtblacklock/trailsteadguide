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
