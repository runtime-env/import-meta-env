import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/vite";
import createSharedViteConfig from "../../../vite/examples/shared-vite-config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [importMetaEnv()],
  ...createSharedViteConfig(),
});
