let promise: Promise<any> | null = null

export function loadGoogleMaps() {

  if (typeof window === "undefined") return Promise.reject()

  if ((window as any).google?.maps) {
    return Promise.resolve((window as any).google)
  }

  if (promise) return promise

  promise = new Promise((resolve, reject) => {

    const script = document.createElement("script")

    script.src =
      "https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_KEY"

    script.async = true
    script.onload = () => {
      resolve((window as any).google)
    }

    script.onerror = reject

    document.head.appendChild(script)
  })

  return promise
}