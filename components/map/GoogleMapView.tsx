'use client'

import { useEffect, useRef } from 'react'

export default function GoogleMapView({ places = [] }: any) {

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)

  useEffect(() => {

    if (!mapRef.current) return

    const loadMap = () => {

      const google = (window as any)?.google

      // 🔥 진짜 가드 (이거 중요)
      if (!google?.maps?.Map || !google?.maps?.LatLng) {
        console.warn("Google Maps not ready yet")
        setTimeout(loadMap, 300)
        return
      }

      const validPlaces = (places || [])
        .map((p: any) => ({
          lat: Number(p?.lat),
          lng: Number(p?.lng),
          name: p?.name
        }))
        .filter((p: any) =>
          Number.isFinite(p.lat) &&
          Number.isFinite(p.lng)
        )

      if (validPlaces.length === 0) {
        console.warn("No valid places")
        return
      }

      const center = new google.maps.LatLng(
        validPlaces[0].lat,
        validPlaces[0].lng
      )

      // 🔥 중요: map은 1번만 생성
      if (!mapInstance.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center,
          zoom: 12,
        })
      }

      const map = mapInstance.current

      const bounds = new google.maps.LatLngBounds()

      validPlaces.forEach((p: any) => {

        const pos = new google.maps.LatLng(p.lat, p.lng)

        new google.maps.Marker({
          map,
          position: pos,
          title: p.name,
        })

        bounds.extend(pos)
      })

      map.fitBounds(bounds)
    }

    loadMap()

  }, [places])

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-2xl"
    />
  )
}