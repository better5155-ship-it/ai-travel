const enrichedDays = await Promise.all(
  aiPlan.days.map(async (day: any) => {

    const places = await Promise.all(
      day.places.map(async (p: any) => {

        const result: any = await searchPlaces(p.name, p)

        const place = result?.[0]

        if (!place) return null

        return {
          name: p.name,
          description: p.description,
          address: place.address_name,
          lat: Number(place.y ?? p.lat),
          lng: Number(place.x ?? p.lng),
        }
      })
    )

    return {
      day: day.day,
      places: places.filter(Boolean)
    }
  })
)