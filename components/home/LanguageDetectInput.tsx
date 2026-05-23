'use client'

import { useState } from 'react'

export default function LanguageDetectInput({
  onSubmit
}: any) {

  const [destination, setDestination] = useState('')
  const [days, setDays] = useState(3)

  return (
    <div className="w-full max-w-md space-y-4">

      {/* input */}
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="서울 / Tokyo / Paris"
        className="w-full p-3 rounded bg-white/10"
      />

      {/* days */}
      <select
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="w-full p-3 rounded bg-white/10"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1} days
          </option>
        ))}
      </select>

      {/* button */}
      <button
        onClick={() => onSubmit(destination, days)}
        disabled={!destination}
        className="w-full bg-white text-black p-3 rounded"
      >
        Generate Plan
      </button>

    </div>
  )
}