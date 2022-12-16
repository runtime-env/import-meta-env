import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import importMetaEnv from "@import-meta-env/unplugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    importMetaEnv.vite({
      example: ".env.example.public",
    }),
  ],
});
