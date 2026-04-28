/**
 * Guide schema for the Camping Guides content hub.
 *
 * Guides are long-form articles authored as JSX inside each
 * `app/guides/<slug>/page.tsx` file. This data layer stores only the
 * metadata that other surfaces need: navigation links, the hub grid,
 * category landing pages, sitemap entries, and related-guide links.
 *
 * The article body is intentionally NOT modeled here.
 */

export type GuideCategoryId = 'basics' | 'scenario' | 'seasonal' | 'location'

export type Guide = {
  slug: string
  category: GuideCategoryId
  title: string
  description: string
  eyebrow?: string
}

export type GuideCategory = {
  id: GuideCategoryId
  slug: string
  label: string
  blurb: string
  heroTitle: string
  heroSubhead: string
  ctaLabel: string
  /**
   * SEO-optimized <title> tag for the category hub page. Front-loaded with
   * the primary keyword and tighter than `${label} — Camping Guides`.
   * Total budget is ≤41 chars so the auto-appended " | Trailstead Guide"
   * keeps the rendered title under Google's ~60-char truncation point.
   */
  metaTitle: string
  /**
   * SEO-optimized meta description for the category hub page (140–155
   * chars). Separate from `heroSubhead` so the visible page lede can stay
   * conversational while the SERP snippet is keyword-tight.
   */
  metaDescription: string
  /**
   * True when no guides are authored for this category yet. The hub and
   * the category page render a "we're building this out" state and
   * funnel into the quiz instead of a guide list.
   */
  placeholder?: boolean
}
