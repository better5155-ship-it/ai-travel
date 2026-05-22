export async function searchPlaces(keyword: string) {
  return new Promise(async (resolve, reject) => {

    const cleanKeyword = keyword
      .replace(/\(.*?\)/g, '')
      .replace(/-.*/g, '')
      .trim()

    const kakaoSearch = () => {
      return new Promise((res, rej) => {

        const kakao = (window as any).kakao
        if (!kakao) return rej("NO_KAKAO")

        kakao.maps.load(() => {
          const ps = new kakao.maps.services.Places()

          ps.keywordSearch(cleanKeyword, (data: any, status: any) => {

            if (status === kakao.maps.services.Status.OK) {
              res(data)
            } else {
              rej(status)
            }
          })
        })
      })
    }

    const googleSearch = async () => {

      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(cleanKeyword)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`

      const res = await fetch(url)
      const data = await res.json()

      return (data.results || []).map((p: any) => ({
        place_name: p.name,
        address_name: p.formatted_address,
        x: p.geometry.location.lng,
        y: p.geometry.location.lat,
      }))
    }

    try {
      const kakao = await kakaoSearch()
      resolve(kakao)
    } catch (e) {
      try {
        const google = await googleSearch()
        resolve(google)
      } catch (e2) {
        resolve([])
      }
    }
  })
}