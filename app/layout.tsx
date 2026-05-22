import Script from "next/script"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Kakao Map Script (SAFE 방식) */}
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=3d112e0ba8776ccde7a66d1867f26b39&autoload=false"
          strategy="beforeInteractive"
        />

        {children}
      </body>
    </html>
  )
}