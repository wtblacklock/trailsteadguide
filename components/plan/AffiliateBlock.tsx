import { AffiliateProduct } from '@/types'
import { getProductUrl } from '@/lib/amazon'
import type { QuizOutput } from '@/lib/personalization/types'

interface Props {
  products: AffiliateProduct[]
  /**
   * Quiz output, when available. Used to gate kid-specific gear: a product
   * with `slot === 'KID_GEAR'` only renders when the party includes a
   * toddler/infant (`hasKids && kidsAge === 'under_5'`). Without this prop,
   * kid gear renders unconditionally — matches the un-personalized behavior
   * of static guide pages.
   */
  quizOutput?: QuizOutput
}

const categoryLabel: Record<AffiliateProduct['category'], string> = {
  essential: 'Essentials',
  comfort: 'Comfort Upgrades',
  convenience: 'Convenience',
}

/**
 * Toddlers/infants are the only audience for KID_GEAR products in the
 * current registry (KidCo GoPod Activity Center). Older kids don't use it.
 * Exported for unit testing; called inside `<AffiliateBlock>` and
 * applicable elsewhere a kid-gear filter is needed.
 */
export function shouldRenderKidGear(quizOutput?: QuizOutput): boolean {
  if (!quizOutput) return true
  return quizOutput.hasKids && quizOutput.kidsAge === 'under_5'
}

/** Filter products to those visible given the party composition. */
export function filterAffiliateProducts(
  products: AffiliateProduct[],
  quizOutput?: QuizOutput,
): AffiliateProduct[] {
  const showKidGear = shouldRenderKidGear(quizOutput)
  return products.filter((p) => p.slot !== 'KID_GEAR' || showKidGear)
}

export default function AffiliateBlock({ products, quizOutput }: Props) {
  const visible = filterAffiliateProducts(products, quizOutput)
  if (visible.length === 0) return null

  const grouped = visible.reduce<Record<AffiliateProduct['category'], AffiliateProduct[]>>(
    (acc, p) => { acc[p.category] = [...(acc[p.category] ?? []), p]; return acc },
    { essential: [], comfort: [], convenience: [] }
  )

  return (
    <section className="py-16">
      <div className="max-w-wide mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-12">
          <h2 className="font-serif text-3xl font-semibold text-stone-950 tracking-tight">Gear for this trip</h2>
          <p className="text-stone-400 text-sm">Affiliate links support Trailstead at no extra cost. Prices shown are approximate and may vary on Amazon.</p>
        </div>

        {(['essential', 'comfort', 'convenience'] as const).map((category) => {
          const items = grouped[category]
          if (items.length === 0) return null
          return (
            <div key={category} className="mb-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3">
                {categoryLabel[category]}
              </p>
              <div>
                {items.map((product) => (
                  <a
                    key={product.id}
                    href={getProductUrl(product)}
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
                        <span className="text-sm text-stone-400 tabular-nums">{product.priceRange}</span>
                      )}
                      <span
                        className="text-stone-300 group-hover:text-stone-700 transition-colors text-lg leading-none"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </a>
                ))}
                <div className="border-t border-stone-200" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
