'use client'

import Hero from '@/components/home/Hero'
import LanguageDetectInput from '@/components/home/LanguageDetectInput'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  const handleSubmit = (destination: string, days: number) => {
    sessionStorage.setItem("destination", destination)
    sessionStorage.setItem("days", String(days))
    router.push("/plan")
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* BACKGROUND WRAPPER (핵심) */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')"
          }}
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white space-y-8">

        <Hero />

        <LanguageDetectInput onSubmit={handleSubmit} />

      </div>

    </div>
  )
}