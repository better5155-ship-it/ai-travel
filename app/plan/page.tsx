'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MapView from '@/components/map/MapView'

export default function PlanPage() {

  const params = useSearchParams()

  const destination = params.get("destination") || ""
  const days = Number(params.get("days") || 3)

  const [plan, setPlan] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if (!destination) return

    const fetchPlan = async () => {

      try {
        setLoading(true)

        const res = await fetch("/api/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ destination, days })
        })

        const data = await res.json()
        setPlan(data)

      } catch (err) {
        console.error("PLAN ERROR:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlan()

  }, [destination, days])

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-2xl mb-4">
        {destination}
      </h1>

      {loading && (
        <div className="h-[500px] flex items-center justify-center">
          Loading map...
        </div>
      )}

      {!loading && <MapView plan={plan} />}

    </div>
  )
}