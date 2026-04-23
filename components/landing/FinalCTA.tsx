import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-32 bg-stone-900">
      <div className="max-w-content mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-6">
          Your first camping trip starts here.
        </h2>
        <p className="text-stone-400 text-xl leading-relaxed mb-10 max-w-lg mx-auto">
          Answer 5 questions. Get a complete, personalized trip plan — timeline, gear list, kid activities, and safety guidance. About 2 minutes.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 bg-white text-stone-900 hover:bg-stone-100 px-8 py-4 text-lg"
        >
          Start Your Trailstead Plan
        </Link>
        <p className="text-stone-600 text-sm mt-6">
          Free · No account required
        </p>
      </div>
    </section>
  )
}
