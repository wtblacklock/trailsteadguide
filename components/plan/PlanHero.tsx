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
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-wide mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-lg text-stone-200">{hook}</p>
        </div>
      </div>
      <div className="max-w-content mx-auto px-6 pt-6">
        <PersonalizationBanner />
      </div>
    </section>
  )
}
