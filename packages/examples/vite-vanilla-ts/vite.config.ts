import { defineConfig } from "vite";
import runtimeConfig from "@runtime-config/plugin-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [runtimeConfig()],
});
