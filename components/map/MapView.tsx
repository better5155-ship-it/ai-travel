'use client'

import KakaoMapView from './KakaoMapView'
import GoogleMapView from './GoogleMapView'

export default function MapView({ plan }: any) {

  console.log("🔥 PLAN:", plan)

  const region = plan?.region ?? "korea"

  // 🔥 1차 방어: days 구조 확인
  const days = Array.isArray(plan?.days) ? plan.days : []

  console.log("🔥 DAYS:", days)

  // 🔥 2차: places flatten
  const places = days.flatMap((d: any) => {
    console.log("🔥 DAY:", d)
    return Array.isArray(d?.places) ? d.places : []
  })

  console.log("🔥 FLATTEN PLACES:", places)

  // 🔥 3차: 좌표 검증
  const validPlaces = places.filter((p: any) => {
    const ok =
      p?.lat != null &&
      p?.lng != null &&
      !isNaN(Number(p.lat)) &&
      !isNaN(Number(p.lng))

    if (!ok) {
      console.log("❌ INVALID PLACE:", p)
    }

    return ok
  })

  console.log("🔥 VALID PLACES:", validPlaces)

  // 🚨 핵심 체크: 데이터가 아예 없는 경우
  if (validPlaces.length === 0) {
    console.warn("🚨 NO VALID PLACES - check AI response structure")
  }

  if (region === 'global') {
    return <GoogleMapView places={validPlaces} />
  }

  return <KakaoMapView places={validPlaces} />
}