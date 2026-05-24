'use client'

import { useEffect, useState } from "react"
import MapView from "@/components/map/MapView"

export default function PlanResultPage() {

  const [data, setData] = useState<any>(null)

  useEffect(() => {

    const destination =
      sessionStorage.getItem("destination")

    const days =
      sessionStorage.getItem("days")

    // 🔥 테스트용 plan 생성
    const plan = {
      region:
        destination?.toLowerCase().includes("seoul")
          ? "korea"
          : "global",

      destination,
      days,

      daysData: [
        {
          day: 1,
          places: [
            {
              name: destination,
              lat: 37.5665,
              lng: 126.9780,
            },
          ],
        },
      ],
    }

    setData(plan)

  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  return (
    <div
      className="min-h-screen text-white p-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="bg-black/70 p-6 rounded-xl">

        <h1 className="text-2xl font-bold mb-4">
          Plan Result
        </h1>

        <div className="mb-6">
          <p>Destination: {data.destination}</p>
          <p>Days: {data.days}</p>
        </div>

        {/* 🔥 지도 */}
        <MapView
          plan={{
            region: data.region,
            days: data.daysData,
          }}
        />

      </div>

    </div>
  )
}