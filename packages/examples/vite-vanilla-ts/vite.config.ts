import { defineConfig } from "vite";
import runtimeConfig from "@runtime-config/plugin-vite";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [runtimeConfig(), legacy()],
});
