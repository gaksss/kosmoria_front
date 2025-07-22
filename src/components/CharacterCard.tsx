// components/ProfileCard.tsx
import Image from "next/image";
import { LotrCharacter } from "../data/character";

interface ProfileCardProps extends LotrCharacter {
  onClick: (character: LotrCharacter) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { name, race, photo, onClick } = props;

  return (
    <div
      onClick={() => onClick(props)}
      className="cursor-pointer group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <Image
          src={photo}
          alt={name}
          className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
          height={400}
          width={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-4 bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-teal-50/50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/30">
        <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {name}
        </h2>
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-sm"></div>
          <p className="text-sm text-muted-foreground font-medium">{race}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
