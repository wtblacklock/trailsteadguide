import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works — Trailstead Guide',
  description: 'How the Trailstead planner turns 5 questions into a complete camping trip plan.',
}

const steps = [
  {
    n: '01',
    title: 'Answer 5 questions',
    body: 'Kid ages, party size, experience level, trip length, and how far you want to drive. About 2 minutes.',
  },
  {
    n: '02',
    title: 'We match you to a template',
    body: 'We have four plan templates — Backyard Test, First Night Camp, First Weekend Camp, and Easy Family Basecamp — tuned for different comfort levels.',
  },
  {
    n: '03',
    title: 'The plan is scaled to your family',
    body: 'Meal quantities, gear quantities, and activity suggestions adjust based on how many adults and kids you have.',
  },
  {
    n: '04',
    title: 'You get everything on one page',
    body: 'Hour-by-hour timeline, gear list, kid activities, meal plan, shopping list, and safety notes. Print it or save the link.',
  },
]

export default function Page() {
  return (
    <main>
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">How it works</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Five questions. One complete plan.
        </h1>
      </header>

      <section className="max-w-page mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {steps.map((s) => (
            <div key={s.n} className="p-8 rounded-2xl ring-1 ring-stone-200">
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">Step {s.n}</p>
              <h3 className="font-serif text-2xl font-medium text-stone-900 tracking-tight mb-3">{s.title}</h3>
              <p className="text-stone-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-4">
            What&apos;s in a plan
          </h2>
          <ul className="space-y-3 text-stone-700 leading-relaxed text-lg">
            <li>Hour-by-hour trip timeline (packing, driving, setup, meals, bedtime)</li>
            <li>Complete gear list grouped by category</li>
            <li>Meal plan with a shopping list scaled to your party size</li>
            <li>Age-appropriate activity suggestions for every kid in your group</li>
            <li>Safety notes — what to watch for, what to pre-brief the kids on</li>
          </ul>
          <div className="mt-10">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
