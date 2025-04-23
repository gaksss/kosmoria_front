import axios, { AxiosError, AxiosResponse } from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/ld+json",
  },
});

interface Race {
  id?: number;
  name: string;
  //   description: string;
  //   bonusVie: number;
  //   bonusForce: number;
  //   bonusAgilite: number;
  //   bonusIntelligence: number;
  //   imagePath?: string;
  //   createdAt?: string;
  //   updatedAt?: string;
}

export const RaceService = {
  /**
   * Récupère toutes les races
   * @returns Promise<Race[]>
   */
  getAllRaces: async (): Promise<Race[]> => {
    try {
      const response: AxiosResponse<Race[]> = await api.get("/races");
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Erreur lors de la récupération des races",
        }
      );
    }
  },

  /**
   * Récupère une race par son ID
   * @param id - L'ID de la race
   * @returns Promise<Race>
   */
  getRaceById: async (id: number): Promise<Race> => {
    try {
      const response: AxiosResponse<Race> = await api.get(`/races/${id}`);
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Erreur lors de la récupération de la race",
        }
      );
    }
  },

  /**
   * Crée une nouvelle race
   * @param race - Les données de la race à créer
   * @returns Promise<Race>
   */
  createRace: async (race: Omit<Race, "id">): Promise<Race> => {
    try {
      const response: AxiosResponse<Race> = await api.post("/races", race);
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Erreur lors de la création de la race",
        }
      );
    }
  },

  /**
   * Met à jour une race existante
   * @param id - L'ID de la race à mettre à jour
   * @param race - Les nouvelles données de la race
   * @returns Promise<Race>
   */
  updateRace: async (id: number, race: Partial<Race>): Promise<Race> => {
    try {
      const response: AxiosResponse<Race> = await api.put(`/races/${id}`, race);
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Erreur lors de la mise à jour de la race",
        }
      );
    }
  },

  /**
   * Supprime une race
   * @param id - L'ID de la race à supprimer
   * @returns Promise<void>
   */
  deleteRace: async (id: number): Promise<void> => {
    try {
      await api.delete(`/races/${id}`);
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Erreur lors de la suppression de la race",
        }
      );
    }
  },
};
