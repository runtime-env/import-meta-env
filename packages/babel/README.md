# @import-meta-env/babel

[![CI](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@import-meta-env/babel.svg)](https://www.npmjs.com/package/@import-meta-env/babel)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This plugin is intended to provide an approximation of some of [@import-meta-env/vite](https://github.com/iendeavor/import-meta-env/tree/develop/packages/vite) specific transformations when running the code in other environments, for example, running tests with a NodeJS based test runner.

⚠ The functionality within these transformations should not be relied upon in production.

## 🚀 Quick Start

Install and register the plugin:

```sh
$ npm i dotenv @import-meta-env/babel
```

```js
// babel.config.js
module.exports = {
  plugins: ["module:@import-meta-env/babel"],
};
```

Adjust the test script in your package.json:

```json
{
  "scripts": {
    // If you have a `.env` file:
    "test": "your-test-script",
    // If you don't have a `.env` file:
    "test": "cross-env S3_BUCKET=YOURS3BUCKET your-test-script"
  }
}
```

See also:

- [examples](./examples)
- [@import-meta-env/vite](https://github.com/iendeavor/import-meta-env/tree/main/packages/vite) - Inject environment variables into the import.meta.env object after building the application instead of statically replacing it during production.
