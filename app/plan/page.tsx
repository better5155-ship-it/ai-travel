'use client'

import { useEffect, useState } from 'react'
import MapView from '@/components/map/MapView'

export default function PlanPage() {

  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<any>(null)

  useEffect(() => {

    const destination = sessionStorage.getItem("destination")

    setTimeout(() => {

      setPlan({
        destination,
        region: "korea",
        days: [
          {
            day: 1,
            places: [
              { name: "Seoul Station", lat: 37.556, lng: 126.972 }
            ]
          }
        ]
      })

      setLoading(false)

    }, 800)

  }, [])

  return (
    <div className="relative min-h-screen text-white p-6">

      {/* 🌍 map-style background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1')"
        }}
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* content */}
      <div className="relative z-10">

        <h1 className="text-2xl mb-4">
          Travel Plan
        </h1>

        {loading && (
          <div className="h-[500px] flex items-center justify-center">
            Loading itinerary...
          </div>
        )}

        {!loading && plan && (
          <MapView plan={plan} />
        )}

      </div>

    </div>
  )
}