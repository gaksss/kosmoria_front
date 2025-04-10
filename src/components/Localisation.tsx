import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { locations } from "@/data/locations";

const Localisation = ({
  onSelectLocation,
}: {
  onSelectLocation: (loc: (typeof locations)[0]) => void;
}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg font-semibold lg:pr-24 relative -left-4">
            Localisations
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 absolute">
            {locations.map((loc) => (
              <NavigationMenuLink
                className="text-lg font-semibold"
                key={loc.name}
              >
                <button
                  onClick={() => onSelectLocation(loc)}
                  className="hover:text-gray-300 w-full text-left"
                >
                  {loc.name}
                </button>
                <hr/>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Localisation;
