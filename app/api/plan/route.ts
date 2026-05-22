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

    console.log("OPENAI RAW:", res)

    return Response.json({
      raw: res.choices[0].message.content
    })

  } catch (err: any) {

    console.error("OPENAI ERROR:", err)

    return Response.json({
      error: err?.message || "unknown error"
    }, { status: 500 })

  }
}