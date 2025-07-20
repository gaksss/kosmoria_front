"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Marker {
  id: number;
  name: string;
  description: string;
  location: string;
}

interface MarkerContextType {
  markers: Marker[];
  selectedMarker: Marker | null;
  loading: boolean;
  error: string | null;
  selectMarker: (id: number) => Promise<void>;
}

interface MarkerProviderProps {
  children: ReactNode;
}

const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

export function MarkerProvider({ children }: MarkerProviderProps) {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarkers = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/markers`;
      const response = await axios.get(apiUrl);
      const markersData = response.data['member'] || [];
      
      if (Array.isArray(markersData)) {
        setMarkers(markersData);
      } else {
        setMarkers([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des races");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  const selectMarker = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/markers/${id}`);
      setSelectedMarker(response.data);
      toast.success("Race sélectionnée", {
        description: `Vous avez choisi les ${response.data.name}`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la sélection de la race";
      setError(message);
      toast.error("Erreur", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    markers,
    selectedMarker,
    loading,
    error,
    selectMarker,
  };

  return <MarkerContext.Provider value={value}>{children}</MarkerContext.Provider>;
}

export function useMarker() {
  const context = useContext(MarkerContext);
  if (context === undefined) {
    throw new Error("useMarker doit être utilisé avec un MarkerProvider");
  }
  return context;
}