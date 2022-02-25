import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import importMetaEnv from "@import-meta-env/vite";
import createSharedViteConfig from "../shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), importMetaEnv()],
  ...createSharedViteConfig(),
});
