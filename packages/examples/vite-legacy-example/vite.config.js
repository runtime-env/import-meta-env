import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/unplugin";
import legacy from "@vitejs/plugin-legacy";
import createSharedViteConfig from "../shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [importMetaEnv.vite(), legacy()],
  ...createSharedViteConfig(),
});
