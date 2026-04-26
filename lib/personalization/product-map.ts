/**
 * Product map — the affiliate-layer bridge for the gear-system spec.
 *
 * Shape: PRODUCT_MAP[system][tier][category] → productId[]
 *
 * Rules (enforced by tests):
 *   - Max 3 product IDs per category (no overload)
 *   - Every productId resolves against AFFILIATE_PRODUCTS
 *   - System + tier always populated for every system enum
 *
 * The merge function `resolveSystemProducts(systems)` returns the resolved
 * AffiliateProduct objects per system, ready to render in the results page
 * "Your Setup" section and the PDF gear-system pages.
 */

import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import type { AffiliateProduct } from '@/types'
import type {
  ComfortSystemId,
  CookingSystemId,
  GearSystemSelection,
  LightingSystemId,
  SleepSystemId,
} from './types'

export type SleepCategory = 'tents' | 'sleepBags' | 'pads' | 'lanterns'
export type CookingCategory = 'stoves' | 'cookware' | 'coolers'
export type LightingCategory = 'lanterns' | 'headlamps'
export type ComfortCategory = 'chairs' | 'shade' | 'extras'

type SleepMap = Record<SleepSystemId, Partial<Record<SleepCategory, string[]>>>
type CookingMap = Record<CookingSystemId, Partial<Record<CookingCategory, string[]>>>
type LightingMap = Record<LightingSystemId, Partial<Record<LightingCategory, string[]>>>
type ComfortMap = Record<ComfortSystemId, Partial<Record<ComfortCategory, string[]>>>

export const SLEEP_PRODUCTS: SleepMap = {
  single: {
    tents: ['tent-sundome-3', 'fwc-tent-sundome'],
    sleepBags: ['sleeping-bag-family', 'fwc-sleeping-bag-mallome'],
    pads: ['sleeping-pad-air'],
    lanterns: ['fwc-lantern-consciot'],
  },
  shared: {
    tents: ['tent-sundome-6', 'fwc-tent-sundome'],
    sleepBags: ['sleeping-bag-family'],
    pads: ['sleeping-pad-air', 'air-mattress-queen'],
    lanterns: ['fwc-lantern-consciot'],
  },
  flex: {
    tents: ['tent-sundome-6', 'fwc-tent-sundome', 'tent-sundome-3'],
    sleepBags: ['sleeping-bag-family', 'fwc-sleeping-bag-mallome'],
    pads: ['sleeping-pad-air'],
    lanterns: ['fwc-lantern-consciot'],
  },
  split: {
    // Adult tent + kid tent — 2× 3-person dome is the cleanest pairing.
    tents: ['fwc-tent-sundome', 'tent-sundome-3'],
    sleepBags: ['sleeping-bag-family', 'fwc-sleeping-bag-mallome'],
    pads: ['sleeping-pad-air'],
    lanterns: ['fwc-lantern-consciot'],
  },
}

export const COOKING_PRODUCTS: CookingMap = {
  minimal: {
    stoves: ['fwc-stove-coleman-1burner'],
    cookware: [],
    coolers: ['cooler-basic'],
  },
  standard: {
    stoves: ['stove-2-burner'],
    cookware: [],
    coolers: ['cooler-basic', 'fwc-cooler-rolling'],
  },
  comfort: {
    stoves: ['stove-2-burner'],
    cookware: [],
    coolers: ['fwc-cooler-rolling'],
  },
}

export const LIGHTING_PRODUCTS: LightingMap = {
  single_zone: {
    lanterns: ['fwc-lantern-consciot'],
    headlamps: ['headlamp-family'],
  },
  multi_zone: {
    // Two lantern positions for split-tent setups.
    lanterns: ['fwc-lantern-consciot', 'fwc-lantern-hanger'],
    headlamps: ['headlamp-family'],
  },
}

export const COMFORT_PRODUCTS: ComfortMap = {
  low: {
    chairs: [],
    shade: [],
    extras: [],
  },
  medium: {
    chairs: ['camp-chairs', 'fwc-chair-gci-rocker'],
    shade: [],
    extras: [],
  },
  high: {
    chairs: ['fwc-chair-gci-rocker', 'camp-chairs'],
    shade: ['canopy-camp'],
    extras: ['fwc-projector-tmy'],
  },
}

const PRODUCT_BY_ID = new Map(AFFILIATE_PRODUCTS.map((p) => [p.id, p]))

function resolveIds(ids: string[] | undefined): AffiliateProduct[] {
  if (!ids || ids.length === 0) return []
  return ids
    .map((id) => PRODUCT_BY_ID.get(id))
    .filter((p): p is AffiliateProduct => p !== undefined)
}

export type ResolvedSystemCategory<C extends string> = {
  category: C
  products: AffiliateProduct[]
}

export type ResolvedSystem<C extends string> = {
  categories: ResolvedSystemCategory<C>[]
}

export type ResolvedSystems = {
  sleep: ResolvedSystem<SleepCategory>
  cooking: ResolvedSystem<CookingCategory>
  lighting: ResolvedSystem<LightingCategory>
  comfort: ResolvedSystem<ComfortCategory>
}

function resolveByCategories<C extends string>(
  map: Partial<Record<C, string[]>>,
  order: readonly C[],
): ResolvedSystem<C> {
  const categories: ResolvedSystemCategory<C>[] = []
  for (const cat of order) {
    const ids = map[cat]
    const products = resolveIds(ids)
    if (products.length === 0) continue
    categories.push({ category: cat, products })
  }
  return { categories }
}

const SLEEP_ORDER: readonly SleepCategory[] = ['tents', 'sleepBags', 'pads', 'lanterns']
const COOKING_ORDER: readonly CookingCategory[] = ['stoves', 'cookware', 'coolers']
const LIGHTING_ORDER: readonly LightingCategory[] = ['lanterns', 'headlamps']
const COMFORT_ORDER: readonly ComfortCategory[] = ['chairs', 'shade', 'extras']

export function resolveSystemProducts(systems: GearSystemSelection): ResolvedSystems {
  return {
    sleep: resolveByCategories(SLEEP_PRODUCTS[systems.sleep], SLEEP_ORDER),
    cooking: resolveByCategories(COOKING_PRODUCTS[systems.cooking], COOKING_ORDER),
    lighting: resolveByCategories(LIGHTING_PRODUCTS[systems.lighting], LIGHTING_ORDER),
    comfort: resolveByCategories(COMFORT_PRODUCTS[systems.comfort], COMFORT_ORDER),
  }
}

/** Human label for a category. Used in UI and PDF section headers. */
export const CATEGORY_LABELS: Record<
  SleepCategory | CookingCategory | LightingCategory | ComfortCategory,
  string
> = {
  tents: 'Tents',
  sleepBags: 'Sleeping bags',
  pads: 'Sleeping pads',
  lanterns: 'Lanterns',
  headlamps: 'Headlamps',
  stoves: 'Stove',
  cookware: 'Cookware',
  coolers: 'Cooler',
  chairs: 'Chairs',
  shade: 'Shade',
  extras: 'Extras',
}
