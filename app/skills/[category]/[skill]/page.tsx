import { notFound } from 'next/navigation'
import SkillDetail from '@/components/skills/SkillDetail'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { SKILLS } from '@/lib/skills/data'
import { getCategoryBySlug, getCategoryById } from '@/lib/skills/categories'
import { getSkillBySlugs } from '@/lib/skills/helpers'
import { SITE_URL, articleGraph, howToGraph, pageMetadata } from '@/lib/seo'

interface PageProps {
  params: Promise<{ category: string; skill: string }>
}

export function generateStaticParams() {
  return SKILLS.map((s) => ({
    category: getCategoryById(s.category).slug,
    skill: s.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { category: categorySlug, skill: skillSlug } = await params
  const skill = getSkillBySlugs(categorySlug, skillSlug)
  if (!skill) {
    return pageMetadata({
      title: 'Skill not found',
      description: 'This skill could not be found.',
      path: `/skills/${categorySlug}/${skillSlug}`,
      noIndex: true,
    })
  }
  return pageMetadata({
    title: `${skill.title} — Camp Skills`,
    description: skill.tagline,
    path: `/skills/${categorySlug}/${skill.slug}`,
    type: 'article',
  })
}

export default async function SkillDetailPage({ params }: PageProps) {
  const { category: categorySlug, skill: skillSlug } = await params
  const skill = getSkillBySlugs(categorySlug, skillSlug)
  const category = getCategoryBySlug(categorySlug)
  if (!skill || !category) notFound()

  const path = `/skills/${category.slug}/${skill.slug}`

  return (
    <main>
      <JsonLd
        data={howToGraph({
          name: skill.title,
          description: skill.tagline,
          steps: skill.steps.map((text, i) => ({
            name: `Step ${i + 1}`,
            text,
          })),
        })}
      />
      <JsonLd
        data={articleGraph({
          slug: path,
          title: skill.title,
          description: skill.tagline,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Skills', url: `${SITE_URL}/skills` },
            { name: category.label, url: `${SITE_URL}/skills/${category.slug}` },
            { name: skill.title, url: `${SITE_URL}${path}` },
          ],
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Skills', url: `${SITE_URL}/skills` },
          { name: category.label, url: `${SITE_URL}/skills/${category.slug}` },
          { name: skill.title, url: `${SITE_URL}${path}` },
        ]}
      />
      <SkillDetail skill={skill} category={category} />
    </main>
  )
}
