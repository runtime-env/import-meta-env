# Setup

1. Install following packages:

   ```sh
   $ npm i -D @import-meta-env/unplugin
   $ npm i @import-meta-env/cli
   ```

1. Refer to [document](https://runtime-env.github.io/import-meta-env/guide/getting-started/introduction.html).

1. For next, we need to configure webpack in next.config.js:

   ```js
   // next.config.js

   /** @type {import('next').NextConfig} */
   const nextConfig = {
     // ...

     webpack: (config) => {
       config.plugins.push(
         require("@import-meta-env/unplugin").webpack({
           example: ".env.example.public",
         }),
       );

       return config;
     },
   };

   module.exports = nextConfig;
   ```

1. Instead of index.html, we need to add the special script tag to [\_app.js](pages/_app.js):

   ```jsx
   function MyApp({ Component, pageProps }) {
     return (
       <>
         <script>
           globalThis.import_meta_env=JSON.parse('"import_meta_env_placeholder"')
         </script>
         <Component {...pageProps} />
       </>
     );
   }

   export default MyApp;
   ```
