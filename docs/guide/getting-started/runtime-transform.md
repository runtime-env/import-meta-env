# Runtime Transform

Please read the [guide](/guide/getting-started/introduction.html#guide) for how to use this tool.

## CLI

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/cli.svg?color=blue)](https://www.npmjs.com/package/@import-meta-env/cli)

### Installation

```bash
$ npm i -D @import-meta-env/cli
```

### Usage

```bash
$ npx import-meta-env -x .env.example
```

Related examples: [docker](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/docker-starter-example)

::: tip
By default, import-meta-env will automatically replace all files in the [common bundle output directories](https://github.com/iendeavor/import-meta-env/blob/e4defac25c89ff1bfd71ec478713720bd82d85d4/packages/cli/src/shared.ts#L5-L16)

You can override this behavior by passing the `-p, --path <path...>` option.

For more information, see [API](/api.html#import-meta-env-cli).
:::

### Without Node.js

Since your application may be deployed on a system that doesn't have Node.js installed, you can use [pkg](https://github.com/vercel/pkg) to package the `import-meta-env` script into a standalone binary.

For example, you may host your application on a [Alpine Linux nginx image](https://hub.docker.com/_/nginx)):

```bash
$ npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js \
  --target node18-alpine-x64 \
  --output import-meta-env-alpine
```

```bash
$ ./import-meta-env-alpine -x .env.example
```
