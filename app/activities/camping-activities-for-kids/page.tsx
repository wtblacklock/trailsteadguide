import Link from 'next/link'
import { ACTIVITIES } from '@/lib/activities/data'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/activities/camping-activities-for-kids'
const TITLE = 'Camping Activities for Kids'
const META_TITLE = 'Camping Activities for Kids — 37 Proven Ideas'
const DESCRIPTION =
  'Camping activities for kids sorted by age, energy, and weather: campfire games, nature scavenger hunts, rainy-day ideas, and quiet activities for every camp situation.'
const HERO_IMAGE =
  'https://images.unsplash.com/LazgZx2HvB0?w=1400&auto=format&fit=crop&q=80'

export const metadata = pageMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
  image: HERO_IMAGE,
})

const AGE_LABELS: Record<string, string> = {
  '3-5': 'Ages 3–5',
  '6-8': 'Ages 6–8',
  '9-12': 'Ages 9–12',
  '13-17': 'Ages 13–17',
  adults: 'Adults',
  'all-ages': 'All Ages',
}

const CATEGORY_ORDER = [
  'campfire',
  'nature',
  'icebreaker',
  'active',
  'craft',
  'quiet',
  'game',
  'challenge',
] as const
const CATEGORY_LABELS: Record<string, string> = {
  campfire: 'Campfire Games',
  nature: 'Nature Activities',
  icebreaker: 'Icebreakers',
  active: 'Active Games',
  craft: 'Crafts',
  quiet: 'Quiet Activities',
  game: 'Group Games',
  challenge: 'Challenges',
}

const ENERGY_ICON: Record<string, string> = {
  low: '🟢',
  medium: '🟡',
  high: '🔴',
}

type Category = (typeof CATEGORY_ORDER)[number]

export default function Page() {
  const byCategory = CATEGORY_ORDER.reduce<Record<string, typeof ACTIVITIES>>((acc, cat) => {
    acc[cat] = ACTIVITIES.filter((a) => a.category === cat)
    return acc
  }, {} as Record<string, typeof ACTIVITIES>)

  const categories = CATEGORY_ORDER.filter((cat) => (byCategory[cat]?.length ?? 0) > 0)

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
            q: 'What are good camping activities for kids?',
            a: 'Nature scavenger hunts, campfire story chains, rock painting, stick whittling (age 8+), s\'mores making, and flashlight tag are consistently the most popular. Plan three activities per day — morning nature walk, afternoon quiet activity, evening campfire game — and you will not run out of things to do.',
          },
          {
            q: 'What do kids do all day at a campsite?',
            a: 'Plan structured activities or expect boredom-driven meltdowns. A morning hike with a scavenger hunt list, an afternoon craft or challenge at the site, and an evening campfire with games covers a full camp day. Nature does not auto-entertain kids — activity planning is the most important pre-trip step.',
          },
          {
            q: 'What camping activities are good for toddlers?',
            a: 'Rock and leaf sorting, puddle jumping, nature walks with a simple two-item list, and chalk drawing on pavement. Keep it sensory and short — 15–20 minute windows. Toddlers at camp are exploring, not completing activities.',
          },
          {
            q: 'What do teenagers do while camping?',
            a: 'Teens respond well to activities with a real challenge component: map and compass navigation, fire-starting competitions, night hikes, or photography challenges. Give them a job with real responsibility and they typically engage. The worst camp experience for a teen is being supervised — give them autonomy within safety bounds.',
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
            Activities
          </p>
          <h1 className="font-serif text-[2.75rem] md:text-[4.25rem] leading-[1.02] tracking-[-0.02em] font-semibold text-stone-950">
            Camping Activities for Kids
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-stone-600 leading-[1.5] font-light">
            37 structured camp activities sorted by category. Filter by what you need: campfire
            games, nature walks, rainy-day ideas, or quiet activities for the afternoon lull.
          </p>
        </header>

        <section className="max-w-3xl mx-auto px-8 prose-editorial">
          <p>
            The biggest mistake in family camping is expecting nature to auto-entertain kids. It
            doesn&apos;t. A 7-year-old with nothing planned will find something to do — usually
            involving conflict with a sibling. The fix is planning three activities per day before
            you leave home: one for the morning, one for the afternoon, one for the evening fire.
            The list below has all three covered in every condition, including rain.
          </p>

          <p>
            Each activity links to a full how-to card with instructions, variations, and age notes.
            For age-specific lists, see{' '}
            <Link href="/activities/camping-activities-for-toddlers">
              camping activities for toddlers
            </Link>
            ,{' '}
            <Link href="/activities/camping-activities-for-teenagers">
              camping activities for teenagers
            </Link>
            , and{' '}
            <Link href="/activities/rainy-day-camping-activities-kids">
              rainy day camping activities
            </Link>
            .
          </p>

          <h2>How to use this list</h2>
          <p>
            Before the trip, pick one activity from each window: morning, afternoon, evening. Print
            the instructions for any nature-based activities so you don&apos;t need cell service to
            reference them at camp. Bring the materials for any craft activities in a labeled
            ziplock bag.
          </p>
          <p>
            The energy icons below show what each activity demands: low energy (calm, seated, good
            after meals), medium energy (moving around the site), or high energy (running, active
            play).
          </p>
        </section>

        {categories.map((cat) => (
          <section key={cat} className="max-w-5xl mx-auto px-8 mt-16">
            <h2 className="font-serif text-3xl font-semibold text-stone-950 mb-8">
              {CATEGORY_LABELS[cat] ?? cat}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {byCategory[cat]?.map((activity) => (
                <li key={activity.slug}>
                  <Link
                    href={`/activities/${activity.slug}`}
                    className="group flex flex-col h-full rounded-xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 p-5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-stone-700 transition-colors leading-snug">
                        {activity.title}
                      </h3>
                      <span className="shrink-0 text-sm" title={`${activity.energyLevel} energy`}>
                        {ENERGY_ICON[activity.energyLevel] ?? ''}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500 leading-relaxed mb-3 flex-1">
                      {activity.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-stone-400">
                      <span>{AGE_LABELS[activity.ageRange] ?? activity.ageRange}</span>
                      <span>·</span>
                      <span>{activity.timeRequired}</span>
                      <span>·</span>
                      <span>{activity.setupDifficulty === 'none' ? 'No setup' : activity.setupDifficulty}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="max-w-3xl mx-auto px-8 mt-20 prose-editorial">
          <h2>The three-activities-per-day rule</h2>
          <p>
            Every successful family camping trip runs on some version of this schedule:
          </p>
          <ul>
            <li>
              <strong>Morning (8–11am):</strong> Something active and outside — a nature walk, a
              scavenger hunt, a short hike. Kids are freshest in the morning; use that energy.
            </li>
            <li>
              <strong>Afternoon (1–4pm):</strong> Something quieter at the site — a craft, a
              challenge, free exploration, a nap for younger kids. The post-lunch lull is real.
              Plan for it.
            </li>
            <li>
              <strong>Evening (5pm–dark):</strong> The campfire. S&apos;mores, a campfire game, a
              story chain. The fire handles the entertainment; your job is just to keep it lit.
            </li>
          </ul>
          <p>
            Three activities, planned in advance, prevents the &ldquo;I&apos;m bored&rdquo;
            cascade that leads to sibling conflict and parent frustration. Nature adds texture to
            the activities — it doesn&apos;t replace them.
          </p>

          <h2>Rainy day adjustments</h2>
          <p>
            Rain changes the activities, not the schedule. Move morning walk to a rain-gear
            adventure instead of canceling it — puddles and mud are intrinsically interesting to
            kids under 10. Afternoon crafts move inside the tent or under a tarp canopy. Evening
            campfire moves to camp games in the car or a downloaded movie in the tent.
          </p>
          <p>
            See{' '}
            <Link href="/activities/rainy-day-camping-activities-kids">
              rainy day camping activities
            </Link>{' '}
            for a full list of weather-proof options.
          </p>

          <h2>Activities by age group</h2>
          <p>
            Not all activities work at all ages. The breakdown that helps:
          </p>
          <ul>
            <li>
              <strong>Toddlers (2–4):</strong> Sensory, short, and exploratory. Rock sorting, leaf
              collecting, puddle jumping. See{' '}
              <Link href="/activities/camping-activities-for-toddlers">
                camping activities for toddlers
              </Link>
              .
            </li>
            <li>
              <strong>School age (5–11):</strong> Most activities on this list. Scavenger hunts,
              campfire games, challenges, and crafts all land well in this range.
            </li>
            <li>
              <strong>Teens (12+):</strong> Activities with real challenge, autonomy, or social
              stakes. Navigation, fire-starting, photography, and games with competitive scoring.
              See{' '}
              <Link href="/activities/camping-activities-for-teenagers">
                camping activities for teenagers
              </Link>
              .
            </li>
          </ul>

          <p>
            If you want a complete camp plan matched to your kids&apos; ages — including a day-by-day
            activity schedule — <Link href="/quiz">take the 2-minute quiz</Link> and we&apos;ll
            build one for your family.
          </p>
        </section>
      </article>
    </>
  )
}
