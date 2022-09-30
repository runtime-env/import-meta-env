# Setup

> This example contains server side and client side usage.

## Server Side

You should read sensitive credentials environment variables from the [`process.env` object](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env) instead of `__ENV__`:

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

You can safely list all environment variables under `.env.example`.

This file is used as an information file for all team members to know what keys and values may be needed.

```
SECRET_NUMBER=
HELLO=
```

Only the keys listed in the `.env.example.public` file will be exposed to `__ENV__` (see below).

## Client Side

1. Install package:

   ```sh
   $ pnpm i -D @final-env/cli
   $ pnpm i -D @final-env/unplugin
   ```

1. Register `final-env` plugin:

   ```js
   // next.config.js

   /** @type {import('next').NextConfig} */
   const nextConfig = {
     // ...

     webpack: (config) => {
       config.plugins.push(
         require("@final-env/unplugin").webpack({
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
   $ export HELLO=final-env
   $ export SECRET_NUMBER=42
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
