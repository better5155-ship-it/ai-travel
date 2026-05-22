'use client'

import { useEffect, useRef } from 'react'

interface Props {
  places: any[]
}

export default function MapView({ places }: Props) {

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    if (!(window as any).kakao) return

    const kakao = (window as any).kakao

    kakao.maps.load(() => {

      if (!mapRef.current) return

      // 기본 중심 좌표 (서울)
      const center = new kakao.maps.LatLng(
        37.5665,
        126.9780
      )

      // 지도 생성
      const map = new kakao.maps.Map(mapRef.current, {
        center,
        level: 5,
      })

      // bounds
      const bounds = new kakao.maps.LatLngBounds()

      places.forEach((place) => {

        const position = new kakao.maps.LatLng(
          place.lat,
          place.lng
        )

        // marker
        const marker = new kakao.maps.Marker({
          map,
          position,
        })

        // bounds 추가
        bounds.extend(position)

        // custom overlay
        const overlay = new kakao.maps.CustomOverlay({
          position,

          content: `
            <div
              style="
                padding:10px 14px;
                font-size:13px;
                color:#111;
                text-align:center;
                min-width:120px;
                font-weight:600;
                border-radius:12px;
                background:white;
                box-shadow:0 4px 12px rgba(0,0,0,0.15);
              "
            >
              ${place.name || 'No Name'}
            </div>
          `,

          yAnchor: 1.8,
        })

        overlay.setMap(map)

      })

      // 지도 범위 자동 조정
      if (places.length > 0) {
        map.setBounds(bounds)
      }

    })

  }, [places])

  return (
    <div
      ref={mapRef}
      className="
        w-full
        h-[500px]
        rounded-2xl
        overflow-hidden
        border
        border-white/10
        shadow-2xl
      "
    />
  )
}