'use client'

import { useState } from "react"
import { searchPlaces } from "../../lib/map/searchPlaces"

export default function PlanForm({ onResult }: any) {

  const [destination, setDestination] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()

    try {

      setLoading(true)

      console.log("Searching:", destination)

      const places: any = await searchPlaces(destination)

      console.log("RESULT:", places)

      onResult({
        destination,
        places: places.slice(0, 6),
      })

    } catch (err) {

      console.error("SEARCH ERROR:", err)
      alert("Place search failed")

    } finally {
      setLoading(false)
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
        {loading ? "Loading..." : "Search"}
      </button>

    </form>
  )
}