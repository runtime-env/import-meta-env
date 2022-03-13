import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/unplugin";
import createSharedViteConfig from "../shared-vite-config.mjs";

const assetsDir = "custom-assets-dir";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir,
    ...createSharedViteConfig(assetsDir).build,
  },
  plugins: [importMetaEnv.vite({ example: ".env.example.public" })],
});
