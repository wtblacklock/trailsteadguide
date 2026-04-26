interface Props {
  parts: string[]
}

/**
 * Visible personalization summary shown directly below PlanHero, above the
 * jump nav. Composed from the QuizOutput + GearSystemSelection in the plan
 * results page (`buildChipSummary`).
 */
export default function PersonalizationChip({ parts }: Props) {
  if (parts.length === 0) return null

  return (
    <div className="max-w-page mx-auto px-4 md:px-8 mt-6">
      <div className="max-w-content mx-auto">
        <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-700 ring-1 ring-stone-200">
          <span className="font-medium text-stone-900">Built for:</span>
          {parts.map((p, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-stone-300">•</span>}
              <span>{p}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
