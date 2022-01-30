import { defineConfig } from "vite";
import runtimeConfig from "vite-plugin-runtime-config";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [runtimeConfig(), legacy()],
});
