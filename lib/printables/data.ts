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
]

const PRINTABLE_BY_SLUG: Record<string, Printable> = Object.fromEntries(
  PRINTABLES.map((p) => [p.slug, p]),
)

export function getPrintableBySlug(slug: string): Printable | null {
  return PRINTABLE_BY_SLUG[slug] ?? null
}
