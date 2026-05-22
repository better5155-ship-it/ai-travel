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

        {/* Kakao Maps */}
        <Script
          id="kakao-map-sdk"
          strategy="lazyOnload"
          src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=3d112e0ba8776ccde7a66d1867f26b39&autoload=false&libraries=services"
        />

        {children}

      </body>
    </html>
  )
}

