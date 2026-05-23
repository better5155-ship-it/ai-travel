'use client'

import { useEffect, useState } from 'react'
import KakaoMapView from './KakaoMapView'
import GoogleMapView from './GoogleMapView'

export default function MapView({ plan }: any) {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!plan) return null

  const region = plan?.region || "korea"

  const rawPlaces =
    Array.isArray(plan?.days)
      ? plan.days.flatMap((d: any) =>
          Array.isArray(d?.places) ? d.places : []
        )
      : []

  const safePlaces = rawPlaces.filter((p: any) =>
    p?.lat != null &&
    p?.lng != null &&
    !isNaN(Number(p.lat)) &&
    !isNaN(Number(p.lng))
  )

  if (safePlaces.length === 0) {
    return (
      <div className="h-[500px] bg-red-500/20 flex items-center justify-center">
        No valid map data
      </div>
    )
  }

  if (region === "global") {
    return <GoogleMapView places={safePlaces} />
  }

  return <KakaoMapView places={safePlaces} />
}