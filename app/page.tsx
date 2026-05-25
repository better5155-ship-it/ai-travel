'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {

  const router = useRouter()

  // =====================================================
  // 🔥 여행 타입
  // =====================================================

  const [tripType, setTripType] =
    useState("round")

  // =====================================================
  // 🔥 이동 수단
  // =====================================================

  const [transportType, setTransportType] =
    useState("flight")

  // =====================================================
  // 🔥 왕복
  // =====================================================

  const [from, setFrom] = useState("")

  const [destination, setDestination] =
    useState("")

  const [departDate, setDepartDate] =
    useState("")

  const [returnDate, setReturnDate] =
    useState("")

  // =====================================================
  // 🔥 Multi-city
  // =====================================================

  const [segments, setSegments] = useState([
    {
      from: "",
      to: "",
      date: ""
    }
  ])

  // =====================================================
  // 🔥 segment 추가
  // =====================================================

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

  // =====================================================
  // 🔥 segment 수정
  // =====================================================

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

  // =====================================================
  // 🔥 SUBMIT
  // =====================================================

  const handleSubmit = () => {

    sessionStorage.setItem(
      "tripType",
      tripType
    )

    sessionStorage.setItem(
      "transportType",
      transportType
    )

    // =================================================
    // 🔥 왕복
    // =================================================

    if (tripType === "round") {

      sessionStorage.setItem("from", from)

      sessionStorage.setItem(
        "destination",
        destination
      )

      sessionStorage.setItem(
        "departDate",
        departDate
      )

      sessionStorage.setItem(
        "returnDate",
        returnDate
      )
    }

    // =================================================
    // 🔥 Multi-city
    // =================================================

    else {

      sessionStorage.setItem(
        "segments",
        JSON.stringify(segments)
      )

      // 🔥 첫 도시를 대표 destination으로 저장
      sessionStorage.setItem(
        "destination",
        segments[0]?.to || ""
      )
    }

    // =================================================
    // 🔥 분기
    // =================================================

    if (transportType === "flight") {

      router.push("/flight")
    }

    else {

      router.push("/plan")
    }
  }

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        text-white
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",

        backgroundSize: "cover",

        backgroundPosition: "center"
      }}
    >

      <div className="
        bg-black/70
        p-8
        rounded-3xl
        w-[700px]
        backdrop-blur-md
      ">

        <h1 className="
          text-5xl
          font-bold
          mb-10
          text-center
        ">

          AI Travel Planner

        </h1>

        {/* ================================================= */}
        {/* 🔥 이동 수단 */}
        {/* ================================================= */}

        <div className="mb-6">

          <p className="mb-2 font-bold">
            Transportation
          </p>

          <select
            value={transportType}

            onChange={(e) =>
              setTransportType(e.target.value)
            }

            className="
              w-full
              p-3
              rounded
              text-black
            "
          >

            <option value="flight">
              Flight
            </option>

            <option value="noflight">
              No Flight
            </option>

          </select>

        </div>

        {/* ================================================= */}
        {/* 🔥 여행 타입 */}
        {/* ================================================= */}

        <div className="mb-8">

          <p className="mb-2 font-bold">
            Trip Type
          </p>

          <select
            value={tripType}

            onChange={(e) =>
              setTripType(e.target.value)
            }

            className="
              w-full
              p-3
              rounded
              text-black
            "
          >

            <option value="round">
              Round Trip
            </option>

            <option value="oneway">
              One Way / Multi City
            </option>

          </select>

        </div>

        {/* ================================================= */}
        {/* 🔥 ROUND */}
        {/* ================================================= */}

        {tripType === "round" && (

          <div className="space-y-4">

            <input
              className="
                w-full
                p-3
                rounded
                text-black
              "

              placeholder="From"

              value={from}

              onChange={(e) =>
                setFrom(e.target.value)
              }
            />

            <input
              className="
                w-full
                p-3
                rounded
                text-black
              "

              placeholder="Destination"

              value={destination}

              onChange={(e) =>
                setDestination(e.target.value)
              }
            />

            <input
              type="date"

              className="
                w-full
                p-3
                rounded
                text-black
              "

              value={departDate}

              onChange={(e) =>
                setDepartDate(e.target.value)
              }
            />

            <input
              type="date"

              className="
                w-full
                p-3
                rounded
                text-black
              "

              value={returnDate}

              onChange={(e) =>
                setReturnDate(e.target.value)
              }
            />

          </div>

        )}

        {/* ================================================= */}
        {/* 🔥 MULTI CITY */}
        {/* ================================================= */}

        {tripType === "oneway" && (

          <div className="space-y-6">

            {segments.map((segment, index) => (

              <div
                key={index}

                className="
                  bg-white/10
                  p-5
                  rounded-2xl
                "
              >

                <h2 className="
                  font-bold
                  text-xl
                  mb-4
                ">

                  Flight {index + 1}

                </h2>

                <div className="space-y-3">

                  <input
                    className="
                      w-full
                      p-3
                      rounded
                      text-black
                    "

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
                    className="
                      w-full
                      p-3
                      rounded
                      text-black
                    "

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

                    className="
                      w-full
                      p-3
                      rounded
                      text-black
                    "

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

              className="
                w-full
                bg-white
                text-black
                py-3
                rounded-xl
                font-bold
              "
            >

              + Add Flight

            </button>

          </div>

        )}

        {/* ================================================= */}
        {/* 🔥 SEARCH */}
        {/* ================================================= */}

        <button
          onClick={handleSubmit}

          className="
            w-full
            bg-blue-500
            py-4
            rounded-2xl
            text-2xl
            font-bold
            mt-8
            hover:bg-blue-400
            transition
          "
        >

          Generate Trip

        </button>

      </div>

    </div>
  )
}