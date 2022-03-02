# Setup

1. Install package:

```sh
$ yarn add -D @import-meta-env/unplugin
$ yarn add -D @import-meta-env/cli
```

2. Register `import-meta-env` plugin:

```js
// nuxt.config.js
import importMetaEnv from "@import-meta-env/unplugin";

export default {
  // ...

  build: {
    extend(config, { isDev, isClient }) {
      config.plugins.push(importMetaEnv.webpack());
    },
  },
};
```

3. Set environment variables:

```sh
$ export HELLO=import-meta-env
```

4. Start dev server:

```sh
$ yarn nuxt
```

5. Build production:

```sh
$ yarn nuxt build
```

6. Serve production:

```sh
$ node node_modules/.bin/import-meta-env -o .nuxt/dist/client/* .nuxt/dist/server/*
$ yarn nuxt start
```
