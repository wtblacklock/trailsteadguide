import { getGearForGuide } from '@/lib/affiliate/guide-gear'
import { amazonAffiliateUrl } from '@/lib/affiliate/amazon'

type Props = {
  /** Guide slug (e.g. `'camping-for-beginners'`) — keys into GUIDE_GEAR. */
  guideSlug: string
  /** Optional heading override; defaults to "Recommended gear for this trip". */
  heading?: string
}

/**
 * Slot-grouped gear shelf rendered at the bottom of every `/guides/*` page.
 * Reads from `data/guide-gear.ts` and the affiliate registry. Builds Amazon
 * links via `amazonAffiliateUrl(asin, guideSlug)` so per-page `ascsubtag`
 * attribution is preserved.
 */
export default function GuideGearShelf({ guideSlug, heading }: Props) {
  const groups = getGearForGuide(guideSlug)
  if (groups.length === 0) return null

  return (
    <section className="py-16 border-t border-stone-200">
      <div className="max-w-wide mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-12">
          <h2 className="font-serif text-3xl font-semibold text-stone-950 tracking-tight">
            {heading ?? 'Recommended gear for this trip'}
          </h2>
          <p className="text-stone-400 text-sm">
            Affiliate links support Trailstead at no extra cost. Prices are approximate.
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.slot} className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3">
              {group.label}
            </p>
            <div>
              {group.products.map((product) => {
                const asin = product.amazonAsin
                if (!asin) return null
                return (
                  <a
                    key={product.id}
                    href={amazonAffiliateUrl(asin, guideSlug)}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="group flex items-center gap-5 sm:gap-6 py-5 border-t border-stone-200"
                  >
                    {product.imageUrl && (
                      <div className="shrink-0 w-32 h-24 sm:w-44 sm:h-32 md:w-56 md:h-36 bg-stone-100 rounded-2xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.imageUrl}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-medium text-stone-900 group-hover:text-stone-600 transition-colors mb-1">
                        {product.name}
                      </p>
                      <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {product.description}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 shrink-0">
                      {product.priceRange && (
                        <span className="text-sm text-stone-400 tabular-nums">
                          {product.priceRange}
                        </span>
                      )}
                      <span
                        className="text-stone-300 group-hover:text-stone-700 transition-colors text-lg leading-none"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </a>
                )
              })}
              <div className="border-t border-stone-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
