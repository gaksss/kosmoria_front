import { useAuth } from "@/context/auth-context"; // adapte le chemin selon ton projet

export function useUser() {
  const { user, loading } = useAuth();
  return { user, loading, error: null }; // Pas d’erreur ici puisque le contexte la gère différemment
}
