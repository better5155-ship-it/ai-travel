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

      const flatPlaces =
        places?.days?.flat?.() ||
        places || []

      const validPlaces = flatPlaces.filter((p: any) =>
        p?.lat && p?.lng &&
        !isNaN(Number(p.lat)) &&
        !isNaN(Number(p.lng))
      )

      validPlaces.forEach((p: any) => {

        const pos = new kakao.maps.LatLng(
          Number(p.lat),
          Number(p.lng)
        )

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

      // 🔥 핵심 FIX 1: bounds 적용 안정화
      if (validPlaces.length > 0) {

        map.setBounds(bounds)

        // 🔥 FIX 2: zoom 폭주 방지
        const listener = kakao.maps.event.addListener(map, 'bounds_changed', () => {

          const level = map.getLevel()

          // 너무 멀어지면 강제로 제한
          if (level > 10) {
            map.setLevel(10)
          }

          kakao.maps.event.removeListener(listener)
        })
      }

      // 🔥 FIX 3: fallback (완전 흰 화면 방지)
      setTimeout(() => {

        const center = map.getCenter()

        if (!center || validPlaces.length === 0) {
          map.setCenter(new kakao.maps.LatLng(37.5665, 126.9780))
          map.setLevel(5)
        }

      }, 500)

    })

  }, [places])

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-2xl border border-white/10"
    />
  )
}