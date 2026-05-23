'use client'

import { useRouter } from 'next/navigation'
import Hero from '@/components/home/Hero'
import LanguageDetectInput from '@/components/home/LanguageDetectInput'

export default function HomePage() {

  const router = useRouter()

  const handleSubmit = (destination: string, days: number) => {

    // plan 페이지로 이동하면서 값 전달
    router.push(
      `/plan?destination=${encodeURIComponent(destination)}&days=${days}`
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">

      {/* 타이틀 */}
      <Hero />

      {/* 입력 UI */}
      <div className="mt-10 w-full flex justify-center">
        <LanguageDetectInput onSubmit={handleSubmit} />
      </div>

    </div>
  )
}