'use client'

import { useEffect, useState } from 'react'
import KakaoMapView from './KakaoMapView'
import GoogleMapView from './GoogleMapView'

export default function MapView({ plan }: any) {

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

  // 🔥 flatten
  const places =
    Array.isArray(plan?.days)
      ? plan.days.flatMap((d: any) =>
          (d?.places || []).map((p: any) => ({
            ...p,
            day: d.day
          }))
        )
      : []

  // 🔥 안전 필터 (핵심)
  const validPlaces = places.filter((p: any) =>
    p?.lat != null &&
    p?.lng != null &&
    !isNaN(Number(p.lat)) &&
    !isNaN(Number(p.lng))
  )

  if (validPlaces.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-red-500/10">
        No valid map data
      </div>
    )
  }

  if (region === 'global') {
    return <GoogleMapView places={validPlaces} />
  }

  return <KakaoMapView places={validPlaces} />
}