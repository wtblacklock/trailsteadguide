import type { NextConfig } from 'next'
import { SKILL_CATEGORIES } from './lib/skills/categories'

/**
 * Old guide category slugs that were renamed for cleaner URLs. Anything
 * indexed at the old slug 301s to the new one.
 */
const RENAMED_GUIDE_CATEGORY_SLUGS: Record<string, string> = {
  'camping-basics': 'basics',
  'scenario-based': 'scenario',
}

/**
 * Plan slugs that historically lived under /plan/<slug> and now live under
 * /plans/<slug>. Listed here (instead of imported from PLAN_TEMPLATES) so
 * next.config stays a leaf module — config is loaded synchronously at
 * startup and importing the templates pulls a tree of dependencies.
 */
const PLAN_SLUGS = [
  'backyard-test',
  'first-night-camp',
  'first-weekend-camp',
  'easy-family-basecamp',
] as const

/**
 * Security headers per OWASP best practices + Vercel platform conventions.
 * Applied to every route.
 *
 * CSP intentionally permissive on script-src (keeps Next hydration + Vercel
 * Analytics + Vercel Live preview toolbar working without hash maintenance).
 * Tighten later if we drop Vercel Live or move to strict-dynamic/nonces.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://images.unsplash.com https://m.media-amazon.com https://images-na.ssl-images-amazon.com",
  "connect-src 'self' https://vitals.vercel-insights.com https://vercel.live wss://ws-us3.pusher.com",
  "frame-src 'self' https://vercel.live",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Content-Security-Policy', value: CSP },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig: NextConfig = {
  // Keep @sparticuz/chromium and puppeteer-core as external CommonJS modules
  // so Turbopack doesn't try to bundle the native + brotli binaries.
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
  // Tell Vercel's file tracer to include chromium's bin/ folder (which
  // holds the brotli-compressed Chromium build) in the function bundle.
  outputFileTracingIncludes: {
    '/api/generate-pdf': ['./node_modules/@sparticuz/chromium/**/*'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    const skillRedirects = SKILL_CATEGORIES.map((c) => ({
      source: `/skills/${c.slug}`,
      destination: `/skills?category=${c.slug}`,
      permanent: true,
    }))

    const guideCategoryRedirects = Object.entries(RENAMED_GUIDE_CATEGORY_SLUGS).map(
      ([oldSlug, newSlug]) => ({
        source: `/guides/${oldSlug}`,
        destination: `/guides/${newSlug}`,
        permanent: true,
      }),
    )

    const planRouteRedirects = PLAN_SLUGS.map((slug) => ({
      source: `/plan/${slug}`,
      destination: `/plans/${slug}`,
      permanent: true,
    }))

    const gearHubRedirect = {
      source: '/gear-guide',
      destination: '/gear',
      permanent: true,
    }

    return [
      ...skillRedirects,
      ...guideCategoryRedirects,
      ...planRouteRedirects,
      gearHubRedirect,
    ]
  },
}

export default nextConfig
