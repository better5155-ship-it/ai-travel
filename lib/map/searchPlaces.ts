export async function searchPlaces(keyword: string) {

  return new Promise((resolve, reject) => {

    const waitForKakao = () => {

      if (
        typeof window === 'undefined' ||
        !(window as any).kakao
      ) {
        console.log('Waiting for Kakao SDK...')
        setTimeout(waitForKakao, 300)
        return
      }

      const kakao = (window as any).kakao

      kakao.maps.load(() => {

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

    waitForKakao()

  })
}