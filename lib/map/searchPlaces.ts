export async function searchPlaces(keyword: string): Promise<any[]> {

  const cleanKeyword = keyword
    .replace(/\(.*?\)/g, '')
    .replace(/-.*/g, '')
    .trim()

  // 🌍 Google fallback
  const googleSearch = async (): Promise<any[]> => {

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(cleanKeyword)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`

    try {
      const res = await fetch(url)
      const data = await res.json()

      return (data.results || []).map((p: any) => ({
        place_name: p.name,
        address_name: p.formatted_address,
        x: p.geometry.location.lng,
        y: p.geometry.location.lat,
      }))
    } catch {
      return []
    }
  }

  // 🇰🇷 Kakao search
  const kakaoSearch = (): Promise<any[]> => {
    return new Promise((res) => {

      const kakao = (window as any).kakao
      if (!kakao) return res([])

      kakao.maps.load(() => {
        const ps = new kakao.maps.services.Places()

        ps.keywordSearch(cleanKeyword, (data: any, status: any) => {

          if (status === kakao.maps.services.Status.OK) {
            res(data)
          } else {
            res([])
          }

        })
      })
    })
  }

  // 🔥 핵심 FIX: 타입 명시
  let result: any[] = []

  const isKoreaQuery =
    /korea|seoul|busan|jeju|한국|서울|부산|제주/i.test(cleanKeyword)

  if (isKoreaQuery) {
    result = await kakaoSearch()
  }

  if (!result || result.length === 0) {
    result = await googleSearch()
  }

  return result
}