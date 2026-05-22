export async function searchPlaces(keyword: string) {

  return new Promise((resolve, reject) => {

    const checkKakao = () => {

      const kakao = (window as any).kakao

      // SDK 아직 없음
      if (!kakao || !kakao.maps) {

        console.log("Waiting for Kakao SDK...")

        setTimeout(checkKakao, 500)
        return
      }

      // SDK 로드 완료 후 실행
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

    checkKakao()
  })
}