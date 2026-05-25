'use client'

import { useEffect, useState } from "react"

export default function PlanPage() {

  const [loading, setLoading] = useState(true)

  const [plan, setPlan] = useState<any[]>([])

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
  // 🔥 UI
  // =====================================================

  return (

    <div
      className="min-h-screen text-white p-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      <div className="
        bg-black/70
        backdrop-blur-md
        p-8
        rounded-3xl
      ">

        <h1 className="text-4xl font-bold mb-10">
          AI Travel Plan
        </h1>

        <div className="space-y-8">

          {Array.isArray(plan) && plan.map((day, idx) => (

            <div
              key={idx}
              className="bg-white/10 p-6 rounded-2xl"
            >

              <h2 className="text-3xl font-bold mb-5">
                Day {day.day}
              </h2>

              <div className="space-y-3">

                {day.activities?.map(

                  (activity: string, i: number) => (

                    <div
                      key={i}
                      className="
                        bg-black/30
                        p-4
                        rounded-xl
                      "
                    >

                      ✈️ {activity}

                    </div>

                  )

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}