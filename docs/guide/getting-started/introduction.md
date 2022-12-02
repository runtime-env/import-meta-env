# Introduction

`Import-meta-env` is a startup/runtime environment variable solution for JavaScript, it provides a set of transform plugins and tools designed to help you develop applications according to the [12-factor principle](https://12factor.net/config).

## Guide

> In this guide, we use Webpack and Docker as examples.

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

  1. Install [compile-time transform plugin](/guide/getting-started/compile-time-transform.html)s.

     ```sh
     $ npm i -D @import-meta-env/unplugin
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

  1. Install [compile-time transform plugin](/guide/getting-started/compile-time-transform.html)s.

     ```sh
     $ npm i -D @import-meta-env/unplugin
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
     + <h1>Hello, ${Object.create(globalThis.import_meta_env || null).NAME}</h1>
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
     <h1>Hello, ${Object.create(globalThis.import_meta_env || null).NAME}</h1>
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

In development and testing, you use [compile-time transform plugins](/guide/getting-started/compile-time-transform.html) to transform the environment variable expressions to environment variable strings.

In production, you need to use [compile-time transform plugins](/guide/getting-started/compile-time-transform.html) to transform the environment variable expressions to another expression (in order to access to a special object), and then use [runtime transform tool](/guide/getting-started/runtime-transform.html) to inject environment variables to the special object.

### Compile-time Transform Modes

Since [compile-time transform plugins](/guide/getting-started/compile-time-transform.html) will be used in two scenarios, it have two transform modes:

1. `compile-time`
1. `runtime`

Usually, you don't need to define it explicitly, because `Import-meta-env` determines it automatically based on your environment variables (e.g., `process.env.NODE_ENV`). See [API](/api) for details.

### Special Expression

In order to inject environment variables in production, you also need to add a special expression in your app:

```js
globalThis.import_meta_env = JSON.parse('"import_meta_env_placeholder"');
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
