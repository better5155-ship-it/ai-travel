'use client'

import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [lang, setLang] = useState<'en' | 'kr'>('en')

  const content = {
    en: {
      title: "Travel AI",
      subtitle: "Plan your perfect trip with AI",
      button: "Start Planning"
    },
    kr: {
      title: "트래블 AI",
      subtitle: "AI가 만들어주는 완벽한 여행",
      button: "여행 시작하기"
    }
  }

  return (
    <div className="relative h-screen flex items-center justify-center text-white">

      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')"
        }}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* language */}
      <div className="absolute top-5 right-5 flex gap-2 z-10">
        <button
          onClick={() => setLang('en')}
          className="px-3 py-1 border rounded-md text-sm hover:bg-white hover:text-black"
        >
          EN
        </button>
        <button
          onClick={() => setLang('kr')}
          className="px-3 py-1 border rounded-md text-sm hover:bg-white hover:text-black"
        >
          KR
        </button>
      </div>

      {/* content */}
      <div className="relative text-center z-10 max-w-xl px-4">
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight">
          {content[lang].title}
        </h1>

        <p className="text-lg text-white/80 mb-8">
          {content[lang].subtitle}
        </p>

        <Link
          href="/plan"
          className="inline-block px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          {content[lang].button}
        </Link>
      </div>
    </div>
  )
}