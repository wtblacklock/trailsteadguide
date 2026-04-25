import Link from 'next/link'
import { getSkillByRef } from '@/lib/skills/helpers'
import type { PlanSkillRef } from '@/types'
import SkillCard from '@/components/skills/SkillCard'

interface Props {
  skillRefs: PlanSkillRef[]
}

export default function SkillsSummaryBlock({ skillRefs }: Props) {
  const resolved = skillRefs
    .map((ref) => {
      const found = getSkillByRef(ref.skillSlug)
      return found ? { ...found, rationale: ref.rationale } : null
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)

  if (resolved.length === 0) return null

  return (
    <section className="py-12 max-w-content mx-auto px-6">
      <h2 className="text-2xl font-serif font-medium text-stone-900 mb-2">Skills you&rsquo;ll use</h2>
      <p className="text-stone-500 text-sm mb-8">
        The handful of camp skills this trip leans on. Each card opens a step-by-step guide.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {resolved.map(({ skill, category, rationale }) => (
          <div key={`${category.slug}/${skill.slug}`} className="flex flex-col gap-3">
            <SkillCard skill={skill} category={category} showCategory />
            <p className="text-sm text-stone-700 leading-relaxed px-1">
              <span className="font-semibold text-stone-900">Why for this trip: </span>
              {rationale}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/skills"
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900"
        >
          Browse all skills
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
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
