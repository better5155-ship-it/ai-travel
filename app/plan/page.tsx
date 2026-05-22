'use client'

import { useState } from "react"
import PlanForm from "../../components/planner/PlanForm"
import PlanResult from "../../components/planner/PlanResult"

export default function PlanPage() {
  const [plan, setPlan] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">

      <div className="max-w-5xl mx-auto">

        {/* header */}
        <h1 className="text-4xl font-bold mb-6">
          AI Travel Planner
        </h1>

        {/* form card */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 mb-6">
          <PlanForm onResult={setPlan} />
        </div>

        {/* result card */}
        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
          <PlanResult plan={plan} />
        </div>

      </div>
    </div>
  )
}

import MapView from "../../components/map/MapView"

<div className="mt-6">
  <MapView places={plan?.places || []} />
</div>