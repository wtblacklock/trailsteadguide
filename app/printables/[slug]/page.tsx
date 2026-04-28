import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import PrintableEmailGate from '@/components/printables/PrintableEmailGate'
import { pageMetadata, printableCreativeWorkGraph, SITE_URL } from '@/lib/seo'
import { PRINTABLES, getPrintableBySlug } from '@/lib/printables'

export function generateStaticParams() {
  return PRINTABLES.map((p) => ({ slug: p.slug }))
}

type Params = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const printable = getPrintableBySlug(slug)
  if (!printable) return {}
  return pageMetadata({
    title: `${printable.title} — Free Printable`,
    description: printable.description,
    path: `/printables/${printable.slug}`,
  })
}

export default async function PrintablePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const printable = getPrintableBySlug(slug)
  if (!printable) notFound()

  const path = `/printables/${printable.slug}`
  const printHref = `${path}/print`

  return (
    <main>
      <JsonLd
        data={printableCreativeWorkGraph({
          slug: path,
          name: printable.title,
          description: printable.description,
          fileFormat: 'text/html',
          datePublished: printable.datePublished,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Printables', url: `${SITE_URL}/printables` },
            { name: printable.title, url: `${SITE_URL}${path}` },
          ],
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Printables', url: `${SITE_URL}/printables` },
          { name: printable.title, url: `${SITE_URL}${path}` },
        ]}
      />

      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">
          <Link href="/printables" className="hover:text-stone-900 transition-colors">
            ← Printables
          </Link>
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          {printable.title}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          {printable.tagline}
        </p>
        <p className="mt-4 text-sm text-stone-500">{printable.formatNote}</p>
      </header>

      <section className="max-w-page mx-auto px-8 pb-16">
        {/*
          Two-column layout: a wider editorial body on the left, a narrower
          sticky sidebar on the right with the email gate + pair-with card.
          The lg breakpoint kicks in around 1024px so the sidebar only
          appears alongside the body once there's room — below that it
          stacks underneath, which keeps the email gate prominent on
          mobile without crowding the body copy.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-20 max-w-6xl">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight mb-5">
              What you get
            </h2>
            <ul className="space-y-3 text-stone-700 leading-relaxed">
              {printable.whatYouGet.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-stone-400 mt-[2px]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight mt-10 mb-5">
              Use it for
            </h2>
            <ul className="space-y-3 text-stone-700 leading-relaxed">
              {printable.useCases.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-stone-400 mt-[2px]">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <PrintableEmailGate
              printableSlug={printable.slug}
              printHref={printHref}
            />

            {(printable.relatedSkillPath || printable.relatedGuideSlug) && (
              <div className="rounded-2xl ring-1 ring-stone-200 p-6 md:p-7">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
                  Pair with
                </p>
                <ul className="space-y-2 text-stone-700">
                  {printable.relatedSkillPath && (
                    <li>
                      <Link
                        href={`/skills/${printable.relatedSkillPath}`}
                        className="underline decoration-stone-300 underline-offset-4 hover:text-stone-900 transition-colors"
                      >
                        Skill: how to read this in the field
                      </Link>
                    </li>
                  )}
                  {printable.relatedGuideSlug && (
                    <li>
                      <Link
                        href={`/guides/${printable.relatedGuideSlug}`}
                        className="underline decoration-stone-300 underline-offset-4 hover:text-stone-900 transition-colors"
                      >
                        Guide: where to use it on a first trip
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="bg-stone-900 rounded-3xl p-10 md:p-16 text-white max-w-4xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">
            Want a real plan too
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight mb-4 max-w-2xl">
            Get a starter trip plan in 60 seconds.
          </h2>
          <p className="text-stone-300 text-lg mb-8 max-w-xl">
            The printable is a great companion. Pair it with a structured plan — timeline, gear, meals, kid activities — built around your party and dates.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-white text-stone-900 hover:bg-stone-100 transition-colors px-6 py-3 text-sm"
          >
            Start the quiz
          </Link>
        </div>
      </section>
    </main>
  )
}
