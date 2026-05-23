'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// 🚨 Map SSR 완전 차단
const MapView = dynamic(
  () => import('@/components/map/MapView'),
  { ssr: false }
)

export default function PlanPage() {

  const [plan, setPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const destinationRef = useRef<string | null>(null)
  const daysRef = useRef<number>(3)

  // 🚨 1. sessionStorage는 무조건 client only
  useEffect(() => {

    if (typeof window === 'undefined') return

    destinationRef.current = sessionStorage.getItem("destination")
    daysRef.current = Number(sessionStorage.getItem("days") || 3)

    console.log("DEST:", destinationRef.current)
    console.log("DAYS:", daysRef.current)

  }, [])

  // 🚨 2. API 호출 LOCK (rate limit 핵심 해결)
  const hasFetched = useRef(false)

  useEffect(() => {

    if (hasFetched.current) return
    if (!destinationRef.current) return

    hasFetched.current = true

    const fetchPlan = async () => {

      try {

        setLoading(true)

        const res = await fetch("/api/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            destination: destinationRef.current,
            days: daysRef.current
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

  }, [])

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* 🌍 BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
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

        {/* ERROR */}
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