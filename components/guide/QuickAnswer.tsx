import type { ReactNode } from 'react'

export type QuickAnswerProps = {
  /** 60–120 word Q&A-style answer — the meaty takeaway. */
  summary: ReactNode
  /** Optional ≤25-word ultra-tight version, shown above the summary. */
  tldr?: string
}

/**
 * Quick Answer block — placed at the top of each guide, immediately after
 * the hero, before the first content section. Authored to be the single
 * passage AI Overviews / Perplexity / ChatGPT search will quote.
 */
export function QuickAnswer({ summary, tldr }: QuickAnswerProps) {
  return (
    <aside
      aria-label="Quick answer"
      className="not-prose mb-12 mt-2 border-l-4 border-brand-green bg-cream/70 px-6 py-7 md:px-8 md:py-8 rounded-r-md ring-1 ring-stone-200/60"
    >
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
        Quick answer
      </p>
      {tldr && (
        <p className="font-serif text-stone-950 text-lg md:text-xl leading-snug mb-4 font-semibold tracking-[-0.005em]">
          {tldr}
        </p>
      )}
      <p className="font-serif text-stone-800 text-[1.0625rem] md:text-lg leading-[1.65]">
        {summary}
      </p>
    </aside>
  )
}

export default QuickAnswer
