import type { ReactNode } from 'react'

export function LegalPage({
  eyebrow = 'Legal',
  title,
  updated,
  children,
}: {
  eyebrow?: string
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <main>
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">{eyebrow}</p>
        <h1 className="font-serif text-4xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          {title}
        </h1>
        <p className="mt-4 text-stone-500 text-sm">Last updated: {updated}</p>
      </header>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-2xl prose-guide">
          {children}
        </div>
      </section>
    </main>
  )
}
