import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST() {

  const prompt = `
You are a travel planner AI.

Generate ONE random travel plan.

Rules:
- from must be a real city where people commonly depart (e.g. Seoul, Tokyo, London, New York)
- to must be a real travel destination city (different country preferred)
- Return ONLY JSON

Format:
{
  "from": "...",
  "to": "..."
}
`

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 1,
  })

  let data

  try {
    data = JSON.parse(res.choices[0].message.content || "{}")
  } catch (e) {
    data = { from: "Seoul", to: "Tokyo" }
  }

  return NextResponse.json(data)
}