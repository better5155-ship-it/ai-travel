interface Props {
  plan: any
}

export default function PlanResult({ plan }: Props) {

  if (!plan) {
    return (
      <div className="text-gray-400">
        No plan generated yet.
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {plan.days.map((day: any) => (

        <div
          key={day.day}
          className="bg-white/5 p-5 rounded-2xl border border-white/10"
        >

          <h2 className="text-2xl font-bold mb-4">
            Day {day.day}
          </h2>

          <div className="space-y-3">

            {day.places.map((place: any, idx: number) => (

              <div
                key={idx}
                className="bg-black/30 p-4 rounded-xl"
              >
                <div className="font-semibold text-lg">
                  📍 {place.name}
                </div>

                <div className="text-gray-400 text-sm mt-1">
                  {place.address}
                </div>
              </div>

            ))}

          </div>

        </div>

      ))}

    </div>
  )
}