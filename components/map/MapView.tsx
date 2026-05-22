'use client'

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    kakao: any
  }
}

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const kakao = window.kakao

    if (!kakao || !mapRef.current) return

    kakao.maps.load(() => {
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 4,
      }

      const map = new kakao.maps.Map(mapRef.current, options)

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.5665, 126.9780),
      })

      marker.setMap(map)
    })
  }, [])

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    />
  )
}