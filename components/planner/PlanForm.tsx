'use client'

import { useState } from 'react'
import { searchPlaces } from '../../lib/map/searchPlaces'
import { optimizeRoute } from '../../lib/map/optimizeRoute'

export default function PlanForm({ onResult }: any) {

  const [destination, setDestination] = useState('')
  const [days, setDays] = useState(3)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {

    if (!destination) return alert("Enter destination")

    try {
      setLoading(true)

      const aiRes = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days })
      })

      const aiPlan = await aiRes.json()

      const enrichedDays = await Promise.all(
        aiPlan.days.map(async (day: any) => {

          const rawPlaces = await Promise.all(
            day.places.map(async (p: any) => {

              const result: any = await searchPlaces(p.name)

              if (!result?.length) return null

              const place = result[0]

              return {
                name: p.name,
                description: p.description,
                lat: Number(place.y),
                lng: Number(place.x),
                address: place.address_name,
              }
            })
          )

          const filtered = rawPlaces.filter(Boolean)

          // 🔥 동선 최적화 적용
          const ordered = optimizeRoute(filtered)

          return {
            day: day.day,
            places: ordered
          }
        })
      )

      onResult({
        destination,
        days: enrichedDays
      })

    } catch (err) {
      console.error(err)
      alert("AI plan generation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">

      <input
        className="w-full p-4 rounded-xl bg-black/30 border border-white/10"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
      />

      <select
        className="w-full p-4 rounded-xl bg-black/30 border border-white/10"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} Days
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-white text-black font-bold py-4 rounded-xl"
      >
        {loading ? "Loading..." : "Generate Plan"}
      </button>

    </div>
  )
}