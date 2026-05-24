'use client'

import { useEffect, useRef } from "react"

export default function GoogleMapView({ places }: any) {

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const google = (window as any)?.google
    if (!ref.current || !google) return

    const map = new google.maps.Map(ref.current, {
      center: places[0]
        ? { lat: places[0].lat, lng: places[0].lng }
        : { lat: 0, lng: 0 },
      zoom: 12
    })

    places.forEach((p: any) => {
      new google.maps.Marker({
        map,
        position: { lat: p.lat, lng: p.lng },
        title: p.name
      })
    })

  }, [places])

  return (
    <div ref={ref} className="w-full h-[500px] rounded-xl" />
  )
}