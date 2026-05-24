'use client'

import { useEffect } from 'react'

export default function KakaoLoader() {

  useEffect(() => {

    const script = document.createElement("script")

    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=3d112e0ba8776ccde7a66d1867f26b39&autoload=false"

    script.async = true

    document.head.appendChild(script)

  }, [])

  return null
}