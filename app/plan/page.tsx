'use client'

import { useState } from "react"

import KakaoLoader from "../../components/map/KakaoLoader"
import PlanForm from "../../components/planner/PlanForm"
import PlanResult from "../../components/planner/PlanResult"
import MapView from "../../components/map/MapView"

export default function PlanPage() {

  const [plan, setPlan] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">

      {/* Kakao SDK Loader */}
      <KakaoLoader />

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          AI Travel Planner
        </h1>

        {/* form */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 mb-6">
          <PlanForm onResult={setPlan} />
        </div>

        {/* map */}
        <div className="mb-6">
          <MapView places={plan?.places || []} />
        </div>

        {/* result */}
        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
          <PlanResult plan={plan} />
        </div>

      </div>
    </div>
  )
}