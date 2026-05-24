import Link from "next/link"

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/60 p-10 rounded-2xl text-center">

        <h1 className="text-4xl font-bold mb-4">
          Travel AI
        </h1>

        <p className="mb-6 text-white/80">
          Plan your trip with AI
        </p>

        <Link
          href="/plan"
          className="px-6 py-3 bg-white text-black rounded-xl font-semibold"
        >
          Start Planning
        </Link>

      </div>
    </div>
  )
}