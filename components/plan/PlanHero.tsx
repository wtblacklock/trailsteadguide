import Image from 'next/image'
import PersonalizationBanner from './PersonalizationBanner'

interface Props {
  title: string
  hook: string
  imageUrl: string
}

export default function PlanHero({ title, hook, imageUrl }: Props) {
  return (
    <section className="relative">
      <PersonalizationBanner />
      <div className="max-w-page mx-auto px-4 md:px-8 pt-6">
        <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 80rem"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
            <div className="max-w-content mx-auto">
              <h1 className="text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight mb-3">
                {title}
              </h1>
              <p className="text-lg text-stone-200">{hook}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
