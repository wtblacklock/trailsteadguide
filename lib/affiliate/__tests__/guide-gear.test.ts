import { describe, it, expect } from 'vitest'
import { GUIDE_GEAR } from '@/data/guide-gear'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getGearForGuide, getProductsForGuide, PLAN_TO_GUIDE } from '../guide-gear'

const PRODUCT_IDS = new Set(AFFILIATE_PRODUCTS.map((p) => p.id))

describe('GUIDE_GEAR data integrity', () => {
  it('every productId resolves against AFFILIATE_PRODUCTS', () => {
    const unknown: string[] = []
    for (const [slug, entries] of Object.entries(GUIDE_GEAR)) {
      for (const e of entries) {
        if (!PRODUCT_IDS.has(e.productId)) {
          unknown.push(`${slug} / ${e.slot} → ${e.productId}`)
        }
      }
    }
    expect(unknown).toEqual([])
  })

  it('only references active (non-deprecated) products', () => {
    const deprecatedIds = new Set(
      AFFILIATE_PRODUCTS.filter((p) => p.deprecated).map((p) => p.id),
    )
    const offenders: string[] = []
    for (const [slug, entries] of Object.entries(GUIDE_GEAR)) {
      for (const e of entries) {
        if (deprecatedIds.has(e.productId)) {
          offenders.push(`${slug} / ${e.slot} → ${e.productId}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })

  it('every plan in PLAN_TO_GUIDE points at a real GUIDE_GEAR entry', () => {
    for (const [plan, guide] of Object.entries(PLAN_TO_GUIDE)) {
      expect(GUIDE_GEAR[guide], `${plan} -> ${guide}`).toBeDefined()
    }
  })
})

describe('getGearForGuide()', () => {
  it('groups by slot in GEAR_SLOTS declaration order', () => {
    const groups = getGearForGuide('camping-for-beginners')
    expect(groups.length).toBeGreaterThan(0)
    const slots = groups.map((g) => g.slot)
    // Tent should come before Lighting; Lighting before Safety.
    expect(slots.indexOf('TENT')).toBeLessThan(slots.indexOf('LIGHTING'))
    expect(slots.indexOf('LIGHTING')).toBeLessThan(slots.indexOf('SAFETY'))
  })

  it('returns [] for an unknown guide slug', () => {
    expect(getGearForGuide('not-a-real-guide')).toEqual([])
  })

  it('renders the kid gear slot on family guides', () => {
    const groups = getGearForGuide('camping-with-kids-first-time')
    const kidGroup = groups.find((g) => g.slot === 'KID_GEAR')
    expect(kidGroup).toBeDefined()
    expect(kidGroup!.products[0].id).toBe('kidco-gopod')
  })

  it('camping-in-a-heatwave uses the Wawona 6 + canopy', () => {
    const groups = getGearForGuide('camping-in-a-heatwave')
    const tents = groups.find((g) => g.slot === 'TENT')!.products.map((p) => p.id)
    expect(tents).toContain('tnf-wawona-6')
    const canopy = groups.find((g) => g.slot === 'CANOPY')
    expect(canopy?.products[0].id).toBe('core-10x10-canopy')
  })
})

describe('getProductsForGuide()', () => {
  it('returns a flat product list', () => {
    const products = getProductsForGuide('first-night-camping-guide')
    expect(products.length).toBeGreaterThan(5)
    expect(products.every((p) => typeof p.id === 'string')).toBe(true)
  })
})
