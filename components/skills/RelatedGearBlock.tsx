import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { RelatedGearItem } from '@/lib/skills/types'

interface Props {
  items: RelatedGearItem[]
}

const PRODUCTS_BY_ID = Object.fromEntries(AFFILIATE_PRODUCTS.map((p) => [p.id, p]))

/**
 * Recommended-gear callout for the bottom of a skill detail page.
 * Items with a `productId` matching AFFILIATE_PRODUCTS render as a
 * linked card; items without one render as a plain text bullet.
 */
export default function RelatedGearBlock({ items }: Props) {
  if (items.length === 0) return null
  return (
    <section className="bg-white border border-stone-200 rounded-xl p-6 md:p-8">
      <h2 className="font-serif text-xl text-stone-900 mb-2">Recommended gear</h2>
      <p className="text-stone-600 text-sm mb-5">A short list of what makes this skill easier.</p>
      <ul className="space-y-3">
        {items.map((item, i) => {
          const product = item.productId ? PRODUCTS_BY_ID[item.productId] : undefined
          if (product) {
            return (
              <li key={i}>
                <a
                  href={getProductUrl(product)}
                  rel="nofollow sponsored noopener"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-stone-900 hover:text-[#2d5016] font-medium"
                >
                  {product.name}
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
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                {product.priceRange && (
                  <span className="ml-2 text-sm text-stone-500">{product.priceRange}</span>
                )}
              </li>
            )
          }
          return (
            <li key={i} className="flex gap-3 text-stone-700">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
              <span>{item.name}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
