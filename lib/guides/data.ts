import type { Guide } from './types'

/**
 * The full guide catalogue. Order in this array drives the order on the
 * hub category cards and category landing pages. Each `slug` corresponds
 * to a directory under `app/guides/<slug>/`.
 */
export const GUIDES: Guide[] = [
  {
    slug: 'camping-for-beginners',
    category: 'basics',
    title: 'Camping for Beginners',
    description: 'The shortest path from zero to a confident first trip.',
    eyebrow: 'Start here',
  },
  {
    slug: 'how-to-plan-a-camping-trip',
    category: 'basics',
    title: 'How to Plan a Camping Trip',
    description: 'Step-by-step: pick a site, book it, prep the gear.',
    eyebrow: 'Planning',
  },
  {
    slug: 'car-camping-beginner-guide',
    category: 'basics',
    title: 'Car Camping Beginner Guide',
    description: 'The drive-up, park-next-to-your-tent version.',
    eyebrow: 'Mode',
  },
  {
    slug: 'first-camping-trip-checklist',
    category: 'basics',
    title: 'First Camping Trip Checklist',
    description: 'The real list — not 200 items.',
    eyebrow: 'Checklist',
  },
  {
    slug: 'weekend-camping-packing-list',
    category: 'basics',
    title: 'Weekend Camping Packing List',
    description: 'Two-night family pack list, by category.',
    eyebrow: 'Packing',
  },
  {
    slug: 'first-time-camping-mistakes',
    category: 'basics',
    title: 'First-Time Camping Mistakes',
    description: 'The avoidable ones that turn a first trip into never again.',
    eyebrow: 'Gotchas',
  },
  {
    slug: 'camping-with-kids-first-time',
    category: 'scenario',
    title: 'Camping With Kids for the First Time',
    description: 'What actually keeps kids happy at camp.',
    eyebrow: 'With kids',
  },
  {
    slug: 'summer-camping-for-beginners',
    category: 'seasonal',
    title: 'Summer Camping for Beginners',
    description: 'What to expect, what to bring, and how to avoid common mistakes.',
    eyebrow: 'Summer',
  },
]
