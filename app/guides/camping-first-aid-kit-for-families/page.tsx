import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/camping-first-aid-kit-for-families'
const TITLE = 'Camping First Aid Kit for Families'
const META_TITLE = 'Family Camping First Aid Kit Checklist'
const DESCRIPTION =
  'What goes in a family camping first aid kit: the base kit, kid-specific add-ons, fall extras, treating common camp injuries, and when to seek urgent care.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1564144573017-8dc932e0039e?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What should be in a family camping first aid kit?',
            a: 'Start with a prepacked kit of 100 or more pieces in a hard or waterproof case, which covers adhesive bandages, gauze, tape, antiseptic wipes, antibiotic ointment, and gloves. Then add what those kits usually leave out for kids: fine-tipped tweezers or a tick remover, children\'s acetaminophen and ibuprofen dosed for your kids\' weights, a children\'s antihistamine, hydrocortisone cream, blister tape, a digital thermometer, a medicine syringe or cup, and every family member\'s prescription medications with a written dosing card. For fall trips, add hand warmers and an emergency blanket.',
          },
          {
            q: 'Is a store-bought first aid kit good enough for camping with kids?',
            a: 'It is a good base and not a complete kit. Prepacked kits are strong on bandages and wipes, which is most of what you will use, but they almost never include children\'s pain and fever medicine, an antihistamine, a thermometer, or a decent tick tool, and the tweezers they include are often too blunt to grab a small tick. Buy the base kit, add the kid items in a labeled zip bag inside it, and you have something that handles the injuries that actually happen at a family campsite.',
          },
          {
            q: 'How do you remove a tick from a child at camp?',
            a: 'Grasp the tick as close to the skin as you can with fine-tipped tweezers and pull straight up with steady, even pressure, following CDC guidance; do not squeeze the body, burn it, or smother it in petroleum jelly or nail polish. A hooked tick remover works too if you follow its instructions. Clean the bite and your hands with soap and water or rubbing alcohol, note the date and the spot on the body, and watch for a rash or fever over the next several weeks. Adult blacklegged ticks stay active in fall on any day above freezing, so do a full tick check every evening.',
          },
          {
            q: 'When should you leave camp and get medical care for a child?',
            a: 'Call 911 for trouble breathing, swelling of the face or throat, a seizure, or a child who is hard to wake. Drive to urgent care or an emergency room for bleeding that has not stopped after 10 minutes of firm pressure, a cut that gapes open, a burn larger than the child\'s palm or any burn on the face, hands, feet, or genitals, a head bump followed by vomiting, confusion, or unusual sleepiness, a possible broken bone, or a fever in a baby under three months. Know the route to the nearest facility before you need it.',
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
        slug="camping-first-aid-kit-for-families"
        eyebrow="Safety"
        title="Camping First Aid Kit for Families"
        lede="Most family camping injuries are small and boring: a splinter from the picnic table, a scraped knee on the loop road, a finger that touched the stove grate. Here is the kit that handles them fast, the kid-specific items that store-bought kits leave out, and the short list of things that mean you pack up and drive."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A well-used green first aid bag strapped to the outside of a backpack',
        }}
        dateModified="2026-10-01"
      >
        <QuickAnswer
          tldr="Buy a prepacked base kit, add the kid medicines and tools it leaves out, keep it in one bright bag in the same spot every trip."
          summary="A family camping first aid kit is a store-bought base kit plus the handful of things those kits leave out for kids. Start with a prepacked kit of 100 or more pieces in a hard or waterproof case. Then add fine-tipped tweezers or a tick remover, children's acetaminophen and ibuprofen dosed for your kids' weights, a children's antihistamine, hydrocortisone cream, blister tape, a digital thermometer, and every family member's prescription medications with a written dosing card. For fall trips, add hand warmers and an emergency blanket, and do a tick check every evening, since adult blacklegged ticks stay active on any day above freezing. Keep the kit in one bright bag in the same spot in the car, never buried in a gear bin, and restock it the week you get home. Its job is handling small injuries fast and helping you recognize the few that need a doctor."
        />

        <h2>What actually goes wrong at a family campsite</h2>
        <p>
          A first aid kit is easier to pack well once you know what it is for. At a developed
          campground with kids, the injuries that actually happen are a short and predictable list:
        </p>
        <ul>
          <li>
            <strong>Cuts and scrapes.</strong> Gravel loop roads, bike crashes, and rocks along the
            creek. This is most of what the kit gets opened for.
          </li>
          <li>
            <strong>Splinters.</strong> Picnic tables, firewood, and the fire ring. Kids grab all
            three.
          </li>
          <li>
            <strong>Minor burns.</strong> A marshmallow stick swung too fast, a hand on the stove
            grate, a spark on bare skin. Burns are the injury our{' '}
            <Link href="/guides/first-time-camping-mistakes">first-time camping mistakes</Link> guide
            warns about most, alongside folding-chair pinches.
          </li>
          <li>
            <strong>Bites and stings.</strong> Mosquitoes, ticks, bees, and the occasional mystery
            welt that itches for three days.
          </li>
          <li>
            <strong>Blisters.</strong> New hiking shoes, wet socks, and long walks to the bathhouse.
          </li>
          <li>
            <strong>Tummy trouble and fevers.</strong> Kids get sick on camping trips at roughly the
            same rate they get sick at home, which means a 102 degree fever at 11 p.m. is a real
            possibility on any given weekend.
          </li>
        </ul>
        <p>
          Notice what is not on that list: bear attacks, snakebites, and dramatic falls. Those are
          real but rare, and they are emergencies you handle by calling for help, not with the
          contents of a zip bag. Pack for the common list and you will be ready for nearly every
          trip you take.
        </p>

        <h2>The base kit: buy it, do not build it</h2>
        <p>
          Assembling a first aid kit from scratch item by item is a fine hobby and a poor use of a
          Thursday night before a trip. A prepacked kit of 100 or more pieces covers the bulk
          supplies better and cheaper than buying them one box at a time. Look for:
        </p>
        <ul>
          <li>
            <strong>Bandages in several sizes,</strong> including knuckle and fingertip shapes, which
            are the ones kids actually need.
          </li>
          <li>
            <strong>Gauze pads, a roll of gauze, and medical tape</strong> for anything bigger than a
            bandage covers.
          </li>
          <li>
            <strong>Antiseptic wipes and antibiotic ointment</strong> for cleaning and covering
            scrapes.
          </li>
          <li>
            <strong>Nitrile gloves, scissors, and an elastic wrap</strong> for sprains.
          </li>
          <li>
            <strong>A hard or waterproof case.</strong> A soft pouch that sat in a wet trunk all
            weekend turns its bandages into paper mush.
          </li>
        </ul>
        <p>
          A kit in the 400-piece range sounds excessive, but most of the count is bandages, and with
          kids you burn through bandages at a remarkable rate, including the ones applied to
          injuries no adult can see.
        </p>

        <h2>The kid add-ons store-bought kits leave out</h2>
        <p>
          This is the part that makes a generic kit a family kit. Put these in a labeled zip bag
          inside the main case so they travel together and nobody has to dig.
        </p>
        <ul>
          <li>
            <strong>Children&apos;s acetaminophen and children&apos;s ibuprofen.</strong> Both, in
            the formulation that matches your kids&apos; ages, with the dosing cup or syringe that
            came in the box. Dose by weight, following the label or your pediatrician, and never
            give aspirin to children. Infant ibuprofen is not for babies under 6 months.
          </li>
          <li>
            <strong>A written dosing card.</strong> Each child&apos;s current weight and the dose for
            each medicine, written down at home in daylight. Doing math by headlamp with a crying
            kid is how dosing mistakes happen.
          </li>
          <li>
            <strong>A children&apos;s antihistamine</strong> for bites, stings, and the seasonal
            allergies that flare when you sleep surrounded by leaves. Ask your pediatrician which
            one and how much, since some carry age limits on the label.
          </li>
          <li>
            <strong>Hydrocortisone cream</strong> for itchy bites and plant rashes.
          </li>
          <li>
            <strong>Fine-tipped tweezers or a tick remover.</strong> The tweezers in most prepacked
            kits are blunt and grab poorly. Fine points pull splinters and ticks; a hooked remover is
            faster on a wriggling child.
          </li>
          <li>
            <strong>A digital thermometer.</strong> &ldquo;Feels warm&rdquo; is not enough
            information to decide whether to stay or drive home.
          </li>
          <li>
            <strong>Blister tape or moleskin.</strong> Put it on the hot spot before it becomes a
            blister, not after.
          </li>
          <li>
            <strong>Electrolyte packets</strong> for a kid who has been sick or played hard all day
            and will not drink plain water.
          </li>
          <li>
            <strong>Prescription medications and devices.</strong> Inhalers, epinephrine
            auto-injectors, and daily medications for every family member, plus a spare if your
            pharmacy allows it. These ride with the adults, not deep in the car.
          </li>
          <li>
            <strong>Fun bandages.</strong> Not a joke. A cartoon bandage ends more crying than any
            medicine in the kit.
          </li>
        </ul>

        <h2>Fall additions: cold, dark, and ticks</h2>
        <p>
          October and November are the best camping months in much of the country, and they shift
          the kit a little. The days are short, the nights are cold, and one pest is busier than
          it was in summer.
        </p>
        <ul>
          <li>
            <strong>Ticks.</strong> Adult blacklegged ticks, the ones that carry Lyme disease, are
            active through fall on any day above freezing. Do a full tick check on every kid every
            evening: hairline, behind the ears, armpits, waistband, and behind the knees. Use
            repellent on skin and treat clothing with permethrin before the trip.
          </li>
          <li>
            <strong>Hand warmers and an emergency blanket.</strong> For a child who got wet and
            cannot stop shivering. A shivering, clumsy, mumbling child is cold enough to stop the
            evening, get into dry clothes, and get warm. Our{' '}
            <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>{' '}
            guide covers the sleep system that prevents this.
          </li>
          <li>
            <strong>A headlamp clipped to the kit.</strong> In fall, dinner happens in the dark, and
            so do most fire and stove burns. A light that lives with the kit means nobody hunts for
            one while holding a hand under the spigot.
          </li>
          <li>
            <strong>Lip balm and a thick moisturizer.</strong> Dry, cold air chaps kids&apos; faces
            and hands fast, and cracked knuckles bleed.
          </li>
          <li>
            <strong>Sunscreen, still.</strong> Low fall sun reflects off water and bright leaves,
            and kids still burn in October.
          </li>
        </ul>

        <h2>How to handle the five common camp injuries</h2>
        <h3>Cuts and scrapes</h3>
        <p>
          Rinse with clean water until the dirt is out, which takes longer than you expect with
          gravel. Press firmly with gauze if it bleeds. Once it stops, add antibiotic ointment and a
          bandage, and check it each morning. Redness that spreads, warmth, or pus over the next day
          or two means a doctor visit.
        </p>
        <h3>Burns</h3>
        <p>
          Cool running water, not ice, for at least 10 minutes and longer if the pain keeps coming
          back. The campground spigot or a jug of water poured slowly works. Then cover loosely with
          clean gauze. Do not pop blisters and do not apply butter, toothpaste, or anything else
          from the cooler.
        </p>
        <h3>Splinters</h3>
        <p>
          Clean the area, then pull the splinter out at the same angle it went in with fine-tipped
          tweezers. A deep one that will not come out, or one under a fingernail, can wait for a
          clinic rather than turning into a 20-minute wrestling match by lantern light.
        </p>
        <h3>Ticks</h3>
        <p>
          Grasp the tick as close to the skin as possible and pull straight up with steady, even
          pressure, which is the method the CDC recommends. Do not squeeze the body, burn it, or
          coat it in petroleum jelly. Clean the bite and your hands, write down the date and the
          spot on the body, and watch for a rash or fever over the next several weeks.
        </p>
        <h3>Bites, stings, and itchy rashes</h3>
        <p>
          Scrape a bee stinger out sideways with a fingernail or card, wash the spot, and use a cold
          pack and hydrocortisone for the swelling and itch. An antihistamine helps with a bigger
          local reaction. Any swelling of the face or lips, hives spreading across the body, or
          trouble breathing is an allergic emergency: use an epinephrine auto-injector if the child
          has one, and call 911.
        </p>

        <h2>When to pack up and drive</h2>
        <p>
          The kit is for small things. These are the signs that a trip is over, or at least paused
          for a few hours at urgent care.
        </p>
        <ul>
          <li>
            <strong>Call 911:</strong> trouble breathing, swelling of the face or throat, a seizure,
            or a child who is unusually hard to wake.
          </li>
          <li>Bleeding that has not stopped after 10 minutes of firm, steady pressure.</li>
          <li>A cut that gapes open, is deep, or came from something dirty or rusty.</li>
          <li>
            A burn larger than the child&apos;s palm, or any burn on the face, hands, feet, or
            genitals.
          </li>
          <li>
            A head bump followed by vomiting, confusion, a bad headache, or unusual sleepiness.
          </li>
          <li>A limb that looks bent, cannot bear weight, or swells quickly.</li>
          <li>Any fever in a baby under three months old.</li>
        </ul>
        <p>
          Before the trip, look up the nearest urgent care and emergency room and note whether your
          campsite has cell coverage. Write both on the dosing card. If you are still choosing where
          to go, our{' '}
          <Link href="/guides/how-to-choose-a-family-campsite">how to choose a family campsite</Link>{' '}
          guide includes distance to services as a factor worth weighing with young kids.
        </p>

        <h2>Where the kit lives, and the restock habit</h2>
        <p>
          The best kit in the world does nothing if it is buried under the camp kitchen bin. Pick
          one spot and use it every trip: behind the driver&apos;s seat or on top of everything in
          the trunk, where any adult can reach it in under ten seconds. A bright red or orange case
          helps in the dark.
        </p>
        <ul>
          <li>
            <strong>Show the kids where it is.</strong> Older kids should know where the kit lives
            and how to open it, even if they never use it alone.
          </li>
          <li>
            <strong>Carry a small day kit.</strong> A zip bag with bandages, wipes, blister tape, and
            tweezers rides in the day pack on hikes so the big kit can stay at camp.
          </li>
          <li>
            <strong>Restock within a week of getting home.</strong> Write down what you used on the
            drive back, then replace it before the kit goes in storage. Check medicine expiration
            dates at the start of each season.
          </li>
          <li>
            <strong>Update the dosing card.</strong> Kids grow, and a dose written down in spring is
            often wrong by fall.
          </li>
        </ul>
        <p>
          The first aid kit is one line on our{' '}
          <Link href="/guides/family-camping-gear-list">family camping gear list</Link>, and it is
          the line most worth an extra twenty minutes of attention before your next trip.
        </p>

        <h2>Frequently asked</h2>
        <h3>What should be in a family camping first aid kit?</h3>
        <p>
          A prepacked base kit of 100 or more pieces in a waterproof case, plus fine-tipped tweezers
          or a tick remover, children&apos;s acetaminophen and ibuprofen, a children&apos;s
          antihistamine, hydrocortisone cream, blister tape, a thermometer, every family
          member&apos;s prescriptions, and a written dosing card. Add hand warmers and an emergency
          blanket in fall.
        </p>
        <h3>Is a store-bought first aid kit good enough for camping with kids?</h3>
        <p>
          It is a good base, not a complete kit. Prepacked kits cover bandages and wipes well but
          almost never include children&apos;s medicine, an antihistamine, a thermometer, or a
          decent tick tool. Add those in a labeled bag inside the case.
        </p>
        <h3>How do you remove a tick from a child at camp?</h3>
        <p>
          Grasp it close to the skin with fine-tipped tweezers and pull straight up with steady,
          even pressure. Do not squeeze, burn, or smother it. Clean the bite, note the date and
          location, and watch for a rash or fever over the next several weeks.
        </p>
        <h3>When should you leave camp and get medical care for a child?</h3>
        <p>
          Call 911 for trouble breathing, facial swelling, a seizure, or a child who is hard to wake.
          Go to urgent care for bleeding that will not stop after 10 minutes of pressure, gaping
          cuts, large burns or burns on the face or hands, a head bump with vomiting or confusion, a
          possible broken bone, or any fever in a baby under three months.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="camping-first-aid-kit-for-families"
        heading="Gear for a family camping first aid kit"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="camping-first-aid-kit-for-families" />
    </>
  )
}
