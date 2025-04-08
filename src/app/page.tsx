"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";
import { locations } from "@/data/locations";

export default function Home() {
  // État pour la localisation sélectionnée et pour la position de la carte
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [mapCenter, setMapCenter] = useState([48.8566, 2.3522]); // Position initiale
  const [mapZoom, setMapZoom] = useState(13); // Zoom initial

  // Chargement dynamique de la carte
  const MapComponent = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>Votre map est en train de charger</p>,
        ssr: false,
      }),
    []
  );

  // Mettre à jour la localisation sélectionnée et ajuster le centrage
  const handleLocationSelect = (location: typeof locations[0]) => {
    setSelectedLocation(location);
    setMapCenter(location.position);  // Centrer la carte sur la localisation sélectionnée
    setMapZoom(4);  // Zoom par défaut (peut être ajusté selon la localisation)
  };

  return (
    <>
      <SideMenu onLocationSelect={handleLocationSelect} />
      <div className="h-screen w-6/7 justify-self-end">
        {/* Passer la localisation et zoom à MapComponent */}
        <MapComponent selectedLocation={selectedLocation || { position: mapCenter, zoom: mapZoom }} />
      </div>
    </>
  );
}
