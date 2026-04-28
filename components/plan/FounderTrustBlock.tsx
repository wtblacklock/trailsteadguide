import Image from 'next/image'
import Link from 'next/link'
import { AUTHOR_IMAGE, AUTHOR_NAME } from '@/lib/seo'

/**
 * Restrained pre-purchase trust block — sits just above the Trip Pack CTA so
 * the founder's credentials reduce friction at the buying moment.
 */
export default function FounderTrustBlock() {
  return (
    <section className="pt-8">
      <div className="max-w-content mx-auto px-6">
        <div className="rounded-2xl bg-amber-50/60 ring-1 ring-amber-100 px-5 py-4 flex items-center gap-4">
          <div className="relative h-8 w-8 rounded-full overflow-hidden bg-stone-200 ring-1 ring-stone-300 shrink-0">
            <Image
              src={AUTHOR_IMAGE}
              alt={`${AUTHOR_NAME} portrait`}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <p className="text-sm text-stone-700 leading-snug flex-1">
            Built by {AUTHOR_NAME} — Eagle Scout, Wood Badge Antelope, three kids in Austin.
          </p>
          <Link
            href="/about#author"
            className="text-sm font-medium text-emerald-800 hover:text-emerald-900 whitespace-nowrap shrink-0"
          >
            About William &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
