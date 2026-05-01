import type { PlanContent } from '@/lib/plan-content'
import type { ResolvedGearItem } from '@/lib/gear-sets'
import type { PlanTemplate } from '@/types'

/**
 * Lossy preview of the Trip Pack — enough to convince, not enough to skip
 * the paywall. Shows: cover summary, two timeline rows, three gear cards,
 * and one mistake-prevention block. The full PDF has 7 pages.
 */
export default function TripPackPreview({
  content,
  plan,
  gear,
  nights,
  adults,
  kids,
}: {
  content: PlanContent
  plan: PlanTemplate
  gear: ResolvedGearItem[]
  nights: number
  adults: number
  kids: number
}) {
  const previewTimeline = [...plan.preTrip, ...plan.arrival].slice(0, 3)
  const previewGear = gear.slice(0, 3)
  const previewMistake = content.mistakePrevention[0]
  const lockedCount = gear.length - previewGear.length

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-800 mb-3">
          What&rsquo;s inside
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          {[
            { label: 'Pages', value: '7' },
            { label: 'Nights', value: String(nights) },
            { label: 'Party', value: `${adults}A · ${kids}K` },
          ].map((m) => (
            <div key={m.label} className="rounded-xl bg-stone-50 px-4 py-3">
              <div className="text-stone-500 text-xs uppercase tracking-wider">{m.label}</div>
              <div className="text-stone-900 font-semibold mt-1 text-lg">{m.value}</div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-stone-600 leading-relaxed">{content.overview.whatThisIs}</p>
      </section>

      <section className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
        <header className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-800 mb-2">
            Sample · Timeline
          </p>
          <h2 className="text-xl font-bold text-stone-900">When to do what</h2>
        </header>
        <ol className="space-y-3">
          {previewTimeline.map((it, i) => (
            <li key={i} className="flex gap-4 border-b border-stone-100 pb-3 last:border-0 last:pb-0">
              <span className="w-24 shrink-0 text-sm font-semibold text-emerald-800">{it.time}</span>
              <div>
                <div className="text-stone-900 font-medium">{it.title}</div>
                <div className="text-sm text-stone-600 mt-0.5 leading-relaxed">{it.description}</div>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-stone-500">+ {plan.preTrip.length + plan.arrival.length + plan.evening.length + plan.morning.length - previewTimeline.length} more steps in the full pack</p>
      </section>

      <section className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
        <header className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-800 mb-2">
            Sample · Gear set
          </p>
          <h2 className="text-xl font-bold text-stone-900">Curated kit for this plan</h2>
        </header>
        <div className="grid sm:grid-cols-3 gap-4">
          {previewGear.map((g) => (
            <div key={g.product.id} className="rounded-xl border border-stone-200 overflow-hidden bg-white">
              <div className="aspect-square bg-stone-50 flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.product.imageUrl} alt="" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="p-3">
                <div className="text-[10px] uppercase tracking-widest font-bold text-emerald-800 mb-1">
                  {g.category}
                </div>
                <div className="text-sm font-semibold text-stone-900 leading-tight">{g.product.name}</div>
                <div className="text-xs text-stone-500 mt-1">{g.product.priceRange}</div>
              </div>
            </div>
          ))}
        </div>
        {lockedCount > 0 && (
          <p className="mt-4 text-xs text-stone-500">+ {lockedCount} more in the full pack</p>
        )}
      </section>

      {previewMistake && (
        <section className="bg-amber-50 rounded-2xl border border-amber-200 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold mb-3">
            Sample · Mistake to avoid
          </p>
          <h3 className="text-lg font-bold text-stone-900 mb-2">{previewMistake.title}</h3>
          <p className="text-sm text-stone-700 leading-relaxed">
            <span className="font-semibold">Why it bites:</span> {previewMistake.why}
          </p>
          <p className="text-sm text-stone-700 mt-2 leading-relaxed">
            <span className="font-semibold">The fix:</span> {previewMistake.fix}
          </p>
          <p className="mt-4 text-xs text-amber-800">
            + {content.mistakePrevention.length - 1} more failure modes in the full pack
          </p>
        </section>
      )}

      <section className="bg-stone-100 rounded-2xl p-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-3">Also inside</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {['Packing list', 'Meal-ready timeline', 'Affiliate gear links', 'Final gut-check'].map((x) => (
            <div key={x} className="rounded-lg bg-white px-3 py-2 border border-stone-200 text-stone-700">
              {x}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
