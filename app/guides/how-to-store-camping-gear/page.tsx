import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/how-to-store-camping-gear'
const TITLE = 'How to Store Camping Gear for the Off-Season'
const META_TITLE = 'How to Store Camping Gear for the Off-Season'
const DESCRIPTION =
  'How to store camping gear over winter: drying the tent, storing sleeping bags uncompressed, pulling batteries before they corrode, propane rules, and a bin system that survives a garage.'
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
            q: 'How should you store a tent long term?',
            a: 'Completely dry, loosely packed, and somewhere with a stable temperature. Set the tent up at home or hang the fly over a railing until the floor and the fly are bone dry, including the seams and the corners where water pools. Then fold it differently than last time so the creases do not land in the same place year after year, and store it loose in a pillowcase or an oversized sack rather than crammed into its original stuff sack. Mildew in coated tent fabric is permanent: it eats the polyurethane coating, and no amount of washing brings the waterproofing back.',
          },
          {
            q: 'Can you store a sleeping bag in its stuff sack?',
            a: 'Not for the off-season. A stuff sack is for the drive to the campground, not for eight months in a garage. Insulation works by trapping air in lofted fibers or down clusters, and months of compression permanently flattens some of that loft. The bag comes out thinner, and it will not keep a child as warm at 35 degrees as it did last fall. Hang bags in a closet, lay them flat under a bed, or keep them loose in a big breathable cotton or mesh sack. Most bags ship with an oversized storage sack for exactly this reason.',
          },
          {
            q: 'Do you need to take the batteries out of camping lanterns and headlamps?',
            a: 'Yes, and it is the single most-skipped step. Alkaline cells left in a device for months leak potassium hydroxide, which crusts the contacts and quietly kills the lantern, the headlamp, or the kid toy it was sitting in. Pull every battery before the gear goes in the bin, tape the terminals of loose cells or keep them in their own small case, and store rechargeable power banks at roughly half charge rather than full or empty.',
          },
          {
            q: 'Where should you store propane canisters over the winter?',
            a: 'Outdoors or in an unheated shed or detached garage, upright, off the ground, and away from anything with a pilot light or a spark. Never in the house, never in a basement with a water heater or furnace, and never left in a car through a summer or a cold snap. Disconnect the canister from the stove before storing either one, and dispose of empties through your local hazardous waste program rather than the household trash.',
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
        slug="how-to-store-camping-gear"
        eyebrow="How-to"
        title="How to Store Camping Gear for the Off-Season"
        lede="Most gear does not die on a trip. It dies in a garage, over a winter, inside a bag nobody opened. Here is the one-evening pass that decides whether your kit works in the spring."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A tent pitched on a frosted autumn ridge above a layer of low cloud at first light',
        }}
        dateModified="2026-09-06"
      >
        <QuickAnswer
          tldr="Do the storage pass within a week of the last trip. Dry the tent completely, store bags and pads uncompressed, pull every battery, and bin the rest with a desiccant pack."
          summary="Run the storage pass within a week of your last trip, not in spring. The tent is the deadline: set it up at home until the floor and fly are bone dry, because mildew eats the waterproof coating permanently and no wash reverses it. Store sleeping bags and pads uncompressed, hung in a closet or loose in a big cotton sack, since months in a stuff sack crushes the loft that keeps kids warm and it does not fully come back. Pull the batteries out of every lantern, headlamp, and lighted toy before they leak and corrode the contacts. Disconnect propane canisters and keep fuel outside the living space, never near a water heater. Everything else goes into gasketed bins with a desiccant pack, grouped by how you unpack at camp rather than by what each item is."
        />

        <h2>Do it now, not in spring</h2>
        <p>
          The damage that ruins camping gear is slow and it happens in the dark. A tent that went
          into its bag slightly damp is mildewed in a week and delaminating by February. A sleeping
          bag stuffed tight in September comes out in May measurably thinner. A headlamp with
          batteries left in it corrodes at its own pace whether or not anyone is watching.
        </p>
        <p>
          None of that is visible on the day you unload the car, which is exactly why the storage
          pass gets skipped. Give it one evening within a week of the last trip, while you still
          remember what got wet and what broke. Spring is too late: by then the damage is done and
          you find out about it the night before a trip.
        </p>
        <p>
          This is the seasonal version of the same discipline in{' '}
          <Link href="/guides/how-to-break-camp">how to break camp</Link>. That guide covers getting
          out of the campground clean. This one covers the eight months afterward.
        </p>

        <h2>The tent is the only real deadline</h2>
        <p>
          Everything else on this list can wait a few days. The tent cannot. Mildew establishes
          itself in coated nylon or polyester within about 24 to 48 hours of being packed damp, and
          it does not just stain: it feeds on the polyurethane waterproof coating on the floor and
          the fly. Once that coating is degraded, the tent leaks, and no wash, spray, or scrub
          restores it. This is how most family tents actually die.
        </p>
        <ul>
          <li>
            <strong>Set it up, do not just drape it.</strong> Pitch the tent in a yard, a garage, or
            a basement so air reaches every surface. Draped over a railing, the folds stay wet.
          </li>
          <li>
            <strong>Check the places that hide water.</strong> The floor corners, the seam tape, the
            base of the door zipper, and the underside of the fly where it touched the ground.
          </li>
          <li>
            <strong>Sweep out the grit first.</strong> Sand and pine needles left in the floor act
            like sandpaper on the coating every time the tent is folded.
          </li>
          <li>
            <strong>Fold it somewhere new.</strong> Refolding along the same creases every year
            cracks the coating in straight lines. Roll it from a different edge than last time.
          </li>
          <li>
            <strong>Store it loose, not stuffed.</strong> An old pillowcase or a laundry bag beats
            the compression sack it shipped in. Save the tight sack for travel.
          </li>
        </ul>
        <p>
          If the fly has stopped beading water, this is the right week to re-proof it, while the
          tent is already up and dry. For the full technique on cleaning, seam care, and folding,
          see <Link href="/skills/shelter/tent-care-and-storage">tent care and storage</Link>.
        </p>

        <h2>Sleeping bags and pads: uncompressed, or ruined</h2>
        <p>
          Insulation is trapped air. A synthetic bag holds it in lofted fibers, a down bag in
          clusters, and both lose some of that structure permanently when they are crushed for
          months. The bag looks the same coming out. It is not the same at 35 degrees, which matters
          most for kids, who feel a shortfall in a bag long before an adult does.
        </p>
        <p>
          Store bags hung from a closet rod by their foot loops, flat under a bed, or loose in the
          oversized breathable sack most bags ship with and most people throw away. Wash them first
          only if they need it: body oils compress insulation too, but every wash also costs a
          little loft, so once a season at most, on a gentle cycle, with a technical wash rather
          than detergent.
        </p>
        <p>
          Self-inflating pads store best unrolled with the valve open, which lets the foam stay
          expanded instead of taking a set. Air mattresses need to be fully dry inside before they
          are folded, which is easier than it sounds: inflate, leave them a day in a warm room, then
          deflate. Cold-night sleep systems are the whole ballgame in shoulder season, and{' '}
          <Link href="/guides/fall-camping-for-beginners">fall camping for beginners</Link> covers
          what the bag and pad ratings actually need to be.
        </p>

        <h2>Batteries are the quiet gear killer</h2>
        <p>
          Alkaline batteries left in a device for eight months leak. Not sometimes: eventually,
          reliably, and the potassium hydroxide that comes out crusts over the contacts and takes
          the device with it. A family kit is full of candidates that nobody thinks of as
          electronics, and they all need the same treatment.
        </p>
        <ul>
          <li>
            <strong>Pull cells from everything.</strong> Lanterns, every headlamp, the camp radio,
            the inflator pump, kid glow toys, and the tire gauge in the car kit.
          </li>
          <li>
            <strong>Keep loose cells together and insulated.</strong> A small case, or tape over the
            terminals, so nothing shorts against loose metal in a bin.
          </li>
          <li>
            <strong>Store power banks around half charge.</strong> Lithium cells degrade fastest at
            full and at empty. Half full and cool is the storage sweet spot.
          </li>
          <li>
            <strong>Bin the ones that are already leaking.</strong> Do not carry a corroded cell
            into next season hoping it holds. Recycle it and buy a fresh set in spring.
          </li>
        </ul>

        <h2>Fuel, stoves, coolers, and the kitchen box</h2>
        <p>
          Propane is the item with an actual safety rule attached. Disconnect the canister from the
          stove, store it upright, and keep it out of the house. An unheated shed, a detached
          garage, or a covered spot outdoors is right. A basement with a furnace or a water heater
          is wrong, and a car through a heat wave or a hard freeze is worse. Empty canisters go to a
          local hazardous waste program, not the household trash.
        </p>
        <p>
          The stove itself just needs to be clean and dry: grease left on the burners over a winter
          is what makes the first spring meal taste like last summer. The cooler is the other
          reliable offender. Drain it, wash it, and store it with the lid propped open or the drain
          plug out, because a sealed damp cooler grows a smell that no amount of scrubbing fully
          removes.{' '}
          <Link href="/guides/how-to-pack-a-cooler">How to pack a cooler</Link> has the packing side
          of the same equipment.
        </p>
        <p>
          Do the restock now too. Empty the fuel canisters you know are low, replace the used
          first-aid supplies, throw out the food that will not survive to spring, and write down
          what broke. A note taped inside the lid of the kitchen bin in October is worth an hour in
          April.
        </p>

        <h2>A bin system that survives a garage</h2>
        <p>
          Two decisions do most of the work here: what the bins are, and how you group them.
        </p>
        <p>
          Use bins with a gasketed, latching lid rather than the loose-lid totes. A garage or
          basement swings humid and back again all winter, and an unsealed bin lets that cycle run
          through the gear. Drop a color-indicating desiccant pack into each sealed bin: it tells
          you at a glance whether anything went in wetter than you thought, and it recharges in an
          oven for reuse. Clear bins beat opaque ones for the same reason labels help, only faster.
        </p>
        <p>
          Group by the order you unpack at camp, not by what things are. A kitchen bin, a
          sleep-and-shelter bin, and a light-and-power bin will get you set up in the right sequence
          on arrival, where a bin sorted alphabetically will not. Keep the tent, bags, and pads out
          of the sealed bins entirely, since those want to breathe. Everything else stacks.
        </p>
        <p>
          If you are still building the kit and want the full inventory in priority order, the{' '}
          <Link href="/guides/family-camping-gear-list">family camping gear list</Link> is the
          checklist version of what should be going into those bins.
        </p>

        <h2>The 20-minute version</h2>
        <p>
          If you only have one evening, do these five in this order and skip everything else:
        </p>
        <ul>
          <li>Pitch the tent, let it dry fully, then store it loose.</li>
          <li>Take every sleeping bag out of its stuff sack and hang it.</li>
          <li>Pull every battery out of every device.</li>
          <li>Disconnect the propane and move it out of the house.</li>
          <li>Wash the cooler and store it with the lid open.</li>
        </ul>
        <p>
          That covers the five ways a family kit actually gets destroyed. The bins and the labels
          can wait for a rainy weekend.
        </p>

        <h2>Frequently asked</h2>
        <h3>How should you store a tent long term?</h3>
        <p>
          Completely dry and loosely packed. Pitch it at home until the floor, fly, and seams are
          bone dry, fold it along different creases than last year, and store it in a pillowcase or
          oversized sack rather than its compression bag. Mildew in coated tent fabric destroys the
          waterproofing permanently.
        </p>
        <h3>Can you store a sleeping bag in its stuff sack?</h3>
        <p>
          No. Months of compression permanently flattens some of the loft that does the insulating,
          and the bag comes out colder than it went in. Hang it, lay it flat, or use the oversized
          breathable storage sack most bags ship with.
        </p>
        <h3>Do you need to take the batteries out of camping lanterns and headlamps?</h3>
        <p>
          Yes, and it is the most-skipped step. Alkaline cells left in a device for months leak and
          corrode the contacts. Pull them all, insulate loose cells, and store power banks at about
          half charge.
        </p>
        <h3>Where should you store propane canisters over the winter?</h3>
        <p>
          Outdoors or in an unheated shed or detached garage, upright and away from pilot lights.
          Never inside the house, never near a furnace or water heater, and never left in a car.
          Disconnect the canister from the stove first.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="how-to-store-camping-gear"
        heading="Gear for the off-season pass"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-store-camping-gear" />
    </>
  )
}
