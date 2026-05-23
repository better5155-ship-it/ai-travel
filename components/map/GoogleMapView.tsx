'use client'

import { useEffect, useRef } from 'react'

export default function GoogleMapView({ places = [] }: any) {

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)

  useEffect(() => {

    if (!mapRef.current) return

    const init = () => {

      const google = (window as any).google

      if (!google?.maps) {
        console.warn("Google not ready")
        setTimeout(init, 300)
        return
      }

      const safePlaces = (places || [])
        .map((p: any) => ({
          lat: Number(p.lat),
          lng: Number(p.lng),
          name: p.name
        }))
        .filter((p: any) =>
          Number.isFinite(p.lat) &&
          Number.isFinite(p.lng)
        )

      if (safePlaces.length === 0) return

      if (!mapInstance.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center: safePlaces[0],
          zoom: 12,
        })
      }

      const map = mapInstance.current
      const bounds = new google.maps.LatLngBounds()

      safePlaces.forEach((p: any) => {

        const pos = new google.maps.LatLng(p.lat, p.lng)

        new google.maps.Marker({
          map,
          position: pos,
        })

        bounds.extend(pos)
      })

      map.fitBounds(bounds)
    }

    init()

  }, [places])

  return (
    <div ref={mapRef} className="w-full h-[500px]" />
  )
}