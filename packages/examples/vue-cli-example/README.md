# Setup

1. Install package:

```sh
$ yarn add -D @import-meta-env/unplugin
$ yarn add -D @import-meta-env/cli
```

2. Register `import-meta-env` plugin:

```js
// vue.config.js
const { defineConfig } = require("@vue/cli-service");
const importMetaEnv = require("@import-meta-env/unplugin");

module.exports = defineConfig({
  configureWebpack: {
    plugins: [importMetaEnv.webpack()],
  },
});
```

3. Set environment variables:

```sh
$ export HELLO=import-meta-env
```

4. Start dev server:

```sh
$ yarn vue-cli-service serve
```

5. Build production:

```sh
$ yarn vue-cli-service build
```

6. Serve production:

```sh
$ node node_modules/.bin/import-meta-env
$ yarn serve -s dist
```
