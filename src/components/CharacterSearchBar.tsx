import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";

interface SearchInputProps {
  defaultValue?: string;
}

export const SearchInput = ({ defaultValue = "" }: SearchInputProps) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      const query = inputValue.trim();
      if (query) {
        router.push(`/character?q=${encodeURIComponent(query)}`);
      } else {
        router.push("/character");
      }
    }, 500); // délai pour éviter les push trop rapides

    return () => clearTimeout(timer); // nettoyage du timer
  }, [inputValue, router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center bg-white/70 dark:bg-gray-800/70 border border-emerald-200 dark:border-emerald-700 rounded-xl shadow-sm focus-within:shadow-md focus-within:border-emerald-400 dark:focus-within:border-emerald-500 transition-all duration-200">
        {/* Icône de recherche */}
        <div className="pl-4 pr-3 flex items-center">
          <svg
            className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          id="characterSearch"
          placeholder="Rechercher un personnage..."
          value={inputValue}
          onChange={handleChange}
          className="flex-1 bg-transparent outline-none border-none py-3 pr-4 text-foreground placeholder:text-muted-foreground focus:ring-0"
        />

        {/* Indicateur de saisie active */}
        {inputValue && (
          <div className="pr-4 flex items-center">
            <button
              onClick={() => setInputValue("")}
              className="p-1 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors duration-150"
              aria-label="Effacer la recherche"
            >
              <svg
                className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Label accessible masqué */}
      <label htmlFor="characterSearch" className="sr-only">
        Rechercher des personnages
      </label>
    </div>
  );
};
