'use client'

import { useState } from "react"

import KakaoLoader from "../../components/map/KakaoLoader"
import PlanForm from "../../components/planner/PlanForm"
import PlanResult from "../../components/planner/PlanResult"
import MapView from "../../components/map/MapView"

export default function PlanPage() {

  const [plan, setPlan] = useState<any>(null)

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <KakaoLoader />

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          AI Travel Planner
        </h1>

        {/* FORM */}
        <div className="mb-6">
          <PlanForm onResult={setPlan} />
        </div>

        {/* MAP (🔥 핵심 수정) */}
        <div className="mb-6">
          <MapView plan={plan} />
        </div>

        {/* RESULT */}
        <div>
          <PlanResult plan={plan} />
        </div>

      </div>
    </div>
  )
}