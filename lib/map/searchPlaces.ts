export async function searchPlaces(keyword: string) {

  return new Promise((resolve, reject) => {

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

        // 🔥 핵심 변경: 검색어 정리 (관광지 강제 제거)
        const cleanKeyword = keyword
          .replace(/\(.*?\)/g, '')   // 괄호 제거
          .replace(/-.*/g, '')      // 하이픈 이후 제거
          .trim()

        ps.keywordSearch(cleanKeyword, (data: any, status: any) => {

          if (status === kakao.maps.services.Status.OK) {
            resolve(data)
          }

          // 🔥 ZERO_RESULT도 정상 처리 (fail 아님)
          else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            console.warn("ZERO_RESULT:", cleanKeyword)
            resolve([])   // 중요
          }

          else {
            console.error("Kakao error:", status)
            reject(status)
          }

        })

      })

    }

    waitForKakao()
  })

}