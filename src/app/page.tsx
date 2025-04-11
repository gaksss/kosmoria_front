"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";
import { locations, paths } from "@/data/locations";

// Define types
type Location = typeof locations[0];
type Path = typeof paths[0];

const DynamicMap = dynamic(() => import("@/components/Map"), {
  loading: () => <p>Votre map est en train de charger</p>,
  ssr: false,
});

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedPath, setSelectedPath] = useState<Path | null>(null);
  const MapComponent = useMemo(() => DynamicMap, []);
  const handleClearSelection = () => setSelectedLocation(null);

  return (
    <div className="relative h-screen">
      <SideMenu onSelectLocation={setSelectedLocation} onSelectPath={setSelectedPath} />
      <main className="absolute left-[14.2857%] right-0 h-full">
        <MapComponent 
          selectedLocation={selectedLocation}
          selectedPath={selectedPath}
          onClearSelection={handleClearSelection} 
        />
      </main>
    </div>
  );
}
