'use client'

import { useState } from 'react'

export default function PlanForm({ onResult }: any) {

  const [destination, setDestination] = useState('')
  const [days, setDays] = useState(3)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {

    try {

      setLoading(true)

      // 🚀 1. OpenAI API Route 호출 (서버에서만 AI 실행)
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          days,
        }),
      })

      const aiPlan = await res.json()

      if (!aiPlan?.days) {
        throw new Error('Invalid AI response')
      }

      // 🚀 2. 그대로 UI로 전달
      onResult({
        destination,
        days: aiPlan.days,
      })

    } catch (err) {

      console.error(err)
      alert('AI plan generation failed')

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="space-y-5">

      {/* destination */}
      <input
        type="text"
        placeholder="Destination (Tokyo, Seoul...)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full p-4 rounded-xl bg-black/30 border border-white/10"
      />

      {/* days */}
      <select
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="w-full p-4 rounded-xl bg-black/30 border border-white/10"
      >

        {Array.from({ length: 14 }).map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} Days
          </option>
        ))}

      </select>

      {/* button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-white text-black font-bold py-4 rounded-xl"
      >
        {loading ? 'Generating AI Plan...' : 'Generate Plan'}
      </button>

    </div>
  )
}