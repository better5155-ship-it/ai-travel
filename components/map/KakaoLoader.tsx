'use client'

import { useEffect } from "react"

export default function KakaoLoader() {

  useEffect(() => {

    console.log("KakaoLoader mounted")

    // 이미 로드된 경우
    if ((window as any).kakao) {
      console.log("Kakao already loaded")
      return
    }

    const existingScript = document.getElementById("kakao-map-sdk")

    if (existingScript) {
      console.log("Script already exists")
      return
    }

    const script = document.createElement("script")

    script.id = "kakao-map-sdk"

    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=3d112e0ba8776ccde7a66d1867f26b39&autoload=false&libraries=services"

    script.async = true
    script.onload = () => {
      console.log("Kakao SDK loaded SUCCESS")
      console.log((window as any).kakao)
    }

    script.onerror = () => {
      console.log("Kakao SDK FAILED")
    }

    document.head.appendChild(script)

  }, [])

  return null
}
