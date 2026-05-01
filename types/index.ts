export type PlanSlug =
  | 'backyard-test'
  | 'first-night-camp'
  | 'first-weekend-camp'
  | 'easy-family-basecamp'

export type Experience = 'none' | 'some' | 'confident'
export type Intent = 'test' | 'real-trip' | 'multi-night'
export type ComfortLevel = 'minimal' | 'balanced' | 'comfort-first'
export type ActivityType = 'relaxing' | 'balanced' | 'active'
export type KidsAgeGroup = 'none' | 'under_5' | '5_10' | '10+'

export type PartySize = { adults: number; kids: number }

export type QuizAnswers = {
  experience: Experience
  kidsAgeGroup: KidsAgeGroup[]
  partySize: PartySize
  intent: Intent
  activityType: ActivityType
  comfortLevel: ComfortLevel
}

export type SessionSnapshot = QuizAnswers & {
  planSlug: PlanSlug
  timestamp: number
}

export type QuizOption = {
  label: string
  value: string
}

export type QuizQuestion = {
  id: keyof QuizAnswers
  prompt: string
  subprompt?: string
  /** Default 'select'. Use 'party-size' for the adults/kids stepper. */
  kind?: 'select' | 'party-size'
  options: QuizOption[]
  multiSelect?: boolean
}

export type TimelineItem = {
  time: string
  title: string
  description: string
}

export type GearItem = {
  name: string
  essential: boolean
  affiliateProductId?: string
}

export type ActivityItem = {
  title: string
  description: string
  ageGroup: KidsAgeGroup | 'all'
}

/**
 * A reference from a plan to a curated skill, with a per-plan rationale
 * explaining why the skill matters for THIS trip. The rationale belongs to
 * the plan-skill relationship, not to the skill itself, so different plans
 * can frame the same skill differently.
 */
export type PlanSkillRef = {
  /** Slash-separated `categorySlug/skillSlug`, e.g. 'knots/taut-line-hitch'. */
  skillSlug: string
  rationale: string
}

export type PlanActivitySchedule = {
  /** Activity slugs scheduled for day 1. */
  day1: string[]
  /** Optional day 2 schedule. Single-night plans omit this. */
  day2?: string[]
  /** Optional day 3 schedule. Multi-night plans only. */
  day3?: string[]
}

export type IngredientCategory =
  | 'protein'
  | 'produce'
  | 'pantry'
  | 'dairy'
  | 'snacks'
  | 'drinks'
  | 'other'

export type Ingredient = {
  name: string
  /** Amount per adult, in `unit`. */
  perAdult: number
  /** Amount per kid, in `unit`. */
  perKid: number
  /** Display unit (e.g. 'oz', 'slice', 'count', 'cup'). */
  unit: string
  /** Optional pack rounding for the shopping list. `amount` is in `unit`. */
  packSize?: { amount: number; label: string }
  category: IngredientCategory
}

export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export type Meal = {
  /** 1-indexed day of the trip. */
  day: number
  dayLabel: string
  slot: MealSlot
  title: string
  description: string
  ingredients: Ingredient[]
}

export type PlanTemplate = {
  slug: PlanSlug
  title: string
  tagline: string
  heroImage: string
  tripSummary: string
  preTrip: TimelineItem[]
  arrival: TimelineItem[]
  evening: TimelineItem[]
  morning: TimelineItem[]
  gear: GearItem[]
  activities: ActivityItem[]
  safetyNotes: string[]
  meals: Meal[]
  /** Activity slugs curated for this plan (3–5 total). */
  recommendedActivities: string[]
  /** Skills curated for this plan, with per-plan rationale (3–4 max). */
  recommendedSkills: PlanSkillRef[]
  /** Day-by-day activity schedule. Each slug must appear in `recommendedActivities`. */
  activitySchedule: PlanActivitySchedule
}

/**
 * Discovery tags for affiliate products. Used to filter the registry when
 * deciding which products to feature on a given guide (e.g. "all rain-ready
 * tents", "all heat-friendly shade gear"). Free-form additions are fine as
 * long as the union is updated alongside the registry.
 */
export type AffiliateProductTag =
  // Product types
  | 'tent' | 'sleeping-bag' | 'sleeping-pad' | 'air-mattress' | 'cot'
  | 'stove' | 'cooler' | 'lantern' | 'headlamp' | 'chair'
  | 'canopy' | 'projector' | 'trash' | 'lantern-hanger'
  // Tier
  | 'budget' | 'mid-range' | 'premium'
  // Audience
  | 'family' | 'solo' | 'beginner' | 'with-kids' | 'with-dogs'
  // Scenario
  | 'comfort' | 'heat-friendly' | 'rain-ready' | 'cold-ready' | 'shade'

export type AffiliateProduct = {
  id: string
  name: string
  description: string
  /** Amazon ASIN for direct product link. When set, overrides search fallback. */
  amazonAsin?: string
  /** Optional explicit URL override (non-Amazon stores, etc.). When set, used as-is. */
  affiliateUrl?: string
  imageUrl: string
  category: 'essential' | 'comfort' | 'convenience'
  templateSlugs: PlanSlug[]
  priceRange: string
  /** Discovery tags — used by guides to find products by topic. */
  tags?: AffiliateProductTag[]
  /**
   * Canonical gear slot from `lib/affiliate/gear-slots.ts`. Set on every
   * recommendation product so the renderer can group by slot and so quiz
   * results can filter (e.g. hide KID_GEAR when no toddler in party).
   * Imported as a plain string here to avoid a circular dep.
   */
  slot?:
    | 'TENT' | 'SLEEP_BAG' | 'SLEEP_SURFACE' | 'STOVE' | 'COOKWARE'
    | 'COOLER' | 'LIGHTING' | 'CHAIR' | 'CANOPY' | 'RAIN_GEAR'
    | 'WINTER_GEAR' | 'HOT_GEAR' | 'DOG_GEAR' | 'KID_GEAR' | 'SAFETY'
    | 'POWER' | 'TRASH'
  /**
   * Legacy products kept in the registry for `/compare/*` pages and history
   * tests. Excluded from new recommendation surfaces (guide gear shelf,
   * quiz results AffiliateBlock, Trip Pack bundles).
   */
  deprecated?: boolean
}

export type QuizState = {
  currentIndex: number
  answers: Partial<QuizAnswers>
  showEmailCapture: boolean
  emailCaptureShown: boolean
  status: 'active' | 'generating' | 'complete'
}

export type QuizAction =
  | { type: 'ANSWER'; questionId: keyof QuizAnswers; value: string | string[] | PartySize }
  | { type: 'BACK' }
  | { type: 'DISMISS_EMAIL_CAPTURE' }
  | { type: 'FINISH_GENERATING' }
  | { type: 'COMPLETE' }
