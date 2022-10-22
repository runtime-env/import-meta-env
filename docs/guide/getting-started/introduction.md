# Introduction

## Prerequisite

Before we begin, to prevent accidental leakage environment variables to clients, you need to create a `.env.example` file (you can change it later) to explicitly define which environment variables are considered public.

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

## Transform

Now you can use environment variables by accessing `import.meta.env`[<sup>?</sup>](/guide/faq/why-use-import-meta.html):

```js
// main.js
console.log(import.meta.env.API_BASE_URL);
```

In development, we just need to statically replace `import.meta.env` with environment variables, you can do this with [compile-time transform](/guide/getting-started/compile-time-transform.html) tools, it will work like [Webpack's EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/):

```js
// dist/index.js
console.log({ API_BASE_URL: "https://httpbin.org" }.API_BASE_URL);
```

But during production, since we need to pass environment variables at runtime, we need to use the same compile-time transform tool to temporarily replace `import.meta.env` with placeholders:

```js
// dist/index.js
console.log(
  Object.create(globalThis["import_meta_env".slice()] || null).API_BASE_URL
);
```

Then, at runtime, we use the [runtime transform](/guide/getting-started/runtime-transform.html) tool to replace the placeholders with runtime environment variables:

```js
// dist/index.js
console.log({ API_BASE_URL: "https://httpbin.org" }.API_BASE_URL);
```

## Define Environment Variables

We make no assumptions about the source of environment variables, but for convenience, we will load environment variables from the `.env` file (you can change this via the `env` option).

1. You can define environment variables in an ad-hoc manner:

   Unix systems:

   ```bash
   $ API_BASE_URL=https://httpbin.org npx import-meta-env --example .env.example
   ```

   Windows (cmd.exe):

   ```
   set "API_BASE_URL=https://httpbin.org" && npx import-meta-env --example .env.example
   ```

   Windows (Powershell):

   ```
   ($env:API_BASE_URL = "https://httpbin.org") -and (npx import-meta-env --example .env.example)
   ```

2. Or you can define environment variables in `.env` file:

   ```ini
   # .env
   API_BASE_URL=https://httpbin.org
   ```

   ```bash
   $ npx import-meta-env --example .env.example
   ```
