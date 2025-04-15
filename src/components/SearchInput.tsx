"use client"

import * as React from "react"
import { Check, ChevronsUpDown, MapPin, Map } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { locations, paths } from "@/data/locations"

interface FilteredResults {
  locations: typeof locations;
  paths: typeof paths;
}

interface SearchInputProps {
  defaultValue?: string
  onLocationSelect?: (location: typeof locations[0]) => void
  onPathSelect?: (path: typeof paths[0]) => void
}

export function SearchInput({ defaultValue, onLocationSelect, onPathSelect }: SearchInputProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue || "")
  const [searchQuery, setSearchQuery] = React.useState("")

  // Fonction de filtrage des résultats
  const getFilteredResults = (): FilteredResults => {
    const query = searchQuery.toLowerCase()
    if (!query) return { locations: [], paths: [] }  // Retourne un objet vide mais typé

    const filteredLocations = locations.filter(location =>
      location.name.toLowerCase().includes(query) ||
      location.description?.toLowerCase().includes(query)
    )

    const filteredPaths = paths.filter(path =>
      path.name.toLowerCase().includes(query) ||
      path.description?.toLowerCase().includes(query)
    )

    return {
      locations: filteredLocations,
      paths: filteredPaths,
    }
  }

  const results = getFilteredResults()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-lg font-semibold lg:pr-24 relative -left-4 w-full justify-between"
        >
          {value || "Rechercher..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[300px] p-0 bg-background" 
        side="right" 
        align="start"
        sideOffset={8}
      >
        <Command>
          <CommandInput 
            placeholder="Rechercher..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-9" 
          />
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          {searchQuery && (
            <>
              {results.locations.length > 0 && (
                <CommandGroup heading="Lieux">
                  {results.locations.map((location) => (
                    <CommandItem
                      key={location.name}
                      value={location.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue)
                        setOpen(false)
                        if (onLocationSelect) {
                          onLocationSelect(location)
                        }
                      }}
                      className="text-lg font-semibold"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {location.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {results.paths.length > 0 && (
                <CommandGroup heading="Parcours">
                  {results.paths.map((path) => (
                    <CommandItem
                      key={path.name}
                      value={path.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue)
                        setOpen(false)
                        if (onPathSelect) {
                          onPathSelect(path)
                        }
                      }}
                      className="text-lg font-semibold"
                    >
                      <Map className="mr-2 h-4 w-4" />
                      {path.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}