'use client'
console.log("KAKAO:", (window as any).kakao)
console.log("GOOGLE:", (window as any).google)
import { useEffect, useState } from 'react'
import KakaoMapView from './KakaoMapView'
import GoogleMapView from './GoogleMapView'

export default function MapView({ plan }: any) {

  const [ready, setReady] = useState(false)

  useEffect(() => {
    // 🔥 SDK 로딩 대기
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
      ? plan.days.flatMap((d: any) => d?.places || [])
      : []

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