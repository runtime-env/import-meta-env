# Setup

1. Install package:

   ```sh
   $ pnpm i -D @import-meta-env/unplugin @import-meta-env/cli dotenv
   ```

1. Register `import-meta-env` plugin:

   ```js
   // webpack.config.js

   const importMetaEnv = require("@import-meta-env/unplugin");

   module.exports = {
     plugins: [importMetaEnv.webpack({ example: ".env.example.public" })],
   };
   ```

1. List public environment variables under `.env.example.public` (you can configure it [here](../../unplugin/README.md#api)).

   ```
   # .env.example.public
   HELLO=
   ```

1. Set environment variables:

   ```sh
   $ export HELLO=world
   ```

   Or, you can use `.env` file:

   ```sh
   $ echo "HELLO=world" > .env
   ```

1. Build production:

   ```sh
   $ pnpm exec webpack
   ```

1. Inject environment variables (see more about this script [here](../../cli/README.md#api)):

   ```sh
   $ pnpm exec import-meta-env --example .env.example.public
   ```
