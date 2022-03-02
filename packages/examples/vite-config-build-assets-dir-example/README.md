# Setup

1. Install package:

```sh
$ pnpm i -D @import-meta-env/unplugin
$ pnpm i -D @import-meta-env/cli
```

2. Register `import-meta-env` plugin:

```js
// vite.config.js

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
$ pnpm exec import-meta-env -o dist/custom-assets-dir/import-meta-env*
$ pnpm exec vite preview
```
