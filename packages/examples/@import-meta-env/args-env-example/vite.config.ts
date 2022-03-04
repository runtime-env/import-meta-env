import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/unplugin";
import createSharedViteConfig from "../../shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    importMetaEnv.vite({ env: ".custom-env-path", example: ".env.example" }),
  ],
  ...createSharedViteConfig(),
});
