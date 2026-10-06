import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import GuidePrintablesBlock from '@/components/guide/GuidePrintablesBlock'
import SkillMediaBlock from '@/components/skills/SkillMediaBlock'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/camp-stove-fuel-in-cold-weather'
const TITLE = 'Camp Stove Fuel in Cold Weather'
const META_TITLE = 'Camp Stove Fuel in Cold Weather'
const DESCRIPTION =
  'Why butane stoves sputter near freezing, how cold propane still works, and the tricks that keep a family camp stove running on a frosty fall morning.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1775626094623-99a26d94dc64?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Do propane camp stoves work in cold weather?',
            a: 'Yes, down to temperatures most family campers will ever see. Propane stays a gas far below zero, so a standard green 1-pound cylinder keeps feeding the stove on a frosty fall morning. It does lose pressure as it chills, so expect a smaller flame and slower boils once nights drop into the 20s, and plan on a canister-warming routine or a bulk 20-pound tank if you camp colder than that.',
          },
          {
            q: 'Why does my butane stove stop working in the cold?',
            a: 'Regular butane turns from gas back into liquid at about 31°F. As the canister cools toward freezing, less and less fuel vaporizes, so the flame shrinks and sputters, and near freezing it can quit entirely. That is why the slim tabletop butane stoves that work so well in summer are a poor choice for October and November trips. Switch to propane for cold-weather camping.',
          },
          {
            q: 'How do you keep a propane canister warm while camping?',
            a: 'Keep the next morning\'s canister out of the cold overnight: disconnected, cap on, in the foot of a sleeping bag or wrapped in a jacket. In the morning, hold it in your hands for a minute before connecting it, and swap between two canisters if one frosts over while cooking. Never warm a canister with a flame, the campfire, or the stove itself.',
          },
          {
            q: 'Is it safe to use a camp stove in the tent when it is cold out?',
            a: 'No. Every propane or butane stove produces carbon monoxide, and a tent or closed vestibule lets it build up fast enough to kill a sleeping family. Cook outside, even when it is cold and dark. A windscreen, a sheltered spot behind the car, and a warm layer for the cook solve the comfort problem without the risk.',
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
        slug="camp-stove-fuel-in-cold-weather"
        eyebrow="How-to"
        title="Camp Stove Fuel in Cold Weather"
        lede="Why the butane stove that worked all summer sputters on a frosty morning, how cold changes propane, and the small habits that keep breakfast on schedule when nights drop toward freezing."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Steam rising from a metal camping pot set on a small canister stove outdoors',
        }}
      >
        <QuickAnswer
          tldr="Use propane, not butane, once nights get near freezing. Keep tomorrow's canister warm overnight, block the wind, and pack about twice the fuel you would use in summer."
          summary="Cold weather changes how camp stove fuel behaves, and the fuel you pick matters more in October than in July. Regular butane stops vaporizing at about 31°F, so the slim tabletop butane stoves that work fine in summer sputter or quit on a frosty morning. Propane stays a gas far below zero, which is why a standard propane stove with green 1-pound cylinders keeps working through a typical fall trip. It still loses pressure as it chills, so the flame shrinks and water takes longer to boil once nights reach the 20s. Four habits fix most cold-stove trouble: keep the next morning's canister disconnected and warm overnight, block the wind, fill the kettle the night before and store it in the cooler so it doesn't freeze, and bring roughly twice the fuel you'd use in summer. Always cook outside the tent."
        />

        <h2>Why fuel matters more once nights get cold</h2>
        <p>
          Every canister camp stove runs on liquefied gas. The fuel sits in the canister as a
          liquid under pressure, and the stove only works if that liquid keeps turning back into
          gas fast enough to feed the burner. Heat drives that change. When the canister is cold,
          less fuel vaporizes, pressure drops, and the flame gets weak and uneven.
        </p>
        <p>
          The catch is that burning fuel cools the canister on its own. As the liquid boils off
          inside, it pulls heat out of the metal, which is why a canister can grow a ring of frost
          halfway through breakfast. On a 60°F summer evening that doesn&apos;t matter. On a 28°F
          October morning it can take a canister from working to barely working in ten minutes.
        </p>

        <h2>Butane vs propane: the temperature line</h2>
        <p>
          The number that matters is the temperature where each fuel stops turning into gas on its
          own:
        </p>
        <ul>
          <li>
            <strong>Butane (about 31°F).</strong> The tall, thin canisters that slide into
            tabletop &quot;suitcase&quot; stoves are usually straight butane. They work well
            above 50°F, get sluggish in the 40s, and can quit entirely near freezing. Great for
            summer and backyard trips, a poor pick for fall and winter.
          </li>
          <li>
            <strong>Isobutane blends (about 11°F for isobutane).</strong> The squat, screw-top
            canisters used with small backpacking stoves are a blend of isobutane and propane.
            They handle cold better than plain butane, but performance still fades as the
            canister empties and the propane in the mix burns off first.
          </li>
          <li>
            <strong>Propane (about -44°F).</strong> The green 1-pound cylinders that fit most
            family camp stoves stay a gas far below any temperature a typical family trip will
            see. They lose pressure as they chill, so the flame is smaller in the 20s than in
            July, but they keep working.
          </li>
        </ul>
        <p>
          For family car camping in fall, the practical answer is simple: bring a propane stove.
          The standard Coleman-style 1-burner or 2-burner stoves most families already own are
          exactly the right tool. If your only stove is a tabletop butane model, treat it as a
          warm-weather stove and borrow or buy a propane one before an October or November trip.
        </p>

        <SkillMediaBlock
          video={{
            url: 'https://www.youtube-nocookie.com/embed/FCDURxu2L3Y',
            title: 'Compare: Canister vs. Liquid Fuel Stoves (REI)',
          }}
        />

        <h2>Keep tomorrow&apos;s canister warm tonight</h2>
        <p>
          The single most useful cold-weather habit is keeping the breakfast canister out of the
          overnight cold. A canister that spent the night at 25°F in the car trunk starts the
          morning already struggling. One that spent the night near a sleeping body starts close
          to 50°F and runs strong.
        </p>
        <ul>
          <li>
            Disconnect the canister from the stove before bed and put the cap back on.
          </li>
          <li>
            Tuck it into the foot of an adult&apos;s sleeping bag, or wrap it in a jacket inside
            the tent. A sealed, disconnected canister is safe to keep with you. A connected stove
            is not, and neither is lighting anything inside.
          </li>
          <li>
            In the morning, hold the canister in your hands for a minute before connecting it.
          </li>
          <li>
            Bring two canisters to the stove and swap them if one frosts over while you cook. The
            warm one keeps going while the cold one rests in a pocket.
          </li>
        </ul>
        <p>
          Never warm a canister with a flame, the campfire, a heater, or by setting it next to the
          burner. Pressurized fuel near heat is the one cold-weather shortcut that can go very
          wrong.
        </p>

        <h2>A bulk tank is the easy upgrade</h2>
        <p>
          If you camp in fall often, a refillable 20-pound propane tank (the same size used for a
          backyard grill) plus a 1-pound-to-20-pound adapter hose solves most cold-fuel problems
          at once. The big tank holds far more liquid, so it cools much more slowly as it burns and
          keeps steadier pressure all morning. It also costs a fraction of what a stack of
          disposable 1-pound cylinders does, and you stop throwing empties away.
        </p>
        <p>
          Set the tank upright on level ground, a few feet from the stove, with the hose routed
          where kids won&apos;t trip over it. Close the tank valve when you are done cooking, not
          just the stove knob.
        </p>

        <h2>Wind steals more heat than cold air</h2>
        <p>
          A breeze across the burner can double the time it takes to boil a pot, cold or not. In
          fall, when wind often picks up at dusk, it compounds everything above. Use the
          stove&apos;s built-in wind baffles, set up in the lee of the car or a picnic shelter, and
          keep a lid on every pot. A lid alone can cut boil time noticeably. Don&apos;t wrap the
          stove or the canister in a tight foil shield, since trapped heat around a canister can
          raise its pressure past safe limits.
        </p>

        <h2>Plan for slower cooking and more fuel</h2>
        <p>
          Water that starts at 35°F takes longer to boil than water that starts at 70°F, the flame
          is weaker, and you&apos;ll want more hot drinks. A good rule for a cold fall weekend is
          to pack about twice the fuel you would use on the same trip in summer.
        </p>
        <ul>
          <li>
            <strong>Fill the kettle the night before</strong> and store it in the cooler. A closed
            cooler keeps water from freezing overnight, and you skip the dark-morning trip to the
            spigot.
          </li>
          <li>
            <strong>Pick one-pot meals</strong> that heat through quickly instead of recipes that
            simmer for 40 minutes.
          </li>
          <li>
            <strong>Boil once, use twice.</strong> Heat enough water for cocoa and oatmeal in one
            go, and pour the extra into an insulated bottle for later.
          </li>
          <li>
            <strong>Check campground water.</strong> Many campgrounds shut off spigots in late fall
            to protect the pipes, so bring your own cooking water.
          </li>
        </ul>
        <p>
          For the full list of what else changes once the season turns, see{' '}
          <Link href="/guides/fall-camping-for-beginners">fall camping for beginners</Link>. For
          what happens after dinner, when the real cold sets in, see{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>.
        </p>

        <h2>Cook outside, every time</h2>
        <p>
          Cold, dark mornings are exactly when people get tempted to light a stove in the tent
          doorway or a closed vestibule. Don&apos;t. Every propane and butane stove produces carbon
          monoxide, and a tent traps it fast enough to be deadly for a sleeping family. Cook in the
          open, dress the cook warmly, and use the car or a picnic shelter as your windbreak. Keep
          small kids a full stride back from the stove, since a tipped pot of boiling water is a
          far more common camp injury than anything fuel-related.
        </p>

        <h2>Frequently asked</h2>
        <h3>Do propane camp stoves work in cold weather?</h3>
        <p>
          Yes. Propane stays a gas far below zero, so a standard 1-pound cylinder keeps working on
          a frosty fall morning. Expect a smaller flame and slower boils once nights reach the
          20s.
        </p>
        <h3>Why does my butane stove stop working in the cold?</h3>
        <p>
          Butane stops vaporizing at about 31°F, so the flame shrinks and sputters as the canister
          cools toward freezing. Switch to propane for fall and winter trips.
        </p>
        <h3>How do you keep a propane canister warm while camping?</h3>
        <p>
          Keep it disconnected and capped in the foot of a sleeping bag overnight, warm it in your
          hands before connecting, and swap between two canisters. Never warm one with a flame.
        </p>
        <h3>Is it safe to use a camp stove in the tent when it is cold out?</h3>
        <p>
          No. Stoves produce carbon monoxide, which builds up quickly in a tent or closed
          vestibule. Cook outside and use the car or a shelter as a windbreak.
        </p>
      </GuidePage>
      <GuidePrintablesBlock guideSlug="camp-stove-fuel-in-cold-weather" />
      <GuideGearShelf guideSlug="camp-stove-fuel-in-cold-weather" heading="Gear for a cold-morning camp kitchen" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="camp-stove-fuel-in-cold-weather" />
    </>
  )
}
