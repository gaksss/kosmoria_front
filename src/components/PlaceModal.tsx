"use client";

import { type Place } from "@/types/Place";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  place: Place;
}

export default function PlaceModal({ open, onOpenChange, place }: Props) {
  const hasMultipleImages = place.image.length > 1;

  // Définition des styles par race
  const raceGradients = {
    hobbit: "bg-gradient-to-b from-green-900 to-green-950 border-green-600",
    elves: "bg-gradient-to-b from-blue-900 to-blue-950 border-blue-500",
    gondor: "bg-gradient-to-b from-slate-800 to-slate-950 border-slate-400",
    rohan: "bg-gradient-to-b from-amber-900 to-amber-950 border-amber-600",
    isengard: "bg-gradient-to-b from-zinc-800 to-zinc-950 border-zinc-500",
    dwarf: "bg-gradient-to-b from-red-900 to-red-950 border-red-600",
    mordor: "bg-gradient-to-b from-red-950 to-black border-red-900",
  };

  const modalClass = `max-w-4xl px-13 z-[9999] shadow-lg ${raceGradients[place.race as keyof typeof raceGradients]}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={modalClass}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">{place.name}</DialogTitle>
          <DialogDescription className="text-gray-300">
            {place.description}
          </DialogDescription>
        </DialogHeader>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {place.image.map((img, index) => (
              <CarouselItem key={`${place.name}-image-${index}`}>
                <img
                  src={`/img/places/${place.race}/${img}`}
                  alt={`${place.name} - Image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg my-4 border border-opacity-20"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
            {hasMultipleImages && (
              <>
                <CarouselPrevious className="bg-transparent"  />
                <CarouselNext className="bg-transparent" />
              </>
            )}
        </Carousel>
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-200">
          {place.anecdotes.map((anecdote, index) => (
            <li key={`${place.name}-anecdote-${index}`}>{anecdote}</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
