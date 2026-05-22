'use client'

import { useEffect, useRef } from 'react'

export default function GoogleMapView({ places }: any) {

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const google = (window as any).google

    if (!mapRef.current || !google) return

    const map = new google.maps.Map(mapRef.current, {
      center: places?.[0]
        ? { lat: places[0].lat, lng: places[0].lng }
        : { lat: 0, lng: 0 },
      zoom: 12,
    })

    const bounds = new google.maps.LatLngBounds()

    let prev: any = null

    places.forEach((p: any) => {

      if (!p.lat || !p.lng) return

      const pos = new google.maps.LatLng(p.lat, p.lng)

      new google.maps.Marker({
        map,
        position: pos,
        title: p.name,
      })

      bounds.extend(pos)

      if (prev) {
        new google.maps.Polyline({
          map,
          path: [prev, pos],
          strokeColor: "#4F46E5",
          strokeWeight: 3,
        })
      }

      prev = pos
    })

    if (places.length > 0) {
      map.fitBounds(bounds)
    }

  }, [places])

  return <div ref={mapRef} className="w-full h-[500px]" />
}