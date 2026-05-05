import Link from 'next/link'

interface Props {
  items: string[]
}

export default function GearList({ items }: Props) {
  if (items.length === 0) return null
  return (
    <section className="py-12">
      <div className="max-w-content mx-auto px-6">
        <h2 className="text-2xl font-serif font-medium text-stone-900 mb-8">Gear Checklist</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 items-start text-stone-700">
              <span className="mt-1 text-brand-green flex-shrink-0" aria-hidden="true">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-stone-500">
          Picking gear?{' '}
          <Link
            href="/compare"
            className="text-stone-700 underline-offset-4 hover:underline hover:text-stone-900"
          >
            See our full picks side by side
          </Link>{' '}
          — beginner-grade tents, coolers, stoves, and sleep systems compared.
        </p>
      </div>
    </section>
  )
}
