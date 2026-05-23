'use client'

import KakaoMap from './KakaoMap'
import GoogleMap from './GoogleMap'

export default function MapView({ plan }: any) {

  if (!plan) {
    return (
      <div className="h-[500px] bg-white/5 rounded-xl flex items-center justify-center">
        No map data
      </div>
    )
  }

  const places =
    plan?.days?.flatMap((d: any) => d.places) || []

  if (plan.region === "global") {
    return <GoogleMap places={places} />
  }

  return <KakaoMap places={places} />
}