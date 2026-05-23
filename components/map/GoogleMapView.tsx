'use client'

import { useEffect, useRef } from 'react'
import { loadGoogleMaps } from '../../lib/map/loadGoogleMaps'

export default function GoogleMapView({ places = [] }: any) {

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)

  useEffect(() => {

    if (!mapRef.current) return

    const run = async () => {

      const google = await loadGoogleMaps()

      if (!google?.maps) return

      const safePlaces = (places || [])
        .map((p: any) => ({
          lat: Number(p?.lat),
          lng: Number(p?.lng),
        }))
        .filter((p: any) =>
          Number.isFinite(p.lat) &&
          Number.isFinite(p.lng)
        )

      if (safePlaces.length === 0) return

      const center = new google.maps.LatLng(
        safePlaces[0].lat,
        safePlaces[0].lng
      )

      if (!mapInstance.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center,
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

    run()

  }, [places])

  return <div ref={mapRef} className="w-full h-[500px]" />
}