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
