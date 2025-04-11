import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { paths } from "@/data/locations";

const Parcours = ({ onSelectPath }: { onSelectPath: (path: typeof paths[0]) => void }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg font-semibold lg:pr-24 relative -left-4">
            Parcours
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 absolute">
            {paths.map((path) => (
              <NavigationMenuLink className="text-lg font-semibold" key={path.name}>
                <button
                  onClick={() => onSelectPath(path)}
                  className="hover:text-gray-300 w-full text-left"
                >
                  {path.name}
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

export default Parcours;
