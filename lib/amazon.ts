import type { AffiliateProduct } from '@/types'

/** Amazon Associates tracking tag. Every Amazon link must include this
 *  for commission attribution. */
export const AMAZON_ASSOCIATE_TAG = 'trailsteadgui-20'

/** Direct product URL by ASIN — preferred when we know the specific product. */
export function amazonProductUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`
}

/** Search-result URL — fallback for when we don't have a specific ASIN yet.
 *  Amazon credits commissions for search clicks that carry our tag. */
export function amazonSearchUrl(query: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AMAZON_ASSOCIATE_TAG}`
}

/** Resolves the outgoing URL for an AffiliateProduct.
 *  Priority: explicit affiliateUrl override → ASIN product page → name search. */
export function getProductUrl(product: AffiliateProduct): string {
  if (product.affiliateUrl && product.affiliateUrl !== '#') {
    return product.affiliateUrl
  }
  if (product.amazonAsin) {
    return amazonProductUrl(product.amazonAsin)
  }
  return amazonSearchUrl(product.name)
}
