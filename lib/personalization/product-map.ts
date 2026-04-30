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
    tents: ['coleman-sundome-4p'],
    sleepBags: ['coleman-brazos-bag'],
    pads: ['big-agnes-divide'],
    lanterns: ['luminaid-packlite-max'],
  },
  shared: {
    tents: ['fanttik-zeta-c6-pro', 'coleman-sundome-4p'],
    sleepBags: ['coleman-brazos-bag'],
    pads: ['big-agnes-divide', 'lost-horizon-air-foam-mattress'],
    lanterns: ['luminaid-packlite-max'],
  },
  flex: {
    tents: ['fanttik-zeta-c6-pro', 'coleman-sundome-4p'],
    sleepBags: ['coleman-brazos-bag'],
    pads: ['big-agnes-divide'],
    lanterns: ['luminaid-packlite-max'],
  },
  split: {
    // Adult tent + kid tent — pair the family-friendly Sundome 4P with the
    // sturdier ALPS Lynx so adults and kids have distinct setups.
    tents: ['coleman-sundome-4p', 'alps-lynx-4p'],
    sleepBags: ['coleman-brazos-bag'],
    pads: ['big-agnes-divide'],
    lanterns: ['luminaid-packlite-max'],
  },
}

export const COOKING_PRODUCTS: CookingMap = {
  minimal: {
    stoves: ['coleman-1-burner'],
    cookware: [],
    coolers: ['coleman-classic-rolling-cooler'],
  },
  standard: {
    stoves: ['coleman-triton-2-burner'],
    cookware: [],
    coolers: ['coleman-classic-rolling-cooler'],
  },
  comfort: {
    stoves: ['coleman-triton-2-burner'],
    cookware: [],
    coolers: ['coleman-classic-rolling-cooler'],
  },
}

export const LIGHTING_PRODUCTS: LightingMap = {
  single_zone: {
    lanterns: ['luminaid-packlite-max'],
    headlamps: ['black-diamond-spot-400'],
  },
  multi_zone: {
    // Two lantern positions for split-tent setups — the LuminAid hangs in
    // the picnic-table zone, the Streamlight is the in-tent / find-it-in-
    // the-dark spot.
    lanterns: ['luminaid-packlite-max', 'streamlight-protac-2'],
    headlamps: ['black-diamond-spot-400'],
  },
}

export const COMFORT_PRODUCTS: ComfortMap = {
  low: {
    chairs: [],
    shade: [],
    extras: [],
  },
  medium: {
    chairs: ['coleman-portable-chair-cooler', 'gci-freestyle-rocker'],
    shade: [],
    extras: [],
  },
  high: {
    chairs: ['gci-freestyle-rocker', 'coleman-portable-chair-cooler'],
    shade: ['core-10x10-canopy'],
    extras: [],
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
