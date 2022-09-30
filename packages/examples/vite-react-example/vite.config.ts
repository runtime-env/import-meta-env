import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import runtimeConfig from "@final-env/unplugin";
import createSharedViteConfig from "../shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), runtimeConfig.vite({ example: ".env.example.public" })],
  ...createSharedViteConfig(),
});
