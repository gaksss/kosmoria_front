"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Polygon,
  Polyline,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { CRS, LatLngBoundsLiteral, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { locations, paths, polygonAreas } from "@/data/locations";
import FlyToLocation from "./FlyToLocation";

const PlaceModal = dynamic(() => import("@/components/PlaceModal"), {
  ssr: false,
});

// ====== CONFIGURATION ======
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

// ====== HELPERS ======

// Fonction pour définir les limites de la map
function SetupBounds() {
  const map = useMap();
  map.setMaxBounds(bounds);
  map.fitBounds(bounds);
  return null;
}


// Fonction pour débugger afin d'avoir la position au click de la souris
function LocationFinder() {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log(`Coordonnées du clic : [${lat}, ${lng}]`);
    },
  });
  return null;
}

// Fonction pour ouvrir une modale au click d'un marqueur
function handleMarkerClick(
  loc: typeof locations[0],
  setSelected: React.Dispatch<React.SetStateAction<typeof locations[0] | null>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setMapCenter: React.Dispatch<React.SetStateAction<[number, number]>>,
  setMapZoom: React.Dispatch<React.SetStateAction<number>>
) {
  setSelected(loc);
  setIsModalOpen(true);
  setMapCenter(loc.position as [number, number]);
  setMapZoom(3);
}

// Fonction pour ouvrir la popup au survol du chemin
function handleHoverPath(
  path: typeof paths[0],
  event: any,
  setActivePopup: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      position: [number, number];
      content: string;
    }>
  >
) {
  const { lat, lng } = event.latlng;
  setActivePopup({
    isOpen: true,
    position: [lat, lng],
    content: path.name,
  });
}

// Fonction pour savoir quand la souris quitte le chemin
function handleHoverExit(
  setActivePopup: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      position: [number, number];
      content: string;
    }>
  >
) {
  setActivePopup((prev) => ({ ...prev, isOpen: false }));
}

// ====== COMPOSANT PRINCIPAL ======
type MapProps = {
  selectedLocation: (typeof locations)[0] | null;
  selectedPath: (typeof paths)[0] | null;
  onClearSelection: () => void;
};

export default function MyMap({ selectedLocation, onClearSelection }: MapProps) {
  const [selected, setSelected] = useState<(typeof locations)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    MAP_CONFIG.height / 2,
    MAP_CONFIG.width / 2,
  ]);
  const [mapZoom, setMapZoom] = useState<number>(MAP_CONFIG.defaultZoom);

  const [activePopup, setActivePopup] = useState<{
    isOpen: boolean;
    position: [number, number];
    content: string;
  }>({
    isOpen: false,
    position: [0, 0],
    content: "",
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClearSelection();
    setSelected(null);
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
            key={loc.name}
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
              click: () =>
                handleMarkerClick(loc, setSelected, setIsModalOpen, setMapCenter, setMapZoom),
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
          <React.Fragment key={index}>
            <Polyline
              positions={path.positions}
              pathOptions={{
                color: path.color,
                weight: path.weight,
              }}
              eventHandlers={{
                mouseover: (e) => handleHoverPath(path, e, setActivePopup),
                mouseout: () => handleHoverExit(setActivePopup),
              }}
            />
            {activePopup.isOpen && (
              <Popup position={activePopup.position} className="custom-popup">
                <div className="text-sm font-semibold">{activePopup.content}</div>
              </Popup>
            )}
          </React.Fragment>
        ))}
      </MapContainer>

      {isModalOpen && selected && (
        <PlaceModal
          open={isModalOpen}
          onOpenChange={(open) => {
            if (!open) handleCloseModal();
          }}
          place={selected}
        />
      )}
    </>
  );
}
