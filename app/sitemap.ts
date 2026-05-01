// app/sitemap.ts
// Next.js 15 App Router — generates /sitemap.xml at runtime.
//
// Uniform lastmod across a sitemap is a known low-quality signal to
// Google; freshness should correlate with how often the content
// actually changes. We bucket URLs into three tiers.

import { MetadataRoute } from 'next'
import { ACTIVITIES } from '@/lib/activities/data'
import { SKILLS } from '@/lib/skills/data'
import { getCategoryById } from '@/lib/skills/categories'
import { GUIDES, GUIDE_CATEGORIES } from '@/lib/guides'
import { PRINTABLES } from '@/lib/printables'

const BASE_URL = 'https://www.trailsteadguide.com'

const FRESH = '2026-04-27' // core content: home, guides, plans, tools, gear
const RECENT = '2026-03-15' // secondary content: about, faq, quiz, checklist
const STABLE = '2026-01-10' // rarely changes: legal pages

export default function sitemap(): MetadataRoute.Sitemap {
  const skillEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/skills`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    ...SKILLS.map((s) => ({
      url: `${BASE_URL}/skills/${getCategoryById(s.category).slug}/${s.slug}`,
      lastModified: FRESH,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [
    // Home
    { url: `${BASE_URL}/`, lastModified: FRESH, changeFrequency: 'weekly', priority: 1.0 },

    // Guides hub
    { url: `${BASE_URL}/guides`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.9 },
    // Guide categories (4 hubs — Camping Basics / Scenario / Seasonal / Location)
    ...GUIDE_CATEGORIES.map((c) => ({
      url: `${BASE_URL}/guides/${c.slug}`,
      lastModified: FRESH,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Guide articles (derived from the catalogue)
    ...GUIDES.map((g) => ({
      url: `${BASE_URL}/guides/${g.slug}`,
      lastModified: FRESH,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),

    // Plans
    { url: `${BASE_URL}/plans`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/plans/backyard-test`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/plans/first-night-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/plans/first-weekend-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/plans/easy-family-basecamp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },

    // Activities
    { url: `${BASE_URL}/activities`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    ...ACTIVITIES.map((a) => ({
      url: `${BASE_URL}/activities/${a.slug}`,
      lastModified: FRESH,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Tools
    { url: `${BASE_URL}/tools`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/camping-trip-planner`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/camping-checklist-generator`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },

    // Gear
    { url: `${BASE_URL}/gear`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/gear/sets/backyard-test`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/gear/sets/first-night-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/gear/sets/first-weekend-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/gear/sets/easy-family-basecamp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/compare/coleman-sundome-3p-vs-4p-vs-6p`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/camp-chef-everest-vs-coleman-classic-1-burner`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/rolling-cooler-vs-steel-belted-cooler`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/sleeping-bag-vs-cot-airbed-combo`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/backyard-test-vs-first-night-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/compare/easy-family-basecamp-vs-first-weekend-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.75 },

    // Trip Packs (paid downloadable products)
    { url: `${BASE_URL}/trip-pack/backyard-test`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/trip-pack/first-night-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/trip-pack/first-weekend-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/trip-pack/easy-family-basecamp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },

    // Printables — free, email-gated analog reference cards. Index +
    // landing page per printable. Print-only views are noindex'd.
    { url: `${BASE_URL}/printables`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    ...PRINTABLES.map((p) => ({
      url: `${BASE_URL}/printables/${p.slug}`,
      lastModified: FRESH,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Original research (backlink magnet)
    { url: `${BASE_URL}/research/first-time-camping-regrets`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },

    // Funnel landings (quiz + checklist index; /checklist/result is noindex)
    { url: `${BASE_URL}/quiz`, lastModified: RECENT, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/checklist`, lastModified: RECENT, changeFrequency: 'monthly', priority: 0.6 },

    // Informational
    { url: `${BASE_URL}/about`, lastModified: RECENT, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/how-it-works`, lastModified: RECENT, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified: RECENT, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: RECENT, changeFrequency: 'monthly', priority: 0.4 },

    // Legal
    { url: `${BASE_URL}/affiliate-disclosure`, lastModified: STABLE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: STABLE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: STABLE, changeFrequency: 'yearly', priority: 0.3 },

    // Skills (hub + all skill detail pages — category landing pages 301 to /skills?category=)
    ...skillEntries,
  ]
}
