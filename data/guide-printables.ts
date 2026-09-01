// data/guide-printables.ts
/**
 * Per-guide printable curation - which free printable(s) get surfaced on
 * each `/guides/<slug>/` page. Mirrors the `data/guide-gear.ts` pattern:
 * a plain slug -> slug[] map, sparse by design.
 *
 * Guides not present in this map render no printables section (same
 * "not every guide needs an entry" convention as GUIDE_GEAR - forcing a
 * printable onto a guide with no genuine topical match would just be
 * noise). Consumed by `getPrintablesForGuide()` in
 * `lib/printables/guide-printables.ts`.
 */
export const GUIDE_PRINTABLES: Record<string, string[]> = {
  'camping-for-beginners': ['backyard-test-checklist', 'leave-no-trace-quick-reference', 'fire-starting-checklist'],
  'how-to-plan-a-camping-trip': ['backyard-test-checklist', 'weather-signs-field-card'],
  'car-camping-beginner-guide': ['backyard-test-checklist', 'camp-first-aid-quick-reference'],
  'first-camping-trip-checklist': ['backyard-test-checklist', 'camp-first-aid-quick-reference', 'knot-reference-card'],
  'weekend-camping-packing-list': ['backyard-test-checklist'],
  'first-time-camping-mistakes': ['leave-no-trace-quick-reference', 'camp-first-aid-quick-reference'],
  'camping-with-kids-first-time': ['animal-track-id-card', 'nature-scavenger-hunt-card', 'shadow-puppet-hand-guide'],
  'camping-with-toddlers': ['kids-camping-packing-list'],
  'summer-camping-with-kids': ['kids-camping-packing-list', 'nature-scavenger-hunt-card'],
  'first-night-camping-guide': ['northern-hemisphere-constellation-wheel', 'night-sky-bingo'],
  'rainy-camping-trips': ['weather-signs-field-card'],
  'camping-in-a-heatwave': ['weather-signs-field-card'],
  'camping-when-the-weather-turns': ['weather-signs-field-card'],
  'spring-camping-for-beginners': ['weather-signs-field-card'],
  'summer-camping-for-beginners': ['nature-scavenger-hunt-card', 'night-sky-bingo'],
  'fall-camping-for-beginners': ['weather-signs-field-card', 'fire-starting-checklist'],
  'winter-camping-for-beginners': ['fire-starting-checklist', 'camp-first-aid-quick-reference'],
  'camping-in-texas-for-beginners': ['weather-signs-field-card', 'animal-track-id-card'],
  'camping-in-california-for-beginners': ['bear-bag-food-storage-card', 'leave-no-trace-quick-reference'],
  'camping-in-colorado-for-beginners': ['bear-bag-food-storage-card', 'weather-signs-field-card'],
  'camping-in-florida-for-beginners': ['weather-signs-field-card', 'animal-track-id-card'],
  'camping-in-the-pacific-northwest-for-beginners': ['bear-bag-food-storage-card', 'weather-signs-field-card'],
  'camping-in-the-desert-southwest-for-beginners': ['weather-signs-field-card', 'animal-track-id-card'],
  'camping-in-the-appalachians-for-beginners': ['bear-bag-food-storage-card', 'animal-track-id-card'],
  'camping-in-the-northeast-for-beginners': ['bear-bag-food-storage-card', 'weather-signs-field-card'],
  'family-camping-for-beginners': ['leave-no-trace-quick-reference', 'kids-camping-packing-list'],
  'backyard-camping-with-kids': ['backyard-test-checklist', 'shadow-puppet-hand-guide'],
  'how-to-choose-a-family-campsite': ['leave-no-trace-quick-reference'],
  'family-camping-gear-list': ['kids-camping-packing-list', 'backyard-test-checklist'],
  'best-family-tent-for-beginners': ['backyard-test-checklist'],
  'best-camping-sleeping-bag-for-kids': ['kids-camping-packing-list'],
  'how-to-set-up-a-tent': ['backyard-test-checklist', 'knot-reference-card'],
  'how-to-break-camp': ['leave-no-trace-quick-reference'],
  'best-tent-for-rainy-camping': ['weather-signs-field-card'],
  'best-tent-for-hot-weather': ['weather-signs-field-card'],
  'easy-family-camping-meals': ['camp-cooking-conversion-card', '3-day-camp-meal-planner'],
  'camping-meal-plan-family': ['3-day-camp-meal-planner', 'camp-cooking-conversion-card'],
  'campfire-recipes-for-kids': ['fire-starting-checklist', 'camp-cooking-conversion-card'],
  'how-to-start-a-campfire': ['fire-starting-checklist'],
  'best-state-parks-for-families': ['leave-no-trace-quick-reference', 'weather-signs-field-card'],
  'dispersed-camping-on-blm-and-national-forest-land': ['bear-bag-food-storage-card', 'leave-no-trace-quick-reference'],
  'labor-day-weekend-camping': ['weather-signs-field-card', 'camp-first-aid-quick-reference'],
}
