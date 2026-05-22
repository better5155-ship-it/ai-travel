import { openai } from "@/lib/ai/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { destination, days } = await req.json()

  try {

    const res = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `
You are a travel planner.

Return ONLY valid JSON.

CRITICAL RULES:
- Use ONLY famous real landmarks
- NO explanations in names
- NO country names
- NO "area", NO "district"
- NO parentheses, NO hyphens
- Must be searchable in Kakao Maps

GOOD:
- Tokyo Tower
- Shibuya Crossing
- Sensoji Temple

BAD:
- Tokyo Tower (Japan)
- Shibuya area
- Tokyo sightseeing district

Format:

{
  "destination": "${destination}",
  "days": [
    {
      "day": 1,
      "places": [
        {
          "name": "string",
          "description": "string"
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

    // 🔥 JSON 안정 추출
    const match = content.match(/\{[\s\S]*\}/)

    if (!match) {
      console.error("RAW AI:", content)
      throw new Error("Invalid AI response")
    }

    const parsed = JSON.parse(match[0])

    return NextResponse.json(parsed)

  } catch (err: any) {

    console.error(err)

    return NextResponse.json(
      { error: "AI plan generation failed" },
      { status: 500 }
    )
  }
}