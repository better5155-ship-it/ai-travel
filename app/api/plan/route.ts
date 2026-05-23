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
You are a professional travel planner and route optimizer.

Return ONLY valid JSON.

---

CRITICAL RULES:

1. MUST include:
   - destination
   - region ("korea" or "global")
   - days array

2. EACH day MUST include:
   - day number
   - hotel object (starting/ending point)
   - places array (already ordered travel route)

3. Each place MUST include:
   - name
   - description
   - lat
   - lng

4. ROUTE RULES:
   - Places MUST be in optimized visiting order (nearest-first logic)
   - Insert cafes and restaurants naturally between attractions
   - Every day MUST start and end at the hotel

5. EXPERIENCE RULES:
   - Mix attractions + food + cafe
   - Avoid repeating same category in a row
   - Make itinerary realistic like Airbnb / Tripadvisor travel plan

---

OUTPUT FORMAT:

{
  "destination": "${destination}",
  "region": "korea | global",
  "days": [
    {
      "day": 1,
      "hotel": {
        "name": "string",
        "lat": 0,
        "lng": 0
      },
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

Create a ${days}-day optimized travel route for ${destination}.
`
        }
      ]
    })

    const content = res.choices[0]?.message?.content || ""

    // 🔥 JSON extraction safety
    const match = content.match(/\{[\s\S]*\}/)

    if (!match) {
      console.error("RAW AI OUTPUT:", content)
      return NextResponse.json(
        { error: "invalid ai response" },
        { status: 500 }
      )
    }

    let parsed

    try {
      parsed = JSON.parse(match[0])
    } catch (err) {
      console.error("PARSE ERROR:", content)
      return NextResponse.json(
        { error: "json parse failed" },
        { status: 500 }
      )
    }

    return NextResponse.json(parsed)

  } catch (err: any) {

    console.error("API ERROR:", err)

    return NextResponse.json(
      {
        error: true,
        message: err.message || "AI failed"
      },
      { status: 500 }
    )
  }
}