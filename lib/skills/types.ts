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
