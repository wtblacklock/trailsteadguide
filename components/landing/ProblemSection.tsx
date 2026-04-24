export default function ProblemSection() {
  const problems = [
    {
      number: '01',
      title: 'The gear spiral',
      description: 'You start researching tents and find 200 options. Three hours later you have 47 browser tabs and no plan.',
    },
    {
      number: '02',
      title: 'Setup confusion',
      description: "You arrive at the campsite at 4pm. The tent instructions make no sense. It's getting dark. Kids are hungry.",
    },
    {
      number: '03',
      title: 'Kid boredom',
      description: "Adults are setting up. Kids have nothing to do. Within 20 minutes someone is crying. The trip hasn't started yet.",
    },
    {
      number: '04',
      title: 'No structure',
      description: "There's no plan for the evening. No plan for the morning. It drifts into chaos.",
    },
  ]

  return (
    <section className="py-36 max-w-page mx-auto px-8">
      {/* Section statement */}
      <div className="grid grid-cols-12 gap-6 mb-20">
        <div className="col-span-5">
          <h2 className="font-serif text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-tight">
            Family camping fails the same way every time.
          </h2>
        </div>
        <div className="col-span-5 col-start-7 flex items-end">
          <p className="text-stone-500 text-lg leading-relaxed">
            It&apos;s not that camping is hard. It&apos;s that first-time families have no structured starting point. Nobody gives you a step-by-step plan.
          </p>
        </div>
      </div>

      {/* Problem rows */}
      <div>
        {problems.map((problem) => (
          <div key={problem.number} className="grid grid-cols-12 gap-6 py-8 border-t border-stone-200">
            <div className="col-span-1">
              <span className="font-serif text-stone-300 text-lg">{problem.number}</span>
            </div>
            <div className="col-span-3">
              <h3 className="font-serif text-xl font-medium text-stone-900">{problem.title}</h3>
            </div>
            <div className="col-span-6 col-start-6">
              <p className="text-stone-500 leading-relaxed">{problem.description}</p>
            </div>
          </div>
        ))}
        <div className="border-t border-stone-200" />
      </div>
    </section>
  )
}
