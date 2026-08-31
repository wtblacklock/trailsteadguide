import ConstellationWheel from '@/components/printables/ConstellationWheel'
import CookingConversionCard from '@/components/printables/CookingConversionCard'
import BackyardTestChecklist from '@/components/printables/BackyardTestChecklist'
import FireStartingChecklist from '@/components/printables/FireStartingChecklist'
import KnotReferenceCard from '@/components/printables/KnotReferenceCard'
import AnimalTrackIdCard from '@/components/printables/AnimalTrackIdCard'
import NatureScavengerHuntCard from '@/components/printables/NatureScavengerHuntCard'
import NightSkyBingoCard from '@/components/printables/NightSkyBingoCard'
import ShadowPuppetHandGuide from '@/components/printables/ShadowPuppetHandGuide'
import KidsCampingPackingList from '@/components/printables/KidsCampingPackingList'
import WeatherSignsCard from '@/components/printables/WeatherSignsCard'
import BearBagFoodStorageCard from '@/components/printables/BearBagFoodStorageCard'
import CampFirstAidQuickReference from '@/components/printables/CampFirstAidQuickReference'
import LeaveNoTraceQuickReference from '@/components/printables/LeaveNoTraceQuickReference'
import CampMealPlanner from '@/components/printables/CampMealPlanner'

// Slug → artwork component. Each component renders its full-page print
// content; the print page wraps it with the shared header / footer chrome
// and the @media print rules that hide the site nav and footer.
export const ARTWORK_RENDERERS: Record<string, React.ComponentType> = {
  'northern-hemisphere-constellation-wheel': ConstellationWheel,
  'camp-cooking-conversion-card': CookingConversionCard,
  'backyard-test-checklist': BackyardTestChecklist,
  'fire-starting-checklist': FireStartingChecklist,
  'knot-reference-card': KnotReferenceCard,
  'animal-track-id-card': AnimalTrackIdCard,
  'nature-scavenger-hunt-card': NatureScavengerHuntCard,
  'night-sky-bingo': NightSkyBingoCard,
  'shadow-puppet-hand-guide': ShadowPuppetHandGuide,
  'kids-camping-packing-list': KidsCampingPackingList,
  'weather-signs-field-card': WeatherSignsCard,
  'bear-bag-food-storage-card': BearBagFoodStorageCard,
  'camp-first-aid-quick-reference': CampFirstAidQuickReference,
  'leave-no-trace-quick-reference': LeaveNoTraceQuickReference,
  '3-day-camp-meal-planner': CampMealPlanner,
}
