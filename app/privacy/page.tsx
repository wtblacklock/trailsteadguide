import { LegalPage } from '@/components/legal/LegalPage'
import ContactForm from '@/components/contact/ContactForm'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Trailstead Guide collects and uses data — what we store from the planner, email handling, analytics, cookies, and your rights to request deletion.',
  path: '/privacy',
})

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="April 28, 2026">
      <h2>What we collect</h2>
      <p>
        When you use the planner, we store your quiz answers temporarily in your browser&apos;s session storage so we can generate your plan. These answers are not tied to your identity unless you give us your email.
      </p>
      <p>
        If you submit your email to save a plan, we store your email address and the plan ID. We use this address only to send you the plan and — if you opt in — occasional updates. We never sell your email.
      </p>
      <p>
        When you send us a message through the contact form, we receive your name, email, the category you selected, and your message. We use this information solely to reply to you and keep a record of the correspondence. We do not add contact-form submitters to any marketing list.
      </p>
      <h2>Analytics</h2>
      <p>
        We use Vercel Analytics to understand which pages get used. This is aggregated, privacy-respecting, and does not rely on third-party cookies.
      </p>
      <h2>Cookies</h2>
      <p>
        We do not use advertising or tracking cookies. The only cookies we set are strictly necessary for the site to function.
      </p>
      <h2>Bot protection</h2>
      <p>
        Our contact form uses Cloudflare Turnstile to distinguish humans from automated bots. Turnstile collects limited browser and network signals (such as your IP address, user-agent, and basic interaction patterns) and processes them on Cloudflare&apos;s infrastructure. It does not use tracking cookies and is governed by{' '}
        <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener noreferrer" target="_blank">Cloudflare&apos;s privacy policy</a>.
      </p>
      <h2>Third parties</h2>
      <p>
        When you click affiliate links (such as Amazon product links), you are taken to that third party&apos;s website. Their privacy policy applies there.
      </p>
      <p>
        We use Resend to deliver transactional email (plan emails, Trip Pack receipts, contact-form auto-replies) and ConvertKit (Kit) to manage opt-in newsletter lists. Each provider receives only the data necessary to deliver the message.
      </p>
      <h2>Your rights</h2>
      <p>
        You can request deletion of any data we hold about you at any time using the form below.
      </p>
      <ContactForm initialCategory="privacy" />
      <h2>Changes to this policy</h2>
      <p>
        We will update the &quot;last updated&quot; date above when we make material changes. Significant changes will be announced via a banner on the site.
      </p>
    </LegalPage>
  )
}
