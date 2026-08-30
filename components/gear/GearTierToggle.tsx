'use client'

import { GEAR_TIERS, type GearTier } from '@/lib/gear-sets'

interface Props {
  tier: GearTier
  onTierChange: (tier: GearTier) => void
}

const TIER_COPY: Record<GearTier, string> = {
  budget: 'Cheapest gear that still works for the trip.',
  standard: 'Our default pick — the best balance of price and quality.',
  premium: 'Upgraded gear worth the extra cost if you\'re camping often.',
}

/**
 * Client-side tier switcher. Deliberately NOT link/URL-based — switching
 * tiers is pure local state, no navigation and no network request. (An
 * earlier version used `?tier=` query-string navigation; that round-trip
 * turned out to be unreliable in production, so tier state now lives
 * entirely in the browser instead.)
 */
export default function GearTierToggle({ tier, onTierChange }: Props) {
  return (
    <div>
      <div className="inline-flex rounded-lg ring-1 ring-stone-200 bg-stone-50 p-1">
        {GEAR_TIERS.map(({ id, label }) => {
          const isActive = id === tier
          return (
            <button
              key={id}
              type="button"
              onClick={() => onTierChange(id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              {label}
            </button>
          )
        })}
      </div>
      <p className="mt-3 text-sm text-stone-500">{TIER_COPY[tier]}</p>
    </div>
  )
}
