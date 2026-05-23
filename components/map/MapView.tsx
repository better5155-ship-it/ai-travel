'use client'

import { useEffect } from 'react'

export default function MapView({ plan }: any) {

  useEffect(() => {
    console.log("MAP PLAN:", plan)
  }, [plan])

  if (!plan) return <div className="text-white">NO PLAN</div>
  if (!Array.isArray(plan.days)) return <div className="text-white">INVALID PLAN</div>

  return (
    <div className="h-[500px] flex items-center justify-center text-white">
      MAP SAFE MODE
    </div>
  )
}