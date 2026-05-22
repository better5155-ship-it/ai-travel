'use client'

import { useState } from "react"
import { generatePlan } from "@/lib/planner/generatePlan"

export default function PlanForm({ onResult }: any) {
  const [destination, setDestination] = useState("")
  const [days, setDays] = useState(3)

  const handleSubmit = async () => {
    const result = await generatePlan({ destination, days })
    onResult(result)
  }

  return (
    <div>
      <input
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <input
        type="number"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
      />

      <button onClick={handleSubmit}>
        Generate Plan
      </button>
    </div>
  )
}