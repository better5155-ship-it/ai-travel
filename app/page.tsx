'use client'

import { useState } from 'react'
import PlanForm from '@/components/planner/PlanForm'
import MapView from '@/components/map/MapView'

export default function Page() {

  const [plan, setPlan] = useState<any>(null)

  return (
    <div className="p-6 bg-black text-white">

      <h1 className="text-2xl mb-4">
        AI Travel Planner
      </h1>

      <PlanForm onResult={setPlan} />

      <div className="mt-6">
        <MapView plan={plan} />
      </div>

    </div>
  )
}