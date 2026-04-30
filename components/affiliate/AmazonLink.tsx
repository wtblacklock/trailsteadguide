import { getProductById } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { ReactNode } from 'react'

export type AmazonLinkProps = {
  /** Registry id from `AFFILIATE_PRODUCTS`. Throws at render time if unknown. */
  productId: string
  /**
   * Page slug — historical prop for `ascsubtag` attribution. Now ignored
   * because we honor `product.affiliateUrl` (the user-supplied long
   * URLs from the affiliate worksheet) verbatim. Kept on the prop so
   * existing callers keep compiling without churn.
   */
  pageSlug?: string
  /** Optional override for link text. Defaults to the product's `name`. */
  children?: ReactNode
  /** Optional className passthrough — defaults to no styling so the link matches surrounding prose. */
  className?: string
}

/**
 * Renders an Amazon affiliate link sourced from the central product
 * registry. The link URL prefers `product.affiliateUrl` (user-tested
 * long Associates URLs from the worksheet) over the ASIN-built
 * `/dp/<asin>` fallback. Per-page `ascsubtag` attribution is no longer
 * appended — the worksheet URLs already carry their own tracking.
 */
export default function AmazonLink({
  productId,
  children,
  className,
}: AmazonLinkProps) {
  const product = getProductById(productId)
  return (
    <a
      href={getProductUrl(product)}
      rel="nofollow sponsored noopener"
      target="_blank"
      className={className}
    >
      {children ?? product.name}
    </a>
  )
}
