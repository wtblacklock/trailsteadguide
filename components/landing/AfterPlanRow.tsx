import Link from 'next/link'

const CARDS = [
  {
    eyebrow: 'Skills',
    title: 'Camp Skills Made Simple',
    description: 'Short, beginner-friendly walkthroughs of the moves your plan assumes you can do — pitching a tent, starting a fire, tying a taut-line.',
    href: '/skills',
    cta: 'Browse skills',
  },
  {
    eyebrow: 'Activities',
    title: 'Camp Activities & Games',
    description: 'Age-appropriate games and challenges that keep kids engaged at camp — pulled into every plan automatically.',
    href: '/activities',
    cta: 'Browse activities',
  },
]

export default function AfterPlanRow() {
  return (
    <section data-reveal className="py-16 md:py-32 max-w-page mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 md:mb-16">
        <div className="col-span-1 md:col-span-5">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-950 tracking-tight leading-tight">
            After you have your plan.
          </h2>
        </div>
        <div className="col-span-1 md:col-span-5 md:col-start-7 flex items-end mt-4 md:mt-0">
          <p className="text-stone-500 text-lg leading-relaxed">
            Build the camp skills your plan calls for and pull from a library of kid-tested activities.
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARDS.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="group block h-full p-8 md:p-10 rounded-2xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
                {card.eyebrow}
              </p>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
                {card.title}
              </h3>
              <p className="text-stone-600 leading-relaxed mb-8">{card.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                {card.cta}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
