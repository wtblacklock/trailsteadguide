'use client'

import { useMemo, useState } from 'react'
import type { Meal } from '@/types'
import {
  buildShoppingList,
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  formatBuyLine,
  groupMealsByDay,
} from '@/lib/meal-scaling'

interface Props {
  meals: Meal[]
  defaultAdults: number
  defaultKids: number
}

export default function MealPlanAndShopping({ meals, defaultAdults, defaultKids }: Props) {
  const [adults, setAdults] = useState(defaultAdults)
  const [kids, setKids] = useState(defaultKids)

  const days = useMemo(() => groupMealsByDay(meals), [meals])
  const shopping = useMemo(() => buildShoppingList(meals, adults, kids), [meals, adults, kids])

  if (meals.length === 0) return null

  return (
    <section className="py-12 bg-white">
      <div className="max-w-content mx-auto px-6">
        <h2 className="text-2xl font-serif font-medium text-stone-900 mb-2">Meal plan &amp; shopping list</h2>
        <p className="text-stone-500 mb-8">Scaled to your party. Bump the counts to match who&apos;s actually coming — the shopping list updates automatically.</p>

        <div className="flex flex-wrap gap-4 mb-10">
          <Stepper label="Adults" value={adults} min={1} max={12} onChange={setAdults} />
          <Stepper label="Kids" value={kids} min={0} max={12} onChange={setKids} />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-green mb-4">Meals</h3>
            <div className="space-y-6">
              {days.map((d) => (
                <div key={d.day}>
                  <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">{d.dayLabel}</div>
                  <ul className="space-y-3">
                    {d.meals.map((m, i) => (
                      <li key={i} className="border border-stone-200 rounded-lg p-4">
                        <div className="flex items-baseline justify-between gap-3 mb-1">
                          <div className="font-serif text-lg text-stone-900">{m.title}</div>
                          <div className="text-xs uppercase tracking-wider text-stone-400">{m.slot}</div>
                        </div>
                        <p className="text-sm text-stone-600">{m.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-green mb-4">Shopping list</h3>
            <div className="space-y-5">
              {CATEGORY_ORDER.filter((c) => shopping[c].length > 0).map((cat) => (
                <div key={cat}>
                  <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">{CATEGORY_LABEL[cat]}</div>
                  <ul className="space-y-1.5">
                    {shopping[cat].map((item) => (
                      <li key={item.name} className="flex items-start gap-3 text-stone-700 text-sm">
                        <input
                          type="checkbox"
                          aria-label={`Check off ${item.name}`}
                          className="mt-1 h-4 w-4 rounded border-stone-300 text-brand-green focus:ring-brand-green"
                        />
                        <span className="flex-1">
                          <span className="text-stone-900">{item.name}</span>
                          <span className="text-stone-500"> — {formatBuyLine(item)}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-400 mt-6">
              Quantities round up to standard pack sizes where possible. Adjust for appetites and leftovers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (n: number) => void
}) {
  return (
    <div className="flex items-center gap-3 py-2 px-4 rounded-xl border border-stone-200 bg-white">
      <span className="text-stone-700 text-sm font-medium min-w-[3.5rem]">{label}</span>
      <button
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-8 h-8 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center leading-none"
      >
        −
      </button>
      <span className="w-6 text-center font-serif text-lg tabular-nums text-stone-900">{value}</span>
      <button
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-8 h-8 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center leading-none"
      >
        +
      </button>
    </div>
  )
}
