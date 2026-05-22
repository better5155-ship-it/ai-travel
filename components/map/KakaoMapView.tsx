'use client'

import { useEffect, useRef } from 'react'

export default function KakaoMapView({ places }: any) {

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

      places.forEach((p: any) => {

        if (!p.lat || !p.lng) return

        const pos = new kakao.maps.LatLng(p.lat, p.lng)

        new kakao.maps.Marker({
          map,
          position: pos,
        })

        bounds.extend(pos)

        if (prev) {
          new kakao.maps.Polyline({
            map,
            path: [prev, pos],
            strokeWeight: 3,
            strokeColor: '#4F46E5',
          })
        }

        prev = pos
      })

      if (places.length > 0) {
        map.setBounds(bounds)
      }

    })

  }, [places])

  return <div ref={mapRef} className="w-full h-[500px]" />
}