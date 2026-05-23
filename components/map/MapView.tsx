'use client'

import KakaoMap from './KakaoMap'
import GoogleMap from './GoogleMap'

export default function MapView({ plan }: any) {

  if (!plan) return null

  const places =
    plan?.days?.flatMap((d: any) => d.places) || []

  if (plan.region === "global") {
    return <GoogleMap places={places} />
  }

  return <KakaoMap places={places} />
}