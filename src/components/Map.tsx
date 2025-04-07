// src/components/Map.tsx
"use client"

import { MapContainer, ImageOverlay, Marker, Popup, useMap } from "react-leaflet";
import { CRS, LatLngBoundsLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { locations } from "@/data/locations";





const mordorIcon = new Icon({
  iconUrl: "/icons/mordor.png", // ajoute dans /public/icons/
  iconSize: [30,45],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});


// Dimensions de l'image de la map
const imageWidth = 1024;
const imageHeight = 768;

// Définir les bornes en coordonnées (Leaflet est en [y, x] pour les bounds)
const bounds: LatLngBoundsLiteral = [
    [0, 0],
    [imageHeight, imageWidth],
  ];

  // Utilitaire pour forcer le centrage et bloquer les limites
function SetupBounds() {
    const map = useMap();
    map.setMaxBounds(bounds); // Empêche de scroller en dehors
    map.fitBounds(bounds); // Centre et zoom pour couvrir toute la map
    return null;
  }

export default function MyMap({ position, zoom }: MapProps) {

  return (
    <MapContainer
        crs={CRS.Simple}
        minZoom={1}
        maxZoom={2} // Plus tu montes, plus tu zoomes (zoom = grossissement en CRS.Simple)
        zoom={1}
        center={[imageHeight / 2, imageWidth / 2]}
        maxBounds={bounds}
        maxBoundsViscosity={1.0} // Pour vraiment empêcher de sortir
        className="h-full w-full"
      >
        <SetupBounds />
     <ImageOverlay
        url="/maps/mapome.png" // place ton image dans /public/maps
        bounds={bounds}
      />
      {/* Exemple de marker sur l’image */}
      <Marker position={[200, 820]} icon={mordorIcon}>
          <Popup>⚔️ Mordor</Popup>
        </Marker>
    </MapContainer>
  );
}
