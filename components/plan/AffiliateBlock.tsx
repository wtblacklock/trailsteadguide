import { AffiliateProduct } from '@/types'
import { getProductUrl } from '@/lib/amazon'

interface Props {
  products: AffiliateProduct[]
}

const categoryLabel: Record<AffiliateProduct['category'], string> = {
  essential: 'Essentials',
  comfort: 'Comfort Upgrades',
  convenience: 'Convenience',
}

export default function AffiliateBlock({ products }: Props) {
  if (products.length === 0) return null

  const grouped = products.reduce<Record<AffiliateProduct['category'], AffiliateProduct[]>>(
    (acc, p) => { acc[p.category] = [...(acc[p.category] ?? []), p]; return acc },
    { essential: [], comfort: [], convenience: [] }
  )

  return (
    <section className="py-16">
      <div className="max-w-wide mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-12">
          <h2 className="font-serif text-3xl font-semibold text-stone-950 tracking-tight">Gear for this trip</h2>
          <p className="text-stone-400 text-sm">Affiliate links support Trailstead at no extra cost.</p>
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
                    className="group flex items-center justify-between gap-8 py-5 border-t border-stone-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-medium text-stone-900 group-hover:text-stone-600 transition-colors mb-1">
                        {product.name}
                      </p>
                      <p className="text-sm text-stone-500 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
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
