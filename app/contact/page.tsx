import ContactForm from '@/components/contact/ContactForm'
import JsonLd from '@/components/seo/JsonLd'
import { contactPageGraph, pageMetadata, SITE_URL } from '@/lib/seo'

const TITLE = 'Contact'
const DESCRIPTION =
  'Get in touch with Trailstead Guide. Reach out with feedback, press inquiries, partnership questions, or anything else.'

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contact',
})

const CONTACT_GRAPH = contactPageGraph({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contact',
  breadcrumbs: [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Contact', url: `${SITE_URL}/contact` },
  ],
})

export default function Page() {
  return (
    <main>
      <JsonLd data={CONTACT_GRAPH} />
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
