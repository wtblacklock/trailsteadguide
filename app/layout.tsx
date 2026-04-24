import type { Metadata } from 'next'
import { Figtree, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ChromeNav, ChromeFooter } from '@/components/landing/Chrome'
import ScrollRevealer from '@/components/landing/ScrollRevealer'
import PageTransition from '@/components/PageTransition'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL, SITE_NAME, siteGraph } from '@/lib/seo'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Trailstead Guide — Your First Family Camping Plan',
    template: '%s | Trailstead Guide',
  },
  description:
    'Answer 5 questions. Get a complete, personalized camping plan for your family. Built for first-timers.',
  applicationName: SITE_NAME,
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: 'Trailstead Guide — Your First Family Camping Plan',
    description:
      'Answer 5 questions. Get a complete, personalized camping plan for your family. Built for first-timers.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Trailstead Guide — plan your first family camping trip',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trailstead Guide — Your First Family Camping Plan',
    description:
      'Answer 5 questions. Get a complete, personalized camping plan for your family. Built for first-timers.',
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${sourceSerif4.variable}`}>
      <body className="font-sans">
        <JsonLd data={siteGraph()} />
        <ScrollRevealer />
        <ChromeNav />
        <PageTransition>{children}</PageTransition>
        <ChromeFooter />
        <Analytics />
      </body>
    </html>
  )
}
