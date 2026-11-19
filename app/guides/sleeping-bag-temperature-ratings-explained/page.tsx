import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'
import AmazonLink from '@/components/affiliate/AmazonLink'

const SLUG = '/guides/sleeping-bag-temperature-ratings-explained'
const TITLE = 'Sleeping Bag Temperature Ratings Explained'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Sleeping Bag Ratings Explained'
const DESCRIPTION =
  'Sleeping bag temperature ratings explained for family campers: comfort vs limit vs extreme, why a 20 degree bag is not a 20 degree night, and what to buy.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What is the difference between comfort, limit, and extreme ratings?',
            a: 'Bags tested to the ISO 23537 standard (the successor to EN 13537) list up to three numbers. Comfort is the lowest temperature at which a standard cold-sensitive woman is expected to sleep comfortably in a relaxed position. Limit is the lowest temperature at which a standard man can sleep for eight hours curled up without shivering. Extreme is a survival number for a woman, with a real risk of hypothermia, and should never be used for trip planning.',
          },
          {
            q: 'Is a 20 degree sleeping bag good for 20 degree weather?',
            a: 'Usually not comfortably. Most US bags are labeled with the limit rating, which means a 20 degree bag is built to keep an average sleeper from getting dangerously cold at 20, not to feel cozy. For comfortable sleep, choose a bag whose rating is 10 to 15 degrees colder than the forecast low, or use the comfort rating when the bag lists one.',
          },
          {
            q: 'Do kids need a warmer sleeping bag rating than adults?',
            a: 'Yes, in practice. Children lose heat faster than adults and many kids bags are not lab-tested at all, so the printed number is the maker\'s estimate. Pick a kids bag rated at least 10 degrees colder than the forecast low, add a pad with enough R-value, and dress them in dry base layers and a hat for sleep.',
          },
          {
            q: 'Can I make a sleeping bag warmer without buying a new one?',
            a: 'Yes. A liner typically adds around 5 to 15 degrees of warmth depending on the type, a warm pad under the bag stops heat loss into the ground, and dry layers, a hat, and a snack before bed all help. Fixing the pad first is usually the cheapest improvement, since the ground steals more heat than the air does.',
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
        slug="sleeping-bag-temperature-ratings-explained"
        eyebrow="Gear guide"
        title={TITLE}
        lede="The big number on the stuff sack is not the temperature you will be comfortable at. Here is how to read it, and how to pick a bag that actually keeps your family warm."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A small dome tent on a grassy ridge above a layer of low cloud at first light, with mountains behind',
        }}
      >
        <QuickAnswer
          tldr="A bag's temperature rating is usually its limit, not its comfort level. Buy a bag rated 10 to 15 degrees colder than the forecast low, and pair it with a warm pad."
          summary="Sleeping bag temperature ratings come from a lab test that produces up to three numbers: comfort, limit, and extreme. The number printed large on most bags is the limit, the coldest temperature an average sleeper can reach without shivering while curled up, so a 20 degree bag will feel chilly at 20. Extreme is a survival rating and not a planning number. For comfortable family camping, choose a bag rated 10 to 15 degrees colder than the forecast low, and go colder still for kids, who lose heat faster, and for anyone who sleeps cold. Many budget and kids bags are not lab-tested, so treat their ratings as optimistic. The sleeping pad matters as much as the bag, because your weight crushes the fill underneath you. Fix the pad, then add a liner or dry layers."
        />

        <h2>Where the numbers come from</h2>
        <p>
          Reputable brands send their bags to a lab, where a heated mannequin covered in sensors
          lies inside the bag on a standard pad in a cold chamber. The test is called ISO 23537,
          which replaced the older EN 13537 standard, and it is what lets you compare a bag from
          one brand against another.
        </p>
        <p>
          The result is up to three temperatures. Each one answers a different question, and only
          one of them is useful for planning a family trip.
        </p>

        <h2>Comfort, limit, and extreme</h2>
        <ul>
          <li>
            <strong>Comfort:</strong> the lowest temperature at which a standard cold-sensitive
            sleeper is expected to stay comfortable in a relaxed position. This is the number to
            plan around.
          </li>
          <li>
            <strong>Limit:</strong> the lowest temperature at which an average sleeper can get
            through eight hours curled up in a tight ball without shivering. It is usually 8 to
            15 degrees below the comfort rating, and it is the number most US brands print on the
            bag.
          </li>
          <li>
            <strong>Extreme:</strong> a survival rating. At this temperature the bag keeps you
            alive for six hours, with a real risk of hypothermia. Ignore it when planning.
          </li>
        </ul>
        <p>
          So a bag sold as a &quot;20 degree bag&quot; is often a bag with a comfort rating in the
          upper 20s or low 30s. Nothing about that is dishonest, but it means the label and your
          experience will not match unless you know which number you are reading.
        </p>

        <h2>Why the lab number runs optimistic</h2>
        <p>
          The test assumes a good insulated pad, dry base layers, a sheltered spot, and a person
          who has eaten dinner. A family campsite on a damp, windy night rarely checks all of
          those boxes. Humidity, a thin pad, damp clothes, an empty stomach, and a draft at the
          neck all take degrees off the rating.
        </p>
        <p>
          Many budget bags and nearly all kids bags skip the lab altogether, which means the
          temperature on the tag is the maker&apos;s own estimate. Treat those numbers as best
          case. The bag-by-bag detail for children is in{' '}
          <Link href="/guides/best-camping-sleeping-bag-for-kids">
            best camping sleeping bag for kids
          </Link>
          .
        </p>

        <h2>The rule of thumb for families</h2>
        <p>
          Pick a bag rated 10 to 15 degrees colder than the forecast low at your campsite, not the
          daytime high. Then adjust:
        </p>
        <ul>
          <li>Add another 5 to 10 degrees of margin for kids and for anyone who sleeps cold.</li>
          <li>Add margin for wind, a damp site, or a high elevation night that can drop fast.</li>
          <li>
            A bag that is too warm is easy to fix by unzipping it. A bag that is too cold is a
            long night for everyone.
          </li>
        </ul>
        <p>
          For cold nights, a deep-cold bag such as the{' '}
          <AmazonLink productId="teton-celsius-xxl-0" pageSlug="sleeping-bag-temperature-ratings-explained" />{' '}
          leaves plenty of margin, and a lighter bag like the{' '}
          <AmazonLink productId="coleman-brazos-bag" pageSlug="sleeping-bag-temperature-ratings-explained" />{' '}
          covers summer and mild fall nights.
        </p>

        <h2>Your pad changes the real rating</h2>
        <p>
          The lab test sleeps the mannequin on an insulated pad. If your family sleeps on a thin
          foam square or an air mattress, the bag is doing less than the label promises, because
          the fill under your body is compressed flat and insulates almost nothing. The ground is
          the biggest heat thief on a cold night.
        </p>
        <p>
          Before you spend money on a warmer bag, check the pad. The rules for matching pad
          warmth to overnight lows are in{' '}
          <Link href="/guides/sleeping-pad-r-value-explained">sleeping pad R-value explained</Link>
          , and a foam pad such as the{' '}
          <AmazonLink productId="therm-a-rest-z-lite-sol" pageSlug="sleeping-bag-temperature-ratings-explained" />{' '}
          is the cheapest upgrade under any bag.
        </p>

        <h2>Ways to add warmth without a new bag</h2>
        <ol>
          <li>
            <strong>Fix the pad first.</strong> Stack a foam pad under whatever you already own.
          </li>
          <li>
            <strong>Add a liner.</strong> A thermal liner such as the{' '}
            <AmazonLink productId="sea-to-summit-reactor-extreme-liner" pageSlug="sleeping-bag-temperature-ratings-explained" />{' '}
            adds meaningful warmth. See{' '}
            <Link href="/guides/are-sleeping-bag-liners-worth-it">
              are sleeping bag liners worth it
            </Link>{' '}
            for what to expect.
          </li>
          <li>
            <strong>Sleep dry.</strong> Change into clean, dry base layers and a hat. Sweaty or
            damp clothes steal heat.
          </li>
          <li>
            <strong>Eat and warm up first.</strong> A snack and a short walk before bed give your
            body fuel and heat to hold on to.
          </li>
          <li>
            <strong>Use warm water bottles and hand warmers.</strong> A sealed bottle of warm water
            at the feet works well on cold nights. See{' '}
            <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>
            .
          </li>
        </ol>
        <p>
          If the forecast sits near or below freezing, read{' '}
          <Link href="/guides/camping-in-40-degree-weather">camping in 40 degree weather</Link> and{' '}
          <Link href="/guides/winter-camping-for-beginners">winter camping for beginners</Link>{' '}
          before you commit to a bag.
        </p>

        <h2>Frequently asked</h2>
        <h3>What is the difference between comfort, limit, and extreme ratings?</h3>
        <p>
          Comfort is the number to plan around. Limit is the coldest an average sleeper can
          manage curled up, usually 8 to 15 degrees lower. Extreme is a survival rating you should
          ignore.
        </p>
        <h3>Is a 20 degree sleeping bag good for 20 degree weather?</h3>
        <p>
          Usually not comfortably. Most US bags print the limit, so a 20 degree bag will feel
          chilly at 20. Choose a rating 10 to 15 degrees below the forecast low.
        </p>
        <h3>Do kids need a warmer sleeping bag rating than adults?</h3>
        <p>
          Yes. Kids lose heat faster and many kids bags are not lab-tested, so pick one rated at
          least 10 degrees colder than the forecast and pair it with a warm pad.
        </p>
        <h3>Can I make a sleeping bag warmer without buying a new one?</h3>
        <p>
          Yes. A liner adds roughly 5 to 15 degrees, a better pad stops ground heat loss, and dry
          layers, a hat, and a snack before bed all help.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="sleeping-bag-temperature-ratings-explained"
        heading="Bags and add-ons for a warmer night"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="sleeping-bag-temperature-ratings-explained" />
    </>
  )
}
