import {
  COMFORT_SYSTEMS,
  COOKING_SYSTEMS,
  LIGHTING_SYSTEMS,
  SLEEP_SYSTEMS,
} from '@/lib/personalization/gear-systems'
import type { SystemDefinition } from '@/lib/personalization/gear-systems'
import type { GearSystemSelection } from '@/lib/personalization/types'
import { CATEGORY_LABELS, type ResolvedSystem, type ResolvedSystems } from '@/lib/personalization/product-map'
import { buildAffiliateUrl } from '@/lib/gear-sets'

interface Props {
  systems: GearSystemSelection
  resolved: ResolvedSystems
}

export default function GearSystemsBlock({ systems, resolved }: Props) {
  return (
    <section className="py-12 max-w-content mx-auto px-6">
      <div className="mb-8">
        <p className="text-stone-500 text-xs uppercase tracking-wider mb-1">Your Setup</p>
        <h2 className="text-2xl font-serif font-medium text-stone-900">
          The four systems for this trip
        </h2>
        <p className="text-stone-500 mt-2 text-sm">
          Each system is picked from your answers — sleep, cook, light, comfort. Tap any link to
          view a product on Amazon (affiliate links help fund Trailstead).
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SystemCard def={SLEEP_SYSTEMS[systems.sleep]} system={resolved.sleep} />
        <SystemCard def={COOKING_SYSTEMS[systems.cooking]} system={resolved.cooking} />
        <SystemCard def={LIGHTING_SYSTEMS[systems.lighting]} system={resolved.lighting} />
        <SystemCard def={COMFORT_SYSTEMS[systems.comfort]} system={resolved.comfort} />
      </div>
    </section>
  )
}

function SystemCard<C extends string>({
  def,
  system,
}: {
  def: SystemDefinition
  system: ResolvedSystem<C>
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <h3 className="font-serif text-lg text-stone-900">{def.title}</h3>
      <p className="text-stone-600 text-sm mt-1">{def.description}</p>

      {def.structure.length > 0 && (
        <ul className="mt-3 text-sm text-stone-700 space-y-1">
          {def.structure.map((s, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-stone-300" aria-hidden="true">
                —
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}

      {system.categories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-stone-100 space-y-3">
          {system.categories.map((c) => (
            <div key={c.category}>
              <p className="text-xs font-medium uppercase tracking-wider text-stone-500 mb-1">
                {CATEGORY_LABELS[c.category as keyof typeof CATEGORY_LABELS] ?? c.category}
              </p>
              <ul className="space-y-1">
                {c.products.map((p) => (
                  <li key={p.id} className="text-sm">
                    <a
                      href={buildAffiliateUrl(p)}
                      target="_blank"
                      rel="noopener sponsored nofollow"
                      className="text-stone-900 font-medium underline decoration-stone-400 underline-offset-4 hover:decoration-stone-900 transition-colors inline-flex items-baseline gap-1"
                    >
                      {p.name}
                      <span aria-hidden="true" className="text-stone-400">↗</span>
                    </a>{' '}
                    <span className="text-stone-500">{p.priceRange}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
