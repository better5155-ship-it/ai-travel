export type Place = {
  name: string
  lat: number
  lng: number
  description?: string
}

export type DayPlan = {
  day: number
  places: Place[]
}

export type TravelPlan = {
  destination: string
  days: DayPlan[]
}