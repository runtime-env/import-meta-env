import { placeholder } from "../../shared";

export const backupFileExt = ".bak";

export const defaultFileGlobs = [
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

export const placeholderVariants = ['"', "'"].map((q) =>
  placeholder.replace(new RegExp("'", "g"), q)
);
