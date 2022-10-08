const { build } = require("esbuild");
const importMetaEnv = require("@import-meta-env/unplugin");

build({
  entryPoints: ["app.js"],
  bundle: true,
  outfile: "out.js",
  plugins: [
    importMetaEnv.esbuild({
      example: ".env.example.public",
      shouldInlineEnv: process.env.NODE_ENV !== "production",
    }),
  ],
});
