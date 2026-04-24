import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata, faqPageGraph, SITE_URL } from '@/lib/seo'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

export const metadata = pageMetadata({
  title: 'FAQ',
  description:
    'Answers to common questions about the Trailstead camping planner, guides, gear recommendations, and how we build plans for first-time families.',
  path: '/faq',
})

const FAQ_ITEMS = [
  {
    q: 'Is Trailstead Guide free?',
    a: 'Yes. The planner, the guides, and the gear recommendations are free. We earn small commissions on some gear links, which funds the writing.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. Answer the 5 questions and the plan is yours — no login, no email required to see it.',
  },
  {
    q: 'Can I save my plan?',
    a: 'Yes — bookmark the URL or print the page. We also offer an optional email capture at the end if you want it sent to you.',
  },
  {
    q: 'What if my kids are different ages?',
    a: 'The planner uses the age of your youngest child as the pacing anchor, and then adds age-appropriate activities for each kid in your group.',
  },
  {
    q: 'What if I\'ve camped before?',
    a: 'Trailstead is tuned for first-time families. If you\'ve done 5+ trips, you\'ll find it too basic. Send it to a friend who hasn\'t.',
  },
  {
    q: 'Do you recommend specific campgrounds?',
    a: 'Not yet. Right now we help you structure the trip — campground selection is on the roadmap.',
  },
  {
    q: 'Can I trust the gear recommendations?',
    a: 'We only recommend gear we\'ve personally used with our own families. Some links are affiliate links; we disclose this on every gear page.',
  },
  {
    q: 'What\'s your refund policy?',
    a: 'Everything here is free, so there\'s nothing to refund. If we ever sell anything, it will have a 30-day no-questions-asked refund policy.',
  },
]

export default function Page() {
  return (
    <main>
      <JsonLd data={faqPageGraph(FAQ_ITEMS)} />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'FAQ', url: `${SITE_URL}/faq` },
        ]}
      />
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">FAQ</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Questions, answered.
        </h1>
      </header>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-3xl">
          {FAQ_ITEMS.map((f) => (
            <div key={f.q} className="border-t border-stone-200 py-8">
              <h2 className="font-serif text-xl md:text-2xl font-medium text-stone-900 tracking-tight mb-3">
                {f.q}
              </h2>
              <p className="text-stone-600 leading-relaxed text-base md:text-lg">{f.a}</p>
            </div>
          ))}
          <div className="border-t border-stone-200 pt-8">
            <p className="text-stone-600 leading-relaxed">
              Didn&apos;t find your answer? <Link href="/contact" className="underline underline-offset-4">Get in touch</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
