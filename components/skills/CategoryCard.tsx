import Link from 'next/link'
import type { SkillCategory } from '@/lib/skills/types'

interface Props {
  category: SkillCategory
  skillCount: number
}

export default function CategoryCard({ category, skillCount }: Props) {
  return (
    <Link
      href={`/skills/${category.slug}`}
      className="group block h-full bg-white border border-stone-200 rounded-xl shadow-sm hover:shadow-md hover:border-stone-300 transition-all p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
    >
      <div className="flex flex-col h-full">
        <p className="text-xs uppercase tracking-widest text-[#2d5016] font-medium mb-3">
          {skillCount} {skillCount === 1 ? 'skill' : 'skills'}
        </p>
        <h2 className="font-serif text-xl text-stone-900 mb-2 leading-snug">{category.label}</h2>
        <p className="text-stone-600 text-sm leading-relaxed mb-5 flex-1">{category.blurb}</p>
        <span className="text-sm text-stone-700 group-hover:text-stone-900 inline-flex items-center gap-1 font-medium">
          Learn this
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
