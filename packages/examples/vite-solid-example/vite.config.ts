import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import importMetaEnv from "@import-meta-env/unplugin";

export default defineConfig({
  plugins: [
    solidPlugin(),
    importMetaEnv.vite({ example: ".env.example.public" }),
  ],
  build: {
    target: "esnext",
  },
});
