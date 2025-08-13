import { type DirectusFile } from "@directus/sdk";

interface Game {
  id: string;
  name: string;
  elementMain: boolean;
  numOfRateUpCharacters: number;
  numOfRateUpWeapons: number;
  color: string;
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
  icon: DirectusFile;
}

interface Character {
  id: string;
  splash_art: DirectusFile | string;
  splash_pad: DirectusFile | string;
  name: string;
  game: Game | string;
  rarity: 5 | 4;
  bannerName: string;
  primary_attribute: Attribute | number;
  secondary_attribute: Attribute | number;
  signature?: Weapon | string;
  focus_width: number;
  focus_height: number;
  options: {
    key: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
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
  events: DripEvent[] | string;
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
};
