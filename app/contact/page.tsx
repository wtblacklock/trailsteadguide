import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Trailstead Guide. Reach out with feedback, press inquiries, partnership questions, or gear we should look at for our families.',
  path: '/contact',
})

export default function Page() {
  return (
    <main>
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">Contact</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Say hi.
        </h1>
      </header>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-2xl prose-guide">
          <p>
            The fastest way to reach us is email:{' '}
            <a href="mailto:hello@trailsteadguide.com">hello@trailsteadguide.com</a>.
          </p>
          <p>
            We read every message. We try to respond within 2 business days. If you&apos;re writing because something on the site is broken — thank you, please include the URL and what happened.
          </p>
          <h2>Partnerships &amp; gear</h2>
          <p>
            If you make gear and want us to look at it: we&apos;re slow but honest. Send details to{' '}
            <a href="mailto:gear@trailsteadguide.com">gear@trailsteadguide.com</a>.
          </p>
          <h2>Press</h2>
          <p>
            For press inquiries, reach us at{' '}
            <a href="mailto:press@trailsteadguide.com">press@trailsteadguide.com</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
