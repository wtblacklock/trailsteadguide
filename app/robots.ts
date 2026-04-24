// app/robots.ts
// Next.js 15 App Router — generates /robots.txt at runtime.
// Place this file at: app/robots.ts
//
// WHY: Static public/robots.txt is overwritten by `next build` output.
// MetadataRoute.Robots is the canonical Next.js 15 solution.
//
// POLICY:
//   - All crawlers: allow everything except /checklist/result
//   - AI crawlers (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot)
//     are explicitly allowed — site wants AI citation coverage.
//   - /checklist/result is blocked because URL-parameterised result pages
//     would create infinite indexable variants with thin/duplicate content.

import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.trailsteadguide.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule — allow all, block result pages
      {
        userAgent: '*',
        allow: '/',
        disallow: '/checklist/result',
      },
      // AI crawlers — full access, no disallow
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
