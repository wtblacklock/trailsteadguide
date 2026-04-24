import Image from 'next/image'
import Link from 'next/link'

const links = [
  { label: 'Start Your Plan', href: '/quiz' },
  { label: 'See Example Plan', href: '/#example' },
]


export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      {/* Main footer body */}
      <div className="max-w-page mx-auto px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6">

          {/* Brand column */}
          <div className="col-span-1 md:col-span-5">
            <Link href="/" aria-label="Trailstead Guide home">
              <Image
                src="/images/trailsteadguide_logo.svg"
                alt="Trailstead Guide"
                height={28}
                width={160}
                className="h-7 w-auto object-contain invert mb-6"
              />
            </Link>
            <p className="text-stone-400 leading-relaxed max-w-xs">
              A step-by-step camping system for families doing it for the first time. Built around your kids&apos; ages, your anxiety level, and your actual schedule.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-4" />

          {/* Links */}
          <div className="col-span-1 md:col-span-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-5">Get started</p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-page mx-auto px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} Trailstead Guide. All rights reserved.
          </p>
          <p className="text-stone-600 text-xs max-w-sm text-left sm:text-right">
            Some links on this site are affiliate links. We may earn a small commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  )
}
