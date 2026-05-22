import MapView from "../map/MapView"

export default function PlanResult({ plan }: any) {
  if (!plan) return null

  return (
    <div>
      <h2>{plan.destination}</h2>

      {plan.days.map((day: any) => (
        <div key={day.day}>
          <h3>Day {day.day}</h3>
          <ul>
            {day.places.map((p: any, i: number) => (
              <li key={i}>{p.name}</li>
            ))}
          </ul>
        </div>
      ))}

      <MapView plan={plan} />
    </div>
  )
}