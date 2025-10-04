import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import importMetaEnv from "@import-meta-env/unplugin";
import createSharedViteConfig from "../_/shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), importMetaEnv.vite({ example: ".env.example.public" })],
  ...createSharedViteConfig(),
});
