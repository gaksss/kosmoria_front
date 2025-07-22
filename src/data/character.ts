// data/charactersDetailed.ts

export interface LotrCharacter {
  id: number;
  name: string;
  race: string;
  photo: string;
  description: string;
}

export const data: LotrCharacter[] = [];

export const characters: LotrCharacter[] = [
  {
    id: 1,
    name: "Frodo Baggins",
    race: "Hobbit",
    photo: "/avatars/hobbit/frodo.webp",
    description:
      "Le porteur de l'Anneau, chargé de détruire le Mal en le jetant dans les flammes de la Montagne du Destin.",
  },
  {
    id: 2,
    name: "Samwise Gamgee",
    race: "Hobbit",
    photo: "/avatars/hobbit/sam.webp",
    description:
      "Fidèle compagnon de Frodo, courageux et dévoué, il l’a soutenu jusqu’au bout dans sa quête.",
  },
  {
    id: 3,
    name: "Gandalf",
    race: "Maïar",
    photo: "/avatars/maiar/gandalf.webp",
    description:
      "Mage puissant et sage, guide des héros dans leur lutte contre les forces obscures de la Terre du Milieu.",
  },
  {
    id: 4,
    name: "Aragorn",
    race: "Humain (Dúnedain)",
    photo: "/avatars/humain/aragorn.webp",
    description:
      "Héritier des rois anciens, guerrier habile et leader charismatique, il lutte pour restaurer le royaume de Gondor.",
  },
  {
    id: 5,
    name: "Legolas",
    race: "Elfe (Sindar)",
    photo: "/avatars/elfe/legolas.webp",
    description:
      "Archer elfique au regard perçant, membre de la communauté de l'Anneau, maître de la forêt et de la nature.",
  },
  {
    id: 6,
    name: "Gimli",
    race: "Nain",
    photo: "/avatars/nain/gimli.webp",
    description:
      "Guerrier nain robuste et fier, il forge une amitié improbable avec Legolas malgré la rivalité entre leurs peuples.",
  },
  {
    id: 7,
    name: "Boromir",
    race: "Humain",
    photo: "/avatars/humain/boromir.webp",
    description:
      "Fils du gouverneur de Gondor, héros courageux mais tiraillé par la tentation de l’Anneau.",
  },
  {
    id: 8,
    name: "Galadriel",
    race: "Elfe (Noldor)",
    photo: "/avatars/elfe/galadriel.webp",
    description:
      "Puissante dame elfique, gardienne de Lothlórien, elle possède un savoir et une magie anciens.",
  },
  {
    id: 9,
    name: "Elrond",
    race: "Elfe (Half-elf)",
    photo: "/avatars/elfe/elrond.webp",
    description:
      "Seigneur d’Imladris, sage et stratège, il aide la communauté dans sa quête et protège ses terres.",
  },
  {
    id: 10,
    name: "Saruman",
    race: "Maïa",
    photo: "/avatars/maiar/saruman.webp",
    description:
      "Autrefois chef des magiciens, il succombe à la tentation du pouvoir et trahit la communauté.",
  },
  {
    id: 11,
    name: "Sauron",
    race: "Maïa",
    photo: "/avatars/maiar/sauron.webp",
    description:
      "Seigneur des ténèbres, créateur de l'Anneau unique, il cherche à dominer toute la Terre du Milieu.",
  },
  {
    id: 12,
    name: "Gollum",
    race: "Hobbit (corrompu)",
    photo: "/avatars/hobbit/gollum.webp",
    description:
      "Ancien porteur de l’Anneau, rongé par sa possession, tiraillé entre sa nature et sa folie.",
  },
  {
    id: 13,
    name: "Éowyn",
    race: "Humaine (Rohirrim)",
    photo: "/avatars/humain/eowyn.webp",
    description:
      "Guerrière courageuse du Rohan, elle défie les attentes pour combattre et protéger son peuple.",
  },
  {
    id: 14,
    name: "Théoden",
    race: "Humain (Rohirrim)",
    photo: "/avatars/humain/theoden.webp",
    description:
      "Roi du Rohan, redonne espoir à son peuple pour résister à l’invasion de Saruman.",
  },
  {
    id: 15,
    name: "Faramir",
    race: "Humain",
    photo: "/avatars/humain/faramir.webp",
    description:
      "Frère de Boromir, noble et sage, il résiste à la tentation de l’Anneau et protège Gondor.",
  },
  {
    id: 16,
    name: "Merry Brandybuck",
    race: "Hobbit",
    photo: "/avatars/hobbit/merry.webp",
    description:
      "Hobbit loyal et astucieux, compagnon de Frodo dans la quête, courageux malgré sa petite taille.",
  },
  {
    id: 17,
    name: "Pippin Took",
    race: "Hobbit",
    photo: "/avatars/hobbit/pipin.webp",
    description:
      "Jeune hobbit espiègle, il grandit au fil de la quête pour devenir un héros à part entière.",
  },
  {
    id: 18,
    name: "Arwen",
    race: "Elfe (Half-elf)",
    photo: "/avatars/elfe/arwen.webp",
    description:
      "Fille d’Elrond, elle fait le choix difficile de renoncer à son immortalité pour l’amour d’Aragorn.",
  },
];
