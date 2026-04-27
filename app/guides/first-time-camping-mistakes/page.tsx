import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/first-time-camping-mistakes'
const TITLE = 'First-Time Camping Mistakes'
const DESCRIPTION =
  'The 12 most avoidable mistakes that ruin first family camping trips — late arrivals, untested gear, over-packing, no kid plan — and how to dodge each.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&auto=format&fit=crop&q=80'

export const metadata = pageMetadata({
  title: TITLE,
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
            { name: 'Camping Basics', url: `${SITE_URL}/guides/camping-basics` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'What is the biggest mistake first-time campers make?',
            a: 'Arriving too late in the day. Setting up a tent and cooking dinner in the dark, with tired hungry kids, is the single most common first-trip disaster. Leave home in the morning and aim to arrive by 3pm, not 6pm.',
          },
          {
            q: 'What gear should I test before my first camping trip?',
            a: 'Pitch the tent in your yard. Light the stove. Turn on every headlamp and check the batteries. Inflate any air mattress and listen for leaks. These four tests catch 90% of the gear failures that ruin first trips.',
          },
          {
            q: 'Is it okay to cancel a camping trip because of weather?',
            a: 'Yes. Experienced campers do this regularly. Most state parks allow rescheduling up to 48 hours out for a small fee. Camping in heavy rain, storms, or extreme cold is a skill worth having eventually, but not on trip one.',
          },
          {
            q: 'How many nights should my first camping trip be?',
            a: 'One. Two at most. A one-night trip lets you learn what works and bail home the next morning if anything is miserable. Two nights is reasonable if the forecast is clean and you already have car camping experience from childhood.',
          },
          {
            q: 'What food mistakes do first-time campers make?',
            a: 'Overambitious meals are the top mistake — dutch-oven breads, complex skillet dinners. Second: not bringing enough snacks. Third: bringing unfamiliar food that picky kids refuse. Stick to hot dogs, mac and cheese, and foil packets the first time.',
          },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Camping Basics', url: `${SITE_URL}/guides/camping-basics` },
          { name: TITLE, url: `${SITE_URL}${SLUG}` },
        ]}
      />
    <GuidePage
      slug="first-time-camping-mistakes"
      eyebrow="Mistakes"
      title="First-Time Camping Mistakes"
      lede="We&apos;ve watched a lot of first trips go sideways. Here are the 12 most common, most avoidable mistakes — and what to do instead."
      heroImage={{
        src: HERO_IMAGE,
        alt: 'Campsite at dusk with a tent lit from inside — the classic late-arrival scramble',
      }}
    >
      <QuickAnswer
        tldr="The trip-wreckers: arriving after dark, untested gear, overpacking, no kid plan, and complicated meals."
        summary="The first-trip mistakes that cause every other problem are predictable: arriving after dark (the single biggest disaster — leave in the morning, arrive by 3pm), not testing gear in your yard first, booking too far from home, booking two nights instead of one, planning ambitious meals, ignoring the weather forecast, and assuming kids will entertain themselves. Smaller quiet mistakes still drain the fun: pitching on a slope, leaving food in the tent, wearing cotton, or forgetting a can opener. The fix isn't more gear — it's a smaller, closer trip with a tested template. A 70%-fun first trip beats a perfect one that never happens."
      />
      <h2>1. Arriving after dark</h2>
      <p>
        Setting up a tent in a headlamp beam while hungry kids cry in the car is a uniquely American horror. <strong>Arrive by 3pm.</strong> That means leaving in the morning.
      </p>

      <h2>2. Not testing gear at home first</h2>
      <p>
        That tent you bought two years ago at a Costco sale? Pitch it in the backyard. Pole might be snapped. Rainfly might be missing. You want to learn this in your driveway, not at dusk in the woods.
      </p>

      <h2>3. Overpacking</h2>
      <p>
        More gear ≠ more comfortable. It means more time setting up, more time breaking down, more stuff getting wet, more stuff getting lost.
      </p>

      <h2>4. Underpacking warm layers</h2>
      <p>
        Nights are 15–20°F colder than the daytime high. Everyone brings a fleece and a beanie. Everyone.
      </p>

      <h2>5. Booking too far from home</h2>
      <p>
        First trip? Under 90 minutes. Bail-outs need to be easy. Save the dramatic scenery for trip four.
      </p>

      <h2>6. Booking two nights</h2>
      <p>
        One night for the first trip. You learn what works, what doesn&apos;t, and you get to go home. Two nights when something&apos;s going wrong is a punishment.
      </p>

      <h2>7. Complicated meals</h2>
      <p>
        Skip the cast-iron dutch oven bread. Eat hot dogs, pasta, foil-packet dinners. Your job at camp is not to plate food — it&apos;s to feed people before they melt down.
      </p>

      <h2>8. Ignoring the weather</h2>
      <p>
        First trip: wait for a dry, mild forecast. Camping in the rain is a skill; first trips are not where you build it.
      </p>

      <h2>9. No plan for kids</h2>
      <p>
        &quot;They&apos;ll just play&quot; is a myth at unfamiliar campsites. Bring activities. Plan three per day.
      </p>

      <h2>10. Forgetting the boring essentials</h2>
      <p>
        Trash bags. Toilet paper. Lighter. Dish soap. These are the things you&apos;ll drive an hour back into town for.
      </p>

      <h2>11. Unpacking everything immediately</h2>
      <p>
        Set up the tent. Set up sleep. Then cook dinner. The rest can stay in the car. You don&apos;t need the spice rack deployed.
      </p>

      <h2>12. Planning it all yourself from scratch</h2>
      <p>
        This is the mistake that causes the other eleven. The details are solved — campsite distance, gear list, meal plan, kid activities, weather-aware layers. <strong>Use a template.</strong> Edit it to fit your family. Go.
      </p>

      <h2>The quiet mistakes nobody warns you about</h2>
      <p>
        The 12 above are the obvious ones. There&apos;s another tier of errors that don&apos;t ruin the trip outright but quietly drain the fun:
      </p>
      <ul>
        <li><strong>Parking the car facing the wrong way.</strong> Always back in. Trunk access matters 20 times a day.</li>
        <li><strong>Pitching the tent on a slope.</strong> Even a gentle slope has you sliding off the pad all night. Use a level app on your phone.</li>
        <li><strong>Leaving food in the tent.</strong> Mice and raccoons will find it. Food lives in the cooler or the car.</li>
        <li><strong>Wearing cotton.</strong> Cotton holds sweat and cold. Synthetic or wool for base layers. Always.</li>
        <li><strong>Not checking the fire ban status.</strong> Many parks ban campfires in summer. Check the state&apos;s fire restrictions page the week before.</li>
        <li><strong>Forgetting a can opener.</strong> Chili in a can with no opener is a quiet tragedy.</li>
        <li><strong>Leaving the rainfly off &ldquo;because it&apos;s clear tonight.&rdquo;</strong> Dew soaks the tent by morning. Rainfly goes on, always.</li>
        <li><strong>Burning everything in the fire pit.</strong> Plastic, foil, foam — these create toxic smoke you&apos;re breathing. Trash goes in the dumpster.</li>
      </ul>

      <h2>What to do when things go wrong (and they will)</h2>
      <p>
        A first trip always has at least one thing go sideways. What distinguishes a good trip from a bad one is how you respond:
      </p>
      <ul>
        <li><strong>Tent pole snaps:</strong> duct tape it to a stick. Tape lives in the first aid bag.</li>
        <li><strong>Stove won&apos;t light:</strong> cook over the fire grate or go into town for a camp meal. Don&apos;t waste 90 minutes troubleshooting.</li>
        <li><strong>Air mattress deflates:</strong> sleep on the bare pad. Or sleep in the car. Mattress is a comfort, not a necessity.</li>
        <li><strong>Heavy rain starts:</strong> get everyone in the tent, zip up, eat snacks, play cards. It passes.</li>
        <li><strong>Kid is miserable and won&apos;t stop crying:</strong> go home. No lesson is worth it. Try again in a month.</li>
      </ul>
      <p>
        The through-line: have a bail-out plan. The trip ends when it ends. A short successful trip beats a long miserable one every time.
      </p>

      <h2>The mindset mistakes (harder to see, bigger impact)</h2>
      <p>
        The tactical mistakes above are easy to fix. These are harder because they feel like virtues at the time:
      </p>
      <ul>
        <li><strong>Trying to &ldquo;do camping right.&rdquo;</strong> There&apos;s no right. Car camping with hot dogs and a tablecloth is camping. So is minimalist backpacking. Pick the easiest version.</li>
        <li><strong>Treating it as a test of your family.</strong> It isn&apos;t. If the kids cry, the trip isn&apos;t failing — it&apos;s just a kid crying. They do that at home too.</li>
        <li><strong>Buying your way to confidence.</strong> $800 of new gear doesn&apos;t make you better at camping. Going camping makes you better at camping.</li>
        <li><strong>Comparing to Instagram camping.</strong> Those photos are a 15-second slice of a 48-hour trip, 90% of which was logistics and dirt. Your reality is normal.</li>
        <li><strong>Needing it to be perfect.</strong> A trip that was 70% fun is a great trip. Nothing will be 100%.</li>
      </ul>
      <p>
        The goal isn&apos;t a flawless first trip. The goal is a second trip. Everything gets easier once you&apos;ve done it once.
      </p>

      <h2>Frequently asked</h2>
      <h3>What is the biggest first-trip mistake?</h3>
      <p>
        Arriving after dark. Tent setup and dinner prep in the dark with hungry kids is the top trip-wrecker.
      </p>
      <h3>What gear should I test before I go?</h3>
      <p>
        Tent, stove, headlamps, air mattress. These four cover most gear failures.
      </p>
      <h3>Is it okay to cancel for weather?</h3>
      <p>
        Yes. Reschedule. First trips don&apos;t need to be an endurance test.
      </p>
      <h3>How many nights for a first trip?</h3>
      <p>
        One. Maybe two if conditions are perfect.
      </p>
      <h3>What food mistakes are most common?</h3>
      <p>
        Overambitious meals, too few snacks, unfamiliar food. Keep it boring and plentiful.
      </p>
      <h3>Should I tell the ranger it&apos;s my first trip?</h3>
      <p>
        Yes. Every campground host and ranger we&apos;ve met is happy to help first-timers — they&apos;d rather answer questions at check-in than respond to problems at 11pm. Ask about the fire policy, the nearest store, and whether there&apos;s a site you should avoid.
      </p>
      <h3>What&apos;s the most common injury at a family campground?</h3>
      <p>
        Burns from the fire pit or the stove, and lacerations from folding chair hinges. Not wildlife. Not scary falls. Brief the kids on both hazards explicitly and keep a proper first aid kit at the top of the car trunk.
      </p>
    </GuidePage>
    <GuideArticleCTA />
    <RelatedGuides currentSlug="first-time-camping-mistakes" />
    </>
  )
}
