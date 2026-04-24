import { AffiliateProduct } from '@/types'

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
    <section className="py-12 bg-white">
      <div className="max-w-wide mx-auto px-6">
        <h2 className="text-2xl font-serif font-medium text-stone-900 mb-2">Recommended Gear</h2>
        <p className="text-stone-500 text-sm mb-10">Affiliate links help support Trailstead Guide at no extra cost to you.</p>
        {(['essential', 'comfort', 'convenience'] as const).map((category) => {
          const items = grouped[category]
          if (items.length === 0) return null
          return (
            <div key={category} className="mb-10">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-4">
                {categoryLabel[category]}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((product) => (
                  <a
                    key={product.name}
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border border-stone-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="font-medium text-stone-900 group-hover:text-brand-green transition-colors mb-1">
                      {product.name}
                    </div>
                    <div className="text-sm text-stone-500">{product.description}</div>
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
