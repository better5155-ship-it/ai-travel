import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {

  const { city } = await req.json()

  const prompt = `
You are an airport code system.

Return ONLY the IATA airport code.

Rules:
- Must be exactly 3 uppercase letters
- No explanation
- No markdown
- No JSON
- Only the airport code

Examples:
Seoul -> ICN
Tokyo -> NRT
New York -> JFK
Paris -> CDG

City:
${city}
`

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      }
    ],
    temperature: 0,
  })

  const airport =
    res.choices[0].message.content
      ?.trim()
      ?.replace(/[^A-Z]/g, "")
      ?.slice(0, 3) || "ICN"

  console.log(city, "→", airport)

  return NextResponse.json({
    airport
  })
}