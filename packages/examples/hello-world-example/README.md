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
     plugins: [importMetaEnv.webpack()],
   };
   ```

1. List public environment variables under `.env.example`.

   ```
   # .env.example
   HELLO=
   ```

1. Set environment variables:

   ```sh
   $ export HELLO=world
   ```

1. Build production:

   ```sh
   $ pnpm exec webpack
   ```

1. Inject environment variables:

   ```sh
   $ pnpm exec import-meta-env
   ```
