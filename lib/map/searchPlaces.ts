export async function searchPlaces(keyword: string) {
  return new Promise((resolve, reject) => {
    const kakao = (window as any).kakao

    if (!kakao?.maps?.services) {
      reject("Kakao services not loaded")
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
}