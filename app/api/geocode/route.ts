import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const { destination } = await req.json()

    const url =
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${process.env.GOOGLE_MAPS_API_KEY}`

    const res = await fetch(url)

    const data = await res.json()

    console.log(data)

    if (!data.results?.length) {

      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      )
    }

    const result = data.results[0]

    const location =
      result.geometry.location

    const countryComp =
      result.address_components.find(
        (c: any) =>
          c.types.includes("country")
      )

    const country =
      countryComp?.short_name || "UNKNOWN"

    return NextResponse.json({
      country,
      lat: location.lat,
      lng: location.lng,
    })

  } catch (err) {

    console.error(err)

    return NextResponse.json(
      { error: "Geocode failed" },
      { status: 500 }
    )
  }
}