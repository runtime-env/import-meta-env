# Introduction

## Prerequisite

1. Define public environment variables

   Before we begin, to prevent accidental leakage environment variables to clients, you need to create a example file (e.g., `.env.example`) to explicitly define which environment variables are considered public.

   For example, if you have the following environment variables:

   ```bash
   export API_BASE_URL=https://httpbin.org
   export SECRET_KEY=****
   ```

   And `.env.example` is defined as follows:

   ```ini
   # .env.example
   API_BASE_URL=
   ```

   Then only the `API_BASE_URL` will be exposed to your clients.

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

You will use environment variables by accessing `import.meta.env`[<sup>?</sup>](/guide/faq/why-use-import-meta.html):

```js
// main.js
console.log(import.meta.env.API_BASE_URL);
```

1. In development, we just need to statically replace `import.meta.env` with environment variables, you can do this with [compile-time transform](/guide/getting-started/compile-time-transform.html) tools, just like [Webpack's EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/):

   ```js
   // dist/index.js
   console.log("https://httpbin.org");
   ```

2. During production, compile-time transform tools will replace `import.meta.env` with a global accessor:

   ```js
   // dist/index.js
   console.log(Object.create(globalThis.import_meta_env || null).API_BASE_URL);
   ```

   Then, at runtime, we use the [runtime transform](/guide/getting-started/runtime-transform.html) tool to replace the predefined script tag with runtime environment variables:

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

We make no assumptions about the source of environment variables, but for convenience, we will load environment variables from the `.env` file (you can change this via the `env` option).

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

   ```bash
   $ npx import-meta-env -x .env.example
   ```
