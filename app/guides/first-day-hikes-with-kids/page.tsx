import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/first-day-hikes-with-kids'
const TITLE = 'First Day Hikes With Kids'
const META_TITLE = 'First Day Hikes With Kids'
const DESCRIPTION =
  'First Day Hikes with kids: how to find a guided New Year\'s Day hike at a state park, what to wear and pack for January cold, and how to pace little legs.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1771855897723-ba8ca8bedeed?w=1400&auto=format&fit=crop&q=80'
const DATE_PUBLISHED = '2026-11-15'
const DATE_MODIFIED = '2026-11-15'

export const metadata = pageMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
  image: HERO_IMAGE,
  publishedTime: DATE_PUBLISHED,
  modifiedTime: DATE_MODIFIED,
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
            q: 'What is a First Day Hike?',
            a: 'First Day Hikes is a New Year\'s Day tradition run by state parks, with guided or self-guided hikes offered in parks across the country on January 1. Most are free or low cost, and many are short and aimed at beginners and families. Details vary by park, so check the park\'s own event listing for the route, start time, and any fee.',
          },
          {
            q: 'Do we need to register for a First Day Hike?',
            a: 'Often not, but some parks cap group sizes or ask you to sign up ahead, and popular hikes can fill. Check the park\'s event page a week or two before, and call the park office if the listing is unclear. Arrive early, since parking at busy parks fills before the start time.',
          },
          {
            q: 'How cold is too cold to hike with kids?',
            a: 'There is no single number, because wind and wet matter as much as the temperature. A short, moving hike is comfortable for most dressed kids in the 20s and 30s Fahrenheit. Cut the hike short if anyone has stopped talking, is shivering hard, or complains of numb fingers or toes that do not warm up once you start moving.',
          },
          {
            q: 'What should kids wear on a winter day hike?',
            a: 'Three layers: a wicking base layer, an insulating middle layer, and a windproof outer shell, plus a warm hat, mittens, and wool or synthetic socks. Avoid cotton against the skin, since it holds sweat and chills kids as soon as they stop. Carry one spare layer and a spare pair of dry socks in the pack.',
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
        slug="first-day-hikes-with-kids"
        eyebrow="Holiday"
        title={TITLE}
        lede="How to find a New Year's Day hike near you, what to put on kids for a January morning, and how to keep it short enough that they ask for another one."
        dateModified={DATE_MODIFIED}
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Two children in pink winter jackets and gloves standing in a snowy evergreen forest, smiling',
        }}
      >
        <QuickAnswer
          tldr="Find a guided New Year's Day hike at a nearby state park, dress kids in three layers with no cotton, keep it under two miles, and bring hot drinks and a spare layer."
          summary="First Day Hikes are New Year's Day hikes offered at state parks across the country, and most are free or low cost, short, and built for beginners, which makes them an easy first winter outing with kids. Search your state parks' event pages in early December, check whether the hike needs sign-up, and arrive early for parking. Dress kids in a wicking base layer, an insulating middle layer, and a windproof shell, with a warm hat, mittens, and wool or synthetic socks, and carry a spare layer and dry socks. Keep the distance well under what the youngest could do in summer, because cold shortens everyone's range. Bring a thermos of something hot, snack often, and turn around early if anyone goes quiet, stops complaining, or reports numb fingers or toes that do not warm up while walking. Plan to be back well before the early January sunset."
        />

        <h2>Why a New Year&apos;s Day hike works for families</h2>
        <p>
          A guided hike takes most of the planning off you: a marked route, a start time, and usually
          a ranger or volunteer who has done it before. The pace is set for mixed ages, the trail is
          chosen to be doable in winter, and there are other families around, which is the best
          motivation for a reluctant kid. It is also a low-stakes way to test your cold-weather
          clothing before a winter camping trip.
        </p>

        <h2>How to find a hike near you</h2>
        <p>
          Start with your state park system&apos;s website and look for a First Day Hike or New Year&apos;s
          Day events listing, which usually goes up in early to mid December. Compare routes by
          length and terrain, not just by name, and pick the shortest one that still sounds fun. If
          the listing asks for registration, sign up early. If a park near you has no organized hike,
          a self-guided walk on a short, well-marked trail works just as well.
        </p>
        <p>
          Some parks also have cabins or open campgrounds that weekend, so a first-day hike can be
          the daytime half of a winter getaway. See{' '}
          <Link href="/guides/winter-break-camping-with-kids">winter break camping with kids</Link>{' '}
          for where sites are open in late December.
        </p>

        <h2>What to wear: three layers, no cotton</h2>
        <p>
          Dress kids in a wicking base layer, an insulating middle layer, and a windproof outer shell.
          Add a warm hat, mittens (warmer than gloves for small hands), and wool or synthetic socks.
          Cotton is the one thing to avoid next to the skin, because it holds sweat and chills a kid
          the moment they stop moving. Start slightly cool, since kids warm up fast on the trail, and
          have them shed a layer before they sweat. The full clothing system is in{' '}
          <Link href="/guides/how-to-dress-kids-for-cold-weather-camping">
            how to dress kids for cold weather camping
          </Link>
          .
        </p>

        <h2>What goes in the pack</h2>
        <ul>
          <li>An insulated bottle of hot cocoa or warm broth, plus water</li>
          <li>Snacks you can eat with mittens on, and more than you think you need</li>
          <li>A spare insulating layer and a dry pair of socks per kid</li>
          <li>Chemical hand warmers for the pocket, not the glove liner</li>
          <li>A small first-aid kit, a whistle, and a headlamp in case the hike runs long</li>
        </ul>
        <p>
          January daylight is short, so check sunset and plan to be back well before it. The standard
          day-hike checklist is in{' '}
          <Link href="/guides/hiking-with-kids-from-camp">hiking with kids from camp</Link>.
        </p>

        <h2>Pacing and the turn-around rule</h2>
        <p>
          Cold shortens everyone&apos;s range, so plan a distance well under what the youngest could
          manage in summer, and keep the group moving between stops, since standing around is when
          kids get cold. Snack every 30 minutes, and agree on a turn-around time before you start. If a
          child goes quiet, stops complaining, or reports numb fingers or toes that do not warm up
          once you keep walking, head back. Icy patches and slick boardwalks need slow, deliberate
          steps, so keep little kids close on descents.
        </p>

        <h2>Common mistakes</h2>
        <ol>
          <li>
            <strong>Overdressing at the car.</strong> A kid bundled up for standing still will be
            soaked in sweat 15 minutes in. Start slightly cool.
          </li>
          <li>
            <strong>Skipping the registration check.</strong> A full hike means a long drive for
            nothing, so confirm before you go.
          </li>
          <li>
            <strong>Picking the long route.</strong> Choose the shortest option. Ending with energy
            left is how a first winter hike turns into a yearly tradition.
          </li>
          <li>
            <strong>Forgetting the warm drink.</strong> Hot cocoa at the turn-around is the reward
            that gets kids to the turn-around.
          </li>
        </ol>
        <p>
          Want a full plan built around your dates and your kids&apos; ages?{' '}
          <Link href="/quiz">Take the 5-second quiz</Link>.
        </p>
        <p>
          <a href="#recommended-gear" className="font-medium underline underline-offset-4">Jump to recommended gear ↓</a>
        </p>

        <h2>Frequently asked</h2>
        <h3>What is a First Day Hike?</h3>
        <p>
          A New Year&apos;s Day hike offered by state parks across the country, usually free or low
          cost and short enough for beginners and families.
        </p>
        <h3>Do we need to register for a First Day Hike?</h3>
        <p>
          Often not, but some parks cap group sizes. Check the event page a week or two ahead and
          arrive early for parking.
        </p>
        <h3>How cold is too cold to hike with kids?</h3>
        <p>
          Wind and wet matter as much as the number. Turn back if anyone is shivering hard or has
          numb fingers or toes that do not warm up while moving.
        </p>
        <h3>What should kids wear on a winter day hike?</h3>
        <p>
          A wicking base layer, an insulating middle layer, a windproof shell, a hat, mittens, and
          wool or synthetic socks. No cotton against the skin.
        </p>
      </GuidePage>
      <GuideGearShelf guideSlug="first-day-hikes-with-kids" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="first-day-hikes-with-kids" />
    </>
  )
}
