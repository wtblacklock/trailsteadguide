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

export type QuizAnswers = {
  experience: Experience
  kidsAgeGroup: KidsAgeGroup[]
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
}

export type AffiliateProduct = {
  id: string
  name: string
  description: string
  affiliateUrl: string
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
  | { type: 'ANSWER'; questionId: keyof QuizAnswers; value: string | string[] }
  | { type: 'DISMISS_EMAIL_CAPTURE' }
  | { type: 'COMPLETE' }
