"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";
import { locations } from "@/data/locations";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<(typeof locations)[0] | null>(null);

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
      <SideMenu onSelectLocation={setSelectedLocation} />
      <div className="h-screen w-6/7 justify-self-end z-10">
        <MapComponent selectedLocation={selectedLocation} onClearSelection={() => setSelectedLocation(null)} />
      </div>
    </>
  );
}
