import axios, { AxiosError, AxiosResponse } from "axios";

// Il est préférable de ne pas hardcoder l'URL de l'API ici. Utilisez une variable d'environnement ou un fichier de configuration.
const API_URL = "http://127.0.0.1:8000/api";

// Configuration Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/ld+json",
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Types
interface User {
  email: string;
  pseudo: string;
  avatar?: string;
  race: string;
  // Ajoute d'autres champs ici si nécessaires (ex : id, nom, etc.)
}

interface AuthResponse {
  token: string;
  user?: User;
}

interface RegisterData {
  email: string;
  password: string;
  pseudo: string;
  race: string;
  // Ajoute d'autres champs ici si nécessaires
}

// Création du service Auth
export const AuthService = {
  /**
   * Inscription d'un nouvel utilisateur
   * @param userData - Données de l'utilisateur
   * @returns Promesse résolue avec les données de l'utilisateur
   */
  register: async (userData: RegisterData): Promise<User> => {
    try {
      const response: AxiosResponse<User> = await api.post("/register", userData);
      return response.data;
    } catch (error: any) {
      throw (error.response?.data || { message: "Erreur d'inscription" }) as string;
    }
  },

  /**
   * Connexion d'un utilisateur
   * @param email - Adresse email
   * @param password - Mot de passe
   * @returns Promesse résolue avec le token JWT
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post("/login_check", {
        username: email, // Souvent, l'API JWT attend "username" même si c'est un email
        password,
      });

      // Stocke le token JWT dans le localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error: any) {
      throw (error.response?.data || { message: "Erreur de connexion" }) as string;
    }
  },

  /**
   * Déconnexion de l'utilisateur
   */
  logout: (): void => {
    localStorage.removeItem("token");
  },

  /**
   * Vérifier si l'utilisateur est connecté
   * @returns Vrai si l'utilisateur est connecté
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },

  /**
   * Récupère les informations de l'utilisateur actuel
   * @returns Promesse résolue avec les données de l'utilisateur
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response: AxiosResponse<User> = await api.get("/me");
      return response.data;
    } catch (error: any) {
      throw (error.response?.data || { message: "Erreur d'obtention des données utilisateur" }) as string;
    }
  },
};

export default AuthService;
