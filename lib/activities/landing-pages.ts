/**
 * Hand-written activity landing pages.
 *
 * These are keyword-targeted roundups that live at `/activities/<slug>` but
 * are NOT entries in ACTIVITIES - they curate the activity catalogue rather
 * than describing a single activity. Because nothing enumerated them, they
 * were silently absent from the sitemap and llms.txt. Anything that lists
 * site content should read this module so that cannot happen again.
 *
 * Adding a page here does not create the route - write the page under
 * `app/activities/<slug>/page.tsx` and keep the title/description in sync
 * with its own META_TITLE / DESCRIPTION constants.
 */

export type ActivityLandingPage = {
  slug: string
  /** Matches the page's META_TITLE. */
  title: string
  /** Matches the page's DESCRIPTION. */
  description: string
  /** Sitemap priority. The kids page is the strongest head term. */
  priority: number
}

export const ACTIVITY_LANDING_PAGES: ActivityLandingPage[] = [
  {
    slug: 'camping-activities-for-kids',
    title: 'Camping Activities for Kids - 37 Proven Ideas',
    description:
      'Camping activities for kids sorted by age, energy, and weather: campfire games, nature scavenger hunts, rainy-day ideas, and quiet activities for every camp situation.',
    priority: 0.8,
  },
  {
    slug: 'camping-activities-for-toddlers',
    title: 'Camping Activities for Toddlers (Ages 2-5)',
    description:
      'The best camping activities for toddlers: sensory exploration, short structured play, and camp games that work for ages 2-5 without needing adult-level attention spans.',
    priority: 0.75,
  },
  {
    slug: 'camping-activities-for-teenagers',
    title: 'Camping Activities for Teenagers (That Actually Work)',
    description:
      'Camping activities for teenagers that hold their attention: challenge-based games, navigation, night activities, and things to do when a teen says camping is boring.',
    priority: 0.75,
  },
  {
    slug: 'rainy-day-camping-activities-kids',
    title: 'Rainy Day Camping Activities for Kids - 15 Ideas',
    description:
      "Rainy day camping activities for kids that actually work: tent games, tarp adventures, mud play, and what to do when it rains and you can't go home.",
    priority: 0.75,
  },
]
