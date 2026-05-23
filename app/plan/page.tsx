'use client'

import { useEffect, useState } from 'react'
import MapView from '@/components/map/MapView'

export default function PlanPage() {

  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<any>(null)

  useEffect(() => {

    const destination = sessionStorage.getItem("destination")
    const days = sessionStorage.getItem("days")

    console.log("DEST:", destination)
    console.log("DAYS:", days)

    // 👉 일단 UI 테스트용 mock
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
    <div className="min-h-screen bg-black text-white p-6">

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
  )
}