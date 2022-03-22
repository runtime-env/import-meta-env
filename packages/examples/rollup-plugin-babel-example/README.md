# Setup

1. Install package:

   ```sh
   $ pnpm i -D @import-meta-env/babel
   $ pnpm i -D @import-meta-env/cli
   ```

1. Register `import-meta-env` plugin:

   ```js
   // rollup.config.js

   const dev = {
     plugins: [
       // ...,
       babel({
         plugins: [
           [
             "module:@import-meta-env/babel",
             { example: ".env.example.public" },
           ],
         ],
       }),
     ],
   };

   const prod = {
     plugins: [
       // ...,
       babel({
         plugins: [
           [
             "module:@import-meta-env/babel",
             { example: ".env.example.public" },
           ],
         ],
       }),
     ],
   };

   // ...
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

1. Start dev server:

   ```sh
   $ pnpm run dev
   ```

1. Build production:

   ```sh
   $ pnpm run build
   ```

1. Preview production:

   ```sh
   $ pnpm run preview
   ```
