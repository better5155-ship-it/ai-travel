'use client'

import { useEffect } from "react"

export default function MapView() {
  useEffect(() => {
    const container = document.getElementById("map")

    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울
      level: 5,
    }

    const map = new window.kakao.maps.Map(container, options)

    // marker
    const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780)

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    })

    marker.setMap(map)
  }, [])

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
      }}
    />
  )
}