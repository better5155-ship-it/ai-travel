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

      let prev: any = null

      // 🔥 안전 flatten
      const flatPlaces =
        places?.days?.flat?.() ||
        places || []

      const validPlaces = flatPlaces.filter((p: any) =>
        p?.lat != null &&
        p?.lng != null &&
        !isNaN(Number(p.lat)) &&
        !isNaN(Number(p.lng))
      )

      validPlaces.forEach((p: any, index: number) => {

        const lat = Number(p.lat)
        const lng = Number(p.lng)

        const pos = new kakao.maps.LatLng(lat, lng)

        // marker
        new kakao.maps.Marker({
          map,
          position: pos,
        })

        bounds.extend(pos)

        // 🔥 polyline (핵심)
        if (prev) {
          new kakao.maps.Polyline({
            map,
            path: [prev, pos],
            strokeWeight: 3,
            strokeColor: '#4F46E5',
            strokeOpacity: 0.9,
          })
        }

        prev = pos
      })

      if (validPlaces.length > 0) {
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