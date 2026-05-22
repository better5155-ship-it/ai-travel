'use client'

import KakaoMapView from './KakaoMapView'
import GoogleMapView from './GoogleMapView'

export default function MapView({ plan }: any) {

  const region = plan?.region

  const places =
    plan?.days?.flatMap((d: any) => d.places) || []

  if (region === 'global') {
    return <GoogleMapView places={places} />
  }

  return <KakaoMapView places={places} />
}

console.log("PLAN DATA:", plan)
console.log("FLAT PLACES:", places?.days?.flatMap?.(d => d.places))