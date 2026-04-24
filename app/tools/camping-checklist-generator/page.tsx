import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Camping Checklist Generator — Trailstead Guide',
  description: 'Generate a packing checklist tuned to your family size, kid ages, and trip length.',
}

export default function Page() {
  return (
    <main>
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">Tool</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Camping Checklist Generator
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Three questions. A printable packing list scaled to your family and trip length. No timeline, no meal plan — just the list.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/checklist"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
          >
            Generate my list
          </Link>
          <Link
            href="/guides/weekend-camping-packing-list"
            className="inline-flex items-center justify-center rounded-md font-medium bg-transparent text-stone-900 ring-1 ring-stone-300 hover:bg-stone-100 transition-colors px-6 py-3 text-sm"
          >
            See a generic list
          </Link>
        </div>
      </header>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-6">
            What makes this different from every other packing list
          </h2>
          <ul className="space-y-4 text-stone-700 leading-relaxed text-lg">
            <li><strong>It scales.</strong> 2 adults + 3 kids gets different quantities than 2 adults + 1 kid.</li>
            <li><strong>It adapts.</strong> Kids under 4 get different gear than kids over 8.</li>
            <li><strong>It&apos;s categorized.</strong> Shelter, kitchen, clothing, safety — so you pack the car in the right order.</li>
            <li><strong>It&apos;s honest.</strong> Stuff you actually need is in. Stuff you&apos;ll never touch is out.</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
