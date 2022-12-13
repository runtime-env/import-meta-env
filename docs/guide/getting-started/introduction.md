# Introduction

`Import-meta-env` is a startup/runtime environment variable solution for JavaScript, it provides a set of transform plugins and tools designed to help you develop applications according to the [12-factor principle](https://12factor.net/config).

## Published Packages

| Package                                                                                                    | Version                                                                                                                                  | Changelog                                                                                            | License                                                                         |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [@import-meta-env/babel](https://github.com/iendeavor/import-meta-env/tree/main/packages/babel/)           | [![npm](https://img.shields.io/npm/v/@import-meta-env/babel.svg?color=blue)](https://npmjs.com/package/@import-meta-env/babel)           | [CHANGELOG](https://github.com/iendeavor/import-meta-env/blob/main/packages/babel/CHANGELOG.md)      | ![license](https://img.shields.io/npm/l/@import-meta-env/babel?color=blue)      |
| [@import-meta-env/cli](https://github.com/iendeavor/import-meta-env/tree/main/packages/cli/)               | [![npm](https://img.shields.io/npm/v/@import-meta-env/cli.svg?color=blue)](https://npmjs.com/package/@import-meta-env/cli)               | [CHANGELOG](https://github.com/iendeavor/import-meta-env/blob/main/packages/cli/CHANGELOG.md)        | ![license](https://img.shields.io/npm/l/@import-meta-env/cli?color=blue)        |
| [@import-meta-env/flow](https://github.com/iendeavor/import-meta-env/tree/main/packages/flow/)             | [![npm](https://img.shields.io/npm/v/@import-meta-env/flow.svg?color=blue)](https://npmjs.com/package/@import-meta-env/flow)             | [CHANGELOG](https://github.com/iendeavor/import-meta-env/blob/main/packages/flow/CHANGELOG.md)       | ![license](https://img.shields.io/npm/l/@import-meta-env/flow?color=blue)       |
| [@import-meta-env/swc](https://github.com/iendeavor/import-meta-env/tree/main/packages/swc/)               | [![npm](https://img.shields.io/npm/v/@import-meta-env/swc.svg?color=blue)](https://npmjs.com/package/@import-meta-env/swc)               | [CHANGELOG](https://github.com/iendeavor/import-meta-env/blob/main/packages/swc/CHANGELOG.md)        | ![license](https://img.shields.io/npm/l/@import-meta-env/swc?color=blue)        |
| [@import-meta-env/typescript](https://github.com/iendeavor/import-meta-env/tree/main/packages/typescript/) | [![npm](https://img.shields.io/npm/v/@import-meta-env/typescript.svg?color=blue)](https://npmjs.com/package/@import-meta-env/typescript) | [CHANGELOG](https://github.com/iendeavor/import-meta-env/blob/main/packages/typescript/CHANGELOG.md) | ![license](https://img.shields.io/npm/l/@import-meta-env/typescript?color=blue) |
| [@import-meta-env/unplugin](https://github.com/iendeavor/import-meta-env/tree/main/packages/unplugin/)     | [![npm](https://img.shields.io/npm/v/@import-meta-env/unplugin.svg?color=blue)](https://npmjs.com/package/@import-meta-env/unplugin)     | [CHANGELOG](https://github.com/iendeavor/import-meta-env/blob/main/packages/unplugin/CHANGELOG.md)   | ![license](https://img.shields.io/npm/l/@import-meta-env/unplugin?color=blue)   |

## Guide

> In this guide, we use Webpack and Docker as examples.

> If you'd rather see the [diff](https://en.wikipedia.org/wiki/Diff) code, it can be found [in the repository](https://github.com/iendeavor/import-meta-env/tree/main/diff).

### Write your code

1. To prevent accidentally leaking environment variables to the client, you need to list public environment variables in an example file (e.g., `.env.example`):

   ```ini
   # .env.example
   NAME=
   ```

   See the [`.env.example file`](#env-example-file) section for details.

1. Add a special expression to be able to inject environment variables later:

   ```diff
   <!-- public/index.html -->
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
   +   <script>globalThis.import_meta_env=JSON.parse('"import_meta_env_placeholder"')</script>
     </head>
   </html>
   ```

   See the [special expression](#special-expression) section for details.

1. Obtain the environment variable:

   ```diff
   // src/index.js
   document.querySelector("body").innerHTML = `
   + <h1>Hello, ${import.meta.env.NAME}</h1>
   `;
   ```

   See the [syntax](#syntax) section for details.

### Transform it

See the [transform](#transform) section for details.

- In development and testing:

  1. Define environment variables:

     ```sh
     $ export NAME=world
     ```

     or

     ```ini
     # .env
     NAME=world
     ```

     See the [`.env` file](#env-file) section for details.

  1. Install and setup [compile-time transform plugin](/guide/getting-started/compile-time-transform.html)s.

     ```sh
     $ npm i -D @import-meta-env/unplugin
     ```

     ```diff
     // webpack.config.js
     module.exports = {
       plugins: [
     +   require("@import-meta-env/unplugin").webpack({
     +     example: ".env.example",
     +   }),
       ],
     };
     ```

  1. Transform it:

     ```sh
     $ npx webpack --mode=development
     ```

     ```diff
     <!-- dist/index.html -->
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <script>globalThis.import_meta_env=JSON.parse('"import_meta_env_placeholder"')</script>
         <script defer src="main.js"></script>
       </head>
     </html>
     ```

     ```diff
     // dist/main.js
     // ...
     - <h1>Hello, ${import.meta.env.NAME}</h1>
     + <h1>Hello, ${"world"}</h1>
     // ...
     ```

- In production:

  1. Install and setup [compile-time transform plugin](/guide/getting-started/compile-time-transform.html)s.

     ```sh
     $ npm i -D @import-meta-env/unplugin
     ```

     ```diff
     // webpack.config.js
     module.exports = {
       plugins: [
     +   require("@import-meta-env/unplugin").webpack({
     +     example: ".env.example",
     +   }),
       ],
     };
     ```

  1. Transform it:

     ```sh
     $ npx webpack --mode=production
     ```

     ```diff
     <!-- dist/index.html -->
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <script>globalThis.import_meta_env=JSON.parse('"import_meta_env_placeholder"')</script>
         <script defer="defer" src="main.js"></script>
       </head>
     </html>
     ```

     ```diff
     // dist/main.js
     // ...
     - <h1>Hello, ${import.meta.env.NAME}</h1>
     + <h1>Hello, ${globalThis.import_meta_env.NAME}</h1>
     // ...
     ```

  1. Install [runtime transform tool](/guide/getting-started/runtime-transform.html).

     ```sh
     $ npm i -D @import-meta-env/cli
     ```

  1. Package the above CLI into an alpine-compatible executable:

     ```
     # Dockerfile
     RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js \
       --target node18-alpine-x64 \
       --output import-meta-env-alpine
     ```

     See the [without Node.js](/guide/getting-started/runtime-transform.html#without-node-js) section for details.

  1. Before starting your container, define environment variables:

     ```sh
     $ docker run --env NAME=world ...
     ```

  1. Transform it again (on the container startup) using the packaged excutable:

     ```sh
     # start.sh
     ./import-meta-env-alpine -x .env.example -o dist/index.html || exit 1
     ```

     ```diff
     <!-- dist/index.html -->
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
     -   <script>globalThis.import_meta_env=JSON.parse('"import_meta_env_placeholder"')</script>
     +   <script>
     +     globalThis.import_meta_env = JSON.parse('{"NAME":"world"}');
     +   </script>
         <script defer="defer" src="main.js"></script>
       </head>
     </html>
     ```

     ```diff
     // dist/main.js
     // ...
     <h1>Hello, ${globalThis.import_meta_env.NAME}</h1>
     // ...
     ```

Full working example can be found [here](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/docker-starter-example).

## .env File

By default, `Import-meta-env` will load environment variables from your system and the `.env` file (you can change or disable this using `env` option):

```sh
$ export NAME=world
```

```ini
# .env
NAME=world
```

## .env.example File

To prevent accidentally leaking environment variables to the client, only keys listed in an example file (e.g., `.env.example`) are exposed.

For example, if you have these config:

```sh
$ export NAME=world
$ export SECRET_KEY=****
```

```ini
# .env.example
NAME=this-value-can-be-anything
```

then only `NAME` will be exposed to your client source code, but `SECRET_KEY` will not.

::: info
For security reason, the `example` option does not have default value, you have to explicitly define it.
:::

::: warning
Since any environment variables exposed to your source code will end up in your client bundle, the keys listed in `.env.example` **should not contain any sensitive information**.
:::

## Syntax

`Import-meta-env` exposes your environment variables on special environment variable expressions:

```js
import.meta.env.FOO;
import.meta.env.BAR;
// ...
```

::: info
Since these environment variables expression are statically transformed. It is therefore necessary to always reference them using the full static string.

In other words, the following are **invalid**:

- Entire object access, i.e. `import.meta.env`
- Computed key access, e.g. `import.meta.env["FOO"]`
  :::

## Transform

`Import-meta-env` provides two sets of transform:

1. [compile-time transform plugins](/guide/getting-started/compile-time-transform.html)
1. [runtime transform tool](/guide/getting-started/runtime-transform.html)

In development and testing, you use the compile-time transform plugins to replace the [environment variable expressions](#syntax) with environment variable strings.

In production, you need to use the compile-time transform plugins to replace the environment variable expressions with global accessors (in order to access to a special object), and then use runtime transform tool to inject environment variables to the [special expression](#special-expression).

## Compile-time Transform Modes

Since [compile-time transform plugins](/guide/getting-started/compile-time-transform.html) will be used in two scenarios, it have two transform modes:

1. `compile-time`: statically replace `import.meta.env.KEY` with `"value"`
1. `runtime`: statically replace `import.meta.env` with a global accessor

Usually, you don't need to define it explicitly, because `Import-meta-env` determines it automatically based on your environment variables (e.g., `process.env.NODE_ENV`). See [API](/api) for details.

## Special Expression

In order to inject environment variables in production, you also need to add a special expression in your app:

```js
globalThis.import_meta_env = JSON.parse('"import_meta_env_placeholder"');
```

This expression will be replaced with environment variables by using [runtime transform tool](/guide/getting-started/runtime-transform.html) as follows:

```js
globalThis.import_meta_env = JSON.parse('{"NAME":"world"}');
```

We encourage you to put this special expression in your `index.html` because the `Cache-Control` header is usually set to `no-cache` when requesting `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    ...
  </head>
  <body>
    ...
    <script>
      globalThis.import_meta_env = JSON.parse('"import_meta_env_placeholder"');
    </script>
    <script src="src/index.js"></script>
  </body>
</html>
```

::: info
The value of the expression will be statically replaced, the following will not work:

```js
globalThis.import_meta_env = JSON.parse('"import_meta_env" + "_placeholder"');

const placeholder = '"import_meta_env_placeholder"';
globalThis.import_meta_env = JSON.parse(placeholder);
```

:::

::: info
This expression should be placed before or at the top of your entry script, otherwise your code will end up with a `TypeError`:

```txt
Uncaught TypeError: Cannot read properties of undefined (reading 'NAME')
  at ...
```

:::
