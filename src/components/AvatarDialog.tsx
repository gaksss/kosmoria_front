import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface AvatarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  avatars: string | string[];
  onSelect: (avatar: string) => void;
  race: string;
}

export function AvatarDialog({
  open,
  onOpenChange,
  avatars,
  onSelect,
  race,
}: AvatarDialogProps) {
  const avatarList = Array.isArray(avatars) ? avatars : [avatars];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle>Choisir un avatar</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
          {avatarList.map((avatar, index) => (
            <div
              key={index}
              className="relative cursor-pointer group"
              onClick={() => {
                onSelect(avatar);
                onOpenChange(false);
              }}
            >
              <Image
                src={avatar}
                alt={`Avatar ${index + 1}`}
                width={100}
                height={100}
                className="rounded-xl border border-white/20 transition-all duration-300 
                  group-hover:scale-105 group-hover:border-white/50 group-hover:shadow-lg"
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}