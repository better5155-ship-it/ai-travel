'use client'
  const handleSubmit = async () => {

    try {

      setLoading(true)

      const result: any = await searchPlaces(destination)

      const places = result.slice(0, 8).map((place: any) => ({
        name: place.place_name,
        address: place.address_name,
        lat: Number(place.y),
        lng: Number(place.x),
      }))

      const planDays = []

      for (let i = 0; i < days; i++) {

        planDays.push({
          day: i + 1,
          places: places.slice(i * 2, i * 2 + 2),
        })

      }

      onResult({
        destination,
        places,
        days: planDays,
      })

    } catch (err) {

      console.error(err)
      alert('Place search failed')

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full p-4 rounded-xl bg-black/30 border border-white/10"
      />

      <input
        type="number"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="w-full p-4 rounded-xl bg-black/30 border border-white/10"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:scale-[1.02] transition"
      >
        {loading ? 'Searching...' : 'Generate Plan'}
      </button>

    </div>
  )
}