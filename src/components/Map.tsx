"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import {
  MapContainer,
  ImageOverlay,
  Marker,
  useMap,
  Polygon,
  useMapEvents
} from "react-leaflet"
import { CRS, LatLngBoundsLiteral, Icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import { locations, polygonAreas } from "@/data/locations"



const PlaceModal = dynamic(() => import("@/components/PlaceModal"), {
  ssr: false,
})

// Dimensions de l'image de la map
const imageWidth = 1024
const imageHeight = 768

// Limites de la carte
const bounds: LatLngBoundsLiteral = [
  [0, 0],
  [imageHeight, imageWidth]
]

// Centrage et limites
function SetupBounds() {
  const map = useMap()
  map.setMaxBounds(bounds)
  map.fitBounds(bounds)
  return null
}

// Affiche les coordonnées au clic (debug)
function LocationFinder() {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng
      console.log(`Coordonnées du clic : [${lat}, ${lng}]`)
    }
  })
  return null
}




export default function MyMap() {
  const [selected, setSelected] = useState<typeof locations[0] | null>(null)

  return (
    <>
      <MapContainer
        crs={CRS.Simple}
        minZoom={1}
        maxZoom={2}
        zoom={1}
        center={[imageHeight / 2, imageWidth / 2]}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
      >
        <SetupBounds />
        <LocationFinder />

        <ImageOverlay url="/maps/mapome.png" bounds={bounds} />

        {locations.map((loc, i) => (
          <Marker
            key={i}
            position={loc.position}
            icon={
              new Icon({
                iconUrl: loc.icon,
                iconSize: [30, 45], // à adapter
                iconAnchor: [20, 40],
                popupAnchor: [0, -40]
              })
            }
            eventHandlers={{
              click: () => setSelected(loc)
            }}
          />
        ))}

        {polygonAreas.map((area, index) => (
          <Polygon
            key={index}
            positions={area.positions}
            pathOptions={{
              color: area.color,
              fillColor: area.fillColor,
              fillOpacity: area.fillOpacity
            }}
          />
        ))}
      </MapContainer>

      {selected && (
        <PlaceModal
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
          place={selected}
        />
      )}
    </>
  )
}
