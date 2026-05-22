'use client'

import { useEffect } from "react"

export default function MapView() {
  useEffect(() => {
    const kakao = (window as any).kakao

    if (!kakao || !kakao.maps) return

    kakao.maps.load(() => {
      const container = document.getElementById("map")

      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 5,
      }

      const map = new kakao.maps.Map(container, options)

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.5665, 126.9780),
      })

      marker.setMap(map)
    })
  }, [])

  return (
    <div
      id="map"
      style={{ width: "100%", height: "400px", borderRadius: "12px" }}
    />
  )
}