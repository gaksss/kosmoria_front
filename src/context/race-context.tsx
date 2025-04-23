"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Race {
  id: number;
  name: string;
  description: string;
  imagePath: string;
}

interface RaceContextType {
  races: Race[];
  selectedRace: Race | null;
  loading: boolean;
  error: string | null;
  selectRace: (id: number) => Promise<void>;
}

interface RaceProviderProps {
  children: ReactNode;
}

const RaceContext = createContext<RaceContextType | undefined>(undefined);

export function RaceProvider({ children }: RaceProviderProps) {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRaces = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/races`;
      const response = await axios.get(apiUrl);
      const racesData = response.data['member'] || [];
      
      if (Array.isArray(racesData)) {
        setRaces(racesData);
      } else {
        setRaces([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des races");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRaces();
  }, []);

  const selectRace = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/races/${id}`);
      setSelectedRace(response.data);
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
    races,
    selectedRace,
    loading,
    error,
    selectRace,
  };

  return <RaceContext.Provider value={value}>{children}</RaceContext.Provider>;
}

export function useRace() {
  const context = useContext(RaceContext);
  if (context === undefined) {
    throw new Error("useRace doit être utilisé avec un RaceProvider");
  }
  return context;
}