// components/PlaceModal.tsx
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface Place {
  name: string
  description: string
  image: string
  anecdotes: string[]
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  place: Place
}

export default function PlaceModal({ open, onOpenChange, place }: Props) {
  console.log("Modal ouvert ?", open); // Debug

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6 z-[9999]"> {/* Ajout du z-index si nécessaire */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{place.name}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {place.description}
          </DialogDescription>
        </DialogHeader>
        <img
          src={place.image}
          alt={place.name}
          className="w-full rounded-lg my-4"
        />
        <ul className="list-disc ml-5 space-y-1 text-sm">
          {place.anecdotes.map((anec, index) => (
            <li key={index}>{anec}</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
