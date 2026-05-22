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

Return ONLY valid JSON. No explanation, no markdown.

Format exactly like this:

{
  "destination": "${destination}",
  "days": [
    {
      "day": 1,
      "places": [
        {
          "name": "string",
          "lat": 0,
          "lng": 0,
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
    } catch (err) {
      console.error("❌ RAW AI OUTPUT:", content)
      throw new Error("AI returned invalid JSON")
    }

    return NextResponse.json(parsed)

  } catch (err: any) {

    console.error("❌ API ERROR:", err)

    return NextResponse.json(
      {
        error: err.message || "AI plan generation failed"
      },
      { status: 500 }
    )
  }
}