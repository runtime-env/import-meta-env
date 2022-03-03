# Setup

1. Install package:

```sh
$ pnpm i -D @import-meta-env/unplugin
$ pnpm i -D @import-meta-env/cli
```

2. Register `import-meta-env` plugin:

```js
// config/webpack.config.js

module.exports = function (webpackEnv) {
  // ...
  return {
    // ...
    plugins: [
      // ...
      require("@import-meta-env/unplugin").webpack(),
    ],
  },
};
```

3. Set environment variables:

```sh
$ export HELLO=import-meta-env
```

4. Start dev server:

```sh
$ node scripts/start.js
```

5. Build production:

```sh
$ node scripts/build.js
```

6. Serve production:

```sh
$ pnpm exec import-meta-env
$ pnpm exec serve -s build
```
