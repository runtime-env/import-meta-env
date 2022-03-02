# Setup

1. Install package:

```sh
$ pnpm i -D @import-meta-env/unplugin
$ pnpm i -D @import-meta-env/cli
```

2. Register `import-meta-env` plugin:

```js
// vite.config.js

const importMetaEnv = require("@import-meta-env/unplugin");

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  // ...
  plugins: [
    // ...
    importMetaEnv.vite(),
  ],
};
```

3. Set environment variables:

```sh
$ export HELLO=import-meta-env
```

4. Start dev server:

```sh
$ pnpm exec vite
```

5. Build production:

```sh
$ pnpm exec vite build
```

6. Serve production:

```sh
$ pnpm exec import-meta-env
$ pnpm exec vite preview
```
