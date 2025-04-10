"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { locations } from "@/data/locations";

interface FlyToLocationProps {
  selectedLocation: typeof locations[0] | null;
}

export default function FlyToLocation({ selectedLocation }: FlyToLocationProps) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      const position = selectedLocation.position;
      
      // Utilise setView pour un changement immédiat de position
      map.setView(position, 3, {
        animate: true,
        duration: 1
      });

      // Puis utilise flyTo pour l'animation fluide
      setTimeout(() => {
        map.flyTo(position, 3, {
          duration: 1.2
        });
      }, 100);
    }
  }, [selectedLocation, map]);

  return null;
}
