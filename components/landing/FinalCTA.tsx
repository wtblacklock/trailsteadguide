import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section data-reveal className="px-8 pb-24">
      <div className="bg-stone-900 rounded-3xl p-10 md:p-16 text-white">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">
          Ready to stop guessing
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight mb-4 max-w-2xl">
          Get a starter trip plan in 5 seconds.
        </h2>
        <p className="text-stone-300 text-lg mb-8 max-w-xl">
          A few questions. A complete plan — timeline, gear, meals, kid activities, and safety guidance.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center rounded-md font-medium bg-white text-stone-900 hover:bg-stone-100 transition-colors px-6 py-3 text-sm"
        >
          Start the quiz
        </Link>
      </div>
    </section>
  )
}
