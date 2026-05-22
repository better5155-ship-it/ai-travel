export interface Place {
  name: string
  address: string
  lat: number
  lng: number
  description?: string
}

export interface DayPlan {
  day: number
  places: Place[]
}

export interface TravelPlan {
  destination: string
  days: DayPlan[]
  places: Place[]
}