import type { SafetyTone } from '@/lib/skills/types'

interface Props {
  notes: string[]
  tone?: SafetyTone
  title?: string
}

const STYLE: Record<SafetyTone, { bg: string; ring: string; iconColor: string; headingColor: string; bulletColor: string; bodyColor: string }> = {
  standard: {
    bg: 'bg-amber-50',
    ring: 'ring-amber-200',
    iconColor: 'text-amber-700',
    headingColor: 'text-amber-900',
    bulletColor: 'bg-amber-700',
    bodyColor: 'text-amber-950',
  },
  critical: {
    bg: 'bg-red-50',
    ring: 'ring-red-200',
    iconColor: 'text-red-700',
    headingColor: 'text-red-900',
    bulletColor: 'bg-red-700',
    bodyColor: 'text-red-950',
  },
}

/**
 * Reusable safety callout used wherever a skill renders `safetyNotes`.
 * Amber by default; pass `tone="critical"` for the prominent red block
 * the spec requires for knife and fire-extinguishing content.
 */
export default function SafetyBlock({ notes, tone = 'standard', title }: Props) {
  if (notes.length === 0) return null
  const style = STYLE[tone]
  const heading = title ?? (tone === 'critical' ? 'Safety first' : 'Safety notes')
  return (
    <aside
      role="note"
      className={`rounded-xl p-5 md:p-6 ring-1 ring-inset ${style.bg} ${style.ring}`}
    >
      <div className="flex items-start gap-3">
        <svg
          className={`shrink-0 mt-0.5 ${style.iconColor}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div className="min-w-0">
          <p className={`text-sm font-semibold uppercase tracking-wider mb-3 ${style.headingColor}`}>
            {heading}
          </p>
          <ul className="space-y-2">
            {notes.map((note, i) => (
              <li key={i} className={`flex gap-3 leading-relaxed ${style.bodyColor}`}>
                <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${style.bulletColor}`} />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
