"use client"


import Image from "next/image";
import Localisation from "./Localisation";
import { locations, paths } from "@/data/locations";
import Parcours from "./Parcours";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";

const SideMenu = ({
  onSelectLocation,
  onSelectPath,
}: {
  onSelectLocation: (location: (typeof locations)[0]) => void;
  onSelectPath: (path: (typeof paths)[0]) => void;
}) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed left-0 h-screen w-1/7 bg-background text-white flex flex-col items-start gap-4 p-4 z-50">
      <div className="flex items-center justify-center gap-2 w-full mt-10">
        <Image src="/img/logo.png" alt="logo" width={80} height={80} />
      </div>
      <div
        id="title"
        className="flex items-center justify-center gap-2 mb-4 w-full mt-10"
      >
        <h1 className="text-3xl font-bold">Kosmoria</h1>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Rechercher</h2>
      </div>
      <ul className="flex flex-col gap-4 mt-4">
        <li className="text-lg font-semibold">
          <Localisation onSelectLocation={onSelectLocation} />
        </li>
        <li className="text-lg font-semibold">
          <Parcours onSelectPath={onSelectPath} />
        </li>
        <li>
          <Link href="/login" className="text-lg font-semibold">
            Connexion
          </Link>
        </li>
       
      </ul>
    </nav>
  );
};

export default SideMenu;
