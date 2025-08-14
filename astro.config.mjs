import { defineConfig, envField } from "astro/config";
import svelte from "@astrojs/svelte";
import { loadEnv } from "vite";
const { PUBLIC_DEPLOY_MODE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
 
  env: {
    schema: {
      IMGPROXY_KEY: envField.string({ context: "server", access: "public" }),
      IMGPROXY_SALT: envField.string({ context: "server", access: "public" }),
      DIRECTUS_TOKEN: envField.string({ context: "client", access: "public" }),
      PUBLIC_DEPLOY_MODE: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
  output: PUBLIC_DEPLOY_MODE,
  adapter: node({
    mode: "standalone",
  }),
});
