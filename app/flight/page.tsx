'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function FlightPage() {

  const router = useRouter()

  const [results, setResults] = useState<any[]>([])
  const [selectedFlights, setSelectedFlights] = useState<any[]>([])

  useEffect(() => {

    const load = async () => {

      const tripType = sessionStorage.getItem("tripType")

      // =====================================================
      // 🔥 ROUND TRIP
      // =====================================================

      if (tripType === "round") {

        const from = sessionStorage.getItem("from")
        const to = sessionStorage.getItem("destination")
        const departDate = sessionStorage.getItem("departDate")
        const returnDate = sessionStorage.getItem("returnDate")

        const res = await fetch("/api/flight", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from,
            to,
            departDate,
            returnDate,
            tripType
          })
        })

        const data = await res.json()

        setResults([
          {
            title: "Outbound",
            flights: data.outboundFlights
          },
          {
            title: "Return",
            flights: data.returnFlights
          }
        ])
      }

      // =====================================================
      // 🔥 MULTI CITY
      // =====================================================

      else {

        const segments = JSON.parse(
          sessionStorage.getItem("segments") || "[]"
        )

        const allResults = []

        for (const segment of segments) {

          const res = await fetch("/api/flight", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: segment.from,
              to: segment.to,
              departDate: segment.date,
              tripType: "oneway"
            })
          })

          const data = await res.json()

          allResults.push({
            title: `${segment.from} → ${segment.to}`,
            flights: data.outboundFlights
          })
        }

        setResults(allResults)
      }
    }

    load()

  }, [])

  // =====================================================
  // 🔥 항공권 선택
  // =====================================================

  const handleSelectFlight = (
    sectionIndex: number,
    flight: any
  ) => {

    const updated = [...selectedFlights]

    updated[sectionIndex] = flight

    setSelectedFlights(updated)
  }

  // =====================================================
  // 🔥 NEXT
  // =====================================================

  const handleNext = () => {

    sessionStorage.setItem(
      "selectedFlights",
      JSON.stringify(selectedFlights)
    )

    // 🔥 총 항공권 가격 저장
    const totalFlightPrice = selectedFlights.reduce(

      (sum, f) => sum + (f?.price || 0),

      0
    )

    sessionStorage.setItem(
      "flightBudget",
      String(totalFlightPrice)
    )

    router.push("/plan")
  }

  return (

    <div
      className="min-h-screen text-white p-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1502920917128-1aa500764cbd')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      <div className="bg-black/70 p-8 rounded-3xl backdrop-blur-md">

        <h1 className="text-4xl font-bold mb-10">
          Flight Results
        </h1>

        <div className="space-y-10">

          {results.map((group, idx) => (

            <div key={idx}>

              <h2 className="text-3xl font-bold mb-5">
                {group.title}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                {group.flights.map((f: any, i: number) => (

                  <div
                    key={i}

                    onClick={() =>
                      handleSelectFlight(idx, f)
                    }

                    className={`
                      p-5
                      rounded-2xl
                      cursor-pointer
                      transition
                      border

                      ${
                        selectedFlights[idx]?.price === f.price

                          ? "bg-blue-500 border-blue-300"

                          : "bg-white/10 border-transparent hover:bg-white/20"
                      }
                    `}
                  >

                    {/* 항공사 */}
                    <p className="text-2xl font-bold mb-4">
                      {f.airline}
                    </p>

                    {/* 시간 */}
                    <div className="space-y-2 mb-4">

                      <p>
                        🛫 Departure: {f.departure_time}
                      </p>

                      <p>
                        🛬 Arrival: {f.arrival_time}
                      </p>

                    </div>

                    {/* 비행시간 */}
                    <p className="mb-2">
                      ⏱ Duration:

                      {" "}

                      {Math.floor(f.duration / 60)}h

                      {" "}

                      {f.duration % 60}m
                    </p>

                    {/* 경유 */}
                    <p className="mb-4">
                      🔄 Stops: {f.stops}
                    </p>

                    {/* 가격 */}
                    <p className="text-3xl font-bold">
                      ₩{f.price.toLocaleString()}
                    </p>

                    {/* 선택됨 */}
                    {
                      selectedFlights[idx]?.price === f.price && (

                        <p className="mt-4 text-green-300 font-bold">
                          ✅ Selected
                        </p>

                      )
                    }

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

        {/* ===================================================== */}
        {/* 🔥 NEXT BUTTON */}
        {/* ===================================================== */}

        <div className="mt-14 flex justify-center">

          <button
            onClick={handleNext}
            className="
              bg-blue-500
              hover:bg-blue-400
              transition
              px-12
              py-5
              rounded-2xl
              text-2xl
              font-bold
            "
          >
            Next
          </button>

        </div>

      </div>

    </div>
  )
}