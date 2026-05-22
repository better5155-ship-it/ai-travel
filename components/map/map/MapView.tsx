'use client'

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    kakao: any
  }
}

export default function MapView({ places = [] }: any) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const kakao = window.kakao

    if (!kakao || !mapRef.current) return

    kakao.maps.load(() => {

      const center = new kakao.maps.LatLng(
        37.5665,
        126.9780
      )

      const map = new kakao.maps.Map(mapRef.current, {
        center,
        level: 5,
      })

      places.forEach((place: any) => {

        const markerPosition = new kakao.maps.LatLng(
          Number(place.y),
          Number(place.x)
        )

        const marker = new kakao.maps.Marker({
          position: markerPosition,
        })

        marker.setMap(map)
      })
    })
  }, [places])

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "450px",
        borderRadius: "16px",
      }}
    />
  )
}