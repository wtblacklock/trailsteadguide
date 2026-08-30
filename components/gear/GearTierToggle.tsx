import Link from 'next/link'
import { GEAR_TIERS, type GearTier } from '@/lib/gear-sets'

interface Props {
  /** Path this toggle lives on (e.g. '/gear' or '/gear/sets/first-weekend-camp'). */
  basePath: string
  tier: GearTier
}

const TIER_COPY: Record<GearTier, string> = {
  budget: 'Cheapest gear that still works for the trip.',
  standard: 'Our default pick — the best balance of price and quality.',
  premium: 'Upgraded gear worth the extra cost if you\'re camping often.',
}

/**
 * Plain-link tier switcher — no client JS. Each tab is a real link to
 * `?tier=<id>` (or the bare path for 'standard', the canonical default),
 * so it's crawlable, bookmarkable, and works with JS disabled.
 */
export default function GearTierToggle({ basePath, tier }: Props) {
  return (
    <div>
      <div className="inline-flex rounded-lg ring-1 ring-stone-200 bg-stone-50 p-1">
        {GEAR_TIERS.map(({ id, label }) => {
          const isActive = id === tier
          const href = id === 'standard' ? basePath : `${basePath}?tier=${id}`
          return (
            <Link
              key={id}
              href={href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              {label}
            </Link>
          )
        })}
      </div>
      <p className="mt-3 text-sm text-stone-500">{TIER_COPY[tier]}</p>
    </div>
  )
}
