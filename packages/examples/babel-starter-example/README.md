# Setup

1. Install package:

   ```sh
   $ pnpm i -D @import-meta-env/cli
   $ pnpm i -D @import-meta-env/babel
   ```

1. Register `import-meta-env` plugin:

   ```js
   // babel.config.js

   const plugins = [
     // ...
     ["module:@import-meta-env/babel", { example: ".env.example.public" }],
   ];

   module.exports = { plugins };
   ```

1. List public environment variables under `.env.example.public`.

   ```ini
   # .env.example.public
   HELLO=
   ```

1. Set environment variables:

   ```sh
   $ export HELLO=import-meta-env
   ```

1. Build development:

   ```sh
   $ pnpm run dev
   ```

1. Build production:

   ```sh
   $ pnpm run build
   ```

1. Populate environment variables (see more about this script [here](../../cli/README.md#api)):

   ```sh
   $ pnpm run populate
   ```
