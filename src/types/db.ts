export type Game = {
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
};

export type Attribute = {
  id: number;
  game: Game;
  name: string;
  primary: boolean;
  icon: {
    filename_disk: string;
  };
};

interface Option {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Character = {
  id: string;
  splash_art: {
    [x: string]: any;
  };
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
};

export type Server = {
  id: string;
  game: Game;
  name: string;
  timezone: string;
};

export type GachaEvent = {
  id: string;
  game: Game;
  version: Version;
  phase: Phase;
  full_version: boolean;
  startDate: string;
  endDate: string;
  featured_characters: Character[];
  featured_weapons: Weapon[];
  status: "published" | "draft" | "archived";
  event_tags: string[];
};

export type Weapon = {
  id: string;
  name: string;
  rarity: 5 | 4;
  game: Game;
  type: Attribute;
};

export type Version = {
  id: string;
  game: Game[];
  semVer: number;
  name: string;
  events: GachaEvent[];
  status: "published" | "draft" | "archived";
};

export type Phase = {
  id: number;
  game: Game;
  phase: string;
  start: string;
  end: string;
};

export type EventCharacter = {
  id: number;
  characters_id: string;
  events_id: string;
  spec: boolean;
};

export type EventWeapon = {
  id: number;
  weapons_id: string;
  events_id: string;
};
