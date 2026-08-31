import { GUIDES } from '@/lib/guides/data'
import { SKILLS } from '@/lib/skills/data'
import { getCategoryById } from '@/lib/skills/categories'
import { ACTIVITIES } from '@/lib/activities/data'
import { PRINTABLES } from '@/lib/printables'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import { TERMS, slugify } from '@/lib/glossary/data'
import { COMPARE_PAGES } from '@/lib/compare'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import type { SearchDocument } from './types'

/**
 * Builds the full site search index from every content source. Called at
 * build time by `app/search-index.json/route.ts`. Throws if any content
 * item is missing a title or url — a broken search entry is a build
 * failure, not a silently-skipped item.
 */
export function buildSearchIndex(): SearchDocument[] {
  const docs: SearchDocument[] = []

  for (const g of GUIDES) {
    docs.push({
      id: `guide:${g.slug}`,
      type: 'guide',
      title: g.title,
      excerpt: g.description,
      url: `/guides/${g.slug}`,
      keywords: g.category,
    })
  }

  for (const s of SKILLS) {
    docs.push({
      id: `skill:${s.slug}`,
      type: 'skill',
      title: s.title,
      excerpt: s.tagline,
      url: `/skills/${getCategoryById(s.category).slug}/${s.slug}`,
      keywords: `${s.category} ${s.difficulty}`,
    })
  }

  for (const a of ACTIVITIES) {
    docs.push({
      id: `activity:${a.slug}`,
      type: 'activity',
      title: a.title,
      excerpt: a.tagline,
      url: `/activities/${a.slug}`,
      keywords: `${a.category} ${a.ageRange} ${a.groupSize}`,
    })
  }

  for (const p of PRINTABLES) {
    docs.push({
      id: `printable:${p.slug}`,
      type: 'printable',
      title: p.title,
      excerpt: p.description,
      url: `/printables/${p.slug}`,
      keywords: p.category,
    })
  }

  for (const product of AFFILIATE_PRODUCTS) {
    if (product.deprecated) continue
    docs.push({
      id: `gear:${product.id}`,
      type: 'gear',
      title: product.name,
      excerpt: product.description,
      url: getProductUrl(product),
      keywords: product.tags?.join(' '),
    })
  }

  for (const t of TERMS) {
    docs.push({
      id: `glossary:${slugify(t.term)}`,
      type: 'glossary',
      title: t.term,
      excerpt: t.definition,
      url: `/glossary#${slugify(t.term)}`,
    })
  }

  for (const c of COMPARE_PAGES) {
    docs.push({
      id: `compare:${c.slug}`,
      type: 'compare',
      title: c.title,
      excerpt: c.excerpt,
      url: `/compare/${c.slug}`,
    })
  }

  for (const plan of Object.values(PLAN_TEMPLATES)) {
    docs.push({
      id: `plan:${plan.slug}`,
      type: 'plan',
      title: plan.title,
      excerpt: plan.tagline,
      url: `/plans/${plan.slug}`,
      keywords: 'plan template',
    })
  }

  for (const d of docs) {
    if (!d.title) throw new Error(`buildSearchIndex: empty title for id "${d.id}"`)
    if (!d.url) throw new Error(`buildSearchIndex: empty url for id "${d.id}"`)
  }

  return docs
}
