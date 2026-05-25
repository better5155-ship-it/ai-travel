'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function FlightPage() {

  const router = useRouter()

  // =====================================================
  // 🔥 결과
  // =====================================================

  const [results, setResults] = useState<any[]>([])

  // =====================================================
  // 🔥 선택된 항공권
  // =====================================================

  const [selectedFlights, setSelectedFlights] =
    useState<any[]>([])

  // =====================================================
  // 🔥 로딩
  // =====================================================

  const [loading, setLoading] =
    useState(true)

  // =====================================================
  // 🔥 항공권 불러오기
  // =====================================================

  useEffect(() => {

    const load = async () => {

      try {

        const tripType =
          sessionStorage.getItem("tripType")

        // =================================================
        // 🔥 왕복
        // =================================================

        if (tripType === "round") {

          const from =
            sessionStorage.getItem("from")

          const to =
            sessionStorage.getItem("destination")

          const departDate =
            sessionStorage.getItem("departDate")

          const returnDate =
            sessionStorage.getItem("returnDate")

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

          console.log("ROUND DATA:")
          console.log(data)

          setResults([

            {
              title: "Outbound Flight",
              flights:
                Array.isArray(data.outboundFlights)

                  ? data.outboundFlights

                  : []
            },

            {
              title: "Return Flight",
              flights:
                Array.isArray(data.returnFlights)

                  ? data.returnFlights

                  : []
            }

          ])
        }

        // =================================================
        // 🔥 MULTI CITY
        // =================================================

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

              title:
                `${segment.from} → ${segment.to}`,

              flights:
                Array.isArray(data.outboundFlights)

                  ? data.outboundFlights

                  : []

            })
          }

          setResults(allResults)
        }

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)
      }
    }

    load()

  }, [])

  // =====================================================
  // 🔥 항공권 선택 / 해제
  // =====================================================

  const handleSelectFlight = (
    sectionIndex: number,
    flight: any
  ) => {

    const updated = [...selectedFlights]

    // 🔥 이미 선택된 항공권이면 해제
    if (
      updated[sectionIndex]?._id === flight._id
    ) {

      updated[sectionIndex] = null
    }

    // 🔥 새 선택
    else {

      updated[sectionIndex] = flight
    }

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

    // 🔥 총 항공권 가격
    const totalFlightPrice =

      selectedFlights.reduce(

        (sum, f) =>

          sum + (f?.price || 0),

        0
      )

    sessionStorage.setItem(

      "flightBudget",

      String(totalFlightPrice)

    )

    router.push("/plan")
  }

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

        Loading Flights...

      </div>

    )
  }

  // =====================================================
  // 🔥 UI
  // =====================================================

  return (

    <div
      className="
        min-h-screen
        text-white
        p-10
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1502920917128-1aa500764cbd')",

        backgroundSize: "cover",

        backgroundPosition: "center"
      }}
    >

      <div className="
        bg-black/70
        p-8
        rounded-3xl
        backdrop-blur-md
      ">

        <h1 className="
          text-5xl
          font-bold
          mb-12
        ">

          Flight Results

        </h1>

        {/* ================================================= */}
        {/* 🔥 결과 */}
        {/* ================================================= */}

        <div className="space-y-12">

          {results.map((group, idx) => (

            <div key={idx}>

              <h2 className="
                text-3xl
                font-bold
                mb-6
              ">

                {group.title}

              </h2>

              {/* ============================================= */}
              {/* 🔥 카드 */}
              {/* ============================================= */}

              <div className="
                grid
                md:grid-cols-2
                lg:grid-cols-3
                gap-5
              ">

                {group.flights.map(

                  (f: any, i: number) => (

                    <div
                      key={i}

                      onClick={() =>

                        handleSelectFlight(
                          idx,
                          f
                        )

                      }

                      className={`
                        p-5
                        rounded-2xl
                        cursor-pointer
                        transition
                        border

                        ${
                          selectedFlights[idx]?._id === f._id

                            ? "bg-blue-500 border-blue-300"

                            : "bg-white/10 border-transparent hover:bg-white/20"
                        }
                      `}
                    >

                      {/* 항공사 */}
                      <p className="
                        text-2xl
                        font-bold
                        mb-4
                      ">

                        {f.airline}

                      </p>

                      {/* 시간 */}
                      <div className="
                        space-y-2
                        mb-4
                      ">

                        <p>
                          🛫 Departure:

                          {" "}

                          {f.departure_time}
                        </p>

                        <p>
                          🛬 Arrival:

                          {" "}

                          {f.arrival_time}
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

                        🔄 Stops:

                        {" "}

                        {f.stops}

                      </p>

                      {/* 가격 */}
                      <p className="
                        text-3xl
                        font-bold
                      ">

                        ₩{f.price.toLocaleString()}

                      </p>

                      {/* 선택 */}
                      {
                        selectedFlights[idx]?._id === f._id && (

                          <p className="
                            mt-4
                            text-green-300
                            font-bold
                          ">

                            ✅ Selected

                          </p>

                        )
                      }

                    </div>

                  )

                )}

              </div>

            </div>

          ))}

        </div>

        {/* ================================================= */}
        {/* 🔥 NEXT */}
        {/* ================================================= */}

        <div className="
          mt-16
          flex
          justify-center
        ">

          <button
            onClick={handleNext}

            className="
              bg-blue-500
              hover:bg-blue-400
              transition
              px-14
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