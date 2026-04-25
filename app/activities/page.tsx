import { Suspense } from 'react'
import ActivitiesHero from '@/components/activities/ActivitiesHero'
import ActivitiesFilterBar from '@/components/activities/ActivitiesFilterBar'
import ActivitiesGrid from '@/components/activities/ActivitiesGrid'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { ACTIVITIES } from '@/lib/activities/data'
import { SITE_URL, collectionPageGraph, pageMetadata } from '@/lib/seo'

const PATH = '/activities'
const TITLE = 'Camp Activities, Games & Challenges'
const DESCRIPTION =
  'A structured library of scouting-style camp activities. Filter by age, group size, energy, and time — pick one and go.'

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: 'website',
})

export default function ActivitiesPage() {
  return (
    <main>
      <JsonLd
        data={collectionPageGraph({
          slug: PATH,
          title: TITLE,
          description: DESCRIPTION,
          items: ACTIVITIES.map((a) => ({
            name: a.title,
            url: `${SITE_URL}${PATH}/${a.slug}`,
          })),
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Activities', url: `${SITE_URL}${PATH}` },
        ]}
        emitSchema
      />
      <ActivitiesHero />
      <Suspense fallback={<div className="h-14 border-y border-stone-200/60 bg-[#F5F3EE]/95" />}>
        <ActivitiesFilterBar />
      </Suspense>
      <Suspense fallback={<GridSkeleton />}>
        <ActivitiesGrid />
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
