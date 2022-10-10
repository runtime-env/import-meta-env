# Setup

1. Install package:

   ```sh
   $ npm i -D @import-meta-env/cli
   $ npm i -D @import-meta-env/unplugin
   ```

1. Register `import-meta-env` plugin:

   ```js
   // esbuild.config.js
   import { build } from "esbuild";

   build({
     plugins: [
       require("@import-meta-env/unplugin").esbuild({
         example: ".env.example.public",
         shouldInlineEnv: false,
       }),
     ],
   });
   ```

1. List public environment variables under `.env.example.public`.

   ```
   # .env.example.public
   HELLO=
   ```

1. Set environment variables:

   ```sh
   $ export HELLO=import-meta-env
   ```

1. Build production:

   ```sh
   $ npm run build
   ```

1. Populate environment variables (see more about this script [here](../../cli/README.md#api)):

   ```sh
   $ npm run populate
   ```
