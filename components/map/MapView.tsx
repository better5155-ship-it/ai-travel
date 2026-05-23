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

  // 🔥 1차 flatten (변환 최소화)
  const rawPlaces =
    Array.isArray(plan?.days)
      ? plan.days.flatMap((d: any) =>
          Array.isArray(d?.places) ? d.places : []
        )
      : []

  // 🔥 2차: "검증만" 수행 (변환 금지)
  const validPlaces = rawPlaces.filter((p: any) => {

    const lat = p?.lat
    const lng = p?.lng

    const isValid =
      lat !== null &&
      lat !== undefined &&
      lng !== null &&
      lng !== undefined &&
      !isNaN(Number(lat)) &&
      !isNaN(Number(lng))

    if (!isValid) {
      console.warn("❌ INVALID PLACE FILTERED:", p)
    }

    return isValid
  })

  console.log("✅ VALID PLACES:", validPlaces)

  const colorByDay = (day: number) =>
    DAY_COLORS[(day - 1) % DAY_COLORS.length]

  if (validPlaces.length === 0) {
    return (
      <div className="h-[500px] bg-red-500/10 flex items-center justify-center">
        No valid map data
      </div>
    )
  }

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