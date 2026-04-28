// app/robots.ts
// Next.js 15 App Router — generates /robots.txt at runtime.
// Place this file at: app/robots.ts
//
// WHY: Static public/robots.txt is overwritten by `next build` output.
// MetadataRoute.Robots is the canonical Next.js 15 solution.
//
// POLICY:
//   - Modern AI crawlers explicitly allowed for citation coverage.
//   - Default rule allows all, blocks /api/ and /_next/.

import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.trailsteadguide.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
