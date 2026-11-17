import { Suspense } from 'react'
import SkillsHero from '@/components/skills/SkillsHero'
import SkillsFilterBar from '@/components/skills/SkillsFilterBar'
import SkillsHubGrid from '@/components/skills/SkillsHubGrid'
import SkillsHubGridView from '@/components/skills/SkillsHubGridView'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { SKILLS } from '@/lib/skills/data'
import { getCategoryById } from '@/lib/skills/categories'
import { SITE_URL, collectionPageGraph, pageMetadata } from '@/lib/seo'

const PATH = '/skills'
const TITLE = 'Camp Skills Made Simple'
const DESCRIPTION =
  'Browse the full Camp Skills library. Filter by category, difficulty, or safety level - pick a skill and learn it before your next trip.'

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
      <Suspense fallback={<SkillsHubGridView skills={SKILLS} isFiltered={false} />}>
        <SkillsHubGrid />
      </Suspense>
    </main>
  )
}
