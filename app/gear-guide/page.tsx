import Link from 'next/link'
import type { Metadata } from 'next'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'

export const metadata: Metadata = {
  title: 'Gear Guide — Trailstead Guide',
  description: 'The short list of camping gear worth buying — and what to skip entirely — for your first family trip.',
}

// Editorial "skip this" notes keyed by product id
const SKIP_NOTES: Record<string, string> = {
  'tent-family': 'Anything under a 4-person rating. The marketing capacity is a lie.',
  'tent-cabin': 'A backpacking tent for car camping. You will regret the cramped space.',
  'sleeping-bag-family': 'Cotton "rectangle" sleeping bags. You will be cold and miserable.',
  'sleeping-pad-air': 'A cheap foam yoga mat. Your hips will wake you up at 3am.',
  'air-mattress-queen': 'A cheap big-box air mattress. It will leak on night 2.',
  'stove-2-burner': 'Backpacking canister stoves for a family trip. Not enough output.',
  'headlamp-family': 'Flashlights. You need both hands free.',
  'camp-chairs': 'Folding metal chairs from the garage. Your back will hate you by hour two.',
  'cooler-basic': 'Soft coolers for a 2-night trip. Not enough insulation.',
  'canopy-camp': 'Hoping for shade. Campsite trees are never where you want them.',
}

export default function Page() {
  return (
    <main>
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">Gear Guide</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Buy these. Skip the rest.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          The short list of camping gear that actually matters for your first family trip. One pick per category. No &ldquo;top 14&rdquo; lists.
        </p>
        <p className="mt-5 text-xs text-stone-500 max-w-2xl">
          As an Amazon Associate we earn from qualifying purchases. Links below are affiliate links — clicking them may earn us a small commission at no extra cost to you.
        </p>
      </header>

      <section className="max-w-page mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {AFFILIATE_PRODUCTS.map((p) => {
            const skip = SKIP_NOTES[p.id]
            return (
              <a
                key={p.id}
                href={getProductUrl(p)}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="group rounded-2xl ring-1 ring-stone-200 bg-white flex flex-col overflow-hidden transition-all duration-200 hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              >
                <div className="aspect-[4/3] w-full bg-stone-50 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <p className="text-xs uppercase tracking-widest text-stone-500">
                      {p.category === 'essential'
                        ? 'Essential'
                        : p.category === 'comfort'
                          ? 'Comfort upgrade'
                          : 'Nice to have'}
                    </p>
                    <p className="text-xs text-stone-400 tabular-nums">{p.priceRange}</p>
                  </div>
                  <h2 className="font-serif text-2xl font-medium text-stone-900 tracking-tight mb-3">
                    {p.name}
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-3">
                    <strong className="text-stone-900">Why:</strong> {p.description}
                  </p>
                  {skip && (
                    <p className="text-stone-500 leading-relaxed text-sm mb-6">
                      <strong className="text-stone-700">Skip:</strong> {skip}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                      View on Amazon
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <path d="M7 17L17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">Affiliate</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-2xl border-t border-stone-200 pt-8">
          <p className="text-stone-500 leading-relaxed text-sm">
            Some links on this site are affiliate links. We earn a small commission when you buy through them — which funds the writing. We only recommend gear we would buy (and have bought) ourselves. Read our{' '}
            <Link href="/affiliate-disclosure" className="underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors">
              full disclosure
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
