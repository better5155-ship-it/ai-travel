'use client'

import { useState } from 'react'

export default function PlanForm({ onResult }: any) {

  const [destination, setDestination] = useState('')
  const [days, setDays] = useState(3)

  const submit = async () => {

    const res = await fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, days })
    })

    const data = await res.json()

    onResult(data)
  }

  return (
    <div className="space-y-4">

      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="destination"
        className="w-full p-3 bg-black/30"
      />

      <select
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="w-full p-3 bg-black/30"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <button
        onClick={submit}
        className="w-full bg-white text-black p-3"
      >
        Generate
      </button>

    </div>
  )
}