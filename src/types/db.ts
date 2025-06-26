export interface Game {
  id: string;
  name: string;
  elementMain: boolean;
  imageFormats: {
    name: string;
    transforms: {
      key: string;
      params: (string | number)[];
    }[];
  }[];
  numOfRateUpCharacters: number;
  numOfRateUpWeapons: number;
}

export interface Attribute {
  id: number;
  game: Game;
  name: string;
  primary: boolean;
  icon: {
    filename_disk: string;
  };
}

interface Option {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Character {
  id: string;
  name: string;
  game: Game;
  rarity: 5 | 4;
  bannerName: string;
  primary_attribute: Attribute;
  secondary_attribute: Attribute;
  signature?: Weapon;
  options: Option[];
  colors: {
    hex: string;
    red: number;
    green: number;
    blue: number;
    hue: number;
    intensity: number;
    lightness: number;
    saturation: number;
    area: number;
  }[];
  events: GachaEvent[];
  splash_art: {
    filename_disk: String;
    focal_point_x: number;
    focal_point_y: number;
    width: number;
    height: number;
  };
}

export interface Server {
  id: string;
  game: Game;
  name: string;
  timezone: string;
}

export interface GachaEvent {
  id: string;
  game: Game;
  version: Version;
  phase: Phase;
  full_version: boolean;
  startDate: string;
  endDate: string;
  featured_characters: EventCharacter[] | string[];
  featured_weapons: EventWeapon[] | string[];
  status: "published" | "draft" | "archived";
  event_tags: string[];
}

export interface Weapon {
  id: string;
  name: string;
  rarity: 5 | 4;
  game: Game;
  type: Attribute;
}

export interface Version {
  id: string;
  game: Game[];
  semVer: number;
  name: string;
  events: GachaEvent[];
  status: "published" | "draft" | "archived";
}

export interface Phase {
  id: number;
  game: Game;
  phase: string;
  start: string;
  end: string;
}

export interface EventCharacter {
  id: number;
  characters_id: Character;
  events_id: GachaEvent;
  spec: boolean;
}

export interface EventWeapon {
  id: number;
  weapons_id: Weapon;
  events_id: Event;
}
