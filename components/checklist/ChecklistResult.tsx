'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { buildChecklist } from '@/lib/checklist-builder'
import type { KidsAgeGroup } from '@/types'

type Props = {
  adults: number
  kids: number
  nights: number
  ages: KidsAgeGroup[]
}

export default function ChecklistResult({ adults, kids, nights, ages }: Props) {
  const categories = useMemo(
    () => buildChecklist({ adults, kids, nights, ages }),
    [adults, kids, nights, ages],
  )

  const storageKey = `tsg:checklist:${adults}-${kids}-${nights}-${ages.join('-')}`
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) setChecked(JSON.parse(raw))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [storageKey])

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked))
    } catch {
      // ignore
    }
  }, [storageKey, checked, hydrated])

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const total = categories.reduce((sum, cat) => sum + cat.items.length, 0)
  const done = Object.entries(checked).filter(([, v]) => v).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  const partyLabel = `${adults} ${adults === 1 ? 'adult' : 'adults'}${
    kids > 0 ? ` + ${kids} ${kids === 1 ? 'kid' : 'kids'}` : ''
  }`
  const nightsLabel = nights >= 3 ? '3+ nights' : `${nights} ${nights === 1 ? 'night' : 'nights'}`

  return (
    <main>
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-20 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">Your checklist</p>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Packing list for {partyLabel}
        </h1>
        <p className="mt-4 text-lg text-stone-600">
          {nightsLabel} · {total} items · <span className="tabular-nums">{done}/{total} packed</span>
        </p>

        <div className="mt-5 max-w-md">
          <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-stone-900 h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-5 py-2.5 text-sm"
          >
            Print
          </button>
          <Link
            href="/checklist"
            className="inline-flex items-center justify-center rounded-md font-medium bg-transparent text-stone-900 ring-1 ring-stone-300 hover:bg-stone-100 transition-colors px-5 py-2.5 text-sm"
          >
            Start over
          </Link>
          {done > 0 && (
            <button
              type="button"
              onClick={() => setChecked({})}
              className="inline-flex items-center justify-center text-sm text-stone-500 hover:text-stone-900 transition-colors px-2 py-2.5"
            >
              Reset checks
            </button>
          )}
        </div>
      </header>

      <section className="max-w-content mx-auto px-6 pb-24">
        {categories.map((cat) => {
          const catDone = cat.items.filter((i) => checked[`${cat.heading}:${i.id}`]).length
          return (
            <div key={cat.heading} className="mb-12">
              <div className="flex items-baseline justify-between mb-5 gap-4">
                <h2 className="font-serif text-2xl font-medium text-stone-900 tracking-tight">{cat.heading}</h2>
                <span className="text-sm text-stone-500 tabular-nums">
                  {catDone}/{cat.items.length}
                </span>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item) => {
                  const id = `${cat.heading}:${item.id}`
                  const isChecked = !!checked[id]
                  return (
                    <li key={id}>
                      <label
                        className={`flex items-start gap-4 py-3 px-4 rounded-lg border cursor-pointer transition-colors ${
                          isChecked
                            ? 'border-stone-200 bg-stone-50'
                            : 'border-stone-200 bg-white hover:bg-stone-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(id)}
                          className="mt-1.5 w-4 h-4 accent-stone-900 flex-shrink-0"
                        />
                        <span className="flex-1 leading-relaxed">
                          <span className={isChecked ? 'line-through text-stone-400' : 'text-stone-800'}>
                            {item.name}
                          </span>
                          {item.qty && (
                            <span className={`ml-2 text-sm tabular-nums ${isChecked ? 'text-stone-400' : 'text-stone-500'}`}>
                              {item.qty}
                            </span>
                          )}
                          {item.note && (
                            <span className={`block text-sm mt-0.5 ${isChecked ? 'text-stone-400' : 'text-stone-500'}`}>
                              {item.note}
                            </span>
                          )}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}

        <div className="border-t border-stone-200 pt-8 mt-12 max-w-2xl">
          <p className="text-stone-500 text-sm leading-relaxed">
            Your check state saves to this browser automatically. Want timeline, activities, and meals too?{' '}
            <Link href="/quiz" className="underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors">
              Build the full trip plan
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
