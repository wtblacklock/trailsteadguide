import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Answer 5 quick questions',
      description: 'Tell us about your experience level, your kids, what kind of trip you want, and what matters most to you. Takes about 2 minutes.',
    },
    {
      number: '02',
      title: 'Receive your personalized plan',
      description: "We match you to one of four plan templates built specifically for your family's situation — not generic camping advice.",
    },
    {
      number: '03',
      title: 'Follow it on your trip',
      description: 'Your plan includes a full trip timeline, gear checklist, kid activities, and safety notes. Use it start to finish.',
    },
  ]

  return (
    <section className="py-16 md:py-36 max-w-page mx-auto px-8">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 md:mb-20">
        <div className="col-span-1 md:col-span-5">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-950 tracking-tight">
            Three steps to your first camping trip.
          </h2>
        </div>
      </div>

      {/* Steps */}
      <div>
        {steps.map((step) => (
          <div key={step.number} className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-10 border-t border-stone-200">
            <div className="col-span-1">
              <span className="font-serif text-stone-300 text-lg">{step.number}</span>
            </div>
            <div className="col-span-11 md:col-span-4">
              <h3 className="font-serif text-xl md:text-2xl font-medium text-stone-900 leading-snug">{step.title}</h3>
            </div>
            <div className="col-span-11 col-start-2 md:col-span-5 md:col-start-7">
              <p className="text-stone-500 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
        <div className="border-t border-stone-200" />
      </div>

      {/* CTA */}
      <div className="mt-16">
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-8 py-4 text-base"
        >
          Start Your Trailstead Plan
        </Link>
      </div>
    </section>
  )
}
