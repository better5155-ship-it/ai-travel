import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const {
      region,
      origin,
      destination,
    } = await req.json()

    // =========================
    // 1️⃣ GOOGLE DIRECTIONS (공통)
    // =========================

    const googleUrl =
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=transit&key=${process.env.GOOGLE_MAPS_API_KEY}`

    let res = await fetch(googleUrl)
    let data = await res.json()

    // fallback driving
    if (!data.routes?.length) {

      const driveUrl =
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=driving&key=${process.env.GOOGLE_MAPS_API_KEY}`

      res = await fetch(driveUrl)
      data = await res.json()
    }

    const route =
      data.routes?.[0]

    const leg =
      route?.legs?.[0]

    const distanceKm =
      (leg?.distance?.value || 0) / 1000

    const durationSec =
      leg?.duration?.value || 0

    const durationMin =
      durationSec / 60

    // =========================
    // 2️⃣ 기본 요금 (해외 fallback)
    // =========================

    const transitFareGlobal =
      1.5 + distanceKm * 0.3

    const taxiFareGlobal =
      3 + distanceKm * 1.2

    // =========================
    // 3️⃣ 🇰🇷 KAKAO TAXI (핵심 추가)
    // =========================

    let taxiFareKorea: number | null = null

    if (region === "korea") {

      try {

        const kakaoRes = await fetch(
          `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin.lng},${origin.lat}&destination=${destination.lng},${destination.lat}`,
          {
            headers: {
              Authorization:
                `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
            },
          }
        )

        const kakaoData =
          await kakaoRes.json()

        taxiFareKorea =
          kakaoData.routes?.[0]?.summary?.fare?.taxi || null

      } catch (err) {

        console.error("Kakao API error:", err)
      }
    }

    // =========================
    // 4️⃣ 교통수단 판별
    // =========================

    let trafficType = "대중교통"

    const step =
      leg?.steps?.find(
        (s: any) =>
          s.travel_mode === "TRANSIT"
      )

    if (step?.transit_details) {

      const type =
        step.transit_details.line.vehicle.type

      if (type === "SUBWAY") trafficType = "지하철"
      else if (type === "BUS") trafficType = "버스"
    }

    // =========================
    // 5️⃣ 최종 반환
    // =========================

    return NextResponse.json({

      duration:
        `${Math.round(durationMin)}분`,

      distance:
        `${distanceKm.toFixed(1)}km`,

      trafficType,

      // 🚇 대중교통 요금
      transitFare:
        route?.fare?.text ||
        `약 $${transitFareGlobal.toFixed(2)}`,

      // 🚕 택시 요금 (핵심 통합)
      taxiFare:
        region === "korea"
          ? (taxiFareKorea
              ? `${taxiFareKorea.toLocaleString()}원`
              : `약 ₩${Math.round(3000 + distanceKm * 1200)}`)
          : `약 $${taxiFareGlobal.toFixed(2)}`,

      polyline:
        route?.overview_polyline?.points || "",
    })

  } catch (err) {

    console.error(err)

    return NextResponse.json(
      { error: "Route API failed" },
      { status: 500 }
    )
  }
}