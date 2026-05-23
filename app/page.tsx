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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white space-y-8">

      <Hero />

      <LanguageDetectInput onSubmit={handleSubmit} />

    </div>
  )
}