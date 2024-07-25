# Introduction

`Import-meta-env` is a startup/runtime environment variable solution for JavaScript, it provides a set of transform plugins and tools designed to help you develop applications according to the [12-factor principle](https://12factor.net/config).

## Published Packages

| Package                                                                                                          | Version                                                                                                                                  | Changelog                                                                                                  | License                                                                         |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [@import-meta-env/babel](https://github.com/import-meta-env/import-meta-env/tree/main/packages/babel/)           | [![npm](https://img.shields.io/npm/v/@import-meta-env/babel.svg?color=blue)](https://npmjs.com/package/@import-meta-env/babel)           | [CHANGELOG](https://github.com/import-meta-env/import-meta-env/blob/main/packages/babel/CHANGELOG.md)      | ![license](https://img.shields.io/npm/l/@import-meta-env/babel?color=blue)      |
| [@import-meta-env/cli](https://github.com/import-meta-env/import-meta-env/tree/main/packages/cli/)               | [![npm](https://img.shields.io/npm/v/@import-meta-env/cli.svg?color=blue)](https://npmjs.com/package/@import-meta-env/cli)               | [CHANGELOG](https://github.com/import-meta-env/import-meta-env/blob/main/packages/cli/CHANGELOG.md)        | ![license](https://img.shields.io/npm/l/@import-meta-env/cli?color=blue)        |
| [@import-meta-env/flow](https://github.com/import-meta-env/import-meta-env/tree/main/packages/flow/)             | [![npm](https://img.shields.io/npm/v/@import-meta-env/flow.svg?color=blue)](https://npmjs.com/package/@import-meta-env/flow)             | [CHANGELOG](https://github.com/import-meta-env/import-meta-env/blob/main/packages/flow/CHANGELOG.md)       | ![license](https://img.shields.io/npm/l/@import-meta-env/flow?color=blue)       |
| [@import-meta-env/prepare](https://github.com/import-meta-env/import-meta-env/tree/main/packages/prepare/)       | [![npm](https://img.shields.io/npm/v/@import-meta-env/prepare.svg?color=blue)](https://npmjs.com/package/@import-meta-env/prepare)       | [CHANGELOG](https://github.com/import-meta-env/import-meta-env/blob/main/packages/prepare/CHANGELOG.md)    | ![license](https://img.shields.io/npm/l/@import-meta-env/prepare?color=blue)    |
| [@import-meta-env/swc](https://github.com/import-meta-env/import-meta-env/tree/main/packages/swc/)               | [![npm](https://img.shields.io/npm/v/@import-meta-env/swc.svg?color=blue)](https://npmjs.com/package/@import-meta-env/swc)               | [CHANGELOG](https://github.com/import-meta-env/import-meta-env/blob/main/packages/swc/CHANGELOG.md)        | ![license](https://img.shields.io/npm/l/@import-meta-env/swc?color=blue)        |
| [@import-meta-env/typescript](https://github.com/import-meta-env/import-meta-env/tree/main/packages/typescript/) | [![npm](https://img.shields.io/npm/v/@import-meta-env/typescript.svg?color=blue)](https://npmjs.com/package/@import-meta-env/typescript) | [CHANGELOG](https://github.com/import-meta-env/import-meta-env/blob/main/packages/typescript/CHANGELOG.md) | ![license](https://img.shields.io/npm/l/@import-meta-env/typescript?color=blue) |
| [@import-meta-env/unplugin](https://github.com/import-meta-env/import-meta-env/tree/main/packages/unplugin/)     | [![npm](https://img.shields.io/npm/v/@import-meta-env/unplugin.svg?color=blue)](https://npmjs.com/package/@import-meta-env/unplugin)     | [CHANGELOG](https://github.com/import-meta-env/import-meta-env/blob/main/packages/unplugin/CHANGELOG.md)   | ![license](https://img.shields.io/npm/l/@import-meta-env/unplugin?color=blue)   |

## Guide

> In this guide, we will use Webpack as an example, but you can also use other build tools. All supported build tools can be found on the [compile-time transform plugin](/guide/getting-started/compile-time-transform.html)s page.

![](/glance.png)

### Write your code

1. To prevent accidentally leaking environment variables to the client, you need to list public environment variables in an example file (e.g., `.env.example`):

   ```ini
   # .env.example
   NAME=
   ```

   See the [`.env.example file`](#env-example-file) section for details.

1. Obtain the environment variable:

   ```diff
   // src/index.js
   - const name = process.env.NAME
   + const name = import.meta.env.NAME
   document.querySelector("body").innerHTML = `<h1>Hello, ${name}</h1>`;
   ```

   See the [syntax](#syntax) section for details.

### Transform it

Install dotenv in order for Import-meta-env packages to work:

```sh
$ npm i -D dotenv
```

- During development and testing:

  1. Define environment variables:

     ```ini
     # .env
     NAME=development
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
     +     env: ".env",
     +     transformMode: "compile-time",
     +   }),
       ],
     };
     ```

  1. Transform it:

     ```sh
     $ npx webpack --mode=development
     ```

     ```diff
     // dist/main.js
     - const name = import.meta.env.NAME
     + const name = "developemnt"
     // ...
     ```

- During production:

  1. Install and setup [compile-time transform plugin](/guide/getting-started/compile-time-transform.html)s.

     ```sh
     $ npm i -D @import-meta-env/unplugin
     ```

     ```diff
     // webpack.config.js
     module.exports = {
       plugins: [
         require("@import-meta-env/unplugin").webpack({
           example: ".env.example",
           env: ".env",

           // If you are using popular packagers such as Webpack and Vite,
           // @import-meta-env/unplugin will automatically switch the `transformMode` for you, you don't have to explicitly define it:
           // - for development mode, `transformMode` will be `"compile-time"`
           // - for production mode, `transformMode` will be `"runtime"`
           transformMode: undefined,

           // Otherwise, you need to set `transformMode` according to your needs, for example:
           transformMode: process.env.NODE_ENV === "development" ? "compile-time" : "runtime",

     -     transformMode: "compile-time",
     +     transformMode: "runtime",
         }),
       ],
     };
     ```

  1. Transform it:

     ```sh
     $ npx webpack --mode=production
     ```

     ```diff
     // dist/main.js
     - const name = import.meta.env.NAME
     + const name = globalThis.import_meta_env.NAME
     // ...
     ```

  1. In order to obtain environment variables from `globalThis.import_meta_env`, you also need to add a special expression before your entry:

     ```diff
     <!-- public/index.html -->
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
     +   <script>
     +     globalThis.import_meta_env = JSON.parse('"import_meta_env_placeholder"')
     +   </script>
       </head>
     </html>
     ```

     See the [special expression](#special-expression) section for details.

  1. Define environment variables:

     In the real world, we might define environment variables in the cloud, for example: Google Cloud Run environment variables.

     Here, we simulate this by defining our environment variables in the system:

     ```sh
     export NAME=production
     ```

  1. Install [runtime transform tool](/guide/getting-started/runtime-transform.html).

     ```sh
     $ npm i -D @import-meta-env/cli
     ```

  1. Transform it again:

     ```sh
     npx import-meta-env -x .env.example -p dist/index.html
     ```

     ```diff
     <!-- dist/index.html -->
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <script>
     -     globalThis.import_meta_env = JSON.parse('"import_meta_env_placeholder"')
     +     globalThis.import_meta_env = JSON.parse('{"NAME":"production"}');
         </script>
         <script defer="defer" src="main.js"></script>
       </head>
     </html>
     ```

See the [transform](#transform) section for details.

You can find the corresponding working example [here](https://github.com/import-meta-env/import-meta-env/tree/main/diff/after-using-import-meta-env), and all examples [here](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples).

## .env File

By default, `Import-meta-env` will load environment variables from your system and the `.env` file (you can change or disable this using `env` option):

```sh
$ export NAME=world
```

```ini
# .env
NAME=world
```

::: warning
You should gitignore this file because these environment variables are usually used for local development purposes, while your production environment variables are usually stored in your cloud, such as GCP or AWS, and will be loaded from the system.
:::

::: tip
It is common to temporarily change environment variables for debugging or other purposes. You can use [@import-meta-env/prepare](/guide/tools/prepare) to automatically generate the final `.env` file from `.env.local`, `.env.local.defaults`, etc. files.
:::

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
<!doctype html>
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

::: warning
The value of the expression will be statically replaced, the following will not work:

<!-- prettier-ignore -->
```js
globalThis.import_meta_env = JSON.parse(
  '"import_meta_env_placeholder"'
);

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
