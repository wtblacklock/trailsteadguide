import Link from 'next/link'
import type { SkillCategory } from '@/lib/skills/types'

interface Props {
  category: SkillCategory
  skillCount: number
}

export default function CategoryHero({ category, skillCount }: Props) {
  return (
    <section className="bg-[#F5F3EE]">
      <div className="max-w-content mx-auto px-6 pt-12 pb-10 md:pt-16 md:pb-12">
        <Link
          href="/skills"
          className="inline-flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 mb-8"
        >
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
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All skill categories
        </Link>
        <p className="text-xs uppercase tracking-widest text-[#2d5016] font-medium mb-4">
          {skillCount} {skillCount === 1 ? 'skill' : 'skills'} in {category.label}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 tracking-tight leading-[1.1] mb-4">
          {category.heroTitle}
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed max-w-prose">{category.heroSubhead}</p>
      </div>
    </section>
  )
}
