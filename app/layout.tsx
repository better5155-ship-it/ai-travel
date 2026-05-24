import "./globals.css"
import Script from "next/script"

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">

      <body className="min-h-screen">

        {/* 🔥 Kakao Maps SDK */}
        <Script
          src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=3d112e0ba8776ccde7a66d1867f26b39"
          strategy="beforeInteractive"
        />

        {children}

      </body>

    </html>
  )
}