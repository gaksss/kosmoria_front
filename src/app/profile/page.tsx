"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@/lib/hooks/useUser";
import { useRace } from "@/context/race-context";
import { PlusCircle, MapPin, Trophy, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AvatarByRace {
  [key: string]: string | string[];
}

interface CharacterDetails {
  [key: string]: {
    name: string;
    description: string;
    story: string;
  }[];
}

const avatarsByRace: AvatarByRace = {
  nains: [
    "/avatars/dwarf-1.jpg",
    "/avatars/dwarf-2.jpg",
    "/avatars/dwarf-3.jpg",
  ],
  elfes: ["/avatars/elf-1.jpg", "/avatars/elf-2.jpg", "/avatars/elf-3.jpg"],
  gondor: [
    "/avatars/gondor-1.jpg",
    "/avatars/gondor-2.jpg",
    "/avatars/gondor-3.jpg",
  ],
  hobbit: [
    "/avatars/hobbit/frodo.webp",
    "/avatars/hobbit/bilbo.webp",
    "/avatars/hobbit/merry.webp",
    "/avatars/hobbit/pipin.webp",
    "/avatars/hobbit/sam.webp",
  ],
  mordor: [
    "/avatars/mordor-1.jpg",
    "/avatars/mordor-2.jpg",
    "/avatars/mordor-3.jpg",
  ],
  rohan: [
    "/avatars/rohan-1.jpg",
    "/avatars/rohan-2.jpg",
    "/avatars/rohan-3.jpg",
  ],
};

const characterDetails: CharacterDetails = {
  nains: [
    {
      name: "Gimli",
      description: "Fils de Glóin",
      story:
        "Un fier guerrier nain qui a participé à la Communauté de l'Anneau.",
    },
    {
      name: "Thorin",
      description: "Roi sous la Montagne",
      story:
        "Le leader de la quête d'Erebor, cherchant à récupérer son royaume.",
    },
  ],
  elfes: [
    {
      name: "Legolas",
      description: "Prince de la Forêt Noire",
      story:
        "Un archer elfe légendaire et membre de la Communauté de l'Anneau.",
    },
    {
      name: "Galadriel",
      description: "Dame de la Lórien",
      story:
        "Une des plus puissantes et anciennes elfes de la Terre du Milieu.",
    },
  ],
  // Ajoutez les autres races avec leurs personnages...
};

export default function ProfilePage() {
  const {
    races,
    selectedRace,
    loading: raceLoading,
    error: raceError,
    selectRace,
  } = useRace();
  const { user, loading: userLoading, error: userError } = useUser();

  const [avatar, setAvatar] = useState<string>("");
  const [avatarKey, setAvatarKey] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<{
    name: string;
    description: string;
    story: string;
  } | null>(null);

  const handleRaceChange = async (raceId: string) => {
    await selectRace(Number(raceId));
    if (selectedRace) {
      const raceAvatars = avatarsByRace[selectedRace.name.toLowerCase()];
      if (Array.isArray(raceAvatars)) {
        const randomIndex = Math.floor(Math.random() * raceAvatars.length);
        setAvatar(raceAvatars[randomIndex]);
        setAvatarKey((prev) => prev + 1);
      }
    }
  };

  const getBackgroundClasses = () => {
    if (!selectedRace) return "bg-neutral-950";
    switch (selectedRace.name.toLowerCase()) {
      case "nains":
        return "bg-[url('/backgrounds/dwarf-bg.jpg')] bg-cover bg-center bg-blend-darken bg-black/70";
      case "elfes":
        return "bg-[url('/backgrounds/elves-bg.jpg')] bg-cover bg-center bg-blend-darken bg-black/70";
      case "gondor":
        return "bg-[url('/backgrounds/gondor-bg.jpg')] bg-cover bg-center bg-blend-darken bg-black/70";
      case "hobbit":
        return "bg-[url('/backgrounds/hobbit-bg.jpg')] bg-cover bg-center bg-blend-darken bg-black/70";
      case "mordor":
        return "bg-[url('/backgrounds/mordor-bg.jpg')] bg-cover bg-center bg-blend-darken bg-black/70";
      case "rohan":
        return "bg-[url('/backgrounds/rohan-bg.jpg')] bg-cover bg-center bg-blend-darken bg-black/70";
      default:
        return "bg-neutral-950";
    }
  };

  const getAccentColor = () => {
    if (!selectedRace) return "from-amber-500 to-yellow-600";
    switch (selectedRace.name.toLowerCase()) {
      case "nains":
        return "from-amber-400 to-amber-600";
      case "elfes":
        return "from-emerald-400 to-emerald-600";
      case "gondor":
        return "from-slate-300 to-slate-500";
      case "hobbit":
        return "from-lime-400 to-green-600";
      case "mordor":
        return "from-red-600 to-red-800";
      case "rohan":
        return "from-yellow-400 to-amber-600";
      default:
        return "from-amber-500 to-yellow-600";
    }
  };

  const getCardClasses = () => {
    if (!selectedRace) return "bg-black/40 border-white/10";
    switch (selectedRace.name.toLowerCase()) {
      case "nains":
        return "bg-black/40 border-amber-500/30";
      case "elfes":
        return "bg-black/40 border-emerald-500/30";
      case "gondor":
        return "bg-black/40 border-slate-400/30";
      case "hobbit":
        return "bg-black/40 border-lime-500/30";
      case "mordor":
        return "bg-black/40 border-red-500/30";
      case "rohan":
        return "bg-black/40 border-yellow-500/30";
      default:
        return "bg-black/40 border-white/10";
    }
  };

  const getButtonClasses = () => {
    if (!selectedRace)
      return "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700";
    switch (selectedRace.name.toLowerCase()) {
      case "nains":
        return "bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700";
      case "elfes":
        return "bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700";
      case "gondor":
        return "bg-gradient-to-r from-slate-300 to-slate-500 hover:from-slate-400 hover:to-slate-600";
      case "hobbit":
        return "bg-gradient-to-r from-lime-400 to-green-600 hover:from-lime-500 hover:to-green-700";
      case "mordor":
        return "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900";
      case "rohan":
        return "bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700";
      default:
        return "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700";
    }
  };

  const getFontFamily = () => {
    if (!selectedRace) return "font-serif";
    switch (selectedRace.name.toLowerCase()) {
      case "nains":
        return "font-bold font-serif";
      case "elfes":
        return "font-light font-serif";
      case "gondor":
        return "font-serif";
      case "hobbit":
        return "font-medium font-serif";
      case "mordor":
        return "font-black font-serif";
      case "rohan":
        return "font-semibold font-serif";
      default:
        return "font-serif";
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (userLoading || raceLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (userError)
    return <p className="text-red-500 p-4">Erreur : {userError}</p>;
  if (raceError)
    return <p className="text-red-500 p-4">Erreur : {raceError}</p>;
  if (!user) return <p className="text-white p-4">Utilisateur non trouvé</p>;

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${getBackgroundClasses()}`}
    >
      <div className="min-h-screen backdrop-blur-sm py-8 px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {/* Header */}
          <motion.header
            className={`flex justify-between items-center mb-12 ${getBackgroundClasses()}`}
            variants={fadeInUp}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`h-12 w-2 bg-gradient-to-b ${getAccentColor()} rounded-full`}
              ></div>
              <h1
                className={`text-4xl md:text-5xl font-bold text-white ${getFontFamily()}`}
              >
                Profil du Voyageur
              </h1>
            </div>
            <Link href="/" aria-label="Retour à la carte">
              <Button
                variant="outline"
                className="text-white border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer rounded-full px-6 flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                <span>Carte</span>
              </Button>
            </Link>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Profile form - 5 columns on large screens */}
            <motion.section className="lg:col-span-5" variants={fadeInUp}>
              <Card
                className={`backdrop-blur-md border ${getCardClasses()} shadow-2xl rounded-xl overflow-hidden`}
              >
                <CardHeader
                  className={`bg-gradient-to-r ${getAccentColor()} bg-opacity-20 pb-6`}
                >
                  <CardTitle
                    className={`text-2xl text-white ${getFontFamily()}`}
                  >
                    Votre identité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div>
                    <label
                      htmlFor="race-select"
                      className="block text-sm font-semibold mb-2 text-white/90"
                    >
                      Peuples ({races.length} disponibles)
                    </label>
                    <Select
                      value={selectedRace?.id?.toString() || ""}
                      onValueChange={handleRaceChange}
                    >
                      <SelectTrigger
                        id="race-select"
                        className="w-full bg-black/50 border border-white/20 text-white cursor-pointer focus:ring-2 focus:ring-white/30 focus:border-white/50"
                      >
                        <SelectValue placeholder="Choisir un peuple" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 text-white border-white/10 rounded-md backdrop-blur-lg">
                        {races.map((race) => (
                          <SelectItem
                            key={race.id}
                            value={race.id.toString()}
                            className="cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors"
                          >
                            {race.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedRace && (
                    <>
                      <div className="flex flex-col items-center space-y-4 py-2">
                        <div
                          className={`p-1 rounded-full bg-gradient-to-r ${getAccentColor()} shadow-lg`}
                        >
                          <div className="rounded-full p-1 bg-black/50 backdrop-blur-sm">
                            <Image
                              key={avatarKey}
                              src={avatar || selectedRace.imagePath}
                              alt={`Avatar de la race ${selectedRace.name}`}
                              width={120}
                              height={120}
                              className="rounded-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                              onClick={() => {
                                if (selectedRace) {
                                  setDialogOpen(true);
                                }
                              }}
                            />
                          </div>
                        </div>
                        <h3 className={`text-xl text-white ${getFontFamily()}`}>
                          {selectedRace.name}
                        </h3>
                      </div>

                      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogContent className="bg-black/95 border border-white/10 text-white max-w-2xl">
                          <DialogHeader>
                            <DialogTitle
                              className={`text-2xl ${getFontFamily()}`}
                            >
                              Choisissez votre avatar
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                            {selectedRace && 
                              (Array.isArray(avatarsByRace[selectedRace.name.toLowerCase()]) 
                                ? (avatarsByRace[selectedRace.name.toLowerCase()] as string[]).map((avatarPath: string, index: number) => (
                                  <div
                                    key={index}
                                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 
                                    ${avatar === avatarPath ? "ring-2 ring-white scale-95" : "hover:scale-95"}`}
                                    onClick={() => {
                                      setAvatar(avatarPath);
                                      setAvatarKey((prev) => prev + 1);
                                    }}
                                  >
                                    <Image
                                      src={avatarPath}
                                      alt={`Avatar ${index + 1} de ${selectedRace.name}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))
                                : null
                              )}
                          </div>
                          <div className="flex justify-end mt-4 gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setDialogOpen(false)}
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              Annuler
                            </Button>
                            <Button
                              onClick={() => {
                                if (avatar) {
                                  setDialogOpen(false);
                                }
                              }}
                              className={getButtonClasses()}
                              disabled={!avatar}
                            >
                              Choisir
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}

                  <form
                    aria-label="Formulaire de modification de profil"
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="pseudo"
                        className="text-sm font-semibold text-white/90"
                      >
                        Pseudo
                      </label>
                      <Input
                        id="pseudo"
                        name="pseudo"
                        defaultValue={user?.pseudo || ""}
                        className="bg-black/30 border-white/20 text-white focus:border-white/50 focus:ring-2 focus:ring-white/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-white/90"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        defaultValue={user?.email || ""}
                        type="email"
                        className="bg-black/30 border-white/20 text-white focus:border-white/50 focus:ring-2 focus:ring-white/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="text-sm font-semibold text-white/90"
                      >
                        Mot de passe
                      </label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        defaultValue="********"
                        className="bg-black/30 border-white/20 text-white focus:border-white/50 focus:ring-2 focus:ring-white/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="confirm-password"
                        className="text-sm font-semibold text-white/90"
                      >
                        Confirmer Mot de passe
                      </label>
                      <Input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        defaultValue="********"
                        className="bg-black/30 border-white/20 text-white focus:border-white/50 focus:ring-2 focus:ring-white/30"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="reset"
                        variant="outline"
                        className="flex-1 border border-white/20 text-white hover:bg-white/10 cursor-pointer transition-all"
                        aria-label="Vider le formulaire"
                      >
                        Réinitialiser
                      </Button>
                      <Button
                        type="submit"
                        className={`flex-1 text-white cursor-pointer transition-all shadow-lg ${getButtonClasses()}`}
                        aria-label="Modifier les informations"
                      >
                        Sauvegarder
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.section>

            {/* Right panels - 7 columns on large screens */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Saved markers */}
              <motion.section variants={fadeInUp}>
                <Card
                  className={`backdrop-blur-md border ${getCardClasses()} shadow-2xl rounded-xl overflow-hidden`}
                >
                  <CardHeader
                    className={`bg-gradient-to-r ${getAccentColor()} bg-opacity-20 pb-6 flex flex-row justify-between items-center`}
                  >
                    <CardTitle
                      className={`text-2xl text-white ${getFontFamily()} flex items-center gap-2`}
                    >
                      <MapPin className="h-5 w-5" />
                      Lieux découverts
                    </CardTitle>
                    <Button
                      className="rounded-full w-8 h-8 p-0 flex items-center justify-center bg-black/30 border border-white/20 hover:bg-white/10"
                      aria-label="Ajouter un marqueur"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: "Fondcombe",
                          type: "Refuge elfe",
                          image: "/locations/rivendell.jpg",
                        },
                        {
                          name: "Minas Tirith",
                          type: "Capitale du Gondor",
                          image: "/locations/minas-tirith.jpg",
                        },
                        {
                          name: "La Comté",
                          type: "Terre des hobbits",
                          image: "/locations/shire.jpg",
                        },
                        {
                          name: "Edoras",
                          type: "Capitale du Rohan",
                          image: "/locations/edoras.jpg",
                        },
                      ].map((location, index) => (
                        <div
                          key={index}
                          className="group relative rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-2xl"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
                          <div className="h-24 overflow-hidden">
                            <div className="h-full w-full bg-gray-700"></div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                            <h3 className="text-white font-semibold">
                              {location.name}
                            </h3>
                            <p className="text-white/70 text-sm">
                              {location.type}
                            </p>
                          </div>
                          <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              className="w-6 h-6 p-0 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/30"
                              aria-label="Supprimer le marqueur"
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Button
                        className={`text-white ${getButtonClasses()} px-6 rounded-full shadow-lg`}
                        aria-label="Voir tous les lieux"
                      >
                        Voir tous les lieux
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>

              {/* Scores */}
              <motion.section variants={fadeInUp}>
                <Card
                  className={`backdrop-blur-md border ${getCardClasses()} shadow-2xl rounded-xl overflow-hidden`}
                >
                  <CardHeader
                    className={`bg-gradient-to-r ${getAccentColor()} bg-opacity-20 pb-6`}
                  >
                    <CardTitle
                      className={`text-2xl text-white ${getFontFamily()} flex items-center gap-2`}
                    >
                      <Trophy className="h-5 w-5" />
                      Accomplissements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-6 justify-center">
                      <div className="relative p-6">
                        <div className="flex justify-center items-end gap-6 h-40">
                          <div className="relative group">
                            <div
                              className={`w-16 h-28 bg-gradient-to-t ${getAccentColor()} rounded-t-lg transition-all duration-300 group-hover:h-32 shadow-lg relative overflow-hidden`}
                            >
                              <div className="absolute inset-0 bg-white/10 bg-opacity-20 backdrop-filter backdrop-blur-sm"></div>
                              <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-white text-2xl font-bold">
                                2
                              </div>
                            </div>
                            <div className="absolute -bottom-6 left-0 right-0 text-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Quêtes
                            </div>
                          </div>

                          <div className="relative group">
                            <div
                              className={`w-16 h-36 bg-gradient-to-t ${getAccentColor()} rounded-t-lg transition-all duration-300 group-hover:h-40 shadow-lg relative overflow-hidden`}
                            >
                              <div className="absolute inset-0 bg-white/10 bg-opacity-20 backdrop-filter backdrop-blur-sm"></div>
                              <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-white text-2xl font-bold">
                                1
                              </div>
                            </div>
                            <div className="absolute -bottom-6 left-0 right-0 text-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Explorations
                            </div>
                          </div>

                          <div className="relative group">
                            <div
                              className={`w-16 h-24 bg-gradient-to-t ${getAccentColor()} rounded-t-lg transition-all duration-300 group-hover:h-28 shadow-lg relative overflow-hidden`}
                            >
                              <div className="absolute inset-0 bg-white/10 bg-opacity-20 backdrop-filter backdrop-blur-sm"></div>
                              <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-white text-2xl font-bold">
                                3
                              </div>
                            </div>
                            <div className="absolute -bottom-6 left-0 right-0 text-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Trésors
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-64">
                        <h3
                          className={`text-lg font-semibold text-white mb-3 ${getFontFamily()}`}
                        >
                          Statistiques
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-white/70">
                                Niveau d'exploration
                              </span>
                              <span className="text-sm text-white">7/10</span>
                            </div>
                            <div className="w-full bg-black/30 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full bg-gradient-to-r ${getAccentColor()}`}
                                style={{ width: "70%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-white/70">
                                Réputation
                              </span>
                              <span className="text-sm text-white">5/10</span>
                            </div>
                            <div className="w-full bg-black/30 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full bg-gradient-to-r ${getAccentColor()}`}
                                style={{ width: "50%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-white/70">
                                Connaissances
                              </span>
                              <span className="text-sm text-white">3/10</span>
                            </div>
                            <div className="w-full bg-black/30 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full bg-gradient-to-r ${getAccentColor()}`}
                                style={{ width: "30%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
