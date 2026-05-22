export async function searchPlaces(keyword: string) {

  return new Promise((resolve, reject) => {

    const kakao = (window as any).kakao

    if (!kakao) {
      reject("Kakao SDK not loaded")
      return
    }

    kakao.maps.load(() => {

      if (!kakao.maps.services) {
        reject("Places service unavailable")
        return
      }

      const ps = new kakao.maps.services.Places()

      ps.keywordSearch(keyword, (data: any, status: any) => {

        if (status === kakao.maps.services.Status.OK) {

          resolve(data)

        } else {

          reject(status)

        }
      })
    })
  })
}