# Introduction

## Prerequisite

1. Define public environment variables

   To prevent accidentally leaking environment variables to the client, only keys listed in an example file (e.g., `.env.example`) are exposed. e.g. for the following env variables:

   ```bash
   export API_BASE_URL=https://httpbin.org
   export SECRET_KEY=****
   ```

   and `.env.example`:

   ```ini
   API_BASE_URL=
   ```

   Only `API_BASE_URL` will be exposed as `import.meta.env.API_BASE_URL` to your client source code, but `SECRET_KEY` will not.

   ::: warning
   Since any variables exposed to your source code will end up in your client bundle, the keys listed in `.env.example` should not contain any sensitive information.
   :::

2. Add a special script tag

   In order to inject environment variables into your app, you need to add a special script tag: `<script id="import-meta-env"></script>` to your `index.html`:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
     </head>
     <body>
       <div id="app"></div>

       <!-- Note: This script tag should be placed before your entry. -->
       <script id="import-meta-env"></script>

       <script type="module" src="/src/main.ts"></script>
     </body>
   </html>
   ```

## Transform

For this section, we assuming that our source code looks like this:

```js
// main.js
console.log(import.meta.env.API_BASE_URL);
```

::: warning
During production, these environment variables are statically replaced. It is therefore necessary to always reference them using the full static string.

For example, computed key access like `import.meta.env["API_BASE_URL"]` and entire object access (i.e. `import.meta.env`) will **not** work.
:::

1. In development, we can use [compile-time transform](/guide/getting-started/compile-time-transform.html) plugins to statically replace `import.meta.env.KEY` with corresponding environment variables, just like [Webpack's EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/):

   ```js
   // dist/index.js
   console.log("https://httpbin.org");
   ```

2. In production, the [compile-time transform](/guide/getting-started/compile-time-transform.html) plugins will only replace all `import.meta.env` with a global accessor:

   ```js
   // dist/index.js
   console.log(Object.create(globalThis.import_meta_env || null).API_BASE_URL);
   ```

   And at runtime, we need to use the [runtime transform](/guide/getting-started/runtime-transform.html) tool to inject environment variable definitions into the predefined script tag:

   ```html
   <!-- dist/index.html -->
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
     </head>
     <body>
       <div id="app"></div>

       <!-- Note: This script tag should be placed before your entry. -->
       <script>
         globalThis.import_meta_env = { API_BASE_URL: "https://httpbin.org" };
       </script>

       <script type="module" src="/src/main.ts"></script>
     </body>
   </html>
   ```

   ::: info
   During prerender, `globalThis.import_meta_env` is `undefined`, this is why we wrap it with `Object.create`.
   :::

## Define Environment Variables

We make no assumptions about the source of environment variables, but for convenience, we will load environment variables from the `.env` file (you can change this via `env` option).

1. You can define environment variables in an ad-hoc manner:

   Unix systems:

   ```bash
   $ API_BASE_URL=https://httpbin.org npx import-meta-env -x .env.example
   ```

   Windows (cmd.exe):

   ```
   set "API_BASE_URL=https://httpbin.org" && npx import-meta-env -x .env.example
   ```

   Windows (Powershell):

   ```
   ($env:API_BASE_URL = "https://httpbin.org") -and (npx import-meta-env -x .env.example)
   ```

2. Or you can define environment variables in `.env` file:

   ```ini
   # .env
   API_BASE_URL=https://httpbin.org
   ```
