'use client'

import { useEffect, useRef } from 'react'

export default function KakaoMapView({ places, colorByDay }: any) {

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const kakao = (window as any)?.kakao
    if (!mapRef.current || !kakao?.maps) return

    // 🔥 핵심 안전 필터 (Google과 동일 수준으로 맞춤)
    const validPlaces = (places || [])
      .map((p: any) => ({
        ...p,
        lat: Number(String(p?.lat).trim()),
        lng: Number(String(p?.lng).trim()),
      }))
      .filter((p: any) =>
        Number.isFinite(p.lat) &&
        Number.isFinite(p.lng)
      )

    if (validPlaces.length === 0) {
      console.warn("🚨 KakaoMapView: no valid places")
      return
    }

    const center = new kakao.maps.LatLng(
      validPlaces[0].lat,
      validPlaces[0].lng
    )

    const map = new kakao.maps.Map(mapRef.current, {
      center,
      level: 5
    })

    const bounds = new kakao.maps.LatLngBounds()

    let prev: any = null

    validPlaces.forEach((p: any) => {

      const pos = new kakao.maps.LatLng(p.lat, p.lng)

      new kakao.maps.Marker({
        map,
        position: pos,
        title: p.name,
      })

      bounds.extend(pos)

      if (prev) {
        new kakao.maps.Polyline({
          map,
          path: [prev, pos],
          strokeWeight: 3,
          strokeColor: colorByDay?.(p.day) || "#4F46E5",
          strokeOpacity: 0.8
        })
      }

      prev = pos
    })

    map.setBounds(bounds)

  }, [places, colorByDay])

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-2xl"
    />
  )
}