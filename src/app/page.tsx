"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";
import { locations } from "@/data/locations";

export default function Home() {
  // État pour la localisation sélectionnée et pour la position de la carte
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof locations)[0] | null
  >(null);
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

  return (
    <>
      <SideMenu />

      <div className="h-screen w-6/7 justify-self-end z-10">
        <MapComponent />
      </div>
    </>
  );
}
