import { getProductById } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'

interface Props {
  /** Product ids from `printable.relatedProductIds` (lib/affiliate-products.ts). */
  productIds: string[]
}

/**
 * Sidebar card on a printable's page pointing to the physical tool or kit
 * that pairs with the analog card (e.g. a planisphere for the star chart,
 * a first aid kit for the first aid reference).
 */
export default function PrintableGearCard({ productIds }: Props) {
  if (productIds.length === 0) return null
  const products = productIds.map(getProductById)

  return (
    <div className="rounded-2xl ring-1 ring-stone-200 p-6 md:p-7">
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
        Gear for this
      </p>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id}>
            <a
              href={getProductUrl(product)}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="group flex items-center gap-3"
            >
              {product.imageUrl && (
                <span className="shrink-0 w-14 h-14 rounded-lg bg-stone-100 overflow-hidden ring-1 ring-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </span>
              )}
              <span className="min-w-0">
                <span className="block text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">
                  {product.name}
                </span>
                {product.priceRange && (
                  <span className="block text-xs text-stone-500 tabular-nums mt-0.5">
                    {product.priceRange}
                  </span>
                )}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] text-stone-400 leading-relaxed">
        Affiliate links - we may earn a small commission at no extra cost to you.
      </p>
    </div>
  )
}
