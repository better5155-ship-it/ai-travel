import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Travel AI",
  description: "AI Travel Planner",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>

        {/* Kakao Map SDK */}
        <Script
          src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=3d112e0ba8776ccde7a66d1867f26b39&autoload=false&libraries=services"
          strategy="afterInteractive"
        />

        {children}

      </body>
    </html>
  )
}

