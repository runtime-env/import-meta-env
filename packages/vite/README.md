# @import-meta-env/vite

[![CI](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@import-meta-env/vite.svg)](https://www.npmjs.com/package/@import-meta-env/vite)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This plugin loads environment variables from `.env` files and environment variables on the machine into `import.meta.env` (see `import.meta` on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta) for more information).

Following [the Twelve-Factor App](https://12factor.net/config) approach, storing configuration in the environment separate from code allows us to inject environment variables at runtime rather than build time. Powered by [dotenv](https://github.com/motdotla/dotenv).

This project use [SemVer](https://semver.org/) for versioning. For the versions available, see the tags on this repository.

## 💡 How

For security reasons, this plugin will only load those environment variables defined in the `.env.example` file.

For dev server, this plugin loads environment variables into `import.meta.env` from a `.env` file or from environment variables on your machine.

For bundling, this plugin will generate a chunk with placeholder that allow us to inject environment variables later. Before serving your application in production, run the `import-meta-env` command to inject environment variables.

Note: vite [built-in variables](https://vitejs.dev/guide/env-and-mode.html#env-variables) will work as usual.

## 🚀 Quick Start

Install and register the plugin:

```sh
$ npm i dotenv @import-meta-env/vite
```

```ts
// vite.cofnig.ts
import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/vite";

export default defineConfig({
  plugins: [importMetaEnv()],
});
```

Create a `.env` and `.env.example` files in the root of your project:

```sh
# .env
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

```sh
# .env.example
S3_BUCKET=
```

Now you can access environment variables like this:

```ts
console.log(import.meta.env.S3_BUCKET); // "YOURS3BUCKET"
console.log(import.meta.env.SECRET_KEY); // undefined
```

Finally, remember to inject environment variables before serving your application.

Adjust the preview script in your package.json:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "import-meta-env && vite preview"
  }
}
```

You can use [pkg](https://github.com/vercel/pkg) to create a standalone executable for deployment.

For example, you can pack the alpine version like this:

```sh
$ npm i -g pkg
$ npx pkg ./node_modules/@import-meta-env/vite/bin/import-meta-env.js -t node16-alpine
```

See all available targets [here](https://github.com/vercel/pkg#targets)

## 📖 API

### import-meta-env binary

```sh
$ npx import-meta-env --help
Usage: import-meta-env [options]

Inject your environment variables from the `.env` file or from environment variables on your machine.

Options:
  -V, --version           output the version number
  -e, --env <path>        .env file path (default: ".env")
  -x, --example <path>    .env example file path (default: ".env.example")
  -o, --output <path...>  output file paths (default: "dist/assets/import-meta-env*")
  -h, --help              display help for command
```

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
