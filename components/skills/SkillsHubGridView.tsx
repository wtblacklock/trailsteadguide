import Link from 'next/link'
import { getCategoryById } from '@/lib/skills/categories'
import type { Skill } from '@/lib/skills/types'
import SkillCard from './SkillCard'

// Presentational half of the hub grid. The client grid renders it with the
// filtered list; the hub page renders it as the Suspense fallback with the
// full list, so the server HTML always links to every skill.
export default function SkillsHubGridView({
  skills,
  isFiltered,
}: {
  skills: Skill[]
  isFiltered: boolean
}) {
  return (
    <section className="max-w-page mx-auto px-6 py-12 md:py-16">
      <div className="flex items-baseline justify-between mb-8">
        <p className="text-sm text-stone-500">
          {skills.length} {skills.length === 1 ? 'skill' : 'skills'}
          {isFiltered && ' match your filters'}
        </p>
      </div>
      {skills.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s) => (
            <SkillCard
              key={`${s.category}/${s.slug}`}
              skill={s}
              category={getCategoryById(s.category)}
              showCategory
            />
          ))}
        </div>
      )}
    </section>
  )
}

function EmptyState() {
  return (
    <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-10 text-center">
      <h2 className="font-serif text-2xl text-stone-900 mb-3">No skills match those filters</h2>
      <p className="text-stone-600 mb-6 max-w-md mx-auto">
        Try removing one of the filters above. Most categories have a beginner-friendly entry
        point worth starting from.
      </p>
      <Link
        href="/skills"
        className="inline-flex items-center justify-center bg-stone-900 text-white text-sm font-medium rounded-md hover:bg-stone-800 transition-colors px-5 py-2.5"
      >
        Clear all filters
      </Link>
    </div>
  )
}
