import Link from 'next/link'
import type { Metadata } from 'next'
import { TOOL_LINKS } from '@/lib/nav-config'

export const metadata: Metadata = {
  title: 'Camping Tools — Trailstead Guide',
  description: 'Free, simple tools to help you plan your first family camping trip.',
}

export default function Page() {
  return (
    <main>
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">Tools</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Fast, simple, useful.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Two tools that do one thing well: help you stop staring at a blank page and start planning.
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
