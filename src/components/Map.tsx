"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  useMap,
  Polygon,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import { CRS, LatLngBoundsLiteral, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { locations, paths, polygonAreas } from "@/data/locations";
import FlyToLocation from "./FlyToLocation";
import { area } from "framer-motion/client";

const PlaceModal = dynamic(() => import("@/components/PlaceModal"), {
  ssr: false,
});

const MAP_CONFIG = {
  width: 1024,
  height: 768,
  minZoom: 1,
  maxZoom: 5,
  defaultZoom: 1,
} as const;

const bounds: LatLngBoundsLiteral = [
  [0, 0],
  [MAP_CONFIG.height, MAP_CONFIG.width],
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

type MapProps = {
  selectedLocation: (typeof locations)[0] | null;
  onClearSelection: () => void;
};

export default function MyMap({
  selectedLocation,
  onClearSelection,
}: MapProps) {
  const [selected, setSelected] = useState<(typeof locations)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    MAP_CONFIG.height / 2,
    MAP_CONFIG.width / 2,
  ]);
  const [mapZoom, setMapZoom] = useState<number>(MAP_CONFIG.defaultZoom); // Ajouter le type number pour mapZoom

  // Fonction pour gérer le clic sur un marqueur
  const handleMarkerClick = (loc: (typeof locations)[0]) => {
    setSelected(loc);
    setIsModalOpen(true);
    setMapCenter(loc.position as [number, number]);
    setMapZoom(3);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClearSelection();
    setSelected(null); // Optionnel : réinitialise la sélection
  };

  useEffect(() => {
    if (selectedLocation) {
      setSelected(selectedLocation);
      setIsModalOpen(true);
      setMapCenter(selectedLocation.position as [number, number]);
      setMapZoom(3);
    }
  }, [selectedLocation]);

  return (
    <>
      <MapContainer
        crs={CRS.Simple}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        zoom={mapZoom}
        center={mapCenter as [number, number]}
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

        {locations.map((loc) => (
          <Marker
            key={loc.name} // Utiliser une propriété unique comme clé
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
              click: () => handleMarkerClick(loc),
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
    {paths.map((path, index) => (
        <Polyline
          key={index}
          positions={path.positions}
          pathOptions={{
            color: path.color,
          
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
