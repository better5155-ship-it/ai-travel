export default function PlanResult({ plan }: any) {
  if (!plan) return null

  return (
    <div style={{ padding: 20 }}>
      <h1>{plan.destination}</h1>

      {plan.days.map((day: any) => (
        <div key={day.day} style={{ marginBottom: 20 }}>
          <h2>📅 Day {day.day}</h2>

          {day.places.map((p: any, i: number) => (
            <div
              key={i}
              style={{
                padding: 12,
                marginTop: 8,
                borderRadius: 10,
                background: "#f5f5f5",
              }}
            >
              📍 {p.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}