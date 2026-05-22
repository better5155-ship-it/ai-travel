'use client'

import { useEffect, useRef } from 'react'

export default function MapView({ places }: any) {

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    if (!(window as any).kakao) return
    if (!mapRef.current) return

    const kakao = (window as any).kakao

    kakao.maps.load(() => {

      const map = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 5,
      })

      const bounds = new kakao.maps.LatLngBounds()

      let prev: kakao.maps.LatLng | null = null

      places.forEach((place: any) => {

        if (!place?.lat || !place?.lng) return

        const pos = new kakao.maps.LatLng(place.lat, place.lng)

        const marker = new kakao.maps.Marker({
          map,
          position: pos,
        })

        bounds.extend(pos)

        const info = new kakao.maps.InfoWindow({
          content: `
            <div style="padding:8px;text-align:center;color:#000">
              <b>${place.name}</b>
            </div>
          `,
        })

        kakao.maps.event.addListener(marker, 'click', () => {
          info.open(map, marker)
        })

        // 🔥 동선 선 연결
        if (prev) {
          new kakao.maps.Polyline({
            map,
            path: [prev, pos],
            strokeWeight: 3,
            strokeColor: '#4F46E5'
          })
        }

        prev = pos
      })

      if (places.length > 0) {
        map.setBounds(bounds)
      }

    })

  }, [places])

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-2xl border border-white/10"
    />
  )
}