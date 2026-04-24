'use client'

import { useEffect, useState } from 'react'

type Step = {
  label: string
  duration: number // ms to "work" on this step before checking it off
}

const STEPS: Step[] = [
  { label: 'Reading your answers', duration: 500 },
  { label: 'Matching you to a plan template', duration: 650 },
  { label: 'Scaling meals to your family size', duration: 700 },
  { label: 'Building your shopping list', duration: 600 },
  { label: 'Picking kid-age activities', duration: 650 },
  { label: 'Finalizing your plan', duration: 550 },
]

const TOTAL_MS = STEPS.reduce((acc, s) => acc + s.duration, 0)

export default function GeneratingPlan({ onComplete }: { onComplete: () => void }) {
  const [activeStep, setActiveStep] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    let accumulated = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    STEPS.forEach((step, i) => {
      // Mark step as in-progress at its start
      timers.push(
        setTimeout(() => {
          if (!cancelled) setActiveStep(i)
        }, accumulated),
      )
      accumulated += step.duration
      // Mark step as done at its end
      timers.push(
        setTimeout(() => {
          if (!cancelled) setCompletedCount(i + 1)
        }, accumulated),
      )
    })

    // Fire onComplete a hair after the last step finishes
    timers.push(
      setTimeout(() => {
        if (!cancelled) onComplete()
      }, accumulated + 300),
    )

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [onComplete])

  const progress = Math.min(1, completedCount / STEPS.length)

  return (
    <div className="max-w-xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
          Building your plan
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-stone-950 tracking-tight leading-tight">
          Stitching your weekend together.
        </h1>
        <p className="mt-5 text-stone-600 leading-relaxed">
          This takes about {Math.ceil(TOTAL_MS / 1000)} seconds. We&apos;re tuning the plan to your answers.
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-stone-200 overflow-hidden mb-10">
        <div
          className="h-full bg-stone-900 transition-[width] duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Step list */}
      <ul className="space-y-3">
        {STEPS.map((step, i) => {
          const isDone = i < completedCount
          const isActive = i === activeStep && !isDone
          return (
            <li
              key={step.label}
              className={`flex items-center gap-4 rounded-xl px-5 py-4 ring-1 transition-colors ${
                isDone
                  ? 'ring-stone-200 bg-white'
                  : isActive
                    ? 'ring-stone-300 bg-white'
                    : 'ring-transparent bg-transparent'
              }`}
            >
              <StepIcon isDone={isDone} isActive={isActive} />
              <span
                className={`text-base transition-colors ${
                  isDone ? 'text-stone-900' : isActive ? 'text-stone-900' : 'text-stone-400'
                }`}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function StepIcon({ isDone, isActive }: { isDone: boolean; isActive: boolean }) {
  if (isDone) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-stone-900 text-white shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    )
  }
  if (isActive) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full ring-2 ring-stone-900 shrink-0">
        <span className="w-3 h-3 rounded-full bg-stone-900 animate-pulse" />
      </span>
    )
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full ring-1 ring-stone-300 shrink-0" />
  )
}
