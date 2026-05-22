import { openai } from "./openai"

export async function generatePlan(destination: string, days: number) {

  const prompt = `
You are a travel planner.

Create a ${days}-day itinerary for ${destination}.

Return ONLY JSON:

{
  "days": [
    {
      "day": 1,
      "places": ["place1", "place2"]
    }
  ]
}

Rules:
- real places only
- 2~3 places per day
- no explanation
`

  const res = await openai.chat.completions.create({
    model: "gpt-4.1-mini",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.7,
  })

  return JSON.parse(res.choices[0].message.content || "{}")
}