import Link from 'next/link'
import { ACTIVITIES } from '@/lib/activities/data'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/activities/camping-activities-for-toddlers'
const TITLE = 'Camping Activities for Toddlers'
const META_TITLE = 'Camping Activities for Toddlers (Ages 2–5)'
const DESCRIPTION =
  'The best camping activities for toddlers: sensory exploration, short structured play, and camp games that work for ages 2–5 without needing adult-level attention spans.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1400&auto=format&fit=crop&q=80'

export const metadata = pageMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
  image: HERO_IMAGE,
})

export default function Page() {
  const toddlerActivities = ACTIVITIES.filter(
    (a) => a.ageRange === '3-5' || a.ageRange === 'all-ages',
  ).slice(0, 18)

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
            q: 'What camping activities are good for toddlers?',
            a: 'Sensory activities that involve touching, collecting, and observing: rock and leaf sorting, puddle jumping, nature walks with a simple two-item list, and water play at a stream or lake edge. Keep activities to 15–20 minute windows — toddlers at camp are exploring, not completing structured activities.',
          },
          {
            q: 'Can a 2-year-old go camping?',
            a: 'Yes. Keep the trip one night, choose a site with flush toilets, stay within an hour of home, and accept that the trip is mostly logistics rather than relaxation. Most families find that age 4 is the real sweet spot where camping becomes genuinely fun for everyone. Toddler camping is more work than family camping — plan accordingly.',
          },
          {
            q: 'How do you keep a toddler entertained while camping?',
            a: 'Accept that toddlers entertain themselves through exploration rather than structured activities. Give them a bucket or container to fill with natural materials. Let them dig in dirt with a small shovel. Bring a set of stacking cups for stream and puddle play. Follow what they find interesting rather than directing them.',
          },
          {
            q: 'How do toddlers sleep at camp?',
            a: 'Expect a harder first night and bring the exact bedtime routine from home: same book, same songs, same order. A battery-powered white noise machine or fan masks unfamiliar sounds. A glow stick inside the tent prevents total-dark panic. Most toddlers adjust on the second night. Keep the trip one night until you know your child\'s camp sleep pattern.',
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
            Activities · Ages 2–5
          </p>
          <h1 className="font-serif text-[2.75rem] md:text-[4.25rem] leading-[1.02] tracking-[-0.02em] font-semibold text-stone-950">
            Camping Activities for Toddlers
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-stone-600 leading-[1.5] font-light">
            Sensory play, short-window activities, and camp games that work for ages 2–5 — the
            ones that match how toddlers actually explore rather than how adults expect them to.
          </p>
        </header>

        <section className="max-w-3xl mx-auto px-8 prose-editorial">
          <p>
            Toddlers at camp are not completing activities — they are exploring. The activities
            that work for ages 2–5 follow their attention, not a structured plan. A toddler who
            finds an interesting stick will spend 25 minutes with that stick. Your job is to be
            present for whatever they find, not to direct them toward what you planned.
          </p>
          <p>
            That said, having structured fallbacks helps during the windows when exploration stalls.
            The activities below work in 10–20 minute windows and require minimal setup.
          </p>
          <p>
            For older kids: see{' '}
            <Link href="/activities/camping-activities-for-kids">
              camping activities for kids (all ages)
            </Link>{' '}
            or{' '}
            <Link href="/activities/camping-activities-for-teenagers">
              camping activities for teenagers
            </Link>
            .
          </p>

          <h2>How toddlers engage with nature</h2>
          <p>
            The activities that reliably hold toddler attention share a few traits:
          </p>
          <ul>
            <li><strong>Sensory.</strong> Touching, smelling, listening, splashing. Dirt, water, bark, and leaves are intrinsically interesting to ages 2–4.</li>
            <li><strong>Collecting.</strong> A container to fill is an open-ended activity that occupies a toddler for as long as there are things to collect. Bring a small bucket.</li>
            <li><strong>Movement without destination.</strong> Toddlers walk, run, squat, and get up dozens of times per minute. Activities that accommodate that movement (not ones that require sitting still) work.</li>
            <li><strong>Parallel adult activity.</strong> Toddlers engage more when doing something alongside an adult. You gather rocks, they gather rocks. You write in a notebook, they draw in a notebook.</li>
          </ul>
        </section>

        <section className="max-w-5xl mx-auto px-8 mt-12">
          <h2 className="font-serif text-3xl font-semibold text-stone-950 mb-8">
            Activities that work for toddlers at camp
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toddlerActivities.map((activity) => (
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
          <h2>Non-activity activities (what actually fills the day)</h2>
          <p>
            Beyond structured activities, most of a toddler&apos;s camp day is absorbed by these:
          </p>
          <ul>
            <li><strong>Stream or lake edge play.</strong> If your campsite is near water, this can fill 2–3 hours. Bring stacking cups, a small net, and a change of clothes. Do not try to stop a toddler from getting wet — plan for it instead.</li>
            <li><strong>Dirt digging.</strong> A small plastic shovel and a designated digging zone. Toddlers will dig until stopped. This is not a formal activity, it&apos;s free play, but it works reliably for extended windows.</li>
            <li><strong>Stick and leaf collection.</strong> Give them a bag. They fill it. Sort the contents together when they&apos;re done.</li>
            <li><strong>Shadow chasing.</strong> In the late afternoon, when the sun is lower, shadows are long and interesting to toddlers. Jump on your shadow, chase someone else&apos;s shadow, make shadow puppets on the tent.</li>
            <li><strong>Camp setup involvement.</strong> Toddlers can hand you stakes, hold a tent pole upright, carry a small bag, and feel like participants. Give them a real task during setup and they engage with it seriously.</li>
          </ul>

          <h2>Sleep and rest for toddlers at camp</h2>
          <p>
            If your toddler still naps, protect the nap. An overtired toddler at camp is one of the more challenging camp situations. Work the camp day around the nap window rather than ignoring it.
          </p>
          <p>
            For the overnight: bring the exact bedtime ritual from home. Same book. Same songs. Same order. A small battery-powered white noise fan or machine masks unfamiliar camp sounds. Expect a harder first night. Expect a better second night.
          </p>

          <h2>What to pack specifically for toddlers</h2>
          <ul>
            <li>Small bucket and shovel</li>
            <li>Stacking cups (for water play)</li>
            <li>A small magnifying glass (for looking at bugs, bark, and leaves)</li>
            <li>Crayons and a blank notebook</li>
            <li>Their own headlamp (red-light mode preferred)</li>
            <li>Glow stick for the tent at bedtime</li>
            <li>Rain boots and a full set of spare clothes for each day</li>
            <li>Their own small backpack with their &ldquo;camp jobs&rdquo; inside</li>
          </ul>

          <p>
            For a complete first-trip plan with toddlers, <Link href="/quiz">take the 2-minute quiz</Link>. We&apos;ll match a structured plan to your kids&apos; ages, including a day-by-day activity schedule.
          </p>
        </section>
      </article>
    </>
  )
}
