/**
 * SEO / structured-data helpers.
 *
 * One module to build consistent JSON-LD graphs, canonical URLs, and
 * metadata defaults. Kept pure (no React) so it can be used in server
 * components and metadata exports alike.
 */

import type { Metadata } from 'next'

export const SITE_URL = 'https://www.trailsteadguide.com'
export const SITE_NAME = 'Trailstead Guide'
export const SITE_TAGLINE = 'Plan your first camping trip with confidence.'

// Default OG image URL — served by app/opengraph-image.tsx (Next.js convention).
// Each page's pageMetadata() must include this explicitly because Next.js
// REPLACES openGraph wholesale at the deepest segment that defines it (it does
// not deep-merge), so without an images entry on the page, the root's
// convention-mounted image would disappear from the rendered tags.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`

/**
 * Build a standardized Metadata object for a page.
 *
 * Sets the page title, description, canonical URL, OpenGraph tags, and
 * Twitter card. Pass `noIndex: true` for thank-you / result pages.
 */
export function pageMetadata(input: {
  title: string
  description: string
  path: string // e.g. "/guides/camping-for-beginners"
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
}): Metadata {
  const canonical = `${SITE_URL}${input.path}`
  const image = input.image ?? DEFAULT_OG_IMAGE
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      type: input.type ?? 'website',
      url: canonical,
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
      locale: 'en_US',
      ...(input.type === 'article' && {
        publishedTime: input.publishedTime,
        modifiedTime: input.modifiedTime,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image],
    },
    ...(input.noIndex && {
      robots: { index: false, follow: false },
    }),
  }
}

// --- Graph fragments (reused across pages) ---------------------------------

export const organizationNode = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/apple-icon`,
    width: 180,
    height: 180,
  },
}

export const AUTHOR_NAME = 'William Blacklock'
export const AUTHOR_JOB_TITLE = 'Founder, Trailstead Guide'
// ≤200 chars; used in JSON-LD Person.description.
export const AUTHOR_BIO =
  'Eagle Scout (age 13), former Cub Master and Scout Master, Wood Badge Antelope, Philmont alum, founder of ScoutNerd. Camps with his three kids out of Austin.'
export const AUTHOR_IMAGE = '/images/william-blacklock.jpg'
export const AUTHOR_KNOWS_ABOUT = [
  'Camping',
  'Outdoor Skills',
  'Family Travel',
  'Scouting',
  'Scouting Leadership',
  'BSA Wood Badge',
  'Knot Tying',
  'Camp Cooking',
  'Backpacking',
]

export const AUTHOR_INSTAGRAM = 'https://instagram.com/wtblacklock'

export const personNode = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#author`,
  name: AUTHOR_NAME,
  url: `${SITE_URL}/about`,
  description: AUTHOR_BIO,
  image: `${SITE_URL}${AUTHOR_IMAGE}`,
  jobTitle: AUTHOR_JOB_TITLE,
  worksFor: { '@id': `${SITE_URL}/#organization` },
  knowsAbout: AUTHOR_KNOWS_ABOUT,
  award: ['Eagle Scout', 'Wood Badge'],
  alumniOf: {
    '@type': 'Organization',
    name: 'Philmont Scout Ranch',
    url: 'https://www.philmontscoutranch.org/',
  },
  homeLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Austin',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
  },
  sameAs: [AUTHOR_INSTAGRAM],
}

export const websiteNode = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description: SITE_TAGLINE,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-US',
}

// --- Builders ---------------------------------------------------------------

export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode, websiteNode],
  }
}

export type BreadcrumbItem = { name: string; url: string }

export function breadcrumbList(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export type ArticleInput = {
  slug: string // path like "/guides/camping-for-beginners"
  title: string
  description: string
  image?: string
  datePublished?: string
  dateModified?: string
  breadcrumbs: BreadcrumbItem[]
}

export function articleGraph(a: ArticleInput) {
  const url = `${SITE_URL}${a.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode,
      {
        '@type': 'Article',
        headline: a.title,
        description: a.description,
        image: a.image ? [a.image] : undefined,
        datePublished: a.datePublished ?? '2026-01-01',
        dateModified: a.dateModified ?? '2026-04-24',
        author: { '@id': `${SITE_URL}/#author` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: url,
      },
      breadcrumbList(a.breadcrumbs),
    ],
  }
}

export type FaqItem = { q: string; a: string }

export function faqPageGraph(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function productGraph(p: {
  id: string
  name: string
  description: string
  image: string
  brand?: string
  offerUrl: string
  priceRange?: string
}) {
  // Extract a numeric price from "~$120" if present, default undefined.
  const priceMatch = p.priceRange?.match(/\d+(\.\d+)?/)
  const price = priceMatch ? priceMatch[0] : undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/gear#${p.id}`,
    name: p.name,
    description: p.description,
    image: p.image,
    brand: { '@type': 'Brand', name: p.brand ?? inferBrand(p.name) },
    offers: {
      '@type': 'Offer',
      url: p.offerUrl,
      priceCurrency: 'USD',
      ...(price && { price }),
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Amazon' },
    },
  }
}

// Helper: infer a brand from the product name (first word). Minor quality-of-life.
function inferBrand(name: string): string {
  const first = name.split(/\s+/)[0]
  return first || 'Generic'
}

/**
 * Product + single Offer for a plan results page. Describes the paid Trip
 * Pack derived from the plan, with a single entry-tier price and a link to
 * the actual revenue page. Used on /plans/[planId] so the offer surfaces in
 * SERP without competing against the AggregateOffer on the trip-pack page.
 *
 * No aggregateRating — fabricating ratings risks a Google manual penalty.
 */
export function planProductGraph(p: {
  planSlug: string
  name: string
  description: string
  image: string
  priceUsd: number
  breadcrumbs: BreadcrumbItem[]
}) {
  const planUrl = `${SITE_URL}/plans/${p.planSlug}`
  const offerUrl = `${SITE_URL}/trip-pack/${p.planSlug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${planUrl}#product`,
        name: p.name,
        description: p.description,
        image: p.image,
        brand: { '@id': `${SITE_URL}/#organization` },
        offers: {
          '@type': 'Offer',
          url: offerUrl,
          priceCurrency: 'USD',
          price: p.priceUsd.toFixed(2),
          availability: 'https://schema.org/InStock',
          seller: { '@id': `${SITE_URL}/#organization` },
        },
      },
      breadcrumbList(p.breadcrumbs),
    ],
  }
}

/**
 * Schema for a Trailstead Trip Pack — a self-published digital product
 * (printable PDF) with two pricing tiers. Emits Product + AggregateOffer
 * so Google can display a price range and offer count in rich results.
 */
export function tripPackProductGraph(p: {
  planSlug: string
  name: string
  description: string
  image?: string
  tiers: { tier: 'basic' | 'premium'; name: string; priceUsd: number }[]
  breadcrumbs: BreadcrumbItem[]
}) {
  const url = `${SITE_URL}/trip-pack/${p.planSlug}`
  const prices = p.tiers.map((t) => t.priceUsd)
  const lowPrice = Math.min(...prices).toFixed(2)
  const highPrice = Math.max(...prices).toFixed(2)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${url}#product`,
        name: p.name,
        description: p.description,
        image: p.image ?? DEFAULT_OG_IMAGE,
        category: 'Camping trip plan (digital download)',
        brand: { '@type': 'Brand', name: SITE_NAME },
        offers: {
          '@type': 'AggregateOffer',
          url,
          priceCurrency: 'USD',
          lowPrice,
          highPrice,
          offerCount: p.tiers.length,
          availability: 'https://schema.org/InStock',
          seller: { '@id': `${SITE_URL}/#organization` },
          offers: p.tiers.map((t) => ({
            '@type': 'Offer',
            name: `${p.name} — ${t.name}`,
            url,
            priceCurrency: 'USD',
            price: t.priceUsd.toFixed(2),
            availability: 'https://schema.org/InStock',
            seller: { '@id': `${SITE_URL}/#organization` },
          })),
        },
      },
      breadcrumbList(p.breadcrumbs),
    ],
  }
}

export function itemListGraph(input: {
  name: string
  items: { position: number; url: string; name: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: input.name,
    itemListElement: input.items.map((it) => ({
      '@type': 'ListItem',
      position: it.position,
      name: it.name,
      url: it.url,
    })),
  }
}

export function howToGraph(input: {
  name: string
  description: string
  image?: string
  totalTime?: string // ISO 8601 duration like "P2D"
  steps: { name: string; text: string; url?: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    ...(input.image && { image: input.image }),
    ...(input.totalTime && { totalTime: input.totalTime }),
    step: input.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url && { url: s.url }),
    })),
  }
}

export function collectionPageGraph(input: {
  slug: string
  title: string
  description: string
  items: { name: string; url: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}${input.slug}`,
    url: `${SITE_URL}${input.slug}`,
    name: input.title,
    description: input.description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: input.items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: it.url,
      })),
    },
  }
}

/**
 * Schema for an annual recurring astronomical event (meteor shower, eclipse,
 * etc.) anchored to a specific year's peak. Powers AI Overview surfaces for
 * "when is the next [shower]" queries.
 */
export function eventGraph(input: {
  name: string
  description: string
  startDate: string // ISO 8601 — typically the peak night
  endDate?: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: input.name,
    description: input.description,
    startDate: input.startDate,
    ...(input.endDate && { endDate: input.endDate }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      name: 'Observable from the Northern Hemisphere',
      url: input.url,
    },
    organizer: { '@id': `${SITE_URL}/#organization` },
    ...(input.image && { image: input.image }),
  }
}

/**
 * Schema for a free downloadable printable (star chart, knot card, etc.).
 * Emits CreativeWork + a $0 Offer so the asset is discoverable as a free
 * resource in SERP. The associated landing page handles email capture before
 * issuing the actual file.
 */
export function printableCreativeWorkGraph(input: {
  slug: string // path like "/printables/northern-hemisphere-constellation-wheel"
  name: string
  description: string
  image?: string
  fileFormat?: string // e.g. "application/pdf" or "text/html"
  datePublished?: string
  breadcrumbs: BreadcrumbItem[]
}) {
  const url = `${SITE_URL}${input.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode,
      {
        '@type': 'CreativeWork',
        '@id': `${url}#creativework`,
        name: input.name,
        description: input.description,
        url,
        ...(input.image && { image: input.image }),
        ...(input.fileFormat && { fileFormat: input.fileFormat }),
        author: { '@id': `${SITE_URL}/#author` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        datePublished: input.datePublished ?? '2026-04-27',
        license: 'https://creativecommons.org/licenses/by-nc/4.0/',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url,
          seller: { '@id': `${SITE_URL}/#organization` },
        },
      },
      breadcrumbList(input.breadcrumbs),
    ],
  }
}
