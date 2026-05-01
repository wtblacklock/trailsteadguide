import { notFound } from 'next/navigation'
import ActivityDetail from '@/components/activities/ActivityDetail'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { ACTIVITIES, getActivityBySlug } from '@/lib/activities/data'
import { CATEGORY_LABELS } from '@/components/activities/labels'
import { SITE_URL, articleGraph, howToGraph, pageMetadata } from '@/lib/seo'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const activity = getActivityBySlug(slug)
  if (!activity) {
    return pageMetadata({
      title: 'Activity not found',
      description: 'This activity could not be found.',
      path: `/activities/${slug}`,
      noIndex: true,
    })
  }
  return pageMetadata({
    title: activity.title,
    description: activity.tagline,
    path: `/activities/${slug}`,
    type: 'article',
  })
}

export default async function ActivityDetailPage({ params }: PageProps) {
  const { slug } = await params
  const activity = getActivityBySlug(slug)
  if (!activity) notFound()

  const path = `/activities/${slug}`

  return (
    <main>
      <JsonLd
        data={howToGraph({
          name: activity.title,
          description: activity.tagline,
          steps: activity.instructions.map((text, i) => ({
            name: `Step ${i + 1}`,
            text,
          })),
        })}
      />
      <JsonLd
        data={articleGraph({
          slug: path,
          title: activity.title,
          description: activity.tagline,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Activities', url: `${SITE_URL}/activities` },
            { name: activity.title, url: `${SITE_URL}${path}` },
          ],
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Activities', url: `${SITE_URL}/activities` },
          { name: CATEGORY_LABELS[activity.category], url: `${SITE_URL}/activities?category=${activity.category}` },
          { name: activity.title, url: `${SITE_URL}${path}` },
        ]}
      />
      <ActivityDetail activity={activity} />
    </main>
  )
}
