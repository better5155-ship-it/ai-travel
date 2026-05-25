'use client'

import { useEffect, useRef } from "react"

export default function KakaoMapView({
  places = [],
}: any) {

  const mapRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {

    const kakao =
      (window as any).kakao

    if (
      !kakao ||
      !mapRef.current ||
      !places.length
    ) return

    const center =
      new kakao.maps.LatLng(
        places[0].lat,
        places[0].lng
      )

    const map =
      new kakao.maps.Map(
        mapRef.current,
        {
          center,
          level: 7,
        }
      )

    const colors = [
      "#ef4444",
      "#3b82f6",
      "#22c55e",
      "#eab308",
      "#a855f7",
      "#ec4899",
      "#f97316",
      "#06b6d4",
      "#84cc16",
      "#f43f5e",
      "#6366f1",
      "#14b8a6",
      "#8b5cf6",
      "#10b981",
    ]

    places.forEach((p: any) => {

      // 🔥 marker
      new kakao.maps.Marker({

        map,

        position:
          new kakao.maps.LatLng(
            p.lat,
            p.lng
          ),
      })

      // 🔥 숫자 badge
      const overlay =
        new kakao.maps.CustomOverlay({

          position:
            new kakao.maps.LatLng(
              p.lat,
              p.lng
            ),

          yAnchor: 1.8,

          content:
            `
            <div
              style="
                width:28px;
                height:28px;

                border-radius:999px;

                background:${colors[(p.day - 1) % colors.length]};

                color:white;

                display:flex;
                align-items:center;
                justify-content:center;

                font-size:14px;
                font-weight:bold;

                border:2px solid white;

                box-shadow:0 2px 6px rgba(0,0,0,0.3);
              "
            >
              ${p.day}
            </div>
            `,
        })

      overlay.setMap(map)
    })

    // 🔥 장소 연결선
    for (
      let i = 0;
      i < places.length - 1;
      i++
    ) {

      const linePath = [

        new kakao.maps.LatLng(
          places[i].lat,
          places[i].lng
        ),

        new kakao.maps.LatLng(
          places[i + 1].lat,
          places[i + 1].lng
        ),
      ]

      new kakao.maps.Polyline({

        map,

        path: linePath,

        strokeWeight: 5,

        strokeColor:
          colors[
            (places[i].day - 1)
            % colors.length
          ],

        strokeOpacity: 0.8,
      })
    }

  }, [places])

  return (

    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "600px",
      }}
    />

  )
}