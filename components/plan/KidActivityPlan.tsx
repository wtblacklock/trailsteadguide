interface Props {
  activities: string[]
  kidsAgeGroup?: string
}

export default function KidActivityPlan({ activities, kidsAgeGroup }: Props) {
  if (activities.length === 0) return null
  return (
    <section className="py-12 max-w-content mx-auto px-6">
      <h2 className="text-2xl font-serif font-medium text-stone-900 mb-2">Kid Activity Plan</h2>
      {kidsAgeGroup && kidsAgeGroup !== 'none' && (
        <p className="text-stone-500 text-sm mb-6">Tuned for kids aged {kidsAgeGroup}</p>
      )}
      <ul className="space-y-3">
        {activities.map((activity, i) => (
          <li key={i} className="flex gap-3 text-stone-700">
            <span className="flex-shrink-0 font-serif text-2xl text-stone-300 leading-none">{i + 1}.</span>
            <span className="pt-1">{activity}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
