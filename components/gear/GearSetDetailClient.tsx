'use client'

import { useState } from 'react'
import Image from 'next/image'
import GearTierToggle from '@/components/gear/GearTierToggle'
import { getProductUrl } from '@/lib/amazon'
import type { GearCategoryLabel, GearTier } from '@/lib/gear-sets'
import type { AffiliateProduct } from '@/types'

export type DetailItem = {
  product: AffiliateProduct
  category: GearCategoryLabel
}

interface Props {
  itemsByTier: Record<GearTier, DetailItem[]>
}

/**
 * The item grid for one gear set, tier-toggleable purely client-side —
 * switching tiers swaps in already-fetched data, no navigation or network
 * request.
 */
export default function GearSetDetailClient({ itemsByTier }: Props) {
  const [tier, setTier] = useState<GearTier>('standard')
  const items = itemsByTier[tier]

  return (
    <>
      <div className="max-w-page mx-auto px-8 mt-8">
        <GearTierToggle tier={tier} onTierChange={setTier} />
      </div>

      <section className="max-w-page mx-auto px-8 pb-20 pt-12">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map(({ product, category }) => (
            <li key={product.id}>
              <a
                href={getProductUrl(product)}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="group block h-full rounded-2xl ring-1 ring-stone-200 bg-white overflow-hidden transition-all duration-200 hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="aspect-[4/3] w-full bg-stone-50 relative overflow-hidden">
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                      loading="lazy"
                      unoptimized
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <p className="text-xs uppercase tracking-widest text-stone-500">{category}</p>
                    {product.priceRange && (
                      <p className="text-xs text-stone-400 tabular-nums">{product.priceRange}</p>
                    )}
                  </div>
                  <h2 className="font-serif text-xl font-medium text-stone-900 tracking-tight mb-3">
                    {product.name}
                  </h2>
                  <p className="text-stone-600 leading-relaxed text-[15px]">{product.description}</p>
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                      View on Amazon
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <path d="M7 17L17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">
                      Affiliate
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
