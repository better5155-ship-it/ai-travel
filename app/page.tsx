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
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white">

      {/* 🌍 free travel background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80')"
        }}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">

        <Hero />

        <LanguageDetectInput onSubmit={handleSubmit} />

      </div>

    </div>
  )
}