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

const SLUG = '/guides/how-to-set-up-a-camp-kitchen'
const TITLE = 'How to Set Up a Camp Kitchen'
const META_TITLE = 'How to Set Up a Camp Kitchen'
const DESCRIPTION =
  'How to set up a camp kitchen for a family: a simple layout, the table and stove, a wash station, wildlife-proof food storage, and light for dark dinners.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1783884999667-c1d76787c423?w=1400&auto=format&fit=crop&q=80'

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
            q: 'How do you organize a camp kitchen?',
            a: 'Set it up in a line that follows the food: storage, then prep, then cooking, then washing. The cooler and food bin sit at one end, a cutting board and prep space next, the stove in the middle of a stable table, and the water jug and wash basin at the far end. Keep every kitchen item in one or two dedicated bins that stay packed between trips, so setup at camp is just opening the lids and nothing gets left at home.',
          },
          {
            q: 'Where should the camp kitchen go at a campsite?',
            a: 'On the picnic table or a flat, level spot near it, well away from the tents and downwind of them if you can manage it, so cooking smells do not drift where people sleep. Keep the stove a safe distance from the fire ring and out of the main path kids use to run through the site. In bear country, many campgrounds ask that the kitchen and food storage be a good distance from the tents, so follow the posted rules.',
          },
          {
            q: 'Do you need a separate table for a camp kitchen?',
            a: 'Not for a first trip. Most developed campsites have a picnic table, and one end of it makes a fine kitchen. A folding camp table becomes worth it when you camp often, cook more than simple meals, or want the stove at standing height and off the table where everyone eats. Whatever you use, the stove must sit on a level, stable surface where it cannot be bumped or tipped.',
          },
          {
            q: 'How do you keep animals out of a camp kitchen?',
            a: 'Never leave food, coolers, or trash out unattended, even for a short hike. When the meal is over, wipe the table, put everything back in the cooler or food bin, and lock it in the car or a campground food locker. Raccoons can open unlatched coolers, and squirrels and jays will take anything left on the table in seconds. Keep all food and scented items out of the tent, and follow any food storage rules posted at the campground, especially in bear country.',
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
        slug="how-to-set-up-a-camp-kitchen"
        eyebrow="Camp cooking"
        title="How to Set Up a Camp Kitchen"
        lede="Most camp meals go wrong before anyone turns on the stove: the spatula is buried, the cooler is open in the sun, and the dish water is wherever someone left it. A few minutes of setup turns the picnic table into a kitchen that works for the whole trip."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Hands cooking four fried eggs on a flat griddle propped on stones over a campfire',
        }}
        dateModified="2026-11-29"
      >
        <QuickAnswer
          tldr="Lay the kitchen out in a line from cooler to prep to stove to wash station, keep it away from the tents, pack food away after every meal, and hang a lantern before dark."
          summary="A good camp kitchen is set up in a line that follows the food. The cooler and dry food bin go at one end, a prep space with a cutting board comes next, the stove sits in the middle of a level, stable table, and a wash station with a water jug and basin goes at the far end. Put the kitchen on or beside the picnic table, away from the tents and the fire ring, and out of the path kids run through. Pack every kitchen item into one or two bins that stay packed between trips. After each meal, wipe the table and lock food, coolers, and trash in the car or a food locker, never the tent, because raccoons and birds move fast. Finally, hang a lantern over the table before sunset, since dinner is often after dark in late fall."
        />

        <h2>The layout: a line that follows the food</h2>
        <p>
          The simplest kitchen layout is a line. Food comes out at one end, gets prepped, gets
          cooked, and the dishes get washed at the other end. Nobody has to cross the site carrying a
          hot pan or reach over the stove for a plate.
        </p>
        <ol>
          <li>
            <strong>Storage.</strong> The cooler and a bin of dry food and spices, in the shade, at
            one end of the table or on the ground beside it.
          </li>
          <li>
            <strong>Prep.</strong> A cutting board, a knife, and a bit of clear table space. This is
            the best spot for a kid helper.
          </li>
          <li>
            <strong>Cooking.</strong> The stove, set on the most level part of the table, with tongs
            and a spatula on a hook or towel next to it.
          </li>
          <li>
            <strong>Washing.</strong> A water jug, a wash basin, and a trash bag at the far end,
            closest to where you will toss gray water.
          </li>
        </ol>
        <p>
          If you are a right-handed cook, running the line left to right usually feels natural. More
          important is that the stove end is the end farthest from where people sit to eat, so
          nobody reaches across a hot burner for the ketchup.
        </p>

        <h2>Where to put it at the site</h2>
        <ul>
          <li>
            <strong>Away from the tents.</strong> Cooking smells and crumbs belong nowhere near where
            people sleep. Downwind of the tents is ideal when the site allows it.
          </li>
          <li>
            <strong>Away from the fire ring.</strong> Give the stove and the fire their own space so
            a kid walking to the fire is not walking through the kitchen.
          </li>
          <li>
            <strong>Out of the main path.</strong> Most sites have a natural route from the car to
            the tent. Keep the stove off it.
          </li>
          <li>
            <strong>On level ground.</strong> A tipped stove or a sliding pot is the most common camp
            kitchen accident. If the picnic table rocks, shim the leg before you light anything.
          </li>
        </ul>
        <p>
          In bear country, many campgrounds post rules about where food and cooking can be, and some
          ask that the kitchen be a set distance from the tents. Follow them.{' '}
          <Link href="/guides/camping-in-bear-country-with-kids">
            Camping in bear country with kids
          </Link>{' '}
          walks through a full family routine.
        </p>

        <h2>The table and the stove</h2>
        <p>
          For a first trip, one end of the campsite picnic table is your kitchen. A folding camp
          table earns its place once you camp often: it gets the stove up to standing height, frees
          up the picnic table for eating, and lets you set the kitchen where you want it instead of
          where the table happens to be.
        </p>
        <p>
          A two-burner propane stove like the{' '}
          <AmazonLink productId="coleman-triton-2-burner" pageSlug="how-to-set-up-a-camp-kitchen" /> is
          the family standard: one burner for the pot, one for the pan. Set it up so the fuel
          cylinder sits on the side away from where people walk, close the wind screens, and light
          it once at home before the trip so you know it works.
        </p>
        <p>
          Two safety rules never bend. Never cook in or right next to a tent, because of both fire
          and carbon monoxide. And never run a stove in an enclosed space; a canopy with open sides
          over the table is fine, a closed tent vestibule is not. In cold weather, fuel behaves
          differently, and{' '}
          <Link href="/guides/camp-stove-fuel-in-cold-weather">camp stove fuel in cold weather</Link>{' '}
          explains why butane sputters and what to do about it.
        </p>
        <p>
          For pots, a nesting set such as the{' '}
          <AmazonLink productId="gsi-glacier-stainless-camper" pageSlug="how-to-set-up-a-camp-kitchen" />{' '}
          packs small and handles most family meals. Add a pair of long{' '}
          <AmazonLink productId="camp-grill-tongs" pageSlug="how-to-set-up-a-camp-kitchen" /> so
          nobody has to lean over the heat.
        </p>

        <h2>The wash station</h2>
        <p>
          Set up the wash station before you cook, not after. A water jug with a spigot, like the{' '}
          <AmazonLink
            productId="reliance-aqua-tainer-7gal-2pack"
            pageSlug="how-to-set-up-a-camp-kitchen"
          />
          , sits at the end of the table so it doubles as the handwashing sink. A{' '}
          <AmazonLink
            productId="montnorth-collapsible-wash-basin"
            pageSlug="how-to-set-up-a-camp-kitchen"
          />{' '}
          and a bottle of biodegradable soap finish it. Put a pot of water on the stove as soon as
          dinner comes off, and it will be warm for dishes by the time everyone has eaten.
        </p>
        <p>
          The actual dishwashing method, including the two-basin setup and where gray water
          goes, is in{' '}
          <Link href="/guides/how-to-wash-dishes-camping">how to wash dishes camping</Link>.
        </p>

        <h2>Food storage and wildlife</h2>
        <p>
          The camp kitchen is the part of the site animals care about. Raccoons work cooler latches,
          squirrels and jays clear a table in seconds, and in some places bears check campsites
          every night. A few habits keep them out:
        </p>
        <ul>
          <li>
            <strong>Nothing left out unattended.</strong> Not during a hike, a trip to the bathroom,
            or an afternoon at the lake.
          </li>
          <li>
            <strong>Pack it away after every meal.</strong> Food goes back in the cooler or the bin,
            and both go in the car or a campground food locker overnight.
          </li>
          <li>
            <strong>Never in the tent.</strong> That includes snacks in a kid&apos;s backpack and
            scented items like toothpaste.
          </li>
          <li>
            <strong>Trash is food too.</strong> Bag it, lock it up with the food, and use the
            campground dumpster before bed. A{' '}
            <AmazonLink productId="fwc-trash-can-wakeman" pageSlug="how-to-set-up-a-camp-kitchen" />{' '}
            keeps the bag upright and the site tidy during the day.
          </li>
          <li>
            <strong>Wipe the table.</strong> Crumbs and spills invite visitors after dark.
          </li>
        </ul>
        <p>
          How you pack the cooler itself, including keeping raw meat sealed and on the bottom and
          keeping drinks in a separate cooler so the food one stays shut, is covered in{' '}
          <Link href="/guides/how-to-pack-a-cooler">how to pack a cooler</Link>.
        </p>

        <h2>Lighting for dinner after dark</h2>
        <p>
          In late fall, sunset comes before dinner in most of the country, so the kitchen needs
          light. Hang a lantern above the middle of the table, not at eye level, so it lights the
          cutting board without blinding the cook. A rechargeable lantern like the{' '}
          <AmazonLink productId="luminaid-packlite-max" pageSlug="how-to-set-up-a-camp-kitchen" />{' '}
          avoids hot glass and fuel near kids. Give the cook a headlamp too, for checking whether the
          pasta is done or the burger is cooked through. Set the lights up before the sun goes down,
          when you can still see what you are doing.
        </p>

        <h2>Keep the kitchen packed between trips</h2>
        <p>
          The best camp kitchens are packed once and left that way. Keep one bin for the stove,
          pots, utensils, and cleaning kit, and a second for dry food and spices. After each trip,
          wash everything, restock the small items like soap, matches, and foil, and put it all back
          in the bin. The next trip starts with grabbing the bins instead of raiding the home
          kitchen and forgetting the can opener.
        </p>
        <p>
          A good layout also makes the cooking easier. For meals that work well with this kind of
          setup, see{' '}
          <Link href="/guides/easy-family-camping-meals">easy family camping meals</Link>, and for
          colder trips,{' '}
          <Link href="/guides/cold-weather-camping-meals">cold weather camping meals</Link>.
        </p>

        <h2>Frequently asked</h2>
        <h3>How do you organize a camp kitchen?</h3>
        <p>
          In a line that follows the food: cooler and dry food, then prep space, then the stove,
          then the wash station. Keep all kitchen gear in one or two bins that stay packed between
          trips.
        </p>
        <h3>Where should the camp kitchen go at a campsite?</h3>
        <p>
          On or beside the picnic table, away from the tents and the fire ring, on level ground,
          and out of the path kids use to run through the site.
        </p>
        <h3>Do you need a separate table for a camp kitchen?</h3>
        <p>
          Not for a first trip, since one end of the picnic table works. A folding camp table is
          worth adding once you camp often or want the stove at standing height.
        </p>
        <h3>How do you keep animals out of a camp kitchen?</h3>
        <p>
          Never leave food, coolers, or trash unattended. Pack everything away after each meal, lock
          it in the car or a food locker, keep food out of the tent, and wipe the table.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="how-to-set-up-a-camp-kitchen"
        heading="Gear for a family camp kitchen"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-set-up-a-camp-kitchen" />
    </>
  )
}
