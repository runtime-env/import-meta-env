# Introduction

`Import-meta-env` is a startup/runtime environment variable solution for JavaScript, it provides a set of transform plugins and tools designed to help you develop applications according to the [12-factor principle](https://12factor.net/config).

## Guide

> In this guide, we use Webpack and Docker as examples.

### Write your code

1. To prevent accidentally leaking environment variables to the client, you need to list public environment variables in an example file (e.g., `.env.example`):

   ```ini
   # .env.example
   API_BASE_URL=
   ```

   See the [`.env.example file`](#env-example-file) section for details.

1. Obtain the environment variable:

   ```js
   // src/index.js
   console.log(import.meta.env.API_BASE_URL);
   ```

   See the [syntax](#syntax) section for details.

1. Add a special script tag to be able to inject environment variables later:

   ```html
   <!-- public/index.html -->
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
     </head>
     <body>
       <!-- Add this tag: -->
       <script id="import-meta-env"></script>
       <script src="src/index.js"></script>
     </body>
   </html>
   ```

   See the [special script tag](#special-script-tag) section for details.

### Transform it

- In development and testing:

  1. Define environment variables:

     ```sh
     $ export API_BASE_URL=https://dev.example.com
     ```

     or

     ```ini
     # .env
     API_BASE_URL=https://dev.example.com
     ```

     See the [`.env` file](#env-file) section for details.

  1. Install [compile-time transform plugin](/guide/getting-started/compile-time-transform.html)s.

     ```sh
     $ npm i -D @import-meta-env/unplugin
     ```

  1. Transform it:

     ```sh
     $ npx webpack --mode=development
     ```

     ```diff
     // dist/index.js
     - console.log(import.meta.env.API_BASE_URL);
     + console.log("https://dev.example.com");
     ```

     ```diff
     <!-- dist/index.html -->
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
       </head>
       <body>
     -   <script id="import-meta-env"></script>
         <script src="dist/index.js"></script>
       </body>
     </html>
     ```

- In production:

  1. Install [compile-time transform plugin](/guide/getting-started/compile-time-transform.html)s.

     ```sh
     $ npm i -D @import-meta-env/unplugin
     ```

  1. Transform it:

     ```sh
     $ npx webpack --mode=production
     ```

     ```diff
     // dist/index.js
     - console.log(import.meta.env.API_BASE_URL);
     + console.log(Object.create(globalThis.import_meta_env || null).API_BASE_URL);
     ```

     ```diff
     <!-- dist/index.html -->
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
       </head>
       <body>
         <script id="import-meta-env"></script>
         <script src="dist/index.js"></script>
       </body>
     </html>
     ```

  1. Install [runtime transform tool](/guide/getting-started/runtime-transform.html).

     ```sh
     $ npm i -D @import-meta-env/cli
     ```

  1. Package the above CLI into an alpine-compatible executable:

     ```
     # Dockerfile
     RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js \
       -t node16-alpine \
       -o import-meta-env-alpine
     ```

  1. Before starting your container, define environment variables:

     ```bash
     $ docker run --env API_BASE_URL=https://example.com ...
     ```

  1. Transform it again (on the container startup) using the packaged excutable:

     ```sh
     $ ./import-meta-env-alpine -x .env.example
     ```

     ```diff
     // dist/index.js
     console.log(Object.create(globalThis.import_meta_env || null).API_BASE_URL);
     ```

     ```diff
     <!-- dist/index.html -->
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
       </head>
       <body>
     -   <script id="import-meta-env"></script>
     +   <script>
     +     globalThis.import_meta_env = { API_BASE_URL: "https://example.com" };
     +   </script>
         <script src="dist/index.js"></script>
       </body>
     </html>
     ```

Full working example can be found [here](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/docker-starter-example).

## .env File

By default, `Import-meta-env` will load environment variables from your system and the `.env` file (you can change or disable this using `env` option):

```bash
$ export API_BASE_URL=https://example.com
```

```ini
# .env
API_BASE_URL=https://example.com
```

## .env.example File

To prevent accidentally leaking environment variables to the client, only keys listed in an example file (e.g., `.env.example`) are exposed.

For example, if you have these config:

```bash
$ export API_BASE_URL=https://example.com
$ export SECRET_KEY=****
```

```ini
# .env.example
API_BASE_URL=this-value-can-be-anything
```

then only `API_BASE_URL` will be exposed to your client source code, but `SECRET_KEY` will not.

::: info
For security reason, the `example` option does not have default value, you have to explicitly define it.
:::

::: warning
Since any environment variables exposed to your source code will end up in your client bundle, the keys listed in `.env.example` **should not contain any sensitive information**.
:::

## Syntax

`Import-meta-env` exposes your environment variables on special environment variable expressions:

```js
import.meta.env.API_BASE_URL;
import.meta.env.FOO;
import.meta.env.BAR;
// ...
```

::: info
Since these environment variables expression are statically transformed. It is therefore necessary to always reference them using the full static string.

In other words, the following are **invalid**:

- Entire object access, i.e. `import.meta.env`
- Computed key access, e.g. `import.meta.env["API_BASE_URL"]`
  :::

## Transform

`Import-meta-env` provides two sets of transform:

1. [compile-time transform plugins](/guide/getting-started/compile-time-transform.html)
1. [runtime transform tool](/guide/getting-started/runtime-transform.html)

In development and testing, you use [compile-time transform plugins](/guide/getting-started/compile-time-transform.html) to transform the environment variable expressions to environment variable strings.

In production, you need to use [compile-time transform plugins](/guide/getting-started/compile-time-transform.html) to transform the environment variable expressions to another expression (in order to access to a special object), and then use [runtime transform tool](/guide/getting-started/runtime-transform.html) to inject environment variables to the special object.

### Compile-time Transform Modes

Since [compile-time transform plugins](/guide/getting-started/compile-time-transform.html) will be used in two scenarios, it have two transform modes:

1. `compile-time`
1. `runtime`

Usually, you don't need to define it explicitly, because `Import-meta-env` determines it automatically based on your environment variables (e.g., `process.env.NODE_ENV`). See [API](/api) for details.

### Special Script Tag

In order to inject environment variables later, you also need to add a special script tag:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    ...
  </head>
  <body>
    ...
    <script id="import-meta-env"></script>
    <script src="src/index.js"></script>
  </body>
</html>
```

::: info
This script tag will be statically replaced, you should not add extra attributes to it, for example, the following script tags will be ignored:

```html
<script defer id="import-meta-env"></script>
```

:::

::: info
This script tag should be placed before your entry script, otherwise your code will end up with a `TypeError`:

```txt
Uncaught TypeError: Cannot read properties of undefined (reading 'API_BASE_URL')
  at ...
```

:::
