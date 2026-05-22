'use client'

import { useState } from "react"
import { searchPlaces } from "../../lib/map/searchPlaces"

export default function PlanForm({ onResult }: any) {
  const [destination, setDestination] = useState("")

  async function handleSubmit(e: any) {
    e.preventDefault()

    try {
      const places: any = await searchPlaces(destination)

      const formatted = {
        destination,
        places: places.slice(0, 6),
      }

      onResult(formatted)

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">

      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Where do you want to go?"
        className="flex-1 p-3 rounded-xl text-black"
      />

      <button
        type="submit"
        className="bg-white text-black px-5 rounded-xl font-semibold"
      >
        Search
      </button>

    </form>
  )
}