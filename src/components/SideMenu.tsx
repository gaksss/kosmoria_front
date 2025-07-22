"use client";

import Image from "next/image";
import Localisation from "./Localisation";
import { locations, paths } from "@/data/locations";
import Parcours from "./Parcours";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { SearchInput } from "./SearchInput";
import logo from "../../public/img/logo.png";

const SideMenu = ({
  onSelectLocation,
  onSelectPath,
}: {
  onSelectLocation: (location: (typeof locations)[0]) => void;
  onSelectPath: (path: (typeof paths)[0]) => void;
}) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true); // Menu initialisé comme ouvert
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <div>
      <nav
        className={`fixed left-0 bottom-0 h-screen transition-all duration-300 ease-in-out menu-glow 
      ${
        mobileMenuOpen
          ? "w-64 opacity-100 translate-y-0"
          : "w-0 opacity-0 translate-y-[calc(100%-50px)] pointer-events-none"
      } 
      bg-background text-white flex flex-col items-start gap-4 p-4 z-50
      origin-bottom-left`}
      >
        <div className="flex items-center justify-center gap-2 w-full mt-10">
          <Image src="/img/logo.png" alt="logo" width={80} height={80} />
        </div>
        <div
          id="title"
          className="flex items-center justify-center gap-2 mb-4 w-full mt-10"
        >
          <h1 className="text-3xl font-elven">Kosmoria</h1>
        </div>
        <div className="flex justify-center w-full pl-5">
          <SearchInput
            onLocationSelect={onSelectLocation}
            onPathSelect={onSelectPath}
          />
        </div>
        <ul className="flex flex-col gap-4 mt-4">
          <li className="text-lg font-semibold">
            <Localisation onSelectLocation={onSelectLocation} />
          </li>
          <li className="text-lg font-semibold">
            <Parcours onSelectPath={onSelectPath} />
          </li>
          <li className="text-lg font-semibold">
            <Link href="/character">Personnages</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="text-lg font-semibold">
                <Link href="/profile">Profil</Link>
              </li>
              <li
                onClick={logout}
                className="text-lg font-semibold cursor-pointer"
              >
                Se déconnecter
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="text-lg font-semibold">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-lg font-semibold">
                  Inscription
                </Link>
              </li>
            </>
          )}
        </ul>
        {/* Button to close the menu */}
        <button
          onClick={toggleMenu}
          className="absolute bottom-5 left-5 text-white text-2xl"
        >
          &#10005;
        </button>
      </nav>

      {/* Logo rond pour réouvrir le menu */}
      <div
        onClick={toggleMenu}
        className={`fixed bottom-5 left-5 cursor-pointer z-50 transition-all duration-300
      ${
        mobileMenuOpen ? "opacity-0 scale-150" : "opacity-100 hover:scale-110"
      }`}
      >
        <Image
          src={logo}
          alt="Ouvrir le menu"
          width={80}
          height={80}
          className="rounded-full border-4 border-white shadow-lg"
        />
      </div>
    </div>
  );
};

export default SideMenu;
