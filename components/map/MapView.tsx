'use client'

import KakaoMapView from "./KakaoMapView"
import GoogleMapView from "./GoogleMapView"

export default function MapView({ plan }: any) {

  if (!plan) return null

  const region = plan?.region || "korea"

  const places =
    plan?.days?.flatMap((d: any) =>
      d?.places?.map((p: any) => ({
        ...p,
        day: d.day,
      }))
    ) || []

  const validPlaces = places.filter(
    (p: any) =>
      Number.isFinite(p.lat) &&
      Number.isFinite(p.lng)
  )

  return (
    <div style={{ width: "100%", height: "500px" }}>

      {region === "korea" ? (
        <KakaoMapView places={validPlaces} />
      ) : (
        <GoogleMapView places={validPlaces} />
      )}

    </div>
  )
}