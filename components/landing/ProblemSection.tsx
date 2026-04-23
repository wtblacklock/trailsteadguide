export default function ProblemSection() {
  const problems = [
    {
      title: 'The gear spiral',
      description:
        'You start researching tents and find 200 options. Then sleeping bags. Then stoves. Three hours later you have 47 browser tabs and no plan.',
    },
    {
      title: 'Setup confusion',
      description:
        "You arrive at the campsite at 4pm. The tent instructions make no sense. It's getting dark. Kids are hungry. Sound familiar?",
    },
    {
      title: 'Kid boredom',
      description:
        "Adults are setting up. Kids have nothing to do. Within 20 minutes someone is crying. The trip hasn't started yet.",
    },
    {
      title: 'No structure',
      description:
        "There's no plan for the evening. No plan for the morning. It drifts into chaos. You swear you'll never do this again.",
    },
  ]

  return (
    <section className="py-28 bg-white">
      <div className="max-w-wide mx-auto px-6">
        <div className="max-w-content mx-auto mb-16">
          <p className="text-brand-green text-sm font-medium tracking-widest uppercase mb-4">
            The real problem
          </p>
          <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-5">
            Family camping fails the same way every time.
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            It&apos;s not that camping is hard. It&apos;s that first-time families have no structured starting point. The internet gives you gear reviews and inspiration photography. Nobody gives you a step-by-step plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem) => (
            <div key={problem.title} className="flex gap-5">
              <div className="flex-shrink-0 w-1 bg-stone-200 rounded-full" />
              <div>
                <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
                  {problem.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">{problem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
