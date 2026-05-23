import { NextResponse } from "next/server"
import { detectLanguage } from "@/lib/utils/language"

export async function POST(req: Request) {

  const { destination, days } = await req.json()

  const lang = detectLanguage(destination)

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [{
        role: "user",
        content: `
You are a travel planner.

Language: ${lang}

RULES:
- If lang is "ko", respond in Korean names
- If lang is "en", respond in English names

Return ONLY JSON.

FORMAT:
{
  "destination": "${destination}",
  "region": "korea or global",
  "language": "${lang}",
  "days": [
    {
      "day": 1,
      "places": [
        {
          "name": "",
          "lat": 0,
          "lng": 0
        }
      ]
    }
  ]
}
`
      }]
    })
  })

  const data = await res.json()
  const content = data.choices[0].message.content

  const json = JSON.parse(content.match(/\{[\s\S]*\}/)[0])

  return NextResponse.json(json)
}