import Image from 'next/image'

export default function TrustSection() {
  const points = [
    {
      title: 'Built for first-timers',
      description: "Every plan assumes you haven't done this before. No assumed knowledge. No jargon.",
    },
    {
      title: 'Reduces real mistakes',
      description: 'Overpacking, arriving too late, no plan for kids — the common first-trip failures are baked out of every template.',
    },
    {
      title: 'Not a gear blog',
      description: "We don't review 14 tent brands. We tell you which one to get for your situation.",
    },
    {
      title: 'Structured, not inspirational',
      description: "Other sites show you beautiful camping photography. We give you a step-by-step plan. Those are different things.",
    },
  ]

  return (
    <section className="py-36 max-w-page mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: heading + trust points */}
        <div className="col-span-1 md:col-span-6">
          <h2 className="font-serif text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-tight mb-16">
            Designed for families who want a plan, not a hobby.
          </h2>
          <div>
            {points.map((point) => (
              <div key={point.title} className="py-6 border-t border-stone-200">
                <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">{point.title}</h3>
                <p className="text-stone-500 leading-relaxed">{point.description}</p>
              </div>
            ))}
            <div className="border-t border-stone-200" />
          </div>
        </div>

        {/* Right: tall image */}
        <div className="col-span-1 md:col-span-5 md:col-start-8">
          <div className="relative h-full min-h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80"
              alt="Family hiking together on a mountain trail"
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
