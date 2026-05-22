'use client'

import KakaoMapView from './KakaoMapView'
import GoogleMapView from './GoogleMapView'

export default function MapView({ plan }: any) {

  if (!plan) return null

  const region = plan?.region || "korea"

  const days = Array.isArray(plan?.days) ? plan.days : []

  const places = days.flatMap((d: any) => d?.places || [])

  const validPlaces = places.filter((p: any) =>
    p?.lat != null &&
    p?.lng != null &&
    !isNaN(Number(p.lat)) &&
    !isNaN(Number(p.lng))
  )

  if (region === 'global') {
    return <GoogleMapView places={validPlaces} />
  }

  return <KakaoMapView places={validPlaces} />
}