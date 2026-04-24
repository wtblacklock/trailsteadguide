import type { Meal, Ingredient, IngredientCategory } from '@/types'

export type ScaledIngredient = {
  name: string
  /** Raw required amount in `unit` (before pack rounding). */
  rawAmount: number
  /** Amount to buy, rounded up to `packSize` when present. */
  buyAmount: number
  unit: string
  packLabel?: string
  /** Number of packs to buy (when packSize present). */
  packs?: number
  category: IngredientCategory
}

export type ShoppingList = Record<IngredientCategory, ScaledIngredient[]>

export const CATEGORY_ORDER: IngredientCategory[] = [
  'protein',
  'produce',
  'dairy',
  'pantry',
  'snacks',
  'drinks',
  'other',
]

export const CATEGORY_LABEL: Record<IngredientCategory, string> = {
  protein: 'Protein',
  produce: 'Produce',
  dairy: 'Dairy',
  pantry: 'Pantry',
  snacks: 'Snacks',
  drinks: 'Drinks',
  other: 'Other',
}

/** Round up to 2 decimal places to keep display clean. */
function roundUp2(n: number): number {
  return Math.ceil(n * 100) / 100
}

/** Compute raw required amount for an ingredient across the party. */
export function scaleIngredientAmount(ing: Ingredient, adults: number, kids: number): number {
  return ing.perAdult * adults + ing.perKid * kids
}

/** Aggregate ingredients across all meals, scaled to party size, with pack rounding. */
export function buildShoppingList(meals: Meal[], adults: number, kids: number): ShoppingList {
  const byKey = new Map<string, { ing: Ingredient; raw: number }>()

  for (const meal of meals) {
    for (const ing of meal.ingredients) {
      const key = `${ing.name}|${ing.unit}`
      const raw = scaleIngredientAmount(ing, adults, kids)
      const existing = byKey.get(key)
      if (existing) {
        existing.raw += raw
      } else {
        byKey.set(key, { ing, raw })
      }
    }
  }

  const list: ShoppingList = {
    protein: [], produce: [], dairy: [], pantry: [], snacks: [], drinks: [], other: [],
  }

  for (const { ing, raw } of byKey.values()) {
    const rawAmount = roundUp2(raw)
    let buyAmount = rawAmount
    let packs: number | undefined
    if (ing.packSize) {
      packs = Math.max(1, Math.ceil(raw / ing.packSize.amount))
      buyAmount = packs * ing.packSize.amount
    }
    list[ing.category].push({
      name: ing.name,
      rawAmount,
      buyAmount,
      unit: ing.unit,
      packLabel: ing.packSize?.label,
      packs,
      category: ing.category,
    })
  }

  for (const cat of CATEGORY_ORDER) {
    list[cat].sort((a, b) => a.name.localeCompare(b.name))
  }
  return list
}

/** Format a scaled ingredient for display. */
export function formatBuyLine(item: ScaledIngredient): string {
  if (item.packs && item.packLabel) {
    return `${item.packs} × ${item.packLabel} (${item.buyAmount} ${item.unit} — need ${item.rawAmount})`
  }
  return `${item.buyAmount} ${item.unit}`
}

/** Group meals by day, preserving order. */
export function groupMealsByDay(meals: Meal[]): { day: number; dayLabel: string; meals: Meal[] }[] {
  const byDay = new Map<number, { day: number; dayLabel: string; meals: Meal[] }>()
  for (const m of meals) {
    const bucket = byDay.get(m.day)
    if (bucket) {
      bucket.meals.push(m)
      // Prefer a dayLabel that doesn't mention "snacks" as the header
      if (!bucket.dayLabel.toLowerCase().includes('snack') && m.dayLabel) {
        // keep earliest set
      }
    } else {
      byDay.set(m.day, { day: m.day, dayLabel: m.dayLabel, meals: [m] })
    }
  }
  const slotOrder: Record<string, number> = { breakfast: 0, lunch: 1, dinner: 2, snack: 3 }
  const out = Array.from(byDay.values()).sort((a, b) => a.day - b.day)
  for (const d of out) d.meals.sort((x, y) => (slotOrder[x.slot] ?? 9) - (slotOrder[y.slot] ?? 9))
  return out
}
