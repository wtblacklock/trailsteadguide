import { describe, it, expect } from 'vitest'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import {
  COMFORT_PRODUCTS,
  COOKING_PRODUCTS,
  LIGHTING_PRODUCTS,
  SLEEP_PRODUCTS,
  resolveSystemProducts,
} from '../product-map'

const VALID_IDS = new Set(AFFILIATE_PRODUCTS.map((p) => p.id))

function eachIdList(...maps: Array<Record<string, Partial<Record<string, string[]>>>>) {
  const out: { path: string; ids: string[] }[] = []
  for (const map of maps) {
    for (const [tier, cats] of Object.entries(map)) {
      for (const [cat, ids] of Object.entries(cats)) {
        out.push({ path: `${tier}.${cat}`, ids: ids ?? [] })
      }
    }
  }
  return out
}

describe('product-map invariants', () => {
  it('every product ID exists in AFFILIATE_PRODUCTS', () => {
    const unknown: string[] = []
    for (const { path, ids } of eachIdList(
      SLEEP_PRODUCTS,
      COOKING_PRODUCTS,
      LIGHTING_PRODUCTS,
      COMFORT_PRODUCTS,
    )) {
      for (const id of ids) {
        if (!VALID_IDS.has(id)) unknown.push(`${path} → ${id}`)
      }
    }
    expect(unknown).toEqual([])
  })

  it('no category exceeds 3 product IDs', () => {
    const violations: string[] = []
    for (const { path, ids } of eachIdList(
      SLEEP_PRODUCTS,
      COOKING_PRODUCTS,
      LIGHTING_PRODUCTS,
      COMFORT_PRODUCTS,
    )) {
      if (ids.length > 3) violations.push(`${path} (${ids.length})`)
    }
    expect(violations).toEqual([])
  })
})

describe('resolveSystemProducts', () => {
  it('returns at least tents + bags + pads for any sleep tier', () => {
    const sys = resolveSystemProducts({
      sleep: 'shared',
      cooking: 'standard',
      lighting: 'single_zone',
      comfort: 'medium',
    })
    const cats = sys.sleep.categories.map((c) => c.category)
    expect(cats).toContain('tents')
    expect(cats).toContain('sleepBags')
    expect(cats).toContain('pads')
  })

  it('skips empty categories rather than emitting them', () => {
    const sys = resolveSystemProducts({
      sleep: 'single',
      cooking: 'minimal',
      lighting: 'single_zone',
      comfort: 'low', // all-empty
    })
    expect(sys.comfort.categories).toEqual([])
  })

  it('multi-zone lighting includes a hanger', () => {
    const sys = resolveSystemProducts({
      sleep: 'split',
      cooking: 'standard',
      lighting: 'multi_zone',
      comfort: 'medium',
    })
    const lanterns = sys.lighting.categories.find((c) => c.category === 'lanterns')
    expect(lanterns?.products.length).toBeGreaterThanOrEqual(2)
  })

  it('split sleep system surfaces 2 tent options for the adult+kid tents', () => {
    const sys = resolveSystemProducts({
      sleep: 'split',
      cooking: 'standard',
      lighting: 'multi_zone',
      comfort: 'medium',
    })
    const tents = sys.sleep.categories.find((c) => c.category === 'tents')
    expect(tents?.products.length).toBeGreaterThanOrEqual(2)
  })

  it('comfort=high includes shade + extras', () => {
    const sys = resolveSystemProducts({
      sleep: 'flex',
      cooking: 'comfort',
      lighting: 'single_zone',
      comfort: 'high',
    })
    const cats = sys.comfort.categories.map((c) => c.category)
    expect(cats).toContain('chairs')
    expect(cats).toContain('shade')
  })
})
