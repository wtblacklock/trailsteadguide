'use client'

import { useState } from 'react'
import type { QuizQuestion as QuizQuestionType, PartySize } from '@/types'

interface QuizQuestionProps {
  question: QuizQuestionType
  onAnswer: (value: string | string[] | PartySize) => void
  initialValue?: string | string[] | PartySize
}

export default function QuizQuestion({ question, onAnswer, initialValue }: QuizQuestionProps) {
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(initialValue) ? initialValue : [],
  )

  // Party-size stepper
  if (question.kind === 'party-size') {
    return (
      <PartySizeQuestion
        question={question}
        onAnswer={onAnswer}
        initialValue={
          initialValue && typeof initialValue === 'object' && !Array.isArray(initialValue)
            ? (initialValue as PartySize)
            : undefined
        }
      />
    )
  }

  if (!question.multiSelect) {
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
              className="w-full text-left py-4 px-6 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-colors duration-150 text-stone-800"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Multi-select: toggle selection, "none" is mutually exclusive with age ranges
  const toggle = (value: string) => {
    if (value === 'none') {
      setSelected(['none'])
      return
    }
    setSelected((prev) => {
      const withoutNone = prev.filter((v) => v !== 'none')
      return withoutNone.includes(value)
        ? withoutNone.filter((v) => v !== value)
        : [...withoutNone, value]
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-3xl text-stone-900 mb-2">{question.prompt}</h2>
        {question.subprompt && (
          <p className="text-stone-500">{question.subprompt}</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <button
              key={option.value}
              onClick={() => toggle(option.value)}
              aria-pressed={isSelected}
              className={`w-full text-left py-4 px-6 rounded-xl border transition-colors duration-150 flex items-center justify-between ${
                isSelected
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
              }`}
            >
              <span>{option.label}</span>
              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          )
        })}
      </div>

      {selected.length > 0 && (
        <button
          onClick={() => onAnswer(selected)}
          className="mt-6 w-full py-4 px-6 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors duration-150"
        >
          Continue
        </button>
      )}
    </div>
  )
}

function PartySizeQuestion({
  question,
  onAnswer,
  initialValue,
}: {
  question: QuizQuestionType
  onAnswer: (value: PartySize) => void
  initialValue?: PartySize
}) {
  const [adults, setAdults] = useState(initialValue?.adults ?? 2)
  const [kids, setKids] = useState(initialValue?.kids ?? 2)

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-3xl text-stone-900 mb-2">{question.prompt}</h2>
        {question.subprompt && <p className="text-stone-500">{question.subprompt}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <Stepper label="Adults" value={adults} min={1} max={10} onChange={setAdults} />
        <Stepper label="Kids" value={kids} min={0} max={10} onChange={setKids} />
      </div>
      <button
        onClick={() => onAnswer({ adults, kids })}
        className="mt-8 w-full py-4 px-6 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors duration-150"
      >
        Continue
      </button>
    </div>
  )
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (n: number) => void
}) {
  return (
    <div className="flex items-center justify-between py-4 px-6 rounded-xl border border-stone-200 bg-white">
      <span className="text-stone-800 text-lg">{label}</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-10 h-10 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-lg leading-none"
        >
          −
        </button>
        <span className="w-8 text-center font-serif text-2xl tabular-nums text-stone-900">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-10 h-10 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-lg leading-none"
        >
          +
        </button>
      </div>
    </div>
  )
}
