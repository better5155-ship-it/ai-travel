'use client'

import { useEffect, useState } from 'react'
import MapView from '@/components/map/MapView'

export default function PlanPage() {

  const [plan, setPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const destination = sessionStorage.getItem("destination")
    const days = sessionStorage.getItem("days")

    console.log("DEST:", destination)
    console.log("DAYS:", days)

    if (!destination) {
      setLoading(false)
      return
    }

    const fetchPlan = async () => {

      try {

        const res = await fetch("/api/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            destination,
            days: Number(days || 3)
          })
        })

        const data = await res.json()

        console.log("🔥 PLAN RESULT:", data)

        setPlan(data)

      } catch (err) {
        console.error("PLAN ERROR:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlan()

  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">

      {/* 🌍 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80')"
          }}
        />
      </div>

      {/* 🌑 OVERLAY */}
      <div className="absolute inset-0 bg-black/70 -z-10" />

      {/* CONTENT */}
      <div className="relative z-10 p-6">

        <h1 className="text-2xl font-bold mb-4">
          Travel Plan
        </h1>

        {/* LOADING */}
        {loading && (
          <div className="h-[500px] flex items-center justify-center text-white/70">
            Generating your travel plan...
          </div>
        )}

        {/* NO DATA */}
        {!loading && !plan && (
          <div className="h-[500px] flex items-center justify-center text-red-400">
            No plan generated
          </div>
        )}

        {/* MAP */}
        {!loading && plan && (
          <MapView plan={plan} />
        )}

      </div>

    </div>
  )
}