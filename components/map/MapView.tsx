'use client'

import { useEffect, useRef } from "react"

export default function MapView({ plan }: any) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // 👉 나중에 Google Maps / Kakao Map 여기서 교체
    ref.current.innerHTML = "[MAP PLACEHOLDER]"

    console.log("Render map with:", plan)
  }, [plan])

  return (
    <div
      ref={ref}
      style={{ height: "300px", background: "#eee" }}
    />
  )
}