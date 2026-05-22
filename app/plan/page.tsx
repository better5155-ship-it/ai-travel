'use client'

import { useState } from "react"
import PlanForm from "@/components/planner/PlanForm"
import PlanResult from "@/components/planner/PlanResult"

export default function PlanPage() {
  const [plan, setPlan] = useState(null)

  return (
    <div>
      <h1>AI Travel Planner</h1>

      <PlanForm onResult={setPlan} />
      <PlanResult plan={plan} />
    </div>
  )
}