export function enrichPOI(places: any[]) {

  const enriched = []

  for (let i = 0; i < places.length; i++) {

    enriched.push(places[i])

    // 🔥 2~3개마다 카페/식당 삽입
    if (i % 2 === 1) {

      enriched.push({
        name: "Recommended Café",
        type: "cafe",
        lat: places[i].lat + 0.001,
        lng: places[i].lng + 0.001
      })
    }

    if (i % 3 === 2) {

      enriched.push({
        name: "Local Restaurant",
        type: "restaurant",
        lat: places[i].lat - 0.001,
        lng: places[i].lng - 0.001
      })
    }
  }

  return enriched
}