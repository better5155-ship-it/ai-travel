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

Rules:
- Use real famous places only
- Do NOT include lat/lng

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

    const content = res.choices[0].message.content

    if (!content) {
      throw new Error("Empty AI response")
    }

    let parsed

    try {
      parsed = JSON.parse(content)
    } catch (e) {
      console.error("RAW AI OUTPUT:", content)
      throw new Error("Invalid AI response")
    }

    return NextResponse.json(parsed)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "AI plan generation failed" },
      { status: 500 }
    )
  }
}