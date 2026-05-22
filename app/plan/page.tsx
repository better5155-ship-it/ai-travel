'use client'

import { useState } from "react"

import KakaoLoader from "../../components/map/KakaoLoader"
import PlanForm from "../../components/planner/PlanForm"
import MapView from "../../components/map/MapView"

export default function PlanPage() {

  const [plan, setPlan] = useState<any>(null)

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* 🔥 반드시 client에서만 실행 */}
      <KakaoLoader />

      <div className="max-w-5xl mx-auto">

        <PlanForm onResult={setPlan} />

        {/* 🔥 핵심: plan 없으면 map 렌더 금지 */}
        {plan && <MapView plan={plan} />}

      </div>

    </div>
  )
}