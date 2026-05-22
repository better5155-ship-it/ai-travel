'use client'

import { useEffect } from "react"

export default function KakaoLoader() {

  useEffect(() => {

    // 이미 로드된 경우
    if ((window as any).kakao) return

    const script = document.createElement("script")

    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=3d112e0ba8776ccde7a66d1867f26b39&autoload=false&libraries=services"

    script.async = true

    document.head.appendChild(script)

    script.onload = () => {
      console.log("Kakao SDK loaded")
    }

  }, [])

  return null
}