import SkillsHero from '@/components/skills/SkillsHero'
import CategoryGrid from '@/components/skills/CategoryGrid'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { getPopulatedCategories } from '@/lib/skills/helpers'
import { SITE_URL, collectionPageGraph, pageMetadata } from '@/lib/seo'

const PATH = '/skills'
const TITLE = 'Camp Skills Made Simple'
const DESCRIPTION =
  'Learn the essentials without overthinking it. Twelve practical, scouting-style skill categories for first-time campers — knots, fire, cooking, knife skills, and more.'

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: 'website',
})

export default function SkillsPage() {
  const categories = getPopulatedCategories()
  return (
    <main>
      <JsonLd
        data={collectionPageGraph({
          slug: PATH,
          title: TITLE,
          description: DESCRIPTION,
          items: categories.map((c) => ({
            name: c.label,
            url: `${SITE_URL}${PATH}/${c.slug}`,
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
      <CategoryGrid />
    </main>
  )
}
