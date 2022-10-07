import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/unplugin";

export default defineConfig({
  plugins: [importMetaEnv.vite({ example: ".env.example.public" })],
});
