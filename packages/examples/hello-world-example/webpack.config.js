const importMetaEnv = require("@import-meta-env/unplugin");

module.exports = {
  plugins: [importMetaEnv.webpack({ example: ".env.example" })],
};
