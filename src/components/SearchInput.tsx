"use client";

import * as React from "react";
import { ChevronsUpDown, MapPin, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { locations, paths } from "@/data/locations";

interface FilteredResults {
  locations: typeof locations;
  paths: typeof paths;
}

interface SearchInputProps {
  defaultValue?: string;
  onLocationSelect?: (location: (typeof locations)[0]) => void;
  onPathSelect?: (path: (typeof paths)[0]) => void;
}

export function SearchInput({
  defaultValue,
  onLocationSelect,
  onPathSelect,
}: SearchInputProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue || "");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery]);

  React.useEffect(() => {
    const ref = itemRefs.current[activeIndex];
    if (ref) {
      ref.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const getFilteredResults = (): FilteredResults => {
    const query = searchQuery.toLowerCase();
    if (!query) return { locations: [], paths: [] };

    const filteredLocations = locations.filter(
      (location) =>
        location.name.toLowerCase().includes(query) ||
        location.description?.toLowerCase().includes(query)
    );

    const filteredPaths = paths.filter(
      (path) =>
        path.name.toLowerCase().includes(query) ||
        path.description?.toLowerCase().includes(query)
    );

    return {
      locations: filteredLocations,
      paths: filteredPaths,
    };
  };

  const results = getFilteredResults();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < results.locations.length + results.paths.length - 1
            ? prev + 1
            : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          const isLocation = activeIndex < results.locations.length;

          if (isLocation) {
            const item = results.locations[activeIndex];
            setValue(item.name);
            setOpen(false);
            onLocationSelect?.(item); // ← TS sait que c’est une Location
          } else {
            const item = results.paths[activeIndex - results.locations.length];
            setValue(item.name);
            setOpen(false);
            onPathSelect?.(item); // ← TS sait que c’est un Path
          }
        }
        break;
    }
  };

  // Reset itemRefs when results change
  itemRefs.current = [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Rechercher un lieu ou un parcours"
          aria-controls="search-menu"
          className="text-lg font-semibold lg:pr-24 relative -left-4 w-full justify-between"
          onClick={() => setOpen(true)}
        >
          {value || "Rechercher..."}
          <ChevronsUpDown
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-0 bg-background max-h-72 overflow-y-auto"
        side="right"
        align="start"
        sideOffset={8}
        id="search-menu"
        role="dialog"
        aria-label="Résultats de recherche"
      >
        <Command onKeyDown={handleKeyDown}>
          <CommandInput
            placeholder="Rechercher..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-9"
            aria-label="Saisissez votre recherche"
          />
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          {searchQuery && (
            <>
              {results.locations.length > 0 && (
                <CommandGroup heading="Lieux">
                  {results.locations.map((location, index) => (
                    <CommandItem
                      key={location.name}
                      value={location.name}
                      onSelect={() => {
                        setValue(location.name);
                        setOpen(false);
                        if (onLocationSelect) {
                          onLocationSelect(location);
                        }
                      }}
                      className={cn(
                        "text-lg font-semibold p-2 cursor-pointer",
                        activeIndex === index
                          ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary"
                          : "",
                        "hover:bg-primary/80 hover:text-primary-foreground"
                      )}
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      role="option"
                      aria-selected={activeIndex === index}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {location.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {results.paths.length > 0 && (
                <CommandGroup heading="Parcours">
                  {results.paths.map((path, index) => {
                    // Utiliser un index global unique basé sur la combinaison des groupes
                    const globalIndex = index + results.locations.length;

                    return (
                      <CommandItem
                        key={path.name}
                        value={path.name}
                        onSelect={() => {
                          setValue(path.name);
                          setOpen(false);
                          if (onPathSelect) {
                            onPathSelect(path);
                          }
                        }}
                        className={cn(
                          "text-lg font-semibold p-2 cursor-pointer",
                          activeIndex === globalIndex
                            ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary"
                            : "",
                          "hover:bg-primary/80 hover:text-primary-foreground"
                        )}
                        ref={(el) => {
                            itemRefs.current[globalIndex] = el;
                          }}
                          
                        role="option"
                        aria-selected={activeIndex === globalIndex}
                      >
                        <Map className="mr-2 h-4 w-4" />
                        {path.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
