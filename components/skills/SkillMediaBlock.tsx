import Image from 'next/image'
import type { SkillIllustration, SkillVideoEmbed } from '@/lib/skills/types'

interface Props {
  video?: SkillVideoEmbed
  illustration?: SkillIllustration
}

/**
 * Renders the optional how-to video + illustration block.
 *
 * Video is loaded from youtube-nocookie.com via iframe with `loading="lazy"`
 * so it doesn't impact LCP. Illustration uses next/image so Wikimedia SVGs
 * and photos go through Vercel's optimizer.
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
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white ring-1 ring-stone-200">
              <Image
                src={illustration.url}
                alt={illustration.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain p-4"
                unoptimized={illustration.url.endsWith('.svg')}
              />
            </div>
            <figcaption className="text-xs text-stone-500">{illustration.attribution}</figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}
