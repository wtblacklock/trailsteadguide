/**
 * Amazon affiliate link helper.
 *
 * Builds a canonical product URL with our Associates tag and a per-page
 * `ascsubtag` so Amazon's reports show which guide drove each click.
 * `amzn.to` short links work too, but they strip query params on redirect
 * — meaning all clicks bucket together with no per-page attribution.
 *
 * Usage:
 *   <a href={amazonAffiliateUrl('B0D7QHY574', 'first-night-camping-guide')}>...</a>
 */

const AMAZON_ASSOCIATES_TAG = 'trailsteadgui-20'

export function amazonAffiliateUrl(asin: string, contextSlug: string): string {
  const subtag = encodeURIComponent(contextSlug)
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_ASSOCIATES_TAG}&ascsubtag=${subtag}`
}

/**
 * Resolved mapping of every short link previously hardcoded across the site,
 * captured 2026-04-26. Useful for the migration sweep and the link validator
 * — not consumed at runtime by guide pages, which call `amazonAffiliateUrl`
 * with the ASIN directly.
 */
export const SHORT_LINK_TO_ASIN: Record<string, string> = {
  '3OlFWKU': 'B082F13J55', // TMY 1080P Mini Projector
  '3Qm3Mqu': 'B0009PUTJI', // Coleman Lantern Hanger
  '4cHYL2S': 'B0CHKGXSQ6', // Wakeman Outdoor Collapsible Trash Can
  '4cKiwH7': 'B077XQDZW4', // MalloMe Sleeping Bag
  '4cOwo3a': 'B01E45EYJY', // CORE 10x10 Instant Pop-Up Canopy
  '4d3oHXX': 'B08LMVJJ9Q', // Coleman Classic Rolling Cooler
  '4e8dK8O': 'B00D4JYR62', // GCI Outdoor Freestyle Rocker
  '4mVpMom': 'B07H99CMNP', // Kelty Tuck 20 Sleeping Bag
  '4mXLRTe': 'B09NQK2581', // Black Diamond Spot 400 Headlamp
  '4sQx6Tz': 'B09KNVRDNQ', // Camp Chef Everest 2X 2-Burner Stove
  '4sUKHJs': 'B0D7QHY574', // Coleman Sundome 4-Person Tent
  '4sVHJEv': 'B001LF3FZK', // ALPS Mountaineering Leisure Chair
  '4tz86RT': 'B082HD5JDH', // Consciot LED Camping Lantern (2-pack)
  '4uc7DVG': 'B0009PUR5E', // Coleman 1-Burner Propane Stove
  '4ut42CT': 'B00AU6AVLW', // Coleman Queen Airbed Cot Combo
  '4vG4xdY': 'B00HC9QTO8', // TETON Sports ComfortLite Sleeping Pad
  '4vLAkKN': 'B00FAW4O0A', // SoundAsleep Dream Series Air Mattress
}
