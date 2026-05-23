'use client'

import { useEffect, useRef } from 'react'

export default function KakaoMap({ places }: any) {

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const kakao = (window as any).kakao
    if (!ref.current || !kakao) return

    const map = new kakao.maps.Map(ref.current, {
      center: new kakao.maps.LatLng(
        places?.[0]?.lat || 37.5665,
        places?.[0]?.lng || 126.9780
      ),
      level: 5
    })

    const bounds = new kakao.maps.LatLngBounds()

    places.forEach((p: any) => {

      const pos = new kakao.maps.LatLng(p.lat, p.lng)

      new kakao.maps.Marker({
        map,
        position: pos
      })

      bounds.extend(pos)
    })

    map.setBounds(bounds)

  }, [places])

  return <div ref={ref} className="w-full h-[500px]" />
}