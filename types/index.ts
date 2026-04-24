export type PlanSlug =
  | 'backyard-test'
  | 'first-night-camp'
  | 'first-weekend-camp'
  | 'easy-family-basecamp'

export type Experience = 'none' | 'some' | 'confident'
export type Anxiety = 'low' | 'medium' | 'high'
export type Intent = 'test' | 'real-trip' | 'multi-night'
export type ComfortPriority = 'low' | 'high'
export type KidsAgeGroup = 'none' | '3-6' | '7-12' | 'teens'

export type PartySize = { adults: number; kids: number }

export type QuizAnswers = {
  experience: Experience
  kidsAgeGroup: KidsAgeGroup[]
  partySize: PartySize
  intent: Intent
  anxiety: Anxiety
  comfortPriority: ComfortPriority
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
}

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
}

export type QuizState = {
  currentIndex: number
  answers: Partial<QuizAnswers>
  showEmailCapture: boolean
  emailCaptureShown: boolean
  status: 'active' | 'complete'
}

export type QuizAction =
  | { type: 'ANSWER'; questionId: keyof QuizAnswers; value: string | string[] | PartySize }
  | { type: 'DISMISS_EMAIL_CAPTURE' }
  | { type: 'COMPLETE' }
