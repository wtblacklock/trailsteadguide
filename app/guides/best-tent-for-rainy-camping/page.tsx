import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/best-tent-for-rainy-camping'
const TITLE = 'Best Tent for Camping in the Rain'
const META_TITLE = 'Best Tent for Rainy Camping (2026)'
const DESCRIPTION =
  'The best tents for rainy camping: what hydrostatic head rating actually means, why fly coverage matters more than the number, and which tents keep a family dry.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Is a 1500mm hydrostatic head rating waterproof enough?',
            a: '1500mm handles steady rain and typical campground storms without issue. It will eventually let water through under sustained heavy rain with people and gear pressing on the fabric from inside. For genuinely wet climates or multi-day rain, look for 2000mm or higher.',
          },
          {
            q: 'Do I need a footprint or tarp under the tent in the rain?',
            a: 'Yes — even a fully waterproof floor benefits from a footprint. It stops ground moisture from wicking up through stress points and stakes holes, and it protects the floor fabric from punctures that turn into leaks on the next trip.',
          },
          {
            q: 'Can I add a tarp over a tent that leaks?',
            a: 'A tarp rigged above the rainfly — not touching it — adds real protection and buys an old tent another season. Touching tarp to fly defeats the point: water runs along the contact point and finds its way in. See our guide on tarp rigging for the setup.',
          },
          {
            q: 'Why does my tent get wet even with a rainfly on?',
            a: 'Two usual causes: the rainfly only covers the roof and mesh panels on the walls are exposed, or condensation is forming on the inside of the fly and dripping onto the tent body. A full-coverage fly and cracked vents to manage airflow fix most of this.',
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
        slug="best-tent-for-rainy-camping"
        eyebrow="Gear guide"
        title="Best Tent for Camping in the Rain"
        lede="What actually keeps water out, why the number on the box isn't the whole story, and which tents hold up when the forecast turns."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A tent pitched on a hillside under a dark, cloudy sky',
        }}
      >
        <QuickAnswer
          tldr="Look for a full-coverage rainfly, a bathtub floor, and 1500mm+ hydrostatic head. Capacity rating doesn't matter if the tent leaks."
          summary="A tent that keeps a family dry needs three things: a rainfly that covers the walls, not just the roof; a bathtub-style floor that runs several inches up the sidewall so ground water can't seep in; and taped or factory-sealed seams. A 1500mm hydrostatic head rating is enough for typical campground rain — go higher only if you're camping somewhere genuinely wet, like the Pacific Northwest or the Appalachians in spring. The Coleman Sundome 4P and CORE 6-Person Instant Cabin both meet this bar at very different price points; skip anything that advertises &ldquo;water-resistant&rdquo; without a fly that covers the full tent body."
        />

        <h2>Hydrostatic head rating, explained without the jargon</h2>
        <p>
          Hydrostatic head measures how much water pressure a fabric can resist before it starts
          leaking, in millimeters. A 1000mm rating is the bare minimum — light drizzle only.
          1500mm is the standard for most family tents and handles a real rainstorm. 2000mm and up
          is genuinely waterproof under sustained, heavy rain with people and gear inside pressing
          on the fabric.
        </p>
        <p>
          The number matters less than where it&apos;s applied, though. A tent can advertise a high
          rating on the floor while the rainfly is rated lower, or not stated at all. Check both.
        </p>

        <h2>Fly coverage matters more than the rating</h2>
        <p>
          Most budget tents ship with a rainfly that only covers the roof — the mesh panels on the
          upper walls stay exposed. In light rain this is fine; the mesh sheds a quick shower. In
          steady rain, wind-driven water gets through the mesh and the tent gets wet from the sides
          in, no matter how good the roof fabric is.
        </p>
        <p>
          A full-coverage fly runs all the way to the ground on every side. It costs more and takes
          slightly longer to pitch, but it&apos;s the single biggest factor in whether a tent stays dry
          in real weather. If a listing doesn&apos;t specify, assume roof-only coverage.
        </p>

        <h2>The floor matters as much as the roof</h2>
        <p>
          A bathtub floor — one that&apos;s a single piece of waterproof fabric running several inches
          up the sidewall before it meets the tent body — keeps pooling water at the base of the
          tent from seeping in under a seam. A flat floor with a seam at ground level is the most
          common leak point on cheap tents, especially on sloped or poorly-drained sites.
        </p>
        <p>
          Combine a bathtub floor with a footprint or tarp cut to size, and ground moisture stops
          being a factor even in a site that puddles overnight.
        </p>

        <h2>Ventilation vs. staying dry</h2>
        <p>
          Sealing a tent up tight to keep rain out backfires — condensation from breathing and body
          heat collects on the inside of the fly and drips down, and it feels just as wet as a leak.
          The fix is mesh panels under the fly (not exposed to rain, but open to airflow) and
          cracked vents at the base and peak. A tent built for rain manages both problems at once;
          one built only to look waterproof on a spec sheet often doesn&apos;t.
        </p>

        <h2>Top picks for wet climates</h2>
        <h3>Best budget pick: Coleman Sundome 4-Person</h3>
        <p>
          The Sundome&apos;s WeatherTec system — welded floor seams, inverted seams on the fly, and a
          rainfly that covers the door and windows — handles steady rain reliably at an entry-level
          price. It&apos;s rated for typical campground weather, not sustained multi-day storms.
        </p>
        <h3>Best for standing room in wet weather: CORE 6-Person Instant Cabin</h3>
        <p>
          CORE&apos;s H20 Block Technology pairs a 1200mm-rated body with a fully taped rainfly and
          sealed seams. The near-vertical walls mean less contact between wet gear and sloped
          fabric — a real advantage when you&apos;re stuck inside for a rainy afternoon with kids.
        </p>
        <h3>Best for genuinely wet regions: The North Face Wawona 6</h3>
        <p>
          The Wawona&apos;s oversized vestibule keeps a full day&apos;s gear dry outside the sleeping area,
          which matters more than it sounds like on a multi-day trip where everything is already
          damp. Built for serious weather, not just an afternoon shower.
        </p>

        <h2>What to avoid in wet conditions</h2>
        <ul>
          <li>
            <strong>Tents advertised as &ldquo;water-resistant&rdquo; with no hydrostatic head
            number.</strong> If the listing doesn&apos;t specify a rating, assume it&apos;s low.
          </li>
          <li>
            <strong>Roof-only rainflies on a tent you know will see real rain.</strong> Fine for an
            occasional shower, not for a forecast with steady rain overnight.
          </li>
          <li>
            <strong>Clip-only pole attachment in storm-prone areas.</strong> Sleeves hold up better
            under sustained wind and rain than clips, which can pop loose.
          </li>
          <li>
            <strong>Single-wall tents for family car camping.</strong> They&apos;re built for
            weight-conscious backpacking, not for managing condensation with four people and gear
            inside.
          </li>
        </ul>

        <h2>Get the setup right and the tent matters less</h2>
        <p>
          Even the best tent leaks if the rainfly isn&apos;t staked and guyed out properly — see our{' '}
          <Link href="/skills/shelter/rainfly-and-guylines">rainfly and guylines</Link> skill for
          the setup that actually keeps water moving away from the tent instead of pooling against
          it. And if the rain outlasts the trip, our{' '}
          <Link href="/guides/camping-when-the-weather-turns">camping when the weather turns</Link>{' '}
          guide covers the bail-or-stay call.
        </p>

        <h2>Frequently asked</h2>
        <h3>Is a 1500mm hydrostatic head rating waterproof enough?</h3>
        <p>
          For steady rain and typical campground storms, yes. For genuinely wet climates or
          multi-day rain, look for 2000mm or higher.
        </p>
        <h3>Do I need a footprint or tarp under the tent in the rain?</h3>
        <p>
          Yes. It stops ground moisture from wicking up through stake holes and protects the floor
          from punctures that become leaks later.
        </p>
        <h3>Can I add a tarp over a tent that leaks?</h3>
        <p>
          Yes, rigged above the rainfly without touching it. Contact between tarp and fly carries
          water down to the contact point and defeats the purpose.
        </p>
        <h3>Why does my tent get wet even with a rainfly on?</h3>
        <p>
          Usually roof-only fly coverage leaving wall mesh exposed, or condensation dripping from
          the inside of the fly. A full-coverage fly and cracked vents fix both.
        </p>
      </GuidePage>
      <GuideGearShelf guideSlug="best-tent-for-rainy-camping" heading="Tents built to keep the rain out" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="best-tent-for-rainy-camping" />
    </>
  )
}
