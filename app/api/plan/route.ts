import { openai } from "@/lib/ai/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { destination, days } = await req.json()

  const res = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: `
You are a travel planner.

Return ONLY valid JSON.

CRITICAL RULE:
You MUST include approximate lat/lng (for map display).
If unknown, estimate near city center.

Format:
{
  "destination": "${destination}",
  "days": [
    {
      "day": 1,
      "places": [
        {
          "name": "Tokyo Tower",
          "description": "...",
          "lat": 35.6586,
          "lng": 139.7454
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
    return NextResponse.json({ error: "invalid AI" }, { status: 500 })
  }

  return NextResponse.json(JSON.parse(match[0]))
}