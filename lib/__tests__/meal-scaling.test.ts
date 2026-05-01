// @vitest-environment node
/**
 * Meal-scaling pipeline test. These four functions back the Trip Pack
 * shopping list and the on-site meal planner — wrong arithmetic here
 * means the PDF tells a buyer to buy too little (or too much) food.
 */

import { describe, expect, it } from 'vitest'
import {
  scaleIngredientAmount,
  buildShoppingList,
  formatBuyLine,
  groupMealsByDay,
  CATEGORY_ORDER,
} from '@/lib/meal-scaling'
import type { Ingredient, Meal } from '@/types'

const eggs: Ingredient = {
  name: 'Eggs',
  perAdult: 2,
  perKid: 1,
  unit: 'count',
  packSize: { amount: 12, label: 'dozen' },
  category: 'protein',
}

const apples: Ingredient = {
  name: 'Apples',
  perAdult: 1,
  perKid: 1,
  unit: 'count',
  category: 'produce',
}

const oats: Ingredient = {
  name: 'Oats',
  perAdult: 0.33,
  perKid: 0.25,
  unit: 'cup',
  category: 'pantry',
}

const breakfast: Meal = {
  day: 1,
  dayLabel: 'Day 1',
  slot: 'breakfast',
  title: 'Camp eggs',
  description: '',
  ingredients: [eggs, oats],
}

const dinner: Meal = {
  day: 1,
  dayLabel: 'Day 1',
  slot: 'dinner',
  title: 'Apples + extra eggs',
  description: '',
  ingredients: [eggs, apples],
}

const day2Lunch: Meal = {
  day: 2,
  dayLabel: 'Day 2',
  slot: 'lunch',
  title: 'Cold oats',
  description: '',
  ingredients: [oats],
}

describe('scaleIngredientAmount', () => {
  it('multiplies per-person amounts across the party', () => {
    expect(scaleIngredientAmount(eggs, 2, 2)).toBe(2 * 2 + 1 * 2) // 6
  })

  it('treats kids=0 as zero contribution', () => {
    expect(scaleIngredientAmount(eggs, 3, 0)).toBe(6)
  })

  it('handles fractional per-person amounts', () => {
    expect(scaleIngredientAmount(oats, 2, 2)).toBeCloseTo(0.33 * 2 + 0.25 * 2, 5)
  })
})

describe('buildShoppingList', () => {
  it('aggregates the same ingredient across multiple meals', () => {
    const list = buildShoppingList([breakfast, dinner], 2, 2)
    const eggLine = list.protein.find((i) => i.name === 'Eggs')!
    // Two meals using eggs at 2/adult+1/kid each = (2*2+1*2) * 2 meals = 12
    expect(eggLine.rawAmount).toBe(12)
  })

  it('rounds up to pack size and reports pack count', () => {
    // Need 12 eggs, dozen pack = exactly 1 pack.
    const list = buildShoppingList([breakfast, dinner], 2, 2)
    const eggLine = list.protein.find((i) => i.name === 'Eggs')!
    expect(eggLine.packs).toBe(1)
    expect(eggLine.buyAmount).toBe(12)
    expect(eggLine.packLabel).toBe('dozen')
  })

  it('always rounds packs up — never short', () => {
    // 1 adult, 1 kid → 3 eggs needed → 1 dozen (not 0).
    const list = buildShoppingList([breakfast], 1, 1)
    const eggLine = list.protein.find((i) => i.name === 'Eggs')!
    expect(eggLine.rawAmount).toBe(3)
    expect(eggLine.packs).toBe(1)
    expect(eggLine.buyAmount).toBe(12)
  })

  it('forces at least one pack when raw amount > 0', () => {
    // Math.max(1, ceil(0.01 / 12)) = 1 — catches any "round to zero" bug.
    const trace: Ingredient = {
      ...eggs,
      perAdult: 0.01,
      perKid: 0,
    }
    const meal: Meal = { ...breakfast, ingredients: [trace] }
    const list = buildShoppingList([meal], 1, 0)
    expect(list.protein[0].packs).toBe(1)
    expect(list.protein[0].buyAmount).toBe(12)
  })

  it('omits packs/packLabel for ingredients without packSize', () => {
    const list = buildShoppingList([dinner], 2, 2)
    const appleLine = list.produce.find((i) => i.name === 'Apples')!
    expect(appleLine.packs).toBeUndefined()
    expect(appleLine.packLabel).toBeUndefined()
    // 1 adult * 2 + 1 kid * 2 = 4
    expect(appleLine.buyAmount).toBe(4)
  })

  it('keys by name+unit so unit-mismatched same-name items do not merge', () => {
    const eggsByDozen: Ingredient = { ...eggs, unit: 'count' }
    const eggsByOz: Ingredient = { ...eggs, unit: 'oz', packSize: undefined }
    const meal: Meal = {
      ...breakfast,
      ingredients: [eggsByDozen, eggsByOz],
    }
    const list = buildShoppingList([meal], 1, 0)
    expect(list.protein.length).toBe(2)
  })

  it('puts each ingredient in its declared category bucket', () => {
    const list = buildShoppingList([breakfast, dinner, day2Lunch], 2, 1)
    expect(list.protein.map((i) => i.name)).toEqual(['Eggs'])
    expect(list.produce.map((i) => i.name)).toEqual(['Apples'])
    expect(list.pantry.map((i) => i.name)).toEqual(['Oats'])
    expect(list.dairy).toEqual([])
  })

  it('returns categories in the declared CATEGORY_ORDER', () => {
    const list = buildShoppingList([breakfast], 2, 2)
    expect(Object.keys(list)).toEqual(CATEGORY_ORDER)
  })

  it('sorts items alphabetically within a category', () => {
    const zebra: Ingredient = { ...apples, name: 'Zebra cakes' }
    const aardvark: Ingredient = { ...apples, name: 'Aardvark crackers' }
    const meal: Meal = {
      ...dinner,
      ingredients: [zebra, aardvark, apples],
    }
    const list = buildShoppingList([meal], 1, 0)
    expect(list.produce.map((i) => i.name)).toEqual([
      'Aardvark crackers',
      'Apples',
      'Zebra cakes',
    ])
  })
})

describe('formatBuyLine', () => {
  it('renders pack-rounded ingredients with pack count + raw amount', () => {
    const list = buildShoppingList([breakfast, dinner], 2, 2)
    const eggLine = list.protein.find((i) => i.name === 'Eggs')!
    expect(formatBuyLine(eggLine)).toBe('1 × dozen (12 count — need 12)')
  })

  it('renders unitised ingredients with no pack info', () => {
    const list = buildShoppingList([dinner], 2, 2)
    const appleLine = list.produce.find((i) => i.name === 'Apples')!
    expect(formatBuyLine(appleLine)).toBe('4 count')
  })
})

describe('groupMealsByDay', () => {
  it('groups by day and orders meals within a day by slot', () => {
    const out = groupMealsByDay([dinner, breakfast, day2Lunch])
    expect(out.map((d) => d.day)).toEqual([1, 2])
    expect(out[0].meals.map((m) => m.slot)).toEqual(['breakfast', 'dinner'])
    expect(out[1].meals.map((m) => m.slot)).toEqual(['lunch'])
  })

  it('keeps the dayLabel from the first meal seen for that day', () => {
    const out = groupMealsByDay([dinner, breakfast])
    // dinner was inserted first → its dayLabel wins.
    expect(out[0].dayLabel).toBe('Day 1')
  })

  it('orders unknown slots last via the slotOrder fallback', () => {
    const weird = { ...breakfast, slot: 'unknown' as unknown as Meal['slot'] }
    const out = groupMealsByDay([weird, dinner])
    // dinner (slot 2) should come before the unknown-slot meal (slot 9).
    expect(out[0].meals[0].slot).toBe('dinner')
  })
})
