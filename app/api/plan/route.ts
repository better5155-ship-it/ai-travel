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
          content: `Create ${days} day travel plan for ${destination}`
        }
      ]
    })

    return NextResponse.json({
      result: res.choices[0].message.content
    })

  } catch (err: any) {

    console.error(err)

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}