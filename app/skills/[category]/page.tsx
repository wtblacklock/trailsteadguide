import { notFound } from 'next/navigation'
import CategoryHero from '@/components/skills/CategoryHero'
import SkillGrid from '@/components/skills/SkillGrid'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { SKILL_CATEGORIES, getCategoryBySlug } from '@/lib/skills/categories'
import { getSkillsByCategoryId } from '@/lib/skills/helpers'
import { SITE_URL, collectionPageGraph, pageMetadata } from '@/lib/seo'

interface PageProps {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return SKILL_CATEGORIES.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { category: slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) {
    return pageMetadata({
      title: 'Skill category not found',
      description: 'This skill category could not be found.',
      path: `/skills/${slug}`,
      noIndex: true,
    })
  }
  return pageMetadata({
    title: `${category.label} — Camp Skills`,
    description: category.heroSubhead,
    path: `/skills/${category.slug}`,
    type: 'website',
  })
}

export default async function SkillCategoryPage({ params }: PageProps) {
  const { category: slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const skills = getSkillsByCategoryId(category.id)
  const path = `/skills/${category.slug}`

  return (
    <main>
      <JsonLd
        data={collectionPageGraph({
          slug: path,
          title: `${category.label} — Camp Skills`,
          description: category.heroSubhead,
          items: skills.map((s) => ({
            name: s.title,
            url: `${SITE_URL}${path}/${s.slug}`,
          })),
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Skills', url: `${SITE_URL}/skills` },
          { name: category.label, url: `${SITE_URL}${path}` },
        ]}
        emitSchema
      />
      <CategoryHero category={category} skillCount={skills.length} />
      <SkillGrid category={category} skills={skills} />
    </main>
  )
}
