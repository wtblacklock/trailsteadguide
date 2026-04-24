import type { Metadata } from 'next'
import ChecklistShell from '@/components/checklist/ChecklistShell'

export const metadata: Metadata = {
  title: 'Build Your Camping Checklist | Trailstead Guide',
  description: 'Three quick questions and get a packing checklist scaled to your family.',
}

export default function ChecklistPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <ChecklistShell />
    </main>
  )
}
