'use client'

import { useEffect, useRef } from 'react'

export default function KakaoMapView({ places, colorByDay }: any) {

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const kakao = (window as any)?.kakao
    if (!mapRef.current || !kakao) return

    const center = places[0]
      ? new kakao.maps.LatLng(places[0].lat, places[0].lng)
      : new kakao.maps.LatLng(37.5665, 126.9780)

    const map = new kakao.maps.Map(mapRef.current, {
      center,
      level: 5
    })

    const bounds = new kakao.maps.LatLngBounds()

    let prev: any = null

    places.forEach((p: any) => {

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
          strokeColor: colorByDay(p.day),
          strokeOpacity: 0.8
        })
      }

      prev = pos
    })

    if (places.length > 0) {
      map.setBounds(bounds)
    }

  }, [places, colorByDay])

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-2xl"
    />
  )
}