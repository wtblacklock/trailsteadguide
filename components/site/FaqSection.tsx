import JsonLd from '@/components/seo/JsonLd'
import { faqPageGraph } from '@/lib/seo'

export type FaqItem = {
  question: string
  answer: string
}

export type FaqSectionProps = {
  items: FaqItem[]
  title?: string
}

export default function FaqSection({
  items,
  title = 'Frequently asked questions',
}: FaqSectionProps) {
  if (items.length === 0) return null

  return (
    <section className="max-w-page mx-auto px-8 py-16 md:py-20">
      <JsonLd data={faqPageGraph(items.map((i) => ({ q: i.question, a: i.answer })))} />
      <div className="max-w-3xl">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-8">
          {title}
        </h2>
        <dl>
          {items.map((item) => (
            <div key={item.question} className="border-t border-stone-200 py-8">
              <dt>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-stone-900 tracking-tight">
                  {item.question}
                </h3>
              </dt>
              <dd className="mt-3 text-stone-600 leading-relaxed text-base md:text-lg">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
