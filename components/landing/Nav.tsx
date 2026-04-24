import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-[#F5F3EE]/95 backdrop-blur-sm">
      <div className="max-w-page mx-auto px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-base font-medium text-stone-900 tracking-tight">
          Trailstead Guide
        </Link>
        <Link
          href="/quiz"
          className="text-sm font-medium bg-stone-900 text-white px-5 py-2.5 rounded-md hover:bg-stone-800 transition-colors"
        >
          Start Your Plan
        </Link>
      </div>
    </nav>
  )
}
