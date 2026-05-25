import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >

      <head>

        {/* Kakao */}
        <script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=3d112e0ba8776ccde7a66d1867f26b39`}
        />

        {/* Google */}
        <script
			src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=geometry,marker`}
			async
		></script>

      </head>

      <body className="min-h-screen">
        {children}
      </body>

    </html>
  )
}