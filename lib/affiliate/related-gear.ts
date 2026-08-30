/**
 * Optional affiliate-product reference, shared by any content type that
 * wants a "recommended gear" callout (skills, activities). When
 * `productId` matches an entry in `AFFILIATE_PRODUCTS`, `RelatedGearBlock`
 * renders a live product card; otherwise just the plain `name` is rendered.
 */
export type RelatedGearItem = {
  name: string
  productId?: string
}
