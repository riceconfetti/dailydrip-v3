import { createDirectus, rest, staticToken } from "@directus/sdk";
import { type Schema } from "$types/collection";
import { DIRECTUS_TOKEN } from "astro:env/client";

const directus = createDirectus<Schema>("https://directus.dailydrip.news")
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest());

export default directus;
