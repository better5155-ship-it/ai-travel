'use client'

import { useEffect, useRef } from 'react'

export default function MapView({ places }: any) {

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    if (!places?.length) return
    if (!(window as any).kakao) return

    const kakao = (window as any).kakao

    kakao.maps.load(() => {

      if (!mapRef.current) return

      const map = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 5,
      })

      const bounds = new kakao.maps.LatLngBounds()

      places.forEach((p: any) => {

        if (!p?.lat || !p?.lng) return

        const pos = new kakao.maps.LatLng(p.lat, p.lng)

        new kakao.maps.Marker({
          map,
          position: pos,
        })

        bounds.extend(pos)

      })

      map.setBounds(bounds)
    })

  }, [places])

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-2xl border border-white/10"
    />
  )
}