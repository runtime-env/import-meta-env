# Setup

1. Install package:

```sh
$ pnpm i -D @import-meta-env/unplugin
$ pnpm i -D @import-meta-env/cli
```

2. Register `import-meta-env` plugin:

```js
// webpack.config.js

const importMetaEnv = require("@import-meta-env/unplugin");

module.exports = {
  // ...
  plugins: [
    // ...
    importMetaEnv.webpack(),
  ],
};
```

3. Set environment variables:

```sh
$ export HELLO=import-meta-env
```

4. Start dev server:

```sh
$ pnpm exec webpack --watch
```

```sh
$ serve dist -p 3000
```

5. Build production:

```sh
$ pnpm exec webpack
```

6. Serve production:

```sh
$ pnpm exec import-meta-env -o dist/*
$ pnpm exec serve dist
```
