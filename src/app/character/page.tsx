"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { SearchInput } from "@/components/CharacterSearchBar";
import { characters, LotrCharacter } from "@/data/character";
import { ProfileCard } from "@/components/CharacterCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CharacterPage = () => {
  const [profileData, setProfileData] = useState<LotrCharacter[]>([]);
  const searchParams = useSearchParams();
  const rawQuery = searchParams?.get("q") ?? "";

  useEffect(() => {
    const q = rawQuery.toLowerCase();

    const filtered = characters.filter((character) => {
      return (
        character.name.toLowerCase().includes(q) ||
        character.race.toLowerCase().includes(q)
      );
    });

    setProfileData(filtered);
  }, [rawQuery]);

  const total = profileData.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl"></div>
      </div>

      <section className="relative w-full px-6 md:px-20 py-10">
        {/* Nav retour home */}
        <div className="justify-start items-start flex">
          <Link href="/" aria-label="Retour à la carte">
            <Button
              variant="outline"
              className="text-white border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer rounded-full px-6 flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              <span>Carte</span>
            </Button>
          </Link>
        </div>
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mb-4 shadow-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-sm"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Personnages du Seigneur des Anneaux
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Découvrez l'univers magique de la Terre du Milieu à travers ses
              personnages légendaires
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-md mx-auto mb-6">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 rounded-xl p-4 shadow-lg shadow-emerald-500/10">
              <SearchInput defaultValue={rawQuery} />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-800/30 rounded-full px-4 py-2 shadow-md">
            <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-sm"></div>
            <p className="text-sm font-medium text-muted-foreground">
              {total === 0
                ? "Aucun personnage trouvé"
                : `${total} personnage${total > 1 ? "s" : ""} trouvé${
                    total > 1 ? "s" : ""
                  }`}
            </p>
          </div>
        </div>

        {/* Characters Grid */}
        {total > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profileData.map((character) => (
              <ProfileCard
                id={character.id}
                key={character.name}
                name={character.name}
                race={character.race}
                photo={character.photo}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-800/30 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600 dark:text-emerald-400"
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
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Aucun personnage trouvé
              </h3>
              <p className="text-muted-foreground text-sm">
                Essayez de modifier votre recherche ou parcourez tous les
                personnages
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CharacterPage;
