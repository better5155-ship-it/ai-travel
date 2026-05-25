'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {

  const router = useRouter()

  const [tripType, setTripType] = useState("round")

  const [from, setFrom] = useState("")
  const [destination, setDestination] = useState("")

  const [departDate, setDepartDate] = useState("")
  const [returnDate, setReturnDate] = useState("")

  // 🔥 편도 다중 항공권
  const [segments, setSegments] = useState([
    {
      from: "",
      to: "",
      date: ""
    }
  ])

  const addSegment = () => {

    setSegments([
      ...segments,
      {
        from: "",
        to: "",
        date: ""
      }
    ])
  }

  const updateSegment = (
    index: number,
    key: string,
    value: string
  ) => {

    const copy = [...segments]

    copy[index] = {
      ...copy[index],
      [key]: value
    }

    setSegments(copy)
  }

  const handleSubmit = () => {

    sessionStorage.setItem(
      "tripType",
      tripType
    )

    // 🔥 왕복
    if (tripType === "round") {

      sessionStorage.setItem("from", from)
      sessionStorage.setItem("destination", destination)
      sessionStorage.setItem("departDate", departDate)
      sessionStorage.setItem("returnDate", returnDate)
    }

    // 🔥 편도 multi-city
    else {

      sessionStorage.setItem(
        "segments",
        JSON.stringify(segments)
      )
    }

    router.push("/flight")
  }

  return (

    <div
      className="min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      <div className="bg-black/70 p-8 rounded-3xl w-[700px] backdrop-blur-md">

        <h1 className="text-4xl font-bold mb-8 text-center">
          AI Flight Search
        </h1>

        {/* 여행 타입 */}
        <select
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          className="w-full p-3 rounded text-black mb-6"
        >
          <option value="round">
            Round Trip
          </option>

          <option value="oneway">
            One Way / Multi City
          </option>
        </select>

        {/* 🔥 왕복 */}
        {tripType === "round" && (

          <div className="space-y-4">

            <input
              className="w-full p-3 rounded text-black"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />

            <input
              className="w-full p-3 rounded text-black"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <input
              type="date"
              className="w-full p-3 rounded text-black"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
            />

            <input
              type="date"
              className="w-full p-3 rounded text-black"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />

          </div>
        )}

        {/* 🔥 Multi City */}
        {tripType === "oneway" && (

          <div className="space-y-6">

            {segments.map((segment, index) => (

              <div
                key={index}
                className="bg-white/10 p-5 rounded-2xl"
              >

                <h2 className="font-bold text-xl mb-4">
                  Flight {index + 1}
                </h2>

                <div className="space-y-3">

                  <input
                    className="w-full p-3 rounded text-black"
                    placeholder="From"
                    value={segment.from}
                    onChange={(e) =>
                      updateSegment(
                        index,
                        "from",
                        e.target.value
                      )
                    }
                  />

                  <input
                    className="w-full p-3 rounded text-black"
                    placeholder="To"
                    value={segment.to}
                    onChange={(e) =>
                      updateSegment(
                        index,
                        "to",
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="date"
                    className="w-full p-3 rounded text-black"
                    value={segment.date}
                    onChange={(e) =>
                      updateSegment(
                        index,
                        "date",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

            ))}

            <button
              onClick={addSegment}
              className="w-full bg-white text-black py-3 rounded-xl font-bold"
            >
              + Add Flight
            </button>

          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 py-4 rounded-2xl text-xl font-bold mt-8"
        >
          Search Flights
        </button>

      </div>

    </div>
  )
}