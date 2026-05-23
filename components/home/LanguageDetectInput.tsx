'use client'

import { useState } from 'react'

function detectLanguage(text: string) {
  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  return koreanRegex.test(text) ? "ko" : "en"
}

export default function LanguageDetectInput({
  onSubmit
}: {
  onSubmit: (destination: string, days: number) => void
}) {

  const [destination, setDestination] = useState('')
  const [days, setDays] = useState(3)

  const lang = detectLanguage(destination)

  return (
    <div className="space-y-4 w-full max-w-md">

      {/* 입력 */}
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="서울 / Seoul / Tokyo"
        className="w-full p-3 rounded bg-white/10"
      />

      {/* 언어 표시 */}
      <p className="text-sm text-white/50">
        Detected language: {lang}
      </p>

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

      {/* 버튼 */}
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