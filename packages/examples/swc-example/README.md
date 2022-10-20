# Setup

1. Install package:

   ```sh
   $ npm i -D @import-meta-env/swc
   $ npm i -D @import-meta-env/cli
   ```

1. Register `import-meta-env` plugin:

   ```json5
   // .swcrc
   {
     $schema: "https://json.schemastore.org/swcrc",
     jsc: {
       experimental: {
         plugins: [
           [
             "@import-meta-env/swc",
             {
               env_example_path: ".env.example.public",
             },
           ],
         ],
       },
     },
   }
   ```

1. List public environment variables under `.env.example.public`.

   ```
   # .env.example.public
   HELLO=
   ```

1. List runtime environment variables under `.env`:

   ```
   # .env
   HELLO=import-meta-env
   ```

1. Build development:

   ```sh
   $ npm run dev
   ```

1. Build production:

   ```sh
   $ npm run build
   ```

1. Populate environment variables (see more about this script [here](../../cli/README.md#api)):

   ```sh
   $ npm run populate
   ```
