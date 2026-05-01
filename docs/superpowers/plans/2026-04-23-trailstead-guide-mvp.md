# Trailstead Guide MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Trailstead Guide MVP — a Next.js decision engine that routes first-time family campers through a 5-question quiz into one of four personalized static plan templates, with affiliate placeholders and ConvertKit email capture.

**Architecture:** Client-side React quiz using `useReducer`, writing a `SessionSnapshot` to `localStorage` on completion, routing to one of four pre-built static plan pages at `/plan/[slug]`. Plan pages are server components with a `<PersonalizationBanner>` client component that reads localStorage and injects personalized copy. Landing page is fully static.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v3, next/font (Inter + Lora), Next.js Image, Vitest + @testing-library/react for pure logic tests, ConvertKit form POST for email capture.

---

## File Map

```
app/
  layout.tsx                          modify — add fonts, global styles
  page.tsx                            create — landing page assembly
  quiz/page.tsx                       create — quiz flow (client component)
  plan/
    backyard-test/page.tsx            create
    first-night-camp/page.tsx         create
    first-weekend-camp/page.tsx       create
    easy-family-basecamp/page.tsx     create
  thank-you/page.tsx                  create

components/
  ui/
    Button.tsx                        create
    Card.tsx                          create
  landing/
    Hero.tsx                          create
    ProblemSection.tsx                create
    SolutionSection.tsx               create
    HowItWorks.tsx                    create
    ExampleOutput.tsx                 create
    TrustSection.tsx                  create
    FinalCTA.tsx                      create
  quiz/
    QuizShell.tsx                     create — useReducer state machine
    QuizQuestion.tsx                  create
    QuizProgress.tsx                  create
    MidQuizEmailCapture.tsx           create
  plan/
    PersonalizationBanner.tsx         create — client component, reads localStorage
    PlanHero.tsx                      create
    Timeline.tsx                      create
    GearList.tsx                      create
    KidActivityPlan.tsx               create
    SafetyNotes.tsx                   create
    AffiliateBlock.tsx                create
    PostPlanEmailCapture.tsx          create

lib/
  session.ts                          create
  quiz-router.ts                      create
  quiz-questions.ts                   create
  plan-templates.ts                   create
  affiliate-products.ts               create

types/
  index.ts                            create

lib/__tests__/
  session.test.ts                     create
  quiz-router.test.ts                 create
```

---

## Task 1: Scaffold Project

**Files:** `package.json`, `tailwind.config.ts`, `tsconfig.json`, `vitest.config.ts`

- [ ] **Step 1: Scaffold Next.js app**

```bash
cd /Users/BIGWilly/Projects/trailsteadguide
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

Expected: project files created including `app/`, `package.json`, `tailwind.config.ts`.

- [ ] **Step 2: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Create vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

- [ ] **Step 4: Create vitest setup file**

Create `vitest.setup.ts`:

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script to package.json**

Open `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Verify scaffold works**

```bash
npm run build 2>&1 | tail -5
```

Expected: build succeeds (exit 0).

- [ ] **Step 7: Commit**

```bash
git init && git add -A && git commit -m "feat: scaffold Next.js project with Vitest"
```

---

## Task 2: Global Layout — Fonts + Tailwind Tokens

**Files:** `app/layout.tsx`, `tailwind.config.ts`, `app/globals.css`

- [ ] **Step 1: Update tailwind.config.ts**

Replace content of `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          green: '#2d5016',
          'green-light': '#3d6b1f',
          brown: '#5c3d1e',
          earth: '#8b6345',
        },
      },
      maxWidth: {
        content: '48rem',   // 768px — body text
        wide: '72rem',      // 1152px — wide sections
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Update app/globals.css**

Replace content of `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-stone-50 text-stone-900;
  }

  h1, h2, h3 {
    @apply font-serif;
  }
}
```

- [ ] **Step 3: Update app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Trailstead Guide — Your First Family Camping Plan',
  description: 'Answer 5 questions. Get a complete, personalized camping plan for your family. Built for first-timers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | tail -5
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: configure Tailwind tokens, Inter + Lora fonts"
```

---

## Task 3: TypeScript Types

**Files:** `types/index.ts`

- [ ] **Step 1: Create types/index.ts**

```ts
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
  kidsAgeGroup: KidsAgeGroup
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
  status: 'active' | 'complete'
}

export type QuizAction =
  | { type: 'ANSWER'; questionId: keyof QuizAnswers; value: string }
  | { type: 'DISMISS_EMAIL_CAPTURE' }
  | { type: 'COMPLETE' }
```

- [ ] **Step 2: Commit**

```bash
git add types/index.ts && git commit -m "feat: add TypeScript types"
```

---

## Task 4: Session Helpers (TDD)

**Files:** `lib/session.ts`, `lib/__tests__/session.test.ts`

- [ ] **Step 1: Create test directory**

```bash
mkdir -p lib/__tests__
```

- [ ] **Step 2: Write failing tests**

Create `lib/__tests__/session.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })
Object.defineProperty(globalThis, 'window', { value: globalThis })

import { writeSession, readSession, clearSession } from '../session'
import type { SessionSnapshot } from '@/types'

const mockSnapshot: SessionSnapshot = {
  experience: 'none',
  kidsAgeGroup: '3-6',
  intent: 'real-trip',
  anxiety: 'high',
  comfortPriority: 'low',
  planSlug: 'first-night-camp',
  timestamp: 1714000000000,
}

describe('session helpers', () => {
  beforeEach(() => localStorageMock.clear())

  it('writeSession stores snapshot as JSON', () => {
    writeSession(mockSnapshot)
    const raw = localStorageMock.getItem('trailstead_session')
    expect(JSON.parse(raw!)).toEqual(mockSnapshot)
  })

  it('readSession returns null when nothing stored', () => {
    expect(readSession()).toBeNull()
  })

  it('readSession returns the stored snapshot', () => {
    writeSession(mockSnapshot)
    expect(readSession()).toEqual(mockSnapshot)
  })

  it('readSession returns null on corrupt JSON', () => {
    localStorageMock.setItem('trailstead_session', 'not-json')
    expect(readSession()).toBeNull()
  })

  it('clearSession removes stored snapshot', () => {
    writeSession(mockSnapshot)
    clearSession()
    expect(readSession()).toBeNull()
  })
})
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
npm test 2>&1 | tail -15
```

Expected: FAIL — `Cannot find module '../session'`.

- [ ] **Step 4: Implement lib/session.ts**

```ts
import type { SessionSnapshot } from '@/types'

const SESSION_KEY = 'trailstead_session'

export function writeSession(snapshot: SessionSnapshot): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(SESSION_KEY, JSON.stringify(snapshot))
}

export function readSession(): SessionSnapshot | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as SessionSnapshot
  } catch {
    return null
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SESSION_KEY)
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npm test 2>&1 | tail -10
```

Expected: 5 tests pass.

- [ ] **Step 6: Commit**

```bash
git add lib/session.ts lib/__tests__/session.test.ts && git commit -m "feat: session localStorage helpers (TDD)"
```

---

## Task 5: Quiz Router (TDD)

**Files:** `lib/quiz-router.ts`, `lib/__tests__/quiz-router.test.ts`

- [ ] **Step 1: Write failing tests**

Create `lib/__tests__/quiz-router.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { computePlanSlug } from '../quiz-router'
import type { QuizAnswers } from '@/types'

describe('computePlanSlug', () => {
  it('returns easy-family-basecamp for high comfort priority regardless of experience', () => {
    const answers: QuizAnswers = {
      experience: 'none',
      kidsAgeGroup: '3-6',
      intent: 'real-trip',
      anxiety: 'high',
      comfortPriority: 'high',
    }
    expect(computePlanSlug(answers)).toBe('easy-family-basecamp')
  })

  it('returns easy-family-basecamp for high comfort even with confident experience', () => {
    const answers: QuizAnswers = {
      experience: 'confident',
      kidsAgeGroup: 'none',
      intent: 'multi-night',
      anxiety: 'low',
      comfortPriority: 'high',
    }
    expect(computePlanSlug(answers)).toBe('easy-family-basecamp')
  })

  it('returns backyard-test for no experience + test intent', () => {
    const answers: QuizAnswers = {
      experience: 'none',
      kidsAgeGroup: '7-12',
      intent: 'test',
      anxiety: 'high',
      comfortPriority: 'low',
    }
    expect(computePlanSlug(answers)).toBe('backyard-test')
  })

  it('returns first-weekend-camp for some experience + multi-night', () => {
    const answers: QuizAnswers = {
      experience: 'some',
      kidsAgeGroup: '7-12',
      intent: 'multi-night',
      anxiety: 'medium',
      comfortPriority: 'low',
    }
    expect(computePlanSlug(answers)).toBe('first-weekend-camp')
  })

  it('returns first-weekend-camp for confident + multi-night', () => {
    const answers: QuizAnswers = {
      experience: 'confident',
      kidsAgeGroup: 'teens',
      intent: 'multi-night',
      anxiety: 'low',
      comfortPriority: 'low',
    }
    expect(computePlanSlug(answers)).toBe('first-weekend-camp')
  })

  it('returns first-night-camp as default for no-experience + real-trip', () => {
    const answers: QuizAnswers = {
      experience: 'none',
      kidsAgeGroup: '3-6',
      intent: 'real-trip',
      anxiety: 'high',
      comfortPriority: 'low',
    }
    expect(computePlanSlug(answers)).toBe('first-night-camp')
  })

  it('returns first-night-camp for some experience + real-trip', () => {
    const answers: QuizAnswers = {
      experience: 'some',
      kidsAgeGroup: 'teens',
      intent: 'real-trip',
      anxiety: 'medium',
      comfortPriority: 'low',
    }
    expect(computePlanSlug(answers)).toBe('first-night-camp')
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test 2>&1 | tail -10
```

Expected: FAIL — `Cannot find module '../quiz-router'`.

- [ ] **Step 3: Implement lib/quiz-router.ts**

```ts
import type { QuizAnswers, PlanSlug } from '@/types'

export function computePlanSlug(answers: QuizAnswers): PlanSlug {
  if (answers.comfortPriority === 'high') {
    return 'easy-family-basecamp'
  }

  if (answers.experience === 'none' && answers.intent === 'test') {
    return 'backyard-test'
  }

  if (
    (answers.experience === 'some' || answers.experience === 'confident') &&
    answers.intent === 'multi-night'
  ) {
    return 'first-weekend-camp'
  }

  return 'first-night-camp'
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test 2>&1 | tail -10
```

Expected: 7 tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/quiz-router.ts lib/__tests__/quiz-router.test.ts && git commit -m "feat: quiz routing logic (TDD)"
```

---

## Task 6: Quiz Questions Config

**Files:** `lib/quiz-questions.ts`

- [ ] **Step 1: Create lib/quiz-questions.ts**

```ts
import type { QuizQuestion } from '@/types'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'experience',
    prompt: 'Have you been camping before?',
    subprompt: 'Be honest — this helps us build the right plan for you.',
    options: [
      { label: 'Never camped', value: 'none' },
      { label: 'A few times, but not recently with kids', value: 'some' },
      { label: 'Yes, fairly comfortable with it', value: 'confident' },
    ],
  },
  {
    id: 'kidsAgeGroup',
    prompt: 'What age are your kids?',
    options: [
      { label: 'No kids — just adults', value: 'none' },
      { label: '3–6 years old', value: '3-6' },
      { label: '7–12 years old', value: '7-12' },
      { label: 'Teens', value: 'teens' },
    ],
  },
  {
    id: 'intent',
    prompt: 'What are you hoping to do?',
    options: [
      { label: 'Test camping at home first (backyard)', value: 'test' },
      { label: 'Do a real campsite trip, one night', value: 'real-trip' },
      { label: 'Go for a full weekend, two nights', value: 'multi-night' },
    ],
  },
  // Mid-quiz email capture shown as interstitial after this question (index 2)
  {
    id: 'anxiety',
    prompt: 'How prepared do you feel right now?',
    subprompt: "Totally okay if the answer is \"not at all.\"",
    options: [
      { label: 'Pretty nervous — lots of questions', value: 'high' },
      { label: 'A little uncertain', value: 'medium' },
      { label: 'Fairly confident, just need a checklist', value: 'low' },
    ],
  },
  {
    id: 'comfortPriority',
    prompt: 'What matters most on this trip?',
    options: [
      { label: 'Just getting outside — comfort is secondary', value: 'low' },
      { label: "We need it to feel comfortable or we won't go back", value: 'high' },
    ],
  },
]

/** Show mid-quiz email capture as interstitial after answering question at this index */
export const EMAIL_CAPTURE_AFTER_INDEX = 2
```

- [ ] **Step 2: Commit**

```bash
git add lib/quiz-questions.ts && git commit -m "feat: quiz questions config"
```

---

## Task 7: Plan Templates Content

**Files:** `lib/plan-templates.ts`, `lib/affiliate-products.ts`

- [ ] **Step 1: Create lib/affiliate-products.ts**

```ts
import type { AffiliateProduct, PlanSlug } from '@/types'

export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'tent-family',
    name: 'REI Co-op Base Camp 4 Tent',
    description: 'Roomy 4-person tent with excellent weather protection. Sets up in under 15 minutes.',
    affiliateUrl: '#',
    imageUrl: 'https://picsum.photos/seed/tent-family/400/300',
    category: 'essential',
    templateSlugs: ['first-night-camp', 'first-weekend-camp'],
    priceRange: '$300–400',
  },
  {
    id: 'tent-basic',
    name: 'REI Co-op Passage 2 Tent',
    description: 'Lightweight, reliable starter tent. Great for a backyard test or solo sleepout.',
    affiliateUrl: '#',
    imageUrl: 'https://picsum.photos/seed/tent-basic/400/300',
    category: 'essential',
    templateSlugs: ['backyard-test'],
    priceRange: '$150–200',
  },
  {
    id: 'tent-cabin',
    name: 'Coleman Skydome Camping Tent',
    description: 'Near-vertical walls, easy setup, fits a queen air mattress. Built for comfort.',
    affiliateUrl: '#',
    imageUrl: 'https://picsum.photos/seed/tent-cabin/400/300',
    category: 'comfort',
    templateSlugs: ['easy-family-basecamp'],
    priceRange: '$200–280',
  },
  {
    id: 'sleeping-bag-family',
    name: 'Kelty Tuck 20 Sleeping Bag',
    description: 'Rated to 20°F, roomy fit, easy to get into. Works for most 3-season family trips.',
    affiliateUrl: '#',
    imageUrl: 'https://picsum.photos/seed/sleeping-bag/400/300',
    category: 'essential',
    templateSlugs: ['backyard-test', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '$80–120',
  },
  {
    id: 'sleeping-pad-air',
    name: 'REI Co-op Camp Dreamer Sleeping Pad',
    description: 'Self-inflating, comfortable, packs small. Genuine comfort upgrade over foam.',
    affiliateUrl: '#',
    imageUrl: 'https://picsum.photos/seed/sleeping-pad/400/300',
    category: 'comfort',
    templateSlugs: ['first-night-camp', 'first-weekend-camp'],
    priceRange: '$80–130',
  },
  {
    id: 'air-mattress-queen',
    name: 'SoundAsleep Dream Series Air Mattress',
    description: 'Queen size, stays inflated all night. The right call for a comfort-focused family trip.',
    affiliateUrl: '#',
    imageUrl: 'https://picsum.photos/seed/air-mattress/400/300',
    category: 'comfort',
    templateSlugs: ['easy-family-basecamp'],
    priceRange: '$100–150',
  },
  {
    id: 'stove-2-burner',
    name: 'Camp Chef Everest 2-Burner Stove',
    description: 'High-output, wind-resistant. Cooks real meals, not just boiling water.',
    affiliateUrl: '#',
    imageUrl: 'https://picsum.photos/seed/camp-stove/400/300',
    category: 'essential',
    templateSlugs: ['first-night-camp', 'first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '$90–130',
  },
  {
    id: 'headlamp-family',
    name: 'Black Diamond Spot 400 Headlamp',
    description: '400 lumens, red night mode, comfortable strap. One per person is non-negotiable.',
    affiliateUrl: '#',
    imageUrl: 'https://picsum.photos/seed/headlamp/400/300',
    category: 'essential',
    templateSlugs: ['backyard-test', 'first-night-camp', 'first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '$35–50',
  },
  {
    id: 'camp-chairs',
    name: 'ALPS Mountaineering Leisure Chair',
    description: 'Sturdy, comfortable, easy to carry. The chair you actually want to sit in for an evening.',
    affiliateUrl: '#',
    imageUrl: 'https://picsum.photos/seed/camp-chairs/400/300',
    category: 'comfort',
    templateSlugs: ['first-night-camp', 'first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '$40–60',
  },
  {
    id: 'cooler-basic',
    name: 'Coleman 54-Quart Steel-Belted Cooler',
    description: 'Keeps ice 4–5 days, holds enough for a family weekend. Classic for good reason.',
    affiliateUrl: '#',
    imageUrl: 'https://picsum.photos/seed/cooler/400/300',
    category: 'essential',
    templateSlugs: ['first-night-camp', 'first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '$100–160',
  },
  {
    id: 'canopy-camp',
    name: 'CORE 10x10 Instant Canopy',
    description: 'Sets up in 60 seconds. Shade at camp is a comfort multiplier.',
    affiliateUrl: '#',
    imageUrl: 'https://picsum.photos/seed/canopy/400/300',
    category: 'convenience',
    templateSlugs: ['first-weekend-camp', 'easy-family-basecamp'],
    priceRange: '$80–120',
  },
]

export function getProductsForTemplate(slug: PlanSlug): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS.filter((p) => p.templateSlugs.includes(slug))
}
```

- [ ] **Step 2: Create lib/plan-templates.ts**

```ts
import type { PlanTemplate } from '@/types'

export const PLAN_TEMPLATES: Record<string, PlanTemplate> = {
  'backyard-test': {
    slug: 'backyard-test',
    title: 'Backyard Test Night',
    tagline: 'Before you commit to a campsite, make sure everyone can actually sleep outside.',
    heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1400&auto=format&fit=crop&q=80',
    tripSummary: 'A one-night backyard simulation to test your sleep system, gear setup, and kid readiness — no campsite booking required.',
    preTrip: [
      {
        time: '3 days before',
        title: 'Pull out all your gear',
        description: 'Locate your tent, sleeping bags, and sleeping pads. Check for missing parts, broken zippers, or missing stakes.',
      },
      {
        time: '1 day before',
        title: 'Set a "go time"',
        description: 'Pick a start time — 5pm works well. Having a schedule prevents the night from drifting into chaos.',
      },
    ],
    arrival: [
      {
        time: '5:00 PM',
        title: 'Set up the tent',
        description: 'Do this before it gets dark. Let the kids help with simple tasks like carrying stakes or holding poles.',
      },
      {
        time: '6:00 PM',
        title: 'Test your sleep system',
        description: "Everyone gets into their sleeping bag inside the tent while it's still light. Note what's uncomfortable now — not at midnight.",
      },
    ],
    evening: [
      {
        time: '7:00 PM',
        title: 'Cook outside',
        description: "Use your camp stove or grill. Practice the setup, not the food. Hot dogs are fine. The point is doing it outside.",
      },
      {
        time: '8:30 PM',
        title: 'Lights out in the tent',
        description: 'Everyone sleeps in the tent — yes, even if the house is 20 feet away. No exceptions. This is the test.',
      },
    ],
    morning: [],
    gear: [
      { name: '3-season tent', essential: true, affiliateProductId: 'tent-basic' },
      { name: 'Sleeping bags (age/temp appropriate)', essential: true, affiliateProductId: 'sleeping-bag-family' },
      { name: 'Sleeping pads', essential: true },
      { name: 'Headlamps (one per person)', essential: true, affiliateProductId: 'headlamp-family' },
      { name: 'Camp stove (optional for backyard)', essential: false, affiliateProductId: 'stove-2-burner' },
    ],
    activities: [
      {
        title: 'Tent setup challenge',
        description: 'Race to get a specific peg in. Small competitive wins build confidence with gear.',
        ageGroup: 'all',
      },
      {
        title: 'Night sounds inventory',
        description: 'Before sleep: lie still and identify 3 sounds you can hear from inside the tent.',
        ageGroup: '7-12',
      },
      {
        title: 'Flashlight story time',
        description: 'Stories told by flashlight inside sleeping bags. Let kids lead one.',
        ageGroup: '3-6',
      },
    ],
    safetyNotes: [
      'Keep the back door unlocked. This is a test, not a survival situation.',
      'Temperature drops significantly at night even in summer. Check bag ratings before lights out.',
      'Keep water bottles inside the tent.',
      'If anyone is genuinely uncomfortable, the house is right there. No shame in going in.',
    ],
  },

  'first-night-camp': {
    slug: 'first-night-camp',
    title: 'First Night Camp',
    tagline: 'Your first real campsite trip — done right, without the chaos.',
    heroImage: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1400&auto=format&fit=crop&q=80',
    tripSummary: "A one-night campsite trip with a clear timeline, a short gear list, and everything your family needs to leave feeling like you'll do it again.",
    preTrip: [
      {
        time: '1 week before',
        title: 'Book your campsite',
        description: 'Pick a developed campsite with restrooms, fire rings, and flat tent pads. State parks are ideal. Reserve.america.com covers most.',
      },
      {
        time: '3 days before',
        title: 'Backyard gear check',
        description: 'Set up the tent in your yard. Test all sleep systems. Replace anything missing or broken now — not the morning you leave.',
      },
      {
        time: 'Night before',
        title: 'Pack the car',
        description: 'Use the gear list below. Pack the car completely the night before. Morning departure is dramatically easier with a loaded car.',
      },
      {
        time: 'Morning of',
        title: 'Depart by 9 AM',
        description: 'Arriving by noon means setup time before kids get tired and hungry. Late arrivals make bad first trips.',
      },
    ],
    arrival: [
      {
        time: 'On arrival',
        title: 'Walk your site before unpacking',
        description: 'Take 5 minutes to walk the site. Identify: flat tent area, fire ring location, car parking, path to restrooms.',
      },
      {
        time: '+30 min',
        title: 'Set up tent first',
        description: 'Everything else can wait. Tent up = base established. Kids have a home base, stress drops immediately.',
      },
      {
        time: '+1 hour',
        title: 'Unpack only what you need today',
        description: "Leave tomorrow's gear in bags. A clean site is a calm site.",
      },
    ],
    evening: [
      {
        time: '5:00 PM',
        title: 'Simple camp dinner',
        description: 'Foil packet meals or hot dogs on sticks. Low effort, high satisfaction. Save complex cooking for when you have more confidence.',
      },
      {
        time: '6:30 PM',
        title: 'Campfire (if permitted)',
        description: 'Check campsite rules first. Keep it small. Kids roast marshmallows. This is the moment the whole trip pays off.',
      },
      {
        time: '8:00 PM',
        title: 'Wind down routine',
        description: 'Same routine as home: brush teeth, get into bags, one story. Familiar routines in unfamiliar places reduce kid anxiety.',
      },
    ],
    morning: [
      {
        time: '7:00 AM',
        title: 'Simple camp breakfast',
        description: 'Instant oatmeal, granola bars, or scrambled eggs on the stove. Keep it fast.',
      },
      {
        time: '8:00 AM',
        title: 'Morning walk',
        description: '20-minute explore around the campground or a short nearby trail. This is the memory kids keep.',
      },
      {
        time: '9:30 AM',
        title: 'Break camp',
        description: 'Pack in reverse order: sleeping gear first, tent last. Leave the site cleaner than you found it.',
      },
    ],
    gear: [
      { name: 'Family tent (4-person min)', essential: true, affiliateProductId: 'tent-family' },
      { name: 'Sleeping bags (temp-rated for season)', essential: true, affiliateProductId: 'sleeping-bag-family' },
      { name: 'Sleeping pads or air mattress', essential: true, affiliateProductId: 'sleeping-pad-air' },
      { name: '2-burner camp stove + fuel', essential: true, affiliateProductId: 'stove-2-burner' },
      { name: 'Headlamps — one per person', essential: true, affiliateProductId: 'headlamp-family' },
      { name: 'Cooler with ice', essential: true, affiliateProductId: 'cooler-basic' },
      { name: 'Camp chairs', essential: false, affiliateProductId: 'camp-chairs' },
      { name: 'Camp pillow (comfort upgrade)', essential: false },
    ],
    activities: [
      {
        title: 'Junior Ranger program',
        description: 'Most state parks offer free Junior Ranger booklets. Pick one up at the visitor center.',
        ageGroup: '7-12',
      },
      {
        title: 'Rock and stick collection',
        description: 'Give each kid a small bag. Collect 5 interesting things. Share discoveries at dinner.',
        ageGroup: '3-6',
      },
      {
        title: "S'mores by the fire",
        description: "Classic. Non-negotiable. Makes the whole trip.",
        ageGroup: 'all',
      },
    ],
    safetyNotes: [
      'Store all food in your car or a bear box overnight, even in areas without bear warnings.',
      'Keep a first aid kit accessible — top of a bag, not buried.',
      'Tell someone at home which campsite you are at and when you plan to return.',
      'Know the location of the nearest urgent care before you leave home.',
      'Keep the campfire at least 3 feet from the tent and fully extinguished before sleeping.',
    ],
  },

  'first-weekend-camp': {
    slug: 'first-weekend-camp',
    title: 'First Weekend Camp',
    tagline: 'Two nights. Better gear. More confidence. Same family.',
    heroImage: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=1400&auto=format&fit=crop&q=80',
    tripSummary: 'Your first multi-night camping experience — with a full weekend plan, upgraded comfort gear, and the room to actually enjoy it.',
    preTrip: [
      {
        time: '2 weeks before',
        title: 'Book two consecutive nights',
        description: 'Weekends fill fast at good campsites. Book early. Choose a site with a hiking trail or swimming area nearby.',
      },
      {
        time: '1 week before',
        title: 'Plan all 5 meals',
        description: 'Friday dinner, Saturday breakfast, Saturday lunch, Saturday dinner, Sunday breakfast. Prep what you can at home.',
      },
      {
        time: '3 days before',
        title: 'Gear audit — add comfort upgrades',
        description: 'This trip benefits from: better chairs, a shade canopy, camp lighting. Check what you have and what to add.',
      },
      {
        time: 'Day before',
        title: 'Load car fully, charge devices',
        description: 'Fully loaded car before sleep. Depart early Friday to beat traffic and arrive with setup time.',
      },
    ],
    arrival: [
      {
        time: 'Friday arrival',
        title: 'Set up your full camp',
        description: "You have two nights — set up properly. Canopy, camp kitchen, tent, chairs, lighting. Don't shortcut it.",
      },
      {
        time: '+1 hour',
        title: 'Establish camp zones',
        description: 'Kitchen zone separated from sleep zone. All gear bags in one designated area. A organized camp is a relaxed camp.',
      },
      {
        time: 'Friday evening',
        title: 'Easy arrival dinner',
        description: 'Pre-made sandwiches, wraps, or a simple store-bought meal. Save cooking energy for Saturday when everyone is rested.',
      },
    ],
    evening: [
      {
        time: 'Friday night',
        title: 'Short campfire, early night',
        description: 'Everyone is road-tired. Low-key fire, early bed. Saturday is the main event.',
      },
      {
        time: 'Saturday — main activity',
        title: 'Day hike or lake/river time',
        description: 'This is the core experience of the weekend. Plan the distance based on kid ages: 1 mile per age-year is a rough guide.',
      },
      {
        time: 'Saturday evening',
        title: 'Real camp dinner',
        description: 'Dutch oven chili, foil packet potatoes, full fire-cooked meal. This is your Saturday centerpiece.',
      },
      {
        time: 'Saturday night',
        title: 'Longer campfire',
        description: 'You earned it. Stories, s\'mores, stargazing. This is the night that makes everyone want to come back.',
      },
    ],
    morning: [
      {
        time: 'Saturday 7 AM',
        title: 'Proper camp breakfast',
        description: 'Scrambled eggs, bacon, camp coffee. Take your time. No rush.',
      },
      {
        time: 'Sunday 7 AM',
        title: 'Pack-out breakfast',
        description: 'Instant oatmeal or granola. Start packing camp while kids eat.',
      },
      {
        time: 'Sunday 10 AM',
        title: 'Full camp breakdown',
        description: 'All bags packed, tent down, site swept clean. Leave absolutely nothing behind.',
      },
    ],
    gear: [
      { name: 'Family tent (6-person or larger)', essential: true, affiliateProductId: 'tent-family' },
      { name: 'Sleeping bags + liners', essential: true, affiliateProductId: 'sleeping-bag-family' },
      { name: 'Self-inflating sleeping pads', essential: true, affiliateProductId: 'sleeping-pad-air' },
      { name: '2-burner stove + extra fuel', essential: true, affiliateProductId: 'stove-2-burner' },
      { name: 'Headlamps — one per person', essential: true, affiliateProductId: 'headlamp-family' },
      { name: 'Large cooler', essential: true, affiliateProductId: 'cooler-basic' },
      { name: 'Shade canopy', essential: false, affiliateProductId: 'canopy-camp' },
      { name: 'Camp chairs — one per person', essential: false, affiliateProductId: 'camp-chairs' },
      { name: 'Dutch oven', essential: false },
    ],
    activities: [
      {
        title: 'Full day hike (age-appropriate)',
        description: '2–5 miles depending on ages. Download AllTrails before leaving — filter by "kid friendly."',
        ageGroup: 'all',
      },
      {
        title: 'Fishing (if near water)',
        description: 'Day licenses available at most state park offices. Minimal gear needed — a rod, hook, bait.',
        ageGroup: '7-12',
      },
      {
        title: 'Nature journaling',
        description: 'Each kid gets a small notebook. Draw what you see. No rules, no pressure.',
        ageGroup: '7-12',
      },
      {
        title: 'Camp cooking participation',
        description: 'Kids help prep one meal — stirring, measuring, setting the table. Fire-safe tasks only.',
        ageGroup: 'all',
      },
    ],
    safetyNotes: [
      'Two nights = two nights of food storage. Bear box or car every night.',
      'Check the full weekend weather forecast. Have a rain plan before you leave.',
      'More sun exposure over two days. Sunscreen every morning and after swimming.',
      'Keep a complete first aid kit accessible the full trip.',
    ],
  },

  'easy-family-basecamp': {
    slug: 'easy-family-basecamp',
    title: 'Easy Family Basecamp',
    tagline: 'Maximum comfort. Minimal chaos. Camping for families who like being comfortable.',
    heroImage: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1400&auto=format&fit=crop&q=80',
    tripSummary: 'A deliberately comfortable family camp experience — designed to reduce friction, maximize enjoyment, and make camping something your family actually wants to repeat.',
    preTrip: [
      {
        time: '2 weeks before',
        title: 'Book a premium site',
        description: 'Look for: electrical hookup, shade, proximity to restrooms, flat ground. Premium sites fill fast. Reserve early.',
      },
      {
        time: '1 week before',
        title: 'Comfort gear audit',
        description: 'This trip uses comfort infrastructure: air mattress, canopy, real lighting, real pillows, good chairs. Verify you have it.',
      },
      {
        time: '3 days before',
        title: 'Meal plan like a real kitchen',
        description: "No roughing it on this trip. Real meals, planned in advance. Prep ingredients at home. Bring your cast iron.",
      },
      {
        time: 'Day before',
        title: 'Pack in labeled bins',
        description: 'Camp kitchen in one bin. Sleeping gear in one bag. Bins labeled. Morning setup will be fast and calm.',
      },
    ],
    arrival: [
      {
        time: 'On arrival',
        title: 'Set up comfort infrastructure first',
        description: 'Air mattress inflated, real pillows out, canopy up, lighting hung. Comfort base before anything else.',
      },
      {
        time: '+1 hour',
        title: 'Create your camp living room',
        description: 'Chairs in a circle or around the table, camp rug if you have one. Make it feel like somewhere you want to be.',
      },
      {
        time: '+2 hours',
        title: 'Unpack kitchen fully',
        description: 'Everything has a place. Camp kitchen operates like a real kitchen on this trip.',
      },
    ],
    evening: [
      {
        time: 'Evening',
        title: 'Real camp dinner',
        description: 'Cast iron meal, proper setup. This is not hot dogs on sticks night. Pasta, chili, tacos — whatever your family likes, made outside.',
      },
      {
        time: 'After dinner',
        title: 'Comfortable fire time',
        description: "Camp chairs, good lighting, quiet music on a speaker if you want it. No roughing it required.",
      },
      {
        time: 'Bedtime',
        title: 'Actually comfortable sleep',
        description: 'Air mattress inflated, real pillows, sleeping bags plus blankets. No one is sleeping on the ground.',
      },
    ],
    morning: [
      {
        time: 'Morning',
        title: 'Camp coffee ritual',
        description: "French press or pour-over if you have it. This is part of why you came.",
      },
      {
        time: '+30 min',
        title: 'Real breakfast',
        description: 'Eggs, toast if you have a pan, camp bacon. Take your time. No schedule.',
      },
      {
        time: 'Mid-morning',
        title: 'Relaxed activity',
        description: 'Short walk, reading in chairs, kids exploring a defined radius. Nothing strenuous required.',
      },
    ],
    gear: [
      { name: 'Cabin tent or large family tent', essential: true, affiliateProductId: 'tent-cabin' },
      { name: 'Queen air mattress + electric pump', essential: true, affiliateProductId: 'air-mattress-queen' },
      { name: 'Real pillows (bring from home)', essential: true },
      { name: 'Sleeping bags + extra blankets', essential: true, affiliateProductId: 'sleeping-bag-family' },
      { name: 'Shade canopy', essential: true, affiliateProductId: 'canopy-camp' },
      { name: 'Comfortable camp chairs — one per person', essential: true, affiliateProductId: 'camp-chairs' },
      { name: '2-burner stove + fuel', essential: true, affiliateProductId: 'stove-2-burner' },
      { name: 'Headlamps + camp lantern', essential: true, affiliateProductId: 'headlamp-family' },
      { name: 'Large cooler', essential: true, affiliateProductId: 'cooler-basic' },
      { name: 'Camp rug', essential: false },
      { name: 'Portable speaker', essential: false },
    ],
    activities: [
      {
        title: 'Slow morning walk',
        description: 'No destination, no timeline. Just walking and looking at things.',
        ageGroup: 'all',
      },
      {
        title: 'Card games in camp chairs',
        description: "Uno, Go Fish, Rummy — whatever you have. Low effort, high connection.",
        ageGroup: 'all',
      },
      {
        title: 'Camp art station',
        description: 'Small table with colored pencils and paper. Kids draw what they see. No prompts needed.',
        ageGroup: '3-6',
      },
      {
        title: 'Nature scavenger hunt',
        description: 'Simple list: find a feather, a smooth rock, something yellow, something alive. Works for all ages.',
        ageGroup: 'all',
      },
    ],
    safetyNotes: [
      'Comfort camping still requires a first aid kit. Non-negotiable.',
      'If using an electrical hookup: know your amp load. Do not overload the circuit with multiple high-draw devices.',
      'Keep food stored properly even on comfort trips. Animals are not impressed by your camp rug.',
      'Know the nearest urgent care before you leave. Set it in Maps.',
    ],
  },
}

export function getPlanTemplate(slug: string): PlanTemplate | null {
  return PLAN_TEMPLATES[slug] ?? null
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/plan-templates.ts lib/affiliate-products.ts && git commit -m "feat: plan templates and affiliate product content"
```

---

## Task 8: UI Primitives

**Files:** `components/ui/Button.tsx`, `components/ui/Card.tsx`

- [ ] **Step 1: Create components/ui/Button.tsx**

```tsx
import { type ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-stone-900 text-white hover:bg-stone-800 active:bg-stone-950 focus-visible:ring-stone-900',
  secondary:
    'border border-stone-300 text-stone-700 bg-white hover:bg-stone-50 active:bg-stone-100 focus-visible:ring-stone-400',
  ghost:
    'text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus-visible:ring-stone-400',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          'inline-flex items-center justify-center rounded-md font-medium',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
```

- [ ] **Step 2: Create components/ui/Card.tsx**

```tsx
interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  sm: 'p-5',
  md: 'p-8',
  lg: 'p-10',
}

export default function Card({ children, className = '', padding = 'md' }: CardProps) {
  return (
    <div
      className={[
        'bg-white border border-stone-200 rounded-xl shadow-sm',
        paddingClasses[padding],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/ && git commit -m "feat: Button and Card UI primitives"
```

---

## Task 9: Landing Page — Hero + Problem + Solution

**Files:** `components/landing/Hero.tsx`, `components/landing/ProblemSection.tsx`, `components/landing/SolutionSection.tsx`

- [ ] **Step 1: Create components/landing/Hero.tsx**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&auto=format&fit=crop&q=80"
          alt="Family camping in a forest clearing at golden hour"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-content mx-auto px-6 py-32">
        <div className="max-w-2xl">
          <p className="text-stone-300 text-sm font-medium tracking-widest uppercase mb-6">
            For first-time families
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white leading-tight mb-6">
            Your first camping trip,
            <br />
            planned in 10 minutes.
          </h1>
          <p className="text-stone-200 text-xl leading-relaxed mb-10 max-w-lg">
            Answer a few questions. Get a personalized plan — trip timeline, gear checklist, kid activities, and safety guidance. Built for families who have never done this before.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/quiz">Start Your Trailstead Plan</Link>
            </Button>
            <Button variant="secondary" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <a href="#example">See Example Plan</a>
            </Button>
          </div>

          <p className="text-stone-400 text-sm mt-6">
            Free · No account required · Takes about 2 minutes
          </p>
        </div>
      </div>
    </section>
  )
}
```

> **Note:** `Button` does not support `asChild` yet. In Step 1 of Task 9, add `asChild` support to `Button` first, or replace `Button` wrapping `Link` with a styled `Link` directly. The simplest approach for MVP: render `Link` with Button's className applied manually. See correction below.

Correction — replace the CTA block in Hero.tsx with:

```tsx
<div className="flex flex-wrap gap-4">
  <Link
    href="/quiz"
    className="inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 bg-stone-900 text-white hover:bg-stone-800 px-8 py-4 text-lg"
  >
    Start Your Trailstead Plan
  </Link>
  <a
    href="#example"
    className="inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 border border-white/30 text-white bg-white/10 hover:bg-white/20 px-8 py-4 text-lg"
  >
    See Example Plan
  </a>
</div>
```

- [ ] **Step 2: Create components/landing/ProblemSection.tsx**

```tsx
export default function ProblemSection() {
  const problems = [
    {
      title: 'The gear spiral',
      description:
        'You start researching tents and find 200 options. Then sleeping bags. Then stoves. Three hours later you have 47 browser tabs and no plan.',
    },
    {
      title: 'Setup confusion',
      description:
        "You arrive at the campsite at 4pm. The tent instructions make no sense. It's getting dark. Kids are hungry. Sound familiar?",
    },
    {
      title: 'Kid boredom',
      description:
        "Adults are setting up. Kids have nothing to do. Within 20 minutes someone is crying. The trip hasn't started yet.",
    },
    {
      title: 'No structure',
      description:
        "There's no plan for the evening. No plan for the morning. It drifts into chaos. You swear you'll never do this again.",
    },
  ]

  return (
    <section className="py-28 bg-white">
      <div className="max-w-wide mx-auto px-6">
        <div className="max-w-content mx-auto mb-16">
          <p className="text-brand-green text-sm font-medium tracking-widest uppercase mb-4">
            The real problem
          </p>
          <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-5">
            Family camping fails the same way every time.
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            It's not that camping is hard. It's that first-time families have no structured starting point. The internet gives you gear reviews and inspiration photography. Nobody gives you a step-by-step plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem) => (
            <div key={problem.title} className="flex gap-5">
              <div className="flex-shrink-0 w-1 bg-stone-200 rounded-full" />
              <div>
                <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
                  {problem.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">{problem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create components/landing/SolutionSection.tsx**

```tsx
import Image from 'next/image'

export default function SolutionSection() {
  return (
    <section className="py-28 bg-stone-50">
      <div className="max-w-wide mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=900&auto=format&fit=crop&q=80"
              alt="Parent and child reading a map together at a campsite"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-brand-green text-sm font-medium tracking-widest uppercase mb-4">
              The Trailstead approach
            </p>
            <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-6">
              A decision system, not a blog post.
            </h2>
            <div className="space-y-5 text-stone-600 text-lg leading-relaxed">
              <p>
                Trailstead Guide asks you a few questions about your family — experience level, kids' ages, what kind of trip you want — and builds a complete plan around your answers.
              </p>
              <p>
                You get a step-by-step trip timeline, a short gear checklist, a kid activity plan, and safety guidance. All of it calibrated to exactly where your family is right now.
              </p>
              <p>
                Not where you'll be someday. Not what experts recommend. Where you are now.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/landing/Hero.tsx components/landing/ProblemSection.tsx components/landing/SolutionSection.tsx && git commit -m "feat: landing page Hero, Problem, Solution sections"
```

---

## Task 10: Landing Page — How It Works + Example Output + Trust + CTA

**Files:** `components/landing/HowItWorks.tsx`, `components/landing/ExampleOutput.tsx`, `components/landing/TrustSection.tsx`, `components/landing/FinalCTA.tsx`

- [ ] **Step 1: Create components/landing/HowItWorks.tsx**

```tsx
import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Answer 5 quick questions',
      description:
        'Tell us about your experience level, your kids, what kind of trip you want, and what matters most to you. Takes about 2 minutes.',
    },
    {
      number: '02',
      title: 'Receive your personalized plan',
      description:
        "We match you to one of four plan templates built specifically for your family's situation. No generic advice.",
    },
    {
      number: '03',
      title: 'Follow it on your trip',
      description:
        'Your plan includes a full trip timeline, gear checklist, kid activities, and safety notes. Use it start to finish.',
    },
  ]

  return (
    <section className="py-28 bg-white">
      <div className="max-w-wide mx-auto px-6">

        <div className="max-w-content mx-auto mb-16 text-center">
          <p className="text-brand-green text-sm font-medium tracking-widest uppercase mb-4">
            How it works
          </p>
          <h2 className="font-serif text-4xl font-semibold text-stone-900">
            Three steps to your first camping trip.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-serif text-6xl font-semibold text-stone-200 block mb-5">
                {step.number}
              </span>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">
                {step.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 bg-stone-900 text-white hover:bg-stone-800 px-8 py-4 text-lg"
          >
            Start Your Trailstead Plan
          </Link>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create components/landing/ExampleOutput.tsx**

```tsx
import Image from 'next/image'

export default function ExampleOutput() {
  return (
    <section id="example" className="py-28 bg-stone-100">
      <div className="max-w-wide mx-auto px-6">

        <div className="max-w-content mx-auto mb-14">
          <p className="text-brand-green text-sm font-medium tracking-widest uppercase mb-4">
            Example plan
          </p>
          <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-4">
            This is what you get.
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            A sample from the First Night Camp plan — built for a family with young kids on their first real campsite trip.
          </p>
        </div>

        {/* Plan preview card */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">

          {/* Plan hero image */}
          <div className="relative h-64 md:h-80">
            <Image
              src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&auto=format&fit=crop&q=80"
              alt="Family at a campsite in the evening light"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-stone-300 text-sm mb-1">First Night Camp</p>
              <h3 className="font-serif text-3xl font-semibold text-white">
                Your First Night Camp Plan
              </h3>
            </div>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Timeline */}
            <div>
              <h4 className="font-serif text-lg font-medium text-stone-900 mb-5 pb-3 border-b border-stone-100">
                Trip Timeline
              </h4>
              <div className="space-y-4">
                {[
                  { time: 'Night before', event: 'Pack the car completely' },
                  { time: '9:00 AM', event: 'Depart — arrive by noon' },
                  { time: 'Arrival', event: 'Walk site, set up tent first' },
                  { time: '5:00 PM', event: 'Simple camp dinner' },
                  { time: '6:30 PM', event: 'Campfire + s\'mores' },
                  { time: '8:00 PM', event: 'Wind down + sleep' },
                  { time: '7:00 AM', event: 'Breakfast + morning walk' },
                  { time: '9:30 AM', event: 'Break camp, head home' },
                ].map((item) => (
                  <div key={item.time} className="flex gap-4">
                    <span className="text-stone-400 text-sm w-24 flex-shrink-0 pt-0.5">
                      {item.time}
                    </span>
                    <span className="text-stone-700">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gear + Activities */}
            <div className="space-y-8">
              <div>
                <h4 className="font-serif text-lg font-medium text-stone-900 mb-5 pb-3 border-b border-stone-100">
                  Gear Essentials
                </h4>
                <ul className="space-y-2">
                  {['4-person family tent', 'Sleeping bags (temp-rated)', 'Sleeping pads', '2-burner stove + fuel', 'Headlamps × 4', 'Cooler + ice'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-lg font-medium text-stone-900 mb-5 pb-3 border-b border-stone-100">
                  Kid Activity Plan
                </h4>
                <ul className="space-y-2">
                  {['Rock and stick collection', 'Junior Ranger booklet', "S'mores by the fire", 'Morning walk + explore'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create components/landing/TrustSection.tsx**

```tsx
import Image from 'next/image'

export default function TrustSection() {
  const points = [
    {
      title: 'Built for first-timers',
      description:
        "Every plan assumes you haven't done this before. No assumed knowledge. No jargon. No \"just grab your trekking poles.\"",
    },
    {
      title: 'Reduces real mistakes',
      description:
        'Overpacking, arriving too late, no plan for kids, food storage errors — the common first-trip failures are baked out of every template.',
    },
    {
      title: 'Not a gear blog',
      description:
        "We don't review 14 tent brands. We tell you which one to get for your situation, and link directly to it.",
    },
    {
      title: 'Structured, not inspirational',
      description:
        "Other sites show you beautiful camping photography. We give you a step-by-step plan. Those are different things.",
    },
  ]

  return (
    <section className="py-28 bg-white">
      <div className="max-w-wide mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-brand-green text-sm font-medium tracking-widest uppercase mb-4">
              Why Trailstead
            </p>
            <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-10">
              Designed for families who want a plan, not a hobby.
            </h2>
            <div className="space-y-8">
              {points.map((point) => (
                <div key={point.title}>
                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1559521783-1d1599583485?w=800&auto=format&fit=crop&q=80"
              alt="Children playing near a tent while parents set up camp"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create components/landing/FinalCTA.tsx**

```tsx
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-32 bg-stone-900">
      <div className="max-w-content mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-6">
          Your first camping trip starts here.
        </h2>
        <p className="text-stone-400 text-xl leading-relaxed mb-10 max-w-lg mx-auto">
          Answer 5 questions. Get a complete, personalized trip plan — timeline, gear list, kid activities, and safety guidance. About 2 minutes.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 bg-white text-stone-900 hover:bg-stone-100 px-8 py-4 text-lg"
        >
          Start Your Trailstead Plan
        </Link>
        <p className="text-stone-600 text-sm mt-6">
          Free · No account required
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add components/landing/ && git commit -m "feat: landing page HowItWorks, ExampleOutput, TrustSection, FinalCTA"
```

---

## Task 11: Landing Page Assembly

**Files:** `app/page.tsx`

- [ ] **Step 1: Create app/page.tsx**

```tsx
import Hero from '@/components/landing/Hero'
import ProblemSection from '@/components/landing/ProblemSection'
import SolutionSection from '@/components/landing/SolutionSection'
import HowItWorks from '@/components/landing/HowItWorks'
import ExampleOutput from '@/components/landing/ExampleOutput'
import TrustSection from '@/components/landing/TrustSection'
import FinalCTA from '@/components/landing/FinalCTA'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <ExampleOutput />
      <TrustSection />
      <FinalCTA />
    </main>
  )
}
```

- [ ] **Step 2: Run dev server and visually verify landing page**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Hero renders with background image and two CTAs
- All 7 sections render in order
- Typography and spacing match Anthropic-style open layout
- Images load (Unsplash URLs with `unoptimized`)

- [ ] **Step 3: Fix any build errors**

```bash
npm run build 2>&1 | grep -E "Error|error" | head -20
```

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx && git commit -m "feat: landing page assembly"
```

---

## Task 12: Quiz Components

**Files:** `components/quiz/QuizProgress.tsx`, `components/quiz/QuizQuestion.tsx`, `components/quiz/MidQuizEmailCapture.tsx`, `components/quiz/QuizShell.tsx`

- [ ] **Step 1: Create components/quiz/QuizProgress.tsx**

```tsx
interface QuizProgressProps {
  current: number
  total: number
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-stone-500 mb-2">
        <span>Question {current} of {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-1 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-stone-900 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create components/quiz/QuizQuestion.tsx**

```tsx
import type { QuizQuestion as QuizQuestionType } from '@/types'
import Button from '@/components/ui/Button'

interface QuizQuestionProps {
  question: QuizQuestionType
  onAnswer: (value: string) => void
}

export default function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-3xl font-semibold text-stone-900 mb-3">
        {question.prompt}
      </h2>
      {question.subprompt && (
        <p className="text-stone-500 text-lg mb-8">{question.subprompt}</p>
      )}
      {!question.subprompt && <div className="mb-8" />}

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left px-6 py-4 rounded-xl border border-stone-200 bg-white
                       text-stone-800 font-medium
                       hover:border-stone-900 hover:bg-stone-50
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900
                       transition-all duration-150"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create components/quiz/MidQuizEmailCapture.tsx**

```tsx
'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface MidQuizEmailCaptureProps {
  onDismiss: () => void
  convertKitFormId: string
}

export default function MidQuizEmailCapture({
  onDismiss,
  convertKitFormId,
}: MidQuizEmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch(
        `https://app.convertkit.com/forms/${convertKitFormId}/subscriptions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email_address: email }),
        }
      )
      setSubmitted(true)
      setTimeout(onDismiss, 1500)
    } catch {
      onDismiss()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 animate-fade-in">
      {submitted ? (
        <p className="text-stone-700 font-medium text-center">Got it — we'll save your plan.</p>
      ) : (
        <>
          <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-2">
            Want to save your plan?
          </h3>
          <p className="text-stone-600 mb-6">
            Enter your email and we'll send it to you when it's ready. You can skip this.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-md border border-stone-300 bg-white text-stone-900
                         placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900"
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save my plan'}
            </Button>
          </form>
          <button
            onClick={onDismiss}
            className="mt-4 text-stone-500 text-sm hover:text-stone-700 transition-colors"
          >
            Skip for now →
          </button>
        </>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Create components/quiz/QuizShell.tsx**

```tsx
'use client'

import { useReducer } from 'react'
import { useRouter } from 'next/navigation'
import type { QuizState, QuizAction, QuizAnswers } from '@/types'
import { QUIZ_QUESTIONS, EMAIL_CAPTURE_AFTER_INDEX } from '@/lib/quiz-questions'
import { computePlanSlug } from '@/lib/quiz-router'
import { writeSession } from '@/lib/session'
import QuizProgress from './QuizProgress'
import QuizQuestion from './QuizQuestion'
import MidQuizEmailCapture from './MidQuizEmailCapture'

const CONVERTKIT_FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID ?? ''

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER': {
      const updatedAnswers = { ...state.answers, [action.questionId]: action.value }
      const isLastQuestion = state.currentIndex === QUIZ_QUESTIONS.length - 1
      const shouldShowEmailCapture =
        state.currentIndex === EMAIL_CAPTURE_AFTER_INDEX && !state.showEmailCapture

      if (isLastQuestion) {
        return { ...state, answers: updatedAnswers, status: 'complete' }
      }

      if (shouldShowEmailCapture) {
        return {
          ...state,
          answers: updatedAnswers,
          showEmailCapture: true,
        }
      }

      return {
        ...state,
        answers: updatedAnswers,
        currentIndex: state.currentIndex + 1,
      }
    }

    case 'DISMISS_EMAIL_CAPTURE':
      return {
        ...state,
        showEmailCapture: false,
        currentIndex: state.currentIndex + 1,
      }

    case 'COMPLETE':
      return { ...state, status: 'complete' }

    default:
      return state
  }
}

const initialState: QuizState = {
  currentIndex: 0,
  answers: {},
  showEmailCapture: false,
  status: 'active',
}

export default function QuizShell() {
  const [state, dispatch] = useReducer(quizReducer, initialState)
  const router = useRouter()

  // Handle completion
  if (state.status === 'complete') {
    const answers = state.answers as QuizAnswers
    const planSlug = computePlanSlug(answers)
    writeSession({ ...answers, planSlug, timestamp: Date.now() })
    router.push(`/plan/${planSlug}`)
    return null
  }

  const currentQuestion = QUIZ_QUESTIONS[state.currentIndex]

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-xl">

        {/* Logo/back link */}
        <div className="mb-12">
          <a href="/" className="text-stone-500 text-sm hover:text-stone-700 transition-colors">
            ← Trailstead Guide
          </a>
        </div>

        <QuizProgress
          current={state.currentIndex + 1}
          total={QUIZ_QUESTIONS.length}
        />

        {state.showEmailCapture ? (
          <MidQuizEmailCapture
            onDismiss={() => dispatch({ type: 'DISMISS_EMAIL_CAPTURE' })}
            convertKitFormId={CONVERTKIT_FORM_ID}
          />
        ) : (
          <QuizQuestion
            question={currentQuestion}
            onAnswer={(value) =>
              dispatch({ type: 'ANSWER', questionId: currentQuestion.id, value })
            }
          />
        )}

      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add components/quiz/ && git commit -m "feat: quiz components (QuizShell, QuizQuestion, QuizProgress, MidQuizEmailCapture)"
```

---

## Task 13: Quiz Page

**Files:** `app/quiz/page.tsx`

- [ ] **Step 1: Create app/quiz/page.tsx**

```tsx
import type { Metadata } from 'next'
import QuizShell from '@/components/quiz/QuizShell'

export const metadata: Metadata = {
  title: 'Build Your Plan — Trailstead Guide',
  description: 'Answer 5 quick questions and get a personalized camping plan for your family.',
}

export default function QuizPage() {
  return <QuizShell />
}
```

- [ ] **Step 2: Add fade-in animation to tailwind.config.ts**

In `tailwind.config.ts`, add inside `theme.extend`:

```ts
animation: {
  'fade-in': 'fadeIn 0.3s ease-out',
},
keyframes: {
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(8px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
},
```

- [ ] **Step 3: Verify quiz flow in browser**

```bash
npm run dev
```

Navigate to `http://localhost:3000/quiz`. Verify:
- All 5 questions render and advance on click
- Progress bar updates
- Mid-quiz email capture appears after Q3 with working skip button
- On final answer, routes to `/plan/[slug]` (will 404 until plan pages are built)

- [ ] **Step 4: Commit**

```bash
git add app/quiz/page.tsx tailwind.config.ts && git commit -m "feat: quiz page + fade-in animation"
```

---

## Task 14: Plan Section Components

**Files:** `components/plan/PersonalizationBanner.tsx`, `components/plan/PlanHero.tsx`, `components/plan/Timeline.tsx`, `components/plan/GearList.tsx`, `components/plan/KidActivityPlan.tsx`, `components/plan/SafetyNotes.tsx`, `components/plan/AffiliateBlock.tsx`, `components/plan/PostPlanEmailCapture.tsx`

- [ ] **Step 1: Create components/plan/PersonalizationBanner.tsx**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { readSession } from '@/lib/session'
import type { SessionSnapshot } from '@/types'

const kidsLabels: Record<string, string> = {
  'none': 'adults only',
  '3-6': 'kids aged 3–6',
  '7-12': 'kids aged 7–12',
  'teens': 'teens',
}

export default function PersonalizationBanner() {
  const [session, setSession] = useState<SessionSnapshot | null>(null)

  useEffect(() => {
    setSession(readSession())
  }, [])

  if (!session) return null

  const kidsLabel = kidsLabels[session.kidsAgeGroup] ?? 'your family'
  const experienceLabel =
    session.experience === 'none'
      ? 'no camping experience'
      : session.experience === 'some'
      ? 'some camping experience'
      : 'confident camping experience'

  return (
    <div className="bg-stone-100 border-b border-stone-200 py-3 px-6">
      <div className="max-w-wide mx-auto text-sm text-stone-600">
        Plan built for <strong className="text-stone-800">{kidsLabel}</strong> ·{' '}
        <strong className="text-stone-800">{experienceLabel}</strong>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create components/plan/PlanHero.tsx**

```tsx
import Image from 'next/image'
import type { PlanTemplate } from '@/types'

interface PlanHeroProps {
  template: PlanTemplate
}

export default function PlanHero({ template }: PlanHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-80 flex items-end">
      <div className="absolute inset-0 z-0">
        <Image
          src={template.heroImage}
          alt={`${template.title} — family camping`}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-wide mx-auto px-6 pb-12">
        <p className="text-stone-300 text-sm font-medium tracking-widest uppercase mb-3">
          Your Trailstead Plan
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-3">
          {template.title}
        </h1>
        <p className="text-stone-200 text-xl max-w-2xl">{template.tagline}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create components/plan/Timeline.tsx**

```tsx
import type { TimelineItem } from '@/types'

interface TimelineProps {
  title: string
  items: TimelineItem[]
}

export default function Timeline({ title, items }: TimelineProps) {
  if (items.length === 0) return null

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-6">{title}</h2>
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-green flex-shrink-0 mt-1.5" />
              {i < items.length - 1 && (
                <div className="w-px flex-1 bg-stone-200 mt-2 mb-0" />
              )}
            </div>
            <div className="pb-6">
              <span className="text-stone-500 text-sm font-medium block mb-1">{item.time}</span>
              <h3 className="font-medium text-stone-900 mb-1">{item.title}</h3>
              <p className="text-stone-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create components/plan/GearList.tsx**

```tsx
import type { GearItem } from '@/types'

interface GearListProps {
  items: GearItem[]
}

export default function GearList({ items }: GearListProps) {
  const essential = items.filter((i) => i.essential)
  const optional = items.filter((i) => !i.essential)

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-6">Gear Checklist</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-xs font-medium text-stone-500 tracking-widest uppercase mb-4">
            Essentials
          </h3>
          <ul className="space-y-3">
            {essential.map((item) => (
              <li key={item.name} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border-2 border-stone-300 flex-shrink-0" />
                <span className="text-stone-800">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {optional.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-stone-500 tracking-widest uppercase mb-4">
              Nice to have
            </h3>
            <ul className="space-y-3">
              {optional.map((item) => (
                <li key={item.name} className="flex items-center gap-3 opacity-70">
                  <div className="w-5 h-5 rounded border border-stone-300 flex-shrink-0" />
                  <span className="text-stone-600">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create components/plan/KidActivityPlan.tsx**

```tsx
import type { ActivityItem } from '@/types'

interface KidActivityPlanProps {
  activities: ActivityItem[]
}

export default function KidActivityPlan({ activities }: KidActivityPlanProps) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-6">Kid Activity Plan</h2>
      <div className="space-y-5">
        {activities.map((activity, i) => (
          <div key={i} className="flex gap-5">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 text-sm font-medium">
              {i + 1}
            </span>
            <div>
              <h3 className="font-medium text-stone-900 mb-1">{activity.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{activity.description}</p>
              {activity.ageGroup !== 'all' && (
                <span className="inline-block mt-1.5 text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                  Ages {activity.ageGroup}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create components/plan/SafetyNotes.tsx**

```tsx
interface SafetyNotesProps {
  notes: string[]
}

export default function SafetyNotes({ notes }: SafetyNotesProps) {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-8">
      <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-5">Safety Notes</h2>
      <ul className="space-y-3">
        {notes.map((note, i) => (
          <li key={i} className="flex gap-3 text-stone-700 leading-relaxed">
            <span className="text-stone-400 flex-shrink-0">—</span>
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 7: Create components/plan/AffiliateBlock.tsx**

```tsx
import Image from 'next/image'
import type { AffiliateProduct } from '@/types'

interface AffiliateBlockProps {
  products: AffiliateProduct[]
}

export default function AffiliateBlock({ products }: AffiliateBlockProps) {
  if (products.length === 0) return null

  const essentials = products.filter((p) => p.category === 'essential')
  const comfort = products.filter((p) => p.category === 'comfort')
  const convenience = products.filter((p) => p.category === 'convenience')

  const categories = [
    { label: 'Essentials', items: essentials },
    { label: 'Comfort upgrades', items: comfort },
    { label: 'Convenience', items: convenience },
  ].filter((c) => c.items.length > 0)

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-2">Recommended Gear</h2>
      <p className="text-stone-500 text-sm mb-8">
        Curated for this plan. Affiliate links help keep Trailstead free.
      </p>

      <div className="space-y-10">
        {categories.map((category) => (
          <div key={category.label}>
            <h3 className="text-xs font-medium text-stone-500 tracking-widest uppercase mb-5">
              {category.label}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.items.map((product) => (
                <a
                  key={product.id}
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 p-4 bg-white border border-stone-200 rounded-xl hover:border-stone-400 transition-colors group"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-stone-900 text-sm group-hover:text-brand-green transition-colors leading-tight mb-1">
                      {product.name}
                    </h4>
                    <p className="text-stone-500 text-xs leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    <span className="text-stone-400 text-xs mt-1 block">{product.priceRange}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Create components/plan/PostPlanEmailCapture.tsx**

```tsx
'use client'

import { useState } from 'react'

interface PostPlanEmailCaptureProps {
  convertKitFormId: string
}

export default function PostPlanEmailCapture({ convertKitFormId }: PostPlanEmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(
        `https://app.convertkit.com/forms/${convertKitFormId}/subscriptions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email_address: email }),
        }
      )
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-stone-900">
      <div className="max-w-content mx-auto px-6 text-center">
        {submitted ? (
          <div>
            <h2 className="font-serif text-3xl font-semibold text-white mb-3">
              Plan sent.
            </h2>
            <p className="text-stone-400">Check your inbox — your Trailstead Plan is on its way.</p>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-3xl font-semibold text-white mb-3">
              Email this plan to yourself.
            </h2>
            <p className="text-stone-400 mb-8">
              Save it for trip day. We'll send your full plan — timeline, gear list, activities, and safety notes.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 rounded-md bg-stone-800 border border-stone-700 text-white
                           placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-md bg-white text-stone-900 font-medium
                           hover:bg-stone-100 transition-colors disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send my plan'}
              </button>
            </form>
            {error && (
              <p className="text-red-400 text-sm mt-3">
                Something went wrong. Try again or copy the URL to save your plan.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 9: Commit**

```bash
git add components/plan/ && git commit -m "feat: plan section components"
```

---

## Task 15: Plan Pages (4 Templates)

**Files:** `app/plan/backyard-test/page.tsx`, `app/plan/first-night-camp/page.tsx`, `app/plan/first-weekend-camp/page.tsx`, `app/plan/easy-family-basecamp/page.tsx`

Each plan page follows the same structure. Write all four.

- [ ] **Step 1: Create app/plan/backyard-test/page.tsx**

```tsx
import type { Metadata } from 'next'
import { getPlanTemplate } from '@/lib/plan-templates'
import { getProductsForTemplate } from '@/lib/affiliate-products'
import PersonalizationBanner from '@/components/plan/PersonalizationBanner'
import PlanHero from '@/components/plan/PlanHero'
import Timeline from '@/components/plan/Timeline'
import GearList from '@/components/plan/GearList'
import KidActivityPlan from '@/components/plan/KidActivityPlan'
import SafetyNotes from '@/components/plan/SafetyNotes'
import AffiliateBlock from '@/components/plan/AffiliateBlock'
import PostPlanEmailCapture from '@/components/plan/PostPlanEmailCapture'

const CONVERTKIT_FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID ?? ''

export const metadata: Metadata = {
  title: 'Backyard Test Night Plan — Trailstead Guide',
  description: 'Your personalized backyard camping test plan. Set up, sleep outside, build confidence before your first real campsite trip.',
}

export default function BackyardTestPage() {
  const template = getPlanTemplate('backyard-test')!
  const products = getProductsForTemplate('backyard-test')

  return (
    <main>
      <PersonalizationBanner />
      <PlanHero template={template} />

      <div className="max-w-wide mx-auto px-6 py-16">
        {/* Trip summary */}
        <div className="max-w-content mb-16">
          <p className="text-stone-600 text-xl leading-relaxed">{template.tripSummary}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-16">
            <Timeline title="Before Your Test Night" items={template.preTrip} />
            <Timeline title="Setup & Arrival" items={template.arrival} />
            <Timeline title="Evening" items={template.evening} />
            <KidActivityPlan activities={template.activities} />
            <SafetyNotes notes={template.safetyNotes} />
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <GearList items={template.gear} />
            <AffiliateBlock products={products} />
          </div>
        </div>
      </div>

      <PostPlanEmailCapture convertKitFormId={CONVERTKIT_FORM_ID} />
    </main>
  )
}
```

- [ ] **Step 2: Create app/plan/first-night-camp/page.tsx**

```tsx
import type { Metadata } from 'next'
import { getPlanTemplate } from '@/lib/plan-templates'
import { getProductsForTemplate } from '@/lib/affiliate-products'
import PersonalizationBanner from '@/components/plan/PersonalizationBanner'
import PlanHero from '@/components/plan/PlanHero'
import Timeline from '@/components/plan/Timeline'
import GearList from '@/components/plan/GearList'
import KidActivityPlan from '@/components/plan/KidActivityPlan'
import SafetyNotes from '@/components/plan/SafetyNotes'
import AffiliateBlock from '@/components/plan/AffiliateBlock'
import PostPlanEmailCapture from '@/components/plan/PostPlanEmailCapture'

const CONVERTKIT_FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID ?? ''

export const metadata: Metadata = {
  title: 'First Night Camp Plan — Trailstead Guide',
  description: 'Your personalized first campsite trip plan. Timeline, gear list, kid activities, and safety guidance for your family\'s first night outside.',
}

export default function FirstNightCampPage() {
  const template = getPlanTemplate('first-night-camp')!
  const products = getProductsForTemplate('first-night-camp')

  return (
    <main>
      <PersonalizationBanner />
      <PlanHero template={template} />

      <div className="max-w-wide mx-auto px-6 py-16">
        <div className="max-w-content mb-16">
          <p className="text-stone-600 text-xl leading-relaxed">{template.tripSummary}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <Timeline title="Before Your Trip" items={template.preTrip} />
            <Timeline title="Arrival & Setup" items={template.arrival} />
            <Timeline title="Evening" items={template.evening} />
            <Timeline title="Morning & Pack Out" items={template.morning} />
            <KidActivityPlan activities={template.activities} />
            <SafetyNotes notes={template.safetyNotes} />
          </div>

          <div className="space-y-10">
            <GearList items={template.gear} />
            <AffiliateBlock products={products} />
          </div>
        </div>
      </div>

      <PostPlanEmailCapture convertKitFormId={CONVERTKIT_FORM_ID} />
    </main>
  )
}
```

- [ ] **Step 3: Create app/plan/first-weekend-camp/page.tsx**

```tsx
import type { Metadata } from 'next'
import { getPlanTemplate } from '@/lib/plan-templates'
import { getProductsForTemplate } from '@/lib/affiliate-products'
import PersonalizationBanner from '@/components/plan/PersonalizationBanner'
import PlanHero from '@/components/plan/PlanHero'
import Timeline from '@/components/plan/Timeline'
import GearList from '@/components/plan/GearList'
import KidActivityPlan from '@/components/plan/KidActivityPlan'
import SafetyNotes from '@/components/plan/SafetyNotes'
import AffiliateBlock from '@/components/plan/AffiliateBlock'
import PostPlanEmailCapture from '@/components/plan/PostPlanEmailCapture'

const CONVERTKIT_FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID ?? ''

export const metadata: Metadata = {
  title: 'First Weekend Camp Plan — Trailstead Guide',
  description: 'Your personalized two-night camping plan. Full weekend timeline, upgraded gear list, and activities for a confident family camping experience.',
}

export default function FirstWeekendCampPage() {
  const template = getPlanTemplate('first-weekend-camp')!
  const products = getProductsForTemplate('first-weekend-camp')

  return (
    <main>
      <PersonalizationBanner />
      <PlanHero template={template} />

      <div className="max-w-wide mx-auto px-6 py-16">
        <div className="max-w-content mb-16">
          <p className="text-stone-600 text-xl leading-relaxed">{template.tripSummary}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <Timeline title="Before Your Weekend" items={template.preTrip} />
            <Timeline title="Arrival (Friday)" items={template.arrival} />
            <Timeline title="Days & Evenings" items={template.evening} />
            <Timeline title="Mornings & Pack Out" items={template.morning} />
            <KidActivityPlan activities={template.activities} />
            <SafetyNotes notes={template.safetyNotes} />
          </div>

          <div className="space-y-10">
            <GearList items={template.gear} />
            <AffiliateBlock products={products} />
          </div>
        </div>
      </div>

      <PostPlanEmailCapture convertKitFormId={CONVERTKIT_FORM_ID} />
    </main>
  )
}
```

- [ ] **Step 4: Create app/plan/easy-family-basecamp/page.tsx**

```tsx
import type { Metadata } from 'next'
import { getPlanTemplate } from '@/lib/plan-templates'
import { getProductsForTemplate } from '@/lib/affiliate-products'
import PersonalizationBanner from '@/components/plan/PersonalizationBanner'
import PlanHero from '@/components/plan/PlanHero'
import Timeline from '@/components/plan/Timeline'
import GearList from '@/components/plan/GearList'
import KidActivityPlan from '@/components/plan/KidActivityPlan'
import SafetyNotes from '@/components/plan/SafetyNotes'
import AffiliateBlock from '@/components/plan/AffiliateBlock'
import PostPlanEmailCapture from '@/components/plan/PostPlanEmailCapture'

const CONVERTKIT_FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID ?? ''

export const metadata: Metadata = {
  title: 'Easy Family Basecamp Plan — Trailstead Guide',
  description: 'Your comfort-first camping plan. Maximum comfort, minimal chaos — designed for families who want camping to feel good, not hard.',
}

export default function EasyFamilyBasecampPage() {
  const template = getPlanTemplate('easy-family-basecamp')!
  const products = getProductsForTemplate('easy-family-basecamp')

  return (
    <main>
      <PersonalizationBanner />
      <PlanHero template={template} />

      <div className="max-w-wide mx-auto px-6 py-16">
        <div className="max-w-content mb-16">
          <p className="text-stone-600 text-xl leading-relaxed">{template.tripSummary}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <Timeline title="Before Your Trip" items={template.preTrip} />
            <Timeline title="Arrival & Setup" items={template.arrival} />
            <Timeline title="Evening" items={template.evening} />
            <Timeline title="Morning" items={template.morning} />
            <KidActivityPlan activities={template.activities} />
            <SafetyNotes notes={template.safetyNotes} />
          </div>

          <div className="space-y-10">
            <GearList items={template.gear} />
            <AffiliateBlock products={products} />
          </div>
        </div>
      </div>

      <PostPlanEmailCapture convertKitFormId={CONVERTKIT_FORM_ID} />
    </main>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add app/plan/ && git commit -m "feat: four plan template pages"
```

---

## Task 16: Thank-You Page + Environment Variable

**Files:** `app/thank-you/page.tsx`, `.env.local`

- [ ] **Step 1: Create app/thank-you/page.tsx**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Plan Saved — Trailstead Guide',
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <h1 className="font-serif text-4xl font-semibold text-stone-900 mb-4">
          Your plan is on its way.
        </h1>
        <p className="text-stone-600 text-lg leading-relaxed mb-10">
          Check your inbox — your Trailstead Plan includes your full trip timeline, gear checklist, kid activity plan, and safety notes.
        </p>
        <Link
          href="/"
          className="text-stone-500 text-sm hover:text-stone-700 transition-colors"
        >
          ← Back to Trailstead Guide
        </Link>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Create .env.local**

```bash
cat > .env.local << 'EOF'
# Replace with your ConvertKit form ID
# Found in ConvertKit: Forms → your form → Embed → Form ID
NEXT_PUBLIC_CONVERTKIT_FORM_ID=YOUR_FORM_ID_HERE
EOF
```

- [ ] **Step 3: Add .env.local to .gitignore**

Verify `.gitignore` already contains `.env.local` (Next.js default scaffold includes it).

```bash
grep ".env.local" .gitignore
```

Expected: `.env.local` appears.

- [ ] **Step 4: Final build verification**

```bash
npm run build 2>&1 | tail -20
```

Expected: successful build, all routes listed.

- [ ] **Step 5: Run all tests**

```bash
npm test
```

Expected: all 12 tests pass (5 session + 7 quiz-router).

- [ ] **Step 6: Full flow verification in browser**

```bash
npm run dev
```

Verify the complete funnel:
1. `http://localhost:3000` — landing page loads with hero image, all 7 sections visible
2. Click "Start Your Trailstead Plan" → `/quiz` loads
3. Answer all 5 questions → mid-quiz email capture appears after Q3, skip works
4. After Q5 → routes to correct `/plan/[slug]`
5. Plan page shows: hero image, personalization banner, timeline, gear list, activities, safety notes, affiliate products, email capture
6. Test all 4 plan routes manually: `/plan/backyard-test`, `/plan/first-night-camp`, `/plan/first-weekend-camp`, `/plan/easy-family-basecamp`

- [ ] **Step 7: Commit**

```bash
git add app/thank-you/ .env.local .gitignore && git commit -m "feat: thank-you page, env var config — MVP complete"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Landing page (all 8 sections — Hero, Problem, Solution, HowItWorks, ExampleOutput, Trust, FinalCTA — note: Gear/monetization is embedded in ExampleOutput and plan pages per spec)
- ✅ Quiz flow (5 questions, useReducer, mid-quiz email capture after Q3)
- ✅ 4 plan templates with full content
- ✅ Routing matrix (computePlanSlug with all 4 cases + fallback)
- ✅ SessionSnapshot written to localStorage on quiz completion
- ✅ Personalization banner reads session on plan pages
- ✅ Affiliate placeholder architecture (all products have `affiliateUrl: '#'`)
- ✅ Email capture — both touchpoints (mid-quiz skippable + post-plan utility)
- ✅ ConvertKit form POST (no API routes needed)
- ✅ Imagery — Next.js Image used in Hero, SolutionSection, TrustSection, ExampleOutput, PlanHero, AffiliateBlock
- ✅ Anthropic-style spacing — `py-28`/`py-32` sections, `max-w-content`/`max-w-wide` containers
- ✅ Earth tone palette + Inter/Lora typography

**Type consistency check:**
- `computePlanSlug(answers: QuizAnswers): PlanSlug` — used consistently
- `getPlanTemplate(slug: string): PlanTemplate | null` — used with `!` assertion on plan pages (template always exists since slug comes from hardcoded route)
- `getProductsForTemplate(slug: PlanSlug): AffiliateProduct[]` — consistent
- `writeSession` / `readSession` — consistent across QuizShell and PersonalizationBanner
- `NEXT_PUBLIC_CONVERTKIT_FORM_ID` — used in QuizShell, plan pages, PostPlanEmailCapture

**Known limitation:** `getPlanTemplate('backyard-test')!` non-null assertion is safe because the slug matches a hardcoded route — these pages only exist for slugs that have templates.
