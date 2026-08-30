'use client'

import { useState } from 'react'
import Link from 'next/link'
import GearTierToggle from '@/components/gear/GearTierToggle'
import type { GearTier } from '@/lib/gear-sets'
import type { AffiliateProduct, PlanSlug } from '@/types'

export type HubBundleItem = {
  product: AffiliateProduct
  total: number
}

export type HubBundle = {
  planSlug: PlanSlug
  planTitle: string
  setTitle: string
  setTagline: string
  entryCount: number
  itemsByTier: Record<GearTier, AffiliateProduct[]>
  totalByTier: Record<GearTier, number>
}

interface Props {
  bundles: HubBundle[]
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  )
}

/**
 * All 4 bundle cards, tier-toggleable purely client-side — switching tiers
 * swaps in already-fetched data, no navigation or network request.
 */
export default function GearHubClient({ bundles }: Props) {
  const [tier, setTier] = useState<GearTier>('standard')

  return (
    <>
      <div className="max-w-page mx-auto px-8 -mt-6 pb-14 md:pb-20">
        <GearTierToggle tier={tier} onTierChange={setTier} />
      </div>

      <section className="max-w-page mx-auto px-8 pb-24">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {bundles.map((bundle) => {
            const items = bundle.itemsByTier[tier]
            const total = bundle.totalByTier[tier]
            return (
              <li key={bundle.planSlug}>
                <Link
                  href={`/gear/sets/${bundle.planSlug}`}
                  className="group block h-full p-8 md:p-10 rounded-2xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                >
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
                    Gear set · {bundle.entryCount} items
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
                    {bundle.setTitle}
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-6">{bundle.setTagline}</p>

                  <ul className="mb-2 divide-y divide-stone-100">
                    {items.map((product) => (
                      <li key={product.id} className="flex items-center justify-between gap-4 py-2">
                        <span className="flex items-center gap-3 min-w-0">
                          {product.imageUrl && (
                            <span className="shrink-0 w-9 h-9 rounded-md bg-stone-100 overflow-hidden ring-1 ring-stone-200">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={product.imageUrl}
                                alt=""
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </span>
                          )}
                          <span className="text-sm text-stone-700 leading-snug truncate">{product.name}</span>
                        </span>
                        <span className="text-sm text-stone-500 tabular-nums shrink-0">
                          {product.priceRange ?? '—'}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between py-2 mb-6 border-t border-stone-200">
                    <span className="text-sm font-semibold text-stone-900">Estimated total</span>
                    <span className="text-sm font-semibold text-stone-900 tabular-nums">~${total}</span>
                  </div>

                  <p className="text-sm text-stone-500 mb-8">
                    Pairs with the{' '}
                    <span className="text-stone-700 font-medium">{bundle.planTitle}</span> plan.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                    See the gear
                    <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <p className="mt-12 text-xs text-stone-500 max-w-2xl">
          As an Amazon Associate we earn from qualifying purchases. Links on the bundle pages are affiliate links — clicking them may earn us a small commission at no extra cost to you.
        </p>
      </section>
    </>
  )
}
