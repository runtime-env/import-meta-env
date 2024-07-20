import { defineConfig } from "@farmfe/core";
import importMetaEnv from "@import-meta-env/unplugin";

export default defineConfig({
  plugins: [
    "@farmfe/plugin-react",
    importMetaEnv.farm({ example: ".env.example.public" }),
  ],
});
