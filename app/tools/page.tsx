import Link from 'next/link'
import { TOOL_LINKS } from '@/lib/nav-config'
import { pageMetadata, SITE_URL } from '@/lib/seo'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

export const metadata = pageMetadata({
  title: 'Camping Tools',
  description:
    'Free, simple tools to help you plan your first family camping trip — a full trip planner and a personalized packing checklist generator.',
  path: '/tools',
})

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Tools', url: `${SITE_URL}/tools` },
        ]}
      />
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">Tools</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Fast, simple, useful.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Two tools that do one thing well: help you stop staring at a blank page and start planning.
        </p>
        <p className="mt-4 text-base text-stone-500 leading-relaxed max-w-2xl">
          The trip planner turns 6 quick questions into a full itinerary — timeline, gear list, meals, and activities — built for your specific party and dates. The packing checklist generator scales every item to your group size and number of nights so nothing gets left behind. Both are free, no account needed.
        </p>
      </header>

      <section className="max-w-page mx-auto px-8 pb-24">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOOL_LINKS.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="block p-8 rounded-2xl ring-1 ring-stone-200 hover:bg-stone-100 transition-colors h-full"
              >
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-stone-900 mb-3 tracking-tight">
                  {tool.label}
                </h2>
                {tool.description && (
                  <p className="text-stone-500 leading-relaxed">{tool.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
