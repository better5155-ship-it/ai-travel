'use client'

import { useEffect, useState } from "react"

import dynamic from "next/dynamic"

const Map = dynamic(
  () => import("@/components/Map"),
  {
    ssr: false
  }
)

export default function PlanPage() {

  const [loading, setLoading] = useState(true)

  const [plan, setPlan] = useState<any[]>([])

  const [selectedDay, setSelectedDay] = useState(0)

  useEffect(() => {

    const generatePlan = async () => {

      try {

        // 🔥 저장된 데이터
        const destination =
          sessionStorage.getItem("destination")

        const departDate =
          sessionStorage.getItem("departDate")

        const returnDate =
          sessionStorage.getItem("returnDate")

        const selectedFlights =
          JSON.parse(
            sessionStorage.getItem("selectedFlights") || "[]"
          )

        console.log("SELECTED FLIGHTS:")
        console.log(selectedFlights)

        // 🔥 AI 일정 생성
        const res = await fetch("/api/plan", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            destination,
            departDate,
            returnDate,
            selectedFlights

          })
        })

        const data = await res.json()

        console.log("PLAN DATA:")
        console.log(data)

        setPlan(
          Array.isArray(data?.days)
            ? data.days
            : []
        )

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)
      }
    }

    generatePlan()

  }, [])

  // =====================================================
  // 🔥 LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-black
        text-white
        text-3xl
      ">

        AI is generating your trip...

      </div>

    )
  }

  // =====================================================
  // 🔥 현재 Day 장소
  // =====================================================

  const currentPlaces =
    plan?.[selectedDay]?.places || []

  // =====================================================
  // 🔥 UI
  // =====================================================

  return (

    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      <div className="
        min-h-screen
        bg-black/60
        backdrop-blur-md
        grid
        grid-cols-1
        lg:grid-cols-2
      ">

        {/* ================================================= */}
        {/* 🔥 LEFT */}
        {/* ================================================= */}

        <div className="p-8 overflow-y-auto">

          <h1 className="text-4xl font-bold mb-10">
            AI Travel Plan
          </h1>

          <div className="space-y-8">

            {Array.isArray(plan) && plan.map((day, idx) => (

              <div
                key={idx}

                onClick={() =>
                  setSelectedDay(idx)
                }

                className={`
                  p-6
                  rounded-2xl
                  cursor-pointer
                  transition

                  ${
                    selectedDay === idx

                      ? "bg-blue-500"

                      : "bg-white/10 hover:bg-white/20"
                  }
                `}
              >

                <h2 className="text-3xl font-bold mb-5">
                  Day {day.day}
                </h2>

                <div className="space-y-3">

                  {day.places?.map(

                    (place: any, i: number) => (

                      <div
                        key={i}
                        className="
                          bg-black/30
                          p-4
                          rounded-xl
                        "
                      >

                        📍 {place.name}

                      </div>

                    )

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* ================================================= */}
        {/* 🔥 RIGHT MAP */}
        {/* ================================================= */}

        <div className="h-screen sticky top-0">

          <Map places={currentPlaces} />

        </div>

      </div>

    </div>
  )
}