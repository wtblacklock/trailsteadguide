import type { Difficulty } from '@/lib/skills/types'

interface Props {
  difficulty: Difficulty
}

const TONE: Record<Difficulty, string> = {
  Beginner: 'bg-[#eef0e6] text-[#2d5016] ring-[#d6dcc4]',
  Intermediate: 'bg-[#f1ebe2] text-[#5c3d1e] ring-[#e2d5be]',
}

export default function DifficultyBadge({ difficulty }: Props) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${TONE[difficulty]}`}
    >
      {difficulty}
    </span>
  )
}
