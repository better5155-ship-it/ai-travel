'use client'

import { useEffect, useState } from 'react'
import MapView from '@/components/map/MapView'

export default function PlanPage() {

  const [plan, setPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const destination = sessionStorage.getItem("destination")
    const days = Number(sessionStorage.getItem("days") || 3)

    if (!destination) return

    const fetchPlan = async () => {

      try {

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
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlan()

  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {loading && (
        <div className="h-[500px] flex items-center justify-center">
          Loading...
        </div>
      )}

      {!loading && <MapView plan={plan} />}

    </div>
  )
}