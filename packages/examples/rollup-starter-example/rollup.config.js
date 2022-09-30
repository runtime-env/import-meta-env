import resolve from "@rollup/plugin-node-resolve";
import runtimeConfig from "@final-env/unplugin";

const dev = {
  input: "src/main.js",
  output: {
    dir: "public/assets",
    format: "esm",
  },
  plugins: [
    resolve(),
    runtimeConfig.rollup({ example: ".env.example.public" }),
  ],
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
    runtimeConfig.rollup({ example: ".env.example.public" }),
  ],
};

export default process.env.ROLLUP_WATCH === "true" ? dev : prod;
