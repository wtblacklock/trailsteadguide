/**
 * Skill schema for the Camp Skills System.
 *
 * Unifies the spec's "Skill" and "Project" shapes into one type — both
 * shapes are subsets, with woodcarving-style projects setting `outcome`
 * and `timeRequired` while general skills lean on `whenToUse` and
 * `useCases`. All non-essential fields are optional so a skill record
 * carries only what's relevant to it.
 */

export type Difficulty = 'Beginner' | 'Intermediate'

export type SkillCategoryId =
  | 'knots'
  | 'cooking'
  | 'fire'
  | 'hiking'
  | 'orienteering'
  | 'fishing'
  | 'shelter'
  | 'camp-setup'
  | 'safety'
  | 'stargazing'
  | 'knife-skills'
  | 'woodcarving'

export type SafetyTone = 'standard' | 'critical'

/**
 * Optional affiliate-product reference. When `productId` matches an entry
 * in AFFILIATE_PRODUCTS, the related-gear block renders a live product
 * card; otherwise just the plain `name` is rendered.
 */
export type RelatedGearItem = {
  name: string
  productId?: string
}

/**
 * Embedded how-to video. URL must be a youtube-nocookie.com /embed/ URL
 * so we keep tracking-cookies off the page.
 */
export type SkillVideoEmbed = {
  url: string
  title: string
}

/**
 * Illustration reference (typically a Wikimedia Commons SVG or photo).
 * Attribution string is rendered alongside the image — Wikimedia requires
 * artist + license credit.
 */
export type SkillIllustration = {
  url: string
  alt: string
  attribution: string
}

export type Skill = {
  slug: string
  category: SkillCategoryId
  title: string
  tagline: string
  difficulty: Difficulty
  useCases: string[]
  whenToUse?: string
  timeRequired?: string
  outcome?: string
  materials: string[]
  steps: string[]
  proTips?: string[]
  commonMistakes?: string[]
  safetyNotes?: string[]
  safetyTone?: SafetyTone
  variations?: string[]
  relatedGear?: RelatedGearItem[]
  videoEmbed?: SkillVideoEmbed
  illustration?: SkillIllustration
  /**
   * Optional printable companion — the slug of an entry in the
   * /printables catalogue. When set, the skill detail page renders a
   * "Pair with" block linking the visitor to the analog version of the
   * skill (a one-page printable they can carry).
   */
  relatedPrintableSlug?: string
  /**
   * Cross-links to related skills as `categorySlug/skillSlug` refs
   * (e.g. `'stargazing/finding-constellations'`). Rendered as a
   * "Continue learning" block at the bottom of the skill page so
   * visitors can move through a topical cluster naturally — and so
   * Google sees an internal-link graph that signals topical authority.
   */
  relatedSkills?: string[]
}

export type SkillCategory = {
  id: SkillCategoryId
  slug: string
  label: string
  navLabel: string
  blurb: string
  heroTitle: string
  heroSubhead: string
}
