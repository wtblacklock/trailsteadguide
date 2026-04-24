import { LegalPage } from '@/components/legal/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'Terms of service for Trailstead Guide — acceptable use, content ownership, disclaimers of warranty, limitation of liability, and governing law.',
  path: '/terms',
})

export default function Page() {
  return (
    <LegalPage title="Terms of Service" updated="April 24, 2026">
      <h2>Using this site</h2>
      <p>
        By using Trailstead Guide, you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.
      </p>
      <h2>Not professional advice</h2>
      <p>
        Trailstead Guide is an information resource and planning tool. It is not a substitute for professional advice from a medical provider, wilderness safety professional, or local park ranger. You are responsible for your own safety and the safety of your family.
      </p>
      <p>
        Camping involves risk. Weather, wildlife, terrain, and equipment failure can cause injury or death. We try to give you honest, useful information — but we can&apos;t anticipate every situation, and we don&apos;t guarantee any outcome.
      </p>
      <h2>Content on this site</h2>
      <p>
        All content on Trailstead Guide — text, images, plans, templates — is our intellectual property, or licensed to us. You may print and share individual plans for personal use. You may not republish, resell, or systematically scrape the site.
      </p>
      <h2>User-submitted content</h2>
      <p>
        If you submit feedback, suggestions, or stories to us, you grant us a worldwide, royalty-free license to use them. We will credit you if we feature your story publicly.
      </p>
      <h2>Changes to the service</h2>
      <p>
        We may update, add, or remove features without notice. We&apos;ll try to preserve saved plans, but can&apos;t guarantee persistence forever.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Trailstead Guide and its contributors are not liable for any indirect, incidental, or consequential damages arising from your use of the site.
      </p>
      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Colorado, USA. Disputes will be resolved in the courts of Denver County, Colorado.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? <a href="mailto:hello@trailsteadguide.com">hello@trailsteadguide.com</a>.
      </p>
    </LegalPage>
  )
}
