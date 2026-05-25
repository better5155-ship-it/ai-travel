import { NextResponse } from "next/server"

// =====================================================
// 🔥 도시 → 공항 코드
// =====================================================

async function getAirport(city: string) {

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL

  const res = await fetch(

    `${baseUrl}/api/airport`,

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ city })
    }
  )

  const data = await res.json()

  return data.airport
}

// =====================================================
// 🔥 항공권 parser
// =====================================================

function parseFlights(flights: any[]) {

  if (!Array.isArray(flights)) {
    return []
  }

  return flights
    .slice(0, 5)

    .map((f: any, index: number) => {

      const segment =
        f?.flights?.[0]

      return {

        // 🔥 고유 ID
        _id:

          `${segment?.airline}-` +

          `${segment?.departure_airport?.time}-` +

          `${f?.price}-` +

          `${index}`,

        airline:

          segment?.airline ||

          "Unknown Airline",

        departure_time:

          segment?.departure_airport?.time ||

          "N/A",

        arrival_time:

          segment?.arrival_airport?.time ||

          "N/A",

        price:

          f?.price ||

          f?.price_total ||

          0,

        duration:

          f?.total_duration ||

          0,

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

    const apiKey =
      process.env.SERPAPI_KEY!

    // =================================================
    // 🔥 공항 코드
    // =================================================

    const fromAirport =
      await getAirport(from)

    const toAirport =
      await getAirport(to)

    console.log(
      "FROM AIRPORT:",
      fromAirport
    )

    console.log(
      "TO AIRPORT:",
      toAirport
    )

    // =================================================
    // 🔥 OUTBOUND
    // =================================================

    const outboundUrl =

      `https://serpapi.com/search.json?engine=google_flights` +

      `&departure_id=${fromAirport}` +

      `&arrival_id=${toAirport}` +

      `&outbound_date=${departDate}` +

      `&type=2` +

      `&currency=KRW` +

      `&hl=ko` +

      `&api_key=${apiKey}`

    console.log("OUTBOUND URL:")
    console.log(outboundUrl)

    const outboundRes =
      await fetch(outboundUrl, {
        cache: "no-store"
      })

    const outboundData =
      await outboundRes.json()

    console.log("OUTBOUND DATA:")
    console.log(

      JSON.stringify(
        outboundData,
        null,
        2
      )
    )

    const outboundFlights =

      parseFlights(

        outboundData?.best_flights ||

        outboundData?.other_flights ||

        outboundData?.top_flights ||

        []

      )

    // =================================================
    // 🔥 RETURN
    // =================================================

    let returnFlights: any[] = []

    if (
      tripType === "round" &&
      returnDate
    ) {

      const returnUrl =

        `https://serpapi.com/search.json?engine=google_flights` +

        `&departure_id=${toAirport}` +

        `&arrival_id=${fromAirport}` +

        `&outbound_date=${returnDate}` +

        `&type=2` +

        `&currency=KRW` +

        `&hl=ko` +

        `&api_key=${apiKey}`

      console.log("RETURN URL:")
      console.log(returnUrl)

      const returnRes =
        await fetch(returnUrl, {
          cache: "no-store"
        })

      const returnData =
        await returnRes.json()

      console.log("RETURN DATA:")
      console.log(

        JSON.stringify(
          returnData,
          null,
          2
        )
      )

      returnFlights =

        parseFlights(

          returnData?.best_flights ||

          returnData?.other_flights ||

          returnData?.top_flights ||

          []

        )
    }

    console.log(
      "OUTBOUND COUNT:",
      outboundFlights.length
    )

    console.log(
      "RETURN COUNT:",
      returnFlights.length
    )

    return NextResponse.json({

      outboundFlights,

      returnFlights

    })

  } catch (err) {

    console.error(
      "FLIGHT API ERROR:",
      err
    )

    return NextResponse.json({

      outboundFlights: [],

      returnFlights: [],

      error: "Flight API failed"

    })
  }
}