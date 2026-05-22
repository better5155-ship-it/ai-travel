import { NextResponse } from "next/server"
import { generatePlan } from "@/lib/ai/generatePlan"

export async function POST(req: Request) {

  const { destination, days } = await req.json()

  try {

    const plan = await generatePlan(destination, days)

    return NextResponse.json(plan)

  } catch (err) {

    console.error(err)

    return NextResponse.json(
      { error: "AI failed" },
      { status: 500 }
    )
  }
}