import resolve from "@rollup/plugin-node-resolve";
// import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import importMetaEnv from "@import-meta-env/unplugin";

const dev = {
  input: "src/main.js",
  output: {
    dir: "public/assets",
    format: "esm",
  },
  plugins: [resolve(), importMetaEnv.rollup()],
};

const prod = {
  input: "src/main.js",
  output: {
    dir: "dist/assets",
    format: "esm",

    // Make output files easier to diff.
    chunkFileNames: `[name].js`,
    entryFileNames: `[name].js`,
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
      presets: [["@babel/env", { modules: false }]],
    }),
    importMetaEnv.rollup(),

    // Make output files easier to read.
    // terser(),
  ],
};

const isDev = process.env.NODE_ENV !== "production";

export default isDev ? dev : prod;
