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

1. Install following packages:

   ```sh
   $ npm i -D @import-meta-env/unplugin
   $ npm i @import-meta-env/cli
   ```

1. Refer to [document](https://iendeavor.github.io/import-meta-env/guide/getting-started/introduction.html).

1. For this example, we need to config webpack in next.config.js.

1. For this example, we need to add the special script tag to [\_app.js](./pages/_app.js):

   ```jsx
   export default function MyApp({ Component, pageProps }) {
     return (
       <>
         <script id="import-meta-env"></script>
         <Component {...pageProps} />
       </>
     );
   }
   ```
