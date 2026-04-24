import type { QuizQuestion as QuizQuestionType } from '@/types'

interface QuizQuestionProps {
  question: QuizQuestionType
  onAnswer: (value: string) => void
}

export default function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-3xl text-stone-900 mb-2">{question.prompt}</h2>
        {question.subprompt && (
          <p className="text-stone-500">{question.subprompt}</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left py-4 px-6 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 transition-colors duration-150 text-stone-800"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
