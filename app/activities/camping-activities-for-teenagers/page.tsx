import Link from 'next/link'
import { ACTIVITIES } from '@/lib/activities/data'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/activities/camping-activities-for-teenagers'
const TITLE = 'Camping Activities for Teenagers'
const META_TITLE = 'Camping Activities for Teenagers'
const DESCRIPTION =
  'Camping activities for teenagers that hold their attention: challenge-based games, navigation, night activities, and fixes for a bored teen.'
const HERO_IMAGE =
  'https://images.unsplash.com/iW5jy46axgs?w=1400&auto=format&fit=crop&q=80'

export const metadata = pageMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
  image: HERO_IMAGE,
})

export default function Page() {
  const teenActivities = ACTIVITIES.filter(
    (a) => a.ageRange === '13-17' || a.ageRange === '9-12' || a.ageRange === 'all-ages',
  ).slice(0, 20)

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
            q: 'What do teenagers do while camping?',
            a: 'Teens engage best with activities that have real challenge, stakes, or autonomy: map and compass navigation, fire-starting competitions, night hikes, photography challenges, and games with competitive scoring. Give them a job with real responsibility. The worst camp experience for a teen is being supervised - give them autonomy within safety bounds.',
          },
          {
            q: 'How do you get teenagers interested in camping?',
            a: 'Let them plan part of the trip. Give them the real navigation job (actual map and compass, not just following a trail). Set challenges that have a genuine outcome: first one to identify 5 different bird species, best camp photo, fastest fire-starter. Autonomy and stakes are what makes activities meaningful for teenagers.',
          },
          {
            q: 'What camping activities are good for teens and adults together?',
            a: 'Night sky observation with a star chart, two-team outdoor games like capture the flag or ultimate frisbee, camp cooking competitions where each team makes a foil packet dinner, and campfire games like Two Truths and a Trail or Twenty Questions. Activities with competitive elements and no obvious "kids vs adults" structure work best.',
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
            Activities · Ages 12+
          </p>
          <h1 className="font-serif text-[2.75rem] md:text-[4.25rem] leading-[1.02] tracking-[-0.02em] font-semibold text-stone-950">
            Camping Activities for Teenagers
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-stone-600 leading-[1.5] font-light">
            Challenge-based, autonomy-forward activities that hold teen attention - and what to do
            when yours says camping sounds boring.
          </p>
        </header>

        <section className="max-w-3xl mx-auto px-8 prose-editorial">
          <p>
            The teenager who says camping is boring is usually right about the version of camping
            they&apos;ve been offered: passive, supervised, and structured for younger kids. The
            version that works for teens is different. It has real challenge, genuine stakes, and
            actual responsibility.
          </p>
          <p>
            The principle: give teenagers jobs that matter, not jobs that are pretend. Real
            navigation. Real fire-starting. Real meal prep. Real consequences if something goes
            wrong. When the outcome is meaningful, the activity is engaging.
          </p>
          <p>
            For younger kids: see{' '}
            <Link href="/activities/camping-activities-for-kids">
              camping activities for kids (all ages)
            </Link>{' '}
            or{' '}
            <Link href="/activities/camping-activities-for-toddlers">
              camping activities for toddlers
            </Link>
            .
          </p>

          <h2>What teens actually respond to at camp</h2>
          <ul>
            <li>
              <strong>Autonomy.</strong> &ldquo;You&apos;re in charge of dinner tonight&rdquo; lands differently than &ldquo;come help me make dinner.&rdquo;
            </li>
            <li>
              <strong>Real stakes.</strong> Navigation with an actual consequence if you get it wrong, fire-starting when it&apos;s the only heat source, a cooking challenge where someone wins.
            </li>
            <li>
              <strong>Challenge without a ceiling.</strong> Activities where the better you are, the more interesting it gets: photography, map reading, bird identification, night sky observation.
            </li>
            <li>
              <strong>Peer or sibling competition.</strong> Almost any activity becomes more engaging with a competitive framing. First to find 5 different bird species. Best photo. Fastest fire.
            </li>
            <li>
              <strong>No adult hovering.</strong> Teens who are trusted to handle something do handle it. Being watched undermines the activity.
            </li>
          </ul>
        </section>

        <section className="max-w-5xl mx-auto px-8 mt-12">
          <h2 className="font-serif text-3xl font-semibold text-stone-950 mb-8">
            Activities that work for teenagers at camp
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teenActivities.map((activity) => (
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
          <h2>Specific activities that reliably work for teens</h2>

          <h3>Map and compass navigation</h3>
          <p>
            Give them a topographic map and a compass. Set a destination 1-2 miles away. They
            navigate, you follow. This is genuinely challenging for most teenagers and has real
            stakes. A teen who gets the group to the destination correctly feels accomplished in
            a way that a &ldquo;follow the blue trail blazes&rdquo; hike doesn&apos;t produce.
          </p>

          <h3>Fire-starting competition</h3>
          <p>
            Each person gets a pile of materials and 15 minutes to start a fire using only matches
            or a lighter (no lighter fluid, no firestarter blocks). Judge by who has the largest
            sustained fire at 15 minutes. This is more engaging than it sounds - teens take it
            seriously and the skill is actually useful.
          </p>

          <h3>Camp photography challenge</h3>
          <p>
            Give them a phone or a camera and a list of 10 shots to capture during the day:
            macro of a natural texture, silhouette, motion blur, reflection, shadow, something
            unexpected. Review them around the fire. This occupies time and produces something
            they actually want to keep.
          </p>

          <h3>Night sky observation</h3>
          <p>
            Download a star chart app before the trip (works offline). After dark, find 5
            constellations, locate a planet, and try to identify the Milky Way. This is better
            with a printed paper chart alongside the app - teens who explain the constellation
            to someone else learn it faster. Competitive: first person to confirm 5 constellations.
          </p>

          <h3>Wilderness survival scenarios</h3>
          <p>
            Pose a scenario: &ldquo;You&apos;re 5 miles from camp and the trail marker is gone -
            what do you do?&rdquo; Walk through wilderness survival priorities as a conversation,
            not a lecture. Teens engage with the problem-solving framing. Follow with the real
            skills that answer the scenario: navigation, fire, water, signaling.
          </p>

          <h3>Trail journaling</h3>
          <p>
            A blank notebook and a prompt: document the trip as if you&apos;re going to share it
            with someone who couldn&apos;t come. Sketch, write, tape in a leaf or a pressed flower.
            This works for teens who are introverted and need a solo activity that isn&apos;t
            passive. Review the journals around the fire on the last night.
          </p>

          <h2>What to do when a teen says camping is boring</h2>
          <p>
            First, ask what specifically is boring. The answer is usually &ldquo;there&apos;s
            nothing to do,&rdquo; which means they&apos;ve been structured into activities designed
            for younger kids or left to passive observation. The fix:
          </p>
          <ol>
            <li>Give them a real job - not a fake job. Camp photographer, dinner lead, navigation lead for tomorrow&apos;s hike.</li>
            <li>Introduce a challenge with competitive structure. Most teens will engage with &ldquo;let&apos;s see who can start a fire faster&rdquo; even if they resisted the activity when framed as &ldquo;want to learn fire starting?&rdquo;</li>
            <li>Take a night hike. The dark changes the environment enough to reset the boredom. Bring headlamps, go slowly, listen.</li>
            <li>Accept that some downtime is okay. Teens at camp who are reading, sketching, or just sitting are not bored in a problem-requiring-intervention way. Let it be.</li>
          </ol>

          <p>
            For a camp plan that accounts for teen ages alongside younger siblings,{' '}
            <Link href="/quiz">take the 2-minute quiz</Link> - we&apos;ll match a structured plan
            to your family&apos;s ages and experience level.
          </p>
        </section>
      </article>
    </>
  )
}
