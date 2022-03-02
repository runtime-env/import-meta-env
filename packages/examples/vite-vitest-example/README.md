# Setup

1. Install package:

```sh
$ pnpm i -D @import-meta-env/unplugin
```

2. Register `import-meta-env` plugin:

```js
// vite.config.ts

import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/unplugin";

// https://vitejs.dev/config/
export default defineConfig({
  // ...
  plugins: [importMetaEnv.vite()],
});
```

3. Set environment variables:

```sh
$ export HELLO=import-meta-env
```

4. Run tests:

```sh
$ pnpm exec vitest
```
