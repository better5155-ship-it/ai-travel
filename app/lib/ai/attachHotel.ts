export function attachHotel(days: any[], hotel: any) {

  return days.map((day, index) => {

    const places = day.places || []

    return {
      ...day,
      hotel,

      route: [
        hotel,
        ...places,
        hotel  // 🔥 다시 호텔로 복귀
      ]
    }
  })
}