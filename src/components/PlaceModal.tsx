// components/PlaceModal.tsx
"use client";

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

interface Place {
  name: string;
  description: string;
  image: string[]; // Assurez-vous que c'est bien un tableau
  anecdotes: string[];
  race: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  place: Place;
}

export default function PlaceModal({ open, onOpenChange, place }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6 z-[9999]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{place.name}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {place.description}
          </DialogDescription>
        </DialogHeader>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {Array.isArray(place.image) &&
              place.image.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    src={`/img/places/${place.race}/${img}`}
                    alt={`${place.name} - Image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg my-4"
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          {place.image.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
        <ul className="list-disc ml-5 space-y-1 text-sm">
          {place.anecdotes.map((anec, index) => (
            <li key={index}>{anec}</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
