import type { Metadata } from 'next'
import { Figtree, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'
import PreLoader from '@/components/landing/PreLoader'
import ScrollRevealer from '@/components/landing/ScrollRevealer'

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
        <PreLoader />
        <ScrollRevealer />
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
