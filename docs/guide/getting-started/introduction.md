# Introduction

`Import-meta-env` is a startup/runtime environment variable solution for JavaScript, it provides a set of transform plugins and tools designed to help you develop applications according to the [12-factor principle](https://12factor.net/config).

## .env File

By default, `Import-meta-env` will load environment variables from your system and the `.env` file (you can change or disable this using `env` option):

```bash
$ export API_BASE_URL=https://httpbin.org
```

```ini
# .env
API_BASE_URL=https://httpbin.org
```

## .env.example File

To prevent accidentally leaking environment variables to the client, only keys listed in an example file (e.g., `.env.example`) are exposed.

For example, if you have these config:

```bash
$ export API_BASE_URL=https://httpbin.org
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

### Transform Modes

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

## Full Example

### Write your code

```ini
# .env.example
API_BASE_URL=
```

```js
// src/index.js
console.log(import.meta.env.API_BASE_URL);
```

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <script id="import-meta-env"></script>
    <script src="src/index.js"></script>
  </body>
</html>
```

### Transform it

- In development and testing:

  Before compiling, define environment variables:

  ```ini
  # .env
  API_BASE_URL=https://httpbin.org
  ```

  Transform it using [compile-time transform plugins](/guide/getting-started/compile-time-transform.html) (with `compile-time` transform mode):

  ```diff
  // dist/index.js
  - console.log(import.meta.env.API_BASE_URL);
  + console.log("https://httpbin.org");
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

- In production (take docker as an example):

  Transform it using [compile-time transform plugins](/guide/getting-started/compile-time-transform.html) (with `runtime` transform mode):

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

  Before starting your container, define environment variables:

  ```bash
  $ docker run --env API_URL_BASE_URL=https://httpbin.org ...
  ```

  Transform it again (on the container startup) using [runtime tool](/guide/getting-started/runtime-transform.html):

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
  +     globalThis.import_meta_env = { API_BASE_URL: "https://httpbin.org" };
  +   </script>
      <script src="dist/index.js"></script>
    </body>
  </html>
  ```
