import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {

  try {

    const {
      destination,
      departDate,
      returnDate,
      selectedFlights
    } = await req.json()

    // =====================================================
    // 🔥 여행 일수 계산
    // =====================================================

    const start = new Date(departDate)

    const end = new Date(returnDate)

    const diff =

      Math.ceil(

        (end.getTime() - start.getTime()) /

        (1000 * 60 * 60 * 24)

      ) + 1

    // =====================================================
    // 🔥 항공권 정보
    // =====================================================

    const outboundFlight =
      selectedFlights?.[0]

    const returnFlight =
      selectedFlights?.[1]

    // =====================================================
    // 🔥 AI PROMPT
    // =====================================================

    const prompt = `

Generate a realistic ${diff}-day travel itinerary for ${destination}.

IMPORTANT:

- Return ONLY valid JSON
- No markdown
- No explanations

Travel Info:

Outbound Flight:
- Departure Time: ${outboundFlight?.departure_time}
- Arrival Time: ${outboundFlight?.arrival_time}

Return Flight:
- Departure Time: ${returnFlight?.departure_time}
- Arrival Time: ${returnFlight?.arrival_time}

Requirements:

- First day should be lighter if arrival is late
- Last day should include airport travel
- Optimize travel routes naturally
- Include famous tourist attractions
- Include restaurants/cafes/shopping if appropriate
- Avoid unrealistic schedules
- Each day should contain 3-6 activities

Format:

{
  "days": [
    {
      "day": 1,
      "activities": [
        "Visit Shibuya",
        "Dinner at Ichiran",
        "Tokyo Tower"
      ]
    }
  ]
}

`

    // =====================================================
    // 🔥 OPENAI
    // =====================================================

    const response =

      await openai.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      })

    const content =
      response.choices[0].message.content || "{}"

    console.log("AI RAW RESPONSE:")
    console.log(content)

    const parsed = JSON.parse(content)

    return NextResponse.json(parsed)

  } catch (err) {

    console.error(err)

    return NextResponse.json(
      {
        error: "AI plan generation failed",
      },
      {
        status: 500,
      }
    )
  }
}