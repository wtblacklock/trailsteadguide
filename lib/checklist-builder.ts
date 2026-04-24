import type { KidsAgeGroup } from '@/types'

export type ChecklistItem = {
  id: string
  name: string
  qty?: string
  note?: string
}

export type ChecklistCategory = {
  heading: string
  items: ChecklistItem[]
}

export type ChecklistInput = {
  adults: number
  kids: number
  /** 1, 2, or 3+ (3 means 3 or more). */
  nights: number
  ages: KidsAgeGroup[]
}

const xN = (n: number) => (n > 1 ? `×${n}` : undefined)

/**
 * Build a packing checklist scaled to party size, trip length, and kid ages.
 * Pure function — same input always produces same output, so a URL with the
 * right query params is a shareable, printable checklist.
 */
export function buildChecklist({ adults, kids, nights, ages }: ChecklistInput): ChecklistCategory[] {
  const party = adults + kids
  const hasKids = kids > 0
  const categories: ChecklistCategory[] = []

  // Shelter
  categories.push({
    heading: 'Shelter',
    items: [
      { id: 'tent', name: 'Tent', note: `Rated for ${party + 1}+ people (capacity marketing is always optimistic)` },
      { id: 'footprint', name: 'Tent footprint or ground tarp' },
      { id: 'stakes', name: 'Extra tent stakes + mallet' },
      { id: 'sleeping-bags', name: 'Sleeping bags', qty: xN(party) },
      { id: 'pads', name: 'Sleeping pads', qty: xN(party) },
      { id: 'pillows', name: 'Pillows', qty: xN(party) },
      { id: 'broom', name: 'Small broom or whisk (keeps dirt out of the tent)' },
    ],
  })

  // Kitchen
  const propaneCanisters = nights <= 1 ? 1 : nights <= 2 ? 2 : 3
  const waterGallons = Math.max(2, Math.ceil(party * nights * 0.75))
  const iceBlocks = nights <= 1 ? 1 : nights <= 2 ? 2 : 3

  categories.push({
    heading: 'Kitchen',
    items: [
      { id: 'stove', name: '2-burner camp stove' },
      { id: 'propane', name: 'Propane canister', qty: `×${propaneCanisters}` },
      { id: 'matches', name: 'Matches or lighter (in a dry bag)' },
      { id: 'cooler', name: 'Cooler' },
      { id: 'ice', name: 'Block ice', qty: `×${iceBlocks}` },
      { id: 'pots', name: 'Nesting pot set (pot, pan, lid)' },
      { id: 'utensils-cook', name: 'Spatula, wooden spoon, tongs' },
      { id: 'knife', name: 'Sharp knife + small cutting board' },
      { id: 'plates', name: 'Plates, bowls, mugs', qty: xN(party) },
      { id: 'cutlery', name: 'Forks, knives, spoons', qty: xN(party) },
      { id: 'dishtub', name: 'Dish tub, sponge, biodegradable soap, dish towel' },
      { id: 'water', name: 'Reusable water jugs', qty: `${waterGallons} gal total` },
      { id: 'trash', name: 'Trash bags, ziplocs, foil' },
    ],
  })

  // Clothing (per person scales × party)
  const shirts = Math.max(2, nights + 1)
  const pants = nights === 1 ? 2 : Math.min(3, nights + 1)
  const socks = Math.max(3, nights + 2)

  categories.push({
    heading: `Clothing — per person (×${party})`,
    items: [
      { id: 'warm-layer', name: 'Warm layer (fleece or puffy)' },
      { id: 'rain', name: 'Rain jacket' },
      { id: 'shirts', name: 'Shirts', qty: `×${shirts}` },
      { id: 'pants', name: 'Pants (one hiking, one cozy)', qty: `×${pants}` },
      { id: 'socks', name: 'Socks', qty: `×${socks} pairs` },
      { id: 'underwear', name: 'Underwear', qty: `×${socks}` },
      { id: 'hat', name: 'Hat with a brim' },
      { id: 'beanie', name: 'Beanie for night' },
      { id: 'shoes', name: 'Close-toed shoes + camp sandals' },
    ],
  })

  // Lighting & power
  categories.push({
    heading: 'Lighting & power',
    items: [
      { id: 'headlamps', name: 'Headlamps + spare batteries', qty: `×${party}` },
      { id: 'lantern', name: 'Lantern for the picnic table' },
      { id: 'charger', name: 'Portable phone charger (10,000+ mAh)' },
    ],
  })

  // Safety & misc
  categories.push({
    heading: 'Safety & misc',
    items: [
      { id: 'first-aid', name: 'First aid kit' },
      { id: 'multi-tool', name: 'Multi-tool' },
      { id: 'bug-sun', name: 'Bug spray, sunscreen, lip balm' },
      { id: 'tp', name: 'Toilet paper in a ziplock (campground TP is unreliable)' },
      { id: 'toiletries', name: 'Toiletries bag' },
      { id: 'towels', name: 'Towels', qty: xN(party) },
      { id: 'chairs', name: 'Camp chairs', qty: `×${party}` },
      { id: 'directions', name: 'Printed directions + campsite confirmation' },
    ],
  })

  // Kids — only if kids > 0
  if (hasKids) {
    const kidItems: ChecklistItem[] = [
      { id: 'comfort', name: 'Comfort item (stuffed animal, blanket)', qty: `×${kids}` },
      { id: 'glow', name: 'Glow stick for the tent', qty: `×${kids}` },
      { id: 'whistle', name: 'Whistle', qty: `×${kids}` },
      { id: 'outfits', name: 'Extra outfit changes', qty: `×${kids * 2}` },
    ]
    if (ages.includes('3-6')) {
      kidItems.push({ id: 'wipes', name: 'Wet wipes (lots)' })
      kidItems.push({ id: 'activity-young', name: 'Coloring books, crayons, simple puzzles' })
    }
    if (ages.includes('7-12')) {
      kidItems.push({ id: 'activity-mid', name: 'Magnifier, nature notebook, playing cards' })
    }
    if (ages.includes('teens')) {
      kidItems.push({ id: 'activity-teen', name: 'Book or e-reader, headphones, journal' })
    }
    categories.push({ heading: `For kids (${kids})`, items: kidItems })
  }

  return categories
}
