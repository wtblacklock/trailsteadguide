import Link from 'next/link'
import { ACTIVITIES } from '@/lib/activities/data'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/activities/rainy-day-camping-activities-kids'
const TITLE = 'Rainy Day Camping Activities for Kids'
const META_TITLE = 'Rainy Day Camping Activities for Kids — 15 Ideas'
const DESCRIPTION =
  'Rainy day camping activities for kids that actually work: tent games, tarp adventures, mud play, and what to do when it rains and you can\'t go home.'
const HERO_IMAGE =
  'https://images.unsplash.com/Ppz6b-YUDHw?w=1400&auto=format&fit=crop&q=80'

export const metadata = pageMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
  image: HERO_IMAGE,
})

export default function Page() {
  const calmActivities = ACTIVITIES.filter(
    (a) => a.energyLevel === 'low' || a.vibe === 'calm',
  ).slice(0, 16)

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
            { name: 'Activities', url: `${SITE_URL}/activities` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'What do you do with kids when it rains while camping?',
            a: 'Rain changes the activities, not the camp day. Outside: put on rain gear and embrace it — puddle jumping, mud play, and walking in rain are genuinely fun for kids who are dressed for it. Under a tarp: card games, storytelling, and craft activities. Inside the tent: downloaded movies, story chains, shadow puppets. Go home only if lightning or severe weather is in the forecast.',
          },
          {
            q: 'How do you keep kids entertained in a tent on a rainy day?',
            a: 'Pre-download movies and shows before the trip for guaranteed no-signal access. Bring a physical card game (Uno, Go Fish, Crazy Eights). Pack a small craft activity that can be done lying in a sleeping bag. Campfire Story Chain requires nothing but people. Plan for rain before you go — discovering you have no entertainment options at hour two of a tent day is avoidable.',
          },
          {
            q: 'Is camping in the rain worth it with kids?',
            a: 'Yes, with the right framing and gear. Kids who are dressed for rain (waterproof boots, rain jacket, spare dry clothes) often love camping in light rain. Puddles, mud, and the cozy tent-listening-to-rain experience are genuinely good memories. The trips most families remember most often involved some weather.',
          },
          {
            q: 'What games can you play in a tent?',
            a: 'Card games (Uno, Go Fish), storytelling games (Campfire Story Chain, Twenty Questions), shadow puppet theater, Would You Rather with camping scenarios, and trivia games. Any game that works lying down and doesn\'t require significant space.',
          },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Activities', url: `${SITE_URL}/activities` },
          { name: TITLE, url: `${SITE_URL}${SLUG}` },
        ]}
      />

      <article>
        <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-28 pb-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-8">
            Activities · Weather-proof
          </p>
          <h1 className="font-serif text-[2.75rem] md:text-[4.25rem] leading-[1.02] tracking-[-0.02em] font-semibold text-stone-950">
            Rainy Day Camping Activities for Kids
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-stone-600 leading-[1.5] font-light">
            What to do when the forecast was wrong — activities that work outside in rain, under a
            tarp, and inside the tent.
          </p>
        </header>

        <section className="max-w-3xl mx-auto px-8 prose-editorial">
          <p>
            Rain changes the activities. It doesn&apos;t cancel the day. The families that have the
            best time in rainy camp conditions arrived with a plan. The families that bail at the
            first drop didn&apos;t.
          </p>
          <p>
            The rule that works: <strong>always dress kids for rain at camp.</strong> Rain boots
            and a waterproof jacket, packed at the top of the bag. Kids who are dressed for rain
            can go outside in rain. Kids who aren&apos;t have nothing to do but sit in the tent
            and wait.
          </p>

          <h2>Three zones for rainy camp activities</h2>
          <p>
            Organize your rain day around three zones:
          </p>
          <ol>
            <li>
              <strong>Outside in rain gear.</strong> For light to moderate rain without lightning. Puddles are an activity. Mud is an activity. A short &ldquo;how many different sounds do you hear?&rdquo; walk in rain is an activity.
            </li>
            <li>
              <strong>Under a tarp or canopy.</strong> The cooking tarp or a camp canopy gives a sheltered outdoor space for card games, crafts, and snacking. This is the middle zone: protected but not cooped up.
            </li>
            <li>
              <strong>Inside the tent.</strong> For heavy rain or lightning. Pre-downloaded content, card games, storytelling, and the cozy tent experience.
            </li>
          </ol>
          <p>
            For full rainy-camp setup (tarp rigging, cooking in rain, shelter strategy), see{' '}
            <Link href="/guides/camping-when-the-weather-turns">
              camping when the weather turns
            </Link>
            .
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-8 mt-10 prose-editorial">
          <h2>Outside in rain: activities that embrace it</h2>

          <h3>1. Puddle jumping and mud play</h3>
          <p>
            The activity that requires no planning, no materials, and no adult facilitation. Kids
            with rain boots jump in puddles. Kids at camp jump in mud. This is universally excellent
            for ages 2–10 and requires exactly one thing: the willingness to let them do it and
            the spare dry clothes to change into after.
          </p>

          <h3>2. Rain sound walk</h3>
          <p>
            Walk slowly in light rain and count how many different sounds you can hear: rain on
            leaves, rain on the tent fly, rain on pavement, a drip from a branch, a stream running
            faster. This is an accessible version of a mindfulness walk that actually works for
            kids because it gives them a specific task (counting sounds) rather than asking them
            to &ldquo;be present.&rdquo;
          </p>

          <h3>3. Puddle art</h3>
          <p>
            Use sticks to draw in mud puddles. Make a map of the campsite in mud. Write names.
            Make a mud pie. Children 2–7 engage with this for longer than you expect, especially
            if an adult is genuinely participating rather than watching.
          </p>

          <h3>4. Rain gear photography</h3>
          <p>
            Give a school-age child the phone and ask them to photograph 5 things that look
            different in the rain than they would in the sun. Water on a spiderweb. Bark texture
            with rain on it. Ripples in a puddle. This gives a purpose to being outside in rain
            and produces something worth keeping.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-8 mt-10 prose-editorial">
          <h2>Under the tarp: outdoor table activities</h2>

          <h3>5. Card games</h3>
          <p>
            Uno, Go Fish, Crazy Eights, and War all work at the camp table under a tarp. Pack a
            standard deck of cards — it covers 10+ games for every age. This is the highest-value,
            lowest-weight rain-day item you can bring.
          </p>

          <h3>6. Nature sketching</h3>
          <p>
            Bring a blank notebook and a set of crayons or colored pencils. The task: sketch
            something you can see from the table. A leaf, a tree, the tent, the fire ring. Kids
            who resist &ldquo;drawing&rdquo; as a concept often engage with &ldquo;draw what
            you actually see&rdquo; as a different kind of activity.
          </p>

          <h3>7. Scavenger hunt (rain version)</h3>
          <p>
            Modify the nature scavenger hunt for rain: find something that collects rain, something
            that repels rain, a leaf with a drip on it, a puddle with bubbles, a worm. Kids can
            do this in rain gear without straying far from the tarp.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-8 mt-12">
          <h2 className="font-serif text-3xl font-semibold text-stone-950 mb-8">
            Tent and shelter activities (low-energy, all ages)
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calmActivities.map((activity) => (
              <li key={activity.slug}>
                <Link
                  href={`/activities/${activity.slug}`}
                  className="group flex flex-col h-full rounded-xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 p-5"
                >
                  <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-stone-700 transition-colors leading-snug mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed mb-3 flex-1">
                    {activity.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-stone-400">
                    <span>{activity.timeRequired}</span>
                    <span>·</span>
                    <span>
                      {activity.setupDifficulty === 'none' ? 'No setup' : activity.setupDifficulty}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl mx-auto px-8 mt-16 prose-editorial">
          <h2>The rainy camp day kit</h2>
          <p>
            Pack these specifically for rain contingency — they go in a labeled bag in the car
            and come out when the weather turns:
          </p>
          <ul>
            <li>Rain boots (one pair per child)</li>
            <li>Full rain jacket per person</li>
            <li>Spare dry clothes in a dry bag</li>
            <li>A deck of cards</li>
            <li>One blank notebook + colored pencils</li>
            <li>Phone or tablet with 1–2 movies pre-downloaded</li>
            <li>A physical book for each reader</li>
            <li>Extra snacks — rainy days feel longer and snacks help</li>
          </ul>

          <h2>When to go home in rain</h2>
          <p>
            Rain alone is not a reason to go home. The reasons to end a trip early:
          </p>
          <ul>
            <li><strong>Lightning in the area.</strong> Clear the tent and get in a hardshell vehicle. If lightning persists for more than 30 minutes, going home is reasonable.</li>
            <li><strong>Cold rain and a child who can&apos;t warm up.</strong> Hypothermia risk is real in cold wet conditions. If a child has been shivering for 20 minutes despite warming efforts, go home.</li>
            <li><strong>Flash flood risk near your site.</strong> Know the terrain — a site near a creek that becomes a flood risk in sustained heavy rain is a real danger.</li>
          </ul>
          <p>
            Light to moderate rain with no lightning, even for an entire day, is not an emergency.
            It&apos;s a camp condition to manage, not a trip-ending event. The trips that involve
            weather are often the ones families talk about for years.
          </p>

          <p>
            For a full structured camp plan matched to your family,{' '}
            <Link href="/quiz">take the 2-minute quiz</Link>. The plan includes contingency
            activity ideas for rain days.
          </p>
        </section>
      </article>
    </>
  )
}
