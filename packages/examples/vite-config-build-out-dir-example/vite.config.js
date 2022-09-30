import { defineConfig } from "vite";
import runtimeConfig from "@final-env/unplugin";
import createSharedViteConfig from "../shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "custom-out-dir",
    ...createSharedViteConfig().build,
  },
  plugins: [runtimeConfig.vite({ example: ".env.example.public" })],
});
