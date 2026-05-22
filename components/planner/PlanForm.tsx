'use client'

import { useState } from 'react'
import { searchPlaces } from '../../lib/map/searchPlaces'

export default function PlanForm({ onResult }: any) {

  const [destination, setDestination] = useState('')
  const [days, setDays] = useState(3)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {

    try {

      if (!destination) {
        alert('Please enter a destination')
        return
      }

      setLoading(true)

      // Kakao 장소 검색
      const result: any = await searchPlaces(destination)

      // 장소 데이터 변환
      const places = result.slice(0, days * 2).map((place: any) => ({
        name: place.place_name,
        address: place.address_name,
        lat: Number(place.y),
        lng: Number(place.x),
      }))

      // Day별 일정 분리
      const planDays = []

      for (let i = 0; i < days; i++) {

        planDays.push({
          day: i + 1,

          places: places.slice(
            i * 2,
            i * 2 + 2
          ),
        })

      }

      // 부모 전달
      onResult({
        destination,
        places,
        days: planDays,
      })

    } catch (err) {

      console.error(err)

      alert('Place search failed')

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="space-y-5">

      {/* destination */}
      <div>
        <label className="block mb-2 text-sm text-white/70">
          Destination
        </label>

        <input
          type="text"
          placeholder="Tokyo, Seoul, Paris..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="
            w-full
            p-4
            rounded-2xl
            bg-black/30
            border
            border-white/10
            outline-none
            focus:border-white/30
            transition
          "
        />
      </div>

      {/* days */}
      <div>
        <label className="block mb-2 text-sm text-white/70">
          Travel Days
        </label>

        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="
            w-full
            p-4
            rounded-2xl
            bg-black/30
            border
            border-white/10
            outline-none
            focus:border-white/30
            transition
          "
        >

          {Array.from({ length: 14 }).map((_, i) => (

            <option
              key={i + 1}
              value={i + 1}
            >
              {i + 1} Days
            </option>

          ))}

        </select>
      </div>

      {/* button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          w-full
          bg-white
          text-black
          font-bold
          py-4
          rounded-2xl
          hover:scale-[1.02]
          transition
          disabled:opacity-50
        "
      >
        {loading
          ? 'Searching...'
          : 'Generate AI Travel Plan'}
      </button>

    </div>
  )
}