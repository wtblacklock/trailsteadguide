'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import type { AffiliateProduct } from '@/types'

/**
 * Three featured-product sets that rotate on each page load. Each set
 * pulls from the active (non-deprecated) affiliate registry and covers a
 * recognisable trio: tent → cooking/cooler → lighting/comfort.
 *
 * The rotation runs client-side after mount, so the first paint shows
 * the first set deterministically (good for SEO + no hydration mismatch),
 * then a single state update swaps to a random set.
 */
const PREVIEW_SETS: string[][] = [
  // Beginner-balanced kit
  ['coleman-sundome-4p', 'coleman-triton-2-burner', 'black-diamond-spot-400'],
  // Family-comfort kit
  ['fanttik-zeta-c6-pro', 'lost-horizon-air-foam-mattress', 'core-10x10-canopy'],
  // Cold-weather kit
  ['alps-lynx-4p', 'marmot-mad-river-0', 'rab-ionosphere-5-5'],
]

function findProduct(id: string): AffiliateProduct | null {
  return AFFILIATE_PRODUCTS.find((p) => p.id === id) ?? null
}

function resolveSet(setIdx: number): AffiliateProduct[] {
  const ids = PREVIEW_SETS[setIdx] ?? PREVIEW_SETS[0]
  return ids.map(findProduct).filter((p): p is AffiliateProduct => p !== null)
}

export default function GearPreview() {
  const [setIdx, setSetIdx] = useState(0)

  // Pick a random set after mount so each page load shows a different trio.
  // Initial render uses set 0 deterministically — keeps server & client in
  // sync and gives crawlers stable HTML.
  useEffect(() => {
    setSetIdx(Math.floor(Math.random() * PREVIEW_SETS.length))
  }, [])

  const products = resolveSet(setIdx)

  return (
    <section data-reveal className="py-16 md:py-32 max-w-page mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 md:mb-16">
        <div className="col-span-1 md:col-span-5">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-950 tracking-tight leading-tight">
            Beginner gear, simplified.
          </h2>
        </div>
        <div className="col-span-1 md:col-span-5 md:col-start-7 flex items-end mt-4 md:mt-0">
          <p className="text-stone-500 text-lg leading-relaxed">
            Every plan includes a curated gear setup based on real beginner needs. No overwhelm. No unnecessary products.
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <li
            key={p.id}
            className="rounded-2xl ring-1 ring-stone-200 bg-white overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/3] w-full bg-stone-50 relative">
              <Image
                src={p.imageUrl}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">
                {p.category === 'essential' ? 'Essential' : p.category === 'comfort' ? 'Comfort upgrade' : 'Nice to have'}
              </p>
              <h3 className="font-serif text-xl font-medium text-stone-900 tracking-tight mb-2">
                {p.name}
              </h3>
              {p.priceRange && (
                <p className="text-xs text-stone-400 tabular-nums">{p.priceRange}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Link
          href="/gear"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View Gear Guide
        </Link>
      </div>
    </section>
  )
}
