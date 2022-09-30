import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import runtimeConfig from "@final-env/unplugin";
import createSharedViteConfig from "../shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), runtimeConfig.vite({ example: ".env.example.public" })],
  ...createSharedViteConfig(),
});
