import ChecklistShell from '@/components/checklist/ChecklistShell'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Build Your Camping Checklist',
  description:
    'Three quick questions and get a packing checklist scaled to your family size, kid ages, and trip length. Printable, categorized, no fluff.',
  path: '/checklist',
})

export default function ChecklistPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <ChecklistShell />
    </main>
  )
}
