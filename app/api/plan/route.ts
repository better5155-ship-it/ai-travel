import { openai } from "@/lib/ai/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const { destination, days } = await req.json()

    const res = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `
You are a travel planner.

Return ONLY valid JSON.

RULES:
- MUST include region: "korea" or "global"
- MUST include days array
- MUST include places array inside each day
- EACH place MUST have lat and lng (estimate if needed)

FORMAT:

{
  "destination": "${destination}",
  "region": "korea | global",
  "days": [
    {
      "day": 1,
      "places": [
        {
          "name": "string",
          "description": "string",
          "lat": 0,
          "lng": 0
        }
      ]
    }
  ]
}

Make a ${days}-day itinerary for ${destination}.
`
        }
      ]
    })

    const content = res.choices[0]?.message?.content || ""

    const match = content.match(/\{[\s\S]*\}/)

    if (!match) {
      return NextResponse.json(
        { error: "invalid ai response" },
        { status: 500 }
      )
    }

    const parsed = JSON.parse(match[0])

    return NextResponse.json(parsed)

  } catch (err: any) {

    return NextResponse.json(
      {
        error: true,
        message: err.message || "AI failed"
      },
      { status: 500 }
    )
  }
}