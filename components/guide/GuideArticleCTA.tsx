import Link from 'next/link'

/**
 * Standardized end-of-article CTA block for every guide page. Renders the
 * quiz as the primary path forward, with the full gear setup as a quiet
 * tertiary link. Designed to sit immediately above <RelatedGuides>.
 */
export default function GuideArticleCTA() {
  return (
    <section className="max-w-3xl mx-auto px-8 mt-20 mb-4">
      <div className="rounded-2xl ring-1 ring-stone-200 bg-white p-8 md:p-10 shadow-sm">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-3">
          Make it yours
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3 max-w-xl">
          Get Your Personalized Camping Plan.
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-7 max-w-xl">
          Answer 6 questions and we&apos;ll match the timeline, gear, and meals to your party, your dates, and where you&apos;re going.
        </p>

        <div className="mb-6">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-brand-green text-white hover:bg-brand-green-light transition-colors px-6 py-3 text-sm shadow-sm"
          >
            Take the Camping Quiz
          </Link>
        </div>

        <p className="text-sm text-stone-500">
          Or{' '}
          <Link
            href="/gear"
            className="text-stone-700 underline underline-offset-4 hover:text-brand-green transition-colors"
          >
            see the full gear setup
          </Link>{' '}
          first.
        </p>
      </div>
    </section>
  )
}
