'use client'

import { useState } from 'react'

export default function PlanForm({ onResult }: any) {

  const [destination, setDestination] = useState('')
  const [days, setDays] = useState(3)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {

    if (!destination) return

    try {
      setLoading(true)

      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days })
      })

      const data = await res.json()

      onResult(data)

    } catch (err) {
      console.error(err)
      alert("failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">

      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full p-4 rounded-xl bg-black/30 border"
        placeholder="Destination"
      />

      <select
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="w-full p-4 rounded-xl bg-black/30 border"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1} Days
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        className="w-full bg-white text-black py-4 rounded-xl"
      >
        {loading ? "Loading..." : "Generate Plan"}
      </button>

    </div>
  )
}