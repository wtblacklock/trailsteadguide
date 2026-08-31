import Link from 'next/link'
import type { Printable } from '@/lib/printables'

interface Props {
  printables: Printable[]
}

export default function PrintablesForPlanBlock({ printables }: Props) {
  if (printables.length === 0) return null

  return (
    <section className="py-12 max-w-content mx-auto px-6">
      <h2 className="text-2xl font-serif font-medium text-stone-900 mb-2">Free printables for this trip</h2>
      <p className="text-stone-500 text-sm mb-8">
        Analog reference cards for this plan - no phone, no signal needed at the campsite.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {printables.map((printable) => (
          <Link
            key={printable.slug}
            href={`/printables/${printable.slug}`}
            className="group flex flex-col gap-1 rounded-lg ring-1 ring-stone-200 bg-white px-5 py-4 hover:ring-stone-900 transition-colors"
          >
            <span className="text-[11px] tracking-[0.14em] uppercase text-stone-500">
              {printable.formatNote.split(' · ')[0]}
            </span>
            <span className="text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
              {printable.title}
            </span>
            <span className="text-sm text-stone-600 leading-relaxed line-clamp-2">
              {printable.description}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/printables"
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900"
        >
          Browse all printables
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
