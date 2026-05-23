'use client'

import { useRouter } from 'next/navigation'
import Hero from '@/components/home/Hero'
import LanguageDetectInput from '@/components/home/LanguageDetectInput'

export default function Home() {

  const router = useRouter()

  const handleSubmit = (destination: string, days: number) => {

    // 👉 plan 페이지로 state 전달 (query 제거)
    sessionStorage.setItem("destination", destination)
    sessionStorage.setItem("days", String(days))

    router.push("/plan")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">

      <Hero />

      <LanguageDetectInput onSubmit={handleSubmit} />

    </div>
  )
}