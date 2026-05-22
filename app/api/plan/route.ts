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

IMPORTANT:
You must decide region.

Rules:
- If destination is in Korea → "region": "korea"
- Otherwise → "region": "global"

Return format:

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
          "lat": number,
          "lng": number
        }
      ]
    }
  ]
}

Create a ${days}-day travel plan for ${destination}.
`
      }
    ]
  })

  const content = res.choices[0]?.message?.content || ""

  const match = content.match(/\{[\s\S]*\}/)

  if (!match) {
    return NextResponse.json(
      { error: "Invalid AI response" },
      { status: 500 }
    )
  }

  return NextResponse.json(JSON.parse(match[0]))
}