'use client'

import { useEffect, useState } from 'react'
import MapView from '@/components/map/MapView'

export default function PlanPage() {

  const [plan, setPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const destination = sessionStorage.getItem("destination")
    const days = sessionStorage.getItem("days")

    if (!destination) {
      setLoading(false)
      return
    }

    const fetchPlan = async () => {

      try {

        const res = await fetch("/api/plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destination,
            days: Number(days || 3)
          })
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
    <div
      className="w-full min-h-screen text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      {/* overlay (NO z-index tricks) */}
      <div className="w-full min-h-screen bg-black/70">

        <div className="p-6">

          <h1 className="text-2xl font-bold mb-4">
            Travel Plan
          </h1>

          {loading && (
            <div className="h-[500px] flex items-center justify-center text-white/70">
              Generating plan...
            </div>
          )}

          {!loading && plan && (
            <MapView plan={plan} />
          )}

        </div>

      </div>

    </div>
  )
}