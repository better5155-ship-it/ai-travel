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
- No explanation
- No markdown
- No \`\`\`
- JSON must be pure

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

    let content = res.choices[0]?.message?.content || ""

    // 🔥 핵심: JSON만 추출 (안전장치)
    const jsonMatch = content.match(/\{[\s\S]*\}/)

    if (!jsonMatch) {
      console.error("RAW AI OUTPUT:", content)
      throw new Error("No JSON found in AI response")
    }

    let parsed

    try {
      parsed = JSON.parse(jsonMatch[0])
    } catch (err) {
      console.error("PARSE FAILED RAW:", content)
      throw new Error("Invalid JSON format from AI")
    }

    return NextResponse.json(parsed)

  } catch (err: any) {
    console.error("API ERROR:", err)

    return NextResponse.json(
      {
        error: err.message || "AI plan generation failed"
      },
      { status: 500 }
    )
  }
}