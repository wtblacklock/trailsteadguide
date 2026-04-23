import Image from 'next/image'

export default function TrustSection() {
  const points = [
    {
      title: 'Built for first-timers',
      description:
        "Every plan assumes you haven't done this before. No assumed knowledge. No jargon. No \"just grab your trekking poles.\"",
    },
    {
      title: 'Reduces real mistakes',
      description:
        'Overpacking, arriving too late, no plan for kids, food storage errors — the common first-trip failures are baked out of every template.',
    },
    {
      title: 'Not a gear blog',
      description:
        "We don't review 14 tent brands. We tell you which one to get for your situation, and link directly to it.",
    },
    {
      title: 'Structured, not inspirational',
      description:
        "Other sites show you beautiful camping photography. We give you a step-by-step plan. Those are different things.",
    },
  ]

  return (
    <section className="py-28 bg-white">
      <div className="max-w-wide mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-brand-green text-sm font-medium tracking-widest uppercase mb-4">
              Why Trailstead
            </p>
            <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-10">
              Designed for families who want a plan, not a hobby.
            </h2>
            <div className="space-y-8">
              {points.map((point) => (
                <div key={point.title}>
                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1559521783-1d1599583485?w=800&auto=format&fit=crop&q=80"
              alt="Children playing near a tent while parents set up camp"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

        </div>
      </div>
    </section>
  )
}
