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

const SLUG = '/guides/thanksgiving-camping-with-kids'
const TITLE = 'Thanksgiving Camping With Kids'
const META_TITLE = 'Thanksgiving Camping With Kids: Plan & Menu'
const DESCRIPTION =
  'Thanksgiving camping with kids: where campgrounds are still open in late November, a turkey plan that works over coals, food safety in a cooler, and staying warm.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1783335543126-9afdfff4d4ca?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Where can you go camping over Thanksgiving?',
            a: 'Mostly south and southwest. By late November a large share of seasonal campgrounds in the northern states have closed for the year, and the ones still open often have the water turned off. Florida, the Gulf Coast, Texas, southern Arizona, and the southern California deserts are in their best camping season, which also makes them busy. Closer to home, many state parks keep a winterized loop, cabins, or yurts open all year, and those are a good option for a family that wants the trip without a hard freeze in a tent.',
          },
          {
            q: 'How do you cook a turkey while camping?',
            a: 'Skip the whole bird. A 3 to 4 pound boneless turkey breast or a few turkey thighs fit in a 10-inch camp Dutch oven and cook in roughly an hour to an hour and a half over charcoal. For a 10-inch oven at about 350 degrees, use around 20 briquettes, about 14 on the lid and 6 underneath, and add a few more on a cold or windy day. The time is only a guide: the turkey is done when an instant-read thermometer shows 165 degrees in the thickest part.',
          },
          {
            q: 'How do you keep Thanksgiving food safe in a cooler?',
            a: 'Keep the cooler at 40 degrees or below, pack raw turkey sealed and on the bottom so it cannot drip onto anything else, and bring a thawed bird rather than a frozen one, because thawing in the refrigerator takes about a day for every 4 to 5 pounds. Cooked food should not sit out longer than two hours, which is easy to lose track of during a long campfire meal. Get leftovers back into the cooler promptly and reheat them to 165 degrees.',
          },
          {
            q: 'Is it too cold to go tent camping with kids at Thanksgiving?',
            a: 'Not in the right place with the right sleep system, but plan for a real cold night. Even in the desert Southwest, late November lows commonly drop into the 30s or 40s, and sunset comes before 5:30pm across most of the country, so kids spend a long evening in the cold. Pack a 20-degree bag and an insulated sleeping pad for every child, warm layers for bed, and a cabin or yurt fallback if the forecast turns. If the trip includes a hard freeze, book the cabin.',
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
        slug="thanksgiving-camping-with-kids"
        eyebrow="Holiday weekend"
        title="Thanksgiving Camping With Kids"
        lede="A four-day weekend, school out, and campgrounds far quieter than summer. Thanksgiving is a great family camping trip if you pick a place that is still open, shrink the turkey to fit a Dutch oven, and plan for a long, cold evening."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Cast iron pots and a kettle hanging over a bright campfire at a grassy campsite',
        }}
        dateModified="2026-09-17"
      >
        <QuickAnswer
          tldr="Camp where it is still open (south, southwest, or a state park cabin), cook a turkey breast in a Dutch oven, trust a thermometer, and pack for a 35-degree night."
          summary="Thanksgiving camping works best when you plan around three late-November realities. First, many northern campgrounds have closed for the season, so families head to Florida, the Gulf Coast, Texas, southern Arizona, or the southern California deserts, or book a state park cabin or yurt closer to home. Those warm-weather parks are in peak season, so reserve early. Second, a whole turkey does not belong at a campsite. A 3 to 4 pound boneless breast or turkey thighs cook in a 10-inch Dutch oven over about 20 charcoal briquettes, and an instant-read thermometer showing 165 degrees is the only reliable test. Pre-cook the sides at home and reheat them. Third, the night is long and cold: sunset comes before 5:30pm in most places and lows in the 30s are normal, so every kid needs a 20-degree bag, an insulated pad, and dry layers for bed."
        />

        <h2>Pick a campground that is actually open</h2>
        <p>
          The first planning trap is assuming your favorite summer campground is still running. By
          Thanksgiving, a large share of seasonal campgrounds across the northern states have closed
          for the year. Some that stay open shut off the water, close the bathhouses, and leave only
          vault toilets. Check the specific campground page for its season dates and which loops and
          facilities stay open, not just whether the park itself is open.
        </p>
        <p>The places that are genuinely good in late November fall into three groups:</p>
        <ul>
          <li>
            <strong>Warm-weather destinations.</strong> Florida, the Gulf Coast, Texas, southern
            Arizona, and the southern California deserts are in their prime camping season. See{' '}
            <Link href="/guides/camping-in-florida-for-beginners">camping in Florida</Link>,{' '}
            <Link href="/guides/camping-in-texas-for-beginners">camping in Texas</Link>, and{' '}
            <Link href="/guides/camping-in-arizona-for-beginners">camping in Arizona</Link> for
            where to start.
          </li>
          <li>
            <strong>State park cabins and yurts.</strong> Many state park systems keep cabins or
            yurts open all year, including in cold states. For a family whose kids have never slept
            through a cold night, this is the smart version of the trip: the campfire, the hike, and
            the meal outdoors, with a heated room for sleeping.
          </li>
          <li>
            <strong>Year-round loops closer to home.</strong> Some state parks keep one winterized
            loop open. Expect fewer amenities and much quieter neighbors, which is half the appeal.
          </li>
        </ul>

        <h2>Book it now, not in November</h2>
        <p>
          The quiet-campground reputation does not apply to the warm-weather parks. Thanksgiving
          week is one of their busiest stretches, because every family with a four-day weekend is
          heading to the same short list of places that are warm. Federal campgrounds and many state
          systems release sites on a rolling window of roughly six months, which means Thanksgiving
          sites at popular federal campgrounds went on sale in late May. Some state systems open
          further out than that.
        </p>
        <p>
          If you are planning in the fall for this year, the best options are cancellation alerts,
          first-come sites where they exist, weeknight arrivals on the Tuesday or Wednesday, and
          cabins, which people often overlook. The mechanics of the booking window are in{' '}
          <Link href="/guides/recreation-gov-reservation-strategy">
            recreation.gov reservation strategy
          </Link>
          .
        </p>

        <h2>Shrink the turkey to fit the campsite</h2>
        <p>
          A whole 14-pound turkey is a home-oven project. At a campsite it does not fit in a normal
          Dutch oven, takes hours of coal management in cold air, and is very hard to cook evenly.
          The camp version keeps the meal and drops the difficulty.
        </p>
        <ul>
          <li>
            <strong>Cook a breast or thighs, not a whole bird.</strong> A 3 to 4 pound boneless
            turkey breast roast or three or four bone-in thighs fit in a{' '}
            <AmazonLink productId="lodge-dutch-oven" pageSlug="thanksgiving-camping-with-kids" />.
          </li>
          <li>
            <strong>Use the coal rule.</strong> For a 10-inch Dutch oven at about 350 degrees, start
            with around 20 briquettes: roughly 14 on the lid and 6 underneath in a ring. Cold air and
            wind pull heat away, so add a few extra briquettes on a chilly evening and rotate the lid
            a quarter turn every 15 minutes to avoid hot spots.
          </li>
          <li>
            <strong>Plan on roughly an hour to an hour and a half.</strong> Treat that as a guess,
            not a rule. Fresh coals will be needed partway through a long cook, so light a second
            batch in a chimney about 45 minutes in.
          </li>
          <li>
            <strong>Let the thermometer decide.</strong> Turkey is done at 165 degrees in the
            thickest part, and there is no reliable way to judge that by look over coals at dusk. A
            cheap{' '}
            <AmazonLink
              productId="temppro-instant-read-thermometer"
              pageSlug="thanksgiving-camping-with-kids"
            />{' '}
            with a backlit display settles it in a second.
          </li>
        </ul>
        <p>
          Leave the turkey fryer at home. Fire safety organizations, including the NFPA, discourage
          consumer turkey fryers even in a driveway, and a campsite with kids running around, uneven
          ground, and dry leaves is a worse place for a pot of hot oil. Check the campground rules on
          charcoal too, and use the fire ring or a raised grill rather than bare ground.
        </p>

        <figure className="not-prose my-12">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-stone-200 ring-1 ring-stone-200">
            <iframe
              src="https://www.youtube-nocookie.com/embed/AFMlhu02xCQ"
              title="How to Use a Dutch Oven at Camp"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          </div>
          <figcaption className="mt-3 text-xs text-stone-500">
            L.L.Bean: How to Use a Dutch Oven at Camp - coal placement, heat control, and the basics
            worth practicing before the holiday meal.
          </figcaption>
        </figure>

        <h2>Make the sides at home</h2>
        <p>
          The turkey is the fun part to cook outdoors. Everything else is easier made in your own
          kitchen the day before and reheated. Stuffing, mashed potatoes, and gravy reheat well in a
          pot on a two-burner stove. Cranberry sauce and pie need no reheating at all. Pack each side
          in a flat, sealed container so it stacks in the cooler and does not slosh.
        </p>
        <p>
          That leaves one pot of turkey on the coals and one or two pots on the stove, which is a
          manageable camp kitchen instead of an overwhelming one. For more make-ahead ideas, see{' '}
          <Link href="/guides/easy-family-camping-meals">easy family camping meals</Link>.
        </p>

        <h2>Food safety in a cooler</h2>
        <p>
          A holiday meal is a lot of perishable food, a lot of raw poultry, and a long, distracted
          evening. A few rules keep it from becoming a stomachache:
        </p>
        <ul>
          <li>
            <strong>Keep the cooler at 40 degrees or below.</strong> Late-November weather helps, but
            a cooler in the sun in Florida or Arizona still warms up fast. Keep it in the shade.
          </li>
          <li>
            <strong>Bring the turkey thawed.</strong> Thawing in a refrigerator takes about a day for
            every 4 to 5 pounds, so a frozen breast needs to start thawing at home several days out.
          </li>
          <li>
            <strong>Raw turkey goes sealed and on the bottom.</strong> Double-bag it so it cannot
            drip onto the sides or anything eaten cold. Packing order matters, and{' '}
            <Link href="/guides/how-to-pack-a-cooler">how to pack a cooler</Link> covers it.
          </li>
          <li>
            <strong>Two hours out, then back in the cooler.</strong> Cooked food should not sit out
            longer than two hours, or one hour above 90 degrees. Around a campfire, that window
            closes quietly while everyone is talking.
          </li>
          <li>
            <strong>Reheat leftovers to 165 degrees.</strong> The same thermometer works for the
            next-day turkey sandwiches warmed in a skillet.
          </li>
        </ul>

        <h2>Plan for a long, cold evening</h2>
        <p>
          Late November has some of the shortest days of the year. Sunset lands before 5:30pm in
          most of the country and closer to 4:30pm in the north, so the Thanksgiving meal happens
          in the dark whether you plan it or not. Start the turkey by mid-afternoon, set up lights
          before sunset, and give every kid a headlamp.
        </p>
        <p>
          Overnight lows in the 30s are normal, even in desert parks that feel warm at 2pm. The
          ground takes more heat from a sleeping child than the air does, so an insulated sleeping
          pad matters as much as the bag. Put every kid in a 20-degree bag, dry base layers, and a
          warm hat for bed. The full cold-night system, including what to do when a kid wakes up
          cold, is in{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>.
        </p>
        <p>
          In much of the Midwest and Northeast, rifle deer season overlaps Thanksgiving week. If you
          are hiking in state forests or public hunting land, put kids in blaze orange hats or vests
          and stay on marked trails.
        </p>

        <h2>Give kids real jobs</h2>
        <p>
          The trip lands best when kids help make the meal rather than wait for it. Good jobs by age:
        </p>
        <ul>
          <li>
            <strong>Little kids:</strong> gather leaves to decorate the picnic table, set out plates,
            and fill a gratitude jar with notes read aloud around the fire.
          </li>
          <li>
            <strong>Older kids:</strong> count briquettes, check the time on the lid rotation, and
            read the thermometer with an adult standing by.
          </li>
          <li>
            <strong>Everyone:</strong> a short afternoon hike while the turkey cooks, and a pie or
            s&apos;mores course around the fire afterward. The{' '}
            <Link href="/guides/campfire-recipes-for-kids">campfire recipes for kids</Link> guide
            has more ideas kids can make themselves.
          </li>
        </ul>
        <p>
          If your family already did a campground{' '}
          <Link href="/guides/halloween-camping-with-kids">Halloween weekend</Link> in October,
          Thanksgiving is the natural next trip: a similar cold night, fewer crowds outside the warm
          states, and a meal that becomes the thing kids remember.
        </p>

        <h2>Frequently asked</h2>
        <h3>Where can you go camping over Thanksgiving?</h3>
        <p>
          Mostly south and southwest: Florida, the Gulf Coast, Texas, southern Arizona, and the
          southern California deserts. Closer to home, look for state parks with a year-round loop,
          cabins, or yurts, since many northern campgrounds close for the season by late November.
        </p>
        <h3>How do you cook a turkey while camping?</h3>
        <p>
          Cook a 3 to 4 pound boneless breast or turkey thighs in a 10-inch Dutch oven with about 20
          briquettes, roughly 14 on top and 6 below. Plan on an hour to an hour and a half, and call
          it done at 165 degrees on an instant-read thermometer.
        </p>
        <h3>How do you keep Thanksgiving food safe in a cooler?</h3>
        <p>
          Keep the cooler at 40 degrees or below, bring the turkey thawed and sealed on the bottom,
          put cooked food away within two hours, and reheat leftovers to 165 degrees.
        </p>
        <h3>Is it too cold to go tent camping with kids at Thanksgiving?</h3>
        <p>
          Not with the right sleep system, but expect lows in the 30s and a sunset before 5:30pm.
          Give each kid a 20-degree bag, an insulated pad, and dry layers, and keep a cabin fallback
          for a hard freeze.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="thanksgiving-camping-with-kids"
        heading="Gear for a Thanksgiving campsite"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="thanksgiving-camping-with-kids" />
    </>
  )
}
