'use client'

import { useEffect, useRef } from 'react'

export default function GoogleMapView({ places, colorByDay }: any) {

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const google = (window as any)?.google
    if (!mapRef.current || !google) return

    const center = places[0]
      ? { lat: Number(places[0].lat), lng: Number(places[0].lng) }
      : { lat: 0, lng: 0 }

    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom: 12
    })

    const bounds = new google.maps.LatLngBounds()

    let prev: any = null

    places.forEach((p: any) => {

      const pos = new google.maps.LatLng(
        Number(p.lat),
        Number(p.lng)
      )

      new google.maps.Marker({
        map,
        position: pos,
        title: p.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: colorByDay(p.day),
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: "#fff"
        },
        label: {
          text: String(p.day),
          color: "#fff"
        }
      })

      bounds.extend(pos)

      if (prev) {
        new google.maps.Polyline({
          map,
          path: [prev, pos],
          strokeColor: colorByDay(p.day),
          strokeWeight: 3
        })
      }

      prev = pos
    })

    if (places.length > 0) {
      map.fitBounds(bounds)
    }

  }, [places, colorByDay])

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-2xl"
    />
  )
}