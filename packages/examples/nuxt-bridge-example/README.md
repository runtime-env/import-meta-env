# Setup

1. Install package:

```sh
$ yarn add -D @import-meta-env/unplugin
$ yarn add -D @import-meta-env/cli
```

2. Register `import-meta-env` plugin:

```js
// nuxt.config.js
import { defineNuxtConfig } from "@nuxt/bridge";
import importMetaEnv from "@import-meta-env/unplugin";

export default defineNuxtConfig({
  build: {
    extend(config) {
      config.plugins.push(importMetaEnv.webpack());
    },
  },
});
```

3. Set environment variables:

```sh
$ export HELLO=import-meta-env
```

4. Start dev server:

```sh
$ yarn nuxi dev
```

5. Build production:

```sh
$ yarn nuxi build
```

6. Serve production:

```sh
$ node node_modules/.bin/import-meta-env
$ yarn nuxi preview
```
