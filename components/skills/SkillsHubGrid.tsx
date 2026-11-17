'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { SKILLS } from '@/lib/skills/data'
import { filterSkills, hasAnySkillFilter, parseSkillFilters } from '@/lib/skills/filters'
import SkillsHubGridView from './SkillsHubGridView'

export default function SkillsHubGrid() {
  const searchParams = useSearchParams()

  const { skills, isFiltered } = useMemo(() => {
    const filters = parseSkillFilters({
      category: searchParams.get('category') ?? undefined,
      difficulty: searchParams.get('difficulty') ?? undefined,
      safety: searchParams.get('safety') ?? undefined,
    })
    return {
      skills: filterSkills(SKILLS, filters),
      isFiltered: hasAnySkillFilter(filters),
    }
  }, [searchParams])

  return <SkillsHubGridView skills={skills} isFiltered={isFiltered} />
}
