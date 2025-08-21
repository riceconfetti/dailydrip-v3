import { createDirectus, rest, staticToken } from "@directus/sdk";
import { type Schema } from "$types/collection";
import { SECRET_DIRECTUS_TOKEN  } from "astro:env/server";

const directus = createDirectus<Schema>("https://directus.dailydrip.news")
  .with(staticToken(SECRET_DIRECTUS_TOKEN))
  .with(rest());

export default directus;
