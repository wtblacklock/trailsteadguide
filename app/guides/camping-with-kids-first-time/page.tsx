import { GuidePage } from '@/components/guide/GuidePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Camping With Kids for the First Time — Trailstead Guide',
  description: 'What changes when kids come along — and how to build a trip they actually enjoy.',
}

export default function Page() {
  return (
    <GuidePage
      slug="camping-with-kids-first-time"
      eyebrow="With kids"
      title="Camping With Kids for the First Time"
      lede="Camping with kids is a different activity than camping without them. Here&apos;s what actually changes — and what to plan for."
      heroImage={{
        src: 'https://images.unsplash.com/photo-1674230316788-d9c8b92f0d63?w=1400&auto=format&fit=crop&q=80',
        alt: 'Two young girls standing next to a tent at their campsite',
      }}
    >
      <h2>The core rule</h2>
      <p>
        A camping trip with kids is not a camping trip plus kids. It&apos;s a <strong>kid activity set in the outdoors.</strong> Plan it like you would any other kid weekend: what will they do every hour they&apos;re awake? Nature doesn&apos;t auto-entertain kids.
      </p>

      <h2>Scale the trip to the youngest kid</h2>
      <ul>
        <li>Under 4: one night max, drive-up site, near-by bathroom</li>
        <li>4–7: one or two nights, short nature walks, structured activities</li>
        <li>8–12: two nights fine, can help with chores, can hike farther</li>
      </ul>

      <h2>Sleep is the hardest part</h2>
      <ul>
        <li>Kids sleep in familiar pajamas, in their own sleeping bag</li>
        <li>Bring the actual bedtime book they read at home</li>
        <li>Expect a rough first night. Plan nothing ambitious for day 1.</li>
        <li>Give them a glow stick so the tent doesn&apos;t feel pitch dark</li>
      </ul>

      <h2>Activities: plan 3 per day</h2>
      <ul>
        <li><strong>Morning:</strong> nature walk with a scavenger hunt list</li>
        <li><strong>Afternoon:</strong> something quiet at the site — bark rubbings, rock painting, reading</li>
        <li><strong>Evening:</strong> fire + s&apos;mores + ghost stories</li>
      </ul>

      <h2>Food rules</h2>
      <ul>
        <li>Bring one meal you know every kid will eat, even if it&apos;s boring</li>
        <li>Don&apos;t debut new food at camp</li>
        <li>Snacks are the most important gear category. Over-pack them.</li>
      </ul>

      <h2>Safety conversations to have in advance</h2>
      <ul>
        <li>Show them the site number. They need to know how to get back.</li>
        <li>Give each kid a whistle and tell them: 3 blasts = come find me</li>
        <li>The &quot;stop where you are&quot; rule if they get lost — we come to them</li>
        <li>Never touch or eat anything without asking</li>
      </ul>

      <p>
        The goal for the first trip is not to create a transcendent nature experience. It&apos;s for them to leave saying &quot;when can we go camping again?&quot; That&apos;s a very low bar — and a structured plan clears it easily.
      </p>
    </GuidePage>
  )
}
