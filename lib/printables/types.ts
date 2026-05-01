/**
 * Printable schema for the analog-guides system. Each printable is a
 * single-page free PDF/HTML download gated by an email capture; on
 * submit the visitor lands on the print-optimized HTML view.
 */

export type PrintableCategoryId = 'stargazing' | 'cooking' | 'knots' | 'fire' | 'planning' | 'kids'

export type Printable = {
  slug: string
  category: PrintableCategoryId
  /** Public-facing title used in metadata + headings. */
  title: string
  /** Short SERP description (140–155 chars). */
  description: string
  /** One-sentence hook shown above the email gate. */
  tagline: string
  /** What you get — bullet list shown on the landing page. */
  whatYouGet: string[]
  /** Suggested use cases — bullet list. */
  useCases: string[]
  /** Format string for the schema/file note ("Single-page PDF · Letter / A4"). */
  formatNote: string
  /** OG image used on the landing page; should match the print preview. */
  ogImage?: string
  /** When the asset was first published (ISO date). */
  datePublished: string
  /** Optional related skill slug (category/skill) to cross-link. */
  relatedSkillPath?: string
  /** Optional related guide slug to cross-link. */
  relatedGuideSlug?: string
}
