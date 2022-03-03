# Setup

> This example contains server side and client side usage.

## Server Side

You should read sensitive credentials environment variables from the [`process.env` object](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env) instead of `import.meta.env`:

```js
// pages/api/process-env.js

export default function handler(req, res) {
  res
    .status(200)
    .json(JSON.stringify({ SECRET_NUMBER: process.env.SECRET_NUMBER }));
}
```

If you need to read environment variables from `.env` file, you can use `dotenv`:

```js
import dotenv from "dotenv";

export default function handler(req, res) {
  dotenv.config();

  res
    .status(200)
    .json(JSON.stringify({ SECRET_NUMBER: process.env.SECRET_NUMBER }));
}
```

Only the keys listed in the `.env.example` file will be exposed to `import.meta.env`, so you can share the `.env` file between the server side (`process.env`) and the client side (`import.meta.env`).

## Client Side

1. Install package:

   ```sh
   $ pnpm i -D @import-meta-env/unplugin
   $ pnpm i -D @import-meta-env/cli
   ```

1. Register `import-meta-env` plugin:

   ```js
   // next.config.js

   /** @type {import('next').NextConfig} */
   const nextConfig = {
     // ...

     webpack: (config) => {
       config.plugins.push(require("@import-meta-env/unplugin").webpack());

       return config;
     },
   };

   module.exports = nextConfig;
   ```

1. List public environment variables under `.env.example`.

   ```
   # .env.example
   HELLO=
   ```

1. Set environment variables:

   ```sh
   $ export HELLO=import-meta-env
   $ export SECRET_NUMBER=42
   ```

1. Start dev server:

   ```sh
   $ pnpm exec next dev
   ```

1. Build production:

   ```sh
   $ pnpm exec next build
   ```

1. Serve production:

   ```sh
   $ pnpm exec import-meta-env
   $ pnpm exec next start
   ```
