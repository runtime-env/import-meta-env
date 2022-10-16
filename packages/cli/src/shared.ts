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

const placeholderRegExpList1 = [`"`, `'`].map((q) =>
  placeholder
    .replace(/([\(\)\[\]\|])/g, "\\$1")
    .replace(new RegExp(`"`, "g"), q)
);
const placeholderRegExpList2 = [
  ...placeholderRegExpList1,
  ...placeholderRegExpList1.map((placeholder) =>
    placeholder.replace(/\s/g, "\\s*")
  ),
];

export const placeholderRegExpList = placeholderRegExpList2.map(
  (p) => new RegExp(p, "g")
);
