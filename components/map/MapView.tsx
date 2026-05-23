'use client'

import { useEffect, useState } from 'react'
import KakaoMapView from './KakaoMapView'
import GoogleMapView from './GoogleMapView'

const DAY_COLORS = [
  "#4F46E5",
  "#16A34A",
  "#EA580C",
  "#DB2777",
  "#0EA5E9",
  "#FACC15",
  "#8B5CF6",
]

export default function MapView({ plan }: any) {

  console.log("🔥 PLAN:", plan)

  const [ready, setReady] = useState(false)

  useEffect(() => {

    const check = () => {

      const kakaoReady = typeof window !== "undefined" && (window as any).kakao
      const googleReady = typeof window !== "undefined" && (window as any).google

      if (kakaoReady || googleReady) {
        setReady(true)
      } else {
        setTimeout(check, 300)
      }
    }

    check()
  }, [])

  if (!plan) return null
  if (!ready) return <div className="h-[500px] bg-black/20 rounded-xl" />

  const region = plan?.region || "korea"

  const places =
    Array.isArray(plan?.days)
      ? plan.days.flatMap((d: any) =>
          (d?.places || []).map((p: any) => ({
            ...p,
            day: d.day
          }))
        )
      : []

  const validPlaces = places.filter((p: any) =>
    p?.lat != null &&
    p?.lng != null &&
    !isNaN(Number(p.lat)) &&
    !isNaN(Number(p.lng))
  )

  const colorByDay = (day: number) =>
    DAY_COLORS[(day - 1) % DAY_COLORS.length]

  if (region === 'global') {
    return (
      <GoogleMapView
        places={validPlaces}
        colorByDay={colorByDay}
      />
    )
  }

  return (
    <KakaoMapView
      places={validPlaces}
      colorByDay={colorByDay}
    />
  )
}