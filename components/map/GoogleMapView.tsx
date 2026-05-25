'use client'

import {
  useEffect,
  useRef,
} from "react"

export default function GoogleMapView({
  places = [],
  routes = [],
}: any) {

  const mapRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {

    const google =
      (window as any).google

    if (
      !google ||
      !mapRef.current ||
      !places.length
    ) return

    const center = {
      lat: places[0].lat,
      lng: places[0].lng,
    }

    const map =
      new google.maps.Map(
        mapRef.current,
        {
          center,
          zoom: 11,
          mapId: "travel-map",
        }
      )

    const colors = [
      "#ef4444",
      "#3b82f6",
      "#22c55e",
      "#eab308",
      "#a855f7",
      "#ec4899",
      "#f97316",
      "#06b6d4",
      "#84cc16",
      "#f43f5e",
      "#6366f1",
      "#14b8a6",
      "#8b5cf6",
      "#10b981",
    ]

    // 🔥 최신 marker
    places.forEach((p: any) => {

      const markerDiv =
        document.createElement("div")

      markerDiv.innerHTML = `
        <div
          style="
            width:30px;
            height:30px;
            border-radius:999px;
            background:${colors[(p.day - 1) % colors.length]};
            color:white;
            display:flex;
            align-items:center;
            justify-content:center;
            font-weight:bold;
            border:2px solid white;
            box-shadow:0 2px 6px rgba(0,0,0,0.3);
          "
        >
          ${p.day}
        </div>
      `

      new google.maps.marker.AdvancedMarkerElement({

        map,

        position: {
          lat: p.lat,
          lng: p.lng,
        },

        content: markerDiv,
      })
    })

    // 🔥 polyline
    routes.forEach((route: any) => {

      if (
        !route.polyline ||
        !google.maps.geometry
      ) return

      const path =
        google.maps.geometry.encoding.decodePath(
          route.polyline
        )

      new google.maps.Polyline({

        map,

        path,

        strokeColor: "#3b82f6",

        strokeOpacity: 0.8,

        strokeWeight: 5,
      })
    })

  }, [places, routes])

  return (

    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "600px",
      }}
    />

  )
}