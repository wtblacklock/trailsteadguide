import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import AmazonLink from '@/components/affiliate/AmazonLink'
import SkillMediaBlock from '@/components/skills/SkillMediaBlock'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/how-to-wash-dishes-camping'
const TITLE = 'How to Wash Dishes While Camping'
const META_TITLE = 'How to Wash Dishes While Camping'
const DESCRIPTION =
  'How to wash dishes while camping: the two-basin setup, how much water to bring, where gray water goes, and what changes when fall campgrounds shut off the water.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1630545097402-e4e79fc9b9a5?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Can you wash dishes in the campground bathroom sink?',
            a: 'Usually not. Most campgrounds post rules against washing dishes in restroom sinks because food scraps clog the drains and attract animals to the buildings. Some state park campgrounds have a dedicated utility sink or a gray water drain near the restrooms for exactly this job. If you do not see one, wash at your own site with basins and dispose of the water the way the campground asks.',
          },
          {
            q: 'Where do you dump dish water when camping?',
            a: 'At a developed campground, use the gray water drain or utility sink if there is one, and follow posted rules. If there is none, strain out the food bits first, then scatter the water over a wide area at least 200 feet from any lake, stream, or spring, as Leave No Trace recommends. Never pour it into a fire ring, a vault toilet, or a waterway.',
          },
          {
            q: 'Is biodegradable soap safe to use in a lake or stream?',
            a: 'No. Biodegradable soap breaks down in soil, not in water, and it still harms fish and aquatic life if it goes straight into a lake or stream. Use it sparingly in a basin, carry the water at least 200 feet from the shore, and let the soil do the work.',
          },
          {
            q: 'How much water do you need to wash dishes while camping?',
            a: 'Plan on about 1 to 2 gallons per meal for a family of four, split between a wash basin and a rinse basin. Scraping plates well and wiping pans with a paper towel first cuts that roughly in half. On a fall trip where the campground water is already shut off, bring that amount on top of drinking water, which is about a gallon per person per day.',
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
        slug="how-to-wash-dishes-camping"
        eyebrow="How-to"
        title="How to Wash Dishes While Camping"
        lede="The two-basin setup that works on any picnic table, how much water to bring, where the dirty water actually goes, and the fall twist: campgrounds that have already shut off the spigots."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A skillet and a stockpot on camp stoves at a campsite grill, with a tent pitched behind them',
        }}
      >
        <QuickAnswer
          tldr="Scrape and wipe first, wash in one basin of warm soapy water, rinse in a second basin, air dry, then strain the gray water and dispose of it 200 feet from any water."
          summary="Washing dishes at camp takes two basins, a little biodegradable soap, and a pot of warm water. Scrape every plate into the trash and wipe greasy pans with a paper towel before anything touches water, because less food in the basin means less water and less mess. Wash in the first basin with a few drops of soap, rinse in the second with clean water, and let everything air dry on a towel or in a mesh bag. Strain the used water so food bits go in the trash, then pour it into the campground's gray water drain or scatter it at least 200 feet from any lake or stream. Never wash in a restroom sink or a waterway. In fall, check whether the water is still on: many campgrounds shut it off weeks before they close, so you may need to bring wash water too."
        />

        <h2>What you need</h2>
        <ul>
          <li>
            <strong>Two basins.</strong> One for washing, one for rinsing. A pair of collapsible
            tubs like the <AmazonLink productId="montnorth-collapsible-wash-basin" pageSlug="how-to-wash-dishes-camping" /> fold
            flat in the bin and stand up on the picnic table.
          </li>
          <li>
            <strong>Biodegradable camp soap.</strong> A few drops is enough. Concentrated camp soap
            such as <AmazonLink productId="campsuds-biodegradable-soap" pageSlug="how-to-wash-dishes-camping" /> rinses
            clean with much less water than kitchen dish soap.
          </li>
          <li>
            <strong>A scrubber and a small strainer.</strong> A non-scratch sponge for most things,
            and a mesh sink strainer or a scrap of window screen to catch food bits from the gray
            water.
          </li>
          <li>
            <strong>Something to dry on.</strong> A quick-dry towel, a mesh hanging bag, or just a
            clean dish towel spread on the table.
          </li>
          <li>
            <strong>A pot for heating water.</strong> Whatever you cooked in works. Warm water cuts
            grease far better than cold.
          </li>
        </ul>

        <h2>Scrape and wipe before anything gets wet</h2>
        <p>
          This step does most of the work. Scrape every plate into the trash bag, then wipe pans,
          pots, and greasy plates with a paper towel. The less food that reaches the wash basin,
          the longer one basin of water stays usable and the less there is to strain later.
        </p>
        <p>
          A good trick for pots with stuck-on food: as soon as you serve, pour an inch of water
          into the pot and set it back on the warm stove. By the time dinner is over, the crust
          lifts off with a spoon.
        </p>

        <h2>The two-basin method, step by step</h2>
        <ol>
          <li>
            <strong>Heat the water.</strong> Warm a pot of water on the stove while you eat. It
            does not need to boil for washing; comfortably hot to the touch is right.
          </li>
          <li>
            <strong>Fill both basins.</strong> Warm water and a few drops of soap in the first
            basin. Clean water, warm or cold, in the second.
          </li>
          <li>
            <strong>Wash from cleanest to dirtiest.</strong> Cups and utensils first, then plates
            and bowls, then the cooking pots and pans last. The water stays cleaner longer.
          </li>
          <li>
            <strong>Rinse in the second basin.</strong> Dunk and swish so no soap residue is left,
            which is what gives camp cooks an upset stomach the next day.
          </li>
          <li>
            <strong>Air dry.</strong> Set dishes upside down on a towel or hang them in a mesh bag.
            Air drying is more sanitary than wiping with a towel that has been used all weekend.
          </li>
        </ol>
        <p>
          Some campers add a third basin with about a tablespoon of unscented household bleach per gallon of water for
          sanitizing, which is worth doing on longer trips or if anyone has handled raw meat. For a
          weekend of family meals, hot water and a good rinse are usually enough.
        </p>

        <SkillMediaBlock
          video={{
            url: 'https://www.youtube-nocookie.com/embed/hODEilheaPc',
            title: 'Dishwashing for Frontcountry: Leave No Trace Skills Series (Leave No Trace)',
          }}
        />

        <h2>Where the dirty water goes</h2>
        <p>
          Gray water is the part people get wrong most often. Pour the used wash and rinse water
          through your strainer into an empty bucket or onto the ground, and put the caught food
          bits in the trash. Then:
        </p>
        <ul>
          <li>
            <strong>Use the campground drain if there is one.</strong> Many state parks and some
            national forest campgrounds have a gray water drain or a utility sink. Check the
            campground map or ask the host.
          </li>
          <li>
            <strong>Otherwise, scatter it.</strong> Broadcast the strained water over a wide area at
            least 200 feet (about 70 big steps) from any lake, stream, or spring, as Leave No Trace
            recommends.
          </li>
          <li>
            <strong>Never in these places.</strong> Not in a restroom sink, a vault toilet, the fire
            ring, or any body of water. Biodegradable soap breaks down in soil, not in water.
          </li>
        </ul>

        <h2>Bear country and critters</h2>
        <p>
          Food smell on dishes is just as attractive to raccoons and bears as the food itself. Wash
          up right after dinner rather than leaving a stack until morning, and store clean dishes,
          soap, and the scrubber with your food in the car or a bear locker. If you camp where
          bears are active, the <Link href="/guides/camping-in-bear-country-with-kids">bear country
          guide</Link> covers the full food storage routine.
        </p>

        <h2>Fall camping: when the water is already off</h2>
        <p>
          This catches families every October. Many campgrounds shut off their water systems weeks
          before the gates close to keep pipes from freezing, so you can arrive at an open
          campground with no working spigot. Check the campground page or call ahead, and read{' '}
          <Link href="/guides/when-do-campgrounds-close">when campgrounds close for the
          season</Link> for how to find the real date.
        </p>
        <p>
          If the water is off, bring your own. Plan about a gallon per person per day for drinking
          and cooking, plus 1 to 2 gallons per meal for dishes. A pair of rigid jugs like the{' '}
          <AmazonLink productId="reliance-aqua-tainer-7gal-2pack" pageSlug="how-to-wash-dishes-camping" /> covers
          a family weekend: one jug for drinking water, one for washing, so nobody fills a water
          bottle from the dish jug by mistake.
        </p>
        <p>
          Cold weather changes the routine a little too. Grease sets up fast in cold water, so heat
          the wash water hotter than you would in summer and wipe pans while they are still warm.
          Dishes take longer to air dry on a chilly evening, so give them a quick towel dry before
          packing them away. One-pot meals from the{' '}
          <Link href="/guides/cold-weather-camping-meals">cold-weather camping meals guide</Link>{' '}
          mean fewer pots to wash in the first place.
        </p>

        <h2>Ways to make less to wash</h2>
        <ul>
          <li>
            <strong>Plan one-pot and foil-packet dinners.</strong> Foil packets leave nothing to
            wash at all.
          </li>
          <li>
            <strong>Give everyone one plate, one bowl, one cup for the weekend.</strong> A strip of
            colored tape on each one ends arguments about whose cup is whose.
          </li>
          <li>
            <strong>Prep at home.</strong> Chop vegetables and mix pancake batter before you leave
            so the cutting boards and mixing bowls stay in your kitchen. The{' '}
            <Link href="/guides/how-to-pack-a-cooler">cooler packing guide</Link> covers how to pack
            prepped food so it stays cold.
          </li>
          <li>
            <strong>Give kids a job.</strong> Drying and sorting utensils is a perfect task for a
            five-year-old, and kids who help clean up waste less food the next meal.
          </li>
        </ul>

        <h2>Frequently asked</h2>
        <h3>Can you wash dishes in the campground bathroom sink?</h3>
        <p>
          Usually not. Most campgrounds prohibit it because food clogs the drains and draws animals
          to the buildings. Use a designated utility sink if there is one, or wash at your site.
        </p>
        <h3>Where do you dump dish water when camping?</h3>
        <p>
          Use the campground gray water drain if one exists. Otherwise strain out the food, then
          scatter the water widely at least 200 feet from any lake, stream, or spring.
        </p>
        <h3>Is biodegradable soap safe to use in a lake or stream?</h3>
        <p>
          No. It breaks down in soil, not water, and still harms aquatic life. Use it in a basin and
          dispose of the water well away from the shore.
        </p>
        <h3>How much water do you need to wash dishes while camping?</h3>
        <p>
          About 1 to 2 gallons per meal for a family of four, less if you scrape and wipe first. If
          the campground water is off, bring that on top of a gallon per person per day for
          drinking.
        </p>
      </GuidePage>
      <GuideGearShelf guideSlug="how-to-wash-dishes-camping" heading="A camp dish station that packs small" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-wash-dishes-camping" />
    </>
  )
}
