export default function PlanResult({ plan }: any) {
  if (!plan) return null

  return (
    <div className="mt-6">

      <h2 className="text-2xl font-bold mb-4">
        📍 {plan.destination}
      </h2>

      <div className="grid gap-3">

        {plan.places.map((place: any) => (
          <div
            key={place.id}
            className="bg-white/10 p-4 rounded-xl"
          >
            <h3 className="font-semibold">
              {place.place_name}
            </h3>

            <p className="text-sm text-white/70">
              {place.address_name}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}