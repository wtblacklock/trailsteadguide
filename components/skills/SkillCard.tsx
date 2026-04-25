import Link from 'next/link'
import type { Skill, SkillCategory } from '@/lib/skills/types'
import DifficultyBadge from './DifficultyBadge'

interface Props {
  skill: Skill
  category: SkillCategory
}

export default function SkillCard({ skill, category }: Props) {
  const useCase = skill.useCases[0] ?? skill.whenToUse
  return (
    <Link
      href={`/skills/${category.slug}/${skill.slug}`}
      className="group block h-full bg-white border border-stone-200 rounded-xl shadow-sm hover:shadow-md hover:border-stone-300 transition-all p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
    >
      <div className="flex flex-col h-full">
        <h3 className="font-serif text-xl text-stone-900 mb-2 leading-snug">{skill.title}</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-1">{skill.tagline}</p>
        {useCase && (
          <p className="text-xs text-stone-500 leading-relaxed mb-4">
            <span className="font-semibold text-stone-700">Use it for: </span>
            {useCase}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <DifficultyBadge difficulty={skill.difficulty} />
          {skill.timeRequired && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset bg-stone-100 text-stone-700 ring-stone-200">
              {skill.timeRequired}
            </span>
          )}
        </div>
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
