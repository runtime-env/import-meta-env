import { placeholder } from "../../shared";

export const backupFileExt = ".bak";

export const defaultOutput = [
  // vite, webpack, vue-cli, nuxt 2 static-site
  "dist/**/*",
  // create-next-app
  ".next/**/*",
  // create-nuxt-app
  ".nuxt/**/*",
  // nuxt bridge
  ".output/**/*",
  // create-react-app
  "build/**/*",
];

export const placeholderRegExpList = [`"`, `'`]
  .map((q) =>
    placeholder
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(new RegExp(`"`, "g"), q)
  )
  .map((p) => new RegExp(p, "g"));
