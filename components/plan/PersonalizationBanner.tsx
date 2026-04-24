'use client'
import { useEffect, useState } from 'react'
import { readSession } from '@/lib/session'
import { SessionSnapshot } from '@/types'

export default function PersonalizationBanner() {
  const [session, setSession] = useState<SessionSnapshot | null>(null)

  useEffect(() => {
    setSession(readSession())
  }, [])

  if (!session) return null

  const kidsText = session.kidsAgeGroup === 'none'
    ? 'no kids'
    : `kids aged ${session.kidsAgeGroup}`

  const experienceText = {
    none: 'brand new to camping',
    some: 'some camping experience',
    confident: 'confident campers',
  }[session.experience]

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg px-6 py-4 text-sm text-green-900">
      Personalized for {experienceText} with {kidsText}.
    </div>
  )
}
