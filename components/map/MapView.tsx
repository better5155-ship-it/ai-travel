'use client'

import KakaoMapView from './KakaoMapView'
import GoogleMapView from './GoogleMapView'

export default function MapView({ plan }: any) {

  console.log("PLAN:", plan)

  const region = plan?.region ?? "korea"

  const places =
    Array.isArray(plan?.days)
      ? plan.days.flatMap((d: any) => d?.places || [])
      : []

  console.log("FLATTEN PLACES:", places)

  // 🔥 핵심 방어: 좌표 없는 데이터 제거
  const validPlaces = places.filter((p: any) =>
    p?.lat != null &&
    p?.lng != null &&
    !isNaN(Number(p.lat)) &&
    !isNaN(Number(p.lng))
  )

  console.log("VALID PLACES:", validPlaces)

  if (region === 'global') {
    return <GoogleMapView places={validPlaces} />
  }

  return <KakaoMapView places={validPlaces} />
}