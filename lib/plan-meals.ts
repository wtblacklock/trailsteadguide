import type { Meal, PlanSlug } from '@/types'

/**
 * Meal plans per trip template. Portions are per-person (adult vs kid)
 * in the `unit` given. The shopping list helper aggregates these and
 * rounds up to `packSize` when present.
 *
 * Rough portion guidelines used here:
 *  - Protein (dinner main): 5 oz adult / 3 oz kid
 *  - Eggs: 2 per adult / 1.5 per kid
 *  - Hot dogs/sausages: 2 per adult / 1 per kid
 *  - Bread/buns: 2 slices|bun adult / 1 slice|bun kid
 *  - Snacks: generous, per-day baseline
 */

const DINNER_NIGHT_1: Meal = {
  day: 1,
  dayLabel: 'Friday night',
  slot: 'dinner',
  title: 'Foil-packet dinner',
  description: 'Ground beef or sausage with potatoes, onions, and peppers sealed in foil, cooked over the fire or stove.',
  ingredients: [
    { name: 'Ground beef (or smoked sausage)', perAdult: 5, perKid: 3, unit: 'oz', packSize: { amount: 16, label: '1 lb pack' }, category: 'protein' },
    { name: 'Baby potatoes', perAdult: 6, perKid: 4, unit: 'oz', packSize: { amount: 24, label: '1.5 lb bag' }, category: 'produce' },
    { name: 'Bell peppers', perAdult: 0.5, perKid: 0.25, unit: 'count', category: 'produce' },
    { name: 'Yellow onion', perAdult: 0.25, perKid: 0.15, unit: 'count', category: 'produce' },
    { name: 'Olive oil', perAdult: 0.5, perKid: 0.25, unit: 'tbsp', category: 'pantry' },
    { name: 'Heavy-duty aluminum foil', perAdult: 1, perKid: 1, unit: 'sheet', category: 'other' },
  ],
}

const BREAKFAST_EASY: Meal = {
  day: 2,
  dayLabel: 'Saturday morning',
  slot: 'breakfast',
  title: 'Eggs, bacon, and toast',
  description: 'Classic camp breakfast cooked on the 2-burner stove.',
  ingredients: [
    { name: 'Eggs', perAdult: 2, perKid: 1.5, unit: 'count', packSize: { amount: 12, label: '1 dozen' }, category: 'dairy' },
    { name: 'Bacon', perAdult: 3, perKid: 2, unit: 'slice', packSize: { amount: 16, label: '1 lb pack' }, category: 'protein' },
    { name: 'Sliced bread', perAdult: 2, perKid: 1, unit: 'slice', packSize: { amount: 20, label: '1 loaf' }, category: 'pantry' },
    { name: 'Butter', perAdult: 0.5, perKid: 0.5, unit: 'tbsp', category: 'dairy' },
    { name: 'Coffee (ground)', perAdult: 2, perKid: 0, unit: 'tbsp', category: 'drinks' },
  ],
}

const LUNCH_SANDWICHES: Meal = {
  day: 2,
  dayLabel: 'Saturday midday',
  slot: 'lunch',
  title: 'Trail sandwiches',
  description: 'Turkey-and-cheese sandwiches packed out to the hike or lakeside.',
  ingredients: [
    { name: 'Deli turkey', perAdult: 3, perKid: 2, unit: 'oz', packSize: { amount: 8, label: '8 oz pack' }, category: 'protein' },
    { name: 'Sliced cheese', perAdult: 1, perKid: 1, unit: 'slice', packSize: { amount: 12, label: '12-slice pack' }, category: 'dairy' },
    { name: 'Sliced bread', perAdult: 2, perKid: 2, unit: 'slice', packSize: { amount: 20, label: '1 loaf' }, category: 'pantry' },
    { name: 'Apples', perAdult: 1, perKid: 1, unit: 'count', category: 'produce' },
    { name: 'Mustard or mayo packets', perAdult: 1, perKid: 1, unit: 'packet', category: 'pantry' },
  ],
}

const DINNER_REAL: Meal = {
  day: 2,
  dayLabel: 'Saturday night',
  slot: 'dinner',
  title: 'Campfire chili + cornbread',
  description: 'Dutch-oven chili cooked over the fire with skillet cornbread on the side.',
  ingredients: [
    { name: 'Ground beef', perAdult: 5, perKid: 3, unit: 'oz', packSize: { amount: 16, label: '1 lb pack' }, category: 'protein' },
    { name: 'Canned kidney beans', perAdult: 4, perKid: 2, unit: 'oz', packSize: { amount: 15, label: '15 oz can' }, category: 'pantry' },
    { name: 'Canned diced tomatoes', perAdult: 4, perKid: 3, unit: 'oz', packSize: { amount: 14.5, label: '14.5 oz can' }, category: 'pantry' },
    { name: 'Yellow onion', perAdult: 0.25, perKid: 0.15, unit: 'count', category: 'produce' },
    { name: 'Chili seasoning packet', perAdult: 0.25, perKid: 0.25, unit: 'packet', packSize: { amount: 1, label: 'packet' }, category: 'pantry' },
    { name: 'Cornbread mix', perAdult: 3, perKid: 2, unit: 'oz', packSize: { amount: 15, label: 'box' }, category: 'pantry' },
    { name: 'Shredded cheese', perAdult: 1, perKid: 0.75, unit: 'oz', packSize: { amount: 8, label: '8 oz bag' }, category: 'dairy' },
  ],
}

const BREAKFAST_QUICK: Meal = {
  day: 3,
  dayLabel: 'Sunday morning',
  slot: 'breakfast',
  title: 'Oatmeal + fruit',
  description: 'Fast pack-out breakfast. Hot water on the stove, done in 10 minutes.',
  ingredients: [
    { name: 'Instant oatmeal packets', perAdult: 2, perKid: 1, unit: 'packet', packSize: { amount: 10, label: '10-pack box' }, category: 'pantry' },
    { name: 'Bananas', perAdult: 1, perKid: 1, unit: 'count', category: 'produce' },
    { name: 'Coffee (ground)', perAdult: 2, perKid: 0, unit: 'tbsp', category: 'drinks' },
  ],
}

const SNACKS_DAY: Meal = {
  day: 2,
  dayLabel: 'Saturday — snacks & drinks',
  slot: 'snack',
  title: 'Snack bin + hydration',
  description: 'Keep a snack bin accessible. Frequent small snacks prevent kid meltdowns.',
  ingredients: [
    { name: 'Granola bars', perAdult: 2, perKid: 3, unit: 'count', packSize: { amount: 6, label: '6-pack box' }, category: 'snacks' },
    { name: 'Trail mix', perAdult: 2, perKid: 1.5, unit: 'oz', packSize: { amount: 16, label: '1 lb bag' }, category: 'snacks' },
    { name: 'Marshmallows', perAdult: 3, perKid: 4, unit: 'count', packSize: { amount: 40, label: '1 bag' }, category: 'snacks' },
    { name: 'Graham crackers', perAdult: 2, perKid: 2, unit: 'count', packSize: { amount: 16, label: '1 box' }, category: 'snacks' },
    { name: 'Chocolate bars (for s\u2019mores)', perAdult: 0.5, perKid: 0.5, unit: 'bar', packSize: { amount: 6, label: '6-pack' }, category: 'snacks' },
    { name: 'Water (bottled or filled)', perAdult: 64, perKid: 40, unit: 'oz', packSize: { amount: 128, label: '1 gallon' }, category: 'drinks' },
  ],
}

// --- Backyard test: one dinner, no breakfast needed ---
const BACKYARD_DINNER: Meal = {
  day: 1,
  dayLabel: 'Backyard night',
  slot: 'dinner',
  title: 'Hot dogs + chips',
  description: 'Dead-simple camp dinner. Point is practicing the setup, not the food.',
  ingredients: [
    { name: 'Hot dogs', perAdult: 2, perKid: 1, unit: 'count', packSize: { amount: 8, label: '8-pack' }, category: 'protein' },
    { name: 'Hot dog buns', perAdult: 2, perKid: 1, unit: 'count', packSize: { amount: 8, label: '8-pack' }, category: 'pantry' },
    { name: 'Ketchup & mustard packets', perAdult: 2, perKid: 2, unit: 'packet', category: 'pantry' },
    { name: 'Potato chips', perAdult: 1.5, perKid: 1, unit: 'oz', packSize: { amount: 10, label: 'family bag' }, category: 'snacks' },
    { name: 'Marshmallows', perAdult: 3, perKid: 4, unit: 'count', packSize: { amount: 40, label: '1 bag' }, category: 'snacks' },
    { name: 'Water', perAdult: 32, perKid: 24, unit: 'oz', packSize: { amount: 128, label: '1 gallon' }, category: 'drinks' },
  ],
}

export const MEALS_BY_PLAN: Record<PlanSlug, Meal[]> = {
  'backyard-test': [BACKYARD_DINNER],
  'first-night-camp': [DINNER_NIGHT_1, BREAKFAST_EASY, SNACKS_DAY],
  'first-weekend-camp': [
    DINNER_NIGHT_1,
    BREAKFAST_EASY,
    LUNCH_SANDWICHES,
    DINNER_REAL,
    BREAKFAST_QUICK,
    SNACKS_DAY,
  ],
  'easy-family-basecamp': [
    DINNER_NIGHT_1,
    BREAKFAST_EASY,
    LUNCH_SANDWICHES,
    DINNER_REAL,
    BREAKFAST_QUICK,
    SNACKS_DAY,
  ],
}
