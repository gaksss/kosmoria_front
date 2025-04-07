// src/components/MapControl.tsx
import { useMap } from "react-leaflet";

type Props = {
  center: [number, number];
  zoom?: number;
};

export default function MapControl({ center, zoom = 2 }: Props) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
