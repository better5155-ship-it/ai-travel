export function optimizeRoute(places: any[]) {

  const valid = places.filter(p => p.lat && p.lng)

  if (valid.length <= 2) return valid

  const result = [valid[0]]
  const visited = new Set()
  visited.add(0)

  let current = valid[0]

  while (result.length < valid.length) {

    let nearestIndex = -1
    let nearestDist = Infinity

    valid.forEach((p, i) => {

      if (visited.has(i)) return

      const dx = current.lat - p.lat
      const dy = current.lng - p.lng
      const dist = dx * dx + dy * dy

      if (dist < nearestDist) {
        nearestDist = dist
        nearestIndex = i
      }
    })

    if (nearestIndex === -1) break

    visited.add(nearestIndex)
    current = valid[nearestIndex]
    result.push(current)
  }

  return result
}