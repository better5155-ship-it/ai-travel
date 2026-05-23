'use client'

import { useEffect, useRef } from 'react'

export default function GoogleMapView({ places, colorByDay }: any) {

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)

  useEffect(() => {

    const google = (window as any)?.google

    if (!google || !google.maps) {
      console.warn("🚨 Google Maps not ready")
      return
    }

    if (!mapRef.current) return

    // 🔥 핵심 방어
    if (!google.maps.LatLng) {
      console.error("❌ Google Maps API corrupted")
      return
    }

    const validPlaces = (places || []).filter(
      (p: any) =>
        p?.lat != null &&
        p?.lng != null &&
        !isNaN(Number(p.lat)) &&
        !isNaN(Number(p.lng))
    )

    const center = validPlaces[0]
      ? new google.maps.LatLng(
          Number(validPlaces[0].lat),
          Number(validPlaces[0].lng)
        )
      : new google.maps.LatLng(37.5665, 126.9780)

    // ✅ map 1번만 생성
    if (!mapInstance.current) {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center,
        zoom: 12,
      })
    }

    const map = mapInstance.current

    const bounds = new google.maps.LatLngBounds()

    let prev: any = null

    validPlaces.forEach((p: any) => {

      // 🔥 여기 핵심 수정
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
          strokeColor: colorByDay?.(p.day) || "#4F46E5",
          strokeWeight: 3,
        })
      }

      prev = pos
    })

    if (validPlaces.length > 0) {
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