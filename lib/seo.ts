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
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg'

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
    url: `${SITE_URL}/images/favicon.png`,
    width: 512,
    height: 512,
  },
}

export const AUTHOR_NAME = 'Will Blacklock'
export const AUTHOR_BIO =
  'Will Blacklock built Trailstead Guide after planning his own family’s first camping trips and realizing the existing checklists assume you already know what you’re doing.'

export const personNode = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#author`,
  name: AUTHOR_NAME,
  url: `${SITE_URL}/about`,
  description: AUTHOR_BIO,
  worksFor: { '@id': `${SITE_URL}/#organization` },
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
