import { defineConfig } from "vite";
import runtimeConfig from "@final-env/unplugin";
import createSharedViteConfig from "../shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [runtimeConfig.vite({ example: ".env.example.public" })],
  ...createSharedViteConfig(),
});
