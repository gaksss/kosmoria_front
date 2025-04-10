"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";
import { locations } from "@/data/locations";

// Define types
type Location = typeof locations[0];

// Dynamically import Map component with loading state
const DynamicMap = dynamic(() => import("@/components/Map"), {
  loading: () => <p>Votre map est en train de charger</p>,
  ssr: false,
});

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Memoize the map component to prevent unnecessary re-renders
  const MapComponent = useMemo(() => DynamicMap, []);

  const handleClearSelection = () => setSelectedLocation(null);

  return (
    <main>
      <SideMenu onSelectLocation={setSelectedLocation} />
      <div className="h-screen w-6/7 justify-self-end z-10">
        <MapComponent 
          selectedLocation={selectedLocation} 
          onClearSelection={handleClearSelection} 
        />
      </div>
    </main>
  );
}
