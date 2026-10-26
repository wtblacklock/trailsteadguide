/**
 * Classifies an Amazon product page (raw HTML) by whether a shopper can buy
 * the item straight from it.
 *
 * A product URL returning HTTP 200 proves very little: Amazon serves its
 * robot-check page with a 200, and a retired or out-of-stock listing still
 * renders with a 200 but has no buy box. This looks for the actual Add to
 * Cart button instead.
 *
 * Kept dependency-free and self-contained (no imports, no closures over
 * module scope) so `classifyAmazonProductHtml.toString()` can be embedded
 * in the in-browser audit snippet printed by
 * `node scripts/validate-affiliate-links.mjs --browser-audit`.
 *
 * Returns { status, reason } where status is one of:
 *   'buyable'      - product page with an Add to Cart button
 *   'not-buyable'  - product page without one (unavailable, no featured
 *                    offer, third-party offers only, or needs a variant)
 *   'robot-check'  - Amazon served a CAPTCHA instead of the product page,
 *                    so the listing could not be verified
 *   'unknown'      - neither a product page nor a recognised robot check
 */
export function classifyAmazonProductHtml(html) {
  const text = String(html || '')
  const isProductPage = text.includes('id="productTitle"')
  if (!isProductPage) {
    const robot =
      text.includes('validateCaptcha') ||
      /Type the characters you see in this image/i.test(text) ||
      /make sure you('|&#39;|&rsquo;)re not a robot/i.test(text) ||
      /api-services-support@amazon\.com/i.test(text)
    return robot
      ? { status: 'robot-check', reason: 'Amazon served a robot check instead of the product page' }
      : { status: 'unknown', reason: 'Response was not a recognisable product page' }
  }
  if (text.includes('id="add-to-cart-button"')) {
    return { status: 'buyable', reason: 'Add to Cart button present' }
  }
  if (/Currently unavailable/i.test(text)) {
    return { status: 'not-buyable', reason: 'Currently unavailable' }
  }
  if (/No featured offers available/i.test(text)) {
    return { status: 'not-buyable', reason: 'No featured offers available (third-party sellers only)' }
  }
  if (/See All Buying Options/i.test(text)) {
    return { status: 'not-buyable', reason: 'Only "See All Buying Options", no buy box' }
  }
  if (/To buy, select/i.test(text)) {
    return { status: 'not-buyable', reason: 'Shopper must pick a variant first; link a specific variant ASIN' }
  }
  return { status: 'not-buyable', reason: 'No Add to Cart button on the product page' }
}

/** Pulls the 10-character ASIN out of an Amazon product URL, if present. */
export function asinFromUrl(url) {
  const m = String(url).match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})(?:[/?#]|$)/)
  return m ? m[1] : null
}
