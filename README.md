# import.meta.env

[![CI](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml)

This plugin helps us inject environment variables into the `import.meta.env` object **_after_** building the application instead of statically replacing it during production.

- All Environment Are Supported (CSR, SSR, Static-Site, Test Runners)
- [Twelve-Factor App](https://12factor.net/config) Ready
- Zero Configuration

## How does this work?

Write your code:

```js
// src/main.js

console.log(import.meta.env.HELLO);
```

After bundling it (e.g., run `npx webpack`):

```js
// dist/main.js

console.log("__import_meta_env_placeholder__".HELLO);
```

Before serving, run script to inject environment variables (e.g., run `npx import-meta-env`):

Tip: use [`pkg`](https://github.com/vercel/pkg) to package the `import-meta-env` binary into an executable that can be run even on devices without Node.js installed.

```js
// dist/main.js

console.log({ HELLO: "import-meta-env" }.HELLO);
```

That's it! The complete example with a detailed tutorial can be found [here](./packages/examples/hello-world-example/).

## Packages

| Package                                                 | Version (click for changelogs)                                                                                                       | Description                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [@import-meta-env/babel](./packages/babel#readme)       | [![@import-meta-env/babel version](https://img.shields.io/npm/v/@import-meta-env/babel.svg)](./packages/babel/CHANGELOG.md)          | Provide an approximation of some of [@import-meta-env/unplugin](https://github.com/iendeavor/import-meta-env/tree/develop/packages/unplugin) specific transformations when running the code in other environments, for example, running tests with a NodeJS based test runner. |
| [@import-meta-env/cli](./packages/cli#readme)           | [![@import-meta-env/cli version](https://img.shields.io/npm/v/@import-meta-env/cli.svg)](./packages/cli/CHANGELOG.md)                | A binary package is used to inject environment variables into those placeholders.                                                                                                                                                                                              |
| [@import-meta-env/unplugin](./packages/unplugin#readme) | [![@import-meta-env/unplugin version](https://img.shields.io/npm/v/@import-meta-env/unplugin.svg)](./packages/unplugin/CHANGELOG.md) | Inject environment variables into the `import.meta.env` object **_after_** building the application instead of statically replacing it during production.                                                                                                                      |

## Examples

> Sort by alphabetical order.

- [create-next-app](./packages/examples/create-next-app-example)
- [create-nuxt-app](./packages/examples/create-nuxt-app-example)
- [create-react-app](./packages/examples/create-react-app-example)
- [jest](./packages/examples/babel-jest-example)
- [mocha](./packages/examples/babel-mocha-example)
- [nuxt-bridge](./packages/examples/nuxt-bridge-example)
- [rollup](./packages/examples/rollup-starter-example)
- [vite](./packages/examples/vite-starter-example)
- [vitest](./packages/examples/vite-vitest-example)
- [vue-cli](./packages/examples/vue-cli-example)
- [webpack](./packages/examples/webpack-starter-example)
- [others](./packages/examples)

## License

MIT
