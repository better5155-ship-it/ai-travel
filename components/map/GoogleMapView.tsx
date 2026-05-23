'use client'

import { useEffect, useRef } from 'react'

export default function GoogleMapView({ places }: any) {

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {

    const google = (window as any).google

    if (!google) {
      console.warn("🚨 Google Maps SDK not loaded")
      return
    }

    if (!mapRef.current) return
    if (!(mapRef.current instanceof HTMLElement)) return

    const validPlaces = (places || []).filter(
      (p: any) => p?.lat != null && p?.lng != null
    )

    const center = validPlaces[0]
      ? {
          lat: Number(validPlaces[0].lat),
          lng: Number(validPlaces[0].lng),
        }
      : { lat: 0, lng: 0 }

    // 🔥 map은 1번만 생성
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center,
        zoom: 12,
      })
    }

    const map = mapInstanceRef.current

    const bounds = new google.maps.LatLngBounds()

    let prev: any = null

    validPlaces.forEach((p: any) => {

      const pos = new google.maps.LatLng(
        Number(p.lat),
        Number(p.lng)
      )

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

    if (validPlaces.length > 0) {
      map.fitBounds(bounds)
    }

  }, [places])

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-2xl"
    />
  )
}