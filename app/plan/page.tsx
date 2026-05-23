'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import MapView from '@/components/map/MapView'
import PlanForm from '@/components/planner/PlanForm'

export default function PlanPage() {

  const params = useSearchParams()

  const destination = params.get("destination") || ""
  const days = Number(params.get("days") || 3)

  const [plan, setPlan] = useState<any>(null)

  useEffect(() => {

    const fetchPlan = async () => {

      const res = await fetch("/api/plan", {
        method: "POST",
        body: JSON.stringify({ destination, days })
      })

      const data = await res.json()
      setPlan(data)
    }

    if (destination) fetchPlan()

  }, [destination, days])

  return (
    <div className="p-6 bg-black text-white">

      <h2 className="text-xl mb-4">
        {destination}
      </h2>

      <MapView plan={plan} />

    </div>
  )
}