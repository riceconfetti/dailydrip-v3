import { type DirectusFile } from "@directus/sdk";

interface DripFile extends DirectusFile {
  focal_size: number;
}

interface Grid {
  size: "sm" | "md" | "lg" | "xl";
  row_start: number;
  row_span: number;
  col_start: number;
  col_span: number;
}

interface Block {
  id: number;
  grid: Grid[];
  classlist: string[];
}

interface Layout {
  id: number;
  name: string;
  game: Game | string;
  start: string;
  end: string;
  tag: "div" | "section" | "article";
  grid: Grid[];
  blocks: LayoutBlock[];
}

interface LayoutBlock {
  id: number;
  layouts_id: number;
  item: Block | string;
  collection: string;
}

interface BlockContainer extends Block {
  tag: "div" | "section" | "article";
  blocks: Block[] | string[];
}

interface BlockHeader extends Block {
  type: string;
  text: string;
}

interface BlockCharacter extends Block {
  index: number;
}

interface BlockWeapon extends Block {
  index: number;
  signature: boolean;
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
  layout: Layout | number;
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
  grid: {
    size: "sm" | "md" | "lg" | "xl";
    rows: number;
    cols: number;
  }[];
}

interface Schema {
  games: Game[];
  attributes: Attribute[];
  characters: Character[];
  servers: Server[];
  weapons: Weapon[];
  layouts: Layout[];
  events: DripEvent[];
  versions: Version[];
  events_characters: EventCharacter[];
  events_weapons: EventWeapon[];
  directus_files: DripFile[];
  block_container: BlockContainer[];
  block_character: BlockCharacter[];
  block_header: BlockHeader[];
  block_weapon: BlockHeader[];
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
  Layout,
  Schema,
  DripFile,
  Block,
  BlockCharacter,
  BlockContainer,
  BlockHeader,
  BlockWeapon,
};
