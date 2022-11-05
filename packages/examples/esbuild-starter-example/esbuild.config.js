const { build } = require("esbuild");
const importMetaEnv = require("@import-meta-env/unplugin");

build({
  entryPoints: ["app.js"],
  bundle: true,
  outfile: "out.js",
  sourcemap: "both",
  plugins: [
    importMetaEnv.esbuild({
      example: ".env.example.public",
      transformMode:
        process.env.NODE_ENV === "production" ? "runtime" : "compile-time",
    }),
  ],
});
