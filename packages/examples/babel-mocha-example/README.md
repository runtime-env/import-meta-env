# Setup

1. Install package:

```sh
$ pnpm i -D @import-meta-env/babel
```

2. Register `babel` plugin:

```js
// babel.config.js

module.exports = {
  // ...
  plugins: ["module:@import-meta-env/babel"],
};
```

3. Set environment variables:

```sh
$ export HELLO=import-meta-env
```

4. Run tests:

```sh
$ pnpm exec mocha
```
