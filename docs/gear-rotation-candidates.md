# Gear rotation candidates

Products spotted during the weekly gear-rotation pass that look worth a slot but
were not wired in yet. Each entry says what still needs to happen before it can
ship. Trim this file as items are actioned or go stale.

Last reviewed: 2026-09-21

## Not yet verified

None open this week.

## Retired this run

- **LuminAID PackLite Max 2-in-1 (200 lumens)**: `B08YC6H4F6` now redirects to a
  relisted `B0CVYMMHJ4` at $59.99 with only 418 ratings. That is not a meaningful
  budget tier under the $68 Titan, so it was dropped rather than added.

## Deferred, not a sourcing problem

### Broader gear-slot fills in `data/guide-gear.ts`

PR #74 ("align gear shelves with the products the prose recommends") has been open
against `data/guide-gear.ts` since 2026-09-03 and rewrites STOVE and CHAIR rows
across most regional guides. Gear-rotation runs avoid the blocks it touches.

`campfire-recipes-for-kids` and `no-cook-camping-meals-kids` were filled on
2026-09-21. Still thin, worth revisiting once #74 lands:

- `how-to-start-a-campfire` - 2 products (matches and fire cubes). A fire-safety
  item (bucket or extinguisher) would fit, but none is in the registry yet.

### Sleeping-bag slot

`teton-celsius-xxl-0` was added on 2026-09-21 to the Montana, Wyoming and winter
shelves as the mid-price 0°F tier. Other cold-weather shelves (Colorado,
Appalachians, Northeast, Pacific Northwest, fall, `camping-when-the-weather-turns`)
sit inside PR #74 hunks and were left alone to avoid a merge conflict. Add it there
once #74 merges.
