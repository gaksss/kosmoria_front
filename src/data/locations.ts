// src/data/locations.ts
export const locations: {
  name: string;
  position: [number, number];
  icon: string;
  description: string;
  image: string[];
  anecdotes: string[];
  race: string;
}[] = [
  {
    name: "Mordor",
    position: [260, 770],
    icon: "/icons/mordor.png",
    description:
      "Terre sombre et menaçante, Mordor est le royaume de Sauron. On y trouve la forteresse de Barad-dûr et le Mont Destin.",
    image: ["mordor.webp", "mordorBattle.jpg"],
    anecdotes: [
      "Le Mont Destin est le seul endroit où l'Anneau Unique peut être détruit.",
      "La tour de Barad-dûr a été reconstruite grâce à la puissance de l'Anneau.",
    ],
    race: "mordor",
  },
  {
    name: "Minas Tirith",
    position: [232, 655],
    icon: "/icons/gondor.png",
    description:
      "Capitale majestueuse du Gondor, Minas Tirith est une cité fortifiée à sept niveaux.",
    image: ["minas.jpg", "minasPlan.png", "minasSiege.avif"],
    anecdotes: [
      "La bibliothèque de Minas Tirith contient des manuscrits très anciens sur l’Anneau.",
      "Le feu d’alarme de Minas Tirith est visible depuis le Rohan.",
    ],
    race: "gondor",
  },
  {
    name: "Fondcombe",
    position: [567, 498],
    icon: "/icons/elves.png",
    description:
      "Havre paisible des elfes dirigé par Elrond, Fondcombe est un lieu de savoir et de repos.",
    image: ["rivendell.webp", "rivendellFrodon.jpg"],
    anecdotes: [
      "C’est ici que s’est tenue la fameuse réunion de la communauté de l’Anneau.",
      "Elrond a plus de 6 000 ans.",
    ],
    race: "elves",
  },
  {
    name: "La Comté",
    position: [558, 265],
    icon: "/icons/hobbit.png",
    description: "Région paisible et verdoyante habitée par les Hobbits.",
    image: ["shire.webp", "cds.webp"],
    anecdotes: [
      "Les Hobbits mesurent en moyenne 1 mètre de haut.",
      "Frodon a quitté la Comté à l’âge de 50 ans.",
    ],
    race: "hobbit",
  },
  {
    name: "Isengard",
    position: [354, 453],
    icon: "/icons/isengard.png",
    description:
      "Ancienne tour de Saroumane devenue lieu industriel pour ses armées.",
    image: ["isengardAfter.webp", "isengardTower.jpg"],
    anecdotes: [
      "Les Ents ont inondé Isengard pour le neutraliser.",
      "Saroumane a détruit la forêt autour d'Isengard pour alimenter ses forges.",
    ],
    race: "isengard",
  },
  {
    name: "Edoras",
    position: [291, 507],
    icon: "/icons/rohan.png",
    description: "Capitale du Rohan, connue pour son palais doré de Meduseld.",
    image: ["edoras.webp", "edorasMountain.jpg"],
    anecdotes: [
      "Théoden, roi du Rohan, y a retrouvé sa volonté de se battre.",
      "Les Rohirrim sont de célèbres cavaliers.",
    ],
    race: "rohan",
  },
  {
    name: "Moria",
    position: [471, 488.08],
    icon: "/icons/dwarf.png",
    description:
      "Ancienne cité naine aujourd’hui abandonnée, infestée de créatures.",
    image: ["moria.webp", "balrogGandalf.webp"],
    anecdotes: [
      "Balin, ami de Bilbon, y a tenté de reconstruire un royaume nain.",
      "Un Balrog ancien s'y cache dans les profondeurs.",
    ],
    race: "dwarf",
  },
];

export interface PolygonArea {
  positions: [number, number][];
  name: string;
  description: string;
  color: string;
  fillColor: string;
  fillOpacity: number;
}

export const polygonAreas: PolygonArea[] = [
  {
    positions: [
      [287, 690],
      [121, 713.0172767503884],
      [121, 830.5179361683421],
      [133, 880.0379824741362],
      [147, 901.532311479734],
      [180, 930.0247941150611],
      [291.5, 937.5228158611999],
      [279.5, 862.0427302834032],
      [269, 811.4912956830105],
    ],
    name: "Mordor",
    description: "Les terres sombres de Mordor",
    color: "red",
    fillColor: "darkred",
    fillOpacity: 0.3,
  },
  {
    positions: [
      [558, 265],
      [600, 265],
      [600, 300],
      [558, 300],
    ],
    name: "La Comté",
    description: "Terres des Hobbits",
    color: "green",
    fillColor: "lightgreen",
    fillOpacity: 0.4,
  },
];
