import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import importMetaEnv from "@import-meta-env/unplugin";
import importMetaEnvTypescript from "@import-meta-env/typescript";
import createSharedViteConfig from "../shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    importMetaEnv.vite({ example: ".env.example.public" }),
    importMetaEnvTypescript.vite({
      example: ".env.example.public",
      outDir: "src",
    }),
    legacy(),
  ],
  ...createSharedViteConfig(),
});
