# Trailstead Guide — MVP Design Spec
Date: 2026-04-23

## Overview

Trailstead Guide is a decision engine that converts first-time family camping uncertainty into a structured, personalized trip plan in under 10 minutes. Revenue model: affiliate gear recommendations + optional paid kit + future subscription.

**MVP scope:** Landing page → quiz funnel → 4 static plan templates with simulated personalization. No backend. No auth. No database.

---

## Architecture

### Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Inter (UI body), Lora or Playfair Display (headings)
- **State:** React `useReducer` (quiz), `localStorage` (session persistence)
- **Email:** ConvertKit embedded form (no custom API routes at MVP)
- **Deployment:** Vercel

### Design Reference
- **Layout/spacing:** Anthropic.com — open, generous section padding (`py-24`–`py-32`), large whitespace, minimal borders, typography-led hierarchy
- **Imagery/tone:** REI — authentic families, soft natural light, practical moments
- **Color palette:** `stone-50`/`stone-100` backgrounds, `green-800`/`green-900` accents, `stone-700`/`amber-900` earth tones. No neon, no adrenaline colors.
- **Motion:** fade and slide-up transitions only. No bounce.

---

## Project Structure

```
/app
  page.tsx                        → landing page
  /quiz
    page.tsx                      → quiz flow
  /plan
    /backyard-test/page.tsx
    /first-night-camp/page.tsx
    /first-weekend-camp/page.tsx
    /easy-family-basecamp/page.tsx
  /thank-you/page.tsx             → post-email confirmation

/components
  /landing
    Hero.tsx
    ProblemSection.tsx
    SolutionSection.tsx
    HowItWorks.tsx
    ExampleOutput.tsx
    TrustSection.tsx
    FinalCTA.tsx
  /quiz
    QuizShell.tsx
    QuizQuestion.tsx
    QuizProgress.tsx
    MidQuizEmailCapture.tsx       → skippable soft capture after Q3
  /plan
    PlanHero.tsx
    Timeline.tsx
    GearList.tsx
    KidActivityPlan.tsx
    SafetyNotes.tsx
    AffiliateBlock.tsx
    PostPlanEmailCapture.tsx      → ConvertKit embed, utility framing
  /ui
    Button.tsx
    Card.tsx

/lib
  quiz-questions.ts               → typed question config
  quiz-router.ts                  → sessionSnapshot → planSlug mapping
  plan-templates.ts               → 4 plan content objects
  session.ts                      → localStorage read/write helpers

/types
  index.ts                        → SessionSnapshot, PlanSlug, QuizAnswer, PlanTemplate
```

---

## Data Models

### SessionSnapshot
Single object written to `localStorage` on quiz completion.

```ts
type PlanSlug =
  | 'backyard-test'
  | 'first-night-camp'
  | 'first-weekend-camp'
  | 'easy-family-basecamp'

type SessionSnapshot = {
  experience: 'none' | 'some' | 'confident'
  anxiety: 'low' | 'medium' | 'high'
  intent: 'test' | 'real-trip' | 'multi-night'
  comfortPriority: 'low' | 'high'
  kidsAgeGroup: 'none' | '3-6' | '7-12' | 'teens'
  planSlug: PlanSlug
  timestamp: number
}
```

### QuizQuestion Config
```ts
type QuizQuestion = {
  id: keyof Omit<SessionSnapshot, 'planSlug' | 'timestamp'>
  prompt: string
  options: { label: string; value: string }[]
}
```

5 questions, single-choice each. `kidsAgeGroup` is captured for personalization copy only — it does not affect plan routing.

---

## Quiz Flow

**Route:** `/quiz`

**State machine (useReducer):**
- `currentIndex`: 0–4
- `answers`: partial `SessionSnapshot`
- `status`: `'active' | 'complete'`

**Progression:**
- Each answer advances `currentIndex`
- After Q3 is answered (between Q3 and Q4): render `MidQuizEmailCapture` — skippable card shown as an interstitial, does not block progression to Q4
- After final answer: call `computePlanSlug(answers)` → write `sessionSnapshot` to localStorage → `router.push('/plan/[slug]')`

**No back-navigation in MVP.** Forward-only flow.

---

## Routing Matrix (`quiz-router.ts`)

Two-step classification:

**Step 1 — Classify user profile from answers**

| Profile condition | Result |
|---|---|
| `comfortPriority === 'high'` (any other answers) | `easy-family-basecamp` |
| `experience === 'none'` + `intent === 'test'` | `backyard-test` |
| `experience === 'none' or 'some'` + `intent === 'real-trip'` | `first-night-camp` |
| `experience === 'some' or 'confident'` + `intent === 'multi-night'` | `first-weekend-camp` |
| fallback | `first-night-camp` |

`easy-family-basecamp` takes priority — evaluated first. Catches any user whose primary driver is comfort over progression.

---

## Plan Templates

4 static Next.js pages. Each page:
1. Reads `sessionSnapshot` from localStorage on mount
2. Injects personalization tokens into copy (kids age group, experience level)
3. Conditionally shows/hides sections based on template

### Template Summaries

| Slug | Who | Core Purpose | Monetization Angle |
|---|---|---|---|
| `backyard-test` | Zero experience, test intent | De-risk camping entirely | Gear minimalism checklist |
| `first-night-camp` | First real campsite, 1 night | First successful trip | PRIMARY — most affiliate value |
| `first-weekend-camp` | Comfortable with basics, 2 nights | Skill expansion | Better gear, cooking systems |
| `easy-family-basecamp` | Comfort-first, not progressing | Predictable comfort | Max comfort, convenience tools |

### Plan Page Sections (all templates)
1. Trip summary header with personalized hook line
2. Pre-trip timeline
3. Arrival + setup
4. Evening routine
5. Morning + pack-out
6. Gear checklist (affiliate placeholder blocks)
7. Kid activity plan
8. Safety notes
9. `PostPlanEmailCapture` — ConvertKit embed

`backyard-test` omits sections 4–5 (no overnight); shows condensed checklist only.

---

## Email Capture

**Two touchpoints — neither hard-gates plan access:**

### Mid-quiz (soft capture)
- Appears after question 3 as a card
- Copy: "Want to save your plan and gear list for later?"
- Skip button dismisses and continues quiz
- Implementation: inline ConvertKit embed or simple input → ConvertKit API (lightweight)

### Post-plan (primary capture)
- Bottom of every plan page
- Utility framing only: "Email this plan to yourself" / "Save for trip day"
- Implementation: ConvertKit embedded form
- No paywall. No hard gate. Value already delivered.

**Service:** ConvertKit. No custom API routes at MVP. Embedded form only.

---

## Landing Page Sections

All sections follow Anthropic-style spacing: `py-24` min, `max-w-4xl` or `max-w-5xl` centered containers, generous line-height, restrained color use.

1. **Hero** — outcome headline, subhead removing overwhelm, primary CTA "Start Your Trailstead Plan", secondary CTA "See Example Plan"
2. **Problem** — why first-time family camping fails (overpacking, setup confusion, kid boredom, no structure). Calm tone, not fear-based.
3. **Solution** — Trailstead as step-by-step system. Personalized. Removes guesswork.
4. **How It Works** — 3 steps: answer questions → receive plan → follow it. Quiz CTA central.
5. **Example Output** — mock plan preview (trip summary, timeline, gear, kid activities, safety). Feels like the product in action.
6. **Gear / Monetization** — essentials, comfort upgrades, convenience tools. Affiliate placeholders, not intrusive.
7. **Trust** — built for first-timers, not experts. Reduces mistakes. Structured guidance.
8. **Final CTA** — repeat primary CTA, reinforce ~10 min time, personalization promise.

---

## Affiliate Integration

Placeholder-first approach. Each `AffiliateBlock` component accepts:

```ts
type AffiliateProduct = {
  name: string
  description: string
  affiliateUrl: string        // placeholder '#' at MVP
  imageUrl: string            // placeholder at MVP
  category: 'essential' | 'comfort' | 'convenience'
  templateSlugs: PlanSlug[]   // which plans show this product
}
```

Products are defined in a static config file. Swap `affiliateUrl` values when real links are acquired.

---

## Styling System

### Spacing (Anthropic-inspired)
- Section padding: `py-24` to `py-32`
- Container: `max-w-4xl mx-auto px-6` (body), `max-w-6xl` (wide sections)
- Card padding: `p-8` to `p-10`
- Generous `gap-12` to `gap-16` between grid items

### Color Tokens (Tailwind)
- Background: `stone-50`, `stone-100`, `white`
- Text primary: `stone-900`
- Text secondary: `stone-600`
- Accent: `green-800`, `green-700`
- Earth warm: `amber-900`, `stone-700`
- Borders: `stone-200` (subtle, use sparingly)

### Typography
- Font UI: `Inter`
- Font headings: `Lora` (serif warmth without formality)
- H1: `text-5xl font-semibold tracking-tight` (landing) / `text-4xl` (inner pages)
- H2: `text-2xl font-medium`
- Body: `text-base leading-relaxed text-stone-700`

### Buttons
- Primary: `bg-stone-900 text-white hover:bg-stone-800` — feels like "start system"
- Secondary: `border border-stone-300 text-stone-700 hover:bg-stone-50`
- No rounded-full pill buttons. Use `rounded-md`.

### Cards
- `bg-white border border-stone-200 rounded-xl shadow-sm`
- No heavy drop shadows

---

## Out of Scope (MVP)

- Database / Supabase
- Auth / user accounts
- AI recommendation engine
- Dynamic plan generation
- Paid downloadable kit (future)
- Analytics beyond basic Vercel
- Back-navigation in quiz
- Multiple simultaneous active sessions

---

## Execution Priority

1. Landing page (conversion)
2. Quiz flow (state machine + routing)
3. Plan templates (4 static pages + personalization)
4. Affiliate placeholder integration
5. Email capture (ConvertKit embeds)
6. Polish + motion
