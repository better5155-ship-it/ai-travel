import "./globals.css"
import Script from "next/script"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        {/* 🔥 Kakao Maps SDK */}
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=3d112e0ba8776ccde7a66d1867f26b39&autoload=false&libraries=services"
          strategy="beforeInteractive"
        />

        {/* 🔥 Google Maps SDK */}
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBdgkfJ9uOHwg3NfTI8RjiX_GavgPjplgg"
          strategy="beforeInteractive"
        />

        {children}

      </body>
    </html>
  )
}