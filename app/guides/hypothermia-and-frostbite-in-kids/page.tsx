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

const SLUG = '/guides/hypothermia-and-frostbite-in-kids'
const TITLE = 'Hypothermia and Frostbite in Kids at Camp'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Hypothermia and Frostbite in Kids'
const DESCRIPTION =
  'Hypothermia and frostbite in kids at camp: the early warning signs, what to do in the first 30 minutes, what not to do, and when to call 911 or head home.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1648371758887-5a99a809146f?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What are the first signs of hypothermia in a child?',
            a: 'Shivering, unusual tiredness, clumsy hands, and a change in mood are the early signs. A child who was chatty goes quiet, a kid who was running around wants to sit and stops answering questions, or a normally easygoing child gets whiny and stumbles. The CDC lists shivering, exhaustion, confusion, fumbling hands, memory loss, slurred speech, and drowsiness as warning signs. In babies, look for bright red, cold skin and very low energy. Kids rarely say they are cold, so a parent has to watch for these changes.',
          },
          {
            q: 'Can kids get hypothermia when it is not freezing?',
            a: 'Yes. Most camping hypothermia happens at cool temperatures, not extreme ones, because of water. The CDC notes hypothermia can happen even above 40 degrees F when someone is chilled by rain, sweat, or cold water. A child who falls in a creek, plays in wet leaves for an hour, or sweats through a cotton shirt on a 45 degree evening can get dangerously cold. Children also lose heat faster than adults because they have more skin surface for their body weight.',
          },
          {
            q: 'What should I do if my child has frostbite at camp?',
            a: 'Get the child somewhere warm, remove anything wet, and warm the whole body under dry layers. Rewarm the frostbitten area in water that feels warm, not hot, to an unhurt hand, or tuck fingers into an armpit. Do not rub the skin, do not hold it near a campfire, stove, or heater, and do not use a heating pad or hand warmer on it, because numb skin burns easily. Do not thaw it if it could freeze again on the way out. White, gray, waxy, or hard skin needs a doctor.',
          },
          {
            q: 'When should I call 911 for a cold child while camping?',
            a: 'Call 911 if a child is confused, very drowsy, hard to wake, slurring words, or unable to walk normally, or if they were shivering hard and then stop shivering while still cold. Those are signs of moderate to severe hypothermia. The CDC says a body temperature below 95 degrees F needs medical attention right away. If the child is unresponsive with no breathing, start CPR. Frostbite with white, gray, waxy, or hard skin, or with blisters, should be seen by a doctor the same day.',
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
        slug="hypothermia-and-frostbite-in-kids"
        eyebrow="Cold-weather safety"
        title={TITLE}
        lede="Most cold injuries on family camping trips start with a wet kid on a cool evening, not a blizzard. Here is how to spot trouble early and what to do about it."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Two adults and a small child in winter jackets walking away from the camera along a snowy path through frosted trees',
        }}
        dateModified="2026-11-03"
      >
        <QuickAnswer
          tldr="Wet plus cold plus tired is the danger, not just low temperatures. Watch for mood and coordination changes, get kids dry and warm fast, and call 911 for confusion, drowsiness, or shivering that stops."
          summary="Hypothermia in kids usually starts at cool temperatures, often above 40 degrees F, when a child gets wet from rain, sweat, or a creek and then sits still. Early signs are shivering, clumsiness, unusual tiredness, and a change in mood, such as a chatty kid going quiet. Treat it by getting the child into a warm car or building, removing wet clothes, warming the chest, neck, head, and groin under dry layers, and giving a warm, sweet drink if they are fully awake. Frostbite shows up first as red, painful skin on fingers, toes, ears, cheeks, or nose, then white, gray, waxy, or numb skin. Never rub it or warm it near a fire or with a hand warmer. Call 911 if a child is confused, very drowsy, or stops shivering while still cold, since a body temperature below 95 degrees F is a medical emergency."
        />

        <p>
          <em>
            This guide is general safety information for parents, based on CDC and Mayo Clinic first
            aid guidance. It is not a substitute for a doctor. When in doubt, call 911 or your
            child&apos;s doctor.
          </em>
        </p>

        <h2>Why kids get cold faster than adults</h2>
        <p>
          A child has more skin surface for their body weight than an adult, so heat leaves them
          faster, especially when they stop moving. Kids also go from running flat out to sitting on
          a cold log with no warm-up in between, sweat into their clothes during play, and almost
          never announce that they are getting cold. By the time a young child complains, they are
          often already shivering.
        </p>
        <p>
          The other half of the problem is water. Wet clothing pulls heat out of the body far faster
          than dry clothing, which is why the CDC points out that hypothermia can happen even above 40
          degrees F when someone is chilled by rain, sweat, or cold water. On family trips, the
          classic setup is a kid who falls in a creek, plays in wet leaves all afternoon, or sweats
          through a cotton hoodie, and then sits down at the picnic table as the sun goes down.
        </p>

        <h2>Hypothermia: the signs, from early to serious</h2>
        <p>
          Hypothermia means the body is losing heat faster than it can make it, and core temperature
          starts to drop. It comes on gradually, which makes it easy to miss. The changes in a child
          are often behavioral before they are physical.
        </p>
        <ul>
          <li>
            <strong>Early:</strong> shivering, cold and pale or blotchy skin, clumsy hands that
            struggle with a zipper, whining that is out of character, and a talkative kid who goes
            quiet. This is the stage to catch it, and it usually reverses with dry clothes, food, and
            warmth.
          </li>
          <li>
            <strong>Getting worse:</strong> hard, constant shivering, stumbling, slurred or slow
            speech, confusion about simple things, unusual sleepiness, and not caring about being cold.
            The CDC lists exhaustion, confusion, fumbling hands, memory loss, slurred speech, and
            drowsiness as warning signs.
          </li>
          <li>
            <strong>Serious:</strong> shivering that stops while the child is still cold, a child who
            is very hard to wake, or one who cannot walk or answer normally. This is a medical
            emergency.
          </li>
          <li>
            <strong>Babies:</strong> infants cannot shiver well. The CDC says to look for bright red,
            cold skin and very low energy. Our{' '}
            <Link href="/guides/camping-with-a-baby">camping with a baby</Link> guide covers how to
            keep the smallest campers warm overnight.
          </li>
        </ul>
        <p>
          A quick field check: ask a simple question you know the answer to, like what they had for
          lunch, and watch them try to zip their own jacket. A kid who cannot do either the way they
          normally would needs to be warmed up now, not after one more marshmallow.
        </p>

        <h2>What to do in the first 30 minutes</h2>
        <p>
          Mild hypothermia caught early is very treatable at camp. The steps below follow the
          CDC&apos;s first aid guidance.
        </p>
        <ol>
          <li>
            <strong>Get out of the cold.</strong> A running car with the heater on is the best warm
            room at most campgrounds. A heated cabin, bathhouse, or camp store works too. A tent gets
            the child out of the wind but does not warm them up on its own.
          </li>
          <li>
            <strong>Get wet clothes off.</strong> All of them, including socks and the base layer,
            then put on dry clothes and a warm hat. Wet clothing keeps pulling heat out even after
            the child is out of the weather.
          </li>
          <li>
            <strong>Warm the core first.</strong> Focus on the chest, neck, head, and groin, not the
            hands and feet. Wrap the child in dry blankets or a sleeping bag. Skin-to-skin contact
            with a parent under loose dry layers works well for small kids. An{' '}
            <AmazonLink
              productId="primacare-mylar-emergency-blankets"
              pageSlug="hypothermia-and-frostbite-in-kids"
            />{' '}
            wrapped over the outside of those layers traps heat and blocks wind on the walk to the car.
          </li>
          <li>
            <strong>Feed them.</strong> If the child is fully awake and can swallow normally, give a
            warm, sweet drink, like cocoa or warm apple juice, and something to eat. Food is the fuel
            the body uses to make heat. A{' '}
            <AmazonLink
              productId="thermos-stainless-king-40oz"
              pageSlug="hypothermia-and-frostbite-in-kids"
            />{' '}
            filled with hot water in the morning means a warm drink is ready without lighting the
            stove. Never give food or drink to a child who is drowsy or not fully alert.
          </li>
          <li>
            <strong>Keep them wrapped after.</strong> Once they warm up, keep them dry and bundled,
            including the head and neck, and keep watching. A child who had hypothermia should not go
            back out to play in the cold that day.
          </li>
        </ol>
        <p>
          Handle a cold child gently and keep them still and lying down if the signs are serious.
          Do not rub their arms and legs to warm them up, and do not put them in a hot shower or bath,
          which can pull blood away from the core too quickly. If things do not clearly improve in
          about 30 minutes, or any serious sign shows up, call 911.
        </p>

        <h2>Frostbite and frostnip</h2>
        <p>
          Frostbite is freezing of the skin and the tissue under it. It hits the parts farthest from
          the core and most exposed: fingers, toes, ears, cheeks, chin, and the tip of the nose. It
          needs temperatures below freezing, plus wind or wet gloves and socks make it far more
          likely. Kids who take their mittens off to build a snowman or pack snowballs are the
          classic case.
        </p>
        <ul>
          <li>
            <strong>Frostnip</strong> is the mild first stage. The skin turns red, then pale, and
            feels cold, tingly, or numb. It warms back up with no lasting damage, and it is the warning
            to go inside.
          </li>
          <li>
            <strong>Frostbite</strong> shows up as white or grayish-yellow skin, skin that feels
            unusually firm or waxy, and numbness. The CDC notes that redness or pain may be the first
            sign. A child may not feel it at all, which is why it gets missed.
          </li>
        </ul>
        <h3>What to do</h3>
        <ul>
          <li>Get the child somewhere warm, remove anything wet, and warm the whole body first.</li>
          <li>
            Rewarm the affected skin in water that feels warm, not hot, to your own unhurt hand, or
            tuck fingers into an armpit or a parent&apos;s warm hands. Expect it to sting and turn red
            as it warms.
          </li>
          <li>Loosely wrap the area with dry gauze or cloth, and separate fingers and toes.</li>
          <li>Any white, gray, waxy, hard, or blistered skin needs to be seen by a doctor.</li>
        </ul>
        <h3>What not to do</h3>
        <ul>
          <li>Do not rub or massage frostbitten skin, and never rub it with snow.</li>
          <li>
            Do not warm it near a campfire, camp stove, or heater, and do not use a heating pad or an
            activated hand warmer on it. Numb skin cannot feel heat, so it burns easily.
          </li>
          <li>Do not let the child walk on frostbitten feet or toes unless you have to.</li>
          <li>
            Do not thaw it if there is a chance it will freeze again before you reach shelter. Thawing
            and refreezing does more damage than staying frozen a little longer.
          </li>
        </ul>

        <h2>When to call 911, and when to just go home</h2>
        <p>Call 911 right away if a child:</p>
        <ul>
          <li>Is confused, very drowsy, hard to wake, or slurring words</li>
          <li>Cannot walk normally or keeps stumbling</li>
          <li>Was shivering hard and has stopped while still cold</li>
          <li>Is not responding, or is not breathing (start CPR)</li>
        </ul>
        <p>
          The CDC says a body temperature below 95 degrees F needs medical attention immediately.
          Many campgrounds have spotty cell service, so know before you arrive where the nearest
          signal, ranger station, and emergency room are, and keep the car keys somewhere everyone
          knows.
        </p>
        <p>
          Short of an emergency, pack up and go home or to a hotel if a child has warmed up from mild
          hypothermia but the forecast is still cold and wet, if you are out of dry clothes, or if
          sleeping bags got soaked. A miserable night is not worth it, and there is no prize for
          sticking it out. The{' '}
          <Link href="/guides/camping-when-the-weather-turns">camping when the weather turns</Link>{' '}
          guide has a full stay-or-go checklist.
        </p>

        <h2>Prevention: the habits that matter most</h2>
        <p>Almost every cold injury on a family trip is preventable with a few routines:</p>
        <ul>
          <li>
            <strong>Dress in layers, with no cotton.</strong> A synthetic or merino base layer like
            the{' '}
            <AmazonLink
              productId="vicherub-kids-thermal-set"
              pageSlug="hypothermia-and-frostbite-in-kids"
            />{' '}
            dries fast and stays warmer when damp. Our{' '}
            <Link href="/guides/how-to-dress-kids-for-cold-weather-camping">
              how to dress kids for cold-weather camping
            </Link>{' '}
            guide covers the full layering system.
          </li>
          <li>
            <strong>Change wet clothes immediately.</strong> Socks and gloves get wet first. Pack
            spares, including waterproof mittens like the{' '}
            <AmazonLink
              productId="wildbreakers-kids-mittens"
              pageSlug="hypothermia-and-frostbite-in-kids"
            />
            , and swap them the moment they are damp.
          </li>
          <li>
            <strong>Check in every 20 to 30 minutes.</strong> Feel the back of the neck, look at
            cheeks and ears, and ask kids to wiggle their fingers and toes and tell you if they can
            feel them.
          </li>
          <li>
            <strong>Feed and water them often.</strong> Cold dulls thirst, and a hungry, dehydrated
            kid gets cold fastest. Hot meals and snacks are covered in{' '}
            <Link href="/guides/cold-weather-camping-meals">cold-weather camping meals</Link>.
          </li>
          <li>
            <strong>Use hand warmers the right way.</strong>{' '}
            <AmazonLink
              productId="hothands-hand-warmers-bulk"
              pageSlug="hypothermia-and-frostbite-in-kids"
            />{' '}
            go in a mitten or pocket, never directly on bare skin, and never on skin that is already
            numb or frostbitten.
          </li>
          <li>
            <strong>Sleep warm.</strong> Most nighttime cold comes from the ground, not the air. See{' '}
            <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>{' '}
            for the sleeping bag and pad setup, and never run a fuel-burning heater inside a tent;{' '}
            <Link href="/guides/tent-heater-safety">tent heater safety</Link> explains why.
          </li>
        </ul>
        <p>
          Put the emergency blankets and a few hand warmers in your{' '}
          <Link href="/guides/camping-first-aid-kit-for-families">family first aid kit</Link> from
          October through April, so they are there the one time you need them.
        </p>

        <h2>Frequently asked</h2>
        <h3>What are the first signs of hypothermia in a child?</h3>
        <p>
          Shivering, unusual tiredness, clumsy hands, and a change in mood, like a chatty kid going
          quiet. In babies, look for bright red, cold skin and very low energy.
        </p>
        <h3>Can kids get hypothermia when it is not freezing?</h3>
        <p>
          Yes. Hypothermia can happen above 40 degrees F when a child is wet from rain, sweat, or a
          creek. Kids lose heat faster than adults, so a wet kid on a cool evening is at real risk.
        </p>
        <h3>What should I do if my child has frostbite at camp?</h3>
        <p>
          Get them warm and dry, then rewarm the area in warm, not hot, water or against warm skin.
          Never rub it or use a fire, heater, or hand warmer on it, and get white, gray, or waxy skin
          seen by a doctor.
        </p>
        <h3>When should I call 911 for a cold child while camping?</h3>
        <p>
          For confusion, drowsiness, slurred speech, trouble walking, or shivering that stops while
          the child is still cold. A body temperature below 95 degrees F is a medical emergency.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="hypothermia-and-frostbite-in-kids"
        heading="Gear for staying safe in the cold"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="hypothermia-and-frostbite-in-kids" />
    </>
  )
}
