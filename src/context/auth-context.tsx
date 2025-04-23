"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AuthService from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Types des données utilisateur
interface User {
  email: string;
  pseudo: string;
  avatar?: string;
  race: string;
  // Ajoute d'autres champs ici si nécessaires (ex : id, nom, etc.)
}

// Interface pour les props du provider
interface AuthProviderProps {
  children: ReactNode;
}

// Interface pour le contexte
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  register: (userData: any) => Promise<{ success: boolean; error?: any }>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Création du contexte avec un fallback vide typé partiellement pour éviter les erreurs
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const userData = await AuthService.getCurrentUser();
          setUser(userData); // Assure-toi que userData contient toutes les informations nécessaires
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'authentification", error);
        AuthService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: any }> => {
    try {
      setLoading(true);
      const response = await AuthService.login(email, password);
      const userData = await AuthService.getCurrentUser(); // On récupère toutes les données utilisateur après la connexion
      setUser(userData); // Met à jour l'état avec toutes les données utilisateur
      toast.success("Connexion réussie", {
        description: "Vous êtes maintenant connecté.",
      });
      return { success: true };
    } catch (error: any) {
      console.error("Erreur de connexion", error);
      toast.error("Échec de la connexion", {
        description: error.message || "Identifiants incorrects",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    userData: any
  ): Promise<{ success: boolean; error?: any }> => {
    try {
      setLoading(true);
      await AuthService.register(userData);
      toast.success("Inscription réussie", {
        description:
          "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
      });
      return { success: true };
    } catch (error: any) {
      console.error("Erreur d'inscription", error);
      toast.error("Échec de l'inscription", {
        description:
          error.message || "Une erreur est survenue lors de l'inscription",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null); // Réinitialise l'état utilisateur lors de la déconnexion
    toast.info("Déconnexion", {
      description: "Vous avez été déconnecté avec succès.",
    });
    router.push("/"); // Redirige vers la page d'accueil
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user, // Vérifie si l'utilisateur est connecté
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook d'utilisation avec vérification du contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
