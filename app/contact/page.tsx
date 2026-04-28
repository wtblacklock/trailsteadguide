import ContactForm from '@/components/contact/ContactForm'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Trailstead Guide. Reach out with feedback, press inquiries, partnership questions, or anything else.',
  path: '/contact',
})

export default function Page() {
  return (
    <main>
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">Contact</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Say hi.
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-stone-600 leading-[1.55] font-light">
          Feedback, press, partnerships, or something on the site that&rsquo;s broken — we read every message and reply within 48 hours.
        </p>
      </header>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
