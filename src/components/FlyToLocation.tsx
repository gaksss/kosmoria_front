"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { locations } from "@/data/locations";

export default function FlyToLocation({ selectedLocation }: { selectedLocation: typeof locations[0] | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      const position = selectedLocation.position;

      console.log("Selected Location:", selectedLocation);  // Vérifie si selectedLocation est correct
      console.log("Zoom before flyTo:", map.getZoom());      // Vérifie le zoom actuel de la carte
      console.log("Current position:", map.getCenter());     // Vérifie la position actuelle de la carte

      // Utilise flyTo pour un déplacement fluide
      map.flyTo(position, 1, {
        duration: 1.2,
      });

      // On peut aussi tester setView si flyTo ne fonctionne pas comme prévu
      map.setView(position, 4);  // Forcer un changement immédiat de la vue à la nouvelle localisation

      console.log("Zoom after flyTo:", map.getZoom());       // Vérifie si le zoom change correctement après
    }
  }, [selectedLocation, map]);

  return null;
}
