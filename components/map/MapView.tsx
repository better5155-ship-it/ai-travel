'use client'

import KakaoMapView from "./KakaoMapView"
import GoogleMapView from "./GoogleMapView"

export default function MapView({ plan }: any) {

  const allPlaces =
    plan.days.flatMap(
      (day: any) =>

        day.places.map((p: any) => ({
          ...p,
          day: day.day,
        }))
    )

  const allRoutes =
    plan.days.flatMap(
      (day: any) =>
        day.routes || []
    )

  return (

    <div
      style={{
        width: "100%",
        height: "600px",
      }}
    >

      {plan.region === "korea" ? (

        <KakaoMapView
          places={allPlaces}
        />

      ) : (

        <GoogleMapView
          places={allPlaces}
          routes={allRoutes}
        />

      )}

    </div>
  )
}