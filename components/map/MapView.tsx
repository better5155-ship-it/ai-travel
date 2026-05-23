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

  // 🔥 1차 flatten + 안전 변환 (핵심 수정)
  const places =
    Array.isArray(plan?.days)
      ? plan.days.flatMap((d: any) =>
          (d?.places || []).map((p: any) => ({
            name: p?.name || "",
            description: p?.description || "",
            day: d?.day,

            // 🔥 핵심: 무조건 숫자 변환
            lat: Number(String(p?.lat).trim()),
            lng: Number(String(p?.lng).trim()),
          }))
        )
      : []

  // 🔥 2차 validation (Google crash 방지 핵심)
  const validPlaces = places.filter((p: any) => {

    const isValid =
      Number.isFinite(p.lat) &&
      Number.isFinite(p.lng) &&
      Math.abs(p.lat) > 0 &&
      Math.abs(p.lng) > 0

    if (!isValid) {
      console.warn("❌ INVALID PLACE FILTERED:", p)
    }

    return isValid
  })

  console.log("✅ VALID PLACES:", validPlaces)

  const colorByDay = (day: number) =>
    DAY_COLORS[(day - 1) % DAY_COLORS.length]

  // 🔥 안전 fallback
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