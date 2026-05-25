import { NextResponse } from "next/server"

async function getAirport(city: string) {

  const res = await fetch("http://localhost:3000/api/airport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ city })
  })

  const data = await res.json()

  return data.airport
}

// 🔥 항공권 parser
function parseFlights(flights: any[]) {

  if (!Array.isArray(flights)) {
    return []
  }

  return flights.slice(0, 5).map((f: any) => {

    const segment = f?.flights?.[0]

    console.log("SEGMENT:")
    console.log(JSON.stringify(segment, null, 2))

    return {

      airline:
        segment?.airline ||
        "Unknown Airline",

      // 🔥 시간 필드 수정
      departure_time:
        segment?.departure_airport?.time ||
        segment?.departure_time ||
        "N/A",

      arrival_time:
        segment?.arrival_airport?.time ||
        segment?.arrival_time ||
        "N/A",

      // 🔥 가격
      price:
        f?.price ||
        f?.price_total ||
        0,

      // 🔥 총 비행 시간
      duration:
        f?.total_duration ||
        0,

      // 🔥 경유 횟수
      stops:
        f?.layovers?.length ||
        0
    }
  })
}

export async function POST(req: Request) {

  try {

    const {
      from,
      to,
      departDate,
      returnDate,
      tripType
    } = await req.json()

    const apiKey = process.env.SERPAPI_KEY!

    // 🔥 도시 → 공항 코드
    const fromAirport = await getAirport(from)
    const toAirport = await getAirport(to)

    console.log("FROM AIRPORT:", fromAirport)
    console.log("TO AIRPORT:", toAirport)

    // =====================================================
    // 🔥 OUTBOUND (편도 검색)
    // =====================================================

    const outboundUrl =
      `https://serpapi.com/search.json?engine=google_flights` +
      `&departure_id=${fromAirport}` +
      `&arrival_id=${toAirport}` +
      `&outbound_date=${departDate}` +
      `&type=2` +
      `&currency=KRW` +
      `&hl=ko` +
      `&api_key=${apiKey}`

    console.log("OUTBOUND URL:", outboundUrl)

    const outboundRes = await fetch(outboundUrl, {
      cache: "no-store"
    })

    const outboundData = await outboundRes.json()

    console.log("OUTBOUND DATA:")
    console.log(JSON.stringify(outboundData, null, 2))

    const outboundFlights = parseFlights(

      outboundData?.best_flights ||
      outboundData?.other_flights ||
      outboundData?.top_flights ||
      []

    )

    // =====================================================
    // 🔥 RETURN (편도 검색)
    // =====================================================

    let returnFlights: any[] = []

    if (tripType === "round" && returnDate) {

      const returnUrl =
        `https://serpapi.com/search.json?engine=google_flights` +
        `&departure_id=${toAirport}` +
        `&arrival_id=${fromAirport}` +
        `&outbound_date=${returnDate}` +
        `&type=2` +
        `&currency=KRW` +
        `&hl=ko` +
        `&api_key=${apiKey}`

      console.log("RETURN URL:", returnUrl)

      const returnRes = await fetch(returnUrl, {
        cache: "no-store"
      })

      const returnData = await returnRes.json()

      console.log("RETURN DATA:")
      console.log(JSON.stringify(returnData, null, 2))

      returnFlights = parseFlights(

        returnData?.best_flights ||
        returnData?.other_flights ||
        returnData?.top_flights ||
        []

      )
    }

    console.log("OUTBOUND COUNT:", outboundFlights.length)
    console.log("RETURN COUNT:", returnFlights.length)

    return NextResponse.json({
      outboundFlights,
      returnFlights
    })

  } catch (err) {

    console.error("FLIGHT API ERROR:", err)

    return NextResponse.json({
      outboundFlights: [],
      returnFlights: [],
      error: "Flight API failed"
    })
  }
}