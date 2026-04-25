import { Suspense } from 'react'
import SkillsHero from '@/components/skills/SkillsHero'
import SkillsFilterBar from '@/components/skills/SkillsFilterBar'
import SkillsHubGrid from '@/components/skills/SkillsHubGrid'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { SKILLS } from '@/lib/skills/data'
import { getCategoryById } from '@/lib/skills/categories'
import { SITE_URL, collectionPageGraph, pageMetadata } from '@/lib/seo'

const PATH = '/skills'
const TITLE = 'Camp Skills Made Simple'
const DESCRIPTION =
  'Browse the full Camp Skills library. Filter by category, difficulty, or safety level — pick a skill and learn it before your next trip.'

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: 'website',
})

export default function SkillsPage() {
  return (
    <main>
      <JsonLd
        data={collectionPageGraph({
          slug: PATH,
          title: TITLE,
          description: DESCRIPTION,
          items: SKILLS.map((s) => ({
            name: s.title,
            url: `${SITE_URL}${PATH}/${getCategoryById(s.category).slug}/${s.slug}`,
          })),
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Skills', url: `${SITE_URL}${PATH}` },
        ]}
        emitSchema
      />
      <SkillsHero />
      <Suspense fallback={<div className="h-14 border-y border-stone-200/60 bg-[#F5F3EE]/95" />}>
        <SkillsFilterBar />
      </Suspense>
      <Suspense fallback={<GridSkeleton />}>
        <SkillsHubGrid />
      </Suspense>
    </main>
  )
}

function GridSkeleton() {
  return (
    <section className="max-w-page mx-auto px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-56 bg-white border border-stone-200 rounded-xl shadow-sm animate-pulse"
          />
        ))}
      </div>
    </section>
  )
}
