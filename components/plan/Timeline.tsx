interface TimelineSection {
  heading: string
  items: string[]
}

interface Props {
  sections: TimelineSection[]
}

export default function Timeline({ sections }: Props) {
  if (sections.length === 0) return null
  return (
    <section className="py-12 max-w-content mx-auto px-6">
      <h2 className="text-2xl font-serif font-medium text-stone-900 mb-8">Your Trip Timeline</h2>
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-green mb-4">
              {section.heading}
            </h3>
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-stone-700">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-xs font-medium text-stone-500">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
