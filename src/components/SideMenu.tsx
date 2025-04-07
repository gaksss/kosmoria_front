import Image from "next/image";
import React from "react";

const SideMenu = () => {
  return (
    <nav className="fixed left-0 h-screen w-1/7 bg-background text-white flex flex-col items-start gap-4 p-4">
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
        <li className="text-lg font-semibold">Home</li>
        <li className="text-lg font-semibold">About</li>
        <li className="text-lg font-semibold">Contact</li>
      </ul>
    </nav>
  );
};

export default SideMenu;
