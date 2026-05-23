export function optimizeRoute(places: any[]) {

  if (!places || places.length === 0) return []

  const result = []
  let current = places[0]
  const remaining = [...places].slice(1)

  result.push(current)

  while (remaining.length > 0) {

    let nearestIndex = 0
    let nearestDist = Infinity

    remaining.forEach((p, i) => {

      const d =
        Math.pow(current.lat - p.lat, 2) +
        Math.pow(current.lng - p.lng, 2)

      if (d < nearestDist) {
        nearestDist = d
        nearestIndex = i
      }

    })

    current = remaining.splice(nearestIndex, 1)[0]
    result.push(current)
  }

  return result
}