import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section data-reveal className="py-16 md:py-32 max-w-page mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <div className="col-span-1 md:col-span-7">
          <h2 className="font-serif text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
            Ready to stop guessing?
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-8 py-4 text-base"
            >
              Start Your Camping Plan
            </Link>
            <Link
              href="/guides"
              className="text-base text-stone-500 hover:text-stone-700 transition-colors underline underline-offset-4"
            >
              Explore Guides
            </Link>
          </div>
        </div>
        <div className="col-span-1 md:col-span-4 md:col-start-9 flex items-end pb-1">
          <p className="text-stone-500 leading-relaxed">
            A few questions. A complete plan — timeline, gear, meals, kid activities, and safety guidance.
          </p>
        </div>
      </div>
    </section>
  )
}
