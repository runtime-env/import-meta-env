# API

## @import-meta-env/babel

Please see [types.ts](https://github.com/iendeavor/import-meta-env/blob/main/packages/babel/src/types.ts)

## @import-meta-env/cli

```
Usage: import-meta-env [options]

Populates your environment variables from the system or `.env` file.

Options:
  -V, --version           output the version number
  -e, --env <path>        The .env file path to load (default: ".env")
  -x, --example <path>    The .env example file path to load
  -o, --output <path...>  The output file/dir paths to inject in-place (default: ["dist/**/*",".next/**/*",".nuxt/**/*",".output/**/*","build/**/*"])
  --disposable            Do not create backup files and restore from backup files. In local development, disable this option to avoid rebuilding the project when environment variable
                          changes, In production, enable this option to avoid generating unnecessary backup files.
  -h, --help              display help for command
```

## @import-meta-env/unplugin

Please see [types.ts](https://github.com/iendeavor/import-meta-env/blob/main/packages/unplugin/src/types.ts)
