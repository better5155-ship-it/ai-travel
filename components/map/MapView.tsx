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

      const center = new kakao.maps.LatLng(37.5665, 126.9780)

      const map = new kakao.maps.Map(mapRef.current, {
        center,
        level: 5,
      })

      const bounds = new kakao.maps.LatLngBounds()

      places.forEach((place) => {

        const position = new kakao.maps.LatLng(place.lat, place.lng)

        new kakao.maps.Marker({
          map,
          position,
        })

        bounds.extend(position)

        const infoWindow = new kakao.maps.InfoWindow({
          content: `
            <div style="padding:8px;font-size:13px;">
              <b>${place.name}</b>
            </div>
          `,
        })

        infoWindow.open(map, new kakao.maps.Marker({
          map,
          position,
        }))

      })

      if (places.length > 0) {
        map.setBounds(bounds)
      }

    })

  }, [places])

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-2xl overflow-hidden border border-white/10"
    />
  )
}