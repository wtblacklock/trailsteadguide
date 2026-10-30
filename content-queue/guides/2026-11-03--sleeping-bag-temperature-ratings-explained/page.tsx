import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import AmazonLink from '@/components/affiliate/AmazonLink'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/sleeping-bag-temperature-ratings-explained'
const TITLE = 'Sleeping Bag Temperature Ratings Explained'
const META_TITLE = 'Sleeping Bag Ratings: Comfort vs Limit'
const DESCRIPTION =
  'Sleeping bag temperature ratings explained: comfort vs limit vs extreme, why a 20 degree bag is not comfortable at 20, and how to pick a bag for kids.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1784813488936-d28a470134c0?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What is the difference between comfort and limit ratings on a sleeping bag?',
            a: 'Under the ISO 23537 standard, and the older EN 13537 standard it replaced, the comfort rating is the temperature at which a standard adult sleeping relaxed on their back stays comfortable. The limit rating, sometimes called the lower limit, is the lowest temperature at which a standard adult curled up in a ball can sleep through the night without waking cold. The two are usually about 10 degrees Fahrenheit apart, and comfort is the warmer, more realistic number.',
          },
          {
            q: 'Is a 20 degree sleeping bag warm enough for 20 degrees?',
            a: 'Usually not comfortably. The number on a bag\'s name is often its limit rating, which assumes a sleeper curled up and wearing a base layer and hat on an insulated pad. Most people, and especially kids, sleep comfortably in a 20 degree bag only down to around 30 degrees. Pick a bag whose comfort rating, or a rating 10 to 15 degrees below the forecast low, matches the coldest night you expect.',
          },
          {
            q: 'Do kids sleeping bags have ISO temperature ratings?',
            a: 'Generally no. The ISO and EN tests are designed around adult-size bags and standard adult sleepers, so the temperature on a kids bag is the manufacturer\'s own estimate. Treat it as optimistic, since kids lose heat faster than adults, and buy a kids bag rated 10 to 15 degrees below the coldest forecast low.',
          },
          {
            q: 'What does the extreme rating on a sleeping bag mean?',
            a: 'The extreme rating, sometimes labeled a risk rating, is a survival number, not a sleeping number. It estimates the temperature at which a standard adult could survive a night in the bag with a real risk of hypothermia. Never plan a trip around it, and ignore it entirely when choosing a bag for a child.',
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
        title="Sleeping Bag Temperature Ratings Explained"
        lede="The number on a sleeping bag is not the temperature you will be comfortable at. Here is what comfort, limit, and extreme ratings actually mean, and how to use them to pick a bag that keeps a kid warm on a cold November night."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Looking out the open door of a tent over a valley, with a blue sleeping bag in the foreground',
        }}
        dateModified="2026-11-03"
      >
        <QuickAnswer
          tldr="The big number is usually the limit rating, not the comfort rating. Pick by comfort, add a 10 to 15 degree margin for kids, and always pair the bag with an insulated pad."
          summary="Sleeping bag temperature ratings come from a lab test, ISO 23537 or the older EN 13537, that puts a heated mannequin in a bag on an insulated pad. The test produces three numbers. Comfort is where a standard adult sleeping relaxed stays warm. Limit, usually about 10 degrees Fahrenheit colder, is where a standard adult curled in a ball can sleep without waking cold. Extreme is a survival number with a real risk of hypothermia, and you should ignore it. Many bags are named by their limit rating, so a 20 degree bag is often comfortable only to around 30. Kids bags are not tested under the standard at all, so their numbers are the maker's estimate. For a cold night, choose a bag whose comfort rating matches the forecast low, or a limit rating 10 to 15 degrees below it, and put it on a pad with real insulation."
        />

        <h2>Where the numbers come from</h2>
        <p>
          Most adult sleeping bags from established brands are rated under ISO 23537, an
          international standard that replaced the older European EN 13537 test. Both work the same
          way in broad strokes. A heated mannequin wearing a base layer and a hat goes into the bag,
          on top of an insulated sleeping pad, inside a cold climate chamber. Sensors measure how
          much heat the bag holds in, and a formula turns that into temperature ratings for a
          standard adult sleeper.
        </p>
        <p>
          That setup matters, because every rating assumes those same conditions: dry base layers,
          a hat, a pad underneath, and a sheltered tent. Change any of them and the rating stops
          being accurate. A bag on an air mattress with no insulation, or a kid sleeping in damp
          clothes, will feel far colder than the label suggests.
        </p>

        <h2>Comfort, limit, and extreme</h2>
        <p>An ISO-rated bag lists up to three temperatures:</p>
        <ul>
          <li>
            <strong>Comfort.</strong> The temperature at which a standard adult sleeping relaxed,
            stretched out on their back, stays comfortable all night. This is the number closest to
            how most people actually sleep, and the best one to plan around.
          </li>
          <li>
            <strong>Limit, or lower limit.</strong> The lowest temperature at which a standard adult
            curled up in a ball to conserve heat can sleep through the night without waking cold.
            It is usually about 10 degrees Fahrenheit colder than the comfort rating. Warm sleepers
            can stretch toward it. Cold sleepers and kids should not.
          </li>
          <li>
            <strong>Extreme, sometimes labeled risk.</strong> A survival number. It estimates the
            temperature at which a standard adult could get through a night in the bag with a
            real risk of hypothermia. It is there for emergencies, not for planning. Ignore it.
          </li>
        </ul>
        <p>
          Here is the trap. Many brands put the limit rating in the product name, so a bag sold as
          a 20 degree bag often has a comfort rating closer to 30. A family that packs a 20 degree
          bag for a 20 degree night is planning around the number for a curled-up adult who is
          already on the edge of cold.
        </p>

        <h2>Why kids bags are different</h2>
        <p>
          The ISO and EN tests are built around adult-size bags and adult sleepers. Kids bags
          generally are not tested under the standard, so the temperature printed on a kids bag is
          the manufacturer&apos;s own estimate, and there is no rule about which number it
          represents.
        </p>
        <p>
          Kids also lose heat faster than adults. A smaller body has more surface area for its
          weight, kids often go to bed without eating enough, and they kick out of the bag at 2 a.m.
          A kid swimming in an adult bag sleeps cold too, because the body has to heat all that
          empty space. The full explanation is in{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>.
        </p>
        <p>
          <strong>The rule for kids: buy a bag rated 10 to 15 degrees below the coldest forecast
          low.</strong> A kid-size bag like the{' '}
          <AmazonLink
            productId="teton-junior-20"
            pageSlug="sleeping-bag-temperature-ratings-explained"
          />{' '}
          covers most spring and fall trips, and an adjustable-length bag like the{' '}
          <AmazonLink
            productId="retrospec-dream-25"
            pageSlug="sleeping-bag-temperature-ratings-explained"
          />{' '}
          grows with a child. Our{' '}
          <Link href="/guides/best-camping-sleeping-bag-for-kids">
            best camping sleeping bags for kids
          </Link>{' '}
          guide has a full chart by forecast low.
        </p>

        <h2>How to pick a bag for a cold night</h2>
        <ol>
          <li>
            <strong>Find the forecast low for the campground itself,</strong> not the nearest town.
            Elevation, valleys, and open water all change it, and campgrounds in a hollow often run
            several degrees colder than the forecast.
          </li>
          <li>
            <strong>Match the comfort rating to that low.</strong> If the bag only lists one number
            and does not say which, assume it is the limit rating and add 10 degrees.
          </li>
          <li>
            <strong>For kids and cold sleepers, add a 10 to 15 degree margin.</strong> A kid can
            unzip a bag that is too warm. A bag that is too cold has no fix at 2 a.m.
          </li>
          <li>
            <strong>Check the pad.</strong> Every rating assumes an insulated pad. A bag on an
            uninsulated air mattress loses heat straight into the ground, which is why{' '}
            <Link href="/guides/sleeping-pad-r-value-explained">sleeping pad R-value</Link> matters
            as much as the bag. A{' '}
            <AmazonLink
              productId="redcamp-foam-sleeping-pad"
              pageSlug="sleeping-bag-temperature-ratings-explained"
            />{' '}
            under an inflatable pad is a cheap fix.
          </li>
        </ol>

        <h2>A quick guide to common ratings</h2>
        <p>
          These are rough ranges for a typical adult on a good pad, using the name on the bag:
        </p>
        <ul>
          <li>
            <strong>40 to 50 degree bags</strong> are summer bags, comfortable on nights in the 50s
            and up. A budget rectangular bag like the{' '}
            <AmazonLink
              productId="coleman-brazos-bag"
              pageSlug="sleeping-bag-temperature-ratings-explained"
            />{' '}
            fits here, and is fine for warm-weather trips and cabins.
          </li>
          <li>
            <strong>20 to 30 degree bags</strong> are the three-season range most families want,
            comfortable on spring and fall nights in the 30s and 40s. The{' '}
            <AmazonLink
              productId="teton-trailhead-20"
              pageSlug="sleeping-bag-temperature-ratings-explained"
            />{' '}
            is a synthetic 20 degree mummy bag that handles a typical November trip in the South or
            a fall night in the mountains.
          </li>
          <li>
            <strong>0 degree bags</strong> are for nights in the 20s and below. The{' '}
            <AmazonLink
              productId="teton-celsius-xxl-0"
              pageSlug="sleeping-bag-temperature-ratings-explained"
            />{' '}
            is a roomy rectangular option for car campers who want room to move.
          </li>
        </ul>
        <p>
          Shape and fill matter too. A mummy bag traps more heat than a rectangular bag with the
          same rating because there is less air inside to warm, and synthetic fill keeps working
          when it gets damp in a way down does not. For a night that will test the low end of your
          bag, see{' '}
          <Link href="/guides/camping-in-40-degree-weather">camping in 30 and 40 degree weather</Link>
          .
        </p>

        <h2>Ways to stretch a bag that is a little too light</h2>
        <ul>
          <li>
            <strong>Add a liner.</strong> An insulated liner like the{' '}
            <AmazonLink
              productId="sea-to-summit-reactor-extreme-liner"
              pageSlug="sleeping-bag-temperature-ratings-explained"
            />{' '}
            adds warmth and keeps the bag clean. Makers&apos; warmth claims for liners are
            optimistic, so count on a modest boost, not a new season.
          </li>
          <li>
            <strong>Wear dry layers and a hat to bed.</strong> The ratings already assume a base
            layer and a hat. Damp clothes from the day pull heat away all night.
          </li>
          <li>
            <strong>Eat before bed and go to bed warm.</strong> A snack with some fat in it and a
            few minutes of moving around before getting in helps the bag do its job.
          </li>
          <li>
            <strong>Throw a blanket over the top.</strong> In a car-camping tent, a fleece blanket
            or a second open sleeping bag over the top adds real warmth.
          </li>
        </ul>
        <p>
          Never use a fuel-burning heater inside a tent to make up for a light bag. The safe
          options, including electric heat at a powered site, are in{' '}
          <Link href="/guides/tent-heater-safety">tent heater safety</Link>.
        </p>

        <h2>Frequently asked</h2>
        <h3>What is the difference between comfort and limit ratings on a sleeping bag?</h3>
        <p>
          Comfort is where a standard adult sleeping relaxed stays warm. Limit is where a standard
          adult curled in a ball can sleep without waking cold, usually about 10 degrees Fahrenheit
          colder. Plan around comfort.
        </p>
        <h3>Is a 20 degree sleeping bag warm enough for 20 degrees?</h3>
        <p>
          Usually not comfortably. The 20 is often the limit rating, so most people are comfortable
          in it only down to around 30. Kids need an even bigger margin.
        </p>
        <h3>Do kids sleeping bags have ISO temperature ratings?</h3>
        <p>
          Generally no. The number on a kids bag is the maker&apos;s estimate, so buy one rated 10 to
          15 degrees below the coldest forecast low.
        </p>
        <h3>What does the extreme rating on a sleeping bag mean?</h3>
        <p>
          It is a survival number with a real risk of hypothermia, not a sleeping number. Never plan
          around it.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="sleeping-bag-temperature-ratings-explained"
        heading="Sleeping bags by temperature range"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="sleeping-bag-temperature-ratings-explained" />
    </>
  )
}
