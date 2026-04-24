interface QuizProgressProps {
  currentIndex: number
  total: number
}

export default function QuizProgress({ currentIndex, total }: QuizProgressProps) {
  const stepNumber = currentIndex + 1
  const progressPercent = (stepNumber / total) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-stone-500">
          Step {stepNumber} of {total}
        </span>
      </div>
      <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-brand-green h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}
