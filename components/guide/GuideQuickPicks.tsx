import { getGearForGuide } from '@/lib/affiliate/guide-gear'
import { getProductUrl } from '@/lib/amazon'

type Props = {
  /** Guide slug - keys into GUIDE_GEAR via getGearForGuide(). */
  guideSlug: string
}

/**
 * Compact above-the-fold gear strip shown right after the hero image, before
 * the article body. `GuideGearShelf` still renders the full slot-grouped
 * list at the bottom for readers who want it - this is for the skimmer who
 * wants to click straight to a product without reading 2,000 words first.
 * Shows one product per slot, capped at 3, in the same top-to-bottom slot
 * order as the full shelf.
 */
export default function GuideQuickPicks({ guideSlug }: Props) {
  const groups = getGearForGuide(guideSlug).slice(0, 3)
  if (groups.length === 0) return null

  return (
    <div className="max-w-5xl mx-auto px-8 -mt-10 mb-16">
      <div className="rounded-2xl border border-stone-200 bg-cream/60 px-5 py-5 md:px-6 md:py-6">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
          Quick picks for this trip
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {groups.map(({ slot, label, products }) => {
            const product = products[0]
            if (!product.amazonAsin && !product.affiliateUrl) return null
            return (
              <a
                key={slot}
                href={getProductUrl(product)}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl bg-white/80 ring-1 ring-stone-200 px-3 py-3 hover:ring-stone-400 transition-colors"
              >
                {product.imageUrl && (
                  <div className="shrink-0 w-14 h-14 bg-stone-100 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.imageUrl}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors truncate">
                    {product.name}
                  </p>
                  {product.priceRange && (
                    <p className="text-xs text-stone-400 tabular-nums">{product.priceRange}</p>
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
