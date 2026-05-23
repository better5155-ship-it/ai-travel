export async function searchPlaces(keyword: string, fallback?: any) {

  return new Promise((resolve) => {

    const waitForKakao = () => {

      if (
        typeof window === 'undefined' ||
        !(window as any).kakao
      ) {
        setTimeout(waitForKakao, 300)
        return
      }

      const kakao = (window as any).kakao

      kakao.maps.load(() => {

        const ps = new kakao.maps.services.Places()

        const searchKeyword = `${keyword} 관광지`

        ps.keywordSearch(searchKeyword, (data: any, status: any) => {

          // ✅ 성공
          if (status === kakao.maps.services.Status.OK && data?.length) {
            resolve(data)
            return
          }

          // 🚨 실패 → fallback 그대로 반환 (핵심)
          console.warn("Kakao search failed:", keyword)

          if (fallback) {
            resolve([fallback])
            return
          }

          resolve([])
        })

      })

    }

    waitForKakao()
  })
}