import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Answer 5 quick questions',
      description:
        'Tell us about your experience level, your kids, what kind of trip you want, and what matters most to you. Takes about 2 minutes.',
    },
    {
      number: '02',
      title: 'Receive your personalized plan',
      description:
        "We match you to one of four plan templates built specifically for your family's situation. No generic advice.",
    },
    {
      number: '03',
      title: 'Follow it on your trip',
      description:
        'Your plan includes a full trip timeline, gear checklist, kid activities, and safety notes. Use it start to finish.',
    },
  ]

  return (
    <section className="py-28 bg-white">
      <div className="max-w-wide mx-auto px-6">

        <div className="max-w-content mx-auto mb-16 text-center">
          <p className="text-brand-green text-sm font-medium tracking-widest uppercase mb-4">
            How it works
          </p>
          <h2 className="font-serif text-4xl font-semibold text-stone-900">
            Three steps to your first camping trip.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-serif text-6xl font-semibold text-stone-200 block mb-5">
                {step.number}
              </span>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">
                {step.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 bg-stone-900 text-white hover:bg-stone-800 px-8 py-4 text-lg"
          >
            Start Your Trailstead Plan
          </Link>
        </div>

      </div>
    </section>
  )
}
