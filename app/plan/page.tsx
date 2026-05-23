'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// 🚨 중요: 지도는 SSR 완전 차단
const MapView = dynamic(
  () => import('@/components/map/MapView'),
  { ssr: false }
)

export default function PlanPage() {

  const [plan, setPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [destination, setDestination] = useState<string | null>(null)
  const [days, setDays] = useState<number>(3)

  // 🚨 client-only 데이터 로딩 (SSR 방지 핵심)
  useEffect(() => {

    if (typeof window === 'undefined') return

    const savedDestination = sessionStorage.getItem("destination")
    const savedDays = sessionStorage.getItem("days")

    console.log("DEST:", savedDestination)
    console.log("DAYS:", savedDays)

    setDestination(savedDestination)
    setDays(Number(savedDays || 3))

  }, [])

  // 🚨 API 호출 분리 (destination 세팅 이후 실행)
  useEffect(() => {

    if (!destination) {
      setLoading(false)
      return
    }

    const fetchPlan = async () => {

      try {

        const res = await fetch("/api/plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destination,
            days
          })
        })

        const data = await res.json()

        console.log("🔥 PLAN RESULT:", data)

        setPlan(data)

      } catch (err) {
        console.error("PLAN ERROR:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlan()

  }, [destination, days])

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* 🌍 BACKGROUND */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80')"
        }}
      />

      {/* 🌑 OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 p-6">

        <h1 className="text-2xl font-bold mb-4">
          Travel Plan
        </h1>

        {/* LOADING */}
        {loading && (
          <div className="h-[500px] flex items-center justify-center text-white/70">
            Generating your AI travel plan...
          </div>
        )}

        {/* NO DATA */}
        {!loading && !plan && (
          <div className="h-[500px] flex items-center justify-center text-red-400">
            Failed to generate plan
          </div>
        )}

        {/* MAP */}
        {!loading && plan && (
          <MapView plan={plan} />
        )}

      </div>

    </div>
  )
}