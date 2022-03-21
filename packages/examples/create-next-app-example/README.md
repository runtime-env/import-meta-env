# Setup

1. Install package:

   ```sh
   $ pnpm i @import-meta-env/cli
   $ pnpm i -D @import-meta-env/unplugin
   ```

1. Register `import-meta-env` plugin:

   ```js
   // next.config.js

   /** @type {import('next').NextConfig} */
   const nextConfig = {
     // ...

     webpack: (config) => {
       config.plugins.push(
         require("@import-meta-env/unplugin").webpack({
           example: ".env.example.public",
         })
       );

       return config;
     },
   };

   module.exports = nextConfig;
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
