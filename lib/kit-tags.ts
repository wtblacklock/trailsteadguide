// Kit tag IDs per plan slug.
// Tag IDs come from the Kit UI — click a tag, check the URL for
// subscribable_ids=<number>.

export const PLAN_TAG_IDS: Record<string, number> = {
  'backyard-test': 19161250,
  'first-night-camp': 19161253,
  'first-weekend-camp': 19161256,
  'easy-family-basecamp': 19161260,
}

// Generic "started the quiz but no plan yet" tag for mid-quiz capture.
// 0 = disabled (no tag attached; subscriber lands in form only).
export const QUIZ_STARTED_TAG_ID = 0

// "Bought a Trip Pack" tag — attached every time a paid checkout completes
// (Stripe webhook) or an email-gate trip-pack download is issued. Lets you
// segment buyers from quiz-only subscribers in Kit. 0 = disabled (set the
// real tag id from your Kit dashboard to enable).
export const BUYER_TAG_ID = 0
