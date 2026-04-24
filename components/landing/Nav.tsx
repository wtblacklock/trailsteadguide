import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-[#F5F3EE]/95 backdrop-blur-sm">
      <div className="max-w-page mx-auto px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Trailstead Guide home">
          <Image
            src="/images/logo_masthead.png"
            alt="Trailstead Guide"
            height={32}
            width={180}
            className="h-8 w-auto object-contain mix-blend-multiply"
            priority
          />
        </Link>
        <Link
          href="/quiz"
          className="text-sm font-medium bg-stone-900 text-white px-5 py-3 rounded-md hover:bg-stone-800 transition-colors"
        >
          Start Your Plan
        </Link>
      </div>
    </nav>
  )
}
