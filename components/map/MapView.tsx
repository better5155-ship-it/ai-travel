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

      const markers: any[] = []

      places.forEach((place: any, index: number) => {

        if (!place?.lat || !place?.lng) return

        const pos = new kakao.maps.LatLng(place.lat, place.lng)

        const marker = new kakao.maps.Marker({
          map,
          position: pos,
        })

        markers.push(marker)
        bounds.extend(pos)

        const info = new kakao.maps.InfoWindow({
          content: `
            <div style="
              padding:10px;
              text-align:center;
              font-size:13px;
              color:#000;
              min-width:140px;
            ">
              <b>${index + 1}. ${place.name}</b><br/>
              <span style="font-size:11px;">${place.address || ''}</span>
            </div>
          `,
        })

        kakao.maps.event.addListener(marker, 'click', () => {
          info.open(map, marker)
        })
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