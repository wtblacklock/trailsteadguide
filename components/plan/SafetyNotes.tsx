interface Props {
  notes: string[]
}

export default function SafetyNotes({ notes }: Props) {
  if (notes.length === 0) return null
  return (
    <section className="py-12 bg-amber-50">
      <div className="max-w-content mx-auto px-6">
        <h2 className="text-2xl font-serif font-medium text-stone-900 mb-6">Safety Notes</h2>
        <ul className="space-y-3">
          {notes.map((note, i) => (
            <li key={i} className="flex gap-3 text-stone-700">
              <span className="flex-shrink-0 text-amber-600">⚠</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
