import Link from 'next/link'
import { pageMetadata, SITE_URL } from '@/lib/seo'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

export const metadata = pageMetadata({
  title: 'Camping Trip Planner',
  description:
    'Build a full family camping trip plan in 2 minutes. Timeline, gear, meals, and kid activities — all scaled to your family size and experience level.',
  path: '/tools/camping-trip-planner',
})

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: 'Trip Planner', url: `${SITE_URL}/tools/camping-trip-planner` },
        ]}
      />
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">Tool</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          The Camping Trip Planner
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Six questions. A complete trip plan. Built around your kids&apos; ages, your experience level, and how much time you actually have.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
          >
            Start the planner
          </Link>
          <Link
            href="/#example"
            className="inline-flex items-center justify-center rounded-md font-medium bg-transparent text-stone-900 ring-1 ring-stone-300 hover:bg-stone-100 transition-colors px-6 py-3 text-sm"
          >
            See a sample plan
          </Link>
        </div>
      </header>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Tell us about your family', text: 'Kid ages, party size, experience level.' },
            { step: '02', title: 'Pick the shape of the trip', text: 'How long, how ambitious, how far from home.' },
            { step: '03', title: 'Get the full plan', text: 'Timeline, gear, meals, activities — delivered in 2 minutes.' },
          ].map((s) => (
            <div key={s.step} className="p-8 rounded-2xl ring-1 ring-stone-200">
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">Step {s.step}</p>
              <h3 className="font-serif text-xl md:text-2xl font-medium text-stone-900 mb-3 tracking-tight">{s.title}</h3>
              <p className="text-stone-500 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-24">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">Before you start</p>
        <p className="text-stone-600 leading-relaxed max-w-2xl mb-4">
          If you&apos;ve never camped before, read <Link href="/guides/camping-for-beginners" className="underline underline-offset-4">Camping for Beginners</Link> first. It&apos;s 4 minutes and you&apos;ll get more out of the planner with that context.
        </p>
      </section>
    </main>
  )
}
