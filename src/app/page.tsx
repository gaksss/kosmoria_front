"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";

export default function Home() {
  const MapComponent = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>Votre map est entrain de charger</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <SideMenu />
      <div className="h-screen w-6/7 justify-self-end">
        <MapComponent position={[48.8566, 2.3522]} zoom={13} />
      </div>
    </>
  );
}
