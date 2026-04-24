// app/sitemap.ts
// Next.js 15 App Router — generates /sitemap.xml at runtime.
//
// Uniform lastmod across a sitemap is a known low-quality signal to
// Google; freshness should correlate with how often the content
// actually changes. We bucket URLs into three tiers.

import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.trailsteadguide.com'

const FRESH = '2026-04-24' // core content: home, guides, plans, tools, gear
const RECENT = '2026-03-15' // secondary content: about, faq, quiz, checklist
const STABLE = '2026-01-10' // rarely changes: legal pages

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Home
    { url: `${BASE_URL}/`, lastModified: FRESH, changeFrequency: 'weekly', priority: 1.0 },

    // Guides
    { url: `${BASE_URL}/guides`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/guides/camping-for-beginners`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/guides/camping-with-kids-first-time`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/guides/car-camping-beginner-guide`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/guides/first-camping-trip-checklist`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/guides/first-time-camping-mistakes`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/guides/how-to-plan-a-camping-trip`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/guides/weekend-camping-packing-list`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.9 },

    // Plans
    { url: `${BASE_URL}/plan/backyard-test`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/plan/first-night-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/plan/first-weekend-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/plan/easy-family-basecamp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },

    // Tools
    { url: `${BASE_URL}/tools`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/camping-trip-planner`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/camping-checklist-generator`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },

    // Gear
    { url: `${BASE_URL}/gear-guide`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/coleman-sundome-3p-vs-4p-vs-6p`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/camp-chef-everest-vs-coleman-classic-1-burner`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/rolling-cooler-vs-steel-belted-cooler`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/sleeping-bag-vs-cot-airbed-combo`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },

    // Trip Packs (paid downloadable products)
    { url: `${BASE_URL}/trip-pack/backyard-test`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/trip-pack/first-night-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/trip-pack/first-weekend-camp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/trip-pack/easy-family-basecamp`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },

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
  ]
}
