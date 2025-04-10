"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  useMap,
  Polygon,
  useMapEvents
} from "react-leaflet";
import { CRS, LatLngBoundsLiteral, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { locations, polygonAreas } from "@/data/locations";
import FlyToLocation from "./FlyToLocation";

const PlaceModal = dynamic(() => import("@/components/PlaceModal"), {
  ssr: false,
});

const imageWidth = 1024;
const imageHeight = 768;

const bounds: LatLngBoundsLiteral = [
  [0, 0],
  [imageHeight, imageWidth],
];

function SetupBounds() {
  const map = useMap();
  map.setMaxBounds(bounds);
  map.fitBounds(bounds);
  return null;
}

function LocationFinder() {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log(`Coordonnées du clic : [${lat}, ${lng}]`);
    },
  });
  return null;
}



export default function MyMap({
  selectedLocation,
  onClearSelection,
}: {
  selectedLocation: typeof locations[0] | null;
  onClearSelection: () => void;
}) {
  const [selected, setSelected] = useState<typeof locations[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState([imageHeight / 2, imageWidth / 2]); // Etat pour gérer le centrage
  const [mapZoom, setMapZoom] = useState(1); // Etat pour gérer le zoom

  // Fonction pour gérer le clic sur un marqueur
  const handleMarkerClick = (loc: typeof locations[0]) => {
    setSelected(loc);
    setIsModalOpen(true); // Ouvre la modale avec la nouvelle localisation
    setMapCenter(loc.position); // Centre la carte sur la nouvelle localisation
    setMapZoom(3); // Ajuste le zoom selon la localisation
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClearSelection();
    setSelected(null); // Optionnel : réinitialise la sélection
  };

  useEffect(() => {
    if (selectedLocation) {
      setSelected(selectedLocation);
      setIsModalOpen(true); // Ouvre la modale automatiquement lorsqu'une localisation est sélectionnée
      setMapCenter(selectedLocation.position); // Centre la carte sur la nouvelle localisation
      setMapZoom(3); // Ajuste le zoom selon la localisation
    }
  }, [selectedLocation]);

  return (
    <>
      <MapContainer
        crs={CRS.Simple}
        minZoom={1}
        maxZoom={5}
        zoom={mapZoom} // Utilise l'état contrôlé du zoom
        center={mapCenter} // Utilise l'état contrôlé du centrage
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        <SetupBounds />
        <LocationFinder />
        <ImageOverlay url="/maps/mapome.png" bounds={bounds} />

        <FlyToLocation selectedLocation={selectedLocation} />

        {locations.map((loc, i) => (
          <Marker
            key={i}
            position={loc.position}
            icon={
              new Icon({
                iconUrl: loc.icon,
                iconSize: [30, 45],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40],
              })
            }
            eventHandlers={{
              click: () => handleMarkerClick(loc), // Ouvre la modale ici
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
              fillOpacity: area.fillOpacity,
            }}
          />
        ))}
      </MapContainer>

      {isModalOpen && selected && (
        <PlaceModal
          open={isModalOpen}
          onOpenChange={(open) => {
            if (!open) {
              handleCloseModal();
            }
          }}
          place={selected}
        />
      )}
    </>
  );
}
