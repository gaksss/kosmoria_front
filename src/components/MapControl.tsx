// src/components/MapControl.tsx
import { useEffect } from 'react';
import { useMap } from "react-leaflet";

interface MapControlProps {
  center: [number, number];
  zoom?: number;
  animate?: boolean;
  duration?: number;
}

export default function MapControl({ 
  center, 
  zoom = 2, 
  animate = true,
  duration = 1 
}: MapControlProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, {
      animate,
      duration
    });
  }, [map, center, zoom, animate, duration]);

  return null;
}
