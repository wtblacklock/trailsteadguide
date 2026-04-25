import { getPopulatedCategories } from '@/lib/skills/helpers'
import { getSkillsByCategoryId } from '@/lib/skills/helpers'
import CategoryCard from './CategoryCard'

export default function CategoryGrid() {
  const categories = getPopulatedCategories()

  return (
    <section id="categories" className="max-w-page mx-auto px-6 py-12 md:py-16 scroll-mt-20">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-serif text-2xl md:text-3xl text-stone-900">Skill categories</h2>
        <p className="text-sm text-stone-500">{categories.length} categories</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            skillCount={getSkillsByCategoryId(cat.id).length}
          />
        ))}
      </div>
    </section>
  )
}
