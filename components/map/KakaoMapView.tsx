'use client'

import { useEffect, useRef } from 'react'

export default function KakaoMapView({ places }: any) {

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const kakao = (window as any)?.kakao
    if (!mapRef.current || !kakao) return

    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(
        Number(places?.[0]?.lat || 37.5665),
        Number(places?.[0]?.lng || 126.9780)
      ),
      level: 5
    })

    const bounds = new kakao.maps.LatLngBounds()

    let prev: any = null

    places.forEach((p: any) => {

      // 🔥 안전 변환 (핵심)
      const lat = Number(p?.lat)
      const lng = Number(p?.lng)

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return

      const pos = new kakao.maps.LatLng(lat, lng)

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
          strokeColor: "#4F46E5",
          strokeOpacity: 0.8
        })
      }

      prev = pos
    })

    if (places.length > 0) {
      map.setBounds(bounds)
    }

  }, [places])

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-2xl"
    />
  )
}