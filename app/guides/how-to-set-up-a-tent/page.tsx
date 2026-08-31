import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/how-to-set-up-a-tent'
const TITLE = 'How to Set Up a Family Tent'
const META_TITLE = 'How to Set Up a Tent (Complete Guide)'
const DESCRIPTION =
  'How to set up a family tent from picking the site to staking the rainfly: the full walkthrough, the mistakes first-timers make, and how to break camp dry.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=1400&auto=format&fit=crop&q=80'

export const metadata = pageMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
  image: HERO_IMAGE,
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={articleGraph({
          slug: SLUG,
          title: TITLE,
          description: DESCRIPTION,
          image: HERO_IMAGE,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Guides', url: `${SITE_URL}/guides` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'How long does it take to set up a 6-person tent?',
            a: 'An instant/pop-up cabin tent takes about 60 seconds to a few minutes for the tent body, plus 5-10 minutes to stake it out and attach the rainfly properly. A traditional pole tent takes 10-15 minutes total with two people. Budget 20 minutes for your first time with any tent.',
          },
          {
            q: 'Do I need a mallet for tent stakes?',
            a: 'For soft ground, no - you can usually push stakes in by hand or with your foot. For hard-packed or rocky ground, a small rubber mallet makes a real difference and prevents bent stakes. Many tents include one; a $10 mallet is worth adding if yours doesn\'t.',
          },
          {
            q: 'Can one person set up a family tent alone?',
            a: 'Yes, for most instant/pop-up cabin tents - that\'s their main selling point. Traditional pole tents are doable solo but noticeably easier and faster with a second person, especially for anything larger than a 4-person size.',
          },
          {
            q: 'What if I forgot to bring stakes?',
            a: 'Heavy rocks piled on the tent corners and guyline loops work in calm weather. It is not a substitute for real stakes in wind or rain - the tent can shift or the rainfly can pull loose. Treat it as an emergency fix, not a plan.',
          },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: TITLE, url: `${SITE_URL}${SLUG}` },
        ]}
      />
      <GuidePage
        slug="how-to-set-up-a-tent"
        eyebrow="How-to"
        title="How to Set Up a Family Tent"
        lede="Site selection, staking, the rainfly, and the mistakes that turn a 15-minute job into an hour with kids waiting in the car."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A family walking near a tent pitched on a grassy hillside at golden hour',
        }}
      >
        <QuickAnswer
          tldr="Pick flat, debris-free ground. Stake the corners, raise the poles, attach the rainfly, then guy it out. 15 minutes with two people."
          summary="Setting up a family tent has five steps that don't change no matter what tent you own: pick the site, lay out and stake the footprint, raise the poles, attach the rainfly, then tension the guylines. Instant/pop-up cabin tents compress steps two through three into under a minute; traditional pole tents take 10-15 minutes with two people. The rainfly is where most first-timers cut corners - skipping it because the sky looks clear is the single most common regret campers report after an unexpected overnight shower."
        />

        <h2>Before you leave the car: picking the spot</h2>
        <p>
          Walk the site before you unpack the tent. Look for flat ground - even a slight slope
          means someone slides toward the tent wall all night. Clear visible rocks, roots, and
          pinecones by hand; anything under the floor becomes a pressure point that can eventually
          wear through the fabric. Avoid the lowest point of the site, even if it looks flat - it&apos;s
          where water pools if it rains.
        </p>

        <h2>Step-by-step setup</h2>
        <ol>
          <li>
            <strong>Lay out the tent body</strong> on the cleared spot, doors facing where you want
            them - away from prevailing wind if you know the direction, toward the fire ring or
            common area otherwise.
          </li>
          <li>
            <strong>Stake the four corners first</strong>, even before raising poles on a
            traditional tent. This keeps the footprint square and prevents the whole tent from
            sliding while you work.
          </li>
          <li>
            <strong>Raise the poles.</strong> On a pop-up/instant tent, this is largely automatic -
            unfold and let the pre-attached poles lock into place. On a traditional dome tent, feed
            poles through their sleeves or clip them in, then walk the tent up by pushing the pole
            ends into their corner grommets.
          </li>
          <li>
            <strong>Attach the rainfly</strong> - every time, regardless of forecast. Clip or
            buckle it at all four corners, then close the door and window flaps.
          </li>
          <li>
            <strong>Stake and tension the guylines</strong> at an angle away from the tent, not
            straight down. This is what actually keeps the fly taut and off the tent body in wind
            and rain - see the full technique in{' '}
            <Link href="/skills/shelter/rainfly-and-guylines">rainfly and guylines</Link>.
          </li>
        </ol>

        <h2>The one step people skip: the rainfly</h2>
        <p>
          It&apos;s tempting to leave the rainfly in the bag on a clear evening. Weather at a campsite
          changes faster than a phone forecast accounts for, and putting the fly on in the dark
          during a surprise shower is a genuinely bad experience. Attach it every time - leave it
          rolled back and unclipped at the top if you want ventilation on a clear night, but keep
          it on the tent, staked and ready to unroll in seconds.
        </p>

        <h2>Common first-timer mistakes</h2>
        <ul>
          <li>
            <strong>Pitching on a slope without noticing.</strong> Stand at the site and roll an
            empty water bottle - if it moves, so will everyone&apos;s sleeping pad overnight.
          </li>
          <li>
            <strong>Skipping stakes because the tent is &ldquo;freestanding.&rdquo;</strong>{' '}
            Freestanding means it holds its shape without stakes - it does not mean it stays put in
            wind. Always stake it, even on a calm night.
          </li>
          <li>
            <strong>Attaching the rainfly backwards.</strong> Most flies have a door that should
            align with the tent&apos;s door - check before clipping in all four corners, not after.
          </li>
          <li>
            <strong>Guying the lines straight down instead of at an angle.</strong> A straight-down
            guyline does almost nothing; the angle is what creates tension against wind.
          </li>
        </ul>
        <p>
          For the deeper technique on pitching efficiently with a partner, see{' '}
          <Link href="/skills/shelter/pitching-a-tent">pitching a tent</Link>.
        </p>

        <h2>Breaking camp and drying it out</h2>
        <p>
          Reverse the order: guylines and stakes first, then the rainfly, then collapse the poles.
          Never pack a wet tent for longer than the drive home - mold and mildew set in within a
          day and ruin the fabric permanently. Hang it in a garage or over a fence to dry completely
          before storing it. Full detail on drying, folding, and off-season storage is in{' '}
          <Link href="/skills/shelter/tent-care-and-storage">tent care and storage</Link>.
        </p>

        <h2>Already picking out a tent?</h2>
        <p>
          If you haven&apos;t bought one yet, start with{' '}
          <Link href="/guides/best-family-tent-for-beginners">best family tent for beginners</Link>{' '}
          for sizing and picks, or jump straight to{' '}
          <Link href="/compare/6-person-vs-8-person-family-tent">
            6-person vs. 8-person
          </Link>{' '}
          if you already know it&apos;s a bigger family.
        </p>

        <h2>Frequently asked</h2>
        <h3>How long does it take to set up a 6-person tent?</h3>
        <p>
          An instant/pop-up tent: about 60 seconds for the body, 5-10 more minutes for stakes and
          rainfly. A traditional pole tent: 10-15 minutes with two people.
        </p>
        <h3>Do I need a mallet for tent stakes?</h3>
        <p>
          Not on soft ground - hand or foot pressure works. On hard-packed or rocky ground, a small
          rubber mallet prevents bent stakes and is worth carrying.
        </p>
        <h3>Can one person set up a family tent alone?</h3>
        <p>
          Yes for most instant/pop-up cabin tents. Traditional pole tents are easier and faster
          with two people, especially above 4-person size.
        </p>
        <h3>What if I forgot to bring stakes?</h3>
        <p>
          Heavy rocks on the corners and guyline loops work as an emergency fix in calm weather -
          not a reliable plan in wind or rain.
        </p>
      </GuidePage>
      <GuideGearShelf guideSlug="how-to-set-up-a-tent" heading="Tents that pitch fast" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-set-up-a-tent" />
    </>
  )
}
