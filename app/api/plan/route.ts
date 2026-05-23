import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { destination, days } = await req.json()

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
Return ONLY JSON.

destination: ${destination}
days: ${days}

FORMAT:
{
  "destination": "${destination}",
  "region": "korea or global",
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

Rules:
- real places
- valid lat/lng
`
      }]
    })
  })

  const data = await res.json()
  const content = data.choices[0].message.content

  const json = JSON.parse(content.match(/\{[\s\S]*\}/)[0])

  return NextResponse.json(json)
}