import resolve from "@rollup/plugin-node-resolve";
import swc from "unplugin-swc";

const dev = {
  input: "src/main.js",
  output: {
    dir: "public/assets",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    swc.rollup({
      tsconfigFile: false,
    }),
  ],
};

const prod = {
  input: "src/main.js",
  output: {
    dir: "dist/assets",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    swc.rollup({
      tsconfigFile: false,
    }),
  ],
};

export default process.env.NODE_ENV === "production" ? prod : dev;
