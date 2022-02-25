# @import-meta-env/babel

This plugin is intended to provide an approximation of some of [@import-meta-env/vite](https://github.com/iendeavor/import-meta-env/tree/develop/packages/vite) specific transformations when running the code in other environments, for example, running tests with a NodeJS based test runner.

⚠ The functionality within these transformations should not be relied upon in production.

## 🚀 Quick Start

Install and register the plugin:

```sh
$ npm i dotenv @import-meta-env/vite
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
    // If you have `.env` file:
    "test": "jest",
    // If you have not `.env` file:
    "test": "cross-env S3_BUCKET=YOURS3BUCKET jest"
  }
}
```

See also:

- [@import-meta-env/vite](https://github.com/iendeavor/import-meta-env/tree/main/packages/vite) - Inject environment variables into the import.meta.env object after building the application instead of statically replacing it during production.
