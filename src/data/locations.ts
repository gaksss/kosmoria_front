// src/data/locations.ts
export const locations = [
  {
    name: "Mordor",
    position: [260, 770],
    icon: "/icons/mordor.png",
    description: "BaradDur",
  },
  {
    name: "Minas Tirith",
    position: [232, 655],
    icon: "/icons/gondor.png",
    description: "Minas Tirith",
  },
  {
    name: "Fondcombe",
    position: [567, 498],
    icon: "/icons/elves.png",
    description: "Fondcombe",
  },
  {
    name: "La comté",
    position: [558, 265],
    icon: "/icons/hobbit.png",
    description: "La comté",
  },
  {
    name: "Isengard",
    position: [354, 453],
    icon: "/icons/isengard.png",
    description: "Isengard",
  },
  {
    name: "Edoras",
    position: [291, 507],
    icon: "/icons/rohan.png",
    description: "Edoras",
  }
];

export const polygonPositions: [number, number][] = [
  [287, 690],
  [121, 713.0172767503884],
  [121, 830.5179361683421],
  [133, 880.0379824741362],
  [147, 901.532311479734],
  [180, 930.0247941150611],
  [291.5, 937.5228158611999],
  [279.5, 862.0427302834032],
  [269, 811.4912956830105]
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
      [269, 811.4912956830105]
    ],
    name: "Mordor",
    description: "Les terres sombres de Mordor",
    color: 'red',
    fillColor: 'darkred',
    fillOpacity: 0.3
  },
  {
    positions: [
      [558, 265],
      [600, 265],
      [600, 300],
      [558, 300]
    ],
    name: "La Comté",
    description: "Terres des Hobbits",
    color: 'green',
    fillColor: 'lightgreen',
    fillOpacity: 0.4
  }
];
