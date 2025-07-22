import { useAuth } from "@/context/auth-context";
import React, { useState } from "react";

interface LikeButtonProps {
  onRequireLogin?: () => void; // facultatif
}

const LikeButton = ({ onRequireLogin }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated } = useAuth();
  const isUserLoggedIn = isAuthenticated;

  const handleLikeClick = () => {
    if (!isUserLoggedIn) {
      if (onRequireLogin) onRequireLogin(); // on déclenche le toast depuis le parent
      return;
    }

    // Si l'utilisateur est connecté, on peut liker
    setIsLiked(!isLiked);
  };

  return (
    <button
      onClick={handleLikeClick}
      className="group/heart p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        className={`transition-all duration-200 ${
          isLiked
            ? "fill-emerald-500 text-emerald-500 scale-110"
            : "fill-none text-gray-400 hover:text-emerald-400 group-hover/heart:scale-110"
        }`}
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        />
      </svg>
    </button>
  );
};

export default LikeButton;
