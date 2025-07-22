import { useState } from "react";
import Image from "next/image";
import { LotrCharacter } from "../data/character";
import { useAuth } from "@/context/auth-context";
import LikeButton from "./LikeButton";

// Types pour le toast
interface ToastProps {
  message: string;
  onClose: () => void;
}

// Toast avec bouton de connexion
const Toast = ({ message, onClose }: ToastProps) => {
  const goToLogin = () => {
    onClose();
    // Navigation manuelle sans useRouter
    window.location.href = "/login";
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-top duration-300">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-emerald-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
            {message}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={goToLogin}
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium rounded-md transition-colors duration-200"
            >
              Se connecter
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors duration-200"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileCard = (props: LotrCharacter) => {
  const { name, race, photo } = props;

  const [showToast, setShowToast] = useState(false);

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 transform hover:scale-[1.02] overflow-hidden">
      {/* Image container */}
      <div className="relative overflow-hidden">
        <Image
          src={photo}
          alt={name}
          className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
          height={400}
          width={400}
        />
        {/* Overlay gradient subtil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Contenu */}
      <div className="p-4 bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-teal-50/50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/30">
        <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {name}
        </h2>

        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-sm"></div>
          <p className="text-sm text-muted-foreground font-medium">{race}</p>
        </div>

        {/* Like button */}
        <div className="flex items-center justify-end mt-3">
          <LikeButton />
        </div>

        {/* Barre verte bas */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Angle decoratif */}
      <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Toast pour les utilisateurs non connectés */}
      {showToast && (
        <Toast
          message="Connectez-vous pour ajouter des personnages à vos favoris !"
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};
