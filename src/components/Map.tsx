// src/components/Map.tsx
"use client"

import { MapContainer, ImageOverlay, Marker, Popup, useMap, Polygon, useMapEvents } from "react-leaflet";
import { CRS, LatLngBoundsLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { locations, polygonPositions, polygonAreas } from "@/data/locations";

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

// Fonction temporaire pour avoir les coordonnées au clic
function LocationFinder() {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log(`Coordonnées du clic : [${lat}, ${lng}]`);
    },
  });
  return null;
}

export default function MyMap() {
  return (
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
      <ImageOverlay
        url="/maps/mapome.png"
        bounds={bounds}
      />
      {locations.map((location, index) => (
        <Marker 
          key={index} 
          position={location.position} 
          icon={new Icon({
            iconUrl: location.icon,
            iconSize: [30, 45],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
          })}
        >
          <Popup>{location.description}</Popup>
        </Marker>
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
        >
          <Popup>
            <h3>{area.name}</h3>
            <p>{area.description}</p>
          </Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
}
