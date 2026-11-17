import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/how-to-get-kids-to-sleep-camping'
const TITLE = 'How to Get Kids to Sleep While Camping'
const META_TITLE = 'How to Get Kids to Sleep While Camping'
const DESCRIPTION =
  'How to get kids to sleep while camping: the wind-down routine, a warm sleep setup, and fixes for 5pm sunsets, tent noise, and the 2am wake-up.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1524494860062-9442631ee30e?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Why won\'t my kid sleep when we go camping?',
            a: 'Usually one of four things: they are cold, the tent is bright or noisy in a way home is not, bedtime moved because the whole evening changed, or they are overtired and wired. Cold is the most common and the easiest to fix, since a kid who is chilly will not settle no matter how good the routine is. Check the sleep setup first (pad under them, bag rated for the night, dry layers), then keep the home bedtime routine intact, then address light and sound. Most kids need one or two nights to adjust, and the second night is almost always better than the first.',
          },
          {
            q: 'What time should kids go to bed when camping?',
            a: 'Keep their normal bedtime, within about 30 minutes. In late fall it is dark by 5pm, which makes 8pm feel like midnight, but shifting bedtime earlier usually backfires: kids who are not tired lie awake in a cold tent and get wound up. Fill the dark hours with a fire, a game, and hot chocolate, then start the wind-down routine at the same time you would at home. If they wake at dawn, that is the trade-off for sleeping outdoors, and an early nap the next afternoon makes up for it.',
          },
          {
            q: 'How do I keep my child warm enough to sleep in a tent?',
            a: 'Insulate from below first, because the ground pulls heat out faster than cold air does. A sleeping pad matters more than the bag, and a kid on a bare air mattress in November can be miserable in a good bag. Then dress them in dry base layers and a hat, use a bag rated at least 10 degrees below the forecast low, and leave the bag hood or a hat on. Skip bulky puffy jackets inside the bag, which compress and leave cold gaps. A warm drink and a quick bathroom trip before bed help too.',
          },
          {
            q: 'What do I do when my child wakes up scared in the night?',
            a: 'Stay calm and keep the response small and boring. Use a dim or red light rather than flipping on a bright lantern, offer a drink or a bathroom trip, name the sound they heard (wind, an owl, a car door), and settle them back into the bag within a few minutes. Leaving a small light on low all night prevents most wake-ups in the first place. If they are properly afraid, move them next to you for the night. A calm second night beats a long argument, and the fear usually fades quickly once the dark has become familiar.',
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
        slug="how-to-get-kids-to-sleep-camping"
        eyebrow="Sleep"
        title="How to Get Kids to Sleep While Camping"
        lede="Dark at 5pm, a nylon wall instead of a bedroom, and a floor that steals heat. Here is how to get a family to sleep in a tent, and what to do when one kid is still wide awake at 10pm."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A person in a knit hat lying inside a tent reading a book with trees visible through the open door',
        }}
        dateModified="2026-11-14"
      >
        <QuickAnswer
          tldr="Fix the cold first, keep the home bedtime routine, tame light and noise, and expect the second night to go better than the first."
          summary="Kids who will not sleep while camping are usually cold, overtired, or thrown off by a different bedtime. Fix the cold first, because a chilly kid will not settle for any routine: put a sleeping pad under every child, use a bag rated 10 degrees below the forecast low, and dress them in dry base layers and a hat. Then keep the home routine intact. Early darkness in November tempts families to push bedtime earlier, but kids who are not tired lie awake and get wound up, so fill the dark evening with a fire and games and start winding down at the usual time. Use a dim light or red mode, bring a favorite stuffed animal, pillow, and book, and expect the second night to go better than the first. A calm, boring response to a 2am wake-up beats any clever fix."
        />

        <h2>Why kids sleep badly in a tent</h2>
        <p>
          Home bedtimes work because everything is the same: the room, the sounds, the light, the
          temperature, the bed. A tent changes all of it at once. The ground is firmer and colder, the
          walls flap, other campers talk until 10pm, and the dark is darker than anything a child has
          seen. Add a bedtime that moved because the whole day was different, and a kid who slept
          perfectly in a bedroom can lie awake for two hours.
        </p>
        <p>
          The good news is that the causes are few and mostly fixable. Work through them in this
          order: temperature, routine, light, sound, then comfort items.
        </p>

        <h2>Fix the cold first</h2>
        <p>
          Nothing else on this list matters if the child is cold. A chilly kid wakes up, cries, and
          cannot settle, and no amount of storytelling changes that. The ground is the biggest
          culprit, because it pulls heat out of a body faster than cold air does.
        </p>
        <ul>
          <li>
            <strong>Pad before bag.</strong> Every kid needs insulation under them, and a foam or
            insulated pad often matters more than the sleeping bag. Our{' '}
            <Link href="/guides/sleeping-pad-r-value-explained">sleeping pad R-value guide</Link>{' '}
            explains how much you need for the forecast low.
          </li>
          <li>
            <strong>Bag rated 10 degrees below the low.</strong> Kids lose heat faster than adults and
            do not tell you until it is bad. See{' '}
            <Link href="/guides/best-camping-sleeping-bag-for-kids">
              the best sleeping bags for kids
            </Link>{' '}
            for what the ratings really mean.
          </li>
          <li>
            <strong>Dry base layers and a hat.</strong> Change out of anything damp from the day.
            Thermal underwear and a hat in the bag handle most of a cold night.
          </li>
          <li>
            <strong>No big puffy jacket inside the bag.</strong> It compresses and leaves cold gaps.
            Wear thin layers and let the bag do the work.
          </li>
        </ul>
        <p>
          For the full layering system, read{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>.
        </p>

        <h2>Keep the bedtime routine, not the bedtime clock</h2>
        <p>
          Dark arrives before 5pm in mid-November across much of the country, and it makes an 8pm
          bedtime feel absurdly far off. The instinct is to put kids to bed early. Resist it. A child
          who is not tired lies awake in a cold tent, gets bored, and gets wound up.
        </p>
        <p>
          Instead, keep the same sequence they have at home, started at the usual time: a warm drink,
          teeth, pajamas, a book, lights out. The routine is the signal that sleep is coming, and it
          travels better than the bed does. Fill the long dark evening with a fire, cards, and a
          walk, and our guide to{' '}
          <Link href="/guides/camping-after-dark-with-kids">camping after dark with kids</Link> has
          a full rotation of activities for those hours.
        </p>
        <ul>
          <li>
            <strong>Do the active stuff early.</strong> Games and running around go before dinner or
            right after, not in the last hour.
          </li>
          <li>
            <strong>Change into sleep layers before the last activity.</strong> Nobody wants to
            undress in a cold tent at the end of a tired night.
          </li>
          <li>
            <strong>Make the last bathroom trip a group walk.</strong> Do it with headlamps, then
            straight into the tent.
          </li>
        </ul>

        <h2>Tame the light</h2>
        <p>
          A bright lantern inside the tent keeps kids alert, but total darkness frightens many of
          them. The middle path is a dim, warm light.
        </p>
        <ul>
          <li>
            <strong>Use red mode or a low setting.</strong> Red light keeps night vision and is far
            less stimulating than white.
          </li>
          <li>
            <strong>Leave a small light on all night.</strong> A lantern on its lowest setting
            prevents most 2am wake-ups. Do not turn it into a negotiation.
          </li>
          <li>
            <strong>Give each kid a headlamp of their own.</strong> Having a switch they control
            takes the fear out of the dark.
          </li>
          <li>
            <strong>Pitch the tent with the door away from the lantern post.</strong> Campground
            security lights and neighbors&apos; fires can light a tent wall from outside.
          </li>
        </ul>

        <h2>Handle the noise</h2>
        <p>
          Tent sleep is never quiet. Wind snaps the rainfly, a car door slams at 9pm, and an owl
          starts up at midnight. Kids who are anxious about sounds usually sleep better once the
          sounds have names.
        </p>
        <ul>
          <li>
            <strong>Name the sounds before bed.</strong> Ten minutes of listening, then say what
            each one is.
          </li>
          <li>
            <strong>Pick a protected pitch.</strong> A site with trees or a berm cuts wind, and a
            site away from the road and bathhouse cuts foot traffic.
          </li>
          <li>
            <strong>Tighten the rainfly.</strong> A flapping fly is the loudest thing in a campsite
            and the easiest to fix with a few guylines.
          </li>
          <li>
            <strong>Quiet hours exist.</strong> Most campgrounds enforce 10pm, so a loud neighbor is
            worth a polite word with the host.
          </li>
        </ul>

        <h2>Bring comfort from home</h2>
        <p>
          A familiar object does more than any gadget. Pack the stuffed animal, the pillow from their
          own bed, and the book you read every night. A pillowcase from home with a familiar smell
          helps a lot. For toddlers, a wearable blanket removes the problem of kicked-off covers, and
          our{' '}
          <Link href="/guides/camping-with-toddlers">camping with toddlers guide</Link> covers the
          rest of the little-kid setup.
        </p>

        <h2>Practice before the trip</h2>
        <p>
          If a child has never slept anywhere but their own bed, the first tent night is a lot to
          ask. A{' '}
          <Link href="/guides/backyard-camping-with-kids">backyard camping night</Link> lets them
          meet the sleeping bag, the pad, and the dark with a back door nearby. For a family&apos;s
          real first trip, the{' '}
          <Link href="/guides/first-night-camping-guide">first night camping guide</Link> sets
          realistic expectations: a rough first night is normal, and the second is usually far
          better.
        </p>

        <h2>When a kid wakes up at 2am</h2>
        <p>
          It will happen. The goal is a short, calm, boring response so everyone falls back asleep
          fast.
        </p>
        <ol>
          <li>Use a dim or red light, not a bright lantern.</li>
          <li>Check the basics: warm, dry, needs the bathroom, thirsty.</li>
          <li>Name the sound they heard and keep your voice low.</li>
          <li>Settle them back into the bag and stay for a couple of minutes.</li>
          <li>If they are truly frightened, bring them next to you and move on.</li>
        </ol>
        <p>
          A kid in your bag at 2am is not a failure. It is a trade for everyone getting some sleep,
          and the next night usually goes better.
        </p>

        <h2>Frequently asked</h2>
        <h3>Why won&apos;t my kid sleep when we go camping?</h3>
        <p>
          Usually cold, overtired, or thrown off by a changed routine. Check the sleep setup first,
          keep the home bedtime routine, then address light and sound. Most kids settle by the second
          night.
        </p>
        <h3>What time should kids go to bed when camping?</h3>
        <p>
          Their normal bedtime, within about 30 minutes. Early darkness makes it tempting to go
          earlier, but kids who are not tired lie awake and get wound up. Fill the evening and start
          the routine at the usual time.
        </p>
        <h3>How do I keep my child warm enough to sleep in a tent?</h3>
        <p>
          Insulate from below with a pad, use a bag rated 10 degrees below the forecast low, and
          dress them in dry base layers and a hat. Skip bulky jackets inside the bag.
        </p>
        <h3>What do I do when my child wakes up scared in the night?</h3>
        <p>
          Keep it calm and boring: dim light, check the basics, name the sound, and settle them back
          in. A small light on all night prevents most wake-ups. If they are truly scared, bring them
          next to you.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="how-to-get-kids-to-sleep-camping"
        heading="Gear for a warmer, calmer night"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-get-kids-to-sleep-camping" />
    </>
  )
}
