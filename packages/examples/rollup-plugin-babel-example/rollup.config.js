import resolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";

const dev = {
  input: "src/main.js",
  output: {
    dir: "public/assets",
    format: "esm",
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: "bundled",
      plugins: [
        ["module:@import-meta-env/babel", { example: ".env.example.public" }],
      ],
    }),
  ],
};

const prod = {
  input: "src/main.js",
  output: {
    dir: "dist/assets",
    format: "esm",
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: "bundled",
      plugins: [
        ["module:@import-meta-env/babel", { example: ".env.example.public" }],
      ],
    }),
  ],
};

export default process.env.NODE_ENV === "production" ? prod : dev;
