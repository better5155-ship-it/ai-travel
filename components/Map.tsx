'use client'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

type Place = {
  name: string
  lat: number
  lng: number
}

export default function Map({
  places
}: {
  places: Place[]
}) {

  const center =

    places.length > 0

      ? [places[0].lat, places[0].lng]

      : [35.6762, 139.6503]

  return (

    <MapContainer
      center={center as any}
      zoom={12}
      style={{
        width: "100%",
        height: "100%"
      }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place, idx) => (

        <Marker
          key={idx}
          position={[place.lat, place.lng]}
        >

          <Popup>

            {place.name}

          </Popup>

        </Marker>

      ))}

    </MapContainer>
  )
}