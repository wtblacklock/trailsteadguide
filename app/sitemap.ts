// app/sitemap.ts
// Next.js 15 App Router — generates /sitemap.xml at runtime.
// Place this file at: app/sitemap.ts
//
// WHY: Static public/sitemap.xml is overwritten by `next build` output.
// The MetadataRoute.Sitemap approach is the canonical Next.js 15 solution
// and survives deploys on Vercel, Netlify, and self-hosted Node targets.

import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.trailsteadguide.com'

// Use a real deploy date or pull from a CMS/git log in production.
// For static content, a hardcoded ISO date is fine and avoids
// Google's "all identical lastmod" quality signal concern.
const TODAY = '2026-04-24'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ------------------------------------------------------------------ Home
    {
      url: `${BASE_URL}/`,
      lastModified: TODAY,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // ---------------------------------------------------------------- Guides
    {
      url: `${BASE_URL}/guides`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/camping-for-beginners`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/camping-with-kids-first-time`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/car-camping-beginner-guide`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/first-camping-trip-checklist`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/first-time-camping-mistakes`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/how-to-plan-a-camping-trip`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/weekend-camping-packing-list`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // ----------------------------------------------------------------- Plans
    {
      url: `${BASE_URL}/plan/backyard-test`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/plan/first-night-camp`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/plan/first-weekend-camp`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/plan/easy-family-basecamp`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // ----------------------------------------------------------------- Tools
    {
      url: `${BASE_URL}/tools`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tools/camping-trip-planner`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tools/camping-checklist-generator`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // ------------------------------------------------------------ Gear Guide
    {
      url: `${BASE_URL}/gear-guide`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // ------------------------------------------------------------- Quiz/Flow
    // /quiz is the top-of-funnel landing page — indexable.
    // /checklist is the checklist index — indexable.
    // /checklist/result is intentionally EXCLUDED (noindex via page metadata).
    {
      url: `${BASE_URL}/quiz`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/checklist`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // ------------------------------------------------------- Informational
    {
      url: `${BASE_URL}/about`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.4,
    },

    // ----------------------------------------------------------------- Legal
    {
      url: `${BASE_URL}/affiliate-disclosure`,
      lastModified: TODAY,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: TODAY,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: TODAY,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
