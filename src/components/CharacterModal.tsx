// components/CharacterModal.tsx
import Image from "next/image";
import { LotrCharacter } from "../data/character";

interface CharacterModalProps {
  character: LotrCharacter | null;
  onClose: () => void;
}

const CharacterModal = ({ character, onClose }: CharacterModalProps) => {
  if (!character) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto shadow-lg p-6 relative"
      >
        <button
          onClick={onClose}
          aria-label="Fermer la modal"
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">{character.name}</h2>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-full md:w-64 h-64 relative rounded-lg overflow-hidden shadow-md">
            <Image
              src={character.photo}
              alt={character.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              <strong>Race :</strong> {character.race}
            </p>
            <p>{character.description || "Aucune description disponible."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
