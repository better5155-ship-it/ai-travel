'use client'

import { useEffect, useState } from 'react'
import KakaoMapView from './KakaoMapView'
import GoogleMapView from './GoogleMapView'

export default function MapView({ plan }: any) {

  console.log("🔥 PLAN RECEIVED:", plan)

  const [ready, setReady] = useState(false)

  useEffect(() => {
    const check = () => {

      const kakaoReady = typeof window !== "undefined" && (window as any).kakao
      const googleReady = typeof window !== "undefined" && (window as any).google

      console.log("🔥 KAKAO READY:", kakaoReady)
      console.log("🔥 GOOGLE READY:", googleReady)

      if (kakaoReady || googleReady) {
        console.log("🔥 MAP SDK READY")
        setReady(true)
      } else {
        setTimeout(check, 300)
      }
    }

    check()
  }, [])

  if (!plan) {
    console.warn("🚨 PLAN IS NULL")
    return null
  }

  if (!ready) {
    console.log("⏳ WAITING FOR MAP SDK")
    return <div className="h-[500px] bg-black/20 rounded-xl" />
  }

  const region = plan?.region || "korea"

  console.log("🔥 REGION:", region)
  console.log("🔥 PLAN DAYS:", plan?.days)

  const places =
    Array.isArray(plan?.days)
      ? plan.days.flatMap((d: any) => {
          console.log("🔥 DAY:", d)
          return d?.places || []
        })
      : []

  console.log("🔥 FLATTEN PLACES:", places)

  const validPlaces = places.filter((p: any) => {
    const ok =
      p?.lat != null &&
      p?.lng != null &&
      !isNaN(Number(p.lat)) &&
      !isNaN(Number(p.lng))

    if (!ok) {
      console.warn("❌ INVALID PLACE:", p)
    }

    return ok
  })

  console.log("🔥 VALID PLACES:", validPlaces)

  if (region === 'global') {
    console.log("🌍 USING GOOGLE MAP")
    return <GoogleMapView places={validPlaces} />
  }

  console.log("🇰🇷 USING KAKAO MAP")
  return <KakaoMapView places={validPlaces} />
}