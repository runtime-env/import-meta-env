# @import-meta-env/babel

[![CI](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@import-meta-env/babel.svg)](https://www.npmjs.com/package/@import-meta-env/babel)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This plugin is intended to provide a feature same as [@import-meta-env/unplugin](https://github.com/iendeavor/import-meta-env/tree/main/packages/unplugin) specific transformations when running the code in other environments, for example, running tests with a NodeJS based test runner or running @vue/cli@4 which needs to be transformed with babel.

<br>

This project use [SemVer](https://semver.org/) for versioning. For the versions available, see the tags on this repository.

## Quick Start

Install and register the plugin:

```sh
$ npm i @import-meta-env/babel
```

```js
// babel.config.js
module.exports = {
  plugins: [["module:@import-meta-env/babel", { example: ".env.example" }]],
};
```

Adjust scripts in your package.json or elsewhere:

```json
{
  "scripts": {
    // If you have a `.env` file:
    "test": "jest",
    // If you don't have a `.env` file:
    "test": "cross-env S3_BUCKET=YOURS3BUCKET jest"
  }
}
```

See also:

- [examples](https://github.com/iendeavor/import-meta-env/tree/main/packages/examples)
- [@import-meta-env/cli](https://github.com/iendeavor/import-meta-env/tree/main/packages/cli) - A binary package is used to inject environment variables into those placeholders.
- [@import-meta-env/unplugin](https://github.com/iendeavor/import-meta-env/tree/main/packages/unplugin) - Inject environment variables into the import.meta.env object after building the application instead of statically replacing it during production.

## Plugin Options

```js
// babel.config.js
module.exports = {
  plugins: [
    [
      "module:@import-meta-env/babel",
      /* Plugin options goes here */
      {
        env: ".env.example",
      },
    ],
  ],
};
```

```ts
interface PluginOptions {
  /**
   * The .env file path to load
   *
   * @default ".env"
   */
  env?: string;

  /**
   * The .env example file path to load
   */
  example: string;

  /**
   * Explicity set whether to inline current environment variables into the code,
   * instead of inject environment variables via `import-meta-env` later.
   *
   * @default
   * process.env.NODE_ENV !== 'production'
   */
  shouldInlineEnv?: boolean;
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
