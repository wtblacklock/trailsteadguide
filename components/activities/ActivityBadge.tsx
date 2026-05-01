type Tone = 'age' | 'time' | 'energy' | 'group' | 'setup' | 'category'

interface Props {
  label: string
  tone?: Tone
}

const toneClasses: Record<Tone, string> = {
  age: 'bg-stone-100 text-stone-700 ring-stone-200',
  time: 'bg-stone-100 text-stone-700 ring-stone-200',
  energy: 'bg-[#eef0e6] text-[#2d5016] ring-[#d6dcc4]',
  group: 'bg-[#f1ebe2] text-[#5c3d1e] ring-[#e2d5be]',
  setup: 'bg-stone-100 text-stone-700 ring-stone-200',
  category: 'bg-[#f1ebe2] text-[#5c3d1e] ring-[#e2d5be]',
}

export default function ActivityBadge({ label, tone = 'age' }: Props) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${toneClasses[tone]}`}
    >
      {label}
    </span>
  )
}
