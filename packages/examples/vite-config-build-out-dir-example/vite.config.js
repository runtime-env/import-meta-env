import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/unplugin";
import createSharedViteConfig from "../shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "custom-out-dir",
    ...createSharedViteConfig().build,
  },
  plugins: [importMetaEnv.vite({ example: ".env.example" })],
});
