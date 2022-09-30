import { defineConfig } from "vite";
import runtimeConfig from "@final-env/unplugin";
import createSharedViteConfig from "../shared-vite-config.mjs";

const assetsDir = "custom-assets-dir";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir,
    ...createSharedViteConfig(assetsDir).build,
  },
  plugins: [runtimeConfig.vite({ example: ".env.example.public" })],
});
