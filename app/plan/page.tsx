'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PlanPage() {

  const router = useRouter()

  const [destination, setDestination] = useState("")
  const [days, setDays] = useState(3)

  const handleSubmit = () => {

    if (!destination) {
      alert("행선지를 입력해주세요")
      return
    }

    // 👉 sessionStorage로 전달 (간단 + 안정)
    sessionStorage.setItem("destination", destination)
    sessionStorage.setItem("days", String(days))

    router.push("/plan/result")
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="bg-black/70 p-10 rounded-2xl w-[350px]">

        <h1 className="text-2xl font-bold mb-6">
          Plan Your Trip
        </h1>

        {/* DESTINATION */}
        <input
          className="w-full p-2 mb-4 text-black rounded"
          placeholder="Enter destination (e.g. Seoul, Tokyo)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        {/* DAYS */}
        <input
          type="number"
          className="w-full p-2 mb-6 text-black rounded"
          value={days}
          min={1}
          max={14}
          onChange={(e) => setDays(Number(e.target.value))}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-white text-black py-2 rounded font-semibold"
        >
          Generate Plan
        </button>

      </div>

    </div>
  )
}