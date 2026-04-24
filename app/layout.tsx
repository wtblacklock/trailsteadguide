import type { Metadata } from 'next'
import { Figtree, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ChromeNav, ChromeFooter } from '@/components/landing/Chrome'
import ScrollRevealer from '@/components/landing/ScrollRevealer'
import PageTransition from '@/components/PageTransition'

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
  title: 'Trailstead Guide — Your First Family Camping Plan',
  description: 'Answer 5 questions. Get a complete, personalized camping plan for your family. Built for first-timers.',
  icons: {
    icon: '/images/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${sourceSerif4.variable}`}>
      <body className="font-sans">
        <ScrollRevealer />
        <ChromeNav />
        <PageTransition>{children}</PageTransition>
        <ChromeFooter />
        <Analytics />
      </body>
    </html>
  )
}
