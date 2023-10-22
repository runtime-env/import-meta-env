const importMetaEnv = require("@import-meta-env/unplugin");

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  devServer: {
    port: process.env.PORT,
  },
  entry: {
    main: "./src/main.tsx",
  },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
    ],
  },
  plugins: [
    importMetaEnv.rspack({
      example: ".env.example.public",
    }),
  ],
};
