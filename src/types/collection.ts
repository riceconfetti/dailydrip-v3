import { type DirectusFile } from "@directus/sdk";

interface DripFile extends DirectusFile {
  focal_size: number;
}

interface Game {
  id: string;
  name: string;
  elementMain: boolean;
  numOfRateUpCharacters: number;
  numOfRateUpWeapons: number;
  color: string;
  sizes: { id: string; x: number; y: number }[];
}

interface Server {
  id: string;
  game: Game | string;
  name: string;
  timezone: string;
}

interface Attribute {
  id: number;
  game: Game | string;
  name: string;
  primary: boolean;
  image: DripFile;
  bg: DripFile;
}

interface Character {
  id: string;
  splash_art: DripFile | string;
  splash_pad: DripFile | string;
  name: string;
  game: Game | string;
  rarity: 5 | 4;
  bannerName: string;
  primary_attribute: Attribute | number;
  secondary_attribute: Attribute | number;
  signature?: Weapon | string;
  imgopts: { id: string; zoom: number; pos_x: number; pos_y: number }[];
  colors: {
    area: number;
    css: string;
    l: number;
    c: number;
    h: number;
    hex: string;
  }[];
  events: EventCharacter[] | string[];
}

interface EventCharacter {
  id: number;
  characters_id: Character | string;
  events_id: DripEvent | string;
  spec: boolean;
}

interface DripEvent {
  id: string;
  game: Game | string;
  version: Version | string;
  phase: Phase | number;
  full_version: boolean;
  startDate: string;
  endDate: string;
  featured_characters: EventCharacter[] | any[];
  featured_weapons: EventWeapon[] | any[];
  status: "published" | "draft" | "archived";
  event_tags: string[];
}

interface EventWeapon {
  id: number;
  weapons_id: Weapon | string;
  events_id: Event | string;
}

interface Weapon {
  id: string;
  name: string;
  rarity: 5 | 4;
  game: Game | string;
  type: Attribute | number;
}

interface Version {
  id: string;
  status: string;
  special_version: boolean;
  tags: string[] | null;
  game: Game | string;
  semVer: number;
  name: string;
  events: DripEvent[] | string[];
}

interface Phase {
  id: number;
  game: Game | string;
  phase: string;
  start: string;
  end: string;
}

interface Schema {
  games: Game[];
  attributes: Attribute[];
  characters: Character[];
  servers: Server[];
  weapons: Weapon[];
  phases: Phase[];
  events: DripEvent[];
  versions: Version[];
  events_characters: EventCharacter[];
  events_weapons: EventWeapon[];
  directus_files: DripFile[];
}

export type {
  Game,
  Attribute,
  Character,
  Server,
  DripEvent,
  Weapon,
  EventCharacter,
  Version,
  EventWeapon,
  Phase,
  Schema,
  DripFile,
};
