import Link from 'next/link'
import type { Skill, SkillCategory } from '@/lib/skills/types'
import SkillCard from './SkillCard'

interface Props {
  category: SkillCategory
  skills: Skill[]
}

export default function SkillGrid({ category, skills }: Props) {
  return (
    <section className="max-w-page mx-auto px-6 pb-16 md:pb-20">
      {skills.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-10 text-center">
          <h2 className="font-serif text-2xl text-stone-900 mb-3">No skills here yet</h2>
          <p className="text-stone-600 mb-6 max-w-md mx-auto">
            We’re still writing this section. In the meantime, try one of the other skill
            categories.
          </p>
          <Link
            href="/skills"
            className="inline-flex items-center justify-center bg-stone-900 text-white text-sm font-medium rounded-md hover:bg-stone-800 transition-colors px-5 py-2.5"
          >
            All skill categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s) => (
            <SkillCard key={s.slug} skill={s} category={category} />
          ))}
        </div>
      )}
    </section>
  )
}
