import type { SkillIllustration, SkillVideoEmbed } from '@/lib/skills/types'
import IllustrationLightbox from './IllustrationLightbox'

interface Props {
  video?: SkillVideoEmbed
  illustration?: SkillIllustration
}

/**
 * Renders the optional how-to video + illustration block.
 *
 * Video is loaded from youtube-nocookie.com via iframe with `loading="lazy"`
 * so it doesn't impact LCP. Illustration is wrapped in
 * `<IllustrationLightbox>` so visitors can click to enlarge — needed
 * for the knot diagrams and stargazing charts that show fine detail
 * at a small size.
 */
export default function SkillMediaBlock({ video, illustration }: Props) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-stone-900 mb-5">See it done</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {video && (
          <figure className="space-y-2">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-stone-200 ring-1 ring-stone-200">
              <iframe
                src={video.url}
                title={video.title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full"
              />
            </div>
            <figcaption className="text-xs text-stone-500">{video.title}</figcaption>
          </figure>
        )}
        {illustration && (
          <figure className="space-y-2">
            <IllustrationLightbox illustration={illustration} />
            <figcaption className="text-xs text-stone-500">{illustration.attribution}</figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}
