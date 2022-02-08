# vite-plugin-dotenv

[![CI](https://github.com/iendeavor/vite-plugin-dotenv/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/vite-plugin-dotenv/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/vite-plugin-dotenv.svg)](https://www.npmjs.com/package/vite-plugin-dotenv)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This plugin extends vite's built-in [environment variables](https://vitejs.dev/guide/env-and-mode.html#env-variables) functionality, allowing you to inject environment variables at runtime instead of build time.

This project use [SemVer](https://semver.org/) for versioning. For the versions available, see the tags on this repository.

## 💡 How

In production, this plugin will generate the following chunk, allowing us to inject environment variables after building the package.

- `dist/assets/env.js` (default) contains a placeholder: `__env__` (default) which allows us to inject environment variables.

## 🚀 Quick Start

Install the plugin:

```sh
pnpm i vite-plugin-dotenv
```

Register the plugin:

```js
// vite.config.js
import { defineConfig } from "vite";
import dotenv from "vite-plugin-dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dotenv()],
});
```

Finally, after building your project, remember to inject environment variables before serving your application.

Since our programs all run on different operating systems (for example, you might develop with Windows/MacOS but deploy to Linux), we do not provide binaries for injecting environment variables.

Here is a working example for MacOS:

```sh
# inject-env.sh

#!/bin/bash
set -e

# Config
PLACEHOLDER="__env__" # vite-plugin-dotenv option: placeholder
OUT_DIR="dist" # vite config: build.outDir
ASSETS_DIR="assets" # vite config: build.assetsDir
DOTENV_PATH=".env"

# You can expand the environment variable to "ENV" variable
ENV="\`VITE_NAME=$VITE_NAME\\\n\`"
# or read the `.env` file line by line and save it to the `ENV` variable
ENV="\`"
while read line || [[ -n "$line" ]]; do
  ENV="$ENV$line"
  ENV="$ENV\\\n"
done < $DOTENV_PATH
ENV="$ENV\`"

# Backup if `env.js~` does not exist, otherwise restore from `.env.js~` to `env.js`
# This step will allow us to change environment variables without rebuilding the project
if [ ! -f "$OUT_DIR/$ASSETS_DIR/env.js~" ]; then
  cp "$OUT_DIR/$ASSETS_DIR/env.js" "$OUT_DIR/$ASSETS_DIR/env.js~"
else
  cp "$OUT_DIR/$ASSETS_DIR/env.js~" "$OUT_DIR/$ASSETS_DIR/env.js"
fi

# Inject the `ENV` variable to `env.js`
sed -i '' "s/$PLACEHOLDER/$ENV/g" "$OUT_DIR/$ASSETS_DIR/env.js"
```

If you run into problems, see [examples](../examples) or create an issue from github.

## 📖 Plugin Options

- `placeholder: string = "__env__"`: The placeholder to replace with the `.env` file content

- `verify: boolean = true`: Whether to verify the `.env` file content at runtime

- `debug: boolean = false`: Whether to dump debug logs, logs will be dumped to <package-root>/vite-plugin-dotenv-debug.log

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
