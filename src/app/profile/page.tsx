"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { AvatarDialog } from "@/components/AvatarDialog";

interface Race {
  hobbit: string;
  elves: string;
  gondor: string;
  rohan: string;
  isengard: string;
  dwarf: string;
  mordor: string;
}

interface RaceGradients extends Record<keyof Race, string> {}

interface AvatarByRace {
  hobbit: string[];
  elves: string;
  gondor: string;
  rohan: string;
  isengard: string;
  dwarf: string;
  mordor: string;
}

const raceGradients: RaceGradients = {
  hobbit: "bg-gradient-to-b from-green-800 to-green-950 border-green-700",
  elves: "bg-gradient-to-b from-blue-800 to-blue-950 border-blue-600",
  gondor: "bg-gradient-to-b from-slate-700 to-slate-950 border-slate-500",
  rohan: "bg-gradient-to-b from-amber-800 to-amber-950 border-amber-700",
  isengard: "bg-gradient-to-b from-zinc-700 to-zinc-950 border-zinc-600",
  dwarf: "bg-gradient-to-b from-red-800 to-red-950 border-red-700",
  mordor: "bg-gradient-to-b from-red-900 to-black border-red-900",
};

const avatarByRace: AvatarByRace = {
  hobbit: ["/avatars/hobbit/frodo.webp", "/avatars/hobbit/bilbo.webp", "/avatars/hobbit/merry.webp", "/avatars/hobbit/pipin.webp", "/avatars/hobbit/sam.webp"],
  elves: "/img/legolas.jpg",
  gondor: "/img/aragon.jpg",
  rohan: "/img/eomer.jpg",
  isengard: "/img/saruman.jpg",
  dwarf: "/img/gimli.jpg",
  mordor: "/img/sauron.jpg",
};

export default function ProfilePage() {
  const [race, setRace] = useState<keyof Race>("hobbit");
  const [avatar, setAvatar] = useState<string | string[]>(avatarByRace["hobbit"]);
  const [avatarKey, setAvatarKey] = useState<number>(0);
  const { user, isAuthenticated, logout } = useAuth();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  console.log(user);

  const handleRaceChange = (newRace: keyof Race) => {
    setRace(newRace);
    setAvatar(avatarByRace[newRace]);
    setAvatarKey((prev) => prev + 1);
  };

  const handleRandomAvatar = () => {
    setDialogOpen(true);
  };

  const handleAvatarSelect = (selectedAvatar: string) => {
    setAvatar(selectedAvatar);
    setAvatarKey((prev) => prev + 1);
  };

  return (
    <main
      className={`min-h-screen p-4 text-white ${
        raceGradients[race as keyof typeof raceGradients]
      } font-serif transition-all duration-500`}
      style={{ fontFamily: "Ringbearer, serif" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-yellow-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Profil du Voyageur
          </h1>
          <Link href="/">
            <Button
              variant="outline"
              className="text-white border-white relative overflow-hidden group transition-all duration-300
      before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r 
      before:from-white/0 before:via-white/10 before:to-white/0
      before:transition-transform before:duration-500 hover:before:translate-x-[100%]
      hover:bg-white/10 hover:text-yellow-100 cursor-pointer"
            >
              <span className="relative z-10">
                Retour à la carte
              </span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="col-span-1 bg-black/30 backdrop-blur-sm border border-white/10 shadow-xl">
              <CardContent className="space-y-4 pt-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Peuples
                  </label>
                  <Select value={race} onValueChange={handleRaceChange}>
                    <SelectTrigger className="w-full bg-black/50 border border-white/20 text-white hover:border-white transition-all duration-300 cursor-pointer">
                      <SelectValue placeholder="Choisir un peuple" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 text-white border-white/10">
                      <SelectItem
                        value="hobbit"
                        className="hover:bg-green-800/30 cursor-pointer"
                      >
                        Hobbit
                      </SelectItem>
                      <SelectItem
                        value="elves"
                        className="hover:bg-blue-800/30 cursor-pointer"
                      >
                        Elfes
                      </SelectItem>
                      <SelectItem
                        value="gondor"
                        className="hover:bg-slate-700/30 cursor-pointer"
                      >
                        Gondor
                      </SelectItem>
                      <SelectItem
                        value="rohan"
                        className="hover:bg-amber-800/30 cursor-pointer"
                      >
                        Rohan
                      </SelectItem>
                      <SelectItem
                        value="isengard"
                        className="hover:bg-zinc-700/30 cursor-pointer"
                      >
                        Isengard
                      </SelectItem>
                      <SelectItem value="dwarf" className="hover:bg-red-800/30 cursor-pointer">
                        Nain
                      </SelectItem>
                      <SelectItem
                        value="mordor"
                        className="hover:bg-red-900/30 cursor-pointer"
                      >
                        Mordor
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col items-center space-y-2 transition-all duration-500">
                  <Image
                    key={avatarKey}
                    src={Array.isArray(avatar) ? avatar[0] : avatar}
                    alt="Avatar"
                    width={100}
                    height={100}
                    className="rounded-xl border border-white shadow-lg transition-transform duration-500 hover:scale-105 cursor-pointer "
                  />
                  <Button
                    onClick={handleRandomAvatar}
                    variant="secondary"
                    className="hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  >
                    Changer de personnage
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Pseudo</label>
                  <Input
                    defaultValue="Test"
                    className="hover:ring-2 hover:ring-white/30 transition-all duration-300 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email</label>
                  <Input
                    defaultValue="test@test.com"
                    className="hover:ring-2 hover:ring-white/30 transition-all duration-300 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Mot de passe</label>
                  <Input
                    type="password"
                    defaultValue="123456789"
                    className="hover:ring-2 hover:ring-white/30 transition-all duration-300 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">
                    Confirmer Mot de passe
                  </label>
                  <Input
                    type="password"
                    defaultValue="123456789"
                    className="hover:ring-2 hover:ring-white/30 transition-all duration-300 cursor-pointer"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                  >
                    Vider
                  </Button>
                  <Button className="hover:bg-white/20 transition-all duration-300 cursor-pointer">
                    Modifier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="md:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-black/30 backdrop-blur-sm border border-white/10 shadow-xl">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Marqueurs enregistrés
                  </h2>
                  <ul className="list-disc list-inside text-sm text-white/90">
                    <li>Fondcombe (Rivendell) - refuge elfe</li>
                    <li>Minas Tirith - capitale du Gondor</li>
                    <li>La Comté - terre des hobbits</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-black/30 backdrop-blur-sm border border-white/10 shadow-xl">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Scores</h2>
                  <div className="flex justify-center items-end gap-4">
                    <div className="w-12 h-20 bg-white text-black flex justify-center items-center font-bold rounded-t-md hover:scale-105 transition-transform duration-300 cursor-pointer">
                      2
                    </div>
                    <div className="w-12 h-24 bg-white text-black flex justify-center items-center font-bold rounded-t-md hover:scale-105 transition-transform duration-300 cursor-pointer">
                      1
                    </div>
                    <div className="w-12 h-16 bg-white text-black flex justify-center items-center font-bold rounded-t-md hover:scale-105 transition-transform duration-300 cursor-pointer">
                      3
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <AvatarDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        avatars={avatarByRace[race as keyof typeof avatarByRace]}
        onSelect={handleAvatarSelect}
        race={race}
      />
    </main>
  );
}
