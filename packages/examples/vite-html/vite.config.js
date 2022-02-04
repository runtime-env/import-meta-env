import { defineConfig } from "vite";
import dotenv from "vite-plugin-dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: ["VITE_", "CUSTOM_PREFIX_"],
  plugins: [dotenv({ verify: false })],
  build: {
    minify: false,
  },
});
