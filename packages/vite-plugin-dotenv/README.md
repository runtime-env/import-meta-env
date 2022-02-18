# vite-plugin-dotenv

[![CI](https://github.com/iendeavor/vite-plugin-dotenv/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/vite-plugin-dotenv/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/vite-plugin-dotenv.svg)](https://www.npmjs.com/package/vite-plugin-dotenv)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This plugin loads environment variables from a `.env` file and environment variables on your machine into `import.meta.env` (see more info of `import.meta` on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta)).

Follow [the Twelve-Factor App](https://12factor.net/config) methodology, storing configuration in the environment separate from code, allowing us to inject environment variables at runtime instead of build time. Powered by [dotenv](https://github.com/motdotla/dotenv)

This project use [SemVer](https://semver.org/) for versioning. For the versions available, see the tags on this repository.

## 💡 How

For security reasons, this plugin will only load those environment variables defined in the `.env.example` file.

For dev server, this plugin will load environment variables from a `.env` file, and the environment variables on your machine into `import.meta.env`.

For bundling, this plugin will generate a chunk with placeholder that allow us to inject environment variables later. Before serving your application in production, run the `vite-plugin-dotenv` command to inject environment variables.

## 🚀 Quick Start

Install and register the plugin:

```sh
$ npm i vite-plugin-dotenv dotenv
```

```ts
// vite.cofnig.ts
import { defineConfig } from "vite";
import dotenv from "vite-plugin-dotenv";

export default defineConfig({
  plugins: [dotenv()],
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

Finally, adjust preview script:

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "npx vite-plugin-dotenv && vite preview"
  }
}
```

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
