interface Props {
  items: string[]
}

export default function GearList({ items }: Props) {
  if (items.length === 0) return null
  return (
    <section className="py-12 bg-stone-100">
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
      </div>
    </section>
  )
}
