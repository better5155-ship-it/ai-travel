import { TravelPlan } from "@/types/plan"

export type PlanInput = {
  destination: string
  days: number
}

export async function generatePlan(input: PlanInput): Promise<TravelPlan> {
  // 🔥 현재: Mock 로직 (AI 자리)
  const mock: TravelPlan = {
    destination: input.destination,
    days: Array.from({ length: input.days }).map((_, i) => ({
      day: i + 1,
      places: [
        {
          name: `${input.destination} Spot A`,
          lat: 37.5665 + Math.random() * 0.01,
          lng: 126.978 + Math.random() * 0.01,
          description: "Auto generated place"
        },
        {
          name: `${input.destination} Spot B`,
          lat: 37.5665 + Math.random() * 0.02,
          lng: 126.978 + Math.random() * 0.02,
          description: "Auto generated place"
        }
      ]
    }))
  }

  return mock

  // 👉 나중에 AI 붙일 때 여기만 교체
  // const res = await fetch('/api/ai-plan', ...)
  // return res.json()
}