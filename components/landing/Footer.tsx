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
            <Link href="/" aria-label="Trailstead Guide home" className="inline-block mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285.08 30.26" className="h-7 w-auto" aria-hidden="true" fill="#F5F3EE">
                <path d="M48.78,7.13h-3.68v-3.2h10.88v3.2h-3.68v19.21h-3.52V7.13Z"/>
                <path d="M62.16,3.93h5.22c3.65,0,5.22,1.7,5.22,5.15v1.38c0,2.31-.74,3.78-2.3,4.42v.06c1.76.54,2.34,2.21,2.34,4.74v3.94c0,1.09.03,1.89.38,2.72h-3.59c-.19-.58-.32-.93-.32-2.75v-4.1c0-2.08-.61-2.75-2.21-2.75h-1.22v9.6h-3.52V3.93ZM66.96,13.53c1.31,0,2.11-.58,2.11-2.37v-1.73c0-1.6-.54-2.31-1.79-2.31h-1.6v6.4h1.28Z"/>
                <path d="M96.86,3.93h3.52v22.41h-3.52V3.93Z"/>
                <path d="M86.4,14.77l2.49,2.49-7.2,7.2-2.49-2.49,7.2-7.2Z"/>
                <path d="M178.79,14.77l2.49,2.49-7.2,7.2-2.49-2.49,7.2-7.2Z"/>
                <path d="M107.49,3.93h3.52v19.21h5.79v3.2h-9.32V3.93Z"/>
                <path d="M122.38,21.02v-1.28h3.33v1.54c0,1.6.7,2.18,1.82,2.18s1.82-.58,1.82-2.24c0-1.86-.7-3.04-3.01-5.06-2.95-2.59-3.91-4.42-3.91-6.98,0-3.52,1.83-5.57,5.25-5.57s5.12,2.05,5.12,5.63v.93h-3.33v-1.15c0-1.6-.64-2.21-1.76-2.21s-1.76.61-1.76,2.15c0,1.63.74,2.82,3.04,4.83,2.95,2.59,3.87,4.39,3.87,7.17,0,3.65-1.86,5.7-5.31,5.7s-5.19-2.05-5.19-5.63Z"/>
                <path d="M142.13,7.13h-3.68v-3.2h10.88v3.2h-3.68v19.21h-3.52V7.13Z"/>
                <path d="M155.52,3.93h9.6v3.2h-6.08v5.92h4.83v3.2h-4.83v6.88h6.08v3.2h-9.6V3.93Z"/>
                <path d="M175.05,18.91l-1.1,7.43h-3.27l3.65-22.41h4.77l3.65,22.41h-3.52l-1.09-7.43h-3.1ZM178.15,18.91l-1.54-11.07h-.06l-1.5,11.07h3.1Z"/>
                <path d="M82.9,18.91l-1.1,7.43h-3.27l3.65-22.41h4.77l3.65,22.41h-3.52l-1.09-7.43h-3.1ZM86,18.91l-1.54-11.07h-.06l-1.5,11.07h3.1Z"/>
                <path d="M188.94,3.93h5.38c3.52,0,5.25,1.95,5.25,5.54v11.33c0,3.59-1.73,5.54-5.25,5.54h-5.38V3.93ZM194.25,23.14c1.12,0,1.79-.58,1.79-2.18v-11.65c0-1.6-.67-2.18-1.79-2.18h-1.79v16.01h1.79Z"/>
                <path d="M212.76,21.02v-11.78c0-3.59,1.79-5.63,5.25-5.63s5.25,2.05,5.25,5.63v1.92h-3.33v-2.14c0-1.6-.7-2.21-1.83-2.21s-1.82.61-1.82,2.21v12.26c0,1.6.7,2.18,1.82,2.18s1.83-.58,1.83-2.18v-4.39h-1.76v-3.2h5.09v7.33c0,3.59-1.79,5.63-5.25,5.63s-5.25-2.05-5.25-5.63Z"/>
                <path d="M229.89,21.02V3.93h3.52v17.35c0,1.6.67,2.18,1.79,2.18s1.79-.58,1.79-2.18V3.93h3.39v17.1c0,3.59-1.79,5.63-5.25,5.63s-5.25-2.05-5.25-5.63Z"/>
                <path d="M247.37,3.93h3.52v22.41h-3.52V3.93Z"/>
                <path d="M258,3.93h5.38c3.52,0,5.25,1.95,5.25,5.54v11.33c0,3.59-1.73,5.54-5.25,5.54h-5.38V3.93ZM263.31,23.14c1.12,0,1.79-.58,1.79-2.18v-11.65c0-1.6-.67-2.18-1.79-2.18h-1.79v16.01h1.79Z"/>
                <path d="M275.48,3.93h9.6v3.2h-6.08v5.92h4.83v3.2h-4.83v6.88h6.08v3.2h-9.6V3.93Z"/>
                <polygon points="23.41 9.48 7.37 26.5 26.76 26.55 26.76 22.19 16.15 22.17 19.83 18.24 30.61 18.24 30.6 30.26 .04 30.26 0 0 30.6 0 30.61 14.78 26.77 14.77 26.76 3.7 3.88 3.69 3.91 23.89 20.38 6.76 23.42 6.76 23.41 9.48"/>
                <polygon points="10.1 9.85 13.11 9.85 16.47 6.5 6.74 6.5 6.74 16.22 10.1 12.85 10.1 9.85"/>
              </svg>
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
