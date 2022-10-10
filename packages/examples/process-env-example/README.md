# process.env example

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

To provide all team members with information on which keys and values may be required,
you can list them under `.env.example.private`.

```
SECRET_NUMBER=
```

## Setup

1. Install package:

   ```sh
   $ npm i -D @import-meta-env/cli
   $ npm i -D @import-meta-env/unplugin
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
   $ export SECRET_NUMBER=42
   ```

1. Start dev server:

   ```sh
   $ npm run dev
   ```

1. Build production:

   ```sh
   $ npm run build
   ```

1. Preview production:

   ```sh
   $ npm run preview
   ```
