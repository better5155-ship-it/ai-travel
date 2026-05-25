'use client'

import { useEffect, useState } from "react"
import MapView from "@/components/map/MapView"
import RouteCard from "@/components/RouteCard"

export default function PlanResultPage() {

  const [plan, setPlan] = useState<any>(null)

  useEffect(() => {

    const load = async () => {

      const destination =
        sessionStorage.getItem("destination")

      const days =
        sessionStorage.getItem("days")

      // 🔥 지역 판별
      const geoRes =
        await fetch("/api/geocode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ destination }),
        })

      const geo = await geoRes.json()

      const region =
        geo.country === "KR"
          ? "korea"
          : "global"

      // 🔥 AI 일정 생성
      const aiRes =
        await fetch("/api/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination,
            days,
            region,
            lat: geo.lat,
            lng: geo.lng,
          }),
        })

      const aiData = await aiRes.json()

      // 🔥 장소 + 경로 생성
      const daysData = await Promise.all(

        aiData.days.map(async (day: any) => {

          const places = await Promise.all(

            day.places.map(async (place: any) => {

              const placeGeoRes =
                await fetch("/api/geocode", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    destination: `${place.name} ${destination}`,
                  }),
                })

              const placeGeo =
                await placeGeoRes.json()

              return {
                name: place.name,
                lat: placeGeo.lat,
                lng: placeGeo.lng,
              }
            })
          )

          const routes: any[] = []

          for (let i = 0; i < places.length - 1; i++) {

            const routeRes =
              await fetch("/api/route", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  region,
                  origin: {
                    lat: places[i].lat,
                    lng: places[i].lng,
                  },
                  destination: {
                    lat: places[i + 1].lat,
                    lng: places[i + 1].lng,
                  },
                }),
              })

            const routeData =
              await routeRes.json()

            routes.push(routeData)
          }

          return {
            day: day.day,
            places,
            routes,

            // ✅ 핵심 FIX: timeline 무조건 배열로 보장
            timeline: Array.isArray(day.timeline)
              ? day.timeline
              : []
          }
        })
      )

      setPlan({
        region,
        destination,
        days,
        daysData,
      })
    }

    load()

  }, [])

  if (!plan) {

    return (
      <div
        className="min-h-screen flex items-center justify-center text-white text-2xl font-bold"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        Loading AI Travel Plan...
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

      <div className="bg-black/70 p-6 rounded-2xl backdrop-blur-md">

        <h1 className="text-4xl font-bold mb-4">
          AI Travel Plan
        </h1>

        <p className="mb-2 text-lg">
          Destination: {plan.destination}
        </p>

        <p className="mb-8 text-lg">
          Days: {plan.days}
        </p>

        {/* 🔥 날짜별 일정 */}
        <div className="space-y-10 mb-10">

          {plan.daysData.map((day: any) => (

            <div
              key={day.day}
              className="bg-white/10 p-5 rounded-xl"
            >

              <h2 className="text-2xl font-bold mb-6">
                Day {day.day}
              </h2>

              {/* ===================== */}
              {/* 🔥 TIMELINE (FIXED) */}
              {/* ===================== */}

              {day.timeline.length > 0 ? (
                <div className="mb-8 space-y-3">

                  {day.timeline.map((item: any, idx: number) => (

                    <div key={idx} className="flex items-start gap-3">

                      <div className="text-xl mt-1">
                        {item.type === "arrival" && "✈️"}
                        {item.type === "hotel" && "🏨"}
                        {item.type === "place" && "📍"}
                        {item.type === "move" && "🚇"}
                      </div>

                      <div className="bg-black/30 p-3 rounded-lg w-full">

                        {item.time && (
                          <p className="text-xs text-gray-400">
                            {item.time}
                          </p>
                        )}

                        <p className="font-semibold">
                          {item.title || item.name}
                        </p>

                        {item.from && item.to && (
                          <p className="text-sm text-gray-300">
                            {item.from} → {item.to}
                          </p>
                        )}

                      </div>

                    </div>

                  ))}

                </div>
              ) : (
                <p className="text-gray-400 mb-6 text-sm">
                  timeline 데이터 없음 (기본 일정 표시)
                </p>
              )}

              {/* ===================== */}
              {/* 🔥 PLACE + ROUTE */}
              {/* ===================== */}

              <div className="space-y-4">

                {day.places.map((p: any, idx: number) => (

                  <div key={p.name}>

                    <div className="bg-black/30 p-4 rounded-xl">
                      <p className="font-semibold text-lg">
                        📍 {p.name}
                      </p>
                    </div>

                    {day.routes[idx] && (
                      <div className="flex justify-center my-2 text-white/60">
                        ↓
                      </div>
                    )}

                    {day.routes[idx] && (
                      <RouteCard route={day.routes[idx]} />
                    )}

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

        {/* 🔥 지도 */}
        <MapView
          plan={{
            region: plan.region,
            days: plan.daysData,
          }}
        />

      </div>

    </div>
  )
}