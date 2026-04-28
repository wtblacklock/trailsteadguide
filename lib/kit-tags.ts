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

/**
 * Kit tag IDs per printable slug. Free-printable email-gate captures hit
 * `/api/subscribe` with `source: 'printable'` and the matching slug; the
 * subscriber lands in the Kit form and gets the printable-specific tag,
 * which can be used to drive a Kit automation that emails the download.
 *
 * Tag IDs come from the Kit UI — click a tag, check the URL for
 * subscribable_ids=<number>. 0 = no tag (subscriber still lands in form).
 */
export const PRINTABLE_TAG_IDS: Record<string, number> = {
  'northern-hemisphere-constellation-wheel': 19208433,
}

/**
 * Generic "downloaded a printable" tag — applied to every printable
 * email-gate capture regardless of which printable. Useful for a single
 * "lead-magnet downloader" automation.
 *
 * Currently sharing the same ID as the per-printable tag above so a
 * single Kit tag drives both: subscribers get tagged once on every
 * printable download. Swap to a distinct generic-downloader tag id when
 * the catalogue grows past one printable and per-printable segmentation
 * matters. 0 = disabled.
 */
export const PRINTABLE_GENERIC_TAG_ID = 19208433
