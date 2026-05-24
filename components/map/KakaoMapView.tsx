'use client'

import { useEffect, useRef } from 'react'

export default function KakaoMapView({ places = [] }: any) {

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const kakao = (window as any)?.kakao

    if (!kakao || !mapRef.current) return

    // 🔥 load 제거
    const center = places.length
      ? new kakao.maps.LatLng(places[0].lat, places[0].lng)
      : new kakao.maps.LatLng(37.5665, 126.9780)

    const map = new kakao.maps.Map(mapRef.current, {
      center,
      level: 5,
    })

    places.forEach((p: any) => {

      new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(p.lat, p.lng),
      })

    })

  }, [places])

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "500px",
        background: "red",
      }}
    />
  )
}