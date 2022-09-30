import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import runtimeConfig from "@final-env/unplugin";
import createSharedViteConfig from "../shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [runtimeConfig.vite({ example: ".env.example.public" }), legacy()],
  ...createSharedViteConfig(),
});
