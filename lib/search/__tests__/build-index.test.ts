import { describe, it, expect } from 'vitest'
import { buildSearchIndex } from '../build-index'
import { GUIDES } from '@/lib/guides/data'
import { SKILLS } from '@/lib/skills/data'
import { ACTIVITIES } from '@/lib/activities/data'
import { PRINTABLES } from '@/lib/printables'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { TERMS } from '@/lib/glossary/data'
import { COMPARE_PAGES } from '@/lib/compare'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'

describe('buildSearchIndex', () => {
  const docs = buildSearchIndex()

  it('every document has a non-empty title and url', () => {
    for (const d of docs) {
      expect(d.title.length, `empty title for id "${d.id}"`).toBeGreaterThan(0)
      expect(d.url.length, `empty url for id "${d.id}"`).toBeGreaterThan(0)
    }
  })

  it('has no duplicate ids', () => {
    const ids = docs.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has no duplicate urls', () => {
    const urls = docs.map((d) => d.url)
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('has exactly one document per guide', () => {
    expect(docs.filter((d) => d.type === 'guide').length).toBe(GUIDES.length)
  })

  it('has exactly one document per skill', () => {
    expect(docs.filter((d) => d.type === 'skill').length).toBe(SKILLS.length)
  })

  it('has exactly one document per activity', () => {
    expect(docs.filter((d) => d.type === 'activity').length).toBe(ACTIVITIES.length)
  })

  it('has exactly one document per printable', () => {
    expect(docs.filter((d) => d.type === 'printable').length).toBe(PRINTABLES.length)
  })

  it('has exactly one document per glossary term', () => {
    expect(docs.filter((d) => d.type === 'glossary').length).toBe(TERMS.length)
  })

  it('has exactly one document per compare page', () => {
    expect(docs.filter((d) => d.type === 'compare').length).toBe(COMPARE_PAGES.length)
  })

  it('has exactly one document per plan', () => {
    expect(docs.filter((d) => d.type === 'plan').length).toBe(Object.keys(PLAN_TEMPLATES).length)
  })

  it('has one gear document per non-deprecated affiliate product, and excludes deprecated ones', () => {
    const activeProducts = AFFILIATE_PRODUCTS.filter((p) => !p.deprecated)
    const gearDocs = docs.filter((d) => d.type === 'gear')
    expect(gearDocs.length).toBe(activeProducts.length)

    const deprecatedIds = new Set(
      AFFILIATE_PRODUCTS.filter((p) => p.deprecated).map((p) => p.id),
    )
    for (const d of gearDocs) {
      const productId = d.id.replace(/^gear:/, '')
      expect(deprecatedIds.has(productId)).toBe(false)
    }
  })

  it('gear document urls are external Amazon links, not internal paths', () => {
    const gearDocs = docs.filter((d) => d.type === 'gear')
    for (const d of gearDocs) {
      expect(d.url.startsWith('https://www.amazon.com/') || d.url.startsWith('https://amzn.to/')).toBe(true)
    }
  })

  it('skill urls are nested under their category slug', () => {
    const skillDoc = docs.find((d) => d.type === 'skill')
    expect(skillDoc?.url).toMatch(/^\/skills\/[a-z-]+\/[a-z0-9-]+$/)
  })
})
