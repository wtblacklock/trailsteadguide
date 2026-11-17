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

const SLUG = '/guides/winter-camping-packing-list'
const TITLE = 'Winter Camping Packing List'
const META_TITLE = 'Winter Camping Packing List for Families'
const DESCRIPTION =
  'A winter camping packing list for a family, by category: the sleep system, clothing counts per kid, cold-weather kitchen, and what rides in the warm car.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1455496231601-e6195da1f841?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What should a family pack for winter camping?',
            a: 'Start with a normal weekend list and change three categories. Sleep: a bag rated at least 10 degrees below the forecast low for every person, plus two pads each, a closed-cell foam pad under an insulated pad. Clothing: a separate dry set of base layers, socks, and a hat for bed, plus two or three pairs of socks and two pairs of gloves per kid per day. Kitchen: more fuel, insulated bottles, and a thermos for hot drinks. Add headlamps with spare batteries and hand warmers.',
          },
          {
            q: 'How many clothes should kids bring for winter camping?',
            a: 'For a two-night trip, plan per child on two base layer sets (one for day, one kept dry for bed), a fleece, a puffy jacket, waterproof outer layers, at least six pairs of wool or synthetic socks, two hats, and two or three pairs of gloves or mittens. Kids get wet in snow and slush faster than adults, and wet clothes are what make them cold, so the spares matter more than the main outfit. No cotton anywhere.',
          },
          {
            q: 'What sleeping bag temperature rating do you need for winter camping?',
            a: 'A good rule is a bag rated at least 10 degrees below the coldest forecast low, because the rating on most bags is a survival limit rather than a comfortable night. For a night near 20 degrees, that means a 0 to 10-degree bag. The sleeping pad matters just as much: put a closed-cell foam pad under an insulated pad so the combined R-value is around 5 or more on frozen ground.',
          },
          {
            q: 'What should you not bring winter camping?',
            a: 'Cotton clothing, including jeans, hoodies, and cotton socks, because cotton stays wet and cold. Skip an air mattress with no insulation on top, since the air inside gets cold and chills you from below. Never bring a fuel-burning heater, grill, or stove into a tent, because of the carbon monoxide risk. If you plan to use any heater, read the safety rules first and stick to electric heat at an electric site.',
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
        slug="winter-camping-packing-list"
        eyebrow="Packing"
        title="Winter Camping Packing List"
        lede="The cold-weather version of our weekend family list, by category, with real counts per kid. Built for a car camping trip in a tent, cabin, or yurt from late fall through winter."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Dome tent pitched in deep snow among snow-covered evergreens, with snowshoes resting by the door',
        }}
        dateModified="2026-11-07"
      >
        <QuickAnswer
          tldr="Pack for the forecast low, not the high. Two pads and a warmer bag for every person, a separate dry set of clothes for bed, extra socks and gloves for kids, and a thermos."
          summary="A family winter camping packing list starts from a normal weekend list and changes four categories. Sleep: every person gets a sleeping bag rated at least 10 degrees below the forecast low, plus two pads, a closed-cell foam pad under an insulated one. Clothing: layers with no cotton, a separate dry set of base layers, socks, and a hat kept only for bed, and for each kid at least six pairs of socks and two or three pairs of gloves for a two-night trip. Kitchen: extra stove fuel, a thermos for hot drinks, insulated bottles, and dinners made at home that only need reheating. Light and warmth: a headlamp per person with spare lithium batteries, a lantern, and hand warmers. Pack the bedtime clothes, snacks, and warmers in a bag that rides inside the warm car, not the cold trunk."
        />

        <h2>How to use this list</h2>
        <p>
          This is the cold-weather counterpart to our{' '}
          <Link href="/guides/weekend-camping-packing-list">weekend camping packing list</Link>. Keep
          everything on that list and use this page to upgrade and add. It assumes a family of four
          car camping for two nights with lows somewhere between the 40s and the teens. If the whole
          idea of a winter trip is new to you, or you are deciding between a tent and a cabin, start
          with <Link href="/guides/winter-camping-for-beginners">winter camping for beginners</Link>{' '}
          and come back here to pack.
        </p>
        <p>
          The rule that runs through every category: pack for the forecast low, then one step
          colder. Mountain forecasts miss on the cold side often enough that a little margin is cheap
          insurance.
        </p>

        <h2>Sleep system (per person)</h2>
        <ul>
          <li>
            <strong>Sleeping bag rated at least 10 degrees below the forecast low.</strong> Most
            temperature ratings describe the edge of survivable, not a good night. For a 20-degree
            night, an adult wants a 0 to 10-degree bag like the{' '}
            <AmazonLink productId="teton-celsius-xxl-0" pageSlug="winter-camping-packing-list" />.
          </li>
          <li>
            <strong>Kid bags sized to the kid.</strong> A child in an adult bag has a lot of empty
            space to heat. A kid-length bag such as the{' '}
            <AmazonLink productId="teton-junior-20" pageSlug="winter-camping-packing-list" /> is
            warmer for its rating. Our{' '}
            <Link href="/guides/best-camping-sleeping-bag-for-kids">kids sleeping bag guide</Link>{' '}
            compares options.
          </li>
          <li>
            <strong>Two pads, stacked.</strong> A closed-cell foam pad such as the{' '}
            <AmazonLink productId="therm-a-rest-z-lite-sol" pageSlug="winter-camping-packing-list" />{' '}
            on the bottom, an insulated inflatable pad on top. Frozen ground pulls heat faster than
            cold air, so the pad matters as much as the bag. The numbers are explained in{' '}
            <Link href="/guides/sleeping-pad-r-value-explained">sleeping pad R-value explained</Link>.
          </li>
          <li>
            <strong>A bag liner</strong> for anyone whose bag is borderline. A{' '}
            <AmazonLink
              productId="sea-to-summit-reactor-extreme-liner"
              pageSlug="winter-camping-packing-list"
            />{' '}
            adds warmth to a bag you already own.
          </li>
          <li>
            <strong>Pillow, or a stuff sack filled with tomorrow&apos;s puffy.</strong> Keeping the
            jacket in the bag also means it is warm in the morning.
          </li>
          <li>
            <strong>An extra blanket per family</strong> to drape over the coldest sleeper.
          </li>
        </ul>

        <h2>Shelter and campsite</h2>
        <ul>
          <li>Tent with a full-coverage rainfly, or a cabin or yurt reservation.</li>
          <li>Ground tarp or footprint, folded so no edge sticks out to catch melt.</li>
          <li>
            Stronger stakes. Frozen ground bends thin wire stakes, so bring steel stakes and a mallet.
          </li>
          <li>A small whisk broom and a towel for snow and slush inside the tent door.</li>
          <li>A doormat or foam square for the vestibule, so boots come off on something dry.</li>
          <li>Snow shovel if there is any chance of snow on the site.</li>
        </ul>

        <h2>Clothing (per kid, two nights)</h2>
        <p>
          Kids get wet faster than adults: they kneel in snow, sit on cold benches, and step in every
          puddle. Wet clothing, not air temperature, is what makes most kids cold, so pack spares
          generously.
        </p>
        <ul>
          <li>2 base layer sets, top and bottom, wool or synthetic. One is only for sleeping.</li>
          <li>1 fleece or wool mid layer, plus 1 spare.</li>
          <li>1 puffy jacket.</li>
          <li>Waterproof jacket and snow pants or rain pants.</li>
          <li>At least 6 pairs of wool or synthetic socks.</li>
          <li>2 or 3 pairs of waterproof gloves or mittens, plus thin liner gloves.</li>
          <li>2 warm hats, one kept dry for bed.</li>
          <li>Insulated waterproof boots, plus camp shoes or booties for the tent.</li>
          <li>Neck gaiter or buff.</li>
        </ul>
        <p>
          Adults need the same layers with fewer spares: one base set for day, one for bed, four pairs
          of socks, and two pairs of gloves. And for everyone: no cotton, including jeans, hoodies,
          and cotton socks. For what kids should actually wear into the bag, see{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>.
        </p>

        <h2>Kitchen</h2>
        <ul>
          <li>
            Two-burner propane stove, such as the{' '}
            <AmazonLink productId="coleman-triton-2-burner" pageSlug="winter-camping-packing-list" />
            , plus twice the fuel you would bring in summer. Keep spare canisters out of the coldest
            spot. Why fuel struggles in the cold is covered in{' '}
            <Link href="/guides/camp-stove-fuel-in-cold-weather">
              camp stove fuel in cold weather
            </Link>
            .
          </li>
          <li>A long lighter and a backup, kept in an inside pocket where they stay warm.</li>
          <li>One big pot for heating water and reheating dinner, plus a kettle if you have one.</li>
          <li>
            A large thermos, like the{' '}
            <AmazonLink
              productId="thermos-stainless-king-40oz"
              pageSlug="winter-camping-packing-list"
            />
            , filled with hot water or cocoa so a warm drink is ready without lighting the stove.
          </li>
          <li>Insulated mugs with lids for everyone.</li>
          <li>Water jugs stored inside the car or tent so they do not freeze solid.</li>
          <li>
            Dinners made at home that only need reheating: chili, soup, stew. Our{' '}
            <Link href="/guides/cold-weather-camping-meals">cold-weather camping meals</Link> guide has
            a full menu.
          </li>
          <li>Hot drink supplies: cocoa, tea, instant oatmeal, broth packets.</li>
          <li>A high-fat bedtime snack for every sleeper.</li>
          <li>Dish tub and a pot of hot water for washing, since cold water will not cut grease.</li>
        </ul>

        <h2>Light, power, and warmth</h2>
        <ul>
          <li>
            A headlamp per person, plus spares. In late fall and winter it is dark by 5pm, and kids
            need their own light. A multi-pack like the{' '}
            <AmazonLink productId="everbrite-headlamp-5-pack" pageSlug="winter-camping-packing-list" />{' '}
            covers a whole family.
          </li>
          <li>Spare lithium batteries, which handle cold better than alkaline.</li>
          <li>A lantern for the table and one for inside the tent.</li>
          <li>A power bank for phones, kept in a sleeping bag overnight.</li>
          <li>
            Hand and toe warmers, at least two pairs per person per day. A bulk box of{' '}
            <AmazonLink productId="hothands-hand-warmers-bulk" pageSlug="winter-camping-packing-list" />{' '}
            is cheaper than buying at the camp store.
          </li>
          <li>
            Hard plastic water bottles with lids that seal tight, filled with hot water for sleeping bags.
          </li>
        </ul>
        <p>
          If you plan on any heater at all, read{' '}
          <Link href="/guides/tent-heater-safety">tent heater safety</Link> first. Never run a
          fuel-burning heater, grill, or stove inside a tent.
        </p>

        <h2>Safety and first aid</h2>
        <ul>
          <li>
            A family first aid kit, with extra blister care and an emergency blanket. See the{' '}
            <Link href="/guides/camping-first-aid-kit-for-families">
              camping first aid kit for families
            </Link>{' '}
            list.
          </li>
          <li>Lip balm and sunscreen. Snow reflects sun, and cold wind chaps skin quickly.</li>
          <li>A printed map and the park&apos;s phone number, since cell coverage is often weak.</li>
          <li>A full tank of gas, an ice scraper, and a car emergency kit.</li>
          <li>Blaze orange hats or vests if the area is open to hunting.</li>
        </ul>

        <h2>The warm-car bag</h2>
        <p>
          Pack one duffel that rides inside the heated cabin of the car, not the cold trunk or roof
          box. It holds everything that has to be warm and dry at bedtime: the sleep base layers, bed
          hats, dry socks, hand warmers, the bedtime snacks, headlamps, and phone batteries. When you
          arrive after dark, that bag goes straight into the tent, and nothing that kids will sleep in
          spends the drive in a freezing trunk.
        </p>

        <h2>What to leave home</h2>
        <ul>
          <li>Cotton clothing of any kind.</li>
          <li>An uninsulated air mattress on its own. If you bring one, put foam on top of it.</li>
          <li>Glass bottles and anything that cracks when frozen.</li>
          <li>Fuel-burning heaters for inside the tent.</li>
          <li>A schedule packed with activities. Short days mean simple plans.</li>
        </ul>

        <h2>Frequently asked</h2>
        <h3>What should a family pack for winter camping?</h3>
        <p>
          A normal weekend list, upgraded: a warmer bag and two pads per person, a dry set of clothes
          for bed, extra socks and gloves for kids, more stove fuel, a thermos, headlamps with spare
          batteries, and hand warmers.
        </p>
        <h3>How many clothes should kids bring for winter camping?</h3>
        <p>
          For two nights, two base layer sets, a fleece, a puffy, waterproof outer layers, at least
          six pairs of socks, two hats, and two or three pairs of gloves per child. No cotton.
        </p>
        <h3>What sleeping bag temperature rating do you need for winter camping?</h3>
        <p>
          At least 10 degrees below the coldest forecast low, paired with a foam pad under an
          insulated pad so the ground does not pull your heat away.
        </p>
        <h3>What should you not bring winter camping?</h3>
        <p>
          Cotton clothing, an uninsulated air mattress on its own, and any fuel-burning heater for use
          inside a tent.
        </p>
      </GuidePage>
      <GuideGearShelf guideSlug="winter-camping-packing-list" heading="Gear for a winter campsite" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="winter-camping-packing-list" />
    </>
  )
}
