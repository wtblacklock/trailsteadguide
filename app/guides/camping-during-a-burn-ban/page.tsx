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

const SLUG = '/guides/camping-during-a-burn-ban'
const TITLE = 'Camping During a Burn Ban'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Camping During a Burn Ban: A Family Guide'
const DESCRIPTION =
  'Camping during a burn ban with kids: what Stage 1 and 2 restrictions allow, whether propane fire pits are legal, and how to make a no-campfire night fun.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1513781419235-2988ecacab83?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Can I still cook at my campsite during a burn ban?',
            a: 'Almost always, yes. Nearly every fire restriction order exempts pressurized gas and liquid-fuel stoves that have an on/off valve, because they can be shut off instantly. A standard propane camp stove is the reliable way to cook when wood and charcoal fires are banned. Charcoal grills are usually banned alongside campfires, so leave the briquettes at home. Cook on a cleared, non-flammable surface like a picnic table or gravel pad, keep water nearby, and read the specific order for where you are camping, since a small number of extreme restrictions limit even stoves to developed sites.',
          },
          {
            q: 'Are propane fire pits allowed during a burn ban?',
            a: 'Often, but not always, which is why you have to check the actual order. Many Stage 1 and Stage 2 restrictions allow propane fire pits because they have an on/off valve and produce no embers. Some agencies, though, specifically list portable propane campfires as prohibited, especially under the strictest stages or in high-risk areas. Look for wording about devices fueled by liquid petroleum or LPG with a shutoff valve. If the order does not clearly allow them, or the campground host says no, leave the fire pit in the car.',
          },
          {
            q: 'What is the difference between Stage 1 and Stage 2 fire restrictions?',
            a: 'Stage 1 restrictions typically ban wood and charcoal fires everywhere except inside agency-provided fire rings at developed campgrounds, and often ban smoking outside vehicles or developed sites. Stage 2 restrictions usually ban all wood and charcoal fires everywhere, including developed campground rings, and may restrict chainsaws and other spark sources. Gas stoves with a shutoff valve are allowed under both in most areas. Exact wording varies by agency, so treat these as general patterns and read the order for your forest, park, or county.',
          },
          {
            q: 'How do I find out if there is a burn ban where I am camping?',
            a: 'Check three places before you leave and again the morning you drive. First, the land manager running the campground: the national forest, BLM field office, state park, or county. Their website alerts or fire restrictions page lists current orders. Second, the county, since many counties issue their own burn bans that apply to private campgrounds. Third, call or ask the campground host on arrival, because restrictions can change in a single day when the weather turns hot, dry, and windy.',
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
        slug="camping-during-a-burn-ban"
        eyebrow="Fire restrictions"
        title="Camping During a Burn Ban"
        lede="A burn ban does not cancel the trip. It changes how you cook, how you stay warm, and what the kids do after dark, and all three are easier to solve at home than at the campsite."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'An orange dome tent glowing from a lantern inside at blue hour, pitched in a meadow ringed by pine trees with no campfire',
        }}
      >
        <QuickAnswer
          tldr="Check the exact fire order, cook on a propane stove with a shutoff valve, plan warmth and evening fun that do not depend on flames, and treat a propane fire pit as allowed only if the order says so."
          summary="A burn ban or fire restriction almost never means you have to cancel a family camping trip. It means no wood or charcoal fires, and under stricter stages, not even in the campground fire ring. Propane and liquid-fuel stoves with an on/off valve are allowed in nearly every order, so meals still happen; you just cook them on a stove instead of over coals. Propane fire pits are allowed in many areas but specifically banned in some, so read the actual order rather than assuming. Charcoal grills are usually banned along with campfires, so plan stove-friendly meals like one-pot pasta, quesadillas, and chili, and leave the briquettes at home. Swap the campfire for lanterns, glow sticks, games, and stargazing, and dress kids in warm layers since there is no fire to huddle around. Check restrictions before you leave and again on arrival, because they can tighten overnight."
        />

        <h2>Why fall brings burn bans</h2>
        <p>
          Most families think of fire season as a summer problem, but in much of the country the
          riskiest stretch runs from late summer into fall. Grasses and leaf litter have dried
          out, rain is scarce, and fall cold fronts bring strong, gusty winds. Across the
          Southeast, Texas, the Great Plains, and California, October and November are prime time
          for county burn bans and agency fire restrictions, often landing right on a long
          weekend you already booked.
        </p>
        <p>
          The good news is that a fire restriction is a rule change, not a closure. Campgrounds
          stay open, trails stay open, and the trip still works. What changes is everything you
          were going to do around the campfire.
        </p>

        <h2>What Stage 1 and Stage 2 restrictions usually mean</h2>
        <p>
          Federal land managers and many states use a staged system. The exact wording differs
          from one forest, park, or county to the next, but the general pattern looks like this:
        </p>
        <ul>
          <li>
            <strong>Stage 1.</strong> Wood and charcoal fires are banned everywhere except inside
            agency-provided fire rings or grills at developed campgrounds. Dispersed campers lose
            their fire entirely. Smoking is usually limited to vehicles and developed sites.
          </li>
          <li>
            <strong>Stage 2.</strong> All wood and charcoal fires are banned everywhere, including
            the metal ring at your reserved campground site. Some orders also restrict
            chainsaws, generators without spark arrestors, and other spark sources.
          </li>
          <li>
            <strong>County burn bans.</strong> Separate from agency stages, counties issue their
            own bans that often apply to private campgrounds and RV parks inside the county
            lines. A private campground can still be under a ban even if the nearby national
            forest is not.
          </li>
        </ul>
        <p>
          Under both stages, most orders still allow stoves, lanterns, and heaters that run on
          pressurized gas or liquid fuel and have a shutoff valve. That single exemption is what
          keeps a burn-ban trip comfortable. Violating a fire order is a real citation with a
          real fine, and if your fire escapes, you can be billed for the cost of putting it out.
        </p>

        <h2>How to check before you go</h2>
        <p>Fire restrictions can change in a day, so check twice:</p>
        <ol>
          <li>
            <strong>A few days out,</strong> look up the land manager running your campground,
            whether that is a national forest, BLM field office, state park, or county park. Their
            alerts page or fire restrictions page lists current orders and what they allow.
          </li>
          <li>
            <strong>Check the county too,</strong> especially for private campgrounds. Many
            counties post burn ban status on their emergency management page.
          </li>
          <li>
            <strong>The morning you drive,</strong> check again, then ask the campground host
            when you arrive. Hosts know about new orders before the signs go up.
          </li>
        </ol>
        <p>
          If you are heading to dispersed sites on public land, this matters even more, since
          Stage 1 alone takes away your fire.{' '}
          <Link href="/guides/dispersed-camping-on-blm-and-national-forest-land">
            Dispersed camping on BLM and national forest land
          </Link>{' '}
          covers how those rules work in general.
        </p>

        <h2>Cooking without a campfire</h2>
        <p>
          A propane camp stove is the backbone of a burn-ban trip. A compact single burner such
          as the{' '}
          <AmazonLink productId="coleman-1-burner" pageSlug="camping-during-a-burn-ban" /> boils
          water for oatmeal and hot cocoa, and a two-burner like the{' '}
          <AmazonLink productId="coleman-triton-2-burner" pageSlug="camping-during-a-burn-ban" />{' '}
          handles a full family dinner. Set the stove on a picnic table or a cleared gravel pad,
          away from dry grass, and keep a full water jug within reach while it runs.
        </p>
        <p>
          Plan the menu around the stove instead of trying to adapt campfire recipes. Foil
          packets, roasting sticks, and dutch-oven coals are out. One-pot pastas, quesadillas in a
          skillet, breakfast burritos, and chili all work beautifully on a burner. Charcoal grills
          are banned in nearly every order alongside campfires, so leave the briquettes at home.
          For stove-friendly ideas, see{' '}
          <Link href="/guides/easy-family-camping-meals">easy family camping meals</Link>, and if
          you want to skip cooking for a night,{' '}
          <Link href="/guides/no-cook-camping-meals-kids">no-cook camping meals for kids</Link>{' '}
          fills the gap.
        </p>
        <p>
          S&apos;mores are the part kids will ask about. You can toast marshmallows carefully over
          a stove burner on a long roasting stick, or skip the toasting and make
          &quot;s&apos;mores dip&quot; in a small skillet with chocolate chips and marshmallows on
          low heat. It is not the same as a campfire, but it saves the evening ritual.
        </p>

        <h2>Propane fire pits: often allowed, never assumed</h2>
        <p>
          A portable propane fire pit gives you the glow and warmth of a campfire with no embers
          and an instant off switch. Many Stage 1 and Stage 2 orders allow them under the same
          shutoff-valve exemption that covers stoves, which is why they have become a favorite for
          fall camping. A well-reviewed option is the{' '}
          <AmazonLink productId="outland-firebowl-893" pageSlug="camping-during-a-burn-ban" />,
          which runs on a standard 20-pound tank and packs into its own carry kit.
        </p>
        <p>
          The catch: some agencies specifically list portable propane campfires as prohibited,
          particularly under the strictest stages, and some campgrounds ban them on their own.
          Read the order for wording about devices fueled by liquid petroleum or LPG with a
          shutoff valve. If the order does not clearly allow them, or the host says no, the fire
          pit stays in the car. Even where they are allowed, keep kids an arm&apos;s length back,
          set it on bare ground or gravel, and turn it off before anyone heads to bed.
        </p>

        <h2>Staying warm without a fire</h2>
        <p>
          In fall, the campfire does a lot of quiet work keeping everyone warm between dinner and
          bed. Without it, plan warmth into the clothing instead. Put kids in a fleece or puffy
          layer, a hat, and dry socks as soon as the sun drops, before they get cold rather than
          after. Hand warmers like{' '}
          <AmazonLink productId="hothands-hand-warmers-bulk" pageSlug="camping-during-a-burn-ban" />{' '}
          in pockets help a lot during the evening hang-out. A hot drink made on the stove does
          double duty as warmth and as a bedtime ritual.
        </p>
        <p>
          The shortened evening is also a reason to move bedtime earlier than usual. Kids get cold
          fastest when they are sitting still in the dark, and a warm sleeping bag beats a cold
          camp chair.{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">How to keep kids warm camping</Link>{' '}
          walks through the full cold-night sleep setup.
        </p>
        <p>
          Never bring a stove, grill, or any fuel-burning heater into a tent to make up for the
          missing fire. Carbon monoxide builds up fast in an enclosed space, and it is odorless.
        </p>

        <h2>Making a no-campfire night fun for kids</h2>
        <p>
          The campfire is the natural gathering point, so without one you need a different
          center. Hang a bright lantern such as the{' '}
          <AmazonLink productId="luminaid-packlite-max" pageSlug="camping-during-a-burn-ban" /> over
          the picnic table and make that the hub. Then give the evening a plan:
        </p>
        <ul>
          <li>
            <strong>Glow sticks.</strong> A pack of{' '}
            <AmazonLink productId="glow-stick-necklaces-bulk" pageSlug="camping-during-a-burn-ban" />{' '}
            turns into glow-in-the-dark ring toss, flashlight tag markers, and necklaces that make
            kids easy to spot.
          </li>
          <li>
            <strong>Stargazing.</strong> No firelight means darker skies and better stars. Lay out
            a blanket and let your eyes adjust for 15 minutes.
          </li>
          <li>
            <strong>Card games and trivia</strong> at the lantern-lit table.
          </li>
          <li>
            <strong>Headlamp night hike</strong> on a short, familiar loop, with a headlamp for
            every kid.
          </li>
          <li>
            <strong>Stories anyway.</strong> Circle the camp chairs around the lantern and tell
            them. Kids care about the story far more than the flames.
          </li>
        </ul>
        <p>
          For more after-dark ideas, see{' '}
          <Link href="/guides/camping-after-dark-with-kids">camping after dark with kids</Link>.
          If you were planning to teach the kids fire-building this trip, save it for a wetter
          weekend; our{' '}
          <Link href="/guides/how-to-start-a-campfire">how to start a campfire</Link> guide will
          be there when the ban lifts.
        </p>

        <h2>Other fire-safety habits during a ban</h2>
        <ul>
          <li>
            <strong>Park on gravel or dirt,</strong> never on tall dry grass. A hot exhaust system
            or catalytic converter can ignite it.
          </li>
          <li>
            <strong>Watch for dragging chains</strong> on trailers, which throw sparks along the
            road.
          </li>
          <li>
            <strong>No fireworks,</strong> ever, but especially not now.
          </li>
          <li>
            <strong>Know your exits.</strong> On very windy, dry days, note the campground&apos;s
            way out and keep the car loaded enough to leave quickly if a fire is reported nearby.
          </li>
        </ul>

        <h2>Frequently asked</h2>
        <h3>Can I still cook at my campsite during a burn ban?</h3>
        <p>
          Almost always. Propane and liquid-fuel stoves with an on/off valve are exempt from
          nearly every order. Charcoal grills are usually banned, so cook on a stove set on a
          cleared, non-flammable surface.
        </p>
        <h3>Are propane fire pits allowed during a burn ban?</h3>
        <p>
          Often, but not always. Many orders allow them under the shutoff-valve exemption, and
          some specifically prohibit portable propane campfires. If the order does not clearly
          allow one, leave it in the car.
        </p>
        <h3>What is the difference between Stage 1 and Stage 2 fire restrictions?</h3>
        <p>
          Stage 1 usually allows wood fires only in agency fire rings at developed campgrounds.
          Stage 2 usually bans wood and charcoal fires everywhere, including those rings. Gas
          stoves with a shutoff valve are typically allowed under both.
        </p>
        <h3>How do I find out if there is a burn ban where I am camping?</h3>
        <p>
          Check the land manager&apos;s fire restrictions page, the county&apos;s burn ban status,
          and the campground host on arrival. Check again the morning you drive, since orders can
          change in a day.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="camping-during-a-burn-ban"
        heading="Gear for a no-campfire trip"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="camping-during-a-burn-ban" />
    </>
  )
}
