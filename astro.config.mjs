import { defineConfig, envField } from "astro/config";
import favicons from "astro-favicons";
import svelte from "@astrojs/svelte";
import { loadEnv } from "vite";
const { PUBLIC_DEPLOY_MODE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), favicons()],
 prefetch: false,
  env: {
    schema: {
      SECRET_DIRECTUS_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      PUBLIC_DIRECTUS_PATH: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_DEPLOY_MODE: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_VE_TOKEN: envField.string({ context: "client", access: "public" }),
    },
  },
  output: PUBLIC_DEPLOY_MODE,
  adapter: node({
    mode: "standalone",
  }),
});
