# API

## @import-meta-env/babel

Please see [types.ts](https://github.com/iendeavor/import-meta-env/blob/main/packages/babel/src/types.ts)

## @import-meta-env/cli

```
Usage: import-meta-env [options] [file...]

Populates your environment variables from the system or `.env` file.

Arguments:
  file                         The file glob to inject in-place (default: ["dist/**/*",".next/**/*",".nuxt/**/*",".output/**/*","build/**/*"])

Options:
  -V, --version                output the version number
  -e, --env <path>             The .env file path to load (default: ".env")
  -x, --example <path>         The .env example file path to load
  --disposable                 Do not create backup files and restore from backup files. In local development, disable this option to avoid rebuilding the
                               project when environment variable changes, In production, enable this option to avoid generating unnecessary backup files.
  --compression-module <path>  A file path which should expose two functions: `compressSync` and `decompressSync`. Please refer to the `CompressionModule`
                               interface (https://github.com/iendeavor/import-meta-env/blob/main/packages/cli/src/compression-module.ts) for more details.
  -h, --help                   display help for command
```

## @import-meta-env/unplugin

Please see [types.ts](https://github.com/iendeavor/import-meta-env/blob/main/packages/unplugin/src/types.ts)
