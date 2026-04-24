import { LegalPage } from '@/components/legal/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Affiliate Disclosure',
  description:
    'How Trailstead Guide earns from affiliate links — Amazon Associates and select outdoor retailers — and how that does not influence what we recommend.',
  path: '/affiliate-disclosure',
})

export default function Page() {
  return (
    <LegalPage title="Affiliate Disclosure" updated="April 24, 2026">
      <h2>The short version</h2>
      <p>
        Some links on this site are affiliate links. If you click one and buy something, we earn a small commission at no extra cost to you. This is a major part of how we fund the site.
      </p>
      <h2>The longer version</h2>
      <p>
        Trailstead Guide is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
      </p>
      <p>
        We also participate in affiliate programs with select outdoor retailers (such as REI, Backcountry, and Public Lands). All affiliate links are clearly marked on our gear pages or fall under the site-wide disclosure in the footer.
      </p>
      <h2>Our editorial policy</h2>
      <ul>
        <li>We only recommend gear we would buy ourselves.</li>
        <li>Affiliate relationships never influence our recommendations. A product&apos;s commission rate has no bearing on whether we feature it.</li>
        <li>We turn down gear review requests if the product isn&apos;t a good fit for our audience.</li>
      </ul>
      <h2>If you have questions</h2>
      <p>
        Email us at <a href="mailto:hello@trailsteadguide.com">hello@trailsteadguide.com</a>.
      </p>
    </LegalPage>
  )
}
