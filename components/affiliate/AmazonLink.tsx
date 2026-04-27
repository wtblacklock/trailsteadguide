import { amazonAffiliateUrl } from '@/lib/affiliate/amazon'
import { getProductById } from '@/lib/affiliate-products'
import type { ReactNode } from 'react'

export type AmazonLinkProps = {
  /** Registry id from `AFFILIATE_PRODUCTS`. Throws at render time if unknown. */
  productId: string
  /** Per-page slug for `ascsubtag` attribution (e.g. `'camping-in-texas-for-beginners'`). */
  pageSlug: string
  /** Optional override for link text. Defaults to the product's `name`. */
  children?: ReactNode
  /** Optional className passthrough — defaults to no styling so the link matches surrounding prose. */
  className?: string
}

/**
 * Renders an Amazon affiliate link sourced from the central product
 * registry. The ASIN, display name, and affiliate-URL shape all live in
 * one place — guides reference products by id, so swapping a product
 * across the site is a one-file edit.
 */
export default function AmazonLink({
  productId,
  pageSlug,
  children,
  className,
}: AmazonLinkProps) {
  const product = getProductById(productId)
  const asin = product.amazonAsin
  if (!asin) {
    throw new Error(
      `Affiliate product "${productId}" has no amazonAsin set — cannot render <AmazonLink>.`,
    )
  }
  return (
    <a
      href={amazonAffiliateUrl(asin, pageSlug)}
      rel="nofollow sponsored noopener"
      target="_blank"
      className={className}
    >
      {children ?? product.name}
    </a>
  )
}
