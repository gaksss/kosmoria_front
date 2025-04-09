import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { locations } from "@/data/locations";
import Link from "next/link";




const Localisation = () => {
  
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList >
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-lg font-semibold lg:pr-24" >
              Localisations
            </NavigationMenuTrigger>
            <NavigationMenuContent className="z-50 absolute ">
              {locations.map((loc, i) => (
                <NavigationMenuLink className="text-lg font-semibold" key={i}>
                  <Link href="/" className="hover:text-gray-300">{loc.name}</Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Localisation;
